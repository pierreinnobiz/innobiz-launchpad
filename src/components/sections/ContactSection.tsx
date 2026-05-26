import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import FastTrackDeckForm from '@/components/FastTrackDeckForm';
import QualificationForm from '@/components/QualificationForm';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="contact" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, hsl(28 45% 48%), transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Recevez votre échantillon', 'Get your sample', 'Reciba su muestra')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t3(language,
              'Jugez Tolia par vous-même.',
              'Judge Tolia for yourself.',
              'Juzgue Tolia por sí mismo.'
            )}
          </h2>
          <p className="text-base text-muted-foreground font-light max-w-2xl mx-auto">
            {t3(language,
              "Échantillon gratuit expédié de France sous 5 jours ouvrés. Aucun appel requis.",
              "Free sample shipped from France within 5 business days. No call required first.",
              'Muestra gratuita enviada desde Francia en 5 días hábiles. No se requiere llamada previa.'
            )}
          </p>
        </motion.div>

        <FastTrackDeckForm />

        <div className="text-center my-8">
          <p className="text-sm text-muted-foreground">
            {t3(
              language,
              'Ou dites-nous en plus sur votre projet →',
              'Or tell us more about your project →',
              'O cuéntenos más sobre su proyecto →'
            )}
          </p>
        </div>

        <motion.div
          className="bg-card rounded-3xl p-6 md:p-10 border border-border/50 shadow-lg"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <QualificationForm />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
