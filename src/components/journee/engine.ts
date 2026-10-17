/* Moteur de la visite guidée « Une journée avec Tolia » (version 7, 17/10/2026).
   Demande de Pierre : « revoir cette méthode d'affichage » (les textes passaient trop vite à la molette, l'explication d'un geste
   arrivait APRÈS le geste). Nouvelle logique :
   - la visite est découpée en 5 PAGES (07:30, 18:30, 22:00, Votre gamme, Bilan) ;
   - sur une page, tout se déroule tout seul, dans le temps : le texte principal, puis les cadres blancs fléchés qui montrent chaque
     partie du diffuseur, l'animation du flacon (jouée en entier), puis les cadres qui suivent l'animation ; rien ne disparaît avant
     de changer de page ;
   - on change de page avec le bouton « Suivant » (ou « Précédent », ou un clic sur une étape), au clavier (flèches gauche/droite)
     ou en faisant défiler : une page = un écran de défilement. Si l'on fait défiler sans s'arrêter, la page s'affiche plus vite,
     en entier, avant de laisser la place à la suivante ; en remontant, une page déjà vue s'affiche complète ;
   - passage d'une page à l'autre : fondu enchaîné, le texte de la nouvelle page monte légèrement, la barre d'étapes avance ;
   - écrans en hauteur (téléphone, tablette tenue verticalement) ou trop bas : les pages sont posées les unes sous les autres
     (mode « flux »), avec des repères numérotés sur l'image et les cadres numérotés dessous.
   L'animation du flacon reprend le procédé de la version 6 (images intermédiaires, fondu entre deux images voisines, lissage). */
import { JOURNEE_TEXTS, type JourneeLang, type JourneeTexts, type PhotoPageText, type GammePageText, type BilanPageText } from './texts';
import { ANIM_TAU } from './anim-manifest';
import { calendlyUrl } from '@/lib/links';

type Fmt = 'd' | 'm';
type Mode = 'pin' | 'flow';
type XY = [number, number];
type Zone = 'top' | 'right' | 'bottom' | 'left';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface JourneeEngine {
  rebuild: () => void;
  destroy: () => void;
  goto: (page: number, instant?: boolean) => void;
  finish: () => void;
  info: () => { mode: Mode; format: Fmt; page: number; t: number; pages: number; done: boolean };
  debug: () => Record<string, unknown>;
}

const ICON: Record<string, string> = {
  sunrise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 17a7 7 0 0 1 14 0"/><path d="M2.5 17h19M7 20h10M12 5.5v2.2M4.9 9.6l1.6 1.4M19.1 9.6l-1.6 1.4M8.2 7l.9 2M15.8 7l-.9 2"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 3.2a8.8 8.8 0 1 0 5.3 15.1A7.6 7.6 0 0 1 15.5 3.2z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 12.5l4.2 4.2L18.5 7.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17M9 15l2 2 4-4"/></svg>',
  mouse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="7" y="3.5" width="10" height="17" rx="5"/><path d="M12 7.5v3"/></svg>',
};

// ---------- les pages : positions mesurées sur les images (ordinateur : 1920 x 1080 px ; téléphone : 1080 x 1920 px)
const NSW = 25; // images d'origine 0-24 : changement de flacon (chrono 0 -> 1 s) | 25-50 : cloche reposée, la brume repart
const NFR = 51;
const PIC: Record<Fmt, XY> = { d: [1920, 1080], m: [1080, 1920] };
// zone de l'image (en hauteur) montrée en mode « flux » : sur téléphone, la bande où se trouve le diffuseur
const BAND: Record<Fmt, XY> = { d: [0, 1080], m: [880, 800] };
// emplacement de la partie animée (images d'animation = découpes de cette zone)
const PATCH: Record<string, Record<Fmt, number[]>> = {
  living: { d: [518, 200, 1402, 676], m: [0, 836, 1080, 762] },
  bedroom: { d: [0, 188, 1410, 876], m: [0, 822, 982, 964] },
};

// move : la pièce montrée change de place pendant l'animation (ex. le flacon de lavande entre dans le diffuseur) ;
// à l'instant move.t, la flèche quitte l'ancien point et se redessine vers le nouveau.
// end : la pièce montrée disparaît ou bouge pendant l'animation ; à cet instant la flèche s'efface et le cadre s'atténue
// (il reste lisible) : une flèche ne montre jamais un endroit vide (retour du test du 17/10/2026).
interface CalloutDef { t: number; at: Record<Fmt, XY>; zone: Zone; tx?: number; end?: number; move?: { t: number; at: Record<Fmt, XY> } }
interface PageDef {
  id: 'matin' | 'journee' | 'soir' | 'gamme' | 'bilan';
  kind: 'photo' | 'anim' | 'gamme' | 'bilan';
  tone: 't-day' | 't-night' | 't-dark' | 't-cream';
  icon: string;
  color: string;
  T: number; // durée de la page (secondes) jusqu'à ce que tout soit affiché
  img?: string;
  anim?: 'living' | 'bedroom';
  swap?: XY; // instants (s) du changement de flacon
  cover?: XY; // instants (s) de la cloche reposée
  box?: Record<Fmt, [number, number, number, number]>; // contour du produit (x0, y0, x1, y1)
  callouts?: CalloutDef[];
}
// Trois cadres par page (cycle 3 du test : une idée par cadre, aucune flèche ne barre la cloche).
const PAGES: PageDef[] = [
  {
    id: 'matin', kind: 'photo', tone: 't-day', icon: 'sunrise', color: 'var(--m1)', T: 4.0, img: 'kitchen',
    box: { d: [705, 425, 1405, 725], m: [110, 1010, 970, 1440] },
    callouts: [
      { t: 0.9, at: { d: [1057, 492], m: [540, 1174] }, zone: 'top', tx: 1300 },
      { t: 1.9, at: { d: [1105, 688], m: [590, 1405] }, zone: 'bottom', tx: 1200 },
      { t: 2.9, at: { d: [955, 540], m: [420, 1200] }, zone: 'top', tx: 820 },
    ],
  },
  {
    id: 'journee', kind: 'anim', tone: 't-day', icon: 'sun', color: 'var(--m2)', T: 8.0, anim: 'living', swap: [3.0, 4.7], cover: [4.9, 6.5],
    box: { d: [705, 400, 1405, 795], m: [110, 1080, 970, 1560] },
    callouts: [
      { t: 0.9, at: { d: [1360, 716], m: [911, 1473] }, zone: 'right' },
      { t: 1.9, at: { d: [1078, 742], m: [560, 1500] }, zone: 'bottom', tx: 1180 },
      { t: 7.0, at: { d: [870, 585], m: [276, 1268] }, zone: 'top', tx: 780 },
    ],
  },
  {
    id: 'soir', kind: 'anim', tone: 't-night', icon: 'moon', color: 'var(--m3)', T: 8.9, anim: 'bedroom', swap: [3.0, 4.7], cover: [4.9, 6.5],
    box: { d: [705, 395, 1405, 815], m: [110, 1090, 970, 1590] },
    callouts: [
      // cadres du bas écartés du halo (cycle 3 : les deux cadres le cachaient)
      { t: 0.9, at: { d: [1100, 748], m: [665, 1478] }, zone: 'bottom', tx: 1430 },
      { t: 7.0, at: { d: [845, 590], m: [273, 1335] }, zone: 'top', tx: 800 },
      { t: 8.0, at: { d: [1058, 806], m: [468, 1590] }, zone: 'bottom', tx: 690 },
    ],
  },
  { id: 'gamme', kind: 'gamme', tone: 't-dark', icon: 'grid', color: 'var(--copper-soft)', T: 4.6 },
  { id: 'bilan', kind: 'bilan', tone: 't-cream', icon: 'check', color: 'var(--copper)', T: 3.2 },
];
const P = PAGES.length;

// réglages
const SMOOTH_S = 0.085; // lissage de l'animation du flacon (secondes)
const FADE = 0.45; // durée d'apparition d'un élément (secondes)
const SCROLL_FULL = 0.42; // en mode « page », la page est entièrement affichée quand on a défilé 42 % d'un écran au-delà de son début
const FETCH_PARALLEL = 6;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const ease = (x: number) => { const t = clamp01(x); return 1 - (1 - t) * (1 - t) * (1 - t); };
const esc = (s: string) => s.replace(/"/g, '&quot;');

interface Seq {
  key: string;
  cv: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  tau: number[];
  urls: string[];
  blobs: (Blob | null)[];
  bmps: (CanvasImageSource | null)[];
  pending: Set<number>;
  cur: number;
  target: number;
  dir: number;
  sig: string;
  started: boolean;
  done: boolean;
  loaded: number;
  chrono: string;
  chronoEl: HTMLElement | null;
}
interface Item { el: Element; t: number; end?: number; dim?: number; kind: 'fade' | 'path' | 'pop' | 'show'; last: number }
interface PageState { el: HTMLElement; act: number | null; done: boolean; t: number; items: Item[]; seq: Seq | null; seen: boolean }
interface Rect { x: number; y: number; w: number; h: number }

export function createJourneeEngine(
  root: HTMLElement,
  getLang: () => JourneeLang,
  base: string,
  onCta?: (label: string) => void,
  onScene?: (id: string) => void,
): JourneeEngine {
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) root.classList.add('jr-static');
  const TX = (): JourneeTexts => JOURNEE_TEXTS[getLang()] ?? JOURNEE_TEXTS.fr;
  const dec = (v: string) => (getLang() === 'en' ? v : v.replace('.', ','));
  const story = root.querySelector('.story') as HTMLElement;

  // ---------- état
  let M: Mode = 'pin';
  let F: Fmt = 'd';
  let st: PageState[] = [];
  let active = 0;
  let scrollProg = 0;
  let raf = 0, lastTs = 0, destroyed = false, prefetched = false;
  let lastW = 0, lastH = 0;
  let stage: HTMLElement | null = null, pinEl: HTMLElement | null = null;
  let stopBtns: HTMLElement[] = [];
  let nextBtn: HTMLElement | null = null, prevBtn: HTMLButtonElement | null = null, barEl: HTMLElement | null = null, fillEl: HTMLElement | null = null;
  let hintEl: HTMLElement | null = null, countEl: HTMLElement | null = null;
  let flowIO: IntersectionObserver | null = null, nearIO: IntersectionObserver | null = null, armIO: IntersectionObserver | null = null;
  let idleTimer = 0, armTimer = 0;
  let scrolledOnce = false;
  const seenIds = new Set<string>();

  const modeNow = (): Mode => (innerWidth / innerHeight >= 1.15 && innerHeight >= 560 && innerWidth >= 900 ? 'pin' : 'flow');
  const fmtNow = (m: Mode): Fmt => (m === 'pin' ? 'd' : innerWidth < innerHeight ? 'm' : 'd');
  const slot = () => innerHeight;
  const IMG = (k: string) => `${base}img/${k}_${F}.webp`;
  const seqBase = (k: string) => `${base}anim/${k}/${F}_base.webp`;
  const seqUrl = (k: string, i: number) => `${base}anim/${k}/${F}_p${String(i).padStart(3, '0')}.webp`;
  const pct = (v: number, t: number) => (v / t * 100).toFixed(3) + '%';
  const stopLabel = (i: number) => {
    const s = (TX() as any)[PAGES[i].id].stop as { time: string; sub: string };
    return s.time ? `${s.time} · ${s.sub}` : s.sub;
  };

  // ---------- éléments communs
  // Lumière d'ambiance (22:00) : le halo chaud sous la base s'allume à l'écran juste avant le cadre qui en parle
  // (sur le rendu, la lumière était trop faible pour se voir : retour des marques testeuses, 17/10/2026).
  const GLOW: Record<Fmt, XY> = { d: [1058, 812], m: [551, 1584] };
  function mediaHtml(pg: PageDef, alt: string) {
    const [W, H] = PIC[F];
    if (pg.kind === 'anim') {
      const r = PATCH[pg.anim!][F];
      const glow = pg.id === 'soir' ? `<span class="jr-glow" data-t="7.6" style="left:${pct(GLOW[F][0], W)};top:${pct(GLOW[F][1], H)}"></span>` : '';
      return `<img class="jr-img" src="${seqBase(pg.anim!)}" alt="${esc(alt)}" decoding="async">
        <canvas class="jr-patch" width="${r[2]}" height="${r[3]}" style="left:${pct(r[0], W)};top:${pct(r[1], H)};width:${pct(r[2], W)};height:${pct(r[3], H)}"></canvas>${glow}`;
    }
    return `<img class="jr-img" src="${IMG(pg.img!)}" alt="${esc(alt)}" decoding="async">`;
  }
  const chronoHtml = (tx: PhotoPageText, pg: PageDef, cls: string) =>
    pg.kind === 'anim' ? `<div class="${cls}" data-t="${(pg.swap![0] - 0.5).toFixed(2)}"><span class="n">${dec('0.0')}<small>s</small></span><span class="u">${tx.chrono}</span></div>` : '';
  const eyebrowHtml = (pg: PageDef, text: string, t = 0) =>
    `<p class="eyebrow" data-t="${t}"><i aria-hidden="true" style="--mi:${pg.color}">${ICON[pg.icon]}</i><span>${text}</span></p>`;

  function gammeHtml(g: GammePageText) {
    const ic = [['sunrise', 'var(--m1)'], ['sun', 'var(--m2)'], ['moon', 'var(--m3-light)']];
    return `<div class="g-left">
        <p class="eyebrow" data-t="0"><span>${g.eyebrow}</span></p>
        <ol class="g-recap">${g.recap.map((r, j) => `<li data-t="${(0.3 + j * 0.45).toFixed(2)}"><b><i aria-hidden="true" style="color:${ic[j][1]}">${ICON[ic[j][0]]}</i>${r.time}</b><span>${r.text}</span></li>`).join('')}</ol>
      </div>
      <div class="g-right">
        <h3 class="g-h" data-t="1.6">${g.h}</h3>
        <ul class="g-adv">${g.adv.map((a, j) => `<li data-t="${(2.0 + j * 0.42).toFixed(2)}"><b>${a.t}</b><span>${a.p}</span></li>`).join('')}</ul>
      </div>
      <p class="g-sign" data-t="3.9">${g.sign}</p>`;
  }
  function bilanHtml(b: BilanPageText) {
    return `<p class="eyebrow" data-t="0"><i aria-hidden="true">${ICON.check}</i><span>${b.eyebrow}</span></p>
      <h3 class="b-h" data-t="0">${b.h}</h3>
      <ul class="b-tiles">${b.tiles.map((x, j) => `<li data-t="${(0.5 + j * 0.4).toFixed(2)}"><strong>${x.big}</strong><span>${x.small}</span></li>`).join('')}</ul>
      <p class="b-note" data-t="1.5">${b.note}</p>
      <p class="b-p" data-t="1.9">${b.p}</p>
      <div class="b-cta" data-t="2.4"><a class="cta" href="#contact">${b.cta}${ICON.arrow}</a><a class="cta2" href="${calendlyUrl('journee_bilan')}" target="_blank" rel="noopener noreferrer">${ICON.cal}${b.cta2}</a></div>`;
  }

  // ---------- mode « page » (écran fixe, une page à la fois)
  function pinPageHtml(i: number) {
    const pg = PAGES[i], tx: any = (TX() as any)[pg.id];
    if (pg.kind === 'gamme') return `<div class="jr-bg jr-dark"></div><div class="jr-gamme">${gammeHtml(tx)}</div>`;
    if (pg.kind === 'bilan') return `<div class="jr-bg jr-cream"></div><div class="jr-bilan">${bilanHtml(tx)}</div>`;
    const t = tx as PhotoPageText;
    return `<div class="jr-media">${mediaHtml(pg, t.alt)}</div>
      <div class="jr-veil"></div>
      <svg class="jr-arrows" aria-hidden="true"></svg>
      <div class="jr-panel">
        ${eyebrowHtml(pg, t.eyebrow)}
        <h3 class="headline" data-t="0">${t.h}</h3>
        <p class="lead" data-t="0">${t.p}</p>
        ${chronoHtml(t, pg, 'chrono')}
      </div>
      <div class="jr-cos">${t.callouts.map((c, j) => `<div class="jr-co" data-j="${j}"><b>${c.t}</b><span>${c.p}</span></div>`).join('')}</div>`;
  }
  function buildPin() {
    const ui = TX().ui;
    story.innerHTML = `<div class="pin">
        <div class="stage">${PAGES.map((pg, i) => `<div class="jr-page ${pg.tone}" data-id="${pg.id}" aria-hidden="${i !== active}">${pinPageHtml(i)}</div>`).join('')}</div>
        <a class="jr-skip" href="#technologie">${ui.skip}</a>
        <p class="jr-hint" aria-hidden="true">${ICON.mouse}<span>${ui.hint}</span></p>
        <nav class="jr-nav" aria-label="${esc(ui.tlAria)}">
          <button type="button" class="jr-prev" aria-label="${esc(ui.prev)}">${ICON.left}</button>
          <ol class="jr-stops"><span class="jr-rail" aria-hidden="true"><i></i></span>${PAGES.map((pg, i) => {
            const s = (TX() as any)[pg.id].stop;
            return `<li><button type="button" class="jr-stop" data-i="${i}" style="--sc:${pg.color}" aria-label="${esc(s.time ? `${s.time} · ${s.sub}` : s.sub)}"><span class="sdot">${ICON[pg.icon]}</span><span class="time">${s.time || '&nbsp;'}</span><span class="sub">${s.sub}</span></button></li>`;
          }).join('')}</ol>
          <button type="button" class="jr-next"><span class="nx-txt"><span class="nx-l"></span><span class="nx-to"></span></span><span class="nx-ic">${ICON.right}</span><span class="nx-bar" aria-hidden="true"><i></i></span></button>
        </nav>
        <p class="jr-count" aria-live="polite"></p>
      </div>`;
    pinEl = story.querySelector('.pin');
    stage = story.querySelector('.stage');
    stopBtns = [...story.querySelectorAll<HTMLElement>('.jr-stop')];
    nextBtn = story.querySelector('.jr-next');
    prevBtn = story.querySelector('.jr-prev');
    barEl = story.querySelector('.nx-bar i');
    fillEl = story.querySelector('.jr-rail i');
    hintEl = story.querySelector('.jr-hint');
    countEl = story.querySelector('.jr-count');
    const pages = [...story.querySelectorAll<HTMLElement>('.jr-page')];
    st = pages.map((el, i) => newState(el, i));
  }

  // place les cadres blancs autour du produit et trace les flèches (mode « page »)
  function layoutPin() {
    if (M !== 'pin' || !stage) return;
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    const mw = Math.max(W, H * 16 / 9), mh = mw * 9 / 16, ml = (W - mw) / 2, mt = H - mh, k = mh / 1080;
    const toS = ([x, y]: XY): XY => [ml + x * k, mt + y * k];
    const nav = story.querySelector('.jr-nav') as HTMLElement | null;
    const sr = stage.getBoundingClientRect();
    const navTop = nav ? nav.getBoundingClientRect().top - sr.top : H - 96;
    const topSafe = Math.max(84, H * 0.095), botSafe = navTop - 14;
    PAGES.forEach((pg, i) => {
      if (!pg.callouts) return;
      const S = st[i];
      const panel = S.el.querySelector('.jr-panel') as HTMLElement;
      const pr = panel.getBoundingClientRect();
      const placed: Rect[] = [{ x: pr.left - sr.left, y: pr.top - sr.top, w: pr.width, h: pr.height }];
      const [px0, py0] = toS([pg.box!.d[0], pg.box!.d[1]]), [px1, py1] = toS([pg.box!.d[2], pg.box!.d[3]]);
      // cœur du produit (contour resserré) : un cadre peut le frôler, pas le recouvrir
      const core: Rect = { x: px0 + (px1 - px0) * 0.12, y: py0 + (py1 - py0) * 0.12, w: (px1 - px0) * 0.76, h: (py1 - py0) * 0.76 };
      const anchors: XY[] = pg.callouts.flatMap((c) => [toS(c.at.d), ...(c.move ? [toS(c.move.at.d)] : [])]);
      const segs: [XY, XY][] = [];
      const boxes = [...S.el.querySelectorAll<HTMLElement>('.jr-co')];
      let svg = `<defs></defs>`;
      pg.callouts.forEach((c, j) => {
        const b = boxes[j];
        const bw = b.offsetWidth, bh = b.offsetHeight;
        const a = toS(c.at.d), a2 = c.move ? toS(c.move.at.d) : null;
        // position idéale du cadre selon le côté du produit (au-dessus, à droite, en dessous, à gauche)
        const zoneBase = (z: Zone): XY => {
          const cx = z === c.zone && c.tx != null ? toS([c.tx, 0])[0] : a[0];
          if (z === 'top') return [cx - bw / 2, py0 - 24 - bh];
          if (z === 'bottom') return [cx - bw / 2, py1 + 24];
          if (z === 'right') return [px1 + 28, a[1] - bh / 2];
          return [px0 - 28 - bw, a[1] - bh / 2];
        };
        // on essaie de nombreuses positions (côté prévu d'abord, puis les autres côtés) et on garde la meilleure :
        // aucun chevauchement, aucune flèche qui en croise une autre ou qui traverse un cadre, le produit reste visible
        const sy = bh + 14;
        const dxs = [0, -60, 60, -130, 130, -210, 210, -300, 300, -400, 400, -520, 520, -660, 660];
        const zones: Zone[] = [c.zone, ...(['top', 'right', 'bottom', 'left'] as Zone[]).filter((z) => z !== c.zone)];
        let best: Rect | null = null, bestCost = Infinity;
        for (const z of zones) {
          const [x0, y0] = zoneBase(z);
          const dys = z === 'top' ? [0, -sy, sy * 0.5, -2 * sy] : z === 'bottom' ? [0, sy, -sy * 0.5, 2 * sy] : [0, sy * 0.6, -sy * 0.6, sy * 1.2, -sy * 1.2];
          for (const dy of dys) for (const dx of dxs) {
            const x = Math.min(Math.max(x0 + dx, 16), W - 16 - bw), y = Math.min(Math.max(y0 + dy, topSafe), botSafe - bh);
            const r: Rect = { x, y, w: bw, h: bh };
            // un chevauchement n'est accepté qu'en dernier recours (très coûteux)
            const hit = placed.reduce((s, q) => s + (overlaps(r, q, 12) ? 1 : 0), 0);
            let cost = (z === c.zone ? 0 : 380) + Math.hypot(x - x0, (y - y0) * 1.4) + hit * 20000;
            for (const tgt of a2 ? [a, a2] : [a]) {
              const s = startPoint(r, tgt);
              if (segs.some(([p, q]) => crosses(s, tgt, p, q))) cost += 1500;
              if (placed.some((q) => segHitsRect(s, tgt, q))) cost += 1500;
            }
            if (segs.some(([p, q]) => segHitsRect(p, q, r))) cost += 1500;
            if (anchors.some(([px, py]) => px > r.x - 8 && px < r.x + r.w + 8 && py > r.y - 8 && py < r.y + r.h + 8)) cost += 2000;
            cost += overlapArea(r, core) * 0.03;
            if (cost < bestCost) { bestCost = cost; best = r; }
          }
        }
        const r = best as Rect;
        placed.push(r);
        segs.push([startPoint(r, a), a]);
        if (a2) segs.push([startPoint(r, a2), a2]);
        b.style.transform = `translate(${r.x.toFixed(1)}px, ${r.y.toFixed(1)}px)`;
        svg += arrowSvg(r, a, String(j));
        if (a2) svg += arrowSvg(r, a2, `${j}b`);
      });
      const el = S.el.querySelector('svg.jr-arrows') as SVGSVGElement;
      el.setAttribute('viewBox', `0 0 ${W} ${H}`);
      el.innerHTML = svg;
      collectItems(i);
    });
    requestTick();
  }
  // point de départ de la flèche : le milieu du bord du cadre qui fait face à la pièce montrée
  function startPoint(b: Rect, [ax, ay]: XY): XY {
    const cx = Math.min(Math.max(ax, b.x), b.x + b.w), cy = Math.min(Math.max(ay, b.y), b.y + b.h);
    const dx = ax - cx, dy = ay - cy;
    if (Math.abs(dy) >= Math.abs(dx)) return [Math.min(Math.max(ax, b.x + 22), b.x + b.w - 22), dy > 0 ? b.y + b.h : b.y];
    return [dx > 0 ? b.x + b.w : b.x, Math.min(Math.max(ay, b.y + 16), b.y + b.h - 16)];
  }
  const overlaps = (r: Rect, q: Rect, m: number) => r.x < q.x + q.w + m && r.x + r.w + m > q.x && r.y < q.y + q.h + m && r.y + r.h + m > q.y;
  const overlapArea = (r: Rect, q: Rect) => Math.max(0, Math.min(r.x + r.w, q.x + q.w) - Math.max(r.x, q.x)) * Math.max(0, Math.min(r.y + r.h, q.y + q.h) - Math.max(r.y, q.y));
  const side = (a: XY, b: XY, c: XY) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const crosses = (p1: XY, p2: XY, p3: XY, p4: XY) => (side(p3, p4, p1) > 0) !== (side(p3, p4, p2) > 0) && (side(p1, p2, p3) > 0) !== (side(p1, p2, p4) > 0);
  const segHitsRect = (p: XY, q: XY, r: Rect) => {
    const inside = (z: XY) => z[0] > r.x + 2 && z[0] < r.x + r.w - 2 && z[1] > r.y + 2 && z[1] < r.y + r.h - 2;
    if (inside(p) || inside(q)) return true;
    const c: XY[] = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
    return c.some((u, i) => crosses(p, q, u, c[(i + 1) % 4]));
  };
  function arrowSvg(b: Rect, [ax, ay]: XY, j: string) {
    const [sx, sy] = startPoint(b, [ax, ay]);
    const L = Math.hypot(ax - sx, ay - sy);
    const dot = `<circle class="adot" data-j="${j}" cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="5.5"></circle>`;
    if (L < 24) return `<g class="a">${dot}</g>`;
    const ux = (ax - sx) / L, uy = (ay - sy) / L;
    const ex = ax - ux * 10, ey = ay - uy * 10; // la pointe s'arrête juste avant le point
    const hx = ex - ux * 12, hy = ey - uy * 12, nx = -uy * 6, ny = ux * 6;
    const line = `M${sx.toFixed(1)} ${sy.toFixed(1)}L${hx.toFixed(1)} ${hy.toFixed(1)}`;
    return `<g class="a"><path class="halo" data-j="${j}" pathLength="100" d="${line}"></path><path class="wire" data-j="${j}" pathLength="100" d="${line}"></path>
      <path class="head" data-j="${j}" d="M${ex.toFixed(1)} ${ey.toFixed(1)}L${(hx + nx).toFixed(1)} ${(hy + ny).toFixed(1)}L${(hx - nx).toFixed(1)} ${(hy - ny).toFixed(1)}Z"></path>${dot}</g>`;
  }

  // ---------- mode « flux » (pages posées les unes sous les autres)
  function flowPageHtml(i: number) {
    const pg = PAGES[i], tx: any = (TX() as any)[pg.id], ui = TX().ui;
    if (pg.kind === 'gamme') return `<article class="fpage f-gamme ${pg.tone}" data-id="${pg.id}"><div class="f-wrap">${gammeHtml(tx)}</div></article>`;
    if (pg.kind === 'bilan') return `<article class="fpage f-bilan ${pg.tone}" data-id="${pg.id}"><div class="f-wrap">${bilanHtml(tx)}</div></article>`;
    const t = tx as PhotoPageText;
    const [W] = PIC[F], [y0, bh] = BAND[F], H = PIC[F][1];
    const dot = (key: string, [x, y]: XY, n: number) => `<span class="f-dot" data-j="${key}" style="left:${pct(x, W)};top:${pct(y - y0, bh)}">${n}</span>`;
    const dots = pg.callouts!.map((c, j) => dot(String(j), c.at[F], j + 1) + (c.move ? dot(`${j}b`, c.move.at[F], j + 1) : '')).join('');
    return `<article class="fpage ${pg.tone}" data-id="${pg.id}">
        <div class="f-head">${eyebrowHtml(pg, t.eyebrow)}<h3 class="headline" data-t="0">${t.h}</h3><p class="lead" data-t="0">${t.p}</p></div>
        <figure class="f-media" style="aspect-ratio:${W} / ${bh}">
          <div class="f-inner" style="top:${pct(-y0, bh)};height:${pct(H, bh)}">${mediaHtml(pg, t.alt)}</div>
          ${dots}
          ${chronoHtml(t, pg, 'f-chrono')}
        </figure>
        <ol class="f-cos">${t.callouts.map((c, j) => `<li data-j="${j}"><span class="num" aria-hidden="true">${j + 1}</span><div><b>${c.t}</b><p>${c.p}</p></div></li>`).join('')}</ol>
      </article>${i < P - 1 ? `<p class="f-sep" aria-hidden="true">${ui.seq}${ICON.down}</p>` : ''}`;
  }
  function buildFlow() {
    const ui = TX().ui;
    story.innerHTML = `<a class="jr-skip f-skip" href="#technologie">${ui.skip}</a><div class="flow">${PAGES.map((_, i) => flowPageHtml(i)).join('')}</div>`;
    stage = null; pinEl = null; stopBtns = []; nextBtn = null; prevBtn = null; barEl = null; fillEl = null; hintEl = null; countEl = null;
    const pages = [...story.querySelectorAll<HTMLElement>('.fpage')];
    st = pages.map((el, i) => newState(el, i));
    st.forEach((_, i) => collectItems(i));
    if ('IntersectionObserver' in window) {
      flowIO = new IntersectionObserver((en) => {
        en.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = st.findIndex((S) => S.el === e.target);
          if (i >= 0 && st[i].act == null) { st[i].act = performance.now(); track(i); requestTick(); }
        });
      }, { threshold: 0.3 });
      nearIO = new IntersectionObserver((en) => {
        en.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = st.findIndex((S) => S.el === e.target);
          if (i >= 0 && st[i].seq && prefetched) startLoading(st[i].seq!);
        });
      }, { rootMargin: '80% 0px' });
      st.forEach((S) => { flowIO!.observe(S.el); nearIO!.observe(S.el); });
    } else st.forEach((S) => { S.act = performance.now(); });
  }

  // ---------- état d'une page et liste des éléments qui apparaissent dans le temps
  function newState(el: HTMLElement, i: number): PageState {
    const pg = PAGES[i];
    let seq: Seq | null = null;
    if (pg.kind === 'anim') {
      const cv = el.querySelector('canvas') as HTMLCanvasElement | null;
      const tau = ANIM_TAU[pg.anim!]?.[F];
      if (cv && tau) {
        seq = {
          key: pg.anim!, cv, ctx: cv.getContext('2d') as CanvasRenderingContext2D, tau, urls: tau.map((_, n) => seqUrl(pg.anim!, n)), blobs: tau.map(() => null),
          bmps: tau.map(() => null), pending: new Set(), cur: 0, target: 0, dir: 1, sig: '', started: false, done: false, loaded: 0, chrono: '',
          chronoEl: el.querySelector('.chrono .n, .f-chrono .n'),
        };
      }
    }
    return { el, act: null, done: false, t: 0, items: [], seq, seen: false };
  }
  function collectItems(i: number) {
    const S = st[i], pg = PAGES[i], items: Item[] = [];
    S.el.querySelectorAll<HTMLElement>('[data-t]').forEach((el) => items.push({ el, t: +(el.dataset.t as string), kind: el.classList.contains('jr-glow') ? 'pop' : 'fade', last: -1 }));
    const arrowItems = (key: string, t: number, end?: number) => {
      S.el.querySelectorAll(`.jr-arrows path.halo[data-j="${key}"], .jr-arrows path.wire[data-j="${key}"]`).forEach((el) => items.push({ el, t: t + 0.2, end, kind: 'path', last: -1 }));
      S.el.querySelectorAll(`.jr-arrows .head[data-j="${key}"], .jr-arrows .adot[data-j="${key}"], .f-dot[data-j="${key}"]`).forEach((el) => items.push({ el, t: t + (M === 'pin' ? 0.55 : 0), end, kind: 'pop', last: -1 }));
    };
    (pg.callouts || []).forEach((c, j) => {
      // sur téléphone, on lit les explications en faisant défiler : elles sont toutes là dès l'arrivée sur la page (cascade rapide)
      const t0 = M === 'pin' ? c.t : 0.15 + 0.12 * j;
      S.el.querySelectorAll(`.jr-co[data-j="${j}"], .f-cos li[data-j="${j}"]`).forEach((el) => items.push({ el, t: t0, dim: el.classList.contains('jr-co') ? c.end : undefined, kind: 'fade', last: -1 }));
      arrowItems(String(j), t0, c.end ?? c.move?.t);
      if (c.move) arrowItems(`${j}b`, c.move.t + 0.15);
    });
    S.items = items;
    S.items.forEach((it) => { it.last = -1; });
  }
  function renderItems(S: PageState, t: number) {
    for (const it of S.items) {
      // apparition (0 -> 1), puis éventuellement effacement (la pièce montrée a bougé) ou atténuation (cadre d'une étape passée)
      const pin = it.t <= 0 ? 1 : reduce ? (t >= it.t ? 1 : 0) : clamp01((t - it.t) / (it.kind === 'path' ? 0.5 : FADE));
      let k = 1;
      if (it.end != null) k *= 1 - (reduce ? (t >= it.end ? 1 : 0) : clamp01((t - it.end) / 0.3));
      if (it.dim != null) k *= 1 - 0.4 * (reduce ? (t >= it.dim ? 1 : 0) : clamp01((t - it.dim) / 0.4));
      const key = pin * 1e4 + k;
      if (key === it.last) continue;
      it.last = key;
      const e = ease(pin), s = (it.el as HTMLElement).style ?? (it.el as SVGElement).style;
      if (it.kind === 'fade') {
        s.opacity = (e * k).toFixed(3);
        s.translate = pin >= 1 ? '0 0' : `0 ${((1 - e) * 10).toFixed(2)}px`;
      } else if (it.kind === 'path') {
        s.strokeDashoffset = (100 * (1 - e)).toFixed(2);
        s.opacity = pin > 0 ? k.toFixed(3) : '0';
      } else {
        s.opacity = (e * k).toFixed(3);
      }
    }
  }

  // ---------- animation du flacon (reprise de la version 6)
  const requestTick = () => { if (!raf && !destroyed) raf = requestAnimationFrame(tick); };
  const lightConnection = () => {
    const c = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    return !!c && (c.saveData === true || c.effectiveType === 'slow-2g' || c.effectiveType === '2g' || c.effectiveType === '3g');
  };
  // une animation à la fois : la suivante commence quand la précédente est chargée
  function startNextAnim() {
    const S = st.find((x) => x.seq && !x.seq.started);
    if (S) startLoading(S.seq!);
  }
  function startLoading(S: Seq) {
    if (S.started) return;
    S.started = true;
    const light = lightConnection();
    const order = S.tau.map((_, i) => i)
      .filter((i) => !light || Number.isInteger(S.tau[i]))
      .sort((a, b) => (Number.isInteger(S.tau[b]) ? 1 : 0) - (Number.isInteger(S.tau[a]) ? 1 : 0) || a - b);
    let next = 0, act = 0;
    const pump = () => {
      while (act < FETCH_PARALLEL && next < order.length && !destroyed) {
        const i = order[next++]; act++;
        fetch(S.urls[i]).then((r) => (r.ok ? r.blob() : null)).then((b) => { S.blobs[i] = b; S.loaded++; }).catch(() => { /* image manquante : on s'en passe */ })
          .finally(() => { act--; S.sig = ''; pump(); requestTick(); });
      }
      if (next >= order.length && act === 0 && !S.done) { S.done = true; if (!destroyed) startNextAnim(); }
    };
    pump();
  }
  function decodeFrame(S: Seq, i: number) {
    const b = S.blobs[i];
    if (!b || S.bmps[i] || S.pending.has(i)) return;
    S.pending.add(i);
    const done = (bm: CanvasImageSource | null) => { S.pending.delete(i); if (bm && !destroyed) { S.bmps[i] = bm; S.sig = ''; requestTick(); } };
    if (typeof createImageBitmap === 'function') createImageBitmap(b).then(done).catch(() => done(null));
    else { const im = new Image(); im.src = URL.createObjectURL(b); im.decode().then(() => done(im)).catch(() => done(null)); }
  }
  function densePos(tau: number[], f: number) {
    let lo = 0, hi = tau.length - 1;
    if (f <= tau[0]) return 0;
    if (f >= tau[hi]) return hi;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (tau[mid] <= f) lo = mid; else hi = mid; }
    return lo + (f - tau[lo]) / (tau[hi] - tau[lo]);
  }
  function ensureWindow(S: Seq, p: number) {
    const c = Math.floor(p), behind = S.dir < 0 ? 16 : 6, ahead = S.dir < 0 ? 6 : 16;
    for (let i = Math.max(0, c - behind); i <= Math.min(S.tau.length - 1, c + ahead); i++) decodeFrame(S, i);
    for (let i = 0; i < S.bmps.length; i++) {
      const bm = S.bmps[i];
      if (bm && (i < c - behind - 14 || i > c + ahead + 14)) { (bm as ImageBitmap).close?.(); S.bmps[i] = null; }
    }
  }
  function drawSeq(S: Seq) {
    const p = densePos(S.tau, S.cur), i = Math.floor(p);
    let i0 = i; while (i0 >= 0 && !S.bmps[i0]) i0--;
    let i1 = Math.min(S.tau.length - 1, i + 1); while (i1 < S.tau.length && !S.bmps[i1]) i1++;
    if (!(i0 < 0 && i1 >= S.tau.length)) {
      if (i0 < 0) i0 = i1;
      if (i1 >= S.tau.length) i1 = i0;
      let a = i1 === i0 ? 0 : clamp01((S.cur - S.tau[i0]) / (S.tau[i1] - S.tau[i0]));
      if (reduce) a = a < 0.5 ? 0 : 1;
      const sig = `${i0}:${i1}:${Math.round(a * 48)}`;
      if (sig !== S.sig) {
        S.sig = sig;
        const ctx = S.ctx;
        ctx.globalAlpha = 1;
        ctx.drawImage(S.bmps[i0] as CanvasImageSource, 0, 0);
        if (a > 0.02 && i1 !== i0) { ctx.globalAlpha = a; ctx.drawImage(S.bmps[i1] as CanvasImageSource, 0, 0); ctx.globalAlpha = 1; }
      }
    }
    const label = dec((Math.min(S.cur, NSW - 1) / (NSW - 1)).toFixed(1));
    if (label !== S.chrono && S.chronoEl) { S.chrono = label; S.chronoEl.innerHTML = label + '<small>s</small>'; }
  }
  function frameFor(pg: PageDef, t: number) {
    const [a0, a1] = pg.swap!, [b0, b1] = pg.cover!;
    if (t <= a0) return 0;
    if (t < a1) return (NSW - 1) * (t - a0) / (a1 - a0);
    if (t <= b0) return NSW - 1;
    if (t < b1) return NSW + (NFR - 1 - NSW) * (t - b0) / (b1 - b0);
    return NFR - 1;
  }

  // ---------- temps de chaque page
  function pageT(i: number, now: number) {
    const S = st[i], pg = PAGES[i];
    if (S.done) return pg.T + 0.001;
    let t = S.act != null ? (now - S.act) / 1000 : 0;
    if (M === 'pin' && i === active) t = Math.max(t, scrollProg * pg.T);
    if (reduce && S.act != null) t = pg.T + 0.001;
    return t;
  }
  function tick(ts: number) {
    raf = 0;
    if (destroyed) return;
    const now = performance.now();
    const dt = lastTs ? Math.min(0.05, Math.max(0.001, (ts - lastTs) / 1000)) : 0.016;
    lastTs = ts;
    let busy = false;
    const live = M === 'pin' ? [active] : st.map((_, i) => i).filter((i) => st[i].act != null || st[i].done);
    for (const i of live) {
      const pg = PAGES[i], S = st[i];
      const t = pageT(i, now);
      S.t = t;
      renderItems(S, t);
      if (S.seq) {
        const Q = S.seq;
        Q.target = frameFor(pg, t);
        const d = Q.target - Q.cur;
        if (reduce) Q.cur = Q.target;
        else { Q.cur += d * (1 - Math.exp(-dt / SMOOTH_S)); if (Math.abs(Q.target - Q.cur) < 0.004) Q.cur = Q.target; }
        if (d !== 0) Q.dir = Math.sign(d);
        ensureWindow(Q, densePos(Q.tau, Q.cur));
        drawSeq(Q);
        if (Q.cur !== Q.target || Q.pending.size > 0) busy = true;
      }
      if (t >= pg.T) { if (!S.done) S.done = true; }
      else if (S.act != null || (M === 'pin' && scrollProg > 0)) busy = true;
    }
    if (M === 'pin') navProgress();
    if (busy) raf = requestAnimationFrame(tick); else lastTs = 0;
  }

  // ---------- navigation (mode « page »)
  function navProgress() {
    const S = st[active];
    if (!S) return;
    const p = clamp01(S.t / PAGES[active].T);
    if (barEl) barEl.style.width = (p * 100).toFixed(1) + '%';
    if (nextBtn) nextBtn.classList.toggle('ready', p >= 1);
  }
  function updateNav() {
    if (M !== 'pin') return;
    const ui = TX().ui;
    stopBtns.forEach((b, i) => {
      if (i === active) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      b.classList.toggle('past', i < active);
    });
    if (fillEl) fillEl.style.width = (active / (P - 1) * 100).toFixed(2) + '%';
    if (prevBtn) prevBtn.disabled = active === 0;
    if (nextBtn) {
      const last = active === P - 1;
      (nextBtn.querySelector('.nx-l') as HTMLElement).textContent = last ? ui.end : ui.next;
      (nextBtn.querySelector('.nx-to') as HTMLElement).textContent = last ? '' : stopLabel(active + 1);
      (nextBtn.querySelector('.nx-ic') as HTMLElement).innerHTML = last ? ICON.down : ICON.right;
      nextBtn.setAttribute('aria-label', last ? ui.end : `${ui.next} : ${stopLabel(active + 1)}`);
    }
    if (countEl) countEl.textContent = ui.step.replace('{n}', String(active + 1)).replace('{N}', String(P));
    if (pinEl) pinEl.dataset.tone = PAGES[active].tone;
  }
  function track(i: number) {
    const id = PAGES[i].id;
    if (!onScene || seenIds.has(id)) return;
    seenIds.add(id);
    try { onScene(id); } catch { /* le suivi ne doit jamais gêner la page */ }
  }
  const storyVisible = () => { const r = story.getBoundingClientRect(); return r.top < innerHeight * 0.22 && r.bottom > innerHeight * 0.6; };
  function setActive(k: number, dir: number) {
    active = k;
    st.forEach((S, i) => { S.el.classList.toggle('on', i === k); S.el.setAttribute('aria-hidden', String(i !== k)); });
    if (dir < 0) st[k].done = true;
    if (st[k].act == null && storyVisible()) { st[k].act = performance.now(); track(k); }
    if (prefetched) [k, k + 1].forEach((i) => { if (st[i]?.seq) startLoading(st[i].seq!); });
    updateNav();
    requestTick();
  }
  function updatePin() {
    const r = story.getBoundingClientRect();
    const u = -r.top / slot();
    const k = Math.min(P - 1, Math.max(0, Math.floor(u + 0.5)));
    const s = u - k;
    scrollProg = s <= 0 ? 0 : clamp01(s / SCROLL_FULL);
    if (k !== active) setActive(k, k > active ? 1 : -1);
    if (st[active].act == null && storyVisible()) { st[active].act = performance.now(); track(active); }
    if (hintEl) hintEl.classList.toggle('gone', scrolledOnce || active > 0);
    requestTick();
  }
  function goto(k: number, instant?: boolean) {
    k = Math.min(P - 1, Math.max(0, k));
    if (M === 'pin') {
      const top = story.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + k * slot() + 2, behavior: ((reduce || instant) ? 'instant' : 'smooth') as ScrollBehavior });
    } else {
      st[k]?.el.scrollIntoView({ behavior: (reduce || instant) ? 'instant' as ScrollBehavior : 'smooth', block: 'start' });
    }
  }
  function next() {
    if (active >= P - 1) { document.getElementById('technologie')?.scrollIntoView({ behavior: reduce ? 'instant' as ScrollBehavior : 'smooth' }); return; }
    goto(active + 1);
  }

  // ---------- construction / reconstruction
  function sizeStory() {
    story.style.height = M === 'pin' ? (innerHeight + (P - 1 + 0.55) * slot()) + 'px' : '';
  }
  function build() {
    flowIO?.disconnect(); nearIO?.disconnect(); flowIO = null; nearIO = null;
    for (const S of st) S.seq?.bmps.forEach((bm) => (bm as ImageBitmap | null)?.close?.());
    M = modeNow();
    F = fmtNow(M);
    root.classList.remove('mode-pin', 'mode-flow', 'fmt-d', 'fmt-m');
    root.classList.add('mode-' + M, 'fmt-' + F);
    if (M === 'pin') buildPin(); else buildFlow();
    sizeStory();
    if (M === 'pin') {
      st.forEach((_, i) => collectItems(i));
      layoutPin();
      st.forEach((S, i) => { S.el.classList.toggle('on', i === active); });
      updateNav();
      updatePin();
    }
    if (prefetched) startNextAnim();
    requestTick();
  }
  const onScroll = () => {
    if (M !== 'pin') return;
    if (!scrolledOnce && story.getBoundingClientRect().top < -8) scrolledOnce = true;
    updatePin();
  };
  const onResize = () => {
    const changed = modeNow() !== M || fmtNow(modeNow()) !== F;
    if (changed) { lastW = innerWidth; lastH = innerHeight; build(); return; }
    // sur téléphone, la barre d'adresse qui se replie change la hauteur : on ne recalcule que si la taille change vraiment
    if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 120) { lastW = innerWidth; lastH = innerHeight; sizeStory(); layoutPin(); }
    if (M === 'pin') updatePin();
  };
  const onClick = (ev: Event) => {
    const el = ev.target as HTMLElement | null;
    if (!el?.closest) return;
    if (el.closest('.jr-next')) { next(); return; }
    if (el.closest('.jr-prev')) { goto(active - 1); return; }
    const stop = el.closest('.jr-stop') as HTMLElement | null;
    if (stop) { goto(+(stop.dataset.i as string)); return; }
    const a = el.closest('a.cta, a.cta2');
    if (a && onCta) onCta((a.textContent || '').trim());
  };
  const onKey = (ev: KeyboardEvent) => {
    if (M !== 'pin' || ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const tg = ev.target as HTMLElement | null;
    if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName))) return;
    const r = story.getBoundingClientRect();
    if (r.top > 2 || r.bottom < innerHeight - 2) return; // la visite n'occupe pas l'écran
    if (ev.key === 'ArrowRight') { ev.preventDefault(); next(); }
    else if (ev.key === 'ArrowLeft') { ev.preventDefault(); goto(active - 1); }
  };

  // ---------- démarrage
  build();
  lastW = innerWidth; lastH = innerHeight;
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);
  addEventListener('keydown', onKey);
  root.addEventListener('click', onClick);
  // les tailles des cadres dépendent de la police : on les replace quand elle est chargée
  (document as any).fonts?.ready?.then(() => { if (!destroyed) layoutPin(); });
  // Les images d'animation ne se chargent pas pendant l'arrivée sur la page : le haut (film, titre, bouton) passe d'abord.
  // Elles démarrent quand la visite approche de l'écran (au moins 2,5 s après l'ouverture), ou au bout de 6 s.
  const arm = () => { if (prefetched || destroyed) return; prefetched = true; startNextAnim(); };
  idleTimer = window.setTimeout(arm, 6000);
  if ('IntersectionObserver' in window) {
    armIO = new IntersectionObserver((en, ob) => {
      if (en.some((x) => x.isIntersecting)) { ob.disconnect(); armTimer = window.setTimeout(arm, Math.max(0, 2500 - performance.now())); }
    }, { rootMargin: '40% 0px' });
    armIO.observe(story);
  } else { armTimer = setTimeout(arm, Math.max(0, 2500 - performance.now())) as unknown as number; }

  return {
    rebuild() { const keep = scrollY; build(); scrollTo({ top: keep, behavior: 'instant' as ScrollBehavior }); },
    destroy() {
      destroyed = true;
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('keydown', onKey);
      root.removeEventListener('click', onClick);
      flowIO?.disconnect(); nearIO?.disconnect(); armIO?.disconnect();
      clearTimeout(idleTimer); clearTimeout(armTimer);
      if (raf) cancelAnimationFrame(raf);
      for (const S of st) S.seq?.bmps.forEach((bm) => (bm as ImageBitmap | null)?.close?.());
    },
    goto,
    // pour les contrôles automatiques : affiche tout de suite la page en cours en entier
    finish() { if (st[active]) { st[active].done = true; requestTick(); } },
    info: () => ({ mode: M, format: F, page: active, t: +(st[active]?.t ?? 0).toFixed(2), pages: P, done: !!st[active]?.done }),
    debug: () => Object.fromEntries(st.filter((S) => S.seq).map((S) => [S.seq!.key, { frames: S.seq!.tau.length, charges: S.seq!.loaded, decodees: S.seq!.bmps.filter(Boolean).length, cur: +S.seq!.cur.toFixed(2), target: +S.seq!.target.toFixed(2) }])),
  };
}
