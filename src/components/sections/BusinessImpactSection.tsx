import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { RefreshCw, Package, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';
import { useEffect, useRef, useState } from 'react';

const AnimatedValue: React.FC<{ value: string; suffix?: string }> = ({ value, suffix = '' }) => {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const prefix = value.replace(/[0-9.+×%]/g, '');
  const hasPlus = value.includes('+');
  const hasTimes = value.includes('×');
  const hasPercent = value.includes('%');

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

          if (target >= 100) {
            setDisplay(Math.round(current).toLocaleString());
          } else {
            setDisplay(current.toFixed(1));
          }

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
    <span ref={ref}>
      {prefix}{display}{hasPlus ? '+' : ''}{hasTimes ? '×' : ''}{hasPercent ? '%' : ''}{suffix}
    </span>
  );
};

const BusinessImpactSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'The business math', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'From a single purchase to 4× more revenue per customer, every year.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', "The real value of a diffuser is not the hardware sale. It is the oil repurchase stream it unlocks, year after year.", 'TODO ES');

  const pillars = [
    {
      icon: RefreshCw,
      title: t3(l, 'TODO FR', 'Recurring oil revenue', 'TODO ES'),
      lines: [
        t3(l, 'TODO FR', 'Traditional diffuser: 2 to 3 bottles per year per customer.', 'TODO ES'),
        t3(l, 'TODO FR', 'Tolia: 12 to 24+ bottles per year per customer.', 'TODO ES'),
        t3(l, 'TODO FR', 'Why: frequency of use drives frequency of repurchase.', 'TODO ES'),
      ],
    },
    {
      icon: Package,
      title: t3(l, 'TODO FR', 'Category simplification', 'TODO ES'),
      lines: [
        t3(l, 'TODO FR', 'One Tolia replaces 3 to 5 diffuser SKUs in your range.', 'TODO ES'),
        t3(l, 'TODO FR', 'Less inventory complexity, more shelf and merchandising space for blends and gift sets.', 'TODO ES'),
      ],
    },
    {
      icon: TrendingUp,
      title: t3(l, 'TODO FR', 'Margin growth per customer', 'TODO ES'),
      lines: [
        t3(l, 'TODO FR', 'From a one-time hardware sale to 4× recurring revenue on consumables, per customer, per year.', 'TODO ES'),
        t3(l, 'TODO FR', '75% lower after-sales costs vs. ultrasonic (Innobiz field data).', 'TODO ES'),
      ],
    },
  ];

  return (
    <section id="impact" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {eyebrow}
          </span>
          <h2 className="heading-section mb-4 text-white">{headline}</h2>
          <p className="text-white/60 leading-relaxed">{subheadline}</p>
        </motion.div>

        {/* 3 Pillar cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={5} glare>
                <div
                  className="rounded-2xl p-8 border h-full transition-all duration-500
                    hover:shadow-[0_0_40px_-8px_hsl(28_50%_65%/0.2)]"
                  style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
                    <p.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
                  </div>
                  <h3 className="font-bold text-lg mb-4">{p.title}</h3>
                  <ul className="space-y-3">
                    {p.lines.map((line, j) => (
                      <li key={j} className="text-sm leading-relaxed" style={{ color: 'hsl(35 20% 72%)' }}>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Before / After visual, animated bars */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-end justify-center gap-12 md:gap-20">
            {/* Before */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 1 }}
            >
              <div
                className="w-16 md:w-20 rounded-lg"
                style={{
                  height: '60px',
                  background: 'hsl(35 20% 72% / 0.3)',
                  border: '1px solid hsl(35 20% 72% / 0.2)',
                }}
              />
              <span className="text-xs md:text-sm font-medium text-white/50 text-center">×1<br />one-time</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              className="flex flex-col items-center gap-1 pb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-white/30 text-xs uppercase tracking-widest">vs.</span>
            </motion.div>

            {/* After : 5 stacked bars with stagger animation */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-1">
                {[1, 2, 3, 4, 5].map((yr) => (
                  <motion.div
                    key={yr}
                    className="w-16 md:w-20 rounded-md"
                    style={{
                      originX: 0,
                      height: '28px',
                      background: `hsl(28 50% ${45 + yr * 4}%)`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + yr * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium text-center" style={{ color: 'hsl(28 50% 65%)' }}>
                ×4 × year<br />after year
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessImpactSection;
