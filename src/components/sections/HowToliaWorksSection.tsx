import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, SlidersHorizontal, Power, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';

const HowToliaWorksSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'The Twist & Mist system', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'One twist. One mist. Every day.', 'TODO ES');
  const subheadline = t3(l, 'Un système breveté conçu pour que vos clients ne pensent plus jamais à leur diffuseur.', 'A patented bottle-based system designed so your end-users never have to think about their diffuser.', 'Un sistema patentado diseñado para que sus clientes nunca más piensen en su difusor.');

  const steps = [
    { num: '01', icon: RotateCw, title: t3(l, 'TODO FR', 'Twist', 'TODO ES'), desc: t3(l, 'TODO FR', 'Screw the bottle onto its diffusion module.', 'TODO ES') },
    { num: '02', icon: SlidersHorizontal, title: t3(l, 'TODO FR', 'Clip', 'TODO ES'), desc: t3(l, 'TODO FR', 'Slide the module into Tolia.', 'TODO ES') },
    { num: '03', icon: Power, title: t3(l, 'TODO FR', 'Press', 'TODO ES'), desc: t3(l, 'TODO FR', 'One touch to start misting.', 'TODO ES') },
    { num: '04', icon: RefreshCw, title: t3(l, 'TODO FR', 'Switch', 'TODO ES'), desc: t3(l, 'TODO FR', 'Change blends in a second. No cleaning.', 'TODO ES') },
  ];

  const closing = t3(l,
    'TODO FR',
    "No water. No cleaning. No measuring. No learning curve. That's why Tolia gets used every single day — and why your oils sell.",
    'TODO ES'
  );

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'hsl(35 30% 96%)' }}>
      {/* Subtle floating orb */}
      <motion.div
        className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(28 45% 48%), transparent 70%)' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {subheadline}
          </p>
        </motion.div>

        {/* 4 steps with connected line */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-[80px] left-[12%] right-[12%] h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(28 45% 48% / 0.2), hsl(28 45% 48% / 0.2), transparent)' }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="text-center p-6 md:p-8 bg-card rounded-2xl border border-border/40 relative group
                transition-all duration-500 hover:shadow-[0_16px_48px_-8px_hsl(28_45%_48%/0.12)] hover:-translate-y-1"
              variants={fadeBlurUp}
            >
              <motion.span
                className="text-3xl font-bold block mb-4"
                style={{ color: 'hsl(28 45% 48% / 0.3)' }}
                whileHover={{ scale: 1.1, color: 'hsl(28 45% 48% / 0.6)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {s.num}
              </motion.span>
              <div
                className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: 'hsl(28 45% 48% / 0.1)' }}
              >
                <s.icon className="w-7 h-7 transition-colors duration-300" style={{ color: 'hsl(28 45% 48%)' }} />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="text-center text-lg md:text-xl font-semibold text-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {closing}
        </motion.p>
      </div>
    </section>
  );
};

export default HowToliaWorksSection;
