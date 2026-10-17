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
const IMG = `${import.meta.env.BASE_URL}journee/img/durabilite_vue_eclatee.webp`;

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
        'Cloche, module de diffusion, électronique, batterie : chaque partie se remplace sans changer tout l’appareil. Sans verrerie fragile à l’intérieur, sans eau stagnante ni pompe, il y a moins de pièces qui cassent, donc moins de retours à gérer.',
        'Cover, diffusion module, electronics, battery: every part can be replaced without changing the whole device. With no fragile glassware inside, no stagnant water and no pump, fewer parts break, so fewer returns to manage.',
        'Cubierta, módulo de difusión, electrónica, batería: cada parte se puede reemplazar sin cambiar todo el dispositivo. Sin piezas de vidrio frágiles en su interior, sin agua estancada ni bomba, hay menos piezas que se rompen y, por tanto, menos devoluciones que gestionar.'
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
        'With no water, no cleaning and an oil change in a second, Tolia avoids the “cupboard syndrome”: it fits into daily routines rather than ending up forgotten in a cupboard.',
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
              'En Europe, les consommateurs attendent de plus en plus des produits qui durent et qui se réparent. Tolia a été conçu dans cette logique : un diffuseur qui reste utilisé et qui peut être réparé au lieu d’être jeté.',
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
              width={1361}
              height={784}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
              alt={t3(
                language,
                'Vue éclatée d’un diffuseur modulaire : coque, module de diffusion, électronique et batterie séparés',
                'Exploded view of a modular diffuser: shell, diffusion module, electronics and battery shown separately',
                'Vista despiezada de un difusor modular: carcasa, módulo de difusión, electrónica y batería por separado'
              )}
            />
            <figcaption className="px-4 py-2.5 text-xs text-muted-foreground">
              {t3(
                language,
                'Illustration de principe : chaque pièce se démonte et se remplace.',
                'Illustration: every part comes apart and can be replaced.',
                'Ilustración: cada pieza se desmonta y se sustituye.'
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
                'Un produit pensé pour servir chaque jour pendant des années ne finit pas oublié dans un tiroir. C’est un argument RSE concret pour votre marque.',
                'A product designed to be used every day for years does not end up forgotten in a cupboard: a concrete sustainability story for your brand.',
                'Un producto pensado para usarse a diario durante años no acaba olvidado en un cajón: un argumento de sostenibilidad concreto para su marca.'
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
