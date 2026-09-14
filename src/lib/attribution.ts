// Session-level attribution: memorize the ORIGINAL referrer and landing page
// (with utm params) on the very first page view of the session, so internal
// navigation does not overwrite the traffic source.

const REFERRER_KEY = 'tolia:attr:referrer';
const LANDING_KEY = 'tolia:attr:landing_page';

export const captureSessionAttribution = (): void => {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(LANDING_KEY) === null) {
      sessionStorage.setItem(LANDING_KEY, window.location.href);
    }
    if (sessionStorage.getItem(REFERRER_KEY) === null) {
      sessionStorage.setItem(REFERRER_KEY, document.referrer || '');
    }
  } catch {
    /* storage unavailable (private mode / blocked cookies) */
  }
};

export const getSessionAttribution = (): { referrer: string; landing_page: string } => {
  if (typeof window === 'undefined') return { referrer: '', landing_page: '' };
  try {
    return {
      referrer: sessionStorage.getItem(REFERRER_KEY) ?? document.referrer ?? '',
      landing_page: sessionStorage.getItem(LANDING_KEY) ?? window.location.href,
    };
  } catch {
    return { referrer: document.referrer || '', landing_page: window.location.href };
  }
};
