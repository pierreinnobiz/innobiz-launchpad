import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const WORKER_URL = 'https://instantly-airtable-worker.pierre-innobiz.workers.dev/track/visit';
const VALID_LANGS = ['fr', 'en', 'es'] as const;
type ValidLang = typeof VALID_LANGS[number];

export function useWave2Tracking() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // 1) Switch langue si ?lang= valide (DE volontairement exclu)
    const lang = params.get('lang')?.toLowerCase();
    if (lang && (VALID_LANGS as readonly string[]).includes(lang)) {
      setLanguage(lang as ValidLang);
      document.documentElement.lang = lang;
    }

    // 2) Notifier worker si prospect Wave 2 (uid + prospect_email)
    const uid = params.get('uid');
    const prospect_email = params.get('prospect_email');
    if (uid && prospect_email) {
      const payload = {
        uid,
        prospect_email,
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
        lang: lang && (VALID_LANGS as readonly string[]).includes(lang) ? lang : null,
        referrer: document.referrer,
        ts: Date.now(),
      };
      fetch(WORKER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => { /* silent */ });
    }
  }, [setLanguage]);
}

export default useWave2Tracking;
