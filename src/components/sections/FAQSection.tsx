import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const faqs = [
  {
    q: 'What is the MOQ for white-label?',
    a: "White-label MOQs are project-based. Typical first orders start at 3,000 units for a fully custom program. Contact us with your volume and timing and we'll size a program that fits.",
  },
  {
    q: "What's the MOQ for a stock order?",
    a: '300 pieces minimum. Delivered as branded Tolia (Innobiz branding on the unit). Ships from our French warehouse in 2 to 4 weeks.',
  },
  {
    q: 'Can I customize the packaging of a stock order?',
    a: 'Yes — you can add a co-branded outer sleeve or gift box featuring your brand alongside Tolia. The unit itself remains branded Tolia.',
  },
  {
    q: 'Can my brand use its own essential oils with Tolia?',
    a: "Yes. The Twist & Mist system is compatible with Innobiz-manufactured capsules pre-filled with your brand's blends. We handle capsule manufacturing; you control the formulas.",
  },
  {
    q: 'Do you offer territorial exclusivity?',
    a: 'For white-label programs, yes — category and territory exclusivity is negotiable based on volume and commitment. Stock orders are non-exclusive.',
  },
  {
    q: 'What are the lead times?',
    a: 'Stock orders: 2 to 4 weeks. White-label: 12 to 20 weeks from brief to delivery, depending on customization depth.',
  },
  {
    q: 'What about regulatory compliance?',
    a: 'Tolia is CE-marked, RoHS-compliant and sold in regulated markets across Europe. We handle all diffuser-side regulatory documentation. Oil compliance remains with the brand owner.',
  },
  {
    q: "What's the price positioning?",
    a: 'Tolia retails between €79 and €129 depending on market and packaging. B2B pricing is shared during the first qualified conversation.',
  },
  {
    q: 'Do you support launches with marketing content?',
    a: 'Yes — we provide product photography, video assets, technical specs and usage content for your catalog, e-commerce and trade materials.',
  },
  {
    q: 'Who do I talk to to get started?',
    a: "The form below goes directly to our business development team. You'll get a response within one business day.",
  },
];

const FAQSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'Questions brands ask us', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'Everything you need to know before the first call.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', "If something isn't covered here, the form at the bottom of the page is the fastest way to get a precise answer.", 'TODO ES');

  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {subheadline}
          </p>
        </motion.div>

        {/* Q&A grid — 2 columns desktop, 1 column mobile */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="p-6 bg-card rounded-2xl border border-border/40"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
