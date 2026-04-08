import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Layers, Power, RefreshCw } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import nespressoImg from '@/assets/nespresso-analogy.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

import step1Poster from '@/assets/twist-mist-step1.webp';
import step2Poster from '@/assets/twist-mist-step2.webp';
import step3Poster from '@/assets/twist-mist-step3.webp';
import step4Poster from '@/assets/twist-mist-step4.webp';

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
  const { language } = useLanguage();

  const steps = [
    {
      icon: RotateCw,
      title: t3(language, 'Vissez', 'Twist', 'Enrosque'),
      desc: t3(language,
        "Votre client visse son flacon d'huile essentielle directement sur le module de nébulisation Twist & Mist. Pas de mesure, pas de remplissage, pas de gouttes à compter. Le flacon devient la cartouche — prêt en 2 secondes.",
        "Your customer screws their essential oil bottle directly onto the Twist & Mist nebulisation module. No measuring, no filling, no drops to count. The bottle becomes the cartridge — ready in 2 seconds.",
        'Su cliente enrosca su frasco de aceite esencial directamente en el módulo de nebulización Twist & Mist. Sin medir, sin llenar, sin gotas que contar. El frasco se convierte en el cartucho — listo en 2 segundos.'
      ),
      video: '/videos/twist-step1.mp4',
      poster: step1Poster,
    },
    {
      icon: Layers,
      title: t3(language, 'Clipsez', 'Clip', 'Enganche'),
      desc: t3(language,
        "Le module se clipse dans le diffuseur Tolia d'un simple clic — aussi intuitif que poser un téléphone sur son chargeur. Pas d'alignement, pas de force, pas de notice nécessaire.",
        "The module clips into the Tolia diffuser with a single click — as intuitive as placing a phone on its charger. No alignment, no force, no instructions needed.",
        'El módulo se engancha en el difusor Tolia con un solo clic — tan intuitivo como colocar un teléfono en su cargador. Sin alineación, sin fuerza, sin instrucciones necesarias.'
      ),
      video: '/videos/twist-step2.mp4',
      poster: step2Poster,
    },
    {
      icon: Power,
      title: t3(language, 'Diffusez', 'Mist', 'Difunda'),
      desc: t3(language,
        "Un appui. La nébulisation à air froid sec démarre instantanément — sans eau, sans chaleur. 100 % des composés thérapeutiques de l'huile essentielle sont préservés et diffusés sous forme de brume pure et visible. C'est la diffusion de qualité pharmaceutique rendue simple.",
        "One press. Cold dry-air nebulisation begins instantly — no water, no heat. 100% of the essential oil's therapeutic compounds are preserved and diffused as a pure, visible mist. This is pharmaceutical-grade diffusion made effortless.",
        'Un toque. La nebulización de aire frío seco comienza al instante — sin agua, sin calor. El 100 % de los compuestos terapéuticos del aceite esencial se preservan y difunden como una niebla pura y visible. Es difusión de grado farmacéutico hecha sin esfuerzo.'
      ),
      video: '/videos/twist-step3.mp4',
      poster: step3Poster,
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Changez', 'Switch', 'Cambie'),
      desc: t3(language,
        "Changer de synergie prend moins de 3 secondes : dévissez, vissez un autre flacon, c'est fait. Menthe poivrée énergisante le matin, lavande apaisante le soir — un seul diffuseur, des rituels illimités, zéro nettoyage entre les synergies.",
        "Changing blends takes under 3 seconds: unscrew, screw on another bottle, done. Energising peppermint in the morning, calming lavender at night — one diffuser, unlimited rituals, zero cleaning between blends.",
        'Cambiar de mezcla toma menos de 3 segundos: desenrosque, enrosque otro frasco, listo. Menta energizante por la mañana, lavanda calmante por la noche — un difusor, rituales ilimitados, cero limpieza entre mezclas.'
      ),
      video: '/videos/twist-step4.mp4',
      poster: step4Poster,
    },
  ];

  return (
    <section id="twist-and-mist" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Le système Twist & Mist — breveté', 'The Twist & Mist system — patented', 'El sistema Twist & Mist — patentado')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Un geste. Une brume. Chaque jour. Voici exactement comment ça fonctionne.",
              "One twist. One mist. Every single day. Here's exactly how it works.",
              'Un giro. Una niebla. Cada día. Así es exactamente cómo funciona.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              <>Twist & Mist remplace tout le rituel de la diffusion traditionnelle — remplissage, nettoyage, dosage — par un seul geste de 10 secondes. Le résultat ? Votre client ne pense plus au diffuseur. Il pense juste à quelle huile utiliser aujourd'hui. Et <strong className="text-foreground">c'est là qu'il commence à recommander</strong>.</>,
              <>Twist & Mist replaces the entire ritual of traditional diffusion — filling, cleaning, measuring — with a single 10-second gesture. The result? Your customer doesn't think about the diffuser anymore. They just think about which oil to use today. And <strong className="text-foreground">that's when they start reordering</strong>.</>,
              <>Twist & Mist reemplaza todo el ritual de la difusión tradicional — llenado, limpieza, medición — con un solo gesto de 10 segundos. ¿El resultado? Su cliente ya no piensa en el difusor. Solo piensa en qué aceite usar hoy. Y <strong className="text-foreground">ahí es cuando empieza a reordenar</strong>.</>
            )}
          </p>
        </motion.div>

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
              <div className="relative">
                <StepVideo src={step.video} poster={step.poster} alt={`${t3(language, 'Étape', 'Step', 'Paso')} ${i + 1}: ${step.title}`} />
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
                alt={t3(language,
                  "Machine Nespresso avec des centaines de capsules consommées — la simplicité génère la consommation récurrente",
                  'Nespresso machine with hundreds of consumed capsules — simplicity drives recurring consumption',
                  'Máquina Nespresso con cientos de cápsulas consumidas — la simplicidad impulsa el consumo recurrente'
                )}
                className="w-full h-full object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
            </div>
            <div className="p-8 md:p-10 flex items-center md:w-3/5">
               <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                 {t3(language,
                   <>
                     <strong>Tolia est à l'aromathérapie ce que Nespresso a été au café.</strong> Nespresso n'a pas inventé le café —
                     il a supprimé chaque point de friction entre le désir et la consommation. Le résultat ? La consommation de café a triplé.
                     Le revenu des capsules est devenu 10× supérieur au revenu de la machine. Tolia applique exactement la même stratégie aux huiles essentielles :
                     vissez le flacon, appuyez sur le bouton, diffusez. Changez de synergie en 3 secondes. La complexité disparaît.
                     Le rituel quotidien commence. Et à chaque rituel, votre client achète plus d'huile.
                   </>,
                   <>
                     <strong>Tolia is to aromatherapy what Nespresso was to coffee.</strong> Nespresso didn't invent coffee —
                     it removed every friction point between desire and consumption. The result? Coffee consumption tripled.
                     Capsule revenue became 10× the machine revenue. Tolia applies exactly the same strategy to essential oils:
                     screw the bottle, press the button, diffuse. Change blends in 3 seconds. The complexity disappears.
                     The daily ritual begins. And with every ritual, your customer buys more oil.
                   </>,
                   <>
                     <strong>Tolia es a la aromaterapia lo que Nespresso fue al café.</strong> Nespresso no inventó el café —
                     eliminó cada punto de fricción entre el deseo y el consumo. ¿El resultado? El consumo de café se triplicó.
                     Los ingresos de cápsulas se convirtieron en 10× los ingresos de la máquina. Tolia aplica exactamente la misma estrategia a los aceites esenciales:
                     enrosque el frasco, presione el botón, difunda. Cambie de mezcla en 3 segundos. La complejidad desaparece.
                     El ritual diario comienza. Y con cada ritual, su cliente compra más aceite.
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
            "Pas d'eau à remplir. Pas de réservoir à nettoyer. Pas de gouttes à mesurer. Pas de notice à lire. C'est pourquoi Tolia est utilisé chaque jour — et pourquoi, pour la première fois, vos huiles essentielles se vendent sur une base véritablement récurrente.",
            "No water to fill. No tank to clean. No drops to measure. No instructions to read. That's why Tolia gets used every single day — and why, for the first time, your essential oils sell on a truly recurring basis.",
            'Sin agua que llenar. Sin depósito que limpiar. Sin gotas que medir. Sin instrucciones que leer. Por eso Tolia se usa cada día — y por qué, por primera vez, sus aceites esenciales se venden de forma verdaderamente recurrente.'
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default TwistAndMistSection;
