import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

interface TechRow {
  name: string;
  how: string;
  friction: string;
  closet: string;
  isTolia?: boolean;
}

const FrictionByTechSection: React.FC = () => {
  const { language } = useLanguage();

  const rows: TechRow[] = [
    {
      name: t3(language, 'Ultrasonique (à eau)', 'Ultrasonic (water-based)', 'Ultrasónico (con agua)'),
      how: t3(language, "Huile essentielle diluée dans l'eau, vibrée en brume fraîche", 'Essential oil diluted in water, vibrated into cool mist', 'Aceite esencial diluido en agua, vibrado en niebla fría'),
      friction: t3(language, "Nécessite un remplissage et nettoyage quotidien du réservoir. L'eau favorise moisissures et bactéries. La dilution affaiblit les composés aromatiques jusqu'à 80 %.", 'Requires daily tank filling and cleaning. Water breeds mold and bacteria. Dilution weakens aromatic compounds by up to 80%.', 'Requiere llenado y limpieza diaria del depósito. El agua favorece moho y bacterias. La dilución debilita los compuestos aromáticos hasta un 80 %.'),
      closet: t3(language, 'Utilisé 1–2× par semaine → abandonné en 3 mois', 'Used 1–2× per week → abandoned within 3 months', 'Usado 1–2× por semana → abandonado en 3 meses'),
    },
    {
      name: t3(language, 'Diffusion par chaleur', 'Heat diffusion', 'Difusión por calor'),
      how: t3(language, "Huile chauffée sur une plaque ou dans une lampe pour libérer le parfum", 'Oil heated on a plate or in a lamp to release fragrance', 'Aceite calentado en una placa o lámpara para liberar fragancia'),
      friction: t3(language, "La chaleur au-dessus de 40 °C détruit les terpènes sensibles et les molécules thérapeutiques. Le rendu est faible, imprévisible et de courte durée.", 'Heat above 40°C destroys sensitive terpenes and therapeutic molecules. Output is weak, unpredictable, and short-lived.', 'El calor por encima de 40 °C destruye terpenos sensibles y moléculas terapéuticas. El rendimiento es débil, impredecible y de corta duración.'),
      closet: t3(language, 'Déception du client → placard en quelques semaines', 'Customer disappointment → closet within weeks', 'Decepción del cliente → armario en semanas'),
    },
    {
      name: t3(language, 'Passif (bâtonnets, pierre)', 'Passive (reed sticks, stone)', 'Pasivo (varillas, piedra)'),
      how: t3(language, "L'huile s'évapore lentement par capillarité naturelle", 'Oil slowly evaporates through natural capillary action', 'El aceite se evapora lentamente por acción capilar natural'),
      friction: t3(language, "Aucun contrôle d'intensité, rendement négligeable dans les pièces de plus de 10 m². Aucun engagement, aucun rituel possible.", 'No intensity control, negligible output in rooms over 10m². No engagement, no ritual possible.', 'Sin control de intensidad, rendimiento insignificante en habitaciones de más de 10 m². Sin compromiso, sin ritual posible.'),
      closet: t3(language, "Devient une décoration invisible → ne déclenche jamais de rachat d'huiles", 'Becomes invisible decoration → never triggers oil reorders', 'Se convierte en decoración invisible → nunca genera recompras de aceites'),
    },
    {
      name: t3(language, 'Nébuliseur classique (verre)', 'Classic nebulizer (glass)', 'Nebulizador clásico (vidrio)'),
      how: t3(language, "L'air comprimé pousse l'huile à travers un venturi en verre", 'Compressed air pushes oil through a glass venturi', 'El aire comprimido empuja el aceite a través de un venturi de vidrio'),
      friction: t3(language, "Bruit de pompe fort (45–60 dB), verrerie fragile, gaspillage d'huile jusqu'à 40 %. Démontage complexe pour le nettoyage entre chaque synergie.", 'Loud pump noise (45–60 dB), fragile glassware, oil waste up to 40%. Complex disassembly for cleaning between each blend.', 'Ruido de bomba fuerte (45–60 dB), cristalería frágil, desperdicio de aceite hasta 40 %. Desmontaje complejo para limpiar entre cada mezcla.'),
      closet: t3(language, 'Cadeau impressionnant → tiroir en 6 mois', 'Impressive gift → drawer within 6 months', 'Regalo impresionante → cajón en 6 meses'),
    },
    {
      name: 'Tolia : Twist & Mist ✅',
      how: t3(language, "Le flacon scellé se visse directement dans le module de nébulisation breveté à air froid sec", 'Sealed bottle screws directly into patented cold dry-air nebulization module', 'El frasco sellado se enrosca directamente en el módulo de nebulización patentado de aire frío seco'),
      friction: t3(language, "Zéro friction, vissez le flacon, clipsez, appuyez sur le bouton. Pas d'eau, pas de nettoyage, pas de gaspillage, pas de bruit.", 'Zero friction, screw the bottle, clip in, press the button. No water, no cleaning, no waste, no noise.', 'Cero fricción, enrosque el frasco, enganche, presione el botón. Sin agua, sin limpieza, sin desperdicio, sin ruido.'),
      closet: t3(language, 'Rituel quotidien, 365 jours par an, mesuré et prouvé', 'Daily ritual, 365 days a year, measured and proven', 'Ritual diario, 365 días al año, medido y probado'),
      isTolia: true,
    },
  ];

  const thTech = t3(language, 'Technologie', 'Technology', 'Tecnología');
  const thHow = t3(language, 'Comment ça fonctionne', 'How it works', 'Cómo funciona');
  const thFriction = t3(language, "La friction qui tue l'usage quotidien", 'The friction that kills daily use', 'La fricción que mata el uso diario');
  const thCloset = t3(language, "L'effet placard", 'The closet effect', 'El efecto armario');

  return (
    <section id="friction-by-tech" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(30 25% 93%) 0%, hsl(35 30% 96%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'La cause profonde. La technologie', 'The root cause, technology', 'La causa raíz. La tecnología')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(language,
              "Ce n'est pas votre marketing. C'est le diffuseur. Chaque technologie existante crée une friction qui tue l'usage quotidien.",
              "It's not your marketing. It's the diffuser. Every existing technology creates a friction that kills daily use.",
              'No es su marketing. Es el difusor. Cada tecnología existente crea una fricción que mata el uso diario.'
            )}
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto">
            {t3(language,
              <>Votre client veut diffuser des huiles essentielles chaque jour. Mais chaque diffuseur du marché le force à choisir : silencieux <em>ou</em> puissant ? Portable <em>ou</em> efficace ? Simple <em>ou</em> flexible ? Ce compromis forcé est la raison pour laquelle 60 % des diffuseurs finissent inutilisés. Jusqu'à Tolia.</>,
              <>Your customer wants to diffuse essential oils every day. But every diffuser on the market forces them to choose: silent <em>or</em> powerful? Portable <em>or</em> effective? Simple <em>or</em> flexible? That forced compromise is the reason 60% of diffusers end up unused. Until Tolia.</>,
              <>Su cliente quiere difundir aceites esenciales cada día. Pero cada difusor del mercado le obliga a elegir: ¿silencioso <em>o</em> potente? ¿Portátil <em>o</em> eficaz? ¿Simple <em>o</em> flexible? Ese compromiso forzado es la razón por la que el 60 % de los difusores terminan sin usarse. Hasta Tolia.</>
            )}
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div className="hidden lg:block max-w-6xl mx-auto mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
                  <th className="text-left p-4 font-semibold text-foreground">{thTech}</th>
                  <th className="text-left p-4 font-semibold text-foreground">{thHow}</th>
                  <th className="text-left p-4 font-semibold text-foreground">{thFriction}</th>
                  <th className="text-left p-4 font-semibold text-foreground">{thCloset}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={i}
                    className={`border-t border-border/40 ${row.isTolia ? 'font-semibold' : ''}`}
                    style={row.isTolia ? { background: 'hsl(28 45% 48% / 0.06)' } : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={!row.isTolia ? { backgroundColor: 'hsl(28 45% 48% / 0.03)' } : undefined}
                  >
                    <td className="p-4 align-top font-medium">
                      {row.isTolia ? <span style={{ color: 'hsl(28 45% 42%)' }}>{row.name}</span> : row.name}
                    </td>
                    <td className="p-4 align-top text-muted-foreground">{row.how}</td>
                    <td className="p-4 align-top">
                      {row.isTolia ? (
                        <span className="flex items-center gap-2" style={{ color: 'hsl(140 45% 40%)' }}>
                          <Check className="w-4 h-4 flex-shrink-0" />{row.friction}
                        </span>
                      ) : (
                        <span className="flex items-start gap-2 text-muted-foreground">
                          <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-destructive/60" />{row.friction}
                        </span>
                      )}
                    </td>
                    <td className="p-4 align-top" style={row.isTolia ? { color: 'hsl(28 45% 42%)' } : undefined}>
                      {row.isTolia ? <strong>{row.closet}</strong> : <span className="text-muted-foreground">{row.closet}</span>}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile stacked cards */}
        <motion.div className="lg:hidden space-y-4 mb-12" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl p-6 border ${row.isTolia ? 'ring-2' : 'border-border/50'}`}
              style={row.isTolia
                ? { background: 'hsl(28 45% 48% / 0.08)', borderColor: 'hsl(28 45% 48% / 0.3)' }
                : { background: 'hsl(0 0% 100% / 0.7)' }
              }
              variants={fadeUp}
            >
              <h3 className="font-bold text-base mb-3"
                style={row.isTolia ? { color: 'hsl(28 45% 42%)' } : undefined}>{row.name}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-foreground/80">{t3(language, 'Comment : ', 'How: ', 'Cómo: ')}</span>
                  <span className="text-muted-foreground">{row.how}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground/80">{t3(language, 'Friction : ', 'Friction: ', 'Fricción: ')}</span>
                  <span className={row.isTolia ? '' : 'text-muted-foreground'} style={row.isTolia ? { color: 'hsl(140 45% 40%)' } : undefined}>{row.friction}</span>
                </div>
                <div>
                  <span className="font-medium text-foreground/80">{t3(language, 'Effet : ', 'Effect: ', 'Efecto: ')}</span>
                  <span style={row.isTolia ? { color: 'hsl(28 45% 42%)' } : undefined} className={row.isTolia ? 'font-semibold' : 'text-muted-foreground'}>{row.closet}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Takeaway */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border"
          style={{ background: 'hsl(28 45% 48% / 0.06)', borderColor: 'hsl(28 45% 48% / 0.2)' }}
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <p className="text-base md:text-lg leading-relaxed font-semibold text-center">
            {t3(language,
              "L'équation est simple : supprimez la friction → supprimez l'effet placard → débloquez le rachat d'huiles toute l'année. C'est exactement ce que fait Twist & Mist, et pourquoi les marques utilisant Tolia voient la consommation d'huiles multipliée par 4× à 6×.",
              "The equation is simple: remove the friction → remove the closet effect → unlock year-round oil repurchase. That's exactly what Twist & Mist does, and why brands using Tolia see oil consumption multiply by 4× to 6×.",
              'La ecuación es simple: elimine la fricción → elimine el efecto armario → desbloquee la recompra de aceites durante todo el año. Eso es exactamente lo que hace Twist & Mist, y por qué las marcas que usan Tolia ven el consumo de aceites multiplicarse por 4× a 6×.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrictionByTechSection;
