import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Layers, Power, RefreshCw } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';

const steps = [
  { icon: RotateCw, title: 'Twist', desc: 'Screw the essential oil bottle onto its Twist & Mist module.' },
  { icon: Layers, title: 'Clip', desc: 'Slide the module into Tolia in under a second.' },
  { icon: Power, title: 'Press', desc: 'One touch, cold dry-air diffusion begins instantly.' },
  { icon: RefreshCw, title: 'Switch', desc: 'Change blends in less than a second, no cleaning, no waste.' },
];

const TwistAndMistSection: React.FC = () => {
  return (
    <section id="twist-and-mist" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            The Twist & Mist system
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            One twist. One mist. Every single day.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            A patented system so simple your end-user never thinks about the diffuser — only about the ritual.
          </p>
        </motion.div>

        {/* 4 steps */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 text-center
                transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)] hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                <step.icon className="w-7 h-7" style={{ color: 'hsl(28 45% 48%)' }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: 'hsl(28 45% 48%)' }}>
                Step {i + 1}
              </span>
              <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Nespresso analogy */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-8 md:p-10 border-l-4 mb-10"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderLeftColor: 'hsl(28 45% 48%)' }}
          initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            <strong>Tolia is to aromatherapy what Nespresso is to coffee.</strong> Nespresso didn't invent coffee.
            It eliminated friction. Result: coffee consumption multiplied by 3, recurring consumable revenue exploded.
            Tolia applies the same strategy to essential oils. Screw the bottle, press, diffuse.
            Change blend in under a second. The diffuser disappears. The ritual begins.
          </p>
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          No water. No cleaning. No measuring. No learning curve. That's why Tolia gets used every single day — and why your oils finally sell on a recurring basis.
        </motion.p>
      </div>
    </section>
  );
};

export default TwistAndMistSection;
