import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Leaf, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import toliaRse from '@/assets/tolia-rse.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const RSESection: React.FC = () => {
  const { language: l } = useLanguage();

  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  return (
    <section id="rse" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(30 25% 93%) 100%)' }}>
      <div className="section-container">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(145 35% 38% / 0.1)' }}>
              <Leaf className="w-5 h-5" style={{ color: 'hsl(145 35% 38%)' }} />
            </div>
            <span className="font-semibold text-sm tracking-wide uppercase" style={{ color: 'hsl(145 35% 38%)' }}>
              {t3(l, 'Engagement RSE : durabilité & réparabilité', 'CSR commitment: durability & repairability', 'Compromiso RSE: durabilidad y reparabilidad')}
            </span>
          </div>

          <h2 className="heading-section mb-8">
            {t3(l, 'Un diffuseur pensé pour durer… et se réparer', 'A diffuser designed to last… and to be repaired', 'Un difusor diseñado para durar… y ser reparado')}
          </h2>

          <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
            <p>{t3(l, 'En Europe, une large majorité de consommateurs déclarent vouloir des produits plus durables et réparables, et cette attente progresse chaque année. Tolia a été conçu dans cette logique : un diffuseur qui reste utilisé et qui peut être réparé au lieu d\'être jeté.', 'Across Europe, a large majority of consumers say they want more durable and repairable products, and this expectation grows every year. Tolia was designed with this in mind: a diffuser that stays in use and can be repaired rather than thrown away.', 'En Europa, una gran mayoría de consumidores declaran querer productos más duraderos y reparables, y esta expectativa crece cada año. Tolia fue diseñado con esta lógica: un difusor que se sigue usando y que puede repararse en lugar de tirarse.')}</p>
            <p>{t3(l, 'En supprimant les frictions d\'usage (pas d\'eau, pas de nettoyage, changement d\'huile en une seconde), Tolia évite le "syndrome du placard" : il s\'intègre dans les routines quotidiennes plutôt que de finir oublié dans un tiroir.', 'By removing usage friction (no water, no cleaning, blend change in a second), Tolia avoids the "cupboard syndrome": it fits into daily routines rather than ending up forgotten in a drawer.', 'Al eliminar las fricciones de uso (sin agua, sin limpieza, cambio de aceite en un segundo), Tolia evita el "síndrome del armario": se integra en las rutinas diarias en lugar de acabar olvidado en un cajón.')}</p>
            <p>{t3(l, 'Son architecture modulaire permet de remplacer chaque partie – coque, module de diffusion, électronique, batterie – sans changer tout l\'appareil. Cette approche s\'aligne avec les politiques européennes en faveur du droit à la réparation et des produits plus durables, identifiées comme un critère de plus en plus important dans les décisions d\'achat.', 'Its modular architecture allows every part, shell, diffusion module, electronics, battery, to be replaced without changing the whole device. This approach aligns with European policies promoting the right to repair and more durable products, identified as an increasingly important criterion in purchasing decisions.', 'Su arquitectura modular permite reemplazar cada parte, carcasa, módulo de difusión, electrónica, batería. Sin cambiar todo el dispositivo. Este enfoque se alinea con las políticas europeas a favor del derecho a la reparación y productos más duraderos, identificado como un criterio cada vez más importante en las decisiones de compra.')}</p>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden">
            <img src={toliaRse} alt={t3(l, "Tolia démonté – architecture modulaire avec coque, module de diffusion, électronique et batterie remplaçables", "Tolia disassembled, modular architecture with replaceable shell, diffusion module, electronics and battery", "Tolia desmontado, arquitectura modular con carcasa, módulo de difusión, electrónica y batería reemplazables")} className="w-full h-auto object-cover no-select" draggable={false} loading="lazy" decoding="async" />
          </div>

          <p className="text-xs text-muted-foreground/60 mt-6 italic">
            {t3(l, 'Sources : études et positions européennes sur durabilité et réparabilité des produits.', 'Sources: European studies and policies on product durability and repairability.', 'Fuentes: estudios y políticas europeas sobre durabilidad y reparabilidad de productos.')}
          </p>

          <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'rse')}>
              <Button className="btn-hero-primary group">
                <Gift className="w-5 h-5" />
                {ctaText}
              </Button>
            </a>
          </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSESection;
