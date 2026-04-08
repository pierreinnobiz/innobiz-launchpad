import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';

const HeroVideo: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      <img
        src="/images/hero-poster.jpg"
        alt="Tolia premium essential oil diffuser"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: iframeLoaded ? 0 : 1, transition: 'opacity 0.8s ease' }}
        fetchPriority="high"
        width={1920}
        height={1080}
      />
      {!hasError && (
        <iframe
          src="https://player.vimeo.com/video/1181120283?h=43d9f2ae8d&background=1&autoplay=1&loop=1&muted=1&autopause=0&quality=auto"
          className="absolute inset-0 w-full h-full border-0"
          style={{
            transform: 'scale(1.2)',
            transformOrigin: 'center center',
            opacity: iframeLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
          allow="autoplay; fullscreen"
          loading="eager"
          onLoad={() => setIframeLoaded(true)}
          onError={() => setHasError(true)}
          title="Tolia diffuser hero video"
        />
      )}
    </>
  );
};

const AnimatedTitle: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1, y: 0,
              transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const ScrollIndicator: React.FC = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 1 }}
    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
  >
    <motion.div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-white/80"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
    <motion.span
      className="text-xs text-white/40 uppercase tracking-[0.2em] font-light"
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Scroll
    </motion.span>
  </motion.div>
);

const handleCTA = (type: 'white-label' | 'stock', label: string) => {
  trackCTAClick(label, 'hero');
  const url = new URL(window.location.href);
  url.searchParams.set('type', type);
  url.hash = '#contact';
  window.history.replaceState(null, '', url.toString());
  window.dispatchEvent(new Event('tolia:pathchange'));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  const stats = [
    { value: '100K+', label: 'units sold in just 7 months' },
    { value: '×4 to ×6', label: 'more oil purchased per customer' },
    { value: '€22 → €82', label: 'annual margin per customer' },
  ];

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo />
      </motion.div>

      {/* Dynamic overlay */}
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl space-y-6">
          {/* Eyebrow */}
          <motion.span
            className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/60 font-medium block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            For directors of aromatherapy, essential oil &amp; natural wellness brands
          </motion.span>

          {/* Headline */}
          <AnimatedTitle text="Your customers buy a diffuser once — then never reorder oils. Tolia changes that." delay={0.5} />

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The patented Twist &amp; Mist system turns essential oil diffusion into a 10-second daily ritual — so simple that customers use it every day and reorder oils 4× to 6× more often. That's not a promise. It's already measured across 100,000+ units sold.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            className="flex flex-wrap gap-8 md:gap-12 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold text-white">{s.value}</span>
                <span className="text-xs md:text-sm text-white/50 font-light">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Dual CTA */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            <Button
              className="h-12 px-8 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90"
              onClick={() => handleCTA('white-label', 'hero_cta_whitelabel')}
            >
              Launch your white-label program
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 text-sm font-semibold rounded-full border-white/40 text-white hover:bg-white/10 bg-transparent"
              onClick={() => handleCTA('stock', 'hero_cta_stock')}
            >
              Order branded Tolia — from 300 units
            </Button>
          </motion.div>

          {/* Micro-trust line */}
          <motion.p
            className="text-xs text-white/35 font-light pt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            20 years of proprietary diffusion R&D · Designed &amp; assembled in France · Trusted by Pierre Fabre, Puressentiel, Arkopharma, Florame and 30+ industry leaders
          </motion.p>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
