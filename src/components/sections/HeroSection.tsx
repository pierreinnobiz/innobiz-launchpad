import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { trackCTAClick } from '@/lib/tracking';

const HeroVideo: React.FC = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIframe(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showIframe) return null;

  return (
    <iframe
      src="https://player.vimeo.com/video/1181120283?h=43d9f2ae8d&background=1&autoplay=1&loop=1&muted=1&autopause=0&quality=auto#t=1s"
      className="absolute inset-0 w-full h-full border-0"
      style={{
        transform: 'scale(1.2)',
        transformOrigin: 'center center',
        opacity: iframeLoaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
      allow="autoplay; fullscreen"
      loading="lazy"
      onLoad={() => setIframeLoaded(true)}
      title="Tolia diffuser hero video"
    />
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

const brandLogos = [
  { src: '/logos/pierre-fabre.svg', alt: 'Pierre Fabre' },
  { src: '/logos/puressentiel.svg', alt: 'Puressentiel' },
  { src: '/logos/arkopharma.svg', alt: 'Arkopharma' },
  { src: '/logos/florame.svg', alt: 'Florame' },
  { src: '/logos/nature-et-decouvertes.svg', alt: 'Nature & Découvertes' },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo />
      </motion.div>

      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl space-y-6">
          <motion.span
            className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/60 font-medium block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            For aromatherapy, essential oil and natural wellness brands
          </motion.span>

          <AnimatedTitle
            text="Turn your diffuser from a one-time sale into a recurring revenue stream."
            delay={0.5}
          />

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Tolia is the only diffuser simple enough to become a daily gesture — unlocking predictable, year-round essential oil repurchase for your brand.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <a href="#contact" onClick={() => trackCTAClick('hero_primary_cta', 'hero')}>
              <Button className="h-12 px-8 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 group">
                Request your free evaluation kit
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
            <a
              href="#contact"
              onClick={() => {
                trackCTAClick('hero_secondary_cta', 'hero');
                const url = new URL(window.location.href);
                url.searchParams.set('type', 'stock');
                url.hash = '#contact';
                window.history.replaceState(null, '', url.toString());
                window.dispatchEvent(new Event('tolia:pathchange'));
              }}
              className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
            >
              Or get a custom quote for 300+ units →
            </a>
          </motion.div>

          <motion.p
            className="text-xs text-white/35 font-light pt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.1 }}
          >
            No commitment required · Response within 24 hours
          </motion.p>

          {/* Mini logo strip */}
          <motion.div
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            <span className="text-xs text-white/35 font-light whitespace-nowrap">Trusted by 30+ leading brands</span>
            <div className="flex items-center gap-4">
              {brandLogos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-5 md:h-6 opacity-40 brightness-0 invert"
                  loading="lazy"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
