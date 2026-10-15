import React from 'react';
import JourneeSection from '@/components/journee/JourneeSection';
import HomeTechSection from '@/components/sections/HomeTechSection';
import HomeOffersSection from '@/components/sections/HomeOffersSection';
import BrandMarqueeSection from '@/components/sections/BrandMarqueeSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

// Everything below the first screens lives in its own chunk so the hero can
// paint as early as possible on mobile.
// Page simplifiée : 19 sections regroupées en 8 blocs (constat, journée avec Tolia, technologie, offres, marques,
// questions, contact). « Une journée avec Tolia » remplace Twist & Mist, Stratégie Rituel et leurs cartes en doublon.
const IndexBelowFold: React.FC = () => (
  <>
    <JourneeSection />

    <HomeTechSection />

    <HomeOffersSection />

    <BrandMarqueeSection />

    <FAQSection />

    <ContactSection />

    <Footer />
  </>
);

export default IndexBelowFold;
