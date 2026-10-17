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

const HOME_SEO = {
  fr: {
    title: "Diffuseurs d'huiles essentielles en marque blanche | Tolia by Innobiz",
    description: "Diffuseur d'huiles essentielles pour les marques d'aromathérapie : il fonctionne directement avec vos flacons. Diffusion sans eau, arômes préservés, et des clients qui rachètent vos huiles.",
    keywords: "diffuseurs d'huiles essentielles, diffusion huiles essentielles, diffuseur aromatique, arômes aromathérapie, diffuseur marque blanche, diffuseur sans eau",
  },
  en: {
    title: 'White-Label Essential Oil Diffusers | Tolia by Innobiz',
    description: 'Essential oil diffuser for aromatherapy brands that works straight from your own bottles. Waterless diffusion that protects the aroma, and customers who keep buying your oils.',
    keywords: 'essential oil diffusers, essential oil diffusion, aromatic diffuser, aromatherapy aromas, white label diffuser, waterless diffuser',
  },
  es: {
    title: 'Difusores de aceites esenciales de marca blanca | Tolia by Innobiz',
    description: 'Difusor de aceites esenciales para marcas de aromaterapia que funciona directamente con sus frascos. Difusión sin agua, aromas intactos y clientes que vuelven a comprar sus aceites.',
    keywords: 'difusores de aceites esenciales, difusión de aceites esenciales, difusor aromático, aromas aromaterapia, difusor marca blanca',
  },
} as const;


const Index: React.FC = () => {
  useDocumentLang();
  const { language } = useLanguage();
  const seo = HOME_SEO[language] ?? HOME_SEO.en;
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
        <link rel="canonical" href="https://www.innobiz-tolia.com/" />
      </Helmet>
      <SeoOpenGraph title={seo.title} description={seo.description} path="/" />

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
