import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, VolumeX, RefreshCw, Droplets, FlaskConical } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const FourInnovationsSection: React.FC = () => {
  const { language } = useLanguage();

  const cards = [
    {
      icon: FlaskConical,
      title: t3(language, 'Compatibilité universelle. Une première mondiale', 'Universal compatibility, a world first', 'Compatibilidad universal, una primicia mundial'),
      desc: t3(language,
        "Tolia est le seul diffuseur capable de nébuliser des huiles essentielles, des synergies, des hydrolats et des parfums d'intérieur. Testé et validé sur des centaines de formulations. Un seul appareil pour couvrir 100 % de votre gamme, aucun autre diffuseur ne peut en dire autant.",
        "Tolia is the only diffuser capable of nebulising essential oils, blends, hydrosols, and home fragrances. Tested and validated on hundreds of formulations. One device to cover 100% of your range. No other diffuser can make that claim.",
        'Tolia es el único difusor capaz de nebulizar aceites esenciales, mezclas, hidrolatos y fragancias para el hogar. Probado y validado en cientos de formulaciones. Un dispositivo para cubrir el 100 % de su gama, ningún otro difusor puede afirmar lo mismo.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, 'Changement de flacon en 1 seconde', 'Bottle switch in 1 second', 'Cambio de frasco en 1 segundo'),
      desc: t3(language,
        "Dévissez un flacon, vissez-en un autre, fait en 1 seconde. Pas de nettoyage entre les synergies, zéro huile gaspillée. C'est ce qui rend les routines multi-synergies possibles, et ce qui génère les rachats d'huile.",
        "Unscrew one bottle, screw on another, done in 1 second. No cleaning between blends, zero oil wasted. This is what makes multi-blend routines possible, and what drives repeat oil purchases.",
        'Desenrosque un frasco, enrosque otro, hecho en 1 segundo. Sin limpieza entre mezclas, cero aceite desperdiciado. Esto es lo que hace posibles las rutinas multi-mezcla, y lo que impulsa las recompras de aceite.'
      ),
    },
    {
      icon: BatteryFull,
      title: t3(language, "8 heures d'autonomie sans fil", '8 hours of wireless autonomy', '8 horas de autonomía inalámbrica'),
      desc: t3(language,
        "Le rituel bien-être de votre client n'est pas lié à une prise électrique. Chambre, bureau, voiture, voyage, Tolia l'accompagne partout. Plus de lieux = plus de moments d'usage = plus d'huile consommée.",
        "Your customer's wellness ritual isn't tied to a power outlet. Bedroom, office, car, travel, Tolia goes wherever they go. More places = more usage moments = more oil consumed.",
        'El ritual de bienestar de su cliente no está atado a un enchufe. Dormitorio, oficina, coche, viaje, Tolia va donde ellos van. Más lugares = más momentos de uso = más aceite consumido.'
      ),
    },
    {
      icon: VolumeX,
      title: t3(language, 'Silence absolu : 0 dB mesuré', 'Absolute silence, 0 dB measured', 'Silencio absoluto, 0 dB medido'),
      desc: t3(language,
        "Pas de pompe, pas de ventilateur, pas de vibration. Tolia est le seul diffuseur assez silencieux pour la méditation, le sommeil, le travail concentré et le yoga. Le silence supprime la dernière raison de ne pas l'allumer.",
        "No pump, no fan, no vibration. Tolia is the only diffuser quiet enough for meditation, sleep, deep work, and yoga. Silence removes the last reason not to turn it on.",
        'Sin bomba, sin ventilador, sin vibración. Tolia es el único difusor lo suficientemente silencioso para la meditación, el sueño, el trabajo concentrado y el yoga. El silencio elimina la última razón para no encenderlo.'
      ),
    },
    {
      icon: Droplets,
      title: t3(language, '100 % huile pure, 100 % efficacité thérapeutique', '100% pure oil, 100% therapeutic efficacy', '100 % aceite puro, 100 % eficacia terapéutica'),
      desc: t3(language,
        "La nébulisation à air froid sec préserve chaque terpène, chaque composé actif. Pas de dilution à l'eau, pas de dégradation par la chaleur. Votre client bénéficie du plein potentiel thérapeutique, et d'une brume visible et satisfaisante.",
        "Cold dry-air nebulisation preserves every terpene, every active compound. No water dilution, no heat degradation. Your customer gets the full therapeutic benefit, and a visible, satisfying mist.",
        'La nebulización de aire frío seco preserva cada terpeno, cada compuesto activo. Sin dilución con agua, sin degradación por calor. Su cliente obtiene el beneficio terapéutico completo, y una niebla visible y satisfactoria.'
      ),
    },
  ];

  return (
    <section id="four-innovations" className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(33 35% 94%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Cinq ruptures. Zéro compromis.', 'Five breakthroughs. Zero compromise.', 'Cinco avances. Cero compromisos.')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "Chaque diffuseur du marché force votre client à accepter un compromis. Tolia est le premier qui ne le fait pas.",
              "Every diffuser on the market forces your customer to accept a trade-off. Tolia is the first that doesn't.",
              'Cada difusor del mercado obliga a su cliente a aceptar un compromiso. Tolia es el primero que no lo hace.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            {t3(language,
              "Portable mais faible ? Silencieux mais inefficace ? Compatible avec les huiles mais pas les hydrolats ni les parfums ? Jusqu'ici, vos clients devaient choisir leur compromis, et quel que soit leur choix, le diffuseur finissait au placard. Tolia est le premier et seul diffuseur qui combine compatibilité universelle (huiles essentielles, synergies, hydrolats et parfums d'intérieur), autonomie sans fil, silence total, changement de flacon en 1 seconde et nébulisation d'huile pure. Le fruit de 20 ans de R&D et de tests sur des centaines de formulations par Innobiz.",
              "Portable but weak? Silent but inefficient? Compatible with oils but not hydrosols or home fragrances? Until now, your customers had to pick their compromise, and whichever they chose eventually sent the diffuser to the closet. Tolia is the first and only diffuser combining universal compatibility (essential oils, blends, hydrosols, and home fragrances), wireless autonomy, total silence, 1-second bottle switching, and pure-oil nebulisation. The result of 20 years of R&D and testing on hundreds of formulations by Innobiz.",
              '¿Portátil pero débil? ¿Silencioso pero ineficiente? ¿Compatible con aceites pero no con hidrolatos ni fragancias? Hasta ahora, sus clientes tenían que elegir su compromiso, y cualquiera que eligieran, el difusor terminaba en el armario. Tolia es el primer y único difusor que combina compatibilidad universal (aceites esenciales, mezclas, hidrolatos y fragancias para el hogar), autonomía inalámbrica, silencio total, cambio de frasco en 1 segundo y nebulización de aceite puro. El resultado de 20 años de I+D y pruebas en cientos de formulaciones por Innobiz.'
            )}
          </p>
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
