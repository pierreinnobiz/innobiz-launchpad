import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Cpu, Waves, Crosshair, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const TechExpertiseSection: React.FC = () => {
  const { language } = useLanguage();
  const en = language === 'en';

  const capabilities = en ? [
    "High-performance diffusion of virtually all compatible hydrosols.",
    "Diffusion of 99.8% of essential oils on the market.",
    "Diffusion of 100% of essential oil blends.",
    "Diffusion of 100% of home fragrances designed for this type of technology.",
  ] : [
    "Diffusion performante de la quasi-totalité des hydrolats compatibles.",
    "Diffusion de 99,8 % des huiles essentielles du marché.",
    "Diffusion de 100 % des synergies d'huiles essentielles.",
    "Diffusion de 100 % des parfums d'intérieur conçus pour ce type de technologie.",
  ];

  const disciplines = en ? [
    { icon: Waves, title: "Microfluidics", desc: "Adapting diffusion to very different textures." },
    { icon: Cpu, title: "Silent ultrasonics", desc: "Fine mist, with no noise or heat." },
    { icon: Crosshair, title: "Laser engineering", desc: "Optimised ceramic membranes." },
    { icon: Zap, title: "Embedded electronics", desc: "Fine-tuned control, minimal power consumption." },
  ] : [
    { icon: Waves, title: "Microfluidique", desc: "Adapter la diffusion à des textures très différentes." },
    { icon: Cpu, title: "Ultrasons silencieux", desc: "Brume fine, sans bruit ni chaleur." },
    { icon: Crosshair, title: "Ingénierie laser", desc: "Membranes céramiques optimisées." },
    { icon: Zap, title: "Électronique embarquée", desc: "Contrôle fin, consommation minimale." },
  ];

  return (
    <section id="technologie" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(220 15% 14%) 0%, hsl(220 12% 18%) 100%)' }}>
      <div className="section-container text-white">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {en ? 'Technological superiority' : 'Supériorité technologique'}
          </span>
          <h2 className="heading-section mb-4 text-white">
            {en ? 'Tolia: 20 years designing proprietary diffusion systems, distilled into one device' : 'Tolia, le concentré de 20 ans de conception de systèmes de diffusion propriétaires'}
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
            {en ? 'Tolia is the culmination of 20 years designing proprietary diffusion systems for the fragrance and wellness industry. No diffuser currently on the market combines this level of performance and versatility.' : 'Tolia est l\'aboutissement de 20 ans de conception de systèmes de diffusion propriétaires pour l\'industrie du parfum et du bien-être. Aucun diffuseur actuellement sur le marché ne combine ce niveau de performance et de polyvalence.'}
          </p>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((c, i) => (
              <motion.div key={i} className="rounded-2xl p-5 border" style={{ background: 'hsl(28 50% 65% / 0.06)', borderColor: 'hsl(28 50% 65% / 0.15)' }} variants={fadeBlur}>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(35 20% 78%)' }}>✓ {c}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-12" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {disciplines.map((d, i) => (
            <motion.div key={i} className="text-center p-6 rounded-2xl border" style={{ background: 'hsl(220 15% 20% / 0.5)', borderColor: 'hsl(28 50% 65% / 0.12)' }} variants={scaleIn} whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 18 } }}>
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'hsl(28 50% 65% / 0.12)' }}>
                <d.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
              </div>
              <h4 className="font-bold text-sm mb-1">{d.title}</h4>
              <p className="text-xs" style={{ color: 'hsl(35 20% 68%)' }}>{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p className="text-center max-w-3xl mx-auto leading-relaxed" style={{ color: 'hsl(35 20% 75%)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          {en ? 'This combination of expertise enables Tolia to deliver a level of perfection rarely achieved: a single diffuser covering an exceptionally broad palette of essential oils, blends, compatible hydrosols and home fragrances.' : 'Cette combinaison de savoir-faire permet à Tolia d\'offrir un niveau de perfection rarement atteint : un seul diffuseur pour couvrir une très large palette d\'huiles essentielles, de synergies, d\'hydrolats compatibles et de parfums d\'intérieur.'}
        </motion.p>
      </div>
    </section>
  );
};

export default TechExpertiseSection;
