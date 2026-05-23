import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const STORAGE_KEY = 'tolia_cookie_consent';

type Choice = 'granted' | 'denied' | null;

const S = (lang: string, fr: string, en: string, es: string) =>
  lang === 'es' ? es : lang === 'en' ? en : fr;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const readChoice = (): Choice => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'granted' || v === 'denied') return v;
  } catch {
    /* storage blocked */
  }
  return null;
};

const writeChoice = (choice: 'granted' | 'denied') => {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage blocked — choice kept in memory via state */
  }
};

const CookieConsent = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readChoice() === null) setVisible(true);
  }, []);

  const decide = (choice: 'granted' | 'denied') => {
    writeChoice(choice);
    setVisible(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: choice === 'granted' ? 'granted' : 'denied',
      });
    }
  };

  if (!visible) return null;

  const message = S(
    language,
    "Nous utilisons des cookies pour mesurer l'audience du site. Vous pouvez accepter ou refuser.",
    'We use cookies to measure site traffic. You can accept or decline.',
    'Utilizamos cookies para medir el tráfico del sitio. Puede aceptar o rechazar.'
  );
  const accept = S(language, 'Tout accepter', 'Accept all', 'Aceptar todo');
  const decline = S(language, 'Refuser', 'Decline', 'Rechazar');
  const policy = S(language, 'Politique cookies', 'Cookie policy', 'Política de cookies');

  return (
    <div
      role="region"
      aria-label={S(language, 'Consentement cookies', 'Cookie consent', 'Consentimiento de cookies')}
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
    >
      <div className="mx-auto max-w-5xl m-3 md:m-4 pointer-events-auto">
        <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          <p className="text-sm text-foreground/80 leading-relaxed flex-1 !text-left">
            {message}{' '}
            <Link to="/cookies" className="underline text-primary hover:opacity-80">
              {policy}
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => decide('denied')}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-secondary transition-colors"
            >
              {decline}
            </button>
            <button
              type="button"
              onClick={() => decide('granted')}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all"
            >
              {accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
