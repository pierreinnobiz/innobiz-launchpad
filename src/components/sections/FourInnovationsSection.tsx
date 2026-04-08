import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, VolumeX, RefreshCw, Droplets } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';

const cards = [
  {
    icon: BatteryFull,
    title: '8 hours of wireless autonomy',
    desc: 'Your customer\'s wellness ritual isn\'t tied to a power outlet. Bedroom, office, car, travel — Tolia goes wherever they go. More places = more usage moments = more oil consumed.',
  },
  {
    icon: VolumeX,
    title: 'Absolute silence — 0 dB measured',
    desc: 'No pump, no fan, no vibration. Tolia is the only diffuser quiet enough for meditation, sleep, deep work, and yoga. Silence removes the last reason not to turn it on.',
  },
  {
    icon: RefreshCw,
    title: 'Instant blend switching',
    desc: 'Unscrew one bottle, screw on another — done in under 3 seconds. No cleaning between blends, zero oil wasted. This is what makes multi-blend routines possible — and what drives repeat oil purchases.',
  },
  {
    icon: Droplets,
    title: '100% pure oil, 100% therapeutic efficacy',
    desc: 'Cold dry-air nebulisation preserves every terpene, every active compound. No water dilution, no heat degradation. Your customer gets the full therapeutic benefit — and a visible, satisfying mist.',
  },
];

const FourInnovationsSection: React.FC = () => {
  return (
    <section id="four-innovations" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(33 35% 94%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            Four breakthroughs. Zero compromise.
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Every diffuser on the market forces your customer to accept a trade-off. Tolia is the first that doesn't.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Portable but weak? Silent but inefficient? Simple but inflexible? Until now, your customers had to pick their compromise — and whichever they chose eventually sent the diffuser to the closet.
            Tolia combines wireless autonomy, total silence, instant blend switching, and pure-oil nebulisation into a single device.
            The result of 20 years of controlled-nebulization R&D by Innobiz — and the reason Tolia stays on the nightstand, not in the drawer.
          </p>
        </motion.div>

        {/* 4 cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {cards.map((card, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={5} glare>
                <div className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 h-full text-center
                  transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)]">
                  <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                    <card.icon className="w-7 h-7" style={{ color: 'hsl(28 45% 48%)' }} />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FourInnovationsSection;
