import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { langFromPath } from '@/lib/langPath';

const HTML_LANG_MAP: Record<'fr' | 'en' | 'es', string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
};

type Language = 'fr' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// 22/10/2026 : l'ancien dictionnaire de traductions (anciens textes du site, plus utilisés nulle part) a été retiré ;
// les textes sont écrits dans chaque composant avec t3(langue, fr, en, es).

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  // une adresse par langue (/fr/, /en/, /es/) : elle passe avant tout le reste
  const fromPath = langFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  const param = (new URLSearchParams(window.location.search).get('lang') || '').toLowerCase();
  if (param === 'fr' || param === 'en' || param === 'es') return param;
  try {
    const stored = window.localStorage?.getItem('tolia:lang');
    if (stored === 'fr' || stored === 'en' || stored === 'es') return stored;
  } catch {
    /* storage unavailable (private mode, sandboxed frame): fall back to the browser language */
  }
  // Première visite : on parle la langue du navigateur (français, espagnol), sinon l'anglais.
  // Un visiteur français arrivait avant sur une page anglaise, qu'il fallait changer à la main avec FR / EN / ES.
  const preferred = (navigator.languages?.length ? navigator.languages : [navigator.language]).filter(Boolean);
  for (const tag of preferred) {
    const code = tag.slice(0, 2).toLowerCase();
    if (code === 'fr' || code === 'es') return code;
    if (code === 'en') return 'en';
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = HTML_LANG_MAP[language] || 'en-GB';
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('tolia:lang', language);
      } catch {
        /* storage unavailable */
      }
    }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
