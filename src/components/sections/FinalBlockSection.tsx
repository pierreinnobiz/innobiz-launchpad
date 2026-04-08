import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const FinalBlockSection: React.FC = () => {
  const { language: l } = useLanguage();
  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 10%) 100%)' }}>
      <div className="section-container text-white">
        <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-white">
            {t3(l, 'Tolia n\'est pas un diffuseur de plus dans un catalogue.', 'Tolia is not just another diffuser in a catalogue.', 'Tolia no es un difusor más en un catálogo.')}
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'hsl(35 20% 75%)' }}>
            {t3(l, 'C\'est une nouvelle façon de penser votre offre d\'huiles essentielles : moins de complexité dans votre gamme, plus de récurrence dans vos ventes, et une relation continue avec vos clients.', 'It\'s a new way of thinking about your essential oils offering: less complexity in your range, more recurring revenue from your sales, and a continuous relationship with your customers.', 'Es una nueva forma de pensar su oferta de aceites esenciales: menos complejidad en su gama, más recurrencia en sus ventas, y una relación continua con sus clientes.')}
          </p>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'final-block')}>
              <Button className="font-semibold text-base px-8 py-4 rounded-2xl group" style={{ background: 'hsl(28 45% 52%)', color: 'hsl(35 30% 97%)' }}>
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

export default FinalBlockSection;
