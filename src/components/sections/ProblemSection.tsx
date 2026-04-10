import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Flame, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';

const ProblemSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'The category problem', 'TODO ES');
  const headline = t3(l, 'TODO FR', 'Most aromatherapy brands sell only 2 to 3 bottles of oil per customer per year.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', "Not because their oils aren't good, but because their diffusers create friction.", 'TODO ES');

  const frictions = [
    {
      icon: Droplets,
      title: t3(l, 'TODO FR', 'Ultrasonic diffusers', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Water, daily cleaning, oil alteration. Result: occasional use only.', 'TODO ES'),
      color: 'hsl(200 60% 50%)',
    },
    {
      icon: Flame,
      title: t3(l, 'TODO FR', 'Heat-based diffusers', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Destroys active compounds. Result: poor experience, low repurchase.', 'TODO ES'),
      color: 'hsl(15 70% 55%)',
    },
    {
      icon: Volume2,
      title: t3(l, 'TODO FR', 'Nebulizers', 'TODO ES'),
      desc: t3(l, 'TODO FR', 'Noisy, fragile, complex. Result: gifts that end up in a drawer.', 'TODO ES'),
      color: 'hsl(270 40% 55%)',
    },
  ];

  const takeaway = t3(l,
    'TODO FR',
    'When the diffuser creates friction, oil consumption collapses, and so does your recurring revenue.',
    'TODO ES'
  );
  const bridge = t3(l, 'TODO FR', "There's a better way.", 'TODO ES');

  return (
    <section id="probleme" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, hsl(0 65% 55%), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Eyebrow + Headline */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block text-destructive">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {subheadline}
          </p>
        </motion.div>

        {/* Friction cards with tilt + stagger */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {frictions.map((f, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={6}>
                <div className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 h-full
                  transition-shadow duration-500 hover:shadow-[0_12px_40px_-8px_hsl(25_15%_18%/0.12)]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300"
                    style={{ background: `${f.color} / 0.1` }}
                  >
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Takeaway with dramatic entrance */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-lg md:text-xl font-semibold text-foreground max-w-3xl mx-auto leading-relaxed">
            {takeaway}
          </p>
          <motion.p
            className="text-2xl md:text-3xl font-light italic text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {bridge}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
