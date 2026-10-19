// Liens et coordonnées utilisés par le site.
// Calendly : rendez-vous de 30 minutes avec Simon Desbuisson (« Tolia essential oil diffuser — 30-min call & live demo »,
// en visio Google Meet, lu dans Calendly le 19/10/2026 ; demande de Pierre du 19/10 : 30 min avec Simon, plus 15 min avec Pierre).
// Depuis la refonte du 17/10/2026, il est proposé à côté du formulaire d'échantillon (« Vous préférez en parler ? »),
// dans le haut de page et à la fin de la visite guidée ; « utm_medium » dit d'où vient la réservation.
export const calendlyUrl = (medium: string) =>
  `https://calendly.com/simon-innobiz/30min?utm_source=site&utm_medium=${encodeURIComponent(medium)}`;
export const CALENDLY_RDV_URL = calendlyUrl('sample_thanks');

// Coordonnées déjà publiées dans le pied de page.
export const CONTACT_EMAIL = 'contact@innobiz.fr';
export const CONTACT_PHONE = '+33 (0)4 67 84 89 14';
export const CONTACT_PHONE_TEL = '+33467848914';
