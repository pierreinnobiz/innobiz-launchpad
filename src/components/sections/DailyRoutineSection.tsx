import React, { useRef, useEffect, useState } from 'react';
import twistStep1 from '@/assets/twist-mist-step1.webp';
import twistStep2 from '@/assets/twist-mist-step2.webp';
import twistStep3 from '@/assets/twist-mist-step3.webp';
import twistStep4 from '@/assets/twist-mist-step4.webp';
import toliaSdbRoutine from '@/assets/tolia-sdb-routine.webp';
import toliaLivingRoom from '@/assets/tolia-living-room.webp';
import toliaChambreRoutine from '@/assets/tolia-chambre-routine.webp';
import { motion } from 'framer-motion';

/** Short video clip that plays once when scrolled into view, with a poster fallback */
const ScrollVideo: React.FC<{ src: string; poster: string; alt: string }> = ({ src, poster, alt }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          video.play().catch(() => {});
          setHasPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      aria-label={alt}
    />
  );
};
import { Sun, Cloud, Moon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

const DailyRoutineSection: React.FC = () => {
  const { language: l } = useLanguage();

  const moments = [
    {
      icon: Sun,
      title: t3(l, "Matin : Salle de bains", "Morning, Bathroom", "Mañana, Baño"),
      text: t3(l,
        "Le matin, Tolia est posé dans la salle de bains, près du miroir. En un geste, votre client clipse une synergie énergisante, appuie sur le bouton et profite d'une diffusion courte pendant sa routine (douche, brossage de dents, préparation). Ce geste répétitif installe une association claire : \"je commence ma journée avec ma synergie\", sans eau, sans dosage, sans préparation.",
        "In the morning, Tolia sits in the bathroom, near the mirror. With a single gesture, your customer clips in an energising blend, presses the button and enjoys a short diffusion during their routine (shower, brushing teeth, getting ready). This repeated action creates a clear association: 'I start my day with my blend'. No water, no measuring, no preparation.",
        "Por la mañana, Tolia se coloca en el baño, cerca del espejo. Con un solo gesto, su cliente engancha una sinergia energizante, pulsa el botón y disfruta de una difusión corta durante su rutina (ducha, cepillado de dientes, preparación). Este gesto repetitivo crea una asociación clara: \"empiezo mi día con mi sinergia\", sin agua, sin dosificación, sin preparación."
      ),
      accent: 'hsl(40 60% 55%)',
      image: toliaSdbRoutine,
      imageAlt: t3(l, "Tolia dans une salle de bains", "Tolia in a bathroom", "Tolia en un baño"),
    },
    {
      icon: Cloud,
      title: t3(l, "Journée : Salon ou espace de vie", "Daytime, Living room or workspace", "Día, Salón o espacio de vida"),
      text: t3(l,
        "Une fois la matinée lancée, Tolia migre dans le salon ou l'espace de vie. Le consommateur retire la synergie du matin et clipse une synergie composée d'huiles essentielles de citron et d'orange pour transformer la pièce en jardin lumineux. Que l'on travaille depuis la maison ou que l'on reçoive, la diffusion se déclenche en une seconde, sans eau ni nettoyage, et devient un fond olfactif naturel, facile à réactiver tous les jours.",
        "Once the morning is underway, Tolia moves to the living room or workspace. The consumer removes the morning blend and clips in a lemon-and-orange essential oil blend to transform the room into a bright, fragrant space. Whether working from home or hosting guests, diffusion starts in a second, with no water or cleaning, becoming a natural olfactory backdrop that's easy to reactivate every day.",
        "Una vez iniciada la mañana, Tolia se traslada al salón o espacio de vida. El consumidor retira la sinergia matutina y engancha una sinergia de aceites esenciales de limón y naranja para transformar la habitación en un espacio luminoso y perfumado. Ya sea trabajando desde casa o recibiendo invitados, la difusión se activa en un segundo, sin agua ni limpieza, convirtiéndose en un fondo olfativo natural, fácil de reactivar cada día."
      ),
      accent: 'hsl(28 45% 48%)',
      image: toliaLivingRoom,
      imageAlt: t3(l, "Tolia dans un salon", "Tolia in a living room", "Tolia en un salón"),
    },
    {
      icon: Moon,
      title: t3(l, "Soir : Chambre", "Evening, Bedroom", "Noche, Dormitorio"),
      text: t3(l,
        "Le soir, Tolia accompagne votre client dans la chambre. Il clipse une synergie dédiée au sommeil, lance une diffusion douce et répétée avant le coucher. Ce geste se répète soir après soir, jusqu'à devenir une routine d'endormissement aussi ancrée que fermer les volets. L'aromathérapie n'est plus un \"plus\", elle devient un automatisme.",
        "In the evening, Tolia accompanies your customer to the bedroom. They clip in a sleep-dedicated blend and start a gentle, repeated diffusion before bedtime. This ritual repeats night after night, until it becomes a bedtime routine as ingrained as closing the shutters. Aromatherapy is no longer an 'extra', it becomes second nature.",
        "Por la noche, Tolia acompaña a su cliente al dormitorio. Engancha una sinergia dedicada al sueño, inicia una difusión suave y repetida antes de acostarse. Este gesto se repite noche tras noche, hasta convertirse en una rutina de sueño tan arraigada como cerrar las persianas. La aromaterapia ya no es un \"extra\", se convierte en un automatismo."
      ),
      accent: 'hsl(250 30% 55%)',
      image: toliaChambreRoutine,
      imageAlt: t3(l, "Tolia dans une chambre", "Tolia in a bedroom", "Tolia en un dormitorio"),
    },
  ];

  const twistMistSteps = [
    {
      image: twistStep1,
      video: '/videos/twist-step1.mp4',
      number: '01',
      title: t3(l, 'Twist', 'Twist', 'Twist'),
      desc: t3(l,
        'Vissez le flacon d\'huile essentielle directement sur le module de nébulisation Twist & Mist. C\'est tout. Pas de dosage, pas de remplissage, pas de manipulation.',
        'Screw the essential oil bottle directly onto the Twist & Mist nebulisation module. That\'s it. No measuring, no filling, no fuss.',
        'Enrosque el frasco de aceite esencial directamente en el módulo de nebulización Twist & Mist. Eso es todo. Sin dosificación, sin rellenar, sin complicaciones.'
      ),
    },
    {
      image: twistStep2,
      video: '/videos/twist-step2.mp4',
      number: '02',
      title: t3(l, 'Clip', 'Clip', 'Clip'),
      desc: t3(l,
        'Insérez le module dans le diffuseur Tolia. Le système breveté se clipse en une seconde. Un geste aussi simple que poser un bouchon.',
        'Insert the module into the Tolia diffuser. The patented system clips in within a second, as simple as placing a cap.',
        'Inserte el módulo en el difusor Tolia. El sistema patentado se engancha en un segundo, tan simple como colocar una tapa.'
      ),
    },
    {
      image: twistStep3,
      video: '/videos/twist-step3.mp4',
      number: '03',
      title: t3(l, 'Mist', 'Mist', 'Mist'),
      desc: t3(l,
        'Appuyez sur le bouton. La nébulisation à sec, sans eau ni chaleur, préserve 100 % des actifs de l\'huile essentielle. Diffusion pure et immédiate.',
        'Press the button. Cold dry-air nebulisation, with no water or heat, preserves 100% of the essential oil\'s active compounds. Pure, immediate diffusion.',
        'Pulse el botón. La nebulización en seco, sin agua ni calor, preserva el 100 % de los activos del aceite esencial. Difusión pura e inmediata.'
      ),
    },
    {
      image: twistStep4,
      video: '/videos/twist-step4.mp4',
      number: '04',
      title: t3(l, 'Switch', 'Switch', 'Switch'),
      desc: t3(l,
        'Changez de synergie en un instant. Dévissez, revissez un autre flacon, et c\'est reparti. Matin énergisant, soir relaxant. Un diffuseur, toutes vos huiles.',
        'Switch blends in an instant. Unscrew, screw on another bottle, and you\'re set. Energising morning, relaxing evening, one diffuser, all your oils.',
        'Cambie de sinergia en un instante. Desenrosque, enrosque otro frasco, y listo. Mañana energizante, noche relajante. Un difusor, todos sus aceites.'
      ),
    },
  ];

  return (
    <section id="journee" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(30 40% 94%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Usage concret : pièce par pièce', 'Real-world usage, room by room', 'Uso concreto, habitación por habitación')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Une journée type avec Tolia chez vos clients', 'A typical day with Tolia in your customers\' homes', 'Un día típico con Tolia en el hogar de sus clientes')}
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            {t3(l,
              'Vos clients n\'achètent pas une technologie : ils cherchent des moments de bien-être naturel, simples à intégrer dans leur vie. Tolia a été conçu pour suivre ces moments, de la salle de bains au salon puis à la chambre, et pour rendre l\'aromathérapie aussi intuitive que d\'allumer la lumière.',
              'Your customers don\'t buy a technology: they seek moments of natural well-being that are easy to fit into their lives. Tolia was designed to follow those moments, from the bathroom to the living room and then the bedroom, making aromatherapy as intuitive as switching on a light.',
              'Sus clientes no compran una tecnología: buscan momentos de bienestar natural, fáciles de integrar en su vida. Tolia fue diseñado para seguir esos momentos, del baño al salón y luego al dormitorio, haciendo la aromaterapia tan intuitiva como encender una luz.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {moments.map((m, i) => (
            <TiltCard key={i} className="rounded-3xl">
              <motion.div className="bg-card rounded-3xl p-8 border border-border/50 transition-all duration-300 h-full" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="rounded-2xl overflow-hidden mb-5 aspect-[16/9]">
                  <img src={m.image} alt={m.imageAlt} className="w-full h-full object-cover no-select" draggable={false} loading="lazy" decoding="async" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${m.accent} / 0.12` }}>
                    <m.icon className="w-5 h-5" style={{ color: m.accent }} />
                  </div>
                  <h3 className="text-lg font-bold">{m.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Twist & Mist Explainer */}
        <motion.div className="max-w-5xl mx-auto mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="text-center mb-10">
            <span className="font-semibold text-sm tracking-wide uppercase mb-3 block" style={{ color: 'hsl(28 45% 48%)' }}>
              {t3(l, 'Technologie brevetée', 'Patented technology', 'Tecnología patentada')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {t3(l, 'Twist & Mist. Le geste qui change tout', 'Twist & Mist. The gesture that changes everything', 'Twist & Mist, El gesto que lo cambia todo')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t3(l,
                'Quatre gestes, zéro complexité. C\'est la raison pour laquelle vos clients utiliseront Tolia chaque jour, et rachèteront vos huiles.',
                'Four steps, zero complexity. This is why your customers will use Tolia every day, and repurchase your oils.',
                'Cuatro pasos, cero complejidad. Esta es la razón por la que sus clientes usarán Tolia cada día, y recomprarán sus aceites.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {twistMistSteps.map((step, i) => (
              <motion.div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ScrollVideo
                    src={step.video}
                    poster={step.image}
                    alt={`${step.title} : Twist & Mist step ${step.number}`}
                  />
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold tracking-wider" style={{ color: 'hsl(28 45% 48%)' }}>{step.number}</span>
                    <h4 className="text-base md:text-lg font-bold">{step.title}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className="rounded-3xl p-8 md:p-10 border max-w-5xl mx-auto" style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            {t3(l,
              <>En permettant à vos clients de déplacer Tolia et de changer de synergie en une seconde selon la pièce et le moment de la journée, vous multipliez les occasions d'usage sans ajouter de complexité. Ce sont ces usages répétés, matin, journée, soir, qui, au fil des semaines, <strong className="text-foreground">augmentent naturellement la consommation d'huiles essentielles</strong> et la fidélité à votre marque.</>,
              <>By enabling your customers to move Tolia and switch blends in a second depending on the room and the time of day, you multiply usage occasions without adding complexity. It is these repeated uses, morning, daytime, evening, that, week after week, <strong className="text-foreground">naturally increase essential oil consumption</strong> and loyalty to your brand.</>,
              <>Al permitir a sus clientes mover Tolia y cambiar de sinergia en un segundo según la habitación y el momento del día, multiplica las ocasiones de uso sin añadir complejidad. Son estos usos repetidos, mañana, día, noche, los que, semana tras semana, <strong className="text-foreground">aumentan naturalmente el consumo de aceites esenciales</strong> y la fidelidad a su marca.</>
            )}
          </p>
        </motion.div>

        <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(t3(l, 'Découvrir les routines en détail', 'Discover routines in detail', 'Descubrir las rutinas en detalle'), 'daily-routine')}>
              <Button className="btn-hero-primary group">
                {t3(l, 'Découvrir les routines en détail', 'Discover routines in detail', 'Descubrir las rutinas en detalle')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyRoutineSection;
