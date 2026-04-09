import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const statements = [
  "Every consumer searching for a diffuser faces the same impossible choice: silent or powerful, portable or effective, simple or flexible. No technology delivers it all. That's why we built Tolia.",
  "When a diffuser is complicated, usage fades. Within months, it's in a closet. And the oils stop being purchased.",
  "Aromatherapy brands invest heavily to win customers, but without daily rituals, repurchase erodes. Tolia turns occasional users into daily consumers. That changes everything.",
];

const FounderStatementSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 10%) 0%, hsl(25 18% 14%) 100%)' }}
    >
      <div ref={ref} className="max-w-[800px] mx-auto px-6 md:px-12 relative">
        {/* Decorative quotation mark */}
        <div
          className="absolute -top-4 -left-2 md:left-0 text-[8rem] md:text-[10rem] leading-none font-serif select-none pointer-events-none"
          style={{ color: 'hsl(28 50% 65% / 0.12)' }}
          aria-hidden="true"
        >
          ❝
        </div>

        <div className="space-y-8 relative z-10">
          {statements.map((text, i) => (
            <motion.p
              key={i}
              className="text-xl sm:text-2xl md:text-[1.65rem] font-light italic leading-relaxed"
              style={{ color: 'hsl(35 20% 85%)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: i * 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              "{text}"
            </motion.p>
          ))}

          {/* Signature */}
          <motion.div
            className="pt-8 text-right md:text-right"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div
              className="inline-block"
            >
              <div className="w-10 h-px mb-4 ml-auto" style={{ background: 'hsl(28 50% 65% / 0.3)' }} />
              <p className="text-base font-medium text-white">
                Pierre-Emmanuel Thuret
              </p>
              <p className="text-sm font-light mt-1" style={{ color: 'hsl(35 20% 60%)' }}>
                Founder, Innobiz &mdash; 20 years of diffusion R&D
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStatementSection;
