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

const IndexBelowFold = React.lazy(() => import('./IndexBelowFold'));

const Index: React.FC = () => {
  useDocumentLang();
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
        <title>Tolia by Innobiz: Premium Refillable Diffuser System</title>
        <meta name="description" content="White-label refillable diffuser by Innobiz. Turn aromatherapy into daily routines and your blends into recurring revenue." />
        <link rel="canonical" href="https://www.innobiz-tolia.com/" />
        <meta property="og:title" content="Tolia by Innobiz: Premium Refillable Diffuser System" />
        <meta property="og:description" content="White-label refillable diffuser by Innobiz. Turn aromatherapy into daily routines and your blends into recurring revenue." />
        <meta property="og:url" content="https://www.innobiz-tolia.com/" />
      </Helmet>
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
