import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const HeroVideo: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      {/* Static poster – paints instantly for fast LCP */}
      <img
        src="/images/hero-poster.jpg"
        alt="Tolia premium essential oil diffuser"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: iframeLoaded ? 0 : 1, transition: 'opacity 0.8s ease' }}
        fetchPriority="high"
        width={1920}
        height={1080}
      />
      {/* Vimeo iframe loads in parallel, fades in once ready */}
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

// Animated text reveal - word by word (reduced from letter-by-letter for perf)
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
              transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const AnimatedSubtitle: React.FC<{ text: string; delay?: number }> = ({ text, delay = 1.5 }) => (
  <motion.p
    className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {text}
  </motion.p>
);

const ScrollIndicator: React.FC = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.5, duration: 1 }}
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

const HeroSection: React.FC = () => {
  const { language: l } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  const title = t3(l,
    'Transformez vos huiles essentielles en rituel quotidien',
    'Turn your essential oil range into a daily ritual',
    'Convierta su gama de aceites esenciales en un ritual diario'
  );
  const subtitle = t3(l,
    'Vos synergies deviennent un revenu récurrent.',
    'And your blends into recurring revenue.',
    'Y sus sinergias en ingresos recurrentes.'
  );

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video with parallax zoom */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo />
      </motion.div>

      {/* Dynamic overlay */}
      <motion.div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl space-y-6">
          <AnimatedTitle text={title} delay={0.5} />
          <AnimatedSubtitle text={subtitle} delay={1.5} />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
