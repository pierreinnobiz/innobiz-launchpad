/**
 * Titres et descriptions de la page d'accueil pour Google, par langue (17/10/2026).
 * Utilisés par la page (Helmet) ET par la construction des pages /fr/, /en/, /es/ (module « seo-pages » de vite.config.ts) :
 * un seul endroit à modifier.
 */
export type HomeSeoLang = 'fr' | 'en' | 'es';
export interface HomeSeo { title: string; description: string; keywords: string }

export const HOME_SEO: Record<HomeSeoLang, HomeSeo> = {
  fr: {
    title: "Diffuseur d'huiles essentielles en marque blanche | Tolia",
    description: "Tolia, diffuseur d'huiles essentielles sans eau, sur batterie, conçu en France pour les marques : il fonctionne avec vos flacons de 5 à 50 ml.",
    keywords: "diffuseurs d'huiles essentielles, diffusion huiles essentielles, diffuseur aromatique, arômes aromathérapie, diffuseur marque blanche, diffuseur sans eau",
  },
  en: {
    title: 'Waterless White-Label Essential Oil Diffuser | Tolia',
    description: 'Tolia is a waterless, battery-powered essential oil diffuser designed in France for aromatherapy brands. It works with your own 5–50 ml bottles.',
    keywords: 'essential oil diffusers, essential oil diffusion, aromatic diffuser, aromatherapy aromas, white label diffuser, waterless diffuser',
  },
  es: {
    title: 'Difusor de aceites esenciales de marca blanca | Tolia',
    description: 'Tolia, difusor de aceites esenciales sin agua y con batería, diseñado en Francia para las marcas: funciona con sus frascos de 5 a 50 ml.',
    keywords: 'difusores de aceites esenciales, difusión de aceites esenciales, difusor aromático, aromas aromaterapia, difusor marca blanca',
  },
};
