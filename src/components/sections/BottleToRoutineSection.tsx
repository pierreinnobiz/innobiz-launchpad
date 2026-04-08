import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const BottleToRoutineSection: React.FC = () => {
  const { language: l } = useLanguage();

  const blocks = [
    { title: t3(l, "Des routines, pas des achats ponctuels", "Routines, not one-off purchases", "Rutinas, no compras puntuales"), text: t3(l, "Avec Tolia, chaque moment de la journée a sa synergie : énergie le matin, concentration en journée, détente le soir. Trois routines par jour, c'est trois fois plus d'heures de diffusion, et une rotation de vos synergies qui augmente mécaniquement.", "With Tolia, every moment of the day has its blend: energy in the morning, focus during the day, relaxation in the evening. Three routines a day means three times more diffusion hours, and a blend rotation that mechanically increases.", "Con Tolia, cada momento del día tiene su sinergia: energía por la mañana, concentración durante el día, relajación por la noche. Tres rutinas al día significan tres veces más horas de difusión, y una rotación de sinergias que aumenta mecánicamente.") },
    { title: t3(l, "Twist & Mist : le changement en une seconde", "Twist & Mist: switching in a second", "Twist & Mist: el cambio en un segundo"), text: t3(l, "Changer de synergie sans eau, sans rinçage, sans réglage : c'est la rupture technique qui rend ce modèle viable. Vos clients adaptent Tolia à chaque pièce sans effort. La routine d'aromathérapie devient un plaisir, pas une contrainte.", "Changing blends without water, rinsing or adjustments: this is the technical breakthrough that makes the model viable. Your customers adapt Tolia to each room effortlessly. The aromatherapy routine becomes a pleasure, not a chore.", "Cambiar de sinergia sin agua, sin enjuague, sin ajustes: es la ruptura técnica que hace viable este modelo. Sus clientes adaptan Tolia a cada habitación sin esfuerzo. La rutina de aromaterapia se convierte en un placer, no en una obligación.") },
    { title: t3(l, "Des synergies saisonnières pour un diffuseur utilisé toute l'année", "Seasonal blends that keep your diffuser in use all year", "Sinergias estacionales para un difusor usado todo el año"), text: t3(l, "Proposez des coffrets de trois synergies adaptées aux saisons : confort en hiver, fraîcheur en été, focus à la rentrée. Chaque nouveau coffret relance l'intérêt, nourrit la relation client et maintient Tolia au cœur du quotidien.", "Offer three-blend gift sets tailored to the seasons: comfort in winter, freshness in summer, focus at back-to-school. Each new set reignites interest, nurtures the customer relationship and keeps Tolia at the heart of daily life.", "Ofrezca estuches de tres sinergias adaptadas a las estaciones: confort en invierno, frescura en verano, concentración en la vuelta al cole. Cada nuevo estuche reaviva el interés, nutre la relación con el cliente y mantiene Tolia en el centro de la vida diaria.") },
  ];

  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  return (
    <section id="routine" className="section-padding relative overflow-hidden" style={{ background: 'hsl(35 30% 96%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Changement de modèle', 'A shift in model', 'Cambio de modelo')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(l, 'Vos clients ne rangent plus leur diffuseur : ils l\'utilisent matin, midi et soir', 'Your customers no longer put their diffuser away: they use it morning, noon and night', 'Sus clientes ya no guardan su difusor: lo usan mañana, tarde y noche')}
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            {t3(l, 'Aujourd\'hui, les contraintes techniques, eau, nettoyage, bruit, freinent l\'usage. Résultat : vos synergies finissent au placard. Tolia change la donne.', 'Today, technical constraints, water, cleaning, noise, hold back usage. The result: your blends end up forgotten in a cupboard. Tolia changes the game.', 'Hoy, las limitaciones técnicas, agua, limpieza, ruido, frenan el uso. Resultado: sus sinergias acaban en el armario. Tolia cambia las reglas del juego.')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {blocks.map((block, i) => (
            <motion.div key={i} className="flex gap-5 p-6 bg-card rounded-2xl border border-border/50" initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                <Sparkles className="w-5 h-5" style={{ color: 'hsl(28 45% 42%)' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'bottle-to-routine')}>
              <Button className="btn-hero-primary group">
                {ctaText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BottleToRoutineSection;
