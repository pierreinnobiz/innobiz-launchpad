import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ProspectTracker = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    const utmSource = params.get('utm_source') || '(direct)';
    const utmCampaign = params.get('utm_campaign') || '';
    const utmContent = params.get('utm_content') || '';
    const prospectEmail = ref || '(anonymous)';

    const gtag = (...args: unknown[]) => {
      if (typeof window.gtag === 'function') window.gtag(...args);
    };

    // BEHAVIOR 1 - PROSPECT VISIT
    if (ref) {
      gtag('event', 'prospect_visit', {
        prospect_email: ref,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        page_url: window.location.pathname,
        visit_time: new Date().toISOString(),
      });
    }

    // BEHAVIOR 2 - SCROLL DEPTH
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = (window.scrollY / scrollHeight) * 100;
      milestones.forEach((m) => {
        if (percent >= m && !fired.has(m)) {
          fired.add(m);
          gtag('event', 'scroll_depth', {
            percent: m,
            prospect_email: prospectEmail,
            utm_source: utmSource,
          });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // BEHAVIOR 3 - TIME ON PAGE
    const timeMilestones: Array<[number, number]> = [
      [30000, 30],
      [60000, 60],
      [120000, 120],
      [300000, 300],
    ];
    const timeouts = timeMilestones.map(([ms, seconds]) =>
      window.setTimeout(() => {
        gtag('event', 'time_on_page', {
          seconds,
          prospect_email: prospectEmail,
          utm_source: utmSource,
        });
      }, ms)
    );

    // BEHAVIOR 4 - CTA CLICKS
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      const button = target.closest('button') as HTMLButtonElement | null;

      let matched: HTMLElement | null = null;
      let href = '';

      if (link) {
        const rawHref = link.getAttribute('href') || '';
        if (
          rawHref.includes('contact') ||
          rawHref.includes('#request') ||
          rawHref.includes('mailto')
        ) {
          matched = link;
          href = link.href || rawHref;
        }
      }

      if (!matched && button && button.type === 'submit') {
        matched = button;
      }

      if (!matched) return;

      const text = (matched.textContent || '').trim().slice(0, 50);
      gtag('event', 'cta_click', {
        cta_text: text,
        cta_href: href,
        prospect_email: prospectEmail,
        utm_source: utmSource,
      });
    };
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      timeouts.forEach((t) => clearTimeout(t));
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};

export default ProspectTracker;
