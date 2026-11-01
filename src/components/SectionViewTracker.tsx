import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

// 01/11/2026 (accord de Pierre) : « quelle partie de la page a vraiment été regardée ? »
// Un événement `section_view` (paramètre `section` = identifiant de la section) est envoyé UNE fois par visite et par section,
// quand elle est restée visible au moins 2 secondes (au moins 40 % de sa hauteur, ou 40 % de l'écran pour les sections très hautes
// comme la visite guidée). Il va à Google Analytics (si le visiteur a accepté) et, pour les visiteurs venus d'un email, au CRM.
const SECTION_IDS = ['hero', 'marques', 'journee', 'probleme', 'technologie', 'durabilite', 'personnalisation', 'offres', 'faq', 'contact'];
const MIN_VISIBLE_MS = 2000;
const MIN_RATIO = 0.4;

const SectionViewTracker = () => {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const fired = new Set<string>();
    const timers = new Map<string, number>();
    const watched = new Set<Element>();

    const io = new IntersectionObserver((entries) => {
      const screen = window.innerHeight || document.documentElement.clientHeight || 800;
      for (const en of entries) {
        const id = (en.target as HTMLElement).id;
        const assezVisible = en.isIntersecting && (en.intersectionRatio >= MIN_RATIO || en.intersectionRect.height >= screen * MIN_RATIO);
        if (assezVisible && !fired.has(id) && !timers.has(id)) {
          timers.set(id, window.setTimeout(() => {
            timers.delete(id);
            fired.add(id);
            trackEvent('section_view', { section: id });
          }, MIN_VISIBLE_MS));
        } else if (!assezVisible && timers.has(id)) {
          window.clearTimeout(timers.get(id));
          timers.delete(id);
        }
      }
    }, { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1] });

    // Les sections du bas de page arrivent un peu plus tard (chargement séparé) : on les repère au fur et à mesure,
    // au plus une fois toutes les 500 ms, et on arrête de chercher après 20 s ou quand toutes sont trouvées.
    let planifie = false;
    const scan = () => {
      planifie = false;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !watched.has(el)) { watched.add(el); io.observe(el); }
      });
      if (watched.size >= SECTION_IDS.length) mo.disconnect();
    };
    const mo = new MutationObserver(() => {
      if (planifie) return;
      planifie = true;
      window.setTimeout(scan, 500);
    });
    scan();
    mo.observe(document.body, { childList: true, subtree: true });
    const arret = window.setTimeout(() => mo.disconnect(), 20000);

    return () => {
      window.clearTimeout(arret);
      mo.disconnect();
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
};

export default SectionViewTracker;
