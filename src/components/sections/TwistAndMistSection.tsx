import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Layers, Power, RefreshCw } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import nespressoImg from '@/assets/nespresso-analogy.jpg';

import step1Poster from '@/assets/twist-mist-step1.webp';
import step2Poster from '@/assets/twist-mist-step2.webp';
import step3Poster from '@/assets/twist-mist-step3.webp';
import step4Poster from '@/assets/twist-mist-step4.webp';

const steps = [
  {
    icon: RotateCw,
    title: 'Twist',
    desc: 'Screw the essential oil bottle directly onto the Twist & Mist nebulisation module. That\'s it. No measuring, no filling, no fuss.',
    video: '/videos/twist-step1.mp4',
    poster: step1Poster,
  },
  {
    icon: Layers,
    title: 'Clip',
    desc: 'Insert the module into the Tolia diffuser. The patented system clips in within a second — as simple as placing a cap.',
    video: '/videos/twist-step2.mp4',
    poster: step2Poster,
  },
  {
    icon: Power,
    title: 'Mist',
    desc: 'Press the button. Cold dry-air nebulisation, with no water or heat, preserves 100% of the essential oil\'s active compounds. Pure, immediate diffusion.',
    video: '/videos/twist-step3.mp4',
    poster: step3Poster,
  },
  {
    icon: RefreshCw,
    title: 'Switch',
    desc: 'Switch blends in an instant. Unscrew, screw on another bottle, and you\'re set. Energising morning, relaxing evening — one diffuser, all your oils.',
    video: '/videos/twist-step4.mp4',
    poster: step4Poster,
  },
];

/** Video clip that loops when scrolled into view, pauses when out */
const StepVideo: React.FC<{ src: string; poster: string; alt: string }> = ({ src, poster, alt }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.currentTime = 0;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full aspect-[4/3] object-cover"
      aria-label={alt}
    />
  );
};

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
            A patented capsule system so simple your end-user never thinks about the diffuser — only about the ritual.
          </p>
        </motion.div>

        {/* 4 steps with video */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="bg-card rounded-2xl border border-border/40 overflow-hidden
                transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)] hover:-translate-y-1"
            >
              {/* Video with step badge */}
              <div className="relative">
                <StepVideo src={step.video} poster={step.poster} alt={`Step ${i + 1}: ${step.title}`} />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                  style={{ background: 'hsl(28 45% 48%)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Text content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                    <step.icon className="w-4.5 h-4.5" style={{ color: 'hsl(28 45% 48%)' }} />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Nespresso analogy */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden border-l-4 mb-10"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderLeftColor: 'hsl(28 45% 48%)' }}
          initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 flex-shrink-0">
              <img
                src={nespressoImg}
                alt="Nespresso machine with hundreds of consumed capsules — simplicity drives recurring consumption"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
            </div>
            <div className="p-8 md:p-10 flex items-center md:w-3/5">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                <strong>Tolia is to aromatherapy what Nespresso is to coffee.</strong> Nespresso didn't invent coffee.
                It eliminated friction. Result: coffee consumption multiplied by 3, recurring consumable revenue exploded.
                Tolia applies the same strategy to essential oils. Screw the bottle, press, diffuse.
                Change blend in under a second. The diffuser disappears. The ritual begins.
              </p>
            </div>
          </div>
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
