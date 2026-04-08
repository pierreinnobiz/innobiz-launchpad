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
    { value: '100K+', label: 'units sold in just 7 months', desc: 'The fastest product launch in Innobiz\'s 20-year history. Consumer demand validated at scale.' },
    { value: '3.8×', label: 'more essential oils sold per customer', desc: 'Measured head-to-head vs. traditional diffusers within the same brand and retail channel.' },
    { value: '100%', label: 'purchase transfer from old diffusers', desc: 'Customers are actively abandoning their previous diffusers to switch to Twist & Mist — permanently.' },
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
            Not a prototype. Not a concept. Proven at scale.
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            100,000+ units already in consumers' hands — and your competitors may already be selling it.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Tolia isn't a crowdfunding campaign or a lab experiment. It's a market-validated product with the fastest adoption curve Innobiz has ever seen. The technology shift has already happened on the consumer side. The only question left is: will your brand capture it — or watch competitors do it first?
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
          The consumer shift to frictionless diffusion is already happening. Brands that move now will own the category. Those that wait will be catching up.
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
