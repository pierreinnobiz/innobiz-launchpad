// Liens et coordonnées utilisés par le site.
// Calendly : rendez-vous de 30 minutes avec Simon Desbuisson (« Tolia essential oil diffuser — 30-min call & live demo »,
// en visio Google Meet, lu dans Calendly le 19/10/2026 ; demande de Pierre du 19/10 : 30 min avec Simon, plus 15 min avec Pierre).
// Depuis la refonte du 17/10/2026, il est proposé à côté du formulaire d'échantillon (« Vous préférez en parler ? »),
// dans le haut de page et à la fin de la visite guidée ; « utm_medium » dit d'où vient la réservation.
// 22/10/2026 (point G2) : on transmet aussi la campagne d'origine de la visite (utm_campaign, ex. une vague Instantly),
// sa source d'origine (utm_term) et la langue du site (utm_content), pour relier un rendez-vous à l'email qui l'a amené.
const utmDeLaVisite = (): URLSearchParams => {
  try {
    const landing = sessionStorage.getItem('tolia:attr:landing_page') || window.location.href;
    return new URL(landing).searchParams;
  } catch {
    try { return new URLSearchParams(window.location.search); } catch { return new URLSearchParams(); }
  }
};
export const calendlyUrl = (medium: string, lang?: string) => {
  const p = new URLSearchParams({ utm_source: 'site', utm_medium: medium });
  const visite = utmDeLaVisite();
  const campagne = visite.get('utm_campaign');
  const source = visite.get('utm_source');
  if (campagne) p.set('utm_campaign', campagne);
  if (source) p.set('utm_term', source);
  if (lang) p.set('utm_content', `lang_${lang}`);
  return `https://calendly.com/simon-innobiz/30min?${p.toString()}`;
};

// Coordonnées déjà publiées dans le pied de page.
export const CONTACT_EMAIL = 'contact@innobiz.fr';
export const CONTACT_PHONE = '+33 (0)4 67 84 89 14';
export const CONTACT_PHONE_TEL = '+33467848914';
