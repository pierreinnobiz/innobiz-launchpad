import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const HeroVideo: React.FC<{ onVideoEnd?: () => void }> = ({ onVideoEnd }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Listen for Vimeo postMessage events to detect video end
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.event === 'finish' || data.method === 'finish') {
          onVideoEnd?.();
        }
      } catch {}
    };
    window.addEventListener('message', handleMessage);

    // Fallback: trigger after estimated video duration (30s)
    const fallback = setTimeout(() => onVideoEnd?.(), 30000);
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(fallback);
    };
  }, [onVideoEnd]);

  return (
    <iframe
      src="https://player.vimeo.com/video/1181120283?h=43d9f2ae8d&background=1&autoplay=1&loop=0&muted=1&autopause=0&quality=auto#t=1s"
      className="absolute inset-0 w-full h-full border-0"
      style={{
        transform: 'scale(1.2)',
        transformOrigin: 'center center',
        opacity: iframeLoaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
      allow="autoplay; fullscreen"
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

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  const title = t3(
    language,
    "Chaque diffuseur vendu est le début d'un revenu récurrent.",
    "Every diffuser sold is the start of recurring revenue.",
    "Cada difusor vendido es el inicio de un ingreso recurrente."
  );
  const eyebrow = t3(
    language,
    "Pour les marques d'aromathérapie, d'huiles essentielles et de bien-être naturel",
    "For aromatherapy, essential oil and natural wellness brands",
    "Para marcas de aromaterapia, aceites esenciales y bienestar natural"
  );
  const subtitle = t3(
    language,
    "Tolia est le seul diffuseur assez simple pour devenir un geste quotidien, déclenchant un réachat d'huiles essentielles prévisible et continu pour votre marque.",
    "Tolia is the only diffuser simple enough to become a daily gesture, unlocking predictable, year-round essential oil repurchase for your brand.",
    "Tolia es el único difusor lo bastante simple para convertirse en un gesto diario, generando una recompra de aceites esenciales predecible y continua para su marca."
  );
  const microcopy = t3(
    language,
    "Sans engagement · Réponse sous 24 heures",
    "No commitment required · Response within 24 hours",
    "Sin compromiso · Respuesta en menos de 24 horas"
  );

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo onVideoEnd={() => setVideoEnded(true)} />
      </motion.div>

      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl space-y-6">
          <AnimatedTitle key={language} text={title} delay={0.3} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={videoEnded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/60 font-medium block mb-4"
            >
              {eyebrow}
            </motion.span>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.p
            className="text-xs text-white/35 font-light pt-1"
            initial={{ opacity: 0 }}
            animate={videoEnded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {microcopy}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
