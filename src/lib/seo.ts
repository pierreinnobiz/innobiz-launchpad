export const SITE_URL = 'https://www.innobiz-tolia.com';

export type SeoLanguage = 'fr' | 'en' | 'es';

const OG_IMAGES: Record<SeoLanguage, string> = {
  fr: `${SITE_URL}/og-image-fr.jpg`,
  en: `${SITE_URL}/og-image-en.jpg`,
  es: `${SITE_URL}/og-image-es.jpg`,
};

const OG_LOCALES: Record<SeoLanguage, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  es: 'es_ES',
};

const OG_IMAGE_ALT: Record<SeoLanguage, string> = {
  fr: "Tolia by Innobiz, diffuseur d'huiles essentielles rechargeable en marque blanche",
  en: 'Tolia by Innobiz, white-label refillable essential oil diffuser',
  es: 'Tolia by Innobiz, difusor de aceites esenciales recargable de marca blanca',
};

export const ogImageFor = (language: string): string =>
  OG_IMAGES[language as SeoLanguage] ?? OG_IMAGES.en;

export const ogLocaleFor = (language: string): string =>
  OG_LOCALES[language as SeoLanguage] ?? OG_LOCALES.en;

export const ogImageAltFor = (language: string): string =>
  OG_IMAGE_ALT[language as SeoLanguage] ?? OG_IMAGE_ALT.en;

export const ogLocaleAlternates = (language: string): string[] =>
  (Object.keys(OG_LOCALES) as SeoLanguage[])
    .filter((lang) => lang !== (language as SeoLanguage))
    .map((lang) => OG_LOCALES[lang]);
