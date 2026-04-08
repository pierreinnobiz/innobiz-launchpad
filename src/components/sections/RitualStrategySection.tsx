import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';

const seasons = [
  { emoji: '🌸', name: 'Spring', morning: 'Energetic Awakening', day: 'Active Focus', evening: 'Light Unwind' },
  { emoji: '☀️', name: 'Summer', morning: 'Morning Freshness', day: 'Luminous Energy', evening: 'Peaceful Night' },
  { emoji: '🍂', name: 'Autumn', morning: 'Gentle Grounding', day: 'Immune Boost', evening: 'Deep Cocooning' },
  { emoji: '❄️', name: 'Winter', morning: 'Tonic Wake-Up', day: 'Natural Defenses', evening: 'Warming Calm' },
];

const moments = ['Morning', 'Day', 'Evening'];

const RitualStrategySection: React.FC = () => {
  return (
    <section id="ritual-strategy" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(35 28% 95%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            The Ritual Strategy — your new growth engine
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Stop selling oils randomly. Create 12 built-in repurchase occasions per year — per customer.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Today, your customer buys essential oils when they remember — maybe 2 or 3 times a year, unpredictably.
            With Tolia's ritual framework, you structure your oil range around <strong className="text-foreground">4 seasons × 3 daily moments</strong>,
            creating 12 clearly identified wellness rituals. Each ritual = one oil synergy sold = one predictable, repeatable purchase.
          </p>
        </motion.div>

        {/* 4×3 Grid — Desktop table */}
        <motion.div
          className="hidden md:block max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
                  <th className="text-left p-4 font-semibold text-foreground w-1/4">Season</th>
                  {moments.map((m) => (
                    <th key={m} className="text-left p-4 font-semibold text-foreground w-1/4">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seasons.map((s, i) => (
                  <tr key={i} className={i < seasons.length - 1 ? 'border-t border-border/40' : 'border-t border-border/40'}>
                    <td className="p-4 font-semibold text-foreground">
                      <span className="mr-2">{s.emoji}</span>{s.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{s.morning}</td>
                    <td className="p-4 text-muted-foreground">{s.day}</td>
                    <td className="p-4 text-muted-foreground">{s.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile stacked cards */}
        <motion.div
          className="md:hidden space-y-4 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {seasons.map((s, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="rounded-2xl p-5 bg-card border border-border/40">
              <h4 className="font-bold text-base mb-3">
                <span className="mr-2">{s.emoji}</span>{s.name}
              </h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {[s.morning, s.day, s.evening].map((ritual, j) => (
                  <div key={j}>
                    <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground block">{moments[j]}</span>
                    <span className="text-foreground/80">{ritual}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Conversion block */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border mb-10"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base md:text-lg leading-relaxed font-medium text-center text-foreground mb-4">
            <strong>12 seasonal rituals = 12 oil purchases per customer per year — mechanical and predictable.</strong>
          </p>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            <strong className="text-foreground">Without Tolia:</strong> 2–3 essential oil bottles purchased per customer per year. Random timing. No loyalty. No predictability.<br />
            <strong className="text-foreground">With Tolia + Ritual Strategy:</strong> 12+ targeted oil synergies per customer per year. Season-driven. Habit-forming. Automatically recurring.<br />
            <strong className="text-foreground">The result: oil consumption multiplied by 4× to 6× — without any increase in marketing spend.</strong>
          </p>
        </motion.div>

        {/* Closing */}
        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          With Tolia, changing essential oils becomes as natural as switching a playlist. Morning energy, afternoon focus, evening calm — your customer builds a daily habit, and your brand captures the revenue that comes with it.
        </motion.p>
      </div>
    </section>
  );
};

export default RitualStrategySection;
