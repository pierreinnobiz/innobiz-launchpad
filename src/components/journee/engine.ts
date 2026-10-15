/* Moteur de la séquence « Une journée avec Tolia » (version 5, 14/10/2026).
   Repris de la présentation de Pierre : l'écran reste fixe, bord à bord, et le défilement pilote les messages ET
   l'animation 3D (en avant : le flacon change puis la cloche est reposée ; en arrière : tout se rembobine).
   Adapté au site : textes multilingues (FR / EN / ES), reconstruction à chaud au changement de langue,
   images chargées au dernier moment, nettoyage complet quand la section disparaît. */
import { JOURNEE_TEXTS, type JourneeLang } from './texts';

type Fmt = 'd' | 'm';
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface JourneeEngine {
  rebuild: () => void;
  destroy: () => void;
  jump: (step: number, instant?: boolean) => void;
  info: () => { format: Fmt; step: number; fs: number; steps: number };
  goto: (step: number) => void;
}

const ICON: Record<string, string> = {
  sunrise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 17a7 7 0 0 1 14 0"/><path d="M2.5 17h19M7 20h10M12 5.5v2.2M4.9 9.6l1.6 1.4M19.1 9.6l-1.6 1.4M8.2 7l.9 2M15.8 7l-.9 2"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 3.2a8.8 8.8 0 1 0 5.3 15.1A7.6 7.6 0 0 1 15.5 3.2z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 12.5l4.2 4.2L18.5 7.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
};

// ---------- géométrie des images : points du produit mesurés sur les décors (2752 x 1536 px)
const ASSET = { d: { W: 1920, H: 1080 }, m: { W: 1080, H: 1920 } } as const;
const CROP: Record<string, Record<Fmt, [number, number, number]>> = {
  kitchen: { d: [795, 444, 1920 / 1900], m: [1408, 0, 1.25] },
  living: { d: [715, 467, 1920 / 1900], m: [1329, 0, 1.25] },
  bedroom: { d: [675, 467, 1920 / 1900], m: [1281, 0, 1.25] },
};
const PG: Record<string, { b: [number, number]; w: number[] }> = {
  kitchen: { b: [1840, 893], w: [2008.6, 2171.3, 1153, 935] },
  living: { b: [1766, 977.6], w: [1925, 2100.8, 1236.5] },
  bedroom: { b: [1721, 969.3], w: [1872, 2050, 1236.5] },
};
const MANIFEST: Record<string, Record<Fmt, { rect: number[] }>> = {
  living: { d: { rect: [518, 200, 1402, 676] }, m: { rect: [0, 836, 1080, 762] } },
  bedroom: { d: { rect: [0, 188, 1410, 876] }, m: { rect: [0, 822, 982, 964] } },
};
const NFR = 51; // images par animation
const NSW = 25; // 0-24 changement de flacon (chrono 0 -> 1 s) | 25-42 cloche reposée | 43-50 la brume repart
const N = 38; // nombre d'étapes
const BEAT: number[] = Array(N).fill(1);
BEAT[9] = BEAT[10] = 1.15; BEAT[12] = 1.6; BEAT[18] = BEAT[19] = 1.15; BEAT[20] = 1.6;
const SCRUB: Record<string, number[][]> = {
  living: [[9, 11, 0, NSW - 1], [12, 13, NSW, NFR - 1]],
  bedroom: [[18, 20, 0, NSW - 1], [20, 21, NSW, NFR - 1]],
};
const STOPDEF = [
  { icon: 'sunrise', c: 'var(--m1)', step: 0 },
  { icon: 'sun', c: 'var(--m2)', step: 8 },
  { icon: 'moon', c: 'var(--m3)', step: 16 },
  { icon: 'check', c: 'var(--copper)', step: 22 },
];
const CUM: number[] = [0];
BEAT.forEach((b) => CUM.push(CUM[CUM.length - 1] + b));

export function createJourneeEngine(
  root: HTMLElement,
  getLang: () => JourneeLang,
  base: string,
  onCta?: (label: string) => void,
): JourneeEngine {
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) root.classList.add('jr-static');
  const T = (k: string): any => (JOURNEE_TEXTS[getLang()] ?? JOURNEE_TEXTS.fr)[k];
  const dec = (v: string) => (getLang() === 'en' ? v : v.replace('.', ','));
  const q = <E extends Element = HTMLElement>(sel: string) => root.querySelector(sel) as E | null;

  // ---------- état
  let F: Fmt = 'd';
  let SC: any[] = [];
  let scenes: HTMLElement[] = [];
  let stopBtns: HTMLElement[] = [];
  let seqs: Record<string, any> = {};
  let cur = -1, fsNow = 0, raf = 0, SAFE_TOP = 0;
  let story: HTMLElement, pin: HTMLElement, stage: HTMLElement, fill: HTMLElement, cursor: HTMLElement, stopsEl: HTMLElement;
  let hint: HTMLElement | null = null;
  let prefetched = false, lastW = 0, lastH = 0, destroyed = false;
  let io: IntersectionObserver | null = null;

  // format vertical (téléphone) seulement pour les écrans très allongés ; une tablette tenue à la verticale (3:4) garde la composition large,
  // sinon les étiquettes posées sur l'image viennent recouvrir les titres
  const fmtNow = (): Fmt => (innerWidth / innerHeight < 0.62 ? 'm' : 'd');
  const toPic = (key: string, [x, y]: number[]) => { const [x0, y0, s] = CROP[key][F]; return [(x - x0) * s, (y - y0) * s]; };
  const pct = (v: number, t: number) => (v / t * 100).toFixed(3) + '%';
  const IMG = (k: string) => `${base}img/${k}_${F}.webp`;
  const seqBase = (k: string) => `${base}anim/${k}/${F}_base.webp`;
  const seqPatch = (k: string, i: number) => `${base}anim/${k}/${F}_p${String(i).padStart(3, '0')}.webp`;

  const FMT = () => ({
    d: {
      sw: 2, hw: 6,
      prim([x, y]: number[]) { const yE = Math.max(y - 120, SAFE_TOP + 24), xE = x + 130; return { dot: [x, y + 10], d: `M${x} ${y + 10}V${yE}H${xE}`, at: [xE + 14, yE], a: 'a-right' }; },
      sec([x0, x1, f]: number[]) {
        const yb = f + 19, cx = (x0 + x1) / 2, y2 = yb + 55, x2 = x1 + 26;
        return { d: `M${x0 + 7} ${yb - 13}V${yb}H${x1 - 7}V${yb - 13}M${cx} ${yb}V${y2}H${x2}`, at: [x2 + 14, y2], a: 'a-right' };
      },
    },
    m: {
      sw: 2.8, hw: 8,
      prim([x, y]: number[]) { const yP = y - 250; return { dot: [x, y + 10], d: `M${x} ${y + 10}V${yP}`, at: [x, yP - 16], a: 'a-above' }; },
      sec([x0, x1, , t]: number[]) {
        const yb = t - 22, cx = (x0 + x1) / 2, y2 = yb - 70;
        return { d: `M${x0 + 11} ${yb + 20}V${yb}H${x1 - 11}V${yb + 20}M${cx} ${yb}V${y2}`, at: [x1 + 10, y2 - 12], a: 'a-above-r' };
      },
    },
  })[F];

  function computeSafeTop() {
    if (F !== 'd') { SAFE_TOP = 0; return; }
    const vw = innerWidth, vh = innerHeight, mh = Math.max(vw * 9 / 16, vh), k = mh / ASSET.d.H;
    SAFE_TOP = (mh - vh) / k + 110 / k;
  }

  function annot(key: string, mc: string, oil: string, bottle: string, sPrim: number, sec: { s: number; t: string } | null, ePrim?: number) {
    const A = ASSET[F], G: any = FMT(), p = G.prim(toPic(key, PG[key].b));
    const e = ePrim != null ? `data-e="${ePrim}"` : '';
    let html = `<svg class="wires" viewBox="0 0 ${A.W} ${A.H}" preserveAspectRatio="none" aria-hidden="true">
      <path class="halo" data-s="${sPrim}" ${e} pathLength="100" stroke-width="${G.hw}" d="${p.d}"></path><path class="wire" data-s="${sPrim}" ${e} pathLength="100" stroke-width="${G.sw}" d="${p.d}"></path>`;
    let s: any = null;
    if (sec) {
      const [x0, f] = toPic(key, [PG[key].w[0], PG[key].w[2]]), [x1, tt] = toPic(key, [PG[key].w[1], PG[key].w[3]]);
      s = G.sec([x0, x1, f, tt]);
      html += `<path class="halo" data-s="${sec.s}" pathLength="100" stroke-width="${G.hw}" d="${s.d}"></path><path class="wire" data-s="${sec.s}" pathLength="100" stroke-width="${G.sw}" d="${s.d}"></path>`;
    }
    html += `</svg><span class="dot" data-s="${sPrim}" ${e} style="--mc:${mc};left:${pct(p.dot[0], A.W)};top:${pct(p.dot[1], A.H)}"></span>
      <div class="anc ${p.a}" style="left:${pct(p.at[0], A.W)};top:${pct(p.at[1], A.H)}"><div class="lab l1 ln" data-s="${sPrim}" ${e} style="--mc:${mc}"><b>${oil}</b><small>${bottle}</small></div></div>`;
    if (sec) html += `<div class="anc ${s.a}" style="left:${pct(s.at[0], A.W)};top:${pct(s.at[1], A.H)}"><div class="lab l2 ln" data-s="${sec.s}"><b>${sec.t}</b></div></div>`;
    return html;
  }
  function seq(key: string, alt: string) {
    const m = MANIFEST[key] && MANIFEST[key][F];
    const r = m ? m.rect : [0, 0, 1, 1], A = ASSET[F];
    return `<img src="${seqBase(key)}" alt="${alt}" decoding="async">
      <canvas class="patch" id="jr-cv-${key}" width="${r[2]}" height="${r[3]}" style="left:${pct(r[0], A.W)};top:${pct(r[1], A.H)};width:${pct(r[2], A.W)};height:${pct(r[3], A.H)}"></canvas>`;
  }
  const hd = (s: number, e: number | null, icon: string, mi: string, eyebrow: string, lines: string[]) =>
    `<div class="hd"><p class="eyebrow ln" data-s="${s}" ${e != null ? `data-e="${e}"` : ''}><i aria-hidden="true" style="--mi:${mi}">${ICON[icon]}</i><span>${eyebrow}</span></p>
     <h3 class="headline">${lines.map((l) => `<span class="ln" data-s="${s}" ${e != null ? `data-e="${e}"` : ''}>${l}</span>`).join('')}</h3></div>`;

  // ---------- les neuf écrans ; data-s = étape où un élément apparaît, data-e = étape où il disparaît
  function buildScenes(): any[] {
    const tiles = T('st.I.tiles'), rooms = T('st.G.rooms'), d1 = T('st.D.big');
    return [
      { id: 'A', from: 0, to: 2, stop: 0, tone: 't-day', html: () => `
        <div class="media"><img src="${IMG('kitchen')}" alt="${T('st.A.alt')}" decoding="async">
          ${annot('kitchen', 'var(--m1)', T('st.A.oil'), T('st.A.bottle'), 1, { s: 2, t: T('st.A.wait') })}</div>
        <div class="veil corner"></div>
        ${hd(0, null, 'sunrise', 'hsl(42 82% 40%)', T('st.A.eyebrow'), T('st.A.lines'))}
        <div class="hint" id="jr-hint">${ICON.down}<span>${T('st.hint')}</span></div>` },
      { id: 'B', from: 3, to: 7, stop: 0, tone: 't-dark', html: () => `
        <div class="media"><img class="dimph" src="${IMG('kitchen')}" alt="" loading="lazy" decoding="async"></div>
        <div class="panel">
          <ul class="list">
            <li class="ln" data-s="3" data-dim="6">${T('st.B.l1')}</li>
            <li class="ln" data-s="4" data-dim="6">${T('st.B.l2')}</li>
            <li class="ln" data-s="5" data-dim="6">${T('st.B.l3')}</li>
          </ul>
          <p class="big ln" data-s="6">${T('st.B.big')}</p>
          <p class="para ln" data-s="7">${T('st.B.para')}</p>
        </div>` },
      { id: 'C', from: 8, to: 13, stop: 1, tone: 't-day', anim: 'living', html: () => `
        <div class="media">${seq('living', T('st.C.alt'))}
          ${annot('living', 'var(--m2)', T('st.C.oil'), T('st.C.bottle'), 13, null)}</div>
        <div class="veil corner"></div>
        ${hd(8, 13, 'sun', 'hsl(24 66% 44%)', T('st.C.eyebrow'), T('st.C.lines1'))}
        ${hd(13, null, 'sun', 'hsl(24 66% 44%)', T('st.C.eyebrow'), T('st.C.lines2'))}
        <div class="chrono ln" data-s="8" data-e="13"><span class="n" id="jr-n-living">${dec('0.0')}<small>s</small></span><span class="u">${T('st.C.chrono')}</span></div>
        <div class="para-on-photo ln" data-s="11" data-e="12"><p>${T('st.C.para')}</p></div>` },
      { id: 'D', from: 14, to: 15, stop: 1, tone: 't-dark', html: () => `
        <div class="media"><img src="${base}img/zoom_living_${F}.webp" alt="${T('st.D.alt')}" loading="lazy" decoding="async"></div>
        <div class="leftfade"></div>
        <div class="panel left">
          <p class="big ln" data-s="14">${d1[0]}<br>${d1[1]}</p>
          <p class="para ln" data-s="15">${T('st.D.para')}</p>
        </div>` },
      { id: 'E', from: 16, to: 21, stop: 2, tone: 't-night', anim: 'bedroom', html: () => `
        <div class="media">${seq('bedroom', T('st.E.alt'))}
          ${annot('bedroom', 'var(--m3-light)', T('st.E.oil'), T('st.E.bottle'), 21, null)}</div>
        <div class="veil corner"></div>
        ${hd(16, 21, 'moon', 'var(--m3-light)', T('st.E.eyebrow'), T('st.E.lines1'))}
        ${hd(21, null, 'moon', 'var(--m3-light)', T('st.E.eyebrow'), T('st.E.lines2'))}
        <div class="chrono ln" data-s="17" data-e="18"><span class="n">90<small>h</small></span><span class="u">${T('st.E.chrono1')}</span></div>
        <div class="chrono ln" data-s="18" data-e="21"><span class="n" id="jr-n-bedroom">${dec('0.0')}<small>s</small></span><span class="u">${T('st.E.chrono2')}</span></div>
        <div class="para-on-photo ln" data-s="17" data-e="18"><p><strong>${T('st.E.para1')}</strong><br><span style="opacity:.75;font-size:.88em">${T('st.E.para2')}</span></p></div>` },
      { id: 'F', from: 22, to: 24, stop: 3, tone: 't-dark', html: () => `
        <div class="jr-dark"></div>
        <div class="split">
          <div class="panel">
            <p class="eyebrow ln" data-s="22" style="color:var(--copper-soft)"><span>${T('st.F.eyebrow')}</span></p>
            <p class="big ln" data-s="22" style="font-size:clamp(30px,3.7cqw,66px)">${T('st.F.big')}</p>
            <p class="para ln" data-s="23" data-dim="24">${T('st.F.p1')}</p>
            <p class="para ln" data-s="24">${T('st.F.p2')}</p>
          </div>
          <div class="visual ln" data-s="22">
            <img src="${base}img/custom_variants_${F}.webp" alt="${T('st.F.alt')}" loading="lazy" decoding="async">
            <img class="fade" data-s="24" src="${base}img/custom_brand_${F}.webp" alt="${T('st.F.alt2')}" loading="lazy" decoding="async">
            <span class="vcap fade" data-s="22" data-e="24">${T('st.F.cap1')}</span>
            <span class="vcap fade" data-s="24">${T('st.F.cap2')}</span>
          </div>
        </div>` },
      { id: 'G', from: 25, to: 29, stop: 3, tone: 't-dark', html: () => `
        <div class="jr-dark"></div>
        <div class="panel">
          <p class="para ln" data-s="25" data-dim="26">${T('st.G.p1')}</p>
          <p class="big ln" data-s="26">${T('st.G.big')}</p>
          <p class="para ln" data-s="27">${T('st.G.p2')}</p>
          <div class="rooms ln" data-s="27">
            <figure><img src="${base}img/room_kitchen.webp" alt="" loading="lazy" decoding="async"><figcaption>${rooms[0]}</figcaption></figure>
            <figure><img src="${base}img/room_living.webp" alt="" loading="lazy" decoding="async"><figcaption>${rooms[1]}</figcaption></figure>
            <figure><img src="${base}img/room_bedroom.webp" alt="" loading="lazy" decoding="async"><figcaption>${rooms[2]}</figcaption></figure>
          </div>
          <p class="para ln" data-s="28">${T('st.G.p3')}</p>
          <p class="sign ln" data-s="29">${T('st.G.sign')}</p>
        </div>` },
      { id: 'H', from: 30, to: 32, stop: 3, tone: 't-day', html: () => `
        <div class="cream"></div>
        <div class="panel center cream-text">
          <p class="big ln" data-s="30">${T('st.H.big')}</p>
          <p class="para ln" data-s="31">${T('st.H.p1')}</p>
          <p class="para ln" data-s="32">${T('st.H.p2')}</p>
        </div>` },
      { id: 'I', from: 33, to: 37, stop: 3, tone: 't-dark', html: () => `
        <div class="jr-dark"></div>
        <div class="bl">
          <div class="bl-head">
            <p class="eyebrow ln" data-s="33"><span>${T('st.I.eyebrow')}</span></p>
            <h3 class="bl-h ln" data-s="33">${T('st.I.h')}</h3>
          </div>
          <ul class="tri ln" data-s="33">
            ${[['kitchen', 'var(--m1)', 'sunrise'], ['living', 'var(--m2)', 'sun'], ['bedroom', 'var(--m3-light)', 'moon']]
              .map(([k, c, ic], i) => `<li style="--mc:${c}"><img src="${base}img/tile_${k}.webp" alt="${tiles[i].alt}" loading="lazy" decoding="async"><div class="cap"><b><i aria-hidden="true">${ICON[ic]}</i>${tiles[i].t}</b><span>${tiles[i].o}</span></div></li>`).join('')}
          </ul>
          <p class="bl-p ln" data-s="34">${T('st.I.p')}</p>
          <div class="bl-s">
            <p class="stat ln" data-s="35">${T('st.I.stat')}</p>
            <p class="x8 ln" data-s="36">${T('st.I.x8')}</p>
          </div>
          <div class="bl-c ln" data-s="37">
            <a class="cta" href="#contact">${T('st.I.cta')}${ICON.arrow}</a>
            <p class="note">${T('st.I.note')}</p>
          </div>
        </div>` },
    ];
  }

  // ---------- mécanique du défilement
  const unit = () => innerHeight * 0.42;
  const sizeStory = () => { story.style.height = (CUM[N] * unit() + innerHeight) + 'px'; };
  function floatStep() {
    const top = story.getBoundingClientRect().top + scrollY;
    const u = Math.max(0, (scrollY - top) / unit());
    if (u >= CUM[N]) return N - 0.001;
    let i = 0; while (CUM[i + 1] <= u) i++;
    return i + (u - CUM[i]) / BEAT[i];
  }
  function apply(step: number) {
    if (step === cur) return;
    cur = step;
    const s = SC.find((x) => step >= x.from && step <= x.to) || SC[SC.length - 1];
    scenes.forEach((el, i) => el.classList.toggle('on', SC[i] === s));
    pin.dataset.tone = s.tone;
    const el = scenes[SC.indexOf(s)];
    el.querySelectorAll<HTMLElement>('[data-s]').forEach((n) => {
      const a = +(n.dataset.s as string), e = n.dataset.e != null ? +n.dataset.e : Infinity;
      n.classList.toggle('in', step >= a && step < e);
    });
    el.querySelectorAll<HTMLElement>('[data-dim]').forEach((n) => n.classList.toggle('dim', step >= +(n.dataset.dim as string)));
    if (hint) hint.classList.toggle('gone', step > 0);
    stopBtns.forEach((b, i) => b.setAttribute('aria-current', String(i === s.stop)));
    SC.filter((x) => x.anim && step >= x.from - 4).forEach((x) => loadSeq(x.anim));
  }
  function timeline(fs: number) {
    const pos = fs < 8 ? fs / 8 / 3 : fs < 16 ? 1 / 3 + (fs - 8) / 8 / 3 : fs < 22 ? 2 / 3 + (fs - 16) / 6 / 3 : 1;
    fill.style.width = (pos * 75) + '%';
    fill.style.backgroundSize = pos > 0 ? (100 / pos) + '% 100%' : '100% 100%';
    cursor.style.left = (12.5 + pos * 75) + '%';
    cursor.style.backgroundColor = `var(${pos < 1 / 3 ? '--m1' : pos < 2 / 3 ? '--m2' : pos < 1 ? '--m3' : '--copper'})`;
  }

  // ---------- séquences d'images : image de base + une pièce qui change à chaque cran
  function loadSeq(key: string) {
    if (seqs[key] || !MANIFEST[key]) return;
    const cv = q<HTMLCanvasElement>('#jr-cv-' + key);
    if (!cv) return;
    const sq: any = seqs[key] = { cv, ctx: cv.getContext('2d'), imgs: [] as any[], cur: 0, target: 0, drawn: -1 };
    for (let i = 0; i < NFR; i++) {
      const im: any = new Image(); im.decoding = 'async'; im.src = seqPatch(key, i);
      im.onload = () => { im.ok = true; if (!destroyed && Math.round(sq.cur) === i) draw(key, true); };
      sq.imgs.push(im);
    }
  }
  function draw(key: string, force?: boolean) {
    const sq = seqs[key]; if (!sq) return;
    const i = Math.max(0, Math.min(NFR - 1, Math.round(sq.cur)));
    if (i === sq.drawn && !force) return;
    let j = i; while (j >= 0 && !sq.imgs[j].ok) j--; // image chargée la plus proche pendant que la suite arrive
    if (j < 0) return;
    sq.ctx.drawImage(sq.imgs[j], 0, 0); sq.drawn = j;
    const n = q('#jr-n-' + key);
    if (n) n.innerHTML = dec((Math.min(j, NSW - 1) / (NSW - 1)).toFixed(1)) + '<small>s</small>';
  }
  function frameAt(key: string, fs: number) {
    let f = 0;
    for (const [a, b, f0, f1] of SCRUB[key]) {
      if (fs >= b) f = f1;
      else { if (fs > a) f = f0 + (f1 - f0) * (fs - a) / (b - a); break; }
    }
    return f;
  }
  function frame() {
    raf = 0;
    if (destroyed) return;
    let busy = false;
    for (const key in SCRUB) {
      const sq = seqs[key]; if (!sq) continue;
      sq.target = frameAt(key, reduce ? Math.floor(fsNow) + 0.999 : fsNow);
      const d = sq.target - sq.cur;
      sq.cur = Math.abs(d) < 0.05 ? sq.target : sq.cur + d * 0.28; // légère inertie, façon Apple
      if (Math.abs(sq.target - sq.cur) > 0.05) busy = true;
      draw(key);
    }
    if (busy) raf = requestAnimationFrame(frame);
  }
  function update() {
    if (!story || destroyed) return;
    fsNow = floatStep();
    apply(Math.min(N - 1, Math.floor(fsNow)));
    timeline(fsNow);
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function jump(step: number, instant?: boolean) {
    const top = story.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + CUM[step] * unit() + 2, behavior: ((reduce || instant) ? 'instant' : 'smooth') as ScrollBehavior });
  }

  // ---------- construction / reconstruction
  function buildTimeline() {
    const labels = T('st.tl');
    stopsEl.innerHTML = '';
    stopBtns = STOPDEF.map((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" class="stop" style="--sc:${s.c}"><span class="sdot">${ICON[s.icon]}</span><span class="time">${labels[i].time}</span><span class="sub">${labels[i].sub}</span></button>`;
      const btn = li.firstElementChild as HTMLElement;
      btn.addEventListener('click', () => jump(s.step));
      stopsEl.appendChild(li);
      return btn;
    });
    const nav = q('.timeline');
    if (nav) nav.setAttribute('aria-label', T('st.tl.aria'));
  }
  function build() {
    F = fmtNow();
    root.classList.remove('fmt-d', 'fmt-m'); root.classList.add('fmt-' + F);
    computeSafeTop();
    SC = buildScenes();
    stage.innerHTML = '';
    scenes = SC.map((s) => {
      const el = document.createElement('div');
      el.className = `scene ${s.tone}`;
      el.dataset.id = s.id;
      el.innerHTML = s.html();
      stage.appendChild(el);
      return el;
    });
    hint = q('#jr-hint');
    buildTimeline();
    seqs = {}; cur = -1;
    sizeStory();
    update();
    if (prefetched) { loadSeq('living'); loadSeq('bedroom'); }
  }
  const onScroll = () => update();
  const onResize = () => {
    // sur téléphone, la barre d'adresse qui se replie change la hauteur : on ne reconstruit que si la forme change vraiment
    const widthChanged = innerWidth !== lastW, bigH = Math.abs(innerHeight - lastH) > 140;
    if (fmtNow() !== F) { lastW = innerWidth; lastH = innerHeight; build(); return; }
    if (widthChanged || bigH) { lastW = innerWidth; lastH = innerHeight; computeSafeTop(); sizeStory(); }
    update();
  };
  const onClick = (ev: Event) => {
    const a = (ev.target as HTMLElement | null)?.closest?.('a.cta');
    if (a && onCta) onCta((a.textContent || '').trim());
  };

  // ---------- démarrage
  story = q('.story') as HTMLElement; pin = q('.pin') as HTMLElement; stage = q('.stage') as HTMLElement;
  fill = q('.fill') as HTMLElement; cursor = q('.cursor') as HTMLElement; stopsEl = q('.stops') as HTMLElement;
  build();
  lastW = innerWidth; lastH = innerHeight;
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onResize);
  root.addEventListener('click', onClick);
  // les 104 images d'animation ne se chargent que lorsque la séquence approche de l'écran
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((en, ob) => {
      if (en.some((x) => x.isIntersecting)) { prefetched = true; loadSeq('living'); loadSeq('bedroom'); ob.disconnect(); }
    }, { rootMargin: '150% 0px' });
    io.observe(story);
  } else { prefetched = true; loadSeq('living'); loadSeq('bedroom'); }

  return {
    rebuild() { const keep = scrollY; build(); scrollTo({ top: keep, behavior: 'instant' as ScrollBehavior }); },
    destroy() {
      destroyed = true;
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      root.removeEventListener('click', onClick);
      if (io) io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    },
    jump,
    // pour les contrôles automatiques : se placer pile sur une étape
    goto(step: number) {
      const top = story.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + CUM[Math.floor(step)] * unit() + (step % 1) * BEAT[Math.floor(step)] * unit() + 2, behavior: 'instant' as ScrollBehavior });
    },
    info: () => ({ format: F, step: cur, fs: fsNow, steps: N }),
  };
}
