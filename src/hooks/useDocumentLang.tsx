import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const langMap: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
};

const SITE_URL = 'https://www.innobiz-tolia.com';

const seoContent: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string; ogImageAlt: string }> = {
  fr: {
    title: 'Tolia by Innobiz | Technologie de diffusion d\'huiles essentielles propriétaire',
    description: 'Tolia : le diffuseur en marque blanche qui transforme l\'aromathérapie en routines quotidiennes et vos synergies en revenus récurrents. 20 ans de R&D Innobiz.',
    ogTitle: 'Tolia by Innobiz | Technologie de diffusion d\'huiles essentielles',
    ogDescription: 'Le diffuseur en marque blanche qui transforme l\'aromathérapie en routines quotidiennes et vos synergies en revenus récurrents.',
    ogImage: `${SITE_URL}/og-image-fr.jpg`,
    ogImageAlt: 'Tolia by Innobiz : diffuseur d\'huiles essentielles sans eau avec recharges Twist & Mist pour l\'hôtellerie premium',
  },
  en: {
    title: 'Tolia by Innobiz | Proprietary Essential Oil Diffusion Technology',
    description: 'Tolia: the white-label diffuser that transforms aromatherapy into daily routines and your blends into recurring revenue. 20 years of Innobiz R&D.',
    ogTitle: 'Tolia by Innobiz | Essential Oil Diffusion Technology',
    ogDescription: 'The white-label diffuser that transforms aromatherapy into daily routines and your blends into recurring revenue.',
    ogImage: `${SITE_URL}/og-image-en.jpg`,
    ogImageAlt: 'Tolia by Innobiz: waterless essential oil diffuser with Twist & Mist refills for premium hospitality',
  },
  es: {
    title: 'Tolia by Innobiz | Tecnología de difusión de aceites esenciales propietaria',
    description: 'Tolia: el difusor de marca blanca que transforma la aromaterapia en rutinas diarias y sus sinergias en ingresos recurrentes. 20 años de I+D de Innobiz.',
    ogTitle: 'Tolia by Innobiz | Tecnología de difusión de aceites esenciales',
    ogDescription: 'El difusor de marca blanca que transforma la aromaterapia en rutinas diarias y sus sinergias en ingresos recurrentes.',
    ogImage: `${SITE_URL}/og-image-es.jpg`,
    ogImageAlt: 'Tolia by Innobiz: difusor de aceites esenciales sin agua con recargas Twist & Mist para hostelería premium',
  },
};

const structuredData: Record<string, { org: string; product: string }> = {
  fr: {
    org: "Innobiz conçoit des diffuseurs d'huiles essentielles en marque blanche avec une technologie de diffusion sans eau propriétaire.",
    product: "Diffuseur d'huiles essentielles en marque blanche avec la technologie brevetée Twist & Mist. Sans eau, silencieux (<35 dB), 100 % réparable.",
  },
  en: {
    org: 'Innobiz designs white-label essential oil diffusers with proprietary waterless diffusion technology.',
    product: 'White-label essential oil diffuser with patented Twist & Mist technology. Waterless, silent (<35dB), 100% repairable.',
  },
  es: {
    org: 'Innobiz diseña difusores de aceites esenciales de marca blanca con tecnología de difusión sin agua propietaria.',
    product: 'Difusor de aceites esenciales de marca blanca con tecnología patentada Twist & Mist. Sin agua, silencioso (<35 dB), 100 % reparable.',
  },
};

function setMeta(selector: string, attribute: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attribute, value);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function localizeJsonLd(language: string) {
  const copy = structuredData[language] || structuredData.en;
  const scripts = Array.from(
    document.querySelectorAll('script[type="application/ld+json"]')
  ) as HTMLScriptElement[];
  scripts.forEach((script) => {
    try {
      const json = JSON.parse(script.textContent || '{}');
      if (json['@type'] === 'Organization') json.description = copy.org;
      else if (json['@type'] === 'Product') json.description = copy.product;
      else return;
      json.inLanguage = langMap[language] || 'en-GB';
      script.textContent = JSON.stringify(json);
    } catch {
      /* leave untouched */
    }
  });
}

/**
 * Dynamically updates <html lang>, <title>, meta description, canonical,
 * OG/Twitter Card tags and JSON-LD based on the currently selected language.
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

    // Canonical — one URL per route, query strings and hashes excluded
    const canonical = `${SITE_URL}${window.location.pathname.replace(/\/+$/, '') || '/'}`;
    setCanonical(canonical);
    setMeta('meta[property="og:url"]', 'content', canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', content.ogTitle);
    setMeta('meta[property="og:description"]', 'content', content.ogDescription);
    setMeta('meta[property="og:locale"]', 'content', locale);
    setMeta('meta[property="og:image"]', 'content', content.ogImage);
    setMeta('meta[property="og:image:alt"]', 'content', content.ogImageAlt);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'content', content.ogTitle);
    setMeta('meta[name="twitter:description"]', 'content', content.ogDescription);
    setMeta('meta[name="twitter:image"]', 'content', content.ogImage);
    setMeta('meta[name="twitter:image:alt"]', 'content', content.ogImageAlt);

    // Structured data in the active language
    localizeJsonLd(language);
  }, [language]);
}
