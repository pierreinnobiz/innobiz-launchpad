import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const STORAGE_KEY = 'tolia_cookie_consent';
const COOKIE_MAX_AGE_DAYS = 180;

type Choice = 'granted' | 'denied' | null;

const S = (lang: string, fr: string, en: string, es: string) =>
  lang === 'es' ? es : lang === 'en' ? en : fr;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadGtagScript?: () => void;
    __toliaConsent?: 'granted' | 'denied';
  }
}

// Layered persistence: in-memory (window) → sessionStorage → cookie → localStorage.
// Even if one layer is blocked (Safari ITP, private mode, strict browsers, iframe
// sandboxes), the choice stays consistent for the whole session without reloading GA4.
const isValid = (v: unknown): v is 'granted' | 'denied' =>
  v === 'granted' || v === 'denied';

const readCookie = (): Choice => {
  try {
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + STORAGE_KEY + '=([^;]*)')
    );
    if (match && isValid(match[1])) return match[1];
  } catch {
    /* cookies blocked */
  }
  return null;
};

const writeCookie = (choice: 'granted' | 'denied') => {
  try {
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${STORAGE_KEY}=${choice}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
  } catch {
    /* cookies blocked */
  }
};

const readChoice = (): Choice => {
  // 1. In-memory (always available within the tab)
  if (typeof window !== 'undefined' && isValid(window.__toliaConsent)) {
    return window.__toliaConsent;
  }
  // 2. sessionStorage (survives SPA navigation, cleared on tab close)
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    if (isValid(v)) {
      window.__toliaConsent = v;
      return v;
    }
  } catch { /* blocked */ }
  // 3. Cookie (survives sessions, works when storage APIs are blocked)
  const c = readCookie();
  if (c) {
    window.__toliaConsent = c;
    return c;
  }
  // 4. localStorage (long-term, may be blocked first)
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (isValid(v)) {
      window.__toliaConsent = v;
      return v;
    }
  } catch { /* blocked */ }
  return null;
};

const writeChoice = (choice: 'granted' | 'denied') => {
  // Always set in-memory first — guarantees session consistency.
  if (typeof window !== 'undefined') window.__toliaConsent = choice;
  try { sessionStorage.setItem(STORAGE_KEY, choice); } catch { /* blocked */ }
  writeCookie(choice);
  try { localStorage.setItem(STORAGE_KEY, choice); } catch { /* blocked */ }
};

const CookieConsent = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = readChoice();
    if (current === null) {
      setVisible(true);
    } else if (window.gtag) {
      // Re-assert GA4 consent state from persistence on every mount.
      // No reload, no duplicate gtag.js — loadGtagScript is idempotent via __gtagLoaded.
      window.gtag('consent', 'update', {
        analytics_storage: current === 'granted' ? 'granted' : 'denied',
      });
      if (current === 'granted' && typeof window.loadGtagScript === 'function') {
        window.loadGtagScript();
      }
    }
  }, []);

  const decide = (choice: 'granted' | 'denied') => {
    writeChoice(choice);
    setVisible(false);
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: choice === 'granted' ? 'granted' : 'denied',
      });
    }
    // Lazy-load gtag.js ONLY after explicit consent. Idempotent: safe on re-call.
    if (choice === 'granted' && typeof window.loadGtagScript === 'function') {
      window.loadGtagScript();
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
