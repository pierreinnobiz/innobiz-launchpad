import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check, X, Minus, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/MagneticButton';
import { trackCTAClick } from '@/lib/tracking';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

interface TechRow {
  name: string;
  how: string;
  limitations: string;
  advantage: string;
  isTolia?: boolean;
}

const TechnologyComparisonSection: React.FC = () => {
  const { language: l } = useLanguage();

  const rows: TechRow[] = [
    {
      name: 'Ultrasonic (water-based)',
      how: 'Dilutes essential oils in water and vibrates them into mist',
      limitations: 'Alters the therapeutic properties of the oils, mold risk, requires daily cleaning',
      advantage: 'Pure cold diffusion, no water, no alteration of active compounds',
    },
    {
      name: 'Heat diffusion',
      how: 'Warms the oil to release fragrance',
      limitations: 'Destroys heat-sensitive active compounds, weak therapeutic value',
      advantage: 'Zero heat : preserves the full integrity of every oil',
    },
    {
      name: 'Passive (reed, stone, ceramic)',
      how: 'Slow natural evaporation',
      limitations: 'Weak output, inconsistent, short range, no control',
      advantage: 'Active, controlled, room-scale diffusion on demand',
    },
    {
      name: 'Classic nebulizer',
      how: 'High-pressure air through glassware',
      limitations: 'Noisy, fragile, high oil consumption, complex cleaning',
      advantage: 'Silent, durable, optimized oil consumption, zero maintenance friction',
    },
    {
      name: 'Tolia',
      how: 'Cold dry-air nebulization with Twist & Mist bottle system',
      limitations: 'None',
      advantage: 'Plug-and-play, 30-second bottle swap, consistent dosage, premium object',
      isTolia: true,
    },
  ];

  const stats = [
    { value: '100K+', label: 'units sold in 7 months' },
    { value: '3.8×', label: 'more sales than conventional diffusers' },
    { value: '24+', label: 'bottles of oil consumed per user per year' },
  ];

  return (
    <section id="technology-comparison" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(30 25% 93%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Technological superiority
          </span>
          <h2 className="heading-section mb-4">
            Tolia vs. every other diffusion technology on the market
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto">
            Aromatherapy brands choose their diffusion technology once. Here's why Tolia is the only one built for frequency of use, and therefore for repeat oil consumption.
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div className="hidden lg:block max-w-6xl mx-auto mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
                  <th className="text-left p-4 font-semibold text-foreground">Technology</th>
                  <th className="text-left p-4 font-semibold text-foreground">How it works</th>
                  <th className="text-left p-4 font-semibold text-foreground">Limitations</th>
                  <th className="text-left p-4 font-semibold text-foreground">Tolia advantage</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={i}
                    className={`border-t border-border/40 ${row.isTolia ? 'font-semibold' : ''}`}
                    style={row.isTolia ? { background: 'hsl(28 45% 48% / 0.06)' } : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ backgroundColor: row.isTolia ? undefined : 'hsl(28 45% 48% / 0.03)' }}
                  >
                    <td className="p-4 align-top font-medium">{row.name}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.how}</td>
                    <td className="p-4 align-top text-muted-foreground">{row.limitations}</td>
                    <td className="p-4 align-top" style={{ color: 'hsl(28 45% 42%)' }}>
                      {row.isTolia ? <strong>{row.advantage}</strong> : row.advantage}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile stacked cards */}
        <motion.div className="lg:hidden space-y-4 mb-12" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl p-6 border ${row.isTolia ? 'ring-2' : 'border-border/50'}`}
              style={row.isTolia
                ? { background: 'hsl(28 45% 48% / 0.08)', borderColor: 'hsl(28 45% 48% / 0.3)' }
                : { background: 'hsl(0 0% 100% / 0.7)' }
              }
              variants={fadeUp}
            >
              <h3 className={`font-bold text-base mb-3 ${row.isTolia ? '' : ''}`}>{row.name}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-foreground/80">How it works: </span>
                  <span className="text-muted-foreground">{row.how}</span>
                </div>
                {row.limitations !== 'None' && (
                  <div>
                    <span className="font-medium text-foreground/80">Limitations: </span>
                    <span className="text-muted-foreground">{row.limitations}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium" style={{ color: 'hsl(28 45% 42%)' }}>Tolia advantage: </span>
                  <span style={{ color: 'hsl(28 45% 42%)' }}>{row.advantage}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key takeaway */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border mb-12"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <p className="text-base md:text-lg leading-relaxed font-medium text-center">
            <strong>Simplicity of use = higher usage frequency = more regular oil consumption = increased repurchase potential for your brand.</strong>
          </p>
        </motion.div>

        {/* Stat strip */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {stats.map((s, i) => (
            <motion.div key={i} className="text-center" variants={fadeUp}>
              <span className="text-3xl md:text-4xl font-bold block mb-1" style={{ color: 'hsl(28 45% 42%)' }}>{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyComparisonSection;
