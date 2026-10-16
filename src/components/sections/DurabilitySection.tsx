import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BatteryCharging, Layers, Leaf, Repeat, Scale, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import LegacyAnchors from '@/components/LegacyAnchors';

// Rendu 3D réalisé avec Blender à partir des fichiers STP (16/10/2026) : cloche, base, pièces internes, module et flacon posés séparément sur une table.
// Il remplace l'image de synthèse de l'ancien site (carte électronique avec port HDMI, diffuseur qui n'était pas le Tolia).
const IMG = `${import.meta.env.BASE_URL}journee/img/durabilite_demontage_3d.webp`;

/**
 * Durabilité et réparabilité : un argument fort pour les grandes marques d'aromathérapie (engagements RSE).
 * Textes repris de l'ancien site (section RSE et réponse RSE de la FAQ), sans chiffre nouveau.
 */
const DurabilitySection: React.FC = () => {
  const { language } = useLanguage();

  const items: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: Layers,
      title: t3(language, 'Modulaire', 'Modular', 'Modular'),
      text: t3(
        language,
        'Coque, module de diffusion, électronique, batterie : chaque partie se remplace sans changer tout l’appareil. Sans verre fragile, sans eau stagnante ni pompe, il y a moins de pièces qui cassent, donc moins de retours à gérer.',
        'Shell, diffusion module, electronics, battery: every part can be replaced without changing the whole device. With no fragile glass, no stagnant water and no pump, fewer parts break, so fewer returns to manage.',
        'Carcasa, módulo de difusión, electrónica, batería: cada parte se puede reemplazar sin cambiar todo el dispositivo. Sin vidrio frágil, sin agua estancada ni bomba, hay menos piezas que se rompen y, por tanto, menos devoluciones que gestionar.'
      ),
    },
    {
      icon: BatteryCharging,
      title: t3(language, 'Batterie remplaçable', 'Replaceable battery', 'Batería reemplazable'),
      text: t3(
        language,
        'Par l’utilisateur, avec un système de diagnostic pour identifier et remplacer les pièces une à une.',
        'User-replaceable, with a diagnostic system to identify and replace individual parts.',
        'Reemplazable por el usuario, con un sistema de diagnóstico para identificar y sustituir piezas individuales.'
      ),
    },
    {
      icon: Repeat,
      title: t3(language, 'Un diffuseur qui reste utilisé', 'A diffuser that stays in use', 'Un difusor que se sigue usando'),
      text: t3(
        language,
        'Sans eau, sans nettoyage, avec un changement d’huile en une seconde, Tolia évite le « syndrome du placard » : il s’intègre aux routines quotidiennes au lieu de finir oublié dans un tiroir.',
        'With no water, no cleaning and an oil change in a second, Tolia avoids the “cupboard syndrome”: it fits into daily routines rather than ending up forgotten in a drawer.',
        'Sin agua, sin limpieza y con cambio de aceite en un segundo, Tolia evita el «síndrome del armario»: se integra en las rutinas diarias en lugar de acabar olvidado en un cajón.'
      ),
    },
    {
      icon: Scale,
      title: t3(language, 'En phase avec l’Europe', 'In step with Europe', 'En línea con Europa'),
      text: t3(
        language,
        'Cette approche s’aligne avec les politiques européennes en faveur du droit à la réparation et des produits plus durables, un critère de plus en plus important dans les décisions d’achat.',
        'This approach aligns with European policies promoting the right to repair and more durable products, an increasingly important criterion in purchasing decisions.',
        'Este enfoque se alinea con las políticas europeas a favor del derecho a la reparación y de productos más duraderos, un criterio cada vez más importante en las decisiones de compra.'
      ),
    },
  ];

  const cta = t3(language, 'Recevez votre échantillon gratuit', 'Get your free sample', 'Reciba su muestra gratis');

  return (
    <section id="durabilite" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <LegacyAnchors ids={['rse']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="inline-flex items-center gap-2 font-semibold text-sm tracking-wide uppercase mb-4" style={{ color: 'hsl(145 35% 32%)' }}>
            <Leaf className="h-4 w-4" aria-hidden="true" />
            {t3(language, 'Durabilité & réparabilité', 'Durability & repairability', 'Durabilidad y reparabilidad')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(language, 'Un diffuseur pensé pour durer… et se réparer', 'A diffuser designed to last… and to be repaired', 'Un difusor diseñado para durar… y ser reparado')}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t3(
              language,
              'En Europe, une large majorité de consommateurs déclarent vouloir des produits plus durables et réparables, et cette attente progresse chaque année. Tolia a été conçu dans cette logique : un diffuseur qui reste utilisé et qui peut être réparé au lieu d’être jeté.',
              'Across Europe, a large majority of consumers say they want more durable and repairable products, and this expectation grows every year. Tolia was designed with this in mind: a diffuser that stays in use and can be repaired rather than thrown away.',
              'En Europa, una gran mayoría de consumidores declaran querer productos más duraderos y reparables, y esta expectativa crece cada año. Tolia fue diseñado con esta lógica: un difusor que se sigue usando y que puede repararse en lugar de tirarse.'
            )}
          </p>
        </motion.div>

        <motion.figure
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-xl border border-border/40 bg-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeBlurUp}
        >
          <img
            src={IMG}
            width={1600}
            height={921}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
            alt={t3(
              language,
              'Tolia démonté, rendu 3D issu de nos fichiers de conception : la cloche, la base, les pièces internes, le module de diffusion et le flacon sont posés séparément sur une table en chêne',
              'Tolia disassembled, 3D render from our design files: the cover, base, internal parts, diffusion module and bottle laid out separately on an oak table',
              'Tolia desmontado, render 3D a partir de nuestros archivos de diseño: la cubierta, la base, las piezas internas, el módulo de difusión y el frasco dispuestos por separado sobre una mesa de roble'
            )}
          />
        </motion.figure>

        <motion.ul
          className="mx-auto mt-10 grid max-w-5xl gap-x-10 gap-y-7 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {items.map((it, i) => (
            <motion.li key={i} className="flex gap-4" variants={fadeBlurUp}>
              <span
                className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full"
                style={{ background: 'hsl(145 35% 38% / 0.12)', color: 'hsl(145 35% 30%)' }}
                aria-hidden="true"
              >
                <it.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground text-lg leading-snug">{it.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-1">{it.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-12 md:mt-14 mx-auto max-w-3xl rounded-2xl border border-border/50 bg-card px-6 py-6 md:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeBlurUp}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t3(language, 'Pour votre marque', 'For your brand', 'Para su marca')}
          </p>
          <p className="mt-2 text-lg md:text-xl font-semibold text-foreground leading-snug" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(
              language,
              'Un produit utilisé quotidiennement pendant des années ne devient jamais un déchet dormant. C’est le meilleur argument RSE que vous puissiez avoir.',
              'A product used daily for years never becomes dormant waste, which is the strongest CSR story you can tell.',
              'Un producto usado diariamente durante años nunca se convierte en residuo inactivo, que es la historia de RSE más fuerte que puede contar.'
            )}
          </p>
          <a
            href="#contact"
            onClick={() => trackCTAClick(cta, 'durabilite', 'sample_durabilite')}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-xs italic text-muted-foreground/70">
            {t3(
              language,
              'Sources : études et positions européennes sur durabilité et réparabilité des produits.',
              'Sources: European studies and policies on product durability and repairability.',
              'Fuentes: estudios y políticas europeas sobre durabilidad y reparabilidad de productos.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DurabilitySection;
