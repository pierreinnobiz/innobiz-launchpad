import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Search, Paintbrush, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import toliaPartnership from '@/assets/tolia-partnership.jpg';
import toliaMoodboard from '@/assets/tolia-moodboard.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 30, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

const PartnershipSection: React.FC = () => {
  const { language: l } = useLanguage();
  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  const steps = [
    { icon: Search, step: "01", title: t3(l, "Exploration & définition", "Exploration & definition", "Exploración y definición"), text: t3(l, "Définition de votre programme de routines : cibles, usages, moments de vie. Nous identifions ensemble les leviers de croissance les plus adaptés à votre marque.", "Defining your routine programme: targets, uses, life moments. Together, we identify the growth levers best suited to your brand.", "Definición de su programa de rutinas: objetivos, usos, momentos de vida. Juntos, identificamos las palancas de crecimiento más adecuadas para su marca.") },
    { icon: Paintbrush, step: "02", title: t3(l, "Design & branding", "Design & branding", "Diseño y branding"), text: t3(l, "Design et branding de votre Tolia : finition, identité, gammes de synergies et coffrets. Chaque détail est pensé pour refléter l'ADN de votre marque.", "Design and branding of your Tolia: finish, identity, blend ranges and gift sets. Every detail is crafted to reflect your brand DNA.", "Diseño y branding de su Tolia: acabado, identidad, gamas de sinergias y estuches. Cada detalle está pensado para reflejar el ADN de su marca.") },
    { icon: Rocket, step: "03", title: t3(l, "Lancement & suivi", "Launch & support", "Lanzamiento y seguimiento"), text: t3(l, "Kits de lancement, scénarios de communication, optimisation de la récurrence. Un accompagnement continu pour maximiser l'impact sur vos ventes.", "Launch kits, communication scenarios, recurrence optimisation. Ongoing support to maximise the impact on your sales.", "Kits de lanzamiento, escenarios de comunicación, optimización de la recurrencia. Acompañamiento continuo para maximizar el impacto en sus ventas.") },
  ];

  return (
    <section id="partenariat" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      <div className="section-container text-white">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {t3(l, 'Marque blanche & co-création', 'White label & co-creation', 'Marca blanca y co-creación')}
          </span>
          <h2 className="heading-section mb-4 text-white">
            {t3(l, 'Créons ensemble votre version exclusive du diffuseur Tolia, à vos couleurs', 'Let\'s create your exclusive version of the Tolia diffuser, in your colours', 'Creemos juntos su versión exclusiva del difusor Tolia, con sus colores')}
          </h2>
        </motion.div>

        <motion.div className="rounded-3xl overflow-hidden mb-14 max-w-4xl mx-auto aspect-[16/7]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <img src={toliaMoodboard} alt={t3(l, "Tolia moodboard – personnalisation couleurs, matériaux et finitions", "Tolia moodboard — colour, material and finish customisation", "Tolia moodboard — personalización de colores, materiales y acabados")} className="w-full h-full object-cover no-select" draggable={false} loading="lazy" decoding="async" />
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {steps.map((s, i) => (
            <TiltCard key={i} className="rounded-2xl" glare={true}>
              <motion.div className="rounded-2xl p-8 border relative h-full" style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }} variants={fadeUp}>
                <span className="text-5xl font-bold absolute top-6 right-6" style={{ color: 'hsl(28 50% 65% / 0.15)' }}>{s.step}</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
                  <s.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
                </div>
                <h3 className="font-bold text-lg mb-3 text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(35 20% 72%)' }}>{s.text}</p>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'partenariat')}>
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

export default PartnershipSection;
