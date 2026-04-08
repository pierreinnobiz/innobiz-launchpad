import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

interface TechRow {
  name: string;
  how: string;
  friction: string;
  closet: string;
  isTolia?: boolean;
}

const rows: TechRow[] = [
  {
    name: 'Ultrasonic (water)',
    how: 'Oil diluted in water, vibrated into mist',
    friction: 'Daily cleaning, mold risk, water alters the active compounds',
    closet: 'Used 1–2× per week, then abandoned',
  },
  {
    name: 'Heat diffusion',
    how: 'Oil warmed to release fragrance',
    friction: 'Destroys heat-sensitive therapeutic compounds, weak results',
    closet: 'Disappointment → closet',
  },
  {
    name: 'Passive (reed, stone)',
    how: 'Slow natural evaporation',
    friction: 'No control, weak output, no ritual',
    closet: 'Forgotten on a shelf',
  },
  {
    name: 'Classic nebulizer',
    how: 'High-pressure air through glassware',
    friction: 'Noisy, fragile, high oil waste, complex cleaning',
    closet: 'Gift that ends in a drawer',
  },
  {
    name: 'Tolia Twist & Mist ✅',
    how: 'Sealed bottle + patented cold dry-air nebulization',
    friction: 'None — screw, clip, press. No water, no cleaning, no waste',
    closet: 'Daily gesture, all year long',
    isTolia: true,
  },
];

const FrictionByTechSection: React.FC = () => {
  return (
    <section id="friction-by-tech" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(30 25% 93%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Why every other diffuser ends up in the closet
          </span>
          <h2 className="heading-section mb-4">
            Every diffusion technology forces a compromise. Tolia is the only one that doesn't.
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto">
            Until now, buyers had to choose: silent OR powerful, portable OR effective, flexible OR simple.
            The resulting friction is exactly what kills daily use.
          </p>
        </motion.div>

        {/* Desktop table — 5 rows, 4 columns */}
        <motion.div className="hidden lg:block max-w-6xl mx-auto mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
                  <th className="text-left p-4 font-semibold text-foreground">Technology</th>
                  <th className="text-left p-4 font-semibold text-foreground">How it works</th>
                  <th className="text-left p-4 font-semibold text-foreground">The friction that kills daily use</th>
                  <th className="text-left p-4 font-semibold text-foreground">The closet effect</th>
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
                    whileHover={!row.isTolia ? { backgroundColor: 'hsl(28 45% 48% / 0.03)' } : undefined}
                  >
                    <td className="p-4 align-top font-medium">
                      {row.isTolia ? (
                        <span style={{ color: 'hsl(28 45% 42%)' }}>{row.name}</span>
                      ) : row.name}
                    </td>
                    <td className="p-4 align-top text-muted-foreground">{row.how}</td>
                    <td className="p-4 align-top">
                      {row.isTolia ? (
                        <span className="flex items-center gap-2" style={{ color: 'hsl(140 45% 40%)' }}>
                          <Check className="w-4 h-4 flex-shrink-0" />{row.friction}
                        </span>
                      ) : (
                        <span className="flex items-start gap-2 text-muted-foreground">
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-destructive/60" />{row.friction}
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-top" style={row.isTolia ? { color: 'hsl(28 45% 42%)' } : undefined}>
                      {row.isTolia ? <strong>{row.closet}</strong> : <span className="text-muted-foreground">{row.closet}</span>}
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
              <h3 className={`font-bold text-base mb-3 ${row.isTolia ? '' : ''}`}
                style={row.isTolia ? { color: 'hsl(28 45% 42%)' } : undefined}>{row.name}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-foreground/80">How: </span>
                  <span className="text-muted-foreground">{row.how}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground/80">Friction: </span>
                  <span className={row.isTolia ? '' : 'text-muted-foreground'} style={row.isTolia ? { color: 'hsl(140 45% 40%)' } : undefined}>{row.friction}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground/80">Effect: </span>
                  <span style={row.isTolia ? { color: 'hsl(28 45% 42%)' } : undefined} className={row.isTolia ? 'font-semibold' : 'text-muted-foreground'}>{row.closet}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Takeaway */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <p className="text-base md:text-lg leading-relaxed font-semibold text-center">
            Remove the friction and you remove the closet effect.
            Remove the closet effect and you unlock year-round oil repurchase.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrictionByTechSection;
