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

export const trackCTAClick = (ctaLabel: string, section: string, ctaType?: string) => {
  trackEvent('cta_click', {
    label: ctaLabel,
    section,
    cta_type: ctaType || section,
  });
};
