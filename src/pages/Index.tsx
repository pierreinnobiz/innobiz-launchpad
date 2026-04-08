import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SectionGradient from '@/components/SectionGradient';
import LazySection from '@/components/LazySection';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';

// Lazy factories
const lazyTechComparison = () => import('@/components/sections/TechnologyComparisonSection');
const lazyDailyRoutine = () => import('@/components/sections/DailyRoutineSection');
const lazyTwoWays = () => import('@/components/sections/TwoWaysSection');
const lazyBusinessImpact = () => import('@/components/sections/BusinessImpactSection');
const lazyCaseStudy = () => import('@/components/sections/CaseStudySection');
const lazyMarketTraction = () => import('@/components/sections/MarketTractionSection');
const lazyBrandMarquee = () => import('@/components/sections/BrandMarqueeSection');
const lazyFinalBlock = () => import('@/components/sections/FinalBlockSection');
const lazyContact = () => import('@/components/sections/ContactSection');

const Index: React.FC = () => {
  useDocumentLang();

  useEffect(() => {
    const cleanup = initScrollDepthTracking();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />

      {/* Hero (black) → Tech Comparison (warm sand) */}
      <SectionGradient from="hsl(0 0% 0%)" to="hsl(30 25% 93%)" height="200px" />

      <LazySection factory={lazyTechComparison} fallbackHeight="1000px" />
      <LazySection factory={lazyDailyRoutine} fallbackHeight="1400px" />
      <LazySection factory={lazyTwoWays} fallbackHeight="800px" />

      {/* Two Ways (light) → Impact (dark) */}
      <SectionGradient from="hsl(33 35% 94%)" to="hsl(25 20% 12%)" height="200px" />

      <LazySection factory={lazyBusinessImpact} fallbackHeight="800px" />

      {/* Impact (dark) → Proof (light) */}
      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 96%)" height="200px" />

      <LazySection factory={lazyCaseStudy} fallbackHeight="700px" />
      <LazySection factory={lazyMarketTraction} fallbackHeight="700px" />
      <LazySection factory={lazyBrandMarquee} fallbackHeight="400px" />

      {/* Marquee (light) → Final Block (dark) */}
      <SectionGradient from="hsl(35 30% 97%)" to="hsl(25 20% 12%)" height="200px" />

      <LazySection factory={lazyFinalBlock} fallbackHeight="400px" />

      {/* Final (dark) → Contact (light) */}
      <SectionGradient from="hsl(25 18% 10%)" to="hsl(35 30% 97%)" height="200px" />

      <LazySection factory={lazyContact} fallbackHeight="800px" />
      <Footer />
    </div>
  );
};

export default Index;
