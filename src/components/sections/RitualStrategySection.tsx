import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunset, Moon, TrendingUp, Shield, RefreshCw } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import bathroomImg from '@/assets/ritual-bathroom.webp';
import livingRoomImg from '@/assets/ritual-living-room.webp';
import bedroomImg from '@/assets/ritual-bedroom.webp';

const RitualStrategySection: React.FC = () => {
  const { language } = useLanguage();

  const moments = [
    {
      time: t3(language, 'Matin', 'Morning', 'Mañana'),
      icon: Sun,
      room: t3(language, 'Salle de bains', 'Bathroom', 'Baño'),
      blend: t3(language, 'Menthe poivrée + Eucalyptus', 'Peppermint + Eucalyptus', 'Menta + Eucalipto'),
      benefit: t3(language,
        "Commencez la journée avec énergie. Un coup de boost respiratoire pendant la routine matinale.",
        "Start the day energised. A respiratory boost during the morning routine.",
        'Comience el día con energía. Un impulso respiratorio durante la rutina matutina.'
      ),
      image: bathroomImg,
      color: 'hsl(45 80% 55%)',
    },
    {
      time: t3(language, 'Journée', 'Daytime', 'Día'),
      icon: Sunset,
      room: t3(language, 'Salon', 'Living room', 'Salón'),
      blend: t3(language, 'Orange douce + Ylang-ylang', 'Sweet Orange + Ylang-ylang', 'Naranja dulce + Ylang-ylang'),
      benefit: t3(language,
        "Détente et bien-être en continu. L'aromathérapie accompagne les moments de vie.",
        "Continuous relaxation and well-being. Aromatherapy accompanies every moment.",
        'Relajación y bienestar continuo. La aromaterapia acompaña cada momento.'
      ),
      image: livingRoomImg,
      color: 'hsl(25 60% 55%)',
    },
    {
      time: t3(language, 'Soir', 'Evening', 'Noche'),
      icon: Moon,
      room: t3(language, 'Chambre', 'Bedroom', 'Dormitorio'),
      blend: t3(language, 'Lavande + Camomille', 'Lavender + Chamomile', 'Lavanda + Manzanilla'),
      benefit: t3(language,
        "Préparez le sommeil naturellement. Un rituel apaisant qui s'installe en quelques secondes.",
        "Prepare for sleep naturally. A soothing ritual set up in seconds.",
        'Prepárese para dormir de forma natural. Un ritual relajante en segundos.'
      ),
      image: bedroomImg,
      color: 'hsl(260 40% 55%)',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t3(language, 'Fréquence d\'achat multipliée', 'Purchase frequency multiplied', 'Frecuencia de compra multiplicada'),
      desc: t3(language,
        "3 moments par jour = 3 huiles qui se vident régulièrement. Votre client passe de 2 achats par an à 8 ou plus.",
        "3 moments per day = 3 oils being used regularly. Your customer goes from 2 purchases per year to 8 or more.",
        '3 momentos al día = 3 aceites que se usan regularmente. Su cliente pasa de 2 compras al año a 8 o más.'
      ),
    },
    {
      icon: Shield,
      title: t3(language, 'Fidélisation naturelle', 'Natural loyalty', 'Fidelización natural'),
      desc: t3(language,
        "Quand votre diffuseur fait partie de la routine quotidienne, il devient indispensable. Un concurrent ne peut plus s'intercaler.",
        "When your diffuser becomes part of the daily routine, it becomes essential. A competitor cannot insert themselves.",
        'Cuando su difusor se convierte en parte de la rutina diaria, se vuelve indispensable. Un competidor no puede insertarse.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Toute la gamme valorisée', 'Full range monetised', 'Toda la gama valorizada'),
      desc: t3(language,
        "Le changement instantané de flacon permet d'utiliser toute votre gamme avec un seul diffuseur. Chaque référence trouve sa place dans la journée.",
        "Instant bottle switching lets customers use your entire range with one diffuser. Every SKU finds its place in the day.",
        'El cambio instantáneo de frasco permite usar toda su gama con un solo difusor. Cada referencia encuentra su lugar en el día.'
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
              "Matin. Journée. Soir. Trois huiles, trois pièces, un seul diffuseur.",
              "Morning. Daytime. Evening. Three oils, three rooms, one diffuser.",
              'Mañana. Día. Noche. Tres aceites, tres habitaciones, un difusor.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              <>Tolia se déplace de pièce en pièce et change d'huile en 1 seconde. Résultat : votre client utilise ses huiles au quotidien, et <strong className="text-foreground">il en rachète naturellement</strong>.</>,
              <>Tolia moves room to room and switches oils in 1 second. Result: your customer uses their oils daily, and <strong className="text-foreground">they reorder naturally</strong>.</>,
              <>Tolia se mueve de habitación en habitación y cambia de aceite en 1 segundo. Resultado: su cliente usa sus aceites a diario, y <strong className="text-foreground">reordena de forma natural</strong>.</>
            )}
          </p>
        </motion.div>

        {/* 3 moments cards with room images */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {moments.map((moment, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="bg-card rounded-2xl border border-border/40 overflow-hidden
                transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)] hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={moment.image}
                  alt={`${moment.room}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                    <moment.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">{moment.time}</span>
                    <span className="text-white/70 text-xs">{moment.room}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold mb-2" style={{ color: moment.color }}>
                  {moment.blend}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{moment.benefit}</p>
              </div>
            </motion.div>
          ))}
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
              "Seul Tolia rend cette journée possible. Le changement instantané de flacon permet de passer d'une huile à l'autre sans nettoyage, sans manipulation. C'est ce qui transforme un usage ponctuel en habitude quotidienne.",
              "Only Tolia makes this day possible. Instant bottle switching lets the user move from one oil to another with no cleaning, no manipulation. This is what transforms occasional use into a daily habit.",
              'Solo Tolia hace posible esta jornada. El cambio instantáneo de frasco permite pasar de un aceite a otro sin limpieza, sin manipulación. Esto es lo que transforma el uso puntual en un hábito diario.'
            )}
          </p>
        </motion.div>

        {/* Business benefits */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-10"
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
      </div>
    </section>
  );
};

export default RitualStrategySection;
