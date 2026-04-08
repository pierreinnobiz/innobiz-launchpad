import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Flag, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';

const WhyInnobizSection: React.FC = () => {
  const { language: l } = useLanguage();

  const eyebrow = t3(l, 'TODO FR', 'The company behind Tolia', 'TODO ES');
  const headline = t3(l, 'TODO FR', '20 years of French manufacturing for the aromatherapy industry.', 'TODO ES');
  const subheadline = t3(l, 'TODO FR', 'Innobiz has been designing and manufacturing essential oil diffusers since 2005. Tolia is our 7th generation — and our most important innovation.', 'TODO ES');

  const cards = [
    { icon: Calendar, title: t3(l, 'TODO FR', 'Founded 2005', 'TODO ES'), desc: t3(l, 'TODO FR', '20 years of continuous R&D on diffusion technologies.', 'TODO ES') },
    { icon: Shield, title: t3(l, 'TODO FR', 'Patent-owner', 'TODO ES'), desc: t3(l, 'TODO FR', 'Twist & Mist is a fully owned Innobiz patent.', 'TODO ES') },
    { icon: Flag, title: t3(l, 'TODO FR', 'Made in France', 'TODO ES'), desc: t3(l, 'TODO FR', "Design, engineering and final assembly in Innobiz's French facility.", 'TODO ES') },
    { icon: Users, title: t3(l, 'TODO FR', 'Trusted by 30+ brands', 'TODO ES'), desc: t3(l, 'TODO FR', 'Including Pierre Fabre, Puressentiel, Arkopharma and Florame.', 'TODO ES') },
  ];

  return (
    <section id="why-innobiz" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      {/* Ambient glow */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(28 50% 55%), transparent 60%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 text-white relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {headline}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {subheadline}
          </p>
        </motion.div>

        {/* 4 credibility cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {cards.map((c, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={6} glare>
                <div
                  className="rounded-2xl p-6 md:p-8 border text-center h-full
                    transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(28_50%_65%/0.2)]"
                  style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'hsl(28 50% 65% / 0.15)' }}
                  >
                    <c.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{c.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(35 20% 72%)' }}>{c.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyInnobizSection;
