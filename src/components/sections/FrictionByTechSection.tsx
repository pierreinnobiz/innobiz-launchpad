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
      how: t3(language, "Huile diluée dans l'eau, vibrée en brume fraîche", 'Oil diluted in water, vibrated into cool mist', 'Aceite diluido en agua, vibrado en niebla fría'),
      friction: t3(language, "Remplissage et nettoyage quotidien obligatoires. L'eau stagnante provoque moisissures et bactéries. Dilution des composés aromatiques jusqu'à 80 %. Votre client perd confiance dans le produit.", 'Daily filling and cleaning mandatory. Stagnant water breeds mold and bacteria. Aromatic compounds diluted by up to 80%. Your customer loses trust in the product.', 'Llenado y limpieza diaria obligatorios. El agua estancada genera moho y bacterias. Compuestos aromáticos diluidos hasta un 80 %. Su cliente pierde confianza en el producto.'),
      closet: t3(language, '1–2 utilisations par semaine → placard en 3 mois', 'Used 1–2× per week → cupboard within 3 months', 'Usado 1–2× por semana → armario en 3 meses'),
    },
    {
      name: t3(language, 'Diffusion par chaleur', 'Heat diffusion', 'Difusión por calor'),
      how: t3(language, "Huile chauffée sur une plaque ou dans une lampe", 'Oil heated on a plate or in a lamp', 'Aceite calentado en una placa o lámpara'),
      friction: t3(language, "Au-dessus de 40 °C, les terpènes et molécules thérapeutiques sont détruits. Le rendu olfactif est faible et de courte durée. Votre client ne ressent aucun bénéfice et ne rachète plus.", 'Above 40°C, terpenes and therapeutic molecules are destroyed. Scent output is weak and short-lived. Your customer feels no benefit and stops reordering.', 'Por encima de 40 °C, los terpenos y moléculas terapéuticas se destruyen. El rendimiento olfativo es débil y de corta duración. Su cliente no percibe ningún beneficio y deja de recomprar.'),
      closet: t3(language, 'Déception immédiate → placard en quelques semaines', 'Immediate disappointment → cupboard within weeks', 'Decepción inmediata → armario en semanas'),
    },
    {
      name: t3(language, 'Passif (bâtonnets, pierre)', 'Passive (reed sticks, stone)', 'Pasivo (varillas, piedra)'),
      how: t3(language, "Évaporation lente par capillarité naturelle", 'Slow evaporation through natural capillary action', 'Evaporación lenta por acción capilar natural'),
      friction: t3(language, "Aucun contrôle d'intensité ni de durée. Rendement insignifiant au-delà de 10 m². Aucun engagement possible, aucune routine ne se crée.", 'No control over intensity or duration. Negligible output beyond 10m². No engagement possible, no routine forms.', 'Sin control de intensidad ni duración. Rendimiento insignificante más allá de 10 m². Sin posibilidad de compromiso, ninguna rutina se forma.'),
      closet: t3(language, "Décoration oubliée → aucun rachat d'huiles, jamais", 'Forgotten decoration → no oil reorders, ever', 'Decoración olvidada → ninguna recompra de aceites, nunca'),
    },
    {
      name: t3(language, 'Nébuliseur classique (verre)', 'Classic nebulizer (glass)', 'Nebulizador clásico (vidrio)'),
      how: t3(language, "Air comprimé poussant l'huile à travers un venturi en verre", 'Compressed air pushes oil through a glass venturi', 'Aire comprimido empuja el aceite a través de un venturi de vidrio'),
      friction: t3(language, "Bruit de pompe gênant (45–60 dB), verrerie fragile qui se casse, gaspillage d'huile jusqu'à 40 %. Démontage et nettoyage complexe entre chaque utilisation.", 'Disruptive pump noise (45–60 dB), fragile glassware that breaks, oil waste up to 40%. Complex disassembly and cleaning between each use.', 'Ruido de bomba molesto (45–60 dB), cristalería frágil que se rompe, desperdicio de aceite hasta 40 %. Desmontaje y limpieza complejos entre cada uso.'),
      closet: t3(language, 'Cadeau impressionnant → tiroir en 6 mois', 'Impressive gift → drawer within 6 months', 'Regalo impresionante → cajón en 6 meses'),
    },
    {
      name: 'Tolia : Twist & Mist ✅',
      how: t3(language, "Le flacon se visse directement dans le module de nébulisation à air froid sec", 'Sealed bottle screws directly into cold dry-air nebulisation module', 'El frasco se enrosca directamente en el módulo de nebulización de aire frío seco'),
      friction: t3(language, "Zéro friction. Vissez, clipsez, appuyez. Pas d'eau, pas de nettoyage, pas de gaspillage, pas de bruit. Changez d'huile en 1 seconde.", 'Zero friction. Screw, clip, press. No water, no cleaning, no waste, no noise. Switch oils in 1 second.', 'Cero fricción. Enrosque, enganche, presione. Sin agua, sin limpieza, sin desperdicio, sin ruido. Cambie de aceite en 1 segundo.'),
      closet: t3(language, 'Utilisé chaque jour, 365 jours par an — mesuré et prouvé', 'Used every day, 365 days a year — measured and proven', 'Usado cada día, 365 días al año — medido y probado'),
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
            {t3(language, 'Pourquoi les diffuseurs échouent', 'Why diffusers fail', 'Por qué los difusores fallan')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(language,
              "Chaque technologie de diffusion existante porte en elle une friction qui condamne le diffuseur au placard. Et avec lui, vos ventes d'huiles.",
              "Every existing diffusion technology carries a built-in friction that condemns the diffuser to the cupboard. And with it, your oil sales.",
              'Cada tecnología de difusión existente lleva una fricción incorporada que condena al difusor al armario. Y con él, sus ventas de aceites.'
            )}
          </h2>
          <p className="text-body-lg max-w-4xl mx-auto">
            {t3(language,
              <>Votre client veut diffuser chaque jour. Mais chaque diffuseur du marché l'oblige à choisir : silencieux <em>ou</em> puissant ? Portable <em>ou</em> efficace ? Simple <em>ou</em> thérapeutique ? Ce compromis forcé est la raison pour laquelle <strong>60 % des diffuseurs finissent inutilisés</strong>. Un seul diffuseur élimine ce compromis.</>,
              <>Your customer wants to diffuse every day. But every diffuser on the market forces a trade-off: silent <em>or</em> powerful? Portable <em>or</em> effective? Simple <em>or</em> therapeutic? That forced compromise is why <strong>60% of diffusers end up unused</strong>. Only one diffuser eliminates this trade-off.</>,
              <>Su cliente quiere difundir cada día. Pero cada difusor del mercado le obliga a elegir: ¿silencioso <em>o</em> potente? ¿Portátil <em>o</em> eficaz? ¿Simple <em>o</em> terapéutico? Ese compromiso forzado es la razón por la que <strong>el 60 % de los difusores terminan sin usarse</strong>. Solo un difusor elimina este compromiso.</>
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
              <>Supprimez la friction → supprimez l'effet placard → débloquez le rachat d'huiles toute l'année. Les marques qui utilisent Tolia mesurent une <strong>consommation d'huiles multipliée par 4 à 6</strong>. Le diffuseur n'est plus un produit, c'est une infrastructure de revenu récurrent.</>,
              <>Remove friction → remove the cupboard effect → unlock year-round oil repurchase. Brands using Tolia measure <strong>oil consumption multiplied by 4 to 6</strong>. The diffuser is no longer a product, it is a recurring revenue infrastructure.</>,
              <>Elimine la fricción → elimine el efecto armario → desbloquee la recompra de aceites durante todo el año. Las marcas que usan Tolia miden un <strong>consumo de aceites multiplicado por 4 a 6</strong>. El difusor ya no es un producto, es una infraestructura de ingresos recurrentes.</>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FrictionByTechSection;
