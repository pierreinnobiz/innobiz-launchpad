import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const SocialProofBar: React.FC = () => {
  const { language } = useLanguage();

  // Trois repères, tous issus des faits validés : 100 000+ diffuseurs dotés de notre technologie, 20 ans de métier, et le
  // point d'entrée « dès 500 pièces ». Pierre, 22/10/2026 : les 100 000 = ventes MISTI + Tolia additionnées, sans nommer l'un
  // ou l'autre (« dotés de notre technologie ») ; « livrés en 7 mois » retiré. CE et RoHS restent dans la FAQ.
  const stats = [
    {
      value: t3(language, '100\u00a0000+', '100,000+', '100.000+'),
      label: t3(language, 'diffuseurs dotés de notre technologie vendus dans le monde', 'diffusers using our technology sold worldwide', 'difusores con nuestra tecnología vendidos en todo el mundo'),
    },
    {
      value: t3(language, '20 ans', '20 years', '20 años'),
      label: t3(language, 'de métier dans la diffusion', 'in diffusion technology', 'de experiencia en difusión de aromas'),
    },
    {
      value: t3(language, 'Dès 500\u00a0pièces', 'From 500\u00a0units', 'Desde 500\u00a0unidades'),
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
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <li key={i} className="flex flex-col items-center gap-1 text-center">
              <span className="text-2xl lg:text-3xl font-bold leading-tight" style={{ color: 'hsl(28 50% 60%)' }}>{s.value}</span>
              <span className="text-xs md:text-sm text-white/80 font-light max-w-[15rem]">{s.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default SocialProofBar;
