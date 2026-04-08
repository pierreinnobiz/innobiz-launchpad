// Analytics tracking utility
// Sends events to Google Analytics (GA4) via gtag + custom events

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, string>) => {
  // Send to GA4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  }

  // Custom event for other integrations
  window.dispatchEvent(new CustomEvent('tolia_analytics', {
    detail: { event: eventName, ...properties, timestamp: new Date().toISOString() }
  }));
};

export const trackCTAClick = (ctaLabel: string, section: string) => {
  trackEvent('cta_click', { label: ctaLabel, section });
};

// Scroll depth tracking - call once on mount
export const initScrollDepthTracking = () => {
  const thresholds = [25, 50, 75, 90];
  const fired = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const percent = Math.round((window.scrollY / scrollHeight) * 100);

    thresholds.forEach(t => {
      if (percent >= t && !fired.has(t)) {
        fired.add(t);
        trackEvent('scroll_depth', { depth: `${t}%` });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};
