import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShoppingCart, AlertTriangle, Archive } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import closetImg from '@/assets/closet-syndrome.jpg';

const steps = [
  {
    icon: ShoppingCart,
    day: 'Day 0',
    title: 'Motivated purchase',
    desc: 'Marketing budget spent. Customer convinced. Impulse supported by campaigns.',
    color: 'hsl(140 45% 45%)',
  },
  {
    icon: AlertTriangle,
    day: 'Day 30–180',
    title: 'Usage friction',
    desc: '5–7 minutes of setup discourages daily use. Frustration builds. Frequency collapses week after week.',
    color: 'hsl(35 70% 50%)',
  },
  {
    icon: Archive,
    day: 'Day 180+',
    title: 'Definitive abandonment',
    desc: 'Diffuser in the closet. Zero new oil purchases. Marketing ROI = one-shot hardware sale.',
    color: 'hsl(0 60% 50%)',
  },
];

const ClosetSyndromeSection: React.FC = () => {
  return (
    <section id="closet-syndrome" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(0 65% 55%), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block text-destructive">
            The invisible revenue leak
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            60% of diffusers sold end up in a closet within 6 months.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            It's not a branding problem. It's a friction problem. And it's quietly killing your oil repurchase revenue.
          </p>
        </motion.div>

        {/* Hero image — abandoned diffusers */}
        <motion.div
          className="max-w-2xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={closetImg}
            alt="Abandoned diffusers collecting dust in a closet — the invisible revenue leak"
            className="w-full h-auto"
            loading="lazy"
            width={1024}
            height={576}
          />
        </motion.div>

        {/* 3-step timeline */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[16.67%] right-[16.67%] h-[2px]"
            style={{ background: 'linear-gradient(90deg, hsl(140 45% 45% / 0.3), hsl(35 70% 50% / 0.3), hsl(0 60% 50% / 0.3))' }} />

          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeBlurUp} className="relative">
              <div className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 h-full
                transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(25_15%_18%/0.12)] hover:-translate-y-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${step.color} / 0.1` }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: step.color }}>
                  {step.day}
                </span>
                <h3 className="font-bold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing callout */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-base md:text-lg leading-relaxed font-semibold text-center text-foreground">
            For essential oil brands, this is the difference between 2–3 bottles sold per customer per year — and 12+.
            The diffuser is not a product you sell once. It's the infrastructure of your recurring revenue.
          </p>
          <p className="text-xs text-center text-muted-foreground mt-4 font-light">
            Source: sector data confirmed by multiple consumer studies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosetSyndromeSection;
