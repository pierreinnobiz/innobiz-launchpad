import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BatteryCharging, Layers, Leaf, Repeat, Scale, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import LegacyAnchors from '@/components/LegacyAnchors';

// Image de l'ancien site (vue éclatée), reprise à la demande de Pierre le 17/10/2026 : il la préfère au rendu 3D fait avec Blender.
// Elle sera remplacée par sa photo réelle du diffuseur démonté (photo n° 9 du guide PHOTOS-A-PRENDRE.md).
const IMG = `${import.meta.env.BASE_URL}journee/img/durabilite_demontage_3d.webp`;
// 20/10/2026 : vrai rendu 3D du Tolia démonté (fichiers STP, Blender) à la place de l'image IA de l'ancien site, qui montrait
// un autre diffuseur (bleu tressé, carte électronique et batterie génériques).

/**
 * Durabilité et réparabilité : un argument fort pour les grandes marques d'aromathérapie (engagements RSE).
 * Image à gauche, quatre points à droite, puis le message « Pour votre marque » sur une ligne.
 */
const DurabilitySection: React.FC = () => {
  const { language } = useLanguage();

  const items: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: Layers,
      title: t3(language, 'Modulaire', 'Modular', 'Modular'),
      text: t3(
        language,
        'Cloche, module de diffusion, électronique, batterie : chaque partie se remplace sans changer tout l’appareil. Sans verrerie fragile à l’intérieur, sans eau stagnante ni pompe, il y a moins de pièces qui cassent, donc moins de retours à gérer.',
        'Cover, diffusion module, electronics, battery: every part can be replaced without changing the whole device. With no fragile glassware inside, no stagnant water and no pump, fewer parts break, so fewer returns to manage.',
        'Cubierta, módulo de difusión, electrónica, batería: cada parte se puede reemplazar sin cambiar todo el dispositivo. Sin piezas de vidrio frágiles en su interior, sin agua estancada ni bomba, hay menos piezas que se rompen y, por tanto, menos devoluciones que gestionar.'
      ),
    },
    {
      icon: BatteryCharging,
      title: t3(language, 'Batterie remplaçable', 'Replaceable battery', 'Batería reemplazable'),
      text: t3(
        language,
        'L’utilisateur peut changer lui-même la batterie, et un système de diagnostic aide à repérer la pièce à remplacer.',
        'Users can change the battery themselves, and a diagnostic system helps identify the part to replace.',
        'El propio usuario puede cambiar la batería, y un sistema de diagnóstico ayuda a localizar la pieza que hay que sustituir.'
      ),
    },
    {
      icon: Repeat,
      title: t3(language, 'Un diffuseur qui reste utilisé', 'A diffuser that stays in use', 'Un difusor que se sigue usando'),
      text: t3(
        language,
        'Sans eau, sans nettoyage, avec un changement d’huile en une seconde, Tolia est conçu pour éviter le « syndrome du placard » : il s’intègre aux routines quotidiennes.',
        'With no water, no cleaning and an oil change in a second, Tolia is designed to stay out of the cupboard: it fits into daily routines.',
        'Sin agua, sin limpieza y con cambio de aceite en un segundo, Tolia está diseñado para evitar el «síndrome del armario»: se integra en las rutinas diarias.'
      ),
    },
    {
      icon: Scale,
      title: t3(language, 'En phase avec l’Europe', 'In step with Europe', 'En línea con Europa'),
      text: t3(
        language,
        'Cette approche va dans le sens des règles européennes sur le droit à la réparation et les produits durables, un critère qui compte de plus en plus dans les décisions d’achat.',
        'This approach aligns with European policies promoting the right to repair and more durable products, an increasingly important criterion in purchasing decisions.',
        'Este enfoque se alinea con las políticas europeas a favor del derecho a la reparación y de productos más duraderos, un criterio cada vez más importante en las decisiones de compra.'
      ),
    },
  ];

  const cta = t3(language, 'Recevoir mon échantillon gratuit', 'Get my free sample', 'Recibir mi muestra gratuita');

  return (
    <section id="durabilite" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
      <LegacyAnchors ids={['rse']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
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
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t3(
              language,
              'En Europe, les consommateurs attendent de plus en plus des produits qui durent et qui se réparent. Tolia a été conçu dans cette logique : un diffuseur qui reste utilisé et qui peut être réparé au lieu d’être jeté.',
              'Across Europe, consumers increasingly expect products that last and can be repaired. Tolia was designed with this in mind: a diffuser that stays in use and can be repaired rather than thrown away.',
              'En Europa, los consumidores esperan cada vez más productos que duren y se puedan reparar. Tolia se diseñó con esta lógica: un difusor que se sigue usando y que puede repararse en lugar de tirarse.'
            )}
          </p>
        </motion.div>

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
          <motion.figure
            className="overflow-hidden rounded-3xl shadow-xl border border-border/40 bg-card"
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
                'Le Tolia démonté, posé sur une table : cloche, base, pièces intérieures, module de diffusion, flacon et petites pièces',
                'Tolia taken apart on a table: cover, base, internal parts, diffusion module, bottle and small parts',
                'Tolia desmontado sobre una mesa: campana, base, piezas internas, módulo de difusión, frasco y piezas pequeñas'
              )}
            />
            <figcaption className="px-4 py-2.5 text-xs text-muted-foreground">
              {t3(
                language,
                'Rendu issu des fichiers 3D du Tolia : chaque pièce se démonte et se remplace.',
                'Rendered from Tolia’s 3D files: every part comes apart and can be replaced.',
                'Imagen generada a partir de los archivos 3D de Tolia: cada pieza se desmonta y se sustituye.'
              )}
            </figcaption>
          </motion.figure>

          <motion.ul
            className="grid gap-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {items.map((it) => (
              <motion.li key={it.title} className="flex gap-4" variants={fadeBlurUp}>
                <span
                  className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full"
                  style={{ background: 'hsl(145 35% 38% / 0.12)', color: 'hsl(145 35% 30%)' }}
                  aria-hidden="true"
                >
                  <it.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-base md:text-lg leading-snug">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{it.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="mt-10 rounded-2xl border border-border/50 bg-card px-6 py-5 md:px-8 md:flex md:items-center md:justify-between md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeBlurUp}
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t3(language, 'Pour votre marque', 'For your brand', 'Para su marca')}
            </p>
            <p className="mt-1 text-base md:text-lg font-semibold text-foreground leading-snug">
              {t3(
                language,
                'Réparable et pensé pour servir chaque jour pendant des années : un argument RSE concret pour votre marque.',
                'Repairable and designed for daily use over many years: a concrete sustainability story for your brand.',
                'Reparable y pensado para usarse a diario durante años: un argumento de sostenibilidad concreto para su marca.'
              )}
            </p>
          </div>
          <a
            href="#contact"
            onClick={() => trackCTAClick(cta, 'durabilite', 'sample_durabilite')}
            className="mt-4 md:mt-0 inline-flex flex-none items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DurabilitySection;
