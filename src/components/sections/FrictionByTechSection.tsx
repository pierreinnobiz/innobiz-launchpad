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
    name: 'Ultrasonic (water-based)',
    how: 'Essential oil diluted in water, vibrated into cool mist',
    friction: 'Requires daily tank filling and cleaning. Water breeds mold and bacteria. Dilution weakens aromatic compounds by up to 80%.',
    closet: 'Used 1–2× per week → abandoned within 3 months',
  },
  {
    name: 'Heat diffusion',
    how: 'Oil heated on a plate or in a lamp to release fragrance',
    friction: 'Heat above 40°C destroys sensitive terpenes and therapeutic molecules. Output is weak, unpredictable, and short-lived.',
    closet: 'Customer disappointment → closet within weeks',
  },
  {
    name: 'Passive (reed sticks, stone)',
    how: 'Oil slowly evaporates through natural capillary action',
    friction: 'No intensity control, negligible output in rooms over 10m². No engagement, no ritual possible.',
    closet: 'Becomes invisible decoration → never triggers oil reorders',
  },
  {
    name: 'Classic nebulizer (glass)',
    how: 'Compressed air pushes oil through a glass venturi',
    friction: 'Loud pump noise (45–60 dB), fragile glassware, oil waste up to 40%. Complex disassembly for cleaning between each blend.',
    closet: 'Impressive gift → drawer within 6 months',
  },
  {
    name: 'Tolia — Twist & Mist ✅',
    how: 'Sealed bottle screws directly into patented cold dry-air nebulization module',
    friction: 'Zero friction — screw the bottle, clip in, press the button. No water, no cleaning, no waste, no noise.',
    closet: 'Daily ritual, 365 days a year — measured and proven',
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
            The root cause — technology
          </span>
          <h2 className="heading-section mb-4">
            It's not your marketing. It's the diffuser. Every existing technology creates a friction that kills daily use.
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto">
            Your customer wants to diffuse essential oils every day. But every diffuser on the market forces them to choose:
            silent <em>or</em> powerful? Portable <em>or</em> effective? Simple <em>or</em> flexible?
            That forced compromise is the reason 60% of diffusers end up unused. Until Tolia.
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
            The equation is simple: remove the friction → remove the closet effect → unlock year-round oil repurchase.
            That's exactly what Twist & Mist does — and why brands using Tolia see oil consumption multiply by 4× to 6×.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrictionByTechSection;
