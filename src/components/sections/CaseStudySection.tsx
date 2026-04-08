import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import toliaCaseStudy from '@/assets/tolia-case-study.jpg';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const CaseStudySection: React.FC = () => {
  const { language: l } = useLanguage();

  const metrics = [
    { stat: l === 'fr' ? "×3,8" : "×3.8", label: t3(l, "ventes vs diffuseur classique", "sales vs traditional diffuser", "ventas vs difusor clásico") },
    { stat: "2 → 24+", label: t3(l, "flacons/an par client équipé", "bottles/year per equipped customer", "frascos/año por cliente equipado") },
    { stat: t3(l, "Revenus +", "Revenue +", "Ingresos +"), label: t3(l, "grâce aux modules de diffusion", "thanks to diffusion modules", "gracias a los módulos de difusión") },
  ];

  const ctaText = t3(l, 'Voir les scénarios et études de cas en détail', 'View scenarios and case studies in detail', 'Ver escenarios y casos de estudio en detalle');

  return (
    <section id="case-study" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Résultats clients', 'Client results', 'Resultados de clientes')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Ce que nos clients professionnels observent déjà avec Tolia', 'What our professional clients are already seeing with Tolia', 'Lo que nuestros clientes profesionales ya observan con Tolia')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div className="lg:col-span-2 rounded-3xl overflow-hidden" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={toliaCaseStudy} alt={t3(l, "Diffuseur Tolia en contexte professionnel – résultats clients avec ventes 3,8× supérieures aux diffuseurs traditionnels", "Tolia diffuser in professional context, client results with 3.8× higher sales than traditional diffusers", "Difusor Tolia en contexto profesional, resultados de clientes con ventas 3,8× superiores a los difusores tradicionales")} className="w-full h-full object-cover rounded-3xl no-select" draggable={false} loading="lazy" decoding="async" />
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div className="grid sm:grid-cols-3 gap-4 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              {metrics.map((m, i) => (
                <motion.div key={i} className="text-center p-5 rounded-2xl border bg-card" style={{ borderColor: 'hsl(28 45% 48% / 0.2)' }} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <p className="text-2xl font-bold mb-1" style={{ color: 'hsl(28 45% 42%)' }}>{m.stat}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border/50">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                  <TrendingUp className="w-4 h-4" style={{ color: 'hsl(28 45% 42%)' }} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t3(l,
                    <>Plusieurs de nos clients professionnels ont structuré leur offre autour de Tolia, en combinant le diffuseur avec des coffrets de synergies et des modules de diffusion supplémentaires. Dès le lancement, Tolia a généré des ventes <strong className="text-foreground">3,8 fois supérieures à leurs diffuseurs traditionnels</strong>.</>,
                    <>Several of our professional clients have structured their offering around Tolia, combining the diffuser with blend gift sets and additional diffusion modules. From launch, Tolia generated sales <strong className="text-foreground">3.8 times higher than their traditional diffusers</strong>.</>,
                    <>Varios de nuestros clientes profesionales han estructurado su oferta en torno a Tolia, combinando el difusor con estuches de sinergias y módulos de difusión adicionales. Desde el lanzamiento, Tolia generó ventas <strong className="text-foreground">3,8 veces superiores a sus difusores tradicionales</strong>.</>
                  )}
                </p>
              </div>

              <div className="flex gap-4 p-5 bg-card rounded-2xl border border-border/50">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                  <BarChart3 className="w-4 h-4" style={{ color: 'hsl(28 45% 42%)' }} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t3(l,
                    <>Lorsque cette approche est complétée par des routines clairement définies, des coffrets saisonniers et une communication régulière, le volume annuel peut passer de <strong className="text-foreground">2 achats ponctuels à plus de 24 flacons par an</strong>.</>,
                    <>When this approach is complemented by clearly defined routines, seasonal gift sets and regular communication, annual volume can rise from <strong className="text-foreground">2 one-off purchases to over 24 bottles per year</strong>.</>,
                    <>Cuando este enfoque se complementa con rutinas claramente definidas, estuches estacionales y comunicación regular, el volumen anual puede pasar de <strong className="text-foreground">2 compras puntuales a más de 24 frascos por año</strong>.</>
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'case-study')}>
              <Button className="btn-hero-primary group">
                {ctaText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
