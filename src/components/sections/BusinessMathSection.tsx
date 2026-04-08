import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';

const AnimatedValue: React.FC<{ value: string }> = ({ value }) => {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = value.match(/[0-9.][^0-9]*$/)?.[0]?.replace(/[0-9.]/g, '') || '';

  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const target = parseFloat(numericPart);
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          setDisplay(target >= 100 ? Math.round(current).toLocaleString() : current.toFixed(0));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(target >= 100 ? target.toLocaleString() : target.toString());
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [numericPart]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const traditionalBullets = [
  'Diffuser sold once → all your marketing investment produces a single transaction',
  'Customer buys 2 essential oil bottles, then stops — the diffuser is too complex to use daily',
  'To acquire the next customer → reinvest the full marketing budget from scratch',
  'No recurring relationship, no loyalty loop, no predictable revenue',
];

const toliaBullets = [
  'Diffuser sold once — but usage starts immediately and continues daily',
  '12+ Twist & Mist oil synergies purchased per year through ritualized daily use',
  '4 seasonal gift sets per year create natural upsell moments',
  'Customer relationship becomes permanent = mechanical, predictable recurring revenue',
];

const BusinessMathSection: React.FC = () => {
  return (
    <section id="business-math" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      {/* Ambient glow */}
      <motion.div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(28 50% 55%), transparent 60%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="section-container text-white relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            The financial case — in black and white
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            A traditional diffuser generates €22 of margin — once. Tolia generates €82 — every single year, per customer.
          </h2>
          <p className="text-white/60 leading-relaxed">
            The real profitability of a diffuser isn't in the hardware sale. It's in the oil repurchase stream that follows — year after year, automatically.
            Here's what changes when your diffuser is actually used every day.
          </p>
        </motion.div>

        {/* Side-by-side cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Traditional */}
          <motion.div variants={fadeBlurUp}
            className="rounded-2xl p-8 border h-full"
            style={{ background: 'hsl(0 0% 100% / 0.04)', borderColor: 'hsl(0 0% 100% / 0.1)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-destructive/20">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-bold text-lg text-white">Traditional diffusers</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {traditionalBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/60">
                  <span className="text-destructive/60 mt-0.5">—</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="rounded-xl p-4 text-center" style={{ background: 'hsl(0 0% 100% / 0.05)' }}>
              <span className="text-3xl font-bold text-white/40">€<AnimatedValue value="22" /></span>
              <span className="text-sm text-white/30 block mt-1">gross margin — one time only</span>
            </div>
          </motion.div>

          {/* Tolia */}
          <motion.div variants={fadeBlurUp}
            className="rounded-2xl p-8 border h-full"
            style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.2)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(140 45% 45% / 0.2)' }}>
                <Check className="w-5 h-5" style={{ color: 'hsl(140 45% 55%)' }} />
              </div>
              <h3 className="font-bold text-lg text-white">Tolia + Ritual Strategy</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {toliaBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'hsl(35 20% 80%)' }}>
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'hsl(140 45% 55%)' }} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="rounded-xl p-4 text-center" style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
              <span className="text-3xl font-bold" style={{ color: 'hsl(28 50% 65%)' }}>€<AnimatedValue value="82" /></span>
              <span className="text-sm block mt-1" style={{ color: 'hsl(28 50% 65% / 0.7)' }}>gross margin — recurring every year</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero callout */}
        <motion.div
          className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 text-center"
          style={{ background: 'hsl(28 50% 65% / 0.1)', border: '1px solid hsl(28 50% 65% / 0.2)' }}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            €22 once → €82 every year = your margin multiplied by 4×, compounding year after year.
          </p>
          <p className="text-xs text-white/40">
            Plus 75% lower after-sales costs compared to ultrasonic diffusers (measured across 10+ brand deployments by Innobiz).
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessMathSection;
