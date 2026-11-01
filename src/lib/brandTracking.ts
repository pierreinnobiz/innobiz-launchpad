// Suivi « par marque » (01/11/2026, accord de Pierre) : relier ce qu'une personne regarde sur le site à sa fiche contact du CRM,
// UNIQUEMENT quand elle arrive par le lien d'un de nos emails (le lien porte un code `lid` = identifiant de sa fiche contact).
//
// Règles de confidentialité (à ne pas assouplir sans l'accord de Pierre) :
//  - aucun code `lid` valide dans l'adresse = aucun envoi, rien n'est suivi (la grande majorité des visiteurs) ;
//  - le code est retiré de l'adresse par un petit script placé tout en haut de index.html (avant Lovable, Google Analytics et la mémoire
//    de la page d'arrivée) puis gardé EN MÉMOIRE seulement : aucun cookie, aucun localStorage, aucun sessionStorage ;
//  - il n'est JAMAIS transmis à Google Analytics ni à un autre service que le CRM d'Innobiz ;
//  - un visiteur qui clique « Refuser » sur le bandeau (ou dont le navigateur envoie le signal Global Privacy Control) n'est plus suivi ;
//  - un premier lot part 4 secondes après l'arrivée, même sans geste, pour que la visite soit comptée ; il porte « hum = 0 » tant que
//    la personne n'a fait aucun geste réel (souris, toucher, clavier, molette). Les robots d'analyse des messageries n'en font pas :
//    le CRM les compte à part et ne les présente jamais comme une visite de la marque.
//
// Ce que reçoit le CRM : voir le contrat décrit dans netlify/functions/site-visit.js du dépôt innobiz-crm-netlify (version 1).
import { getSessionAttribution } from '@/lib/attribution';

const ENDPOINT = 'https://prospectiontolia.netlify.app/api/site-visit';
const LID_RE = /^rec[A-Za-z0-9]{14}$/;
const KEY_RE = /^[a-z0-9_-]{1,24}$/;
const FIRST_SEND_MS = 4000;     // premier lot, même sans geste : la visite est comptée
const TICK_MS = 1000;
const FLUSH_EVERY_MS = 15000;
const IDLE_MS = 30000;          // sans geste depuis 30 s : le visiteur n'est plus « actif »
const MAX_PAGE_LIFE_MS = 30 * 60 * 1000;
const MAX_EVENTS = 100;         // par visite (le CRM en accepte 120)
const MAX_PER_BATCH = 40;
const MAX_CTA_PER_KEY = 3;      // anti-rafale

declare global {
  interface Window {
    __toliaLid?: string;
    __toliaConsent?: 'granted' | 'denied';
  }
}

type Ev = { t: number; e: string; k?: string };

let started = false;
let stopped = false;
let lid = '';
let vid = '';
let camp = '';
let cont = '';
let t0 = 0;
let lastTick = 0;
let lastGesture = 0;
let human = false;
let activeMs = 0;
let maxScroll = 0;
let queue: Ev[] = [];
let total = 0;
let sentOnce = false;
let lastSentAct = -1;
let timers: number[] = [];
const seen = new Set<string>();
const ctaCount: Record<string, number> = {};

const randomId = (n = 12): string => {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => (b % 36).toString(36)).join('');
};

const pageLang = (): string => {
  const l = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
  return l === 'fr' || l === 'es' ? l : 'en';
};

const utm = (name: string, re: RegExp): string => {
  try {
    const v = (new URL(getSessionAttribution().landing_page).searchParams.get(name) || '').toLowerCase();
    return re.test(v) ? v : '';
  } catch {
    return '';
  }
};

// Le visiteur a-t-il dit non ? (bouton « Refuser » du bandeau, ou signal Global Privacy Control du navigateur)
const refused = (): boolean => {
  try {
    if (window.__toliaConsent === 'denied') return true;
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) return true;
  } catch { /* lecture impossible : on ne suppose pas un refus */ }
  return false;
};

const post = (body: string): void => {
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }))) return;
  } catch { /* repli ci-dessous */ }
  try {
    void fetch(ENDPOINT, {
      method: 'POST', body, mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).catch(() => { /* le suivi ne doit jamais gêner la page */ });
  } catch { /* idem */ }
};

const stop = (): void => {
  stopped = true;
  queue = [];
  timers.forEach((id) => window.clearInterval(id));
  timers = [];
};

const flush = (final = false): void => {
  if (stopped || !lid) return;
  if (refused()) { stop(); return; }
  const act = Math.round(activeMs / 1000);
  if (!final && sentOnce && queue.length === 0 && act === lastSentAct) return;
  const ev = queue.splice(0, MAX_PER_BATCH);
  post(JSON.stringify({
    v: 1, lid, vid, lang: pageLang(), camp, cont,
    dev: window.matchMedia && window.matchMedia('(max-width: 767px)').matches ? 'm' : 'd',
    hum: human ? 1 : 0, act, sd: maxScroll, ev,
  }));
  sentOnce = true;
  lastSentAct = act;
};

const tick = (): void => {
  const now = performance.now();
  const dt = now - lastTick;
  lastTick = now;
  if (document.visibilityState === 'visible' && human && now - lastGesture < IDLE_MS) activeMs += Math.min(dt, 2000);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (h > 0) maxScroll = Math.max(maxScroll, Math.min(100, Math.round((window.scrollY / h) * 100)));
  if (now - t0 > MAX_PAGE_LIFE_MS) { flush(true); stop(); }
};

const onGesture = (e: Event): void => {
  if (!e.isTrusted) return; // un geste fabriqué par un script ne compte pas
  human = true;
  lastGesture = performance.now();
};

// Ajoute un événement à envoyer au prochain lot. `k` : repère court (liste fermée côté CRM). Sans code `lid`, ne fait rien.
export const brandEvent = (e: string, k?: string): void => {
  if (!lid || stopped) return;
  if (k !== undefined && !KEY_RE.test(k)) return;
  const key = `${e}|${k ?? ''}`;
  if (e === 'cta') {
    ctaCount[key] = (ctaCount[key] || 0) + 1;
    if (ctaCount[key] > MAX_CTA_PER_KEY) return;
  } else if (e !== 'lng') {
    if (seen.has(key)) return;
    seen.add(key);
  }
  if (total >= MAX_EVENTS) return;
  total += 1;
  queue.push({ t: Math.min(3600000, Math.round(performance.now() - t0)), e, ...(k ? { k } : {}) });
};

export const brandTrackingActive = (): boolean => Boolean(lid) && !stopped;

// À appeler une seule fois, au démarrage (main.tsx). Le code `lid` a déjà été retiré de l'adresse par le script d'index.html.
export const initBrandTracking = (): void => {
  if (started || typeof window === 'undefined') return;
  started = true;
  const raw = window.__toliaLid;
  try { delete window.__toliaLid; } catch { window.__toliaLid = undefined; } // plus de copie en clair sur la fenêtre
  if (!raw || !LID_RE.test(raw) || refused()) return;
  lid = raw;
  vid = randomId();
  camp = utm('utm_campaign', /^[a-z0-9_-]{1,40}$/);
  cont = utm('utm_content', /^[a-z0-9_-]{1,20}$/);
  t0 = performance.now();
  lastTick = t0;
  const opts = { passive: true, capture: true } as const;
  ['pointerdown', 'pointermove', 'touchstart', 'keydown', 'wheel'].forEach((n) => window.addEventListener(n, onGesture, opts));
  timers.push(window.setInterval(tick, TICK_MS));
  timers.push(window.setInterval(() => flush(false), FLUSH_EVERY_MS));
  window.setTimeout(() => flush(false), FIRST_SEND_MS);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(true); });
  window.addEventListener('pagehide', () => flush(true));
};
