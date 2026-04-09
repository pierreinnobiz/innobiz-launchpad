import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const AnimatedStat: React.FC<{ value: string; label: string; desc: string }> = ({ value, label, desc }) => {
  const numericPart = value.replace(/[^0-9.]/g, '');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = value.match(/[0-9.][^0-9]*$/)?.[0]?.replace(/[0-9.]/g, '') || '';

  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const target = parseFloat(numericPart);
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = eased * target;
          if (target >= 100) setDisplay(Math.round(current).toLocaleString());
          else if (target >= 10) setDisplay(Math.round(current).toString());
          else setDisplay(current.toFixed(1));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(target >= 100 ? target.toLocaleString() : target.toString());
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [numericPart]);

  return (
    <div ref={ref} className="text-center p-8 bg-card rounded-2xl border border-border/40
      transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.15)] hover:-translate-y-1">
      <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'hsl(28 45% 48%)' }}>
        {prefix}{display}{suffix}
      </div>
      <div className="font-semibold text-foreground mb-2">{label}</div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};

const MarketProofSection: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      value: '100K+',
      label: t3(language, 'unités vendues en seulement 7 mois', 'units sold in just 7 months', 'unidades vendidas en solo 7 meses'),
      desc: t3(language, "Le lancement produit le plus rapide des 20 ans d'histoire d'Innobiz. Demande consommateur validée à grande échelle.", "The fastest product launch in Innobiz's 20-year history. Consumer demand validated at scale.", 'El lanzamiento de producto más rápido en los 20 años de historia de Innobiz. Demanda del consumidor validada a escala.'),
    },
    {
      value: '3.8×',
      label: t3(language, "plus d'huiles essentielles vendues par client", 'more essential oils sold per customer', 'más aceites esenciales vendidos por cliente'),
      desc: t3(language, 'Mesuré en comparaison directe avec les diffuseurs traditionnels au sein de la même marque et du même canal de distribution.', 'Measured head-to-head vs. traditional diffusers within the same brand and retail channel.', 'Medido en comparación directa con difusores tradicionales dentro de la misma marca y canal de distribución.'),
    },
    {
      value: '100%',
      label: t3(language, "transfert d'achat depuis les anciens diffuseurs", 'purchase transfer from old diffusers', 'transferencia de compra desde difusores anteriores'),
      desc: t3(language, "Les clients abandonnent activement leurs anciens diffuseurs pour passer au Twist & Mist, de façon permanente.", 'Customers are actively abandoning their previous diffusers to switch to Twist & Mist, permanently.', 'Los clientes abandonan activamente sus difusores anteriores para cambiar al Twist & Mist, permanentemente.'),
    },
  ];

  return (
    <section id="market-proof" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Pas un prototype. Pas un concept. Prouvé à grande échelle.', 'Not a prototype. Not a concept. Proven at scale.', 'No es un prototipo. No es un concepto. Probado a escala.')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              "100 000+ unités déjà entre les mains des consommateurs, et vos concurrents le vendent peut-être déjà.",
              "100,000+ units already in consumers' hands, and your competitors may already be selling it.",
              '100.000+ unidades ya en manos de los consumidores, y sus competidores quizás ya lo estén vendiendo.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              "Tolia n'est ni une campagne de crowdfunding ni une expérience de laboratoire. C'est un produit validé par le marché, avec la courbe d'adoption la plus rapide qu'Innobiz ait jamais connue. Le virage technologique a déjà eu lieu côté consommateur. La seule question qui reste : votre marque va-t-elle le capter, ou regarder ses concurrents le faire ?",
              "Tolia is not a crowdfunding campaign or a lab experiment. It is a market-validated product with the fastest adoption curve Innobiz has ever seen. The technology shift has already happened on the consumer side. The only question remaining is whether your brand will capture it or watch competitors do so first.",
              'Tolia no es una campaña de crowdfunding ni un experimento de laboratorio. Es un producto validado por el mercado con la curva de adopción más rápida que Innobiz haya visto. El cambio tecnológico ya ocurrió del lado del consumidor. La única pregunta que queda es: ¿su marca lo capturará, o verá a los competidores hacerlo primero?'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <AnimatedStat {...s} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-base md:text-lg font-semibold text-foreground max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t3(language,
            "Le virage consommateur vers la diffusion sans friction est déjà en marche. Les marques qui bougent maintenant domineront la catégorie. Celles qui attendent devront rattraper leur retard.",
            'The consumer shift toward frictionless diffusion is already underway. Brands that move now will own the category. Those that wait will be playing catch-up.',
            'El cambio del consumidor hacia la difusión sin fricción ya está en marcha. Las marcas que se muevan ahora dominarán la categoría. Las que esperen estarán jugando a alcanzar.'
          )}
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick('market_proof_cta', 'market-proof')}>
              <Button className="btn-hero-primary group">
                {t3(language, "Voir comment l'appliquer à votre marque", 'See how this could apply to your brand', 'Vea cómo esto podría aplicarse a su marca')}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketProofSection;
