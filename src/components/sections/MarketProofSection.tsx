import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const MarketProofSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'Proven in market', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'Already in 100,000+ homes. Already driving 3.8× oil sales.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', "Tolia is not a concept — it's a product your competitors may already be selling.", 'TODO ES');

  const stats = [
    {
      value: '100K+',
      label: t3(l, 'TODO FR', 'units sold in 7 months', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Market validation, not a beta.', 'TODO ES'),
    },
    {
      value: '3.8×',
      label: t3(l, 'TODO FR', 'more oil sales per customer', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Measured vs. traditional diffusers in the same category.', 'TODO ES'),
    },
    {
      value: '75%',
      label: t3(l, 'TODO FR', 'lower after-sales costs', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Vs. ultrasonic, Innobiz field data across 10+ brand deployments.', 'TODO ES'),
    },
  ];

  const scenario = t3(l,
    'TODO FR',
    'A leading European aromatherapy brand replaced its ultrasonic range with Tolia and restructured its oil offering around Twist & Mist capsules. Within 12 months: essential oil revenue per customer grew from €46/year to €164/year, diffuser returns dropped by 72%, and the brand reallocated three diffuser SKUs into a premium gift-set lineup around Tolia.',
    'TODO ES'
  );

  const ctaText = t3(l, 'TODO FR', 'See how this could apply to your brand', 'TODO ES');

  return (
    <section id="market-proof" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
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

        {/* 3 proof stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="text-center p-8 bg-card rounded-2xl border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'hsl(28 45% 48%)' }}>
                {s.value}
              </div>
              <div className="font-semibold text-foreground mb-2">{s.label}</div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Customer scenario */}
        <motion.div
          className="max-w-3xl mx-auto mb-12 rounded-2xl p-8 md:p-10 border-l-4"
          style={{
            background: 'hsl(28 45% 48% / 0.06)',
            borderLeftColor: 'hsl(28 45% 48%)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed italic">
            {scenario}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MagneticButton>
            <a
              href="#contact"
              onClick={() => trackCTAClick('market_proof_cta', 'market-proof')}
            >
              <Button className="btn-hero-primary group">
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketProofSection;
