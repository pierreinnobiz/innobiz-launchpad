import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const SocialProofBar: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      value: '100K+',
      label: t3(language, 'unités vendues en 7 mois', 'units sold in 7 months', 'unidades vendidas en 7 meses'),
    },
    {
      value: '×4 to ×6',
      label: t3(language, "consommation d'HE par client", 'oil consumption per customer', 'consumo de AE por cliente'),
    },
    {
      value: '×4',
      label: t3(language, 'revenu par client par an', 'revenue per customer per year', 'ingresos por cliente al año'),
    },
  ];

  return (
    <section className="w-full py-6 md:py-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 10%) 0%, hsl(25 18% 14%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-2 text-center sm:text-left">
              <span className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(28 50% 60%)' }}>{s.value}</span>
              <span className="text-xs md:text-sm text-white/50 font-light">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
