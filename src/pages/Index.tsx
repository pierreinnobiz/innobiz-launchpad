import React, { useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import SocialProofBar from '@/components/sections/SocialProofBar';
import HomeProblemSection from '@/components/sections/HomeProblemSection';
import SectionGradient from '@/components/SectionGradient';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';
import { useLanguage } from '@/contexts/LanguageContext';
import SeoOpenGraph from '@/components/SeoOpenGraph';
import { useLocation } from 'react-router-dom';
import { langFromPath } from '@/lib/langPath';
import { HOME_SEO } from '@/seo/homeSeo';


// A stale build (old chunk names) makes this dynamic import fail after a deploy.
// Retry once, then reload the page once to pick up the new asset manifest.
const RELOAD_FLAG = 'tolia:chunk-reload';

const IndexBelowFold = React.lazy(() =>
  import('./IndexBelowFold')
    .then((mod) => {
      try { sessionStorage.removeItem(RELOAD_FLAG); } catch { /* ignore */ }
      return mod;
    })
    .catch(async (err) => {
      try {
        if (!sessionStorage.getItem(RELOAD_FLAG)) {
          sessionStorage.setItem(RELOAD_FLAG, '1');
          window.location.reload();
          return await new Promise<never>(() => {});
        }
      } catch { /* ignore */ }
      throw err;
    })
);




const Index: React.FC = () => {
  useDocumentLang();
  const { language } = useLanguage();
  const seo = HOME_SEO[language] ?? HOME_SEO.en;
  const pathLang = langFromPath(useLocation().pathname);
  const homePath = pathLang ? `/${pathLang}/` : '/';
  // Below-the-fold sections are loaded in a separate chunk right after the
  // first paint, so the hero (LCP element on mobile) is not delayed by them.
  const [showBelowFold, setShowBelowFold] = useState(
    typeof window !== 'undefined' && Boolean(window.location.hash)
  );

  useEffect(() => {
    const cleanup = initScrollDepthTracking();
    return cleanup;
  }, []);

  useEffect(() => {
    if (showBelowFold) return;
    let timer: number | undefined;
    const reveal = () => setShowBelowFold(true);
    // Wait for the first frame, then load as soon as the browser is idle.
    const raf = requestAnimationFrame(() => {
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback;
      if (ric) ric(reveal, { timeout: 1200 });
      else timer = window.setTimeout(reveal, 200);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [showBelowFold]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        {/* une adresse par langue : chaque page déclare la sienne, et ses traductions (référencement, 17/10/2026) */}
        <link rel="canonical" href={`https://www.innobiz-tolia.com${homePath}`} />
        <link rel="alternate" hrefLang="fr" href="https://www.innobiz-tolia.com/fr/" />
        <link rel="alternate" hrefLang="en" href="https://www.innobiz-tolia.com/en/" />
        <link rel="alternate" hrefLang="es" href="https://www.innobiz-tolia.com/es/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.innobiz-tolia.com/" />
      </Helmet>
      <SeoOpenGraph title={seo.title} description={seo.description} path={homePath} />

      <Navigation />

      <HeroSection />

      <SocialProofBar />

      <SectionGradient from="hsl(25 18% 14%)" to="hsl(35 30% 93%)" height="80px" />

      <HomeProblemSection />

      {showBelowFold ? (
        <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
          <IndexBelowFold />
        </Suspense>
      ) : (
        <div className="min-h-screen bg-background" aria-hidden="true" />
      )}
    </div>
  );
};
export default Index;
