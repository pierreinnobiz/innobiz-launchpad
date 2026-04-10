import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Briefcase, Moon, Coffee, Bath, BedDouble, ArrowRight, TrendingUp, Shield, Users, RefreshCw } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const RitualStrategySection: React.FC = () => {
  const { language } = useLanguage();

  const dayJourney = [
    {
      time: '7:00',
      icon: Sun,
      moment: t3(language, 'Réveil', 'Wake-up', 'Despertar'),
      room: t3(language, 'Chambre', 'Bedroom', 'Dormitorio'),
      blend: t3(language, 'Menthe poivrée + Citron', 'Peppermint + Lemon', 'Menta + Limón'),
      benefit: t3(language, 'Énergie matinale', 'Morning energy', 'Energía matutina'),
      color: 'hsl(45 80% 55%)',
    },
    {
      time: '8:00',
      icon: Coffee,
      moment: t3(language, 'Petit-déjeuner', 'Breakfast', 'Desayuno'),
      room: t3(language, 'Cuisine', 'Kitchen', 'Cocina'),
      blend: t3(language, 'Eucalyptus + Romarin', 'Eucalyptus + Rosemary', 'Eucalipto + Romero'),
      benefit: t3(language, 'Purification air', 'Air purification', 'Purificación del aire'),
      color: 'hsl(140 40% 50%)',
    },
    {
      time: '10:00',
      icon: Briefcase,
      moment: t3(language, 'Travail / Focus', 'Work / Focus', 'Trabajo / Enfoque'),
      room: t3(language, 'Bureau', 'Office', 'Oficina'),
      blend: t3(language, 'Basilic + Laurier', 'Basil + Bay Laurel', 'Albahaca + Laurel'),
      benefit: t3(language, 'Concentration', 'Concentration', 'Concentración'),
      color: 'hsl(210 50% 55%)',
    },
    {
      time: '17:00',
      icon: Bath,
      moment: t3(language, 'Retour à la maison', 'Back home', 'De vuelta a casa'),
      room: t3(language, 'Salon', 'Living room', 'Salón'),
      blend: t3(language, 'Orange douce + Ylang-ylang', 'Sweet Orange + Ylang-ylang', 'Naranja dulce + Ylang-ylang'),
      benefit: t3(language, 'Détente', 'Relaxation', 'Relajación'),
      color: 'hsl(25 60% 55%)',
    },
    {
      time: '21:00',
      icon: Moon,
      moment: t3(language, 'Coucher', 'Bedtime', 'Hora de dormir'),
      room: t3(language, 'Chambre', 'Bedroom', 'Dormitorio'),
      blend: t3(language, 'Lavande + Camomille', 'Lavender + Chamomile', 'Lavanda + Manzanilla'),
      benefit: t3(language, 'Sommeil profond', 'Deep sleep', 'Sueño profundo'),
      color: 'hsl(260 40% 55%)',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t3(language, 'Fréquence d\'achat multipliée', 'Purchase frequency multiplied', 'Frecuencia de compra multiplicada'),
      desc: t3(language,
        "Chaque moment de la journée = une huile différente. 5 occasions quotidiennes = 5 flacons qui se vident, au lieu d'un seul qui reste au placard. Votre client passe de 2-3 achats par an à 12 ou plus.",
        "Each moment of the day = a different oil. 5 daily occasions = 5 bottles being used, instead of one sitting in a cupboard. Your customer goes from 2-3 purchases per year to 12 or more.",
        'Cada momento del día = un aceite diferente. 5 ocasiones diarias = 5 frascos que se usan, en vez de uno en el armario. Su cliente pasa de 2-3 compras al año a 12 o más.'
      ),
    },
    {
      icon: Shield,
      title: t3(language, 'Relation de marque blindée', 'Fortified brand relationship', 'Relación de marca blindada'),
      desc: t3(language,
        "Quand votre client utilise vos huiles 5 fois par jour, vous devenez partie de sa routine. Un concurrent ne peut plus s'intercaler. C'est le même verrouillage que les routines cosmétiques du matin.",
        "When your customer uses your oils 5 times a day, you become part of their routine. A competitor cannot insert themselves. It is the same lock-in effect as morning skincare routines.",
        'Cuando su cliente usa sus aceites 5 veces al día, usted se convierte en parte de su rutina. Un competidor no puede insertarse. Es el mismo efecto de fidelización que las rutinas cosméticas matutinas.'
      ),
    },
    {
      icon: Users,
      title: t3(language, 'Points de contact quotidiens', 'Daily touchpoints', 'Puntos de contacto diarios'),
      desc: t3(language,
        "Chaque utilisation est un point de contact avec votre marque. 5 par jour au lieu de 0. C'est la base d'un programme de contenu, de CRM et de fidélisation véritablement ancré dans le quotidien.",
        "Every use is a touchpoint with your brand. 5 per day instead of 0. This is the foundation for content programs, CRM and loyalty schemes truly embedded in daily life.",
        'Cada uso es un punto de contacto con su marca. 5 por día en vez de 0. Es la base para programas de contenido, CRM y fidelización verdaderamente integrados en la vida diaria.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Valorisation de toute la gamme', 'Full range monetisation', 'Valorización de toda la gama'),
      desc: t3(language,
        "Grâce au changement instantané de flacon, votre client peut utiliser toute votre gamme avec un seul diffuseur. Pas besoin de plusieurs appareils. Chaque référence trouve sa place dans la journée.",
        "Thanks to instant bottle switching, your customer can use your entire range with a single diffuser. No need for multiple devices. Every SKU finds its place in the day.",
        'Gracias al cambio instantáneo de frasco, su cliente puede usar toda su gama con un solo difusor. Sin necesidad de múltiples aparatos. Cada referencia encuentra su lugar en el día.'
      ),
    },
  ];

  return (
    <section id="ritual-strategy" className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(35 28% 95%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'La Stratégie Rituel', 'The Ritual Strategy', 'La Estrategia Ritual')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Un seul Tolia. Cinq moments. Cinq huiles par jour. Le nouveau paradigme de l'aromathérapie.",
              "One Tolia. Five moments. Five oils per day. The new aromatherapy paradigm.",
              'Un Tolia. Cinco momentos. Cinco aceites al día. El nuevo paradigma de la aromaterapia.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              <>L'industrie cosmétique a révolutionné la consommation grâce aux routines quotidiennes : nettoyant, sérum, crème, SPF chaque matin. Le résultat ? Des achats réguliers et prévisibles. <strong className="text-foreground">Tolia permet exactement la même transformation pour l'aromathérapie.</strong> Un seul diffuseur se déplace de pièce en pièce et change d'huile en 1 seconde. Voici la journée type d'un utilisateur Tolia.</>,
              <>The cosmetics industry revolutionised consumption through daily routines: cleanser, serum, moisturiser, SPF every morning. The result? Regular, predictable purchases. <strong className="text-foreground">Tolia enables exactly the same transformation for aromatherapy.</strong> One diffuser moves room to room and switches oils in 1 second. Here is a typical day with Tolia.</>,
              <>La industria cosmética revolucionó el consumo con rutinas diarias: limpiador, sérum, crema, SPF cada mañana. ¿El resultado? Compras regulares y predecibles. <strong className="text-foreground">Tolia permite exactamente la misma transformación para la aromaterapia.</strong> Un difusor se mueve de habitación en habitación y cambia de aceite en 1 segundo. Así es un día típico con Tolia.</>
            )}
          </p>
        </motion.div>

        {/* Daily journey timeline */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[60px] top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, hsl(45 80% 55% / 0.3), hsl(260 40% 55% / 0.3))' }} />

            <div className="space-y-4">
              {dayJourney.map((step, i) => (
                <motion.div key={i} variants={fadeBlurUp}
                  className="flex items-start gap-4 md:gap-6 bg-card rounded-xl p-4 md:p-5 border border-border/40
                    transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className="text-xs font-bold mb-1" style={{ color: step.color }}>{step.time}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${step.color} / 0.12` }}>
                      <step.icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground text-sm">{step.moment}</h4>
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: `${step.color} / 0.1`, color: step.color }}>
                        {step.room}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">{step.blend}</span>
                      {' — '}{step.benefit}
                    </p>
                  </div>
                  {i < dayJourney.length - 1 && (
                    <div className="hidden md:flex items-center text-muted-foreground/30 self-center">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border mb-12"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base md:text-lg leading-relaxed font-semibold text-center text-foreground">
            {t3(language,
              "Seul Tolia rend cette journée possible. Le changement instantané de flacon permet de passer d'une huile à l'autre sans nettoyage, sans manipulation, sans perte de temps. C'est ce qui transforme un usage ponctuel en un rituel quotidien, exactement comme les routines cosmétiques ont transformé la consommation de soins.",
              "Only Tolia makes this day possible. Instant bottle switching lets the user move from one oil to another with no cleaning, no manipulation, no time wasted. This is what transforms occasional use into a daily ritual, exactly the way cosmetics routines transformed skincare consumption.",
              'Solo Tolia hace posible esta jornada. El cambio instantáneo de frasco permite pasar de un aceite a otro sin limpieza, sin manipulación, sin tiempo perdido. Esto es lo que transforma el uso puntual en un ritual diario, exactamente como las rutinas cosméticas transformaron el consumo de cuidados.'
            )}
          </p>
        </motion.div>

        {/* Business benefits */}
        <motion.div
          className="grid sm:grid-cols-2 gap-6 mb-10"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {benefits.map((b, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="p-6 bg-card rounded-2xl border border-border/40 transition-all duration-300 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                <b.icon className="w-5 h-5" style={{ color: 'hsl(28 45% 48%)' }} />
              </div>
              <h4 className="font-bold text-foreground mb-2">{b.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t3(language,
            "Avec Tolia, changer d'huile essentielle devient aussi naturel que changer de playlist. Votre client construit une habitude quotidienne, et votre marque capte le revenu qui va avec.",
            "With Tolia, changing essential oils becomes as natural as switching a playlist. Your customer builds a daily habit, and your brand captures the revenue that comes with it.",
            'Con Tolia, cambiar de aceite esencial se vuelve tan natural como cambiar de playlist. Su cliente construye un hábito diario, y su marca captura los ingresos que vienen con él.'
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default RitualStrategySection;
