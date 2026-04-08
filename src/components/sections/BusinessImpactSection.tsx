import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Package, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

const BusinessImpactSection: React.FC = () => {
  const { language: l } = useLanguage();

  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  const pillars = [
    { icon: RefreshCw, title: t3(l, "Récurrence & rotation des huiles essentielles", "Recurring revenue & essential oil rotation", "Recurrencia y rotación de aceites esenciales"), points: [t3(l, "2,8 flacons/an en moyenne avec un diffuseur traditionnel.", "2.8 bottles/year on average with a traditional diffuser.", "2,8 frascos/año de media con un difusor tradicional."), t3(l, "Potentiel 12–24 flacons/an par client équipé d'un Tolia avec programme complet (routines + communication + coffrets).", "Potential 12–24 bottles/year per customer equipped with a Tolia and a full programme (routines + communication + gift sets).", "Potencial de 12–24 frascos/año por cliente equipado con Tolia y un programa completo (rutinas + comunicación + estuches).")] },
    { icon: Package, title: t3(l, "Simplification catalogue & montée en gamme", "Catalogue simplification & premiumisation", "Simplificación del catálogo y premiumización"), points: [t3(l, "Un seul modèle de diffuseur pour couvrir l'ensemble du spectre aromathérapie + parfums d'intérieur.", "A single diffuser model to cover the entire aromatherapy + home fragrance spectrum.", "Un solo modelo de difusor para cubrir todo el espectro de aromaterapia + fragancias para el hogar."), t3(l, "Moins de références matérielles, plus de valeur ajoutée sur les synergies et coffrets.", "Fewer hardware SKUs, more added value on blends and gift sets.", "Menos referencias de hardware, más valor añadido en sinergias y estuches.")] },
    { icon: TrendingUp, title: t3(l, "Revenus additionnels & fidélité", "Additional revenue & loyalty", "Ingresos adicionales y fidelidad"), points: [t3(l, "Modules de diffusion supplémentaires comme source de revenus additionnels.", "Extra diffusion modules as a source of additional revenue.", "Módulos de difusión adicionales como fuente de ingresos extra."), t3(l, "Coffrets saisonniers & programmes de routines pour entretenir l'usage et réduire le churn.", "Seasonal gift sets & routine programmes to maintain usage and reduce churn.", "Estuches estacionales y programas de rutinas para mantener el uso y reducir la deserción.")] },
  ];

  return (
    <section id="impact" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      <div className="section-container text-white">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {t3(l, 'Impact financier', 'Financial impact', 'Impacto financiero')}
          </span>
          <h2 className="heading-section mb-4 text-white">
            {t3(l, 'Ce que Tolia change pour vos résultats financiers', 'What Tolia changes for your financial results', 'Lo que Tolia cambia para sus resultados financieros')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {pillars.map((p, i) => (
            <TiltCard key={i} className="rounded-2xl" glare={true}>
              <motion.div className="rounded-2xl p-8 border h-full" style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
                  <p.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
                </div>
                <h3 className="font-bold text-lg mb-4">{p.title}</h3>
                <ul className="space-y-3">
                  {p.points.map((pt, j) => (
                    <li key={j} className="text-sm leading-relaxed" style={{ color: 'hsl(35 20% 72%)' }}>• {pt}</li>
                  ))}
                </ul>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div className="rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center border" style={{ background: 'hsl(28 40% 18% / 0.5)', borderColor: 'hsl(28 50% 65% / 0.25)' }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="text-2xl font-bold mb-4 text-white">
            {t3(l, 'Découvrir votre potentiel de récurrence avec Tolia', 'Discover your recurring-revenue potential with Tolia', 'Descubra su potencial de recurrencia con Tolia')}
          </h3>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'impact')}>
              <Button className="font-semibold group" style={{ background: 'hsl(28 45% 52%)', color: 'hsl(35 30% 97%)' }}>
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessImpactSection;
