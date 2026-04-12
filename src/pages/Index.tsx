import React, { useEffect, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SectionGradient from '@/components/SectionGradient';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';

// Direct lazy imports – no IntersectionObserver wrapper
const FounderStatementSection = React.lazy(() => import('@/components/sections/FounderStatementSection'));
const ClosetSyndromeSection = React.lazy(() => import('@/components/sections/ClosetSyndromeSection'));
const FrictionByTechSection = React.lazy(() => import('@/components/sections/FrictionByTechSection'));
const TwistAndMistSection = React.lazy(() => import('@/components/sections/TwistAndMistSection'));
const FourInnovationsSection = React.lazy(() => import('@/components/sections/FourInnovationsSection'));
const RitualStrategySection = React.lazy(() => import('@/components/sections/RitualStrategySection'));
const BusinessMathSection = React.lazy(() => import('@/components/sections/BusinessMathSection'));
const MarketProofSection = React.lazy(() => import('@/components/sections/MarketProofSection'));
const BrandMarqueeSection = React.lazy(() => import('@/components/sections/BrandMarqueeSection'));
const WhyInnobizSection = React.lazy(() => import('@/components/sections/WhyInnobizSection'));
const RangeRationalizationSection = React.lazy(() => import('@/components/sections/RangeRationalizationSection'));
const RSESection = React.lazy(() => import('@/components/sections/RSESection'));
const TwoWaysSection = React.lazy(() => import('@/components/sections/TwoWaysSection'));
const FAQSection = React.lazy(() => import('@/components/sections/FAQSection'));
const ContactSection = React.lazy(() => import('@/components/sections/ContactSection'));

const SectionFallback = () => <div style={{ minHeight: '200px' }} />;

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

      <Suspense fallback={<SectionFallback />}>
        {/* 1.5. Founder Statement */}
        <FounderStatementSection />

        {/* Founder Statement → Closet Syndrome */}
        <SectionGradient from="hsl(25 18% 14%)" to="hsl(35 30% 93%)" height="100px" />

        {/* 2. Closet Syndrome */}
        <ClosetSyndromeSection />

        {/* Closet → Friction by Tech */}
        <SectionGradient from="hsl(35 30% 93%)" to="hsl(30 25% 93%)" height="60px" />

        {/* 3. Friction by Technology */}
        <FrictionByTechSection />

        {/* 4. Twist & Mist */}
        <TwistAndMistSection />

        {/* 5. Six Innovations */}
        <FourInnovationsSection />

        {/* 6. Ritual Strategy */}
        <RitualStrategySection />

        {/* Ritual → Business Math */}
        <SectionGradient from="hsl(35 28% 95%)" to="hsl(25 20% 12%)" height="120px" />

        {/* 7. Business Math */}
        <BusinessMathSection />

        {/* Business Math → Market Proof */}
        <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 93%)" height="120px" />

        {/* 8. Market Proof */}
        <MarketProofSection />

        {/* 9. Brand Marquee */}
        <BrandMarqueeSection />

        {/* Marquee → Why Innobiz */}
        <SectionGradient from="hsl(35 30% 97%)" to="hsl(25 20% 12%)" height="120px" />

        {/* 10. Why Innobiz */}
        <WhyInnobizSection />

        {/* Why Innobiz → Range Rationalization */}
        <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 96%)" height="120px" />

        {/* 10b. Range Rationalization */}
        <RangeRationalizationSection />

        {/* Range Rationalization → RSE */}
        <SectionGradient from="hsl(33 35% 94%)" to="hsl(35 30% 96%)" height="80px" />

        {/* 10c. RSE */}
        <RSESection />

        {/* RSE → Two Ways */}
        <SectionGradient from="hsl(30 25% 93%)" to="hsl(35 30% 96%)" height="120px" />

        {/* 11. Two Ways */}
        <TwoWaysSection />

        {/* Two Ways → FAQ */}
        <SectionGradient from="hsl(33 35% 94%)" to="hsl(35 30% 97%)" height="60px" />

        {/* 12. FAQ */}
        <FAQSection />

        {/* 13. Contact */}
        <ContactSection />
      </Suspense>

      {/* 14. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
