import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import AnimatedCounter from '@/components/AnimatedCounter';
import MagneticButton from '@/components/MagneticButton';

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const popIn: Variants = { hidden: { opacity: 0, scale: 0.8, filter: 'blur(8px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 200, damping: 20 } } };
const slideIn: Variants = { hidden: { opacity: 0, x: -30, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } };

const MarketTractionSection: React.FC = () => {
  const { language: l } = useLanguage();

  const proofs = [
    t3(l, "L'effet Nespresso : comme Nespresso a triplé la consommation de café en supprimant chaque friction, Tolia rend le changement de synergie aussi simple qu'un geste — sans eau, sans nettoyage, sans attente.", "The Nespresso effect: just as Nespresso tripled coffee consumption by removing every friction point, Tolia makes switching oils as simple as pressing a button — no water, no cleaning, no waiting.", "El efecto Nespresso: igual que Nespresso triplicó el consumo de café eliminando cada punto de fricción, Tolia hace que cambiar de aceite sea tan simple como pulsar un botón — sin agua, sin limpieza, sin espera."),
    t3(l, "100 % white-label : couleurs, matériaux (bois, verre, soft-touch), gravures, packaging et kit de communication prêt à publier — Tolia porte votre identité de marque jusque dans les moindres détails.", "100% white-label: colours, materials (wood, glass, soft-touch), engravings, packaging and ready-to-publish communication kit — Tolia carries your brand identity down to the smallest detail.", "100 % marca blanca: colores, materiales (madera, vidrio, soft-touch), grabados, packaging y kit de comunicación listo para publicar — Tolia lleva la identidad de su marca hasta el más mínimo detalle."),
    t3(l, "Coûts SAV divisés par 4 : l'architecture modulaire Twist & Mist repose sur des pièces standardisées et remplaçables par le client. Moins de retours, diagnostic simplifié, coûts de support réduits.", "After-sales costs divided by 4: Twist & Mist's modular architecture means standardised, user-replaceable parts. Fewer returns, simpler diagnostics, lower support costs.", "Costes de posventa divididos por 4: la arquitectura modular Twist & Mist se basa en piezas estandarizadas y reemplazables por el cliente. Menos devoluciones, diagnóstico simplificado, costes de soporte reducidos."),
    t3(l, "De 22 € de marge ponctuelle à 82 € de marge récurrente par an et par client : coffrets saisonniers et routines quotidiennes transforment une vente unique en flux de revenus prévisible et croissant.", "From €22 one-off margin to €82 recurring margin per year per customer: seasonal gift sets and daily routines transform a single sale into a predictable, growing revenue stream.", "De 22 € de margen puntual a 82 € de margen recurrente por año y por cliente: estuches estacionales y rutinas diarias transforman una venta única en un flujo de ingresos predecible y creciente."),
  ];

  const metrics = [
    { end: 100, suffix: "K+", label: t3(l, "diffuseurs vendus en seulement 7 mois", "diffusers sold in just 7 months", "difusores vendidos en solo 7 meses"), detail: t3(l, "Le lancement produit le plus rapide en 20 ans de conception de systèmes de diffusion — preuve d'une demande marché immédiate.", "The fastest product launch in 20 years of designing proprietary diffusion systems — proof of immediate market demand.", "El lanzamiento de producto más rápido en 20 años de diseño de sistemas de difusión propietarios — prueba de una demanda de mercado inmediata.") },
    { end: 3.8, suffix: "×", prefix: "", decimals: 1, label: t3(l, "plus de ventes qu'un diffuseur classique", "more sales than a traditional diffuser", "más ventas que un difusor clásico"), detail: t3(l, "Chez certains partenaires, Tolia a surpassé toute leur gamme de diffuseurs existante dès le lancement.", "With some partners, Tolia outsold their entire existing diffuser range from day one.", "Con algunos socios, Tolia superó toda su gama de difusores existente desde el primer día.") },
    { end: 24, suffix: "+", label: t3(l, "flacons par an par client équipé", "bottles per year per equipped customer", "frascos por año por cliente equipado"), detail: t3(l, "Contre 2-3 flacons/an avec un diffuseur classique : les routines quotidiennes multiplient la consommation d'huiles essentielles jusqu'à 8×.", "Compared to 2–3 bottles/year with a classic diffuser: daily routines multiply essential oil consumption by up to 8×.", "Frente a 2-3 frascos/año con un difusor clásico: las rutinas diarias multiplican el consumo de aceites esenciales hasta 8×.") },
  ];

  return (
    <section id="traction" className="section-padding bg-background relative overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Preuves marché', 'Market proof', 'Pruebas de mercado')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Une technologie déjà adoptée par le marché', 'A technology already adopted by the market', 'Una tecnología ya adoptada por el mercado')}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div className="grid sm:grid-cols-3 gap-4 mb-10" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            {metrics.map((m, i) => (
              <motion.div key={i} className="text-center p-8 rounded-2xl border bg-card flex flex-col items-center" style={{ borderColor: 'hsl(28 45% 48% / 0.2)' }} variants={popIn} whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 18 } }}>
                <p className="text-5xl font-bold mb-2" style={{ color: 'hsl(28 45% 42%)' }}>
                  <AnimatedCounter
                    end={m.end}
                    suffix={m.suffix}
                    prefix={m.prefix || ''}
                    decimals={m.decimals || 0}
                    duration={2200}
                  />
                </p>
                <p className="text-sm font-semibold text-foreground mb-2">{m.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="space-y-4 mb-10" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            {proofs.map((p, i) => (
              <motion.div key={i} className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-muted/30" variants={slideIn}>
                <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(28 45% 48%)' }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <MagneticButton>
              <a href="#contact" onClick={() => trackCTAClick(t3(l, 'Voir comment ces résultats s\'appliquent', 'See how these results apply', 'Ver cómo se aplican estos resultados'), 'traction')}>
                <Button className="btn-hero-primary group">
                  {t3(l, 'Voir comment ces résultats pourraient s\'appliquer à votre gamme', 'See how these results could apply to your range', 'Vea cómo estos resultados podrían aplicarse a su gama')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketTractionSection;
