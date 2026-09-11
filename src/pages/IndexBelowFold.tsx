import React from 'react';
import FrictionByTechSection from '@/components/sections/FrictionByTechSection';
import TwistAndMistSection from '@/components/sections/TwistAndMistSection';
import FourInnovationsSection from '@/components/sections/FourInnovationsSection';
import RitualStrategySection from '@/components/sections/RitualStrategySection';
import BusinessMathSection from '@/components/sections/BusinessMathSection';
import MarketProofSection from '@/components/sections/MarketProofSection';
import LeadMagnetSection from '@/components/sections/LeadMagnetSection';
import BrandMarqueeSection from '@/components/sections/BrandMarqueeSection';
import WhyInnobizSection from '@/components/sections/WhyInnobizSection';
import RangeRationalizationSection from '@/components/sections/RangeRationalizationSection';
import RSESection from '@/components/sections/RSESection';
import TwoWaysSection from '@/components/sections/TwoWaysSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import SectionGradient from '@/components/SectionGradient';

// Everything below the first screens lives in its own chunk so the hero can
// paint as early as possible on mobile. Markup and order are unchanged.
const IndexBelowFold: React.FC = () => (
  <>
    <FrictionByTechSection />

    <TwistAndMistSection />

    <FourInnovationsSection />

    <RitualStrategySection />

    <SectionGradient from="hsl(35 28% 95%)" to="hsl(25 20% 12%)" height="120px" />

    <BusinessMathSection />

    <SectionGradient from="hsl(25 18% 16%)" to="hsl(35 30% 93%)" height="120px" />

    <MarketProofSection />

    <LeadMagnetSection />

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
  </>
);

export default IndexBelowFold;
