import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

// Le film dure 41 secondes. Sa dernière image (un Tolia avec sa brume à côté d'un vase) restait figée à l'écran
// une fois le film terminé : on fait maintenant disparaître le film en fondu, il ne reste que le fond sombre.
const FILM_SECONDS = 41;
// Le lecteur envoie « playProgress » (avancement) et « finish » (fin) ; « timeupdate » et « ended » sont les noms de la nouvelle API.
const VIMEO_EVENTS = ['play', 'playing', 'playProgress', 'timeupdate', 'finish', 'ended'];

const HeroVideo: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  // Mount the player only after the first paint so it never competes with the
  // hero text (LCP) for bandwidth on mobile connections.
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showAnyway, setShowAnyway] = useState(false);
  const [ended, setEnded] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Mount right after the first paint: the hero text is already on screen,
    // so the player can start loading immediately without hurting LCP.
    let timer: number | undefined;
    const raf = requestAnimationFrame(() => {
      timer = window.setTimeout(() => setMounted(true), 120);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // The Vimeo player sometimes focuses its own iframe after load, which
    // pulls the viewport back to the hero on deep links like /#contact.
    // Because this is a decorative background video, immediately defocus it and
    // notify the rest of the app so it can restore the anchor position.
    if (!mounted) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    let attempts = 0;
    const maxAttempts = 100;
    const id = setInterval(() => {
      attempts++;
      if (document.activeElement === iframe) {
        iframe.blur();
        window.dispatchEvent(new CustomEvent('tolia:heroiframe:focus'));
      }
      if (attempts >= maxAttempts) {
        clearInterval(id);
      }
    }, 50);
    return () => clearInterval(id);
  }, [mounted]);

  useEffect(() => {
    // Messages du lecteur Vimeo : début de lecture, avancement, fin.
    // Le lecteur n'écoute nos demandes qu'une fois « ready » : c'est à ce moment qu'on s'abonne aux événements.
    const subscribe = () => {
      VIMEO_EVENTS.forEach((ev) => {
        iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value: ev }), '*');
      });
    };
    const handleMessage = (event: MessageEvent) => {
      const frame = iframeRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const name = data?.event || data?.method;
        if (name === 'ready') subscribe();
        if (name === 'play' || name === 'playing') setPlaying(true);
        if (name === 'timeupdate' || name === 'playProgress') {
          setPlaying(true);
          const d = data.data || {};
          if (typeof d.seconds === 'number' && typeof d.duration === 'number' && d.duration > 0 && d.seconds >= d.duration - 0.7) {
            setEnded(true);
          }
        }
        if (name === 'ended' || name === 'finish') setEnded(true);
      } catch { /* message sans rapport avec le lecteur */ }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    // Demande au lecteur de signaler la lecture ; si le lecteur reste muet, on affiche quand même le film.
    if (!iframeLoaded) return;
    const iframe = iframeRef.current;
    VIMEO_EVENTS.forEach((event) => {
      iframe?.contentWindow?.postMessage(JSON.stringify({ method: 'addEventListener', value: event }), '*');
    });
    const id = window.setTimeout(() => setShowAnyway(true), 3000);
    return () => clearTimeout(id);
  }, [iframeLoaded]);

  useEffect(() => {
    // Filets de sécurité si le lecteur n'envoie jamais ses messages de lecture.
    const afterPlay = playing ? window.setTimeout(() => setEnded(true), (FILM_SECONDS + 3) * 1000) : undefined;
    const noPlay = window.setTimeout(() => setEnded(true), (FILM_SECONDS + 12) * 1000);
    return () => {
      if (afterPlay) clearTimeout(afterPlay);
      clearTimeout(noPlay);
    };
  }, [playing]);

  useEffect(() => {
    // Une fois le fondu terminé, on retire complètement le lecteur.
    if (!ended) return;
    const id = window.setTimeout(() => setGone(true), 1800);
    return () => clearTimeout(id);
  }, [ended]);

  const visible = (playing || showAnyway) && !ended;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {mounted && !gone && (
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1181120283?h=43d9f2ae8d&background=1&autoplay=1&loop=0&muted=1&autopause=0&quality=auto#t=1s"
          className="absolute top-1/2 left-1/2 border-0 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'max(100vw, 177.78vh)',
            height: 'max(100vh, 56.25vw)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.4s ease',
            pointerEvents: 'none',
          }}
          allow="autoplay; fullscreen"
          onLoad={() => setIframeLoaded(true)}
          title="Tolia diffuser hero video"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

const AnimatedTitle: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  const [fast] = useState(
    () =>
      prefersReducedMotion() ||
      (typeof window !== 'undefined' && window.innerWidth < 768)
  );
  // On mobile (and with reduced motion) the title paints almost immediately so
  // the LCP is not delayed by the stagger. Same visual language, shorter timing.
  const stagger = fast ? 0.03 : 0.12;
  const delayChildren = fast ? 0 : delay;

  return (
    <motion.h1
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            className="inline-block mr-[0.3em]"
            variants={{
              hidden: { opacity: 0, y: fast ? 8 : 30 },
              visible: {
                opacity: 1, y: 0,
                transition: { duration: fast ? 0.25 : 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="text-[0px]"> </span>}
        </React.Fragment>
      ))}
    </motion.h1>
  );
};


const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
    'Every diffuser sold is the start of recurring revenue.',
    'Cada difusor vendido es el inicio de un ingreso recurrente.'
  );
  const eyebrow = t3(
    language,
    "Diffuseurs d'huiles essentielles pour les marques",
    'Essential oil diffusers for brands',
    'Difusores de aceites esenciales para marcas'
  );
  const subtitle = t3(
    language,
    "Tolia est assez simple pour devenir un geste quotidien : vos clients diffusent plus, et rachètent vos huiles.",
    'Tolia is simple enough to become a daily gesture: your customers diffuse more, and reorder your oils.',
    'Tolia es tan sencillo que se convierte en un gesto diario: sus clientes difunden más y vuelven a comprar sus aceites.'
  );
  const microcopy = t3(
    language,
    'Sans engagement · Réponse sous 24 heures',
    'No commitment · Reply within 24 hours',
    'Sin compromiso · Respuesta en 24 horas'
  );
  const cta = t3(language, 'Recevez votre échantillon gratuit', 'Get your free sample', 'Reciba su muestra gratuita');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{
        background:
          'radial-gradient(70% 60% at 75% 25%, hsl(28 40% 20% / 0.55) 0%, transparent 70%), linear-gradient(165deg, hsl(25 18% 15%) 0%, hsl(25 20% 7%) 100%)',
      }}
    >
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo />
      </motion.div>

      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl space-y-6">
          <AnimatedTitle key={language} text={title} delay={0.3} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion() ? 0 : 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white/70 font-medium block mb-4">
              {eyebrow}
            </span>

            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
              {subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                onClick={() => trackCTAClick(cta, 'hero', 'sample_hero')}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm sm:text-base font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-xs text-white/75 font-light">{microcopy}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
