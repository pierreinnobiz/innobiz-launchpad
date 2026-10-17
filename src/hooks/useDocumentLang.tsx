import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const langMap: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
};

/**
 * Garde <html lang> en accord avec la langue affichée.
 *
 * 17/10/2026 : ce module réécrivait aussi, après le chargement, le titre, la description, l'adresse de référence,
 * les balises de partage et les données structurées avec d'anciens textes (« technologie brevetée Twist & Mist »,
 * « silencieux (<35 dB) », « recharges », « hôtellerie premium »). Ces informations sont maintenant données par la
 * page elle-même (Helmet, src/seo/homeSeo.ts) et par les pages /fr/, /en/, /es/ fabriquées à la construction
 * (module « seo-pages » de vite.config.ts) : il ne faut plus les réécrire ici.
 */
export function useDocumentLang() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = langMap[language] || 'en-GB';
  }, [language]);
}
