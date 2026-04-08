import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Home, Zap, Clock, Volume2, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const slideBlur: Variants = {
  hidden: { opacity: 0, x: -25, filter: 'blur(5px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const ClientBenefitsSection: React.FC = () => {
  const { language: l } = useLanguage();

  const benefits = [
    { icon: Home, text: t3(l, "Un seul diffuseur, toute la maison : salle de bains, salon, chambre, bureau.", "One diffuser, the whole house: bathroom, living room, bedroom, office.", "Un solo difusor, toda la casa: baño, salón, dormitorio, oficina.") },
    { icon: Zap, text: t3(l, "Changement de synergie en une seconde grâce à Twist & Mist, sans eau ni nettoyage.", "Blend change in a second thanks to Twist & Mist, with no water or cleaning.", "Cambio de sinergia en un segundo gracias a Twist & Mist, sin agua ni limpieza.") },
    { icon: Clock, text: t3(l, "Des routines claires : énergie le matin, ambiance sensorielle dans la journée, sommeil le soir.", "Clear routines: energy in the morning, sensory ambience during the day, sleep in the evening.", "Rutinas claras: energía por la mañana, ambiente sensorial durante el día, sueño por la noche.") },
    { icon: Volume2, text: t3(l, "Une expérience silencieuse et sans contraintes, qui s'intègre aux gestes du quotidien.", "A silent, hassle-free experience that fits seamlessly into daily habits.", "Una experiencia silenciosa y sin restricciones, que se integra en los gestos del día a día.") },
    { icon: Heart, text: t3(l, "Une relation plus riche à l'aromathérapie, centrée sur les moments de vie plutôt que sur un objet technique.", "A richer relationship with aromatherapy, centred on life moments rather than a technical device.", "Una relación más rica con la aromaterapia, centrada en los momentos de la vida en lugar de un dispositivo técnico.") },
  ];

  return (
    <section id="benefices" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(35 30% 97%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Expérience utilisateur', 'User experience', 'Experiencia de usuario')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Ce que Tolia change dans la vie de vos clients', 'What Tolia changes in your customers\' lives', 'Lo que Tolia cambia en la vida de sus clientes')}
          </h2>
        </motion.div>

        <motion.div className="max-w-3xl mx-auto space-y-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {benefits.map((b, i) => (
            <motion.div key={i} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border/50" variants={slideBlur} whileHover={{ y: -4, boxShadow: '0 16px 32px -8px hsl(28 45% 48% / 0.12)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                <b.icon className="w-5 h-5" style={{ color: 'hsl(28 45% 42%)' }} />
              </div>
              <p className="text-foreground/90 leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(t3(l, 'Voir comment intégrer Tolia', 'See how to integrate Tolia', 'Ver cómo integrar Tolia'), 'client-benefits')}>
              <Button className="btn-hero-primary group">
                {t3(l, 'Voir comment intégrer Tolia à votre gamme', 'See how to integrate Tolia into your range', 'Vea cómo integrar Tolia en su gama')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientBenefitsSection;
