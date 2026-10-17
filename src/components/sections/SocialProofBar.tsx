import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const SocialProofBar: React.FC = () => {
  const { language } = useLanguage();

  // Trois repères, tous issus des faits validés : 100 000+ unités, 20 ans de métier, et le point d'entrée « dès 500 pièces »
  // (cycle 3 du test : « déjà vendu en Europe » était dit juste au-dessus, sous les boutons ; CE et RoHS restent dans la FAQ).
  const stats = [
    {
      value: t3(language, '100 000+', '100,000+', '100.000+'),
      label: t3(language, 'unités vendues en 7 mois', 'units sold in 7 months', 'unidades vendidas en 7 meses'),
    },
    {
      value: t3(language, '20 ans', '20 years', '20 años'),
      label: t3(language, 'de métier dans la diffusion', 'in diffusion technology', 'de experiencia en difusión de aromas'),
    },
    {
      value: t3(language, 'Dès 500 pièces', 'From 500 units', 'Desde 500 unidades'),
      label: t3(language, 'en commande sur stock', 'as a stock order', 'en pedido de stock'),
    },
  ];

  return (
    <section
      className="w-full py-6 md:py-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 10%) 0%, hsl(25 18% 14%) 100%)' }}
      aria-label={t3(language, 'Chiffres clés', 'Key figures', 'Cifras clave')}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.ul
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-12 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <li key={i} className="flex items-baseline gap-2 text-center sm:text-left">
              <span className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(28 50% 60%)' }}>{s.value}</span>
              <span className="text-xs md:text-sm text-white/80 font-light">{s.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default SocialProofBar;
