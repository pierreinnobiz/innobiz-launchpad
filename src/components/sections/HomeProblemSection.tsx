import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import LegacyAnchors from '@/components/LegacyAnchors';

/** Le constat : une seule idée (le placard), en quelques mots. Remplace « Syndrome du placard » + « Pourquoi les diffuseurs échouent ». */
const HomeProblemSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="probleme" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <LegacyAnchors ids={['closet-syndrome', 'friction-by-tech']} />
      <motion.div
        className="max-w-3xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeBlurUp}
      >
        <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
          {t3(language, 'Le constat', 'The problem', 'El problema')}
        </span>
        <h2 className="heading-section text-foreground mb-6" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {t3(
            language,
            'Plus de la moitié des diffuseurs finissent dans un placard.',
            'More than half of diffusers end up in a cupboard.',
            'Más de la mitad de los difusores acaban en un armario.'
          )}
        </h2>
        <p className="text-body-lg mb-6">
          {t3(
            language,
            'Remplir, doser, nettoyer : trop d’efforts. Le diffuseur s’arrête, et les rachats d’huiles avec lui.',
            'Filling, measuring, cleaning: too much effort. The diffuser stops, and so do the oil repurchases.',
            'Llenar, dosificar, limpiar: demasiado esfuerzo. El difusor se detiene y, con él, la recompra de aceites.'
          )}
        </p>
        <p className="text-lg md:text-xl font-semibold text-foreground">
          {t3(
            language,
            'Tolia supprime l’effort : un appui, et l’huile se diffuse.',
            'Tolia removes the effort: one touch, and the oil diffuses.',
            'Tolia elimina el esfuerzo: una pulsación y el aceite se difunde.'
          )}
        </p>
      </motion.div>
    </section>
  );
};

export default HomeProblemSection;
