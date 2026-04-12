import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FounderStatementSection from '@/components/sections/FounderStatementSection';
import ClosetSyndromeSection from '@/components/sections/ClosetSyndromeSection';
import FrictionByTechSection from '@/components/sections/FrictionByTechSection';
import TwistAndMistSection from '@/components/sections/TwistAndMistSection';
import FourInnovationsSection from '@/components/sections/FourInnovationsSection';
import RitualStrategySection from '@/components/sections/RitualStrategySection';
import BusinessMathSection from '@/components/sections/BusinessMathSection';
import MarketProofSection from '@/components/sections/MarketProofSection';
import BrandMarqueeSection from '@/components/sections/BrandMarqueeSection';
import WhyInnobizSection from '@/components/sections/WhyInnobizSection';
import RangeRationalizationSection from '@/components/sections/RangeRationalizationSection';
import RSESection from '@/components/sections/RSESection';
import TwoWaysSection from '@/components/sections/TwoWaysSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import SectionGradient from '@/components/SectionGradient';
import { initScrollDepthTracking } from '@/lib/tracking';
import { useDocumentLang } from '@/hooks/useDocumentLang';

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

      <SectionGradient from="hsl(0 0% 0%)" to="hsl(25 20% 10%)" height="80px" />

      <FounderStatementSection />

      <SectionGradient from="hsl(25 18% 14%)" to="hsl(35 30% 93%)" height="100px" />

      <ClosetSyndromeSection />

      <SectionGradient from="hsl(35 30% 93%)" to="hsl(30 25% 93%)" height="60px" />

      <FrictionByTechSection />

      <TwistAndMistSection />

      <FourInnovationsSection />

      <RitualStrategySection />

      <SectionGradient from="hsl(35 28% 95%)" to="hsl(25 20% 12%)" height="120px" />

      <BusinessMathSection />

      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 93%)" height="120px" />

      <MarketProofSection />

      <BrandMarqueeSection />

      <SectionGradient from="hsl(35 30% 97%)" to="hsl(25 20% 12%)" height="120px" />

      <WhyInnobizSection />

      <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 96%)" height="120px" />

      <RangeRationalizationSection />

      <SectionGradient from="hsl(33 35% 94%)" to="hsl(35 30% 96%)" height="80px" />

      <RSESection />

      <SectionGradient from="hsl(30 25% 93%)" to="hsl(35 30% 96%)" height="120px" />

      <TwoWaysSection />

      <SectionGradient from="hsl(33 35% 94%)" to="hsl(35 30% 97%)" height="60px" />

      <FAQSection />

      <ContactSection />

      <Footer />
    </div>
  );
};

export default Index;
