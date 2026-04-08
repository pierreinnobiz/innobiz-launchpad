import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';

const AnimatedStat: React.FC<{ value: string; label: string; desc: string }> = ({ value, label, desc }) => {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = value.match(/[^0-9.]*$/)?.[0] || '';

  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const target = parseFloat(numericPart);
        const duration = 1800;
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = eased * target;

          if (target >= 100) setDisplay(Math.round(current).toLocaleString());
          else if (target >= 10) setDisplay(Math.round(current).toString());
          else setDisplay(current.toFixed(1));

          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(target >= 100 ? target.toLocaleString() : target.toString());
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [numericPart]);

  return (
    <div ref={ref} className="text-center p-8 bg-card rounded-2xl border border-border/40
      transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.15)] hover:-translate-y-1">
      <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'hsl(28 45% 48%)' }}>
        {prefix}{display}{suffix}
      </div>
      <div className="font-semibold text-foreground mb-2">{label}</div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};

const MarketProofSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'Proven in market', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'Already in 100,000+ homes. Already driving 3.8× oil sales.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', "Tolia is not a concept — it's a product your competitors may already be selling.", 'TODO ES');

  const stats = [
    { value: '100K+', label: t3(l, 'TODO FR', 'units sold in 7 months', 'TODO ES'), desc: t3(l, 'TODO FR', 'Market validation, not a beta.', 'TODO ES') },
    { value: '3.8×', label: t3(l, 'TODO FR', 'more oil sales per customer', 'TODO ES'), desc: t3(l, 'TODO FR', 'Measured vs. traditional diffusers in the same category.', 'TODO ES') },
    { value: '75%', label: t3(l, 'TODO FR', 'lower after-sales costs', 'TODO ES'), desc: t3(l, 'TODO FR', 'Vs. ultrasonic, Innobiz field data across 10+ brand deployments.', 'TODO ES') },
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
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

        {/* 3 proof stats with counter animation */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <AnimatedStat {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Customer scenario — with slide-in effect */}
        <motion.div
          className="max-w-3xl mx-auto mb-12 rounded-2xl p-8 md:p-10 border-l-4 relative"
          style={{
            background: 'hsl(28 45% 48% / 0.06)',
            borderLeftColor: 'hsl(28 45% 48%)',
          }}
          initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative quote mark */}
          <span className="absolute top-4 right-6 text-6xl font-serif opacity-[0.08] leading-none" style={{ color: 'hsl(28 45% 48%)' }}>"</span>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed italic relative z-10">
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
            <a href="#contact" onClick={() => trackCTAClick('market_proof_cta', 'market-proof')}>
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
