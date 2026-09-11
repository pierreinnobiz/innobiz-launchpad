import React, { useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import SocialProofBar from '@/components/sections/SocialProofBar';
import FounderStatementSection from '@/components/sections/FounderStatementSection';
import ClosetSyndromeSection from '@/components/sections/ClosetSyndromeSection';
import SectionGradient from '@/components/SectionGradient';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';
import { useLanguage } from '@/contexts/LanguageContext';
import SeoOpenGraph from '@/components/SeoOpenGraph';


const IndexBelowFold = React.lazy(() => import('./IndexBelowFold'));

const HOME_SEO = {
  fr: {
    title: "Diffuseurs d'huiles essentielles en marque blanche | Tolia by Innobiz",
    description: "Diffuseur aromatique rechargeable pour marques d'aromathérapie. Diffusion d'huiles essentielles sans eau, arômes préservés, revenus récurrents de recharges.",
    keywords: "diffuseurs d'huiles essentielles, diffusion huiles essentielles, diffuseur aromatique, arômes aromathérapie, diffuseur marque blanche, diffuseur sans eau",
  },
  en: {
    title: 'White-Label Essential Oil Diffusers | Tolia by Innobiz',
    description: 'Refillable aromatic diffuser for aromatherapy brands. Waterless essential oil diffusion that protects aroma integrity and drives recurring refill revenue.',
    keywords: 'essential oil diffusers, essential oil diffusion, aromatic diffuser, aromatherapy aromas, white label diffuser, waterless diffuser',
  },
  es: {
    title: 'Difusores de aceites esenciales de marca blanca | Tolia by Innobiz',
    description: 'Difusor aromático recargable para marcas de aromaterapia. Difusión de aceites esenciales sin agua, aromas intactos e ingresos recurrentes por recargas.',
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

      <SectionGradient from="hsl(25 18% 14%)" to="hsl(25 20% 10%)" height="40px" />

      <FounderStatementSection />

      <SectionGradient from="hsl(25 18% 14%)" to="hsl(35 30% 93%)" height="100px" />

      <ClosetSyndromeSection />

      <SectionGradient from="hsl(35 30% 93%)" to="hsl(30 25% 93%)" height="60px" />

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
