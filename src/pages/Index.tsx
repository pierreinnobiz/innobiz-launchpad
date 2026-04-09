import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SectionGradient from '@/components/SectionGradient';
import LazySection from '@/components/LazySection';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';

// Lazy factories: 5-act narrative structure
const lazyFoundersLetter = () => import('@/components/sections/FoundersLetterSection');
const lazyClosetSyndrome = () => import('@/components/sections/ClosetSyndromeSection');
const lazyFrictionByTech = () => import('@/components/sections/FrictionByTechSection');
const lazyTwistAndMist = () => import('@/components/sections/TwistAndMistSection');
const lazyFourInnovations = () => import('@/components/sections/FourInnovationsSection');
const lazyRangeRationalization = () => import('@/components/sections/RangeRationalizationSection');
const lazyRitualStrategy = () => import('@/components/sections/RitualStrategySection');
const lazyBusinessMath = () => import('@/components/sections/BusinessMathSection');
const lazyMarketProof = () => import('@/components/sections/MarketProofSection');
const lazyBrandMarquee = () => import('@/components/sections/BrandMarqueeSection');
const lazyWhyInnobiz = () => import('@/components/sections/WhyInnobizSection');
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

      {/* 1. Hero (Act opener) */}
      <HeroSection />

      {/* Hero (black) → Founder's Letter (warm cream) */}
      <SectionGradient from="hsl(0 0% 0%)" to="hsl(35 30% 93%)" height="200px" />

      {/* 1.5. Founder's Letter (emotional bridge) */}
      <LazySection factory={lazyFoundersLetter} fallbackHeight="600px" />

      {/* Founder's Letter (warm cream) → Closet Syndrome (warm sand) */}
      <SectionGradient from="hsl(35 35% 95%)" to="hsl(35 30% 93%)" height="80px" />

      {/* 2. The Closet Syndrome (Act 1) */}
      <LazySection factory={lazyClosetSyndrome} fallbackHeight="800px" />

      {/* Closet (warm sand) → Friction by Tech (light warm) */}
      <SectionGradient from="hsl(35 30% 93%)" to="hsl(30 25% 93%)" height="120px" />

      {/* 3. Friction by Technology (Act 2) */}
      <LazySection factory={lazyFrictionByTech} fallbackHeight="1000px" />

      {/* 4. Twist & Mist (Act 3, mechanism) */}
      <LazySection factory={lazyTwistAndMist} fallbackHeight="800px" />

      {/* 5. Four Innovations (Act 3, proofs) */}
      <LazySection factory={lazyFourInnovations} fallbackHeight="600px" />

      {/* 6. Ritual Strategy (Act 4, 12 rituals) */}
      <LazySection factory={lazyRitualStrategy} fallbackHeight="900px" />

      {/* Ritual (light) → Business Math (dark) */}
      <SectionGradient from="hsl(35 28% 95%)" to="hsl(25 20% 12%)" height="200px" />

      {/* 7. Business Math (Act 4, €22 → €82) */}
      <LazySection factory={lazyBusinessMath} fallbackHeight="800px" />

      {/* Business Math (dark) → Market Proof (light) */}
      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 93%)" height="200px" />

      {/* 8. Market Proof (Act 5, traction) */}
      <LazySection factory={lazyMarketProof} fallbackHeight="700px" />

      {/* 9. Brand Marquee */}
      <LazySection factory={lazyBrandMarquee} fallbackHeight="300px" />

      {/* Marquee (light) → Why Innobiz (dark) */}
      <SectionGradient from="hsl(35 30% 97%)" to="hsl(25 20% 12%)" height="200px" />

      {/* 10. Why Innobiz (Act 5, credibility moat) */}
      <LazySection factory={lazyWhyInnobiz} fallbackHeight="700px" />

      {/* Why Innobiz (dark) → Two Ways (light) */}
      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 96%)" height="200px" />

      {/* 11. Two Ways to Work with Tolia */}
      <LazySection factory={lazyTwoWays} fallbackHeight="900px" />

      {/* Two Ways (light) → FAQ (neutral) */}
      <SectionGradient from="hsl(33 35% 94%)" to="hsl(35 30% 97%)" height="120px" />

      {/* 12. FAQ */}
      <LazySection factory={lazyFAQ} fallbackHeight="1200px" />

      {/* 13. Contact */}
      <LazySection factory={lazyContact} fallbackHeight="800px" />

      {/* 14. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
