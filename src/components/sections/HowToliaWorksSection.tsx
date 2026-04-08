import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, SlidersHorizontal, Power, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const HowToliaWorksSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'The Twist & Mist system', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'One twist. One mist. Every day.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', 'A patented capsule system designed so your end-users never have to think about their diffuser.', 'TODO ES');

  const steps = [
    {
      num: '01',
      icon: RotateCw,
      title: t3(l, 'TODO FR', 'Twist', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Screw the bottle onto its diffusion module.', 'TODO ES'),
    },
    {
      num: '02',
      icon: SlidersHorizontal,
      title: t3(l, 'TODO FR', 'Clip', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Slide the module into Tolia.', 'TODO ES'),
    },
    {
      num: '03',
      icon: Power,
      title: t3(l, 'TODO FR', 'Press', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'One touch to start misting.', 'TODO ES'),
    },
    {
      num: '04',
      icon: RefreshCw,
      title: t3(l, 'TODO FR', 'Switch', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Change blends in a second. No cleaning.', 'TODO ES'),
    },
  ];

  const closing = t3(l,
    'TODO FR',
    "No water. No cleaning. No measuring. No learning curve. That's why Tolia gets used every single day — and why your oils sell.",
    'TODO ES'
  );

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'hsl(35 30% 96%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

        {/* 4 steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="text-center p-6 md:p-8 bg-card rounded-2xl border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-3xl font-bold block mb-4" style={{ color: 'hsl(28 45% 48% / 0.3)' }}>
                {s.num}
              </span>
              <div className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-4" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                <s.icon className="w-7 h-7" style={{ color: 'hsl(28 45% 48%)' }} />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="text-center text-lg md:text-xl font-semibold text-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {closing}
        </motion.p>
      </div>
    </section>
  );
};

export default HowToliaWorksSection;
