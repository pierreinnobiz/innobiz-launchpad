import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp } from '@/lib/animations';

const faqs = [
  { q: 'What is the MOQ for a white-label program?', a: "White-label MOQs are project-based. Typical first orders start at 3,000 units, but we tailor the program to your launch plan, timeline, and market. Share your vision — we'll build a proposal that fits." },
  { q: 'What is the MOQ for a stock order?', a: 'Minimum 300 units, delivered as branded Tolia. Ships from our French warehouse within 2 to 4 weeks. Perfect for testing the market or complementing an existing range without long lead times.' },
  { q: 'Can I co-brand the stock-order packaging?', a: 'Absolutely. You can add a co-branded outer sleeve or gift box featuring your brand alongside Tolia. The diffuser itself stays branded Tolia — giving you credibility while you test demand.' },
  { q: 'Can my brand use its own essential oils with Tolia?', a: "Yes — that's the core of the model. Twist & Mist modules are manufactured by Innobiz and pre-filled with your proprietary blends. You own the formulas, we handle all industrial production and quality control." },
  { q: 'Do you offer territorial exclusivity?', a: 'On white-label programs — yes. Category and territory exclusivity is negotiable based on volume commitment and strategic alignment. Stock orders are non-exclusive to maintain speed and flexibility.' },
  { q: 'What about regulatory compliance?', a: 'Tolia is CE-marked, RoHS-compliant, and already sold across regulated European markets. We provide all diffuser-side regulatory documentation. Essential oil compliance remains with the brand owner, as per industry standard.' },
  { q: 'How does Tolia support our sustainability commitments?', a: 'Tolia is designed for longevity: modular components, user-replaceable battery, and a diagnostic system to identify and replace individual parts. A product used daily for years never becomes dormant waste — which is the strongest RSE story you can tell.' },
  { q: 'What retail price should we plan for?', a: 'Typical retail positioning is €79 to €129 depending on market, channel, and packaging tier. B2B pricing and margin structure are shared during your first qualified conversation with our team.' },
  { q: 'Do you support product launches with marketing assets?', a: 'Yes — we provide professional product photography, video content, technical specifications, and ready-to-use copy for e-commerce, catalog, and trade presentations. Your launch starts with a complete toolkit.' },
  { q: 'Who do I talk to to get started?', a: "Fill out the form below — it goes directly to our business development team (not a chatbot). You'll receive a personalized response within one business day, along with a proposal tailored to your specific situation." },
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
            Your questions, answered honestly
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Everything you need to know before your first call with our team.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            We've compiled the questions that brand directors, category managers, and purchasing teams ask us most often. If yours isn't here, the form below is the fastest way to a precise, personalized answer.
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
