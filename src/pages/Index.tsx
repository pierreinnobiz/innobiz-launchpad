import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SectionGradient from '@/components/SectionGradient';
import LazySection from '@/components/LazySection';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';

// Lazy factories
const lazyProblem = () => import('@/components/sections/ProblemSection');
const lazyTechComparison = () => import('@/components/sections/TechnologyComparisonSection');
// const lazyHowToliaWorks = () => import('@/components/sections/BottleToRoutineSection'); // TODO Part 3
const lazyBusinessImpact = () => import('@/components/sections/BusinessImpactSection');
const lazyTwoWays = () => import('@/components/sections/TwoWaysSection');
const lazyCaseStudy = () => import('@/components/sections/CaseStudySection');
const lazyMarketTraction = () => import('@/components/sections/MarketTractionSection');
const lazyBrandMarquee = () => import('@/components/sections/BrandMarqueeSection');
// const lazyWhyInnobiz = () => import('@/components/sections/WhyInnobizSection'); // TODO Part 2
// const lazyFAQ = () => import('@/components/sections/FAQSection'); // TODO Part 3
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

      {/* 1. Hero */}
      <HeroSection />

      {/* Hero (black) → Problem (warm sand) */}
      <SectionGradient from="hsl(0 0% 0%)" to="hsl(30 25% 93%)" height="200px" />

      {/* 2. Problem */}
      <LazySection factory={lazyProblem} fallbackHeight="800px" />

      {/* 3. Technology Comparison */}
      <LazySection factory={lazyTechComparison} fallbackHeight="1000px" />

      {/* 4. How Tolia Works — TODO Part 3 */}

      {/* Problem/Tech (light) → Impact (dark) */}
      <SectionGradient from="hsl(33 35% 94%)" to="hsl(25 20% 12%)" height="200px" />

      {/* 5. Business Impact */}
      <LazySection factory={lazyBusinessImpact} fallbackHeight="800px" />

      {/* Impact (dark) → Two Ways (light) */}
      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 96%)" height="200px" />

      {/* 6. Two Ways */}
      <LazySection factory={lazyTwoWays} fallbackHeight="800px" />

      {/* Two Ways (light) → Proof (light) – subtle */}
      {/* 7. Market Proof (CaseStudy + MarketTraction) — will be merged in Part 2 */}
      <LazySection factory={lazyCaseStudy} fallbackHeight="700px" />
      <LazySection factory={lazyMarketTraction} fallbackHeight="700px" />

      {/* 8. Brand Marquee */}
      <LazySection factory={lazyBrandMarquee} fallbackHeight="400px" />

      {/* 9. WhyInnobiz — TODO Part 2 */}

      {/* 10. FAQ — TODO Part 3 */}

      {/* Marquee (light) → Contact (light) */}
      <SectionGradient from="hsl(35 30% 97%)" to="hsl(35 30% 97%)" height="100px" />

      {/* 11. Contact */}
      <LazySection factory={lazyContact} fallbackHeight="800px" />

      <Footer />
    </div>
  );
};

export default Index;
