import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const langMap: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
};

const seoContent: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  fr: {
    title: 'Tolia by Innobiz — Technologie de diffusion d\'huiles essentielles propriétaire',
    description: 'Tolia : le diffuseur en marque blanche qui transforme l\'aromathérapie en routines quotidiennes et vos synergies en revenus récurrents. 20 ans de R&D Innobiz.',
    ogTitle: 'Tolia by Innobiz — Technologie de diffusion d\'huiles essentielles',
    ogDescription: 'Le diffuseur en marque blanche qui transforme l\'aromathérapie en routines quotidiennes et vos synergies en revenus récurrents.',
  },
  en: {
    title: 'Tolia by Innobiz — Proprietary Essential Oil Diffusion Technology',
    description: 'Tolia: the white-label diffuser that transforms aromatherapy into daily routines and your blends into recurring revenue. 20 years of Innobiz R&D.',
    ogTitle: 'Tolia by Innobiz — Essential Oil Diffusion Technology',
    ogDescription: 'The white-label diffuser that transforms aromatherapy into daily routines and your blends into recurring revenue.',
  },
  es: {
    title: 'Tolia by Innobiz — Tecnología de difusión de aceites esenciales propietaria',
    description: 'Tolia: el difusor de marca blanca que transforma la aromaterapia en rutinas diarias y sus sinergias en ingresos recurrentes. 20 años de I+D de Innobiz.',
    ogTitle: 'Tolia by Innobiz — Tecnología de difusión de aceites esenciales',
    ogDescription: 'El difusor de marca blanca que transforma la aromaterapia en rutinas diarias y sus sinergias en ingresos recurrentes.',
  },
};

function setMeta(selector: string, attribute: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attribute, value);
}

/**
 * Dynamically updates <html lang>, <title>, meta description,
 * OG and Twitter Card tags based on the currently selected language.
 */
export function useDocumentLang() {
  const { language } = useLanguage();

  useEffect(() => {
    const content = seoContent[language] || seoContent.en;
    const locale = (langMap[language] || 'en_GB').replace('-', '_');

    // <html lang>
    document.documentElement.lang = langMap[language] || 'en-GB';

    // <title>
    document.title = content.title;

    // Meta description
    setMeta('meta[name="description"]', 'content', content.description);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', content.ogTitle);
    setMeta('meta[property="og:description"]', 'content', content.ogDescription);
    setMeta('meta[property="og:locale"]', 'content', locale);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'content', content.ogTitle);
    setMeta('meta[name="twitter:description"]', 'content', content.ogDescription);
  }, [language]);
}
