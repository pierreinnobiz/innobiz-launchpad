import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import { calendlyUrl } from '@/lib/links';
import heroFilm from '@/assets/hero/tolia-film.mp4';

const POSTER = `${import.meta.env.BASE_URL}journee/img/`;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

// 26/10/2026 : le film est servi par le site lui-même (fichier MP4 de 3,4 Mo, src/assets/hero) au lieu du lecteur Vimeo,
// qui ne montrait le film qu'au bout de 10 à 12 secondes (chargement du lecteur, puis attente de la fin du titre « Tolia »).
// Le fichier commence directement après ce titre (6 premières secondes coupées) : plus rien à attendre.

// Film only on wide screens, without reduced motion and without data saver.
const canPlayHeroFilm = () => {
  if (typeof window === 'undefined') return false;
  if (window.innerWidth < 1024) return false;
  if (prefersReducedMotion()) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData === true) return false;
  return true;
};

const HeroVideo: React.FC<{ onStatus?: (playing: boolean, ended: boolean) => void }> = ({ onStatus }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Mount the player only after the first paint so it never competes with the
  // hero text and image for the first render.
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // No film at all on small screens, reduced motion or data saver: the still image stays.
    if (!canPlayHeroFilm()) return;
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
    // Le film attend le visiteur : en pause dès que le haut de page n'est presque plus visible, il reprend quand on y revient.
    const video = videoRef.current;
    if (!mounted || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (video.ended) return;
        if (entry.intersectionRatio >= 0.35) video.play().catch(() => { /* lecture refusée : l'image reste */ });
        else video.pause();
      },
      { threshold: [0, 0.35] }
    );
    observer.observe(video.parentElement ?? video);
    return () => observer.disconnect();
  }, [mounted]);

  useEffect(() => {
    // Une fois le fondu terminé, on retire complètement le lecteur.
    if (!ended) return;
    const id = window.setTimeout(() => setGone(true), 1800);
    return () => clearTimeout(id);
  }, [ended]);

  const visible = playing && !ended;
  useEffect(() => { onStatus?.(visible, ended); }, [visible, ended, onStatus]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {mounted && !gone && (
        <video
          ref={videoRef}
          src={heroFilm}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.4s ease', pointerEvents: 'none' }}
          muted
          autoPlay
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          onEnded={() => setEnded(true)}
          onError={() => setEnded(true)}
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
    <motion.h2
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
    </motion.h2>
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
  // pas de film sur cet écran (téléphone, tablette, mouvement réduit, économie de données) : l'image s'affiche tout de suite
  const [sansFilm] = useState(() => !canPlayHeroFilm());
  const showPoster = sansFilm || (waited && !film.playing) || film.ended; // « playing » = film réellement visible (après son introduction)
  const posterAlt = t3(
    language,
    'Diffuseur Tolia fermé, posé sur une table en chêne, et deux flacons à côté avec leur module de diffusion vissé',
    'Closed Tolia diffuser on an oak table, with two bottles beside it, their diffusion module screwed on',
    'Difusor Tolia cerrado sobre una mesa de roble, con dos frascos al lado y su módulo de difusión enroscado'
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
    "Tolia est un diffuseur sur batterie qui fonctionne directement avec vos flacons : ni eau, ni nettoyage, une autre huile en une seconde. Si simple qu'on s'en sert chaque jour, et vos clients rachètent vos huiles.",
    'Tolia is a battery-powered diffuser that works straight from your own bottles: no water, no cleaning, a different oil in one second. So simple it becomes a daily habit, and your customers buy your oils again.',
    'Tolia es un difusor con batería que funciona directamente con sus frascos: sin agua, sin limpieza, otro aceite en un segundo. Tan sencillo que se convierte en un hábito diario, y sus clientes vuelven a comprar sus aceites.'
  );
  // 22/10/2026 : le chiffre des 100 000 n'est plus répété ici, le bandeau chiffré juste en dessous le montre déjà (accord de Pierre)
  const microcopy = t3(
    language,
    'Sans engagement · Réponse sous un jour ouvré',
    'No commitment · Reply within one business day',
    'Sin compromiso · Respuesta en un día hábil'
  );
  const cta = t3(language, 'Recevoir mon échantillon gratuit', 'Get my free sample', 'Recibir mi muestra gratuita');
  // Deuxième porte d'entrée : parler directement à l'équipe (30 minutes en visio avec Simon Desbuisson).
  const talk = t3(language, 'Réserver 30 min avec Simon', 'Book 30 min with Simon', 'Reservar 30 min con Simon');

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
        <img src={`${POSTER}hero_ferme_3d.webp`} loading="eager" fetchPriority="high" alt={showPoster ? posterAlt : ''} className="h-full w-full object-cover" style={{ objectPosition: '50% 50%' }} decoding="async" />
      </figure>
      <figure
        aria-hidden={!showPoster}
        className={`hero-poster-d pointer-events-none absolute right-[5vw] top-1/2 z-[5] m-0 -translate-y-[42%] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15 transition-opacity duration-700 ${showPoster ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: 'min(33vw, 540px)', aspectRatio: '16 / 10' }}
      >
        <img src={`${POSTER}hero_ferme_3d.webp`} loading="eager" fetchPriority="high" alt={showPoster ? posterAlt : ''} className="h-full w-full object-cover" style={{ objectPosition: '50% 50%' }} decoding="async" />
      </figure>

      {/* 22/10/2026 (point V2) : texte aligné sur le logo et sur le reste du site (classe hero-align, voir index.css) */}
      <div className="hero-content hero-align relative z-10 h-full flex flex-col justify-end pb-14 md:pb-32">
        <div className="max-w-5xl space-y-5 lg:max-w-[min(46vw,680px)]">
          {/* « pour les marques » au-dessus du titre, plus visible (retour des marques testeuses) */}
          {/* titre principal pour Google : « Diffuseurs d'huiles essentielles pour les marques » (même apparence qu'avant) */}
          <motion.h1
            className="block text-sm sm:text-base uppercase tracking-[0.14em] text-white/85 font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: prefersReducedMotion() ? 0 : 0.1 }}
          >
            {eyebrow}
          </motion.h1>

          <AnimatedTitle key={language} text={title} delay={0.3} />

          {/* 22/10/2026 (point D1) : sous-titre et boutons affichés tout de suite, sans fondu : sur ordinateur, ce texte est le plus
              gros élément du premier écran et son fondu retardé de 1,1 s faisait mesurer 4,4 s à Google (LCP) */}
          <div>
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
                href={calendlyUrl('hero', language)}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
