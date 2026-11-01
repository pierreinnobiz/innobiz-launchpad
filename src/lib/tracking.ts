// Analytics tracking utility
// Sends events to Google Analytics (GA4) via gtag + custom events
import { brandEvent } from './brandTracking';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// 01/11/2026 : instant du dernier clic de bouton déjà compté à la main (trackCTAClick). L'écouteur général de ProspectTracker
// s'en sert pour ne pas compter le même clic une seconde fois (avant : chaque clic « échantillon » du menu comptait double).
let lastCtaAt = -1e9;
export const recentCtaClick = (withinMs = 600): boolean => performance.now() - lastCtaAt < withinMs;

// Boutons du site -> repères du CRM (liste fermée, voir brandTracking.ts)
const CTA_FOR_CRM: Record<string, string> = {
  sample_nav: 'sample_nav',
  sample_hero: 'sample_hero',
  sample_durabilite: 'sample_hero',
  sample_journee: 'sample_hero',
  whitelabel: 'whitelabel',
  quote_stock: 'quote_stock',
  call_booking: 'calendly',
  email: 'mailto',
};

// Suivi par marque (01/11/2026) : ne fait rien quand la visite ne vient pas d'un lien d'email (brandEvent est alors inactif)
const forwardToCrm = (eventName: string, p: Record<string, string>) => {
  switch (eventName) {
    case 'hero_film_open': brandEvent('film'); break;
    case 'journee_scene': brandEvent('scn', p.scene); break;
    case 'cta_click': brandEvent('cta', CTA_FOR_CRM[p.cta_type || ''] || 'other'); break;
    case 'faq_open': brandEvent('faq', `q${p.question}`); break;
    case 'section_view': brandEvent('sec', p.section); break;
    case 'lang_switch': brandEvent('lng', p.to); break;
    case 'outbound_click': brandEvent('out', p.destination); break;
    default: break;
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, string>) => {
  // Send to GA4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // Custom event for other integrations
  window.dispatchEvent(new CustomEvent('tolia_analytics', {
    detail: { event: eventName, ...properties, timestamp: new Date().toISOString() }
  }));

  forwardToCrm(eventName, properties || {});
};

export const trackCTAClick = (ctaLabel: string, section: string, ctaType?: string) => {
  lastCtaAt = performance.now();
  trackEvent('cta_click', {
    label: ctaLabel,
    section,
    cta_type: ctaType || section,
  });
};
