import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, VolumeX, RefreshCw, Droplets } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';

const cards = [
  {
    icon: BatteryFull,
    title: '8-hour battery autonomy',
    desc: 'True wireless use. Office, bedroom, car, travel — your customer\'s ritual follows them everywhere.',
  },
  {
    icon: VolumeX,
    title: '0 dB measured silence',
    desc: 'Perfect for meditation, deep work, sleep. The diffuser you forget is running.',
  },
  {
    icon: RefreshCw,
    title: 'Twist & Mist modules',
    desc: 'Blend change in under 1 second. No waiting, no cleaning, zero waste of precious oil.',
  },
  {
    icon: Droplets,
    title: 'Pure oil diffusion',
    desc: 'No water, no heat. Maximum therapeutic efficacy. Aromatic properties fully preserved. Visible mist.',
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
            Four innovations in one diffuser
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Every existing diffuser forces a trade-off. Tolia eliminates all four.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Portable but weak. Silent but inefficient. Simple but inflexible. Until now, brands had to pick which compromise
            their customers would live with — and which one would eventually send the diffuser to the closet.
            Tolia is the first diffuser that delivers autonomy, silence, simplicity and pure-oil efficacy in a single device,
            thanks to 20 years of controlled-nebulization R&D by Innobiz.
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
