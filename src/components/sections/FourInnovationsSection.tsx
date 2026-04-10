import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, VolumeX, RefreshCw, Droplets, FlaskConical, Gauge } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const FourInnovationsSection: React.FC = () => {
  const { language } = useLanguage();

  const cards = [
    {
      icon: FlaskConical,
      title: t3(language, 'Compatibilité universelle : une première mondiale', 'Universal compatibility: a world first', 'Compatibilidad universal: una primicia mundial'),
      desc: t3(language,
        "Tolia est le seul diffuseur capable de nébuliser des huiles essentielles, des synergies, des hydrolats et des parfums d'intérieur. Testé et validé sur des centaines de formulations. Un seul appareil pour couvrir 100 % de votre gamme.",
        "Tolia is the only diffuser capable of nebulising essential oils, blends, hydrosols, and home fragrances. Tested and validated on hundreds of formulations. One device to cover 100% of your range.",
        'Tolia es el único difusor capaz de nebulizar aceites esenciales, mezclas, hidrolatos y fragancias para el hogar. Probado y validado en cientos de formulaciones. Un dispositivo para cubrir el 100 % de su gama.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Changement de flacon en 1 seconde', '1-second bottle switch', 'Cambio de frasco en 1 segundo'),
      desc: t3(language,
        "Dévissez un flacon, vissez-en un autre : c'est fait en 1 seconde. Pas de nettoyage entre les synergies, zéro huile gaspillée. C'est ce qui rend les routines multi-synergies possibles.",
        "Unscrew one bottle, screw on another: done in 1 second. No cleaning between blends, zero oil wasted. This is what makes multi-blend routines possible.",
        'Desenrosque un frasco, enrosque otro: hecho en 1 segundo. Sin limpieza entre mezclas, cero aceite desperdiciado. Esto es lo que hace posibles las rutinas multi-mezcla.'
      ),
    },
    {
      icon: BatteryFull,
      title: t3(language, "8 heures d'autonomie sans fil", '8 hours of wireless autonomy', '8 horas de autonomía inalámbrica'),
      desc: t3(language,
        "Le rituel bien-être de votre client n'est pas lié à une prise électrique. Chambre, bureau, voiture, voyage. Plus de lieux = plus de moments d'usage = plus d'huile consommée.",
        "Your customer's wellness ritual is not tied to a power outlet. Bedroom, office, car, travel. More places = more usage moments = more oil consumed.",
        'El ritual de bienestar de su cliente no está atado a un enchufe. Dormitorio, oficina, coche, viaje. Más lugares = más momentos de uso = más aceite consumido.'
      ),
    },
    {
      icon: VolumeX,
      title: t3(language, 'Silence absolu : 0 dB mesuré', 'Absolute silence: 0 dB measured', 'Silencio absoluto: 0 dB medido'),
      desc: t3(language,
        "Pas de pompe, pas de ventilateur, pas de vibration. Tolia est le seul diffuseur assez silencieux pour la méditation, le sommeil, le travail concentré et le yoga.",
        "No pump, no fan, no vibration. Tolia is the only diffuser quiet enough for meditation, sleep, deep work, and yoga.",
        'Sin bomba, sin ventilador, sin vibración. Tolia es el único difusor lo suficientemente silencioso para la meditación, el sueño, el trabajo concentrado y el yoga.'
      ),
    },
    {
      icon: Droplets,
      title: t3(language, '100 % huile pure, 100 % efficacité', '100% pure oil, 100% therapeutic efficacy', '100 % aceite puro, 100 % eficacia'),
      desc: t3(language,
        "La nébulisation à air froid sec préserve chaque terpène, chaque composé actif. Pas de dilution à l'eau, pas de dégradation par la chaleur.",
        "Cold dry-air nebulisation preserves every terpene, every active compound. No water dilution, no heat degradation.",
        'La nebulización de aire frío seco preserva cada terpeno, cada compuesto activo. Sin dilución con agua, sin degradación por calor.'
      ),
    },
    {
      icon: Gauge,
      title: t3(language, 'Programmes d\'usage et indicateur LED intuitif', 'Usage programs and intuitive LED indicator', 'Programas de uso e indicador LED intuitivo'),
      desc: t3(language,
        "Tolia intègre des programmes de diffusion prédéfinis (intensité, durée, intermittence) accessibles d'une simple pression. Un indicateur lumineux sous forme de barre graphe LED change de couleur selon la fonction en cours de réglage : bleu pour la durée, vert pour l'intensité, ambre pour le mode intermittent. L'utilisateur comprend instantanément quel paramètre il ajuste, sans notice ni écran.",
        "Tolia features built-in diffusion programs (intensity, duration, intermittence) accessible with a single press. A colour-coded LED bar graph indicator changes colour depending on the setting being adjusted: blue for duration, green for intensity, amber for intermittent mode. The user instantly understands which parameter they are adjusting, with no manual and no screen.",
        'Tolia integra programas de difusión predefinidos (intensidad, duración, intermitencia) accesibles con una sola pulsación. Un indicador LED de barra gráfica codificado por colores cambia de color según el ajuste: azul para duración, verde para intensidad, ámbar para modo intermitente. El usuario comprende instantáneamente qué parámetro está ajustando, sin manual ni pantalla.'
      ),
    },
  ];

  return (
    <section id="four-innovations" className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(33 35% 94%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Six ruptures. Zéro compromis.', 'Six breakthroughs. Zero compromise.', 'Seis avances. Cero compromisos.')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Chaque diffuseur du marché force votre client à accepter un compromis. Tolia est le premier qui ne le fait pas.",
              "Every diffuser on the market forces your customer to accept a trade-off. Tolia is the first that does not.",
              'Cada difusor del mercado obliga a su cliente a aceptar un compromiso. Tolia es el primero que no lo hace.'
            )}
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {cards.map((card, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={5} glare>
                <div className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 h-full text-center
                  transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)]">
                  <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                    <card.icon className="w-7 h-7" style={{ color: 'hsl(28 45% 48%)' }} />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FourInnovationsSection;
