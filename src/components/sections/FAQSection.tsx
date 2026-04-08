import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp } from '@/lib/animations';

const faqs = [
  { q: 'What is the MOQ for a white-label program?', a: "White-label MOQs are project-based. Typical first orders start at 3,000 units. Send us your volume and timing — we'll size a program that fits." },
  { q: 'What is the MOQ for a stock order?', a: '300 units minimum, delivered as branded Tolia. Ships from our French warehouse in 2 to 4 weeks.' },
  { q: 'Can I co-brand the stock-order packaging?', a: 'Yes — you can add a co-branded outer sleeve or gift box featuring your brand alongside Tolia. The unit itself stays branded Tolia.' },
  { q: 'Can my brand use its own essential oils with Tolia?', a: "Yes. Twist & Mist capsules are manufactured by Innobiz and pre-filled with your brand's blends. You own the formulas, we handle the industrial side." },
  { q: 'Do you offer territorial exclusivity?', a: 'On white-label programs — yes. Category and territory exclusivity is negotiable based on volume and commitment. Stock orders are non-exclusive.' },
  { q: 'What about regulatory compliance?', a: 'Tolia is CE-marked, RoHS-compliant, and sold across regulated European markets. We handle all diffuser-side regulatory documentation. Oil compliance remains with the brand owner.' },
  { q: 'How does Tolia support our RSE/sustainability story?', a: 'Tolia is designed to be repaired: modular components, user-replaceable battery, diagnostic questionnaire to identify the part to change. A product that is used every day never becomes dormant waste.' },
  { q: 'What retail price should we plan for?', a: 'Typical retail is €79 to €129 depending on market and packaging. B2B pricing is shared during the first qualified conversation.' },
  { q: 'Do you support launches with marketing content?', a: 'Yes — product photography, video assets, technical specs, usage content for catalog, e-commerce and trade materials.' },
  { q: 'Who do I talk to to get started?', a: "The form below reaches our business development team directly. First response within one business day." },
];

const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Questions brands ask us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Everything you need to know before the first call.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            If something isn't covered here, the form at the bottom of the page is the fastest way to get a precise answer.
          </p>
        </motion.div>

        {/* Q&A grid — no accordion */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerSlow}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="p-6 bg-card rounded-2xl border border-border/40 group
                transition-all duration-400 hover:shadow-[0_8px_32px_-8px_hsl(25_15%_18%/0.1)] hover:-translate-y-0.5
                hover:border-primary/20"
              variants={fadeBlurUp}
            >
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base group-hover:text-primary transition-colors duration-300">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
