import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const SlideInCTA: React.FC = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('slide_in_dismissed')) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = (window.scrollY / scrollHeight) * 100;
      if (percent > 60 && !dismissed) setVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem('slide_in_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 w-[320px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl border border-border/50 p-5 hidden lg:block"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <p className="text-sm font-bold text-foreground mb-1.5">
            {t3(language, 'Prêt à découvrir Tolia ?', 'Ready to discover Tolia?', '¿Listo para descubrir Tolia?')}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            {t3(language, 'Recevez un échantillon gratuit et un deck partenaires.', 'Get a free sample and brand partner deck.', 'Reciba una muestra gratuita y un deck de socios.')}
          </p>
          <a href="#contact" onClick={() => { trackCTAClick('slide_in_cta', 'slide-in'); handleDismiss(); }}>
            <Button className="w-full btn-hero-primary group text-sm h-10">
              {t3(language, 'Demander mon kit', 'Request my kit', 'Solicitar mi kit')}
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideInCTA;
