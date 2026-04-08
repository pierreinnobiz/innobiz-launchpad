import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Package, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const BusinessImpactSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'The business math', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'From €22 one-time to €82 recurring — every year, per customer.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', "The real value of a diffuser isn't the hardware margin. It's the oil repurchase stream it unlocks.", 'TODO ES');

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
        t3(l, 'TODO FR', 'From a one-time €22 hardware margin to €82/year recurring margin on consumables.', 'TODO ES'),
        t3(l, 'TODO FR', '75% lower after-sales costs vs. ultrasonic (Innobiz field data).', 'TODO ES'),
      ],
    },
  ];

  return (
    <section id="impact" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      <div className="section-container text-white">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {eyebrow}
          </span>
          <h2 className="heading-section mb-4 text-white">{headline}</h2>
          <p className="text-white/60 leading-relaxed">{subheadline}</p>
        </motion.div>

        {/* 3 Pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-8 border h-full"
              style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
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
            </motion.div>
          ))}
        </div>

        {/* Before / After visual */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-end justify-center gap-12 md:gap-20">
            {/* Before */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-16 md:w-20 rounded-lg"
                style={{
                  height: '60px',
                  background: 'hsl(35 20% 72% / 0.3)',
                  border: '1px solid hsl(35 20% 72% / 0.2)',
                }}
              />
              <span className="text-xs md:text-sm font-medium text-white/50 text-center">€22<br />one-time</span>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 pb-8">
              <span className="text-white/30 text-xs uppercase tracking-widest">vs.</span>
            </div>

            {/* After — 5 stacked bars representing 5 years */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-1">
                {[1, 2, 3, 4, 5].map((yr) => (
                  <div
                    key={yr}
                    className="w-16 md:w-20 rounded-md"
                    style={{
                      height: '28px',
                      background: `hsl(28 50% ${45 + yr * 4}%)`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium text-center" style={{ color: 'hsl(28 50% 65%)' }}>
                €82 × year<br />after year
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessImpactSection;
