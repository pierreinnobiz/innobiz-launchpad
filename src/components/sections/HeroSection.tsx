import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import { calendlyUrl } from '@/lib/links';

const POSTER = `${import.meta.env.BASE_URL}journee/img/`;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

// Le film dure 41 secondes. Sa dernière image (un Tolia avec sa brume à côté d'un vase) restait figée à l'écran
// une fois le film terminé : on fait maintenant disparaître le film en fondu, il ne reste que le fond sombre.
const FILM_SECONDS = 41;
// Le film commence par un grand titre « Tolia » (vers 3 à 5,5 s) qui passait derrière le titre de la page : on ne montre
// le film qu'à partir de sa 6e seconde ; avant, l'image du produit reste affichée (retour des 5 marques testeuses, 17/10/2026).
const SKIP_INTRO_S = 6;
// Le lecteur envoie « playProgress » (avancement) et « finish » (fin) ; « timeupdate » et « ended » sont les noms de la nouvelle API.
const VIMEO_EVENTS = ['play', 'playing', 'playProgress', 'timeupdate', 'finish', 'ended'];

const HeroVideo: React.FC<{ onStatus?: (playing: boolean, ended: boolean) => void }> = ({ onStatus }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  // Mount the player only after the first paint so it never competes with the
  // hero text (LCP) for bandwidth on mobile connections.
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showAnyway, setShowAnyway] = useState(false);
  const [ended, setEnded] = useState(false);
  const [gone, setGone] = useState(false);
  const [filmSec, setFilmSec] = useState(0);
  const [noEventsLate, setNoEventsLate] = useState(false);

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
          if (typeof d.seconds === 'number') setFilmSec(d.seconds);
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
    // si le lecteur n'envoie jamais l'avancement, on montre le film après l'introduction supposée
    const late = window.setTimeout(() => setNoEventsLate(true), (3 + SKIP_INTRO_S) * 1000);
    return () => { clearTimeout(id); clearTimeout(late); };
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

  const pastIntro = filmSec >= SKIP_INTRO_S || (noEventsLate && filmSec === 0);
  const visible = (playing || showAnyway) && pastIntro && !ended;
  useEffect(() => { onStatus?.(visible, ended); }, [visible, ended, onStatus]);

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
      className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(44px,4.2vw,64px)] font-bold text-white leading-[1.1] tracking-tight"
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
  // voile un peu plus sombre au départ (0,4) : le titre reste lisible quand le film affiche ses propres lettres
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);
  // Image du produit quand le film ne joue pas (téléphone en économie d'énergie, connexion lente, aperçu) ou une fois terminé :
  // les marques testeuses ne voyaient aucun produit dans le premier écran (17/10/2026). Image = fin de 18:30, Tolia fermé avec
  // sa brume (cycle 3 : avec la cloche posée à côté de la base, trois marques ont cru voir un vase).
  const [film, setFilm] = useState({ playing: false, ended: false });
  const [waited, setWaited] = useState(false);
  useEffect(() => { const id = window.setTimeout(() => setWaited(true), 1200); return () => clearTimeout(id); }, []);
  const onFilm = useCallback((playing: boolean, ended: boolean) => setFilm((f) => (f.playing === playing && f.ended === ended ? f : { playing, ended })), []);
  const showPoster = (waited && !film.playing) || film.ended; // « playing » = film réellement visible (après son introduction)
  const posterAlt = t3(
    language,
    'Diffuseur Tolia fermé sur une table de salon : la brume d’huile essentielle sort de la buse, deux flacons attendent à côté avec leur module',
    'Closed Tolia diffuser on a living-room table: essential oil mist leaves the nozzle, two bottles wait beside it with their modules',
    'Difusor Tolia cerrado sobre una mesa de salón: la bruma de aceite esencial sale de la boquilla y dos frascos esperan al lado con su módulo'
  );

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
  // Le sous-titre dit d'abord CE QU'EST Tolia (un diffuseur qui se branche sur les flacons de la marque), puis le bénéfice.
  const subtitle = t3(
    language,
    "Tolia est un diffuseur sans fil qui fonctionne directement avec vos flacons : ni eau, ni nettoyage, une autre huile en une seconde. Si simple qu'il devient un geste quotidien, et vos clients rachètent vos huiles.",
    'Tolia is a cordless diffuser that works straight from your own bottles: no water, no cleaning, a different oil in one second. So simple it becomes a daily habit, and your customers buy your oils again.',
    'Tolia es un difusor inalámbrico que funciona directamente con sus frascos: sin agua, sin limpieza, otro aceite en un segundo. Tan sencillo que se convierte en un hábito diario, y sus clientes vuelven a comprar sus aceites.'
  );
  const microcopy = t3(
    language,
    'Sans engagement · Réponse sous un jour ouvré · Marqué CE, déjà vendu en Europe',
    'No commitment · Reply within one business day · CE-marked, already sold in Europe',
    'Sin compromiso · Respuesta en un día hábil · Marcado CE, ya vendido en Europa'
  );
  const cta = t3(language, 'Recevoir mon échantillon gratuit', 'Get my free sample', 'Recibir mi muestra gratuita');
  // Deuxième porte d'entrée : parler directement à l'équipe (15 minutes en visio, sans formulaire).
  const talk = t3(language, 'Réserver 15 min avec l’équipe', 'Book a 15-min call', 'Reservar 15 min con el equipo');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-wrap relative h-screen w-full overflow-hidden bg-black"
      style={{
        background:
          'radial-gradient(70% 60% at 75% 25%, hsl(28 40% 20% / 0.55) 0%, transparent 70%), linear-gradient(165deg, hsl(25 18% 15%) 0%, hsl(25 20% 7%) 100%)',
      }}
    >
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <HeroVideo onStatus={onFilm} />
      </motion.div>

      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* image du produit (secours du film) : en haut sur téléphone, en bas à droite sur ordinateur */}
      <figure
        aria-hidden={!showPoster}
        className={`hero-poster-m pointer-events-none absolute left-5 right-5 top-[76px] z-[5] m-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/15 transition-opacity duration-700 ${showPoster ? 'opacity-100' : 'opacity-0'}`}
        style={{ aspectRatio: '16 / 10' }}
      >
        <img src={waited ? `${POSTER}hero_ferme.webp` : undefined} loading="lazy" alt={showPoster ? posterAlt : ''} className="h-full w-full object-cover" style={{ objectPosition: '50% 50%' }} decoding="async" />
      </figure>
      <figure
        aria-hidden={!showPoster}
        className={`hero-poster-d pointer-events-none absolute right-[5vw] top-1/2 z-[5] m-0 -translate-y-[42%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15 transition-opacity duration-700 ${showPoster ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: 'min(33vw, 540px)', aspectRatio: '16 / 10' }}
      >
        <img src={waited ? `${POSTER}hero_ferme.webp` : undefined} loading="lazy" alt={showPoster ? posterAlt : ''} className="h-full w-full object-cover" style={{ objectPosition: '50% 50%' }} decoding="async" />
      </figure>

      <div className="hero-content relative z-10 h-full flex flex-col justify-end pb-14 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl space-y-5 lg:max-w-[min(52vw,760px)]">
          {/* « pour les marques » au-dessus du titre, plus visible (retour des marques testeuses) */}
          <motion.span
            className="block text-sm sm:text-base uppercase tracking-[0.14em] text-white/85 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: prefersReducedMotion() ? 0 : 0.1 }}
          >
            {eyebrow}
          </motion.span>

          <AnimatedTitle key={language} text={title} delay={0.3} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion() ? 0 : 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl font-light leading-relaxed">
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
              <a
                href={calendlyUrl('hero')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick(talk, 'hero', 'call_booking')}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {talk}
              </a>
            </div>
            <ul className="mt-3 flex flex-col gap-y-0.5 text-sm text-white/80 font-light sm:flex-row sm:flex-wrap">
              {microcopy.split(' · ').map((m, i) => (
                <li key={m}>
                  {i > 0 && <span aria-hidden="true" className="mx-2 hidden sm:inline">·</span>}
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
