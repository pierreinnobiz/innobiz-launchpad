import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SectionGradient from '@/components/SectionGradient';
import LazySection from '@/components/LazySection';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';

// Lazy factories: 5-act narrative structure
const lazyFounderStatement = () => import('@/components/sections/FounderStatementSection');
const lazyClosetSyndrome = () => import('@/components/sections/ClosetSyndromeSection');
const lazyFrictionByTech = () => import('@/components/sections/FrictionByTechSection');
const lazyTwistAndMist = () => import('@/components/sections/TwistAndMistSection');
const lazyFourInnovations = () => import('@/components/sections/FourInnovationsSection');
const lazyRitualStrategy = () => import('@/components/sections/RitualStrategySection');
const lazyBusinessMath = () => import('@/components/sections/BusinessMathSection');
const lazyMarketProof = () => import('@/components/sections/MarketProofSection');
const lazyBrandMarquee = () => import('@/components/sections/BrandMarqueeSection');
const lazyWhyInnobiz = () => import('@/components/sections/WhyInnobizSection');
const lazyRangeRationalization = () => import('@/components/sections/RangeRationalizationSection');
const lazyRSE = () => import('@/components/sections/RSESection');
const lazyTwoWays = () => import('@/components/sections/TwoWaysSection');
const lazyFAQ = () => import('@/components/sections/FAQSection');
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

      {/* Hero → Founder Statement */}
      <SectionGradient from="hsl(0 0% 0%)" to="hsl(25 20% 10%)" height="80px" />

      {/* 1.5. Founder Statement */}
      <LazySection factory={lazyFounderStatement} fallbackHeight="400px" />

      {/* Founder Statement → Closet Syndrome */}
      <SectionGradient from="hsl(25 18% 14%)" to="hsl(35 30% 93%)" height="100px" />

      {/* 2. Closet Syndrome */}
      <LazySection factory={lazyClosetSyndrome} fallbackHeight="700px" />

      {/* Closet → Friction by Tech */}
      <SectionGradient from="hsl(35 30% 93%)" to="hsl(30 25% 93%)" height="60px" />

      {/* 3. Friction by Technology */}
      <LazySection factory={lazyFrictionByTech} fallbackHeight="800px" />

      {/* 4. Twist & Mist */}
      <LazySection factory={lazyTwistAndMist} fallbackHeight="700px" />

      {/* 5. Six Innovations */}
      <LazySection factory={lazyFourInnovations} fallbackHeight="500px" />

      {/* 6. Ritual Strategy */}
      <LazySection factory={lazyRitualStrategy} fallbackHeight="800px" />

      {/* Ritual → Business Math */}
      <SectionGradient from="hsl(35 28% 95%)" to="hsl(25 20% 12%)" height="120px" />

      {/* 7. Business Math */}
      <LazySection factory={lazyBusinessMath} fallbackHeight="600px" />

      {/* Business Math → Market Proof */}
      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 93%)" height="120px" />

      {/* 8. Market Proof */}
      <LazySection factory={lazyMarketProof} fallbackHeight="500px" />

      {/* 9. Brand Marquee */}
      <LazySection factory={lazyBrandMarquee} fallbackHeight="200px" />

      {/* Marquee → Why Innobiz */}
      <SectionGradient from="hsl(35 30% 97%)" to="hsl(25 20% 12%)" height="120px" />

      {/* 10. Why Innobiz */}
      <LazySection factory={lazyWhyInnobiz} fallbackHeight="500px" />

      {/* Why Innobiz → Two Ways */}
      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 96%)" height="120px" />

      {/* 11. Two Ways */}
      <LazySection factory={lazyTwoWays} fallbackHeight="700px" />

      {/* Two Ways → FAQ */}
      <SectionGradient from="hsl(33 35% 94%)" to="hsl(35 30% 97%)" height="60px" />

      {/* 12. FAQ */}
      <LazySection factory={lazyFAQ} fallbackHeight="800px" />

      {/* 13. Contact */}
      <LazySection factory={lazyContact} fallbackHeight="600px" />

      {/* 14. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
