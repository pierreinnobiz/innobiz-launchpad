import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { RotateCw, Layers, Power, RefreshCw } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';
import nespressoImg from '@/assets/nespresso-analogy.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

import step1Poster from '@/assets/twist-mist-step1.webp';
import step2Poster from '@/assets/twist-mist-step2.webp';
import step3Poster from '@/assets/twist-mist-step3.webp';
import step4Poster from '@/assets/twist-mist-step4.webp';

const StepVideo: React.FC<{
  src: string;
  poster: string;
  alt: string;
  shouldPlay: boolean;
  onEnded: () => void;
}> = ({ src, poster, alt, shouldPlay, onEnded }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  // Sequential auto-play
  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldPlay || hasPlayed.current) return;
    hasPlayed.current = true;
    el.currentTime = 0;
    el.play().catch(() => {});
    const handler = () => onEnded();
    el.addEventListener('ended', handler, { once: true });
    return () => el.removeEventListener('ended', handler);
  }, [shouldPlay, onEnded]);

  // Hover replay
  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el || !hasPlayed.current) return;
    setIsHovering(true);
    el.currentTime = 0;
    el.play().catch(() => {});
    const handler = () => {
      el.pause();
      setIsHovering(false);
    };
    el.addEventListener('ended', handler, { once: true });
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      className="w-full aspect-[4/3] object-cover cursor-pointer"
      aria-label={alt}
      onMouseEnter={handleMouseEnter}
    />
  );
};

const TwistAndMistSection: React.FC = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [currentStep, setCurrentStep] = useState(-1);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (isInView && currentStep === -1) {
      setCurrentStep(0);
    }
  }, [isInView, currentStep]);

  const handleStepEnded = useCallback((index: number) => {
    if (index < 3) {
      setTimeout(() => setCurrentStep(index + 1), 1000);
    } else {
      setAllDone(true);
    }
  }, []);

  const steps = [
    {
      icon: RotateCw,
      title: t3(language, 'Vissez', 'Twist', 'Enrosque'),
      desc: t3(language,
        "Le flacon d'huile essentielle se visse directement sur le module Twist & Mist. Zéro manipulation : pas de mesure, pas de remplissage, pas de gouttes. Le flacon devient la cartouche. Prêt en 2 secondes. C'est cette simplicité qui transforme un achat ponctuel en geste quotidien.",
        "The essential oil bottle screws directly onto the Twist & Mist module. Zero handling: no measuring, no filling, no drops. The bottle becomes the cartridge. Ready in 2 seconds. This simplicity is what turns a one-time purchase into a daily habit.",
        'El frasco de aceite esencial se enrosca directamente en el módulo Twist & Mist. Cero manipulación: sin medir, sin llenar, sin gotas. El frasco se convierte en el cartucho. Listo en 2 segundos. Esta simplicidad es lo que convierte una compra puntual en un gesto diario.'
      ),
      video: '/videos/twist-step1.mp4',
      poster: step1Poster,
    },
    {
      icon: Layers,
      title: t3(language, 'Clipsez', 'Clip', 'Enganche'),
      desc: t3(language,
        "Un clic. Le module se fixe dans le diffuseur Tolia aussi naturellement qu'un téléphone sur son chargeur. Aucune notice nécessaire : votre client comprend le geste dès la première utilisation.",
        "One click. The module locks into the Tolia diffuser as naturally as a phone on its charger. No manual needed: your customer gets it from the very first use.",
        'Un clic. El módulo se fija en el difusor Tolia tan naturalmente como un teléfono en su cargador. Sin manual necesario: su cliente lo entiende desde el primer uso.'
      ),
      video: '/videos/twist-step2.mp4',
      poster: step2Poster,
    },
    {
      icon: Power,
      title: t3(language, 'Diffusez', 'Mist', 'Difunda'),
      desc: t3(language,
        "Un appui. La nébulisation à air froid sec démarre instantanément. Aucune chaleur, aucune eau : 100 % des terpènes et composés actifs préservés. Votre client perçoit la différence dès la première brume.",
        "One press. Cold dry-air nebulisation starts instantly. No heat, no water: 100% of terpenes and active compounds preserved. Your customer feels the difference from the very first mist.",
        'Un toque. La nebulización de aire frío seco comienza al instante. Sin calor, sin agua: 100 % de los terpenos y compuestos activos preservados. Su cliente percibe la diferencia desde la primera bruma.'
      ),
      video: '/videos/twist-step3.mp4',
      poster: step3Poster,
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Changez', 'Switch', 'Cambie'),
      desc: t3(language,
        "Dévissez, vissez un autre flacon : 3 secondes. Pas de nettoyage, zéro huile perdue. Un diffuseur, des rituels illimités. C'est ce mécanisme qui multiplie la consommation d'huiles par 4 à 6.",
        "Unscrew, screw on another bottle: 3 seconds. No cleaning, zero oil wasted. One diffuser, unlimited rituals. This mechanism is what multiplies oil consumption by 4 to 6.",
        'Desenrosque, enrosque otro frasco: 3 segundos. Sin limpieza, cero aceite desperdiciado. Un difusor, rituales ilimitados. Este mecanismo es lo que multiplica el consumo de aceites por 4 a 6.'
      ),
      video: '/videos/twist-step4.mp4',
      poster: step4Poster,
    },
  ];

  return (
    <section id="twist-and-mist" className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Le système Twist & Mist', 'The Twist & Mist system', 'El sistema Twist & Mist')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Vissez. Diffusez. C'est tout.",
              "Twist. Mist. Done.",
              'Enrosque. Difunda. Listo.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              <>Twist & Mist compresse tout le rituel de la diffusion traditionnelle en un geste unique de 10 secondes. Le diffuseur disparaît de l'esprit de votre client. Seul reste le choix de l'huile. Et <strong className="text-foreground">c'est précisément à ce moment que le rachat devient automatique</strong>.</>,
              <>Twist & Mist compresses the entire ritual of traditional diffusion into a single 10-second gesture. The diffuser vanishes from your customer's mind. Only the choice of oil remains. And <strong className="text-foreground">that is precisely when repurchase becomes automatic</strong>.</>,
              <>Twist & Mist comprime todo el ritual de la difusión tradicional en un solo gesto de 10 segundos. El difusor desaparece de la mente de su cliente. Solo queda la elección del aceite. Y <strong className="text-foreground">es precisamente en ese momento cuando la recompra se vuelve automática</strong>.</>
            )}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border/40 overflow-hidden
                transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)] hover:-translate-y-1"
            >
              <div className="relative">
                <StepVideo
                  src={step.video}
                  poster={step.poster}
                  alt={`${t3(language, 'Étape', 'Step', 'Paso')} ${i + 1}: ${step.title}`}
                  shouldPlay={currentStep === i}
                  onEnded={() => handleStepEnded(i)}
                />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                  style={{ background: 'hsl(28 45% 48%)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
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
        </div>

        {/* Nespresso analogy */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden border-l-4 mb-8"
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
                alt={t3(language,
                  "Machine Nespresso illustrant comment la simplicité génère la consommation récurrente",
                  'Nespresso machine illustrating how simplicity drives recurring consumption',
                  'Máquina Nespresso ilustrando cómo la simplicidad impulsa el consumo recurrente'
                )}
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
            </div>
            <div className="p-6 md:p-8 flex items-center md:w-3/5">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                {t3(language,
                  <>
                    <strong>Tolia est à l'aromathérapie ce que Nespresso a été au café.</strong> Nespresso n'a pas inventé le café, il a supprimé la friction entre le désir et la tasse. Résultat : une capsule par jour, un revenu récurrent prévisible. Tolia reproduit ce modèle pour les huiles essentielles. Vissez, appuyez, diffusez. Changez de synergie en 1 seconde. La simplicité crée l'habitude, l'habitude crée le rachat.
                  </>,
                  <>
                    <strong>Tolia is to aromatherapy what Nespresso was to coffee.</strong> Nespresso did not invent coffee, it removed the friction between desire and the cup. Result: one capsule a day, predictable recurring revenue. Tolia replicates this model for essential oils. Screw, press, diffuse. Switch blends in 1 second. Simplicity creates the habit, and the habit creates the repurchase.
                  </>,
                  <>
                    <strong>Tolia es a la aromaterapia lo que Nespresso fue al café.</strong> Nespresso no inventó el café, eliminó la fricción entre el deseo y la taza. Resultado: una cápsula al día, ingresos recurrentes predecibles. Tolia replica este modelo para los aceites esenciales. Enrosque, presione, difunda. Cambie de mezcla en 1 segundo. La simplicidad crea el hábito, y el hábito crea la recompra.
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t3(language,
            "Zéro eau. Zéro nettoyage. Zéro mesure. Zéro excuse pour ne pas diffuser. Voilà pourquoi les clients Tolia consomment 4 à 6 fois plus d'huiles que la moyenne du marché.",
            "Zero water. Zero cleaning. Zero measuring. Zero excuses not to diffuse. That is why Tolia customers consume 4 to 6 times more oil than the market average.",
            'Cero agua. Cero limpieza. Cero medición. Cero excusas para no difundir. Por eso los clientes Tolia consumen de 4 a 6 veces más aceite que el promedio del mercado.'
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default TwistAndMistSection;
