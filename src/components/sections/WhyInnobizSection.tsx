import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Volume2, Crosshair, Cpu, Calendar, Shield, Flag, Wrench } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';

const disciplines = [
  { icon: Microscope, title: 'Microfluidic mastery', desc: 'Every liquid diffused perfectly, from thick oils to light fragrances.' },
  { icon: Volume2, title: 'Silent ultrasonics', desc: 'Perfect mist, no noise, no heat, no premature wear.' },
  { icon: Crosshair, title: 'Precision laser engineering', desc: 'Diffusion validated on 500+ cycles without obstruction.' },
  { icon: Cpu, title: 'Smart embedded electronics', desc: 'Millimetric control, high autonomy, minimal energy use.' },
];

const chips = [
  { icon: Calendar, label: 'Founded 2005', desc: '20 years of continuous diffusion R&D' },
  { icon: Shield, label: 'Patent owner', desc: 'Twist & Mist is a fully owned Innobiz patent' },
  { icon: Flag, label: 'Made in France', desc: 'Design, engineering, final assembly in our French facility' },
  { icon: Wrench, label: 'Repairable by design', desc: 'Replaceable battery and modular parts → aligns with your RSE commitments' },
];

const WhyInnobizSection: React.FC = () => {
  return (
    <section id="why-innobiz" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
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
          className="text-center mb-16 max-w-4xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            The company behind Tolia
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            20 years of French R&D — and the only company in the world mastering all 4 disciplines of perfect diffusion.
          </h2>
          <p className="text-white/60 leading-relaxed">
            Innobiz has been designing and manufacturing essential oil diffusers since 2005.
            Tolia is our 7th generation and our most strategic innovation — built on a technological moat no competitor has crossed.
          </p>
        </motion.div>

        {/* 4 discipline cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {disciplines.map((d, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={6} glare>
                <div
                  className="rounded-2xl p-6 md:p-8 border text-center h-full
                    transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(28_50%_65%/0.2)]"
                  style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
                    <d.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{d.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(35 20% 72%)' }}>{d.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Callout */}
        <motion.div
          className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 text-center mb-12"
          style={{ background: 'hsl(28 50% 65% / 0.1)', border: '1px solid hsl(28 50% 65% / 0.2)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base md:text-lg font-semibold text-white">
            This unique combination is a technological lead that is structurally impossible for competitors to catch up with.
          </p>
        </motion.div>

        {/* 4 credibility chips */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {chips.map((c, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: 'hsl(0 0% 100% / 0.04)' }}
            >
              <c.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(28 50% 65%)' }} />
              <div>
                <span className="font-semibold text-sm text-white block">{c.label}</span>
                <span className="text-xs" style={{ color: 'hsl(35 20% 65%)' }}>{c.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyInnobizSection;
