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
        "Aucun autre diffuseur ne peut revendiquer cela. Tolia nébulise des huiles essentielles pures, des synergies complexes, des hydrolats et des parfums d'intérieur. Validé sur des centaines de formulations en laboratoire. Un seul appareil couvre 100 % de votre catalogue, ce qui simplifie votre merchandising et supprime le besoin d'apparier diffuseur et produit.",
        "No other diffuser can claim this. Tolia nebulises pure essential oils, complex blends, hydrosols, and home fragrances. Validated on hundreds of laboratory formulations. One device covers 100% of your catalogue, simplifying your merchandising and eliminating the need to match diffuser to product.",
        'Ningún otro difusor puede afirmar esto. Tolia nebuliza aceites esenciales puros, mezclas complejas, hidrolatos y fragancias para el hogar. Validado en cientos de formulaciones de laboratorio. Un dispositivo cubre el 100 % de su catálogo, simplificando su merchandising y eliminando la necesidad de emparejar difusor y producto.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Changement de flacon en 1 seconde', '1-second bottle switch', 'Cambio de frasco en 1 segundo'),
      desc: t3(language,
        "Dévissez, vissez : 1 seconde. Pas de nettoyage entre deux synergies, zéro goutte perdue. Ce mécanisme est la clé des routines multi-huiles (matin, soir, week-end) qui multiplient la fréquence de rachat de vos flacons.",
        "Unscrew, screw: 1 second. No cleaning between blends, zero drops wasted. This mechanism is the key to multi-oil routines (morning, evening, weekend) that multiply the repurchase frequency of your bottles.",
        'Desenrosque, enrosque: 1 segundo. Sin limpieza entre mezclas, cero gotas desperdiciadas. Este mecanismo es la clave de las rutinas multi-aceite (mañana, noche, fin de semana) que multiplican la frecuencia de recompra de sus frascos.'
      ),
    },
    {
      icon: BatteryFull,
      title: t3(language, "8 heures d'autonomie sans fil", '8 hours of wireless autonomy', '8 horas de autonomía inalámbrica'),
      desc: t3(language,
        "Chambre, bureau, voiture, spa, salle de yoga. Le diffuseur voyage avec votre client, pas l'inverse. Chaque nouveau lieu d'usage est un nouveau moment de consommation d'huile. Plus de lieux, plus de rituels, plus de rachats.",
        "Bedroom, office, car, spa, yoga room. The diffuser travels with your customer, not the other way around. Each new usage location is a new oil consumption moment. More places, more rituals, more repurchases.",
        'Dormitorio, oficina, coche, spa, sala de yoga. El difusor viaja con su cliente, no al revés. Cada nuevo lugar de uso es un nuevo momento de consumo de aceite. Más lugares, más rituales, más recompras.'
      ),
    },
    {
      icon: VolumeX,
      title: t3(language, 'Silence absolu : 0 dB mesuré', 'Absolute silence: 0 dB measured', 'Silencio absoluto: 0 dB medido'),
      desc: t3(language,
        "Pas de pompe, pas de ventilateur, pas de vibration. Tolia est le seul diffuseur qui ne gêne ni le sommeil, ni la méditation, ni le travail concentré. Ce silence ouvre des contextes d'usage que la concurrence ne peut tout simplement pas adresser.",
        "No pump, no fan, no vibration. Tolia is the only diffuser that does not disturb sleep, meditation, or deep focus. This silence unlocks usage contexts that competitors simply cannot address.",
        'Sin bomba, sin ventilador, sin vibración. Tolia es el único difusor que no molesta al sueño, la meditación ni el trabajo concentrado. Este silencio abre contextos de uso que la competencia simplemente no puede abordar.'
      ),
    },
    {
      icon: Droplets,
      title: t3(language, '100 % huile pure, 100 % efficacité thérapeutique', '100% pure oil, 100% therapeutic efficacy', '100 % aceite puro, 100 % eficacia terapéutica'),
      desc: t3(language,
        "La nébulisation à air froid sec préserve l'intégralité des terpènes et composés actifs. Pas de dilution à l'eau (qui détruit jusqu'à 80 % des principes actifs), pas de dégradation par la chaleur. Votre client ressent la puissance de vos huiles dès la première brume, ce qui renforce la valeur perçue de votre marque.",
        "Cold dry-air nebulisation preserves every terpene and active compound intact. No water dilution (which destroys up to 80% of active ingredients), no heat degradation. Your customer feels the full power of your oils from the very first mist, reinforcing the perceived value of your brand.",
        'La nebulización de aire frío seco preserva la integridad de cada terpeno y compuesto activo. Sin dilución con agua (que destruye hasta el 80 % de los principios activos), sin degradación por calor. Su cliente percibe la potencia de sus aceites desde la primera bruma, lo que refuerza el valor percibido de su marca.'
      ),
    },
    {
      icon: Gauge,
      title: t3(language, 'Programmes d\'usage et indicateur LED intuitif', 'Usage programs and intuitive LED indicator', 'Programas de uso e indicador LED intuitivo'),
      desc: t3(language,
        "Intensité, durée, intermittence : tout se règle d'une simple pression. Un indicateur LED barre-graphe change de couleur selon le paramètre (bleu = durée, vert = intensité, ambre = intermittence). Votre client comprend instantanément ce qu'il ajuste, sans notice, sans application, sans friction. Le diffuseur s'adapte à lui, pas l'inverse.",
        "Intensity, duration, intermittence: everything adjusts with a single press. An LED bar graph indicator changes colour by parameter (blue = duration, green = intensity, amber = intermittence). Your customer instantly understands what they are adjusting, with no manual, no app, no friction. The diffuser adapts to them, not the other way around.",
        'Intensidad, duración, intermitencia: todo se ajusta con una sola pulsación. Un indicador LED de barra gráfica cambia de color según el parámetro (azul = duración, verde = intensidad, ámbar = intermitencia). Su cliente comprende instantáneamente qué ajusta, sin manual, sin aplicación, sin fricción. El difusor se adapta a él, no al revés.'
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
            {t3(language, 'Six ruptures technologiques. Zéro compromis.', 'Six technological breakthroughs. Zero compromise.', 'Seis avances tecnológicos. Cero compromisos.')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Chaque diffuseur du marché force un compromis. Tolia les élimine tous. Voici les 6 raisons techniques.",
              "Every diffuser on the market forces a trade-off. Tolia eliminates all of them. Here are the 6 technical reasons.",
              'Cada difusor del mercado fuerza un compromiso. Tolia los elimina todos. Estas son las 6 razones técnicas.'
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
