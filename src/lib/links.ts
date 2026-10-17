// Liens et coordonnées utilisés par le site.
// Calendly : type d'événement « Tolia — 15 min call » du compte de Pierre (lu dans Calendly le 15/10/2026).
// Depuis la refonte du 17/10/2026, il est proposé à côté du formulaire d'échantillon (« Vous préférez en parler ? »),
// dans le haut de page et à la fin de la visite guidée ; « utm_medium » dit d'où vient la réservation.
export const calendlyUrl = (medium: string) =>
  `https://calendly.com/pthuret-innobiz/tolia-15-min-call?utm_source=site&utm_medium=${encodeURIComponent(medium)}`;
export const CALENDLY_15_MIN_URL = calendlyUrl('sample_thanks');

// Coordonnées déjà publiées dans le pied de page.
export const CONTACT_EMAIL = 'contact@innobiz.fr';
export const CONTACT_PHONE = '+33 (0)4 67 84 89 14';
export const CONTACT_PHONE_TEL = '+33467848914';
