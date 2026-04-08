import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import MagneticButton from '@/components/MagneticButton';

const AnimatedStat: React.FC<{ value: string; label: string; desc: string }> = ({ value, label, desc }) => {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = value.match(/[0-9.][^0-9]*$/)?.[0]?.replace(/[0-9.]/g, '') || '';

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
  const stats = [
    { value: '100K+', label: 'units sold in 7 months', desc: 'Fastest launch in Innobiz\'s 20-year history.' },
    { value: '3.8×', label: 'oil sales vs. traditional diffusers', desc: 'Measured in the same category.' },
    { value: '100%', label: 'purchase transfer confirmed', desc: 'Customers are abandoning their old diffusers to switch to Twist & Mist.' },
  ];

  return (
    <section id="market-proof" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Proven in market
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            100,000+ units sold in 7 months. Your competitors may already be selling it.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Tolia is not a concept or a Kickstarter. Consumers have already validated the technology with the fastest launch curve in our history.
          </p>
        </motion.div>

        {/* 3 proof stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <AnimatedStat {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The technology shift has already happened on the consumer side. The only question is which brands will capture it.
        </motion.p>

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
                See how this could apply to your brand
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
