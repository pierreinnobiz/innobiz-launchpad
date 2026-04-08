import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShoppingCart, AlertTriangle, Archive } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import closetImg from '@/assets/closet-syndrome.jpg';

const steps = [
  {
    icon: ShoppingCart,
    day: 'Day 0',
    title: 'The excited purchase',
    desc: 'Your customer sees the ad, walks into the store, and buys the diffuser. You invested in campaigns, packaging, shelf space. The sale is made — but it\'s the last time this customer will generate meaningful revenue.',
    color: 'hsl(140 45% 45%)',
  },
  {
    icon: AlertTriangle,
    day: 'Day 30–180',
    title: 'The friction wall',
    desc: 'Fill the tank, add drops, clean after each use, wait for evaporation. What should be a 10-second moment becomes a 5–7 minute chore. Usage drops from daily to weekly, then monthly. The oil bottles sit untouched.',
    color: 'hsl(35 70% 50%)',
  },
  {
    icon: Archive,
    day: 'Day 180+',
    title: 'The closet. Permanently.',
    desc: 'The diffuser joins the appliance graveyard. No more oil purchases. No refills. No brand relationship. Your entire marketing investment produced exactly one hardware sale — and zero recurring revenue.',
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
            The problem no one talks about
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            You spend thousands acquiring a customer. Six months later, their diffuser is in a closet — and they never buy oils again.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            This isn't a branding failure or a marketing mistake. It's a product design problem. Every conventional diffuser creates friction that kills daily use — and with it, your recurring oil revenue.
          </p>
        </motion.div>

        {/* Hero image — abandoned diffusers */}
        <motion.div
          className="max-w-xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-lg"
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
            Here's the math that matters: with a traditional diffuser, the average customer buys 2–3 bottles of essential oil per year.
            With a diffuser they actually use every day, that number jumps to 12+. That's the difference between €46 and €164 in annual revenue — per customer.
          </p>
          <p className="text-xs text-center text-muted-foreground mt-4 font-light">
            Based on real sales data from 10+ brand deployments across European markets.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosetSyndromeSection;
