/**
 * Une adresse par langue pour la page d'accueil : /fr/, /en/, /es/ (17/10/2026, référencement).
 * Chaque adresse a sa propre page HTML, avec son titre, sa description et son texte complet lisible sans JavaScript
 * (fabriquée à la construction par le module « seo-pages » de vite.config.ts), pour Google et les assistants IA.
 * La page « / » garde le choix automatique de la langue du navigateur.
 */
export type PathLang = 'fr' | 'en' | 'es';

/** Langue imposée par l'adresse (/fr, /fr/, /en/…), ou null pour « / » et les autres pages. */
export const langFromPath = (pathname: string): PathLang | null => {
  const m = /^\/(fr|en|es)(?:\/|$)/.exec(pathname);
  return m ? (m[1] as PathLang) : null;
};

/** Vrai pour la page d'accueil, quelle que soit sa langue. */
export const isHomePath = (pathname: string): boolean => pathname === '/' || /^\/(fr|en|es)\/?$/.test(pathname);
