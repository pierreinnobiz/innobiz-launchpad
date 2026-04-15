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
        "Coup de boost respiratoire dès le réveil. L'énergie s'installe avant même le café.",
        "A respiratory boost at dawn. Energy kicks in before the coffee.",
        'Impulso respiratorio al despertar. La energía llega antes que el café.'
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
        "Ambiance apaisante en continu. Le bien-être devient un réflexe, pas un effort.",
        "Continuous calming ambiance. Well-being becomes a reflex, not an effort.",
        'Ambiente relajante continuo. El bienestar se convierte en reflejo, no en esfuerzo.'
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
        "Endormissement naturel en quelques secondes. Le sommeil s'améliore, la routine s'ancre.",
        "Natural sleep onset in seconds. Sleep improves, the routine sticks.",
        'Conciliación natural del sueño en segundos. El sueño mejora, la rutina se consolida.'
      ),
      image: bedroomImg,
      color: 'hsl(260 40% 55%)',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t3(language, 'Fréquence d\'achat ×4', 'Purchase frequency ×4', 'Frecuencia de compra ×4'),
      desc: t3(language,
        "3 moments par jour = 3 flacons qui se vident. Votre client passe de 2 achats par an à 8+.",
        "3 moments per day = 3 bottles emptying. Your customer goes from 2 purchases per year to 8+.",
        '3 momentos al día = 3 frascos que se vacían. Su cliente pasa de 2 compras al año a 8+.'
      ),
    },
    {
      icon: Shield,
      title: t3(language, 'Fidélisation verrouillée', 'Loyalty locked in', 'Fidelización blindada'),
      desc: t3(language,
        "Un diffuseur ancré dans la routine quotidienne devient irremplaçable. Aucun concurrent ne peut s'intercaler.",
        "A diffuser embedded in the daily routine becomes irreplaceable. No competitor can wedge in.",
        'Un difusor integrado en la rutina diaria se vuelve irremplazable. Ningún competidor puede interponerse.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Toute la gamme activée', 'Full range activated', 'Toda la gama activada'),
      desc: t3(language,
        "Changement de flacon en 1 seconde. Chaque référence de votre catalogue trouve sa place dans la journée.",
        "Bottle switch in 1 second. Every SKU in your catalogue finds its moment in the day.",
        'Cambio de frasco en 1 segundo. Cada referencia de su catálogo encuentra su momento en el día.'
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
              <>Tolia change d'huile en 1 seconde, sans nettoyage. Résultat : votre client diffuse chaque jour et <strong className="text-foreground">rachète naturellement</strong>.</>,
              <>Tolia switches oils in 1 second, no cleaning. Result: your customer diffuses daily and <strong className="text-foreground">reorders naturally</strong>.</>,
              <>Tolia cambia de aceite en 1 segundo, sin limpieza. Resultado: su cliente difunde cada día y <strong className="text-foreground">recompra de forma natural</strong>.</>
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
              "Seul Tolia rend cette journée possible. Changement de flacon instantané, zéro nettoyage. L'usage ponctuel devient une habitude quotidienne.",
              "Only Tolia makes this day possible. Instant bottle switch, zero cleaning. Occasional use becomes a daily habit.",
              'Solo Tolia hace posible esta jornada. Cambio de frasco instantáneo, cero limpieza. El uso puntual se convierte en hábito diario.'
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
