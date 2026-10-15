import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, Droplets, RefreshCw, FlaskConical, Wrench, Palette, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import LegacyAnchors from '@/components/LegacyAnchors';

// Image issue des fichiers 3D (STP) : cloche retirée, base ouverte, flacons avec leur module de diffusion.
const IMG = `${import.meta.env.BASE_URL}journee/anim/living/d_base.webp`;

/** Technologie, en six repères. Remplace « Six ruptures », « Qui fabrique Tolia », « Engagement RSE » et leurs cartes. */
const HomeTechSection: React.FC = () => {
  const { language } = useLanguage();

  const items: { icon: LucideIcon; title: string; text: string; note?: boolean }[] = [
    {
      icon: BatteryFull,
      title: t3(language, 'Jusqu’à 90 h', 'Up to 90 h', 'Hasta 90 h'),
      text: t3(language, 'd’autonomie sans fil, recharge USB-C.', 'of cordless battery life, USB-C charging.', 'de autonomía sin cables, carga USB-C.'),
      note: true,
    },
    {
      icon: Droplets,
      title: t3(language, 'Pure et silencieuse', 'Pure and quiet', 'Pura y silenciosa'),
      text: t3(
        language,
        'Ni eau, ni chaleur, ni bruit qui dérange : l’huile est diffusée telle qu’elle sort du flacon.',
        'No water, no heat, no disturbing noise: the oil is diffused exactly as it comes out of the bottle.',
        'Sin agua, sin calor, sin ruido que moleste: el aceite se difunde tal como sale del frasco.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, '1 seconde', '1 second', '1 segundo'),
      text: t3(
        language,
        'pour changer d’huile : on échange un flacon contre un autre.',
        'to change oil: you simply swap one bottle for another.',
        'para cambiar de aceite: basta con cambiar un frasco por otro.'
      ),
    },
    {
      icon: FlaskConical,
      title: t3(language, 'Vos flacons', 'Your bottles', 'Sus frascos'),
      text: t3(
        language,
        'Se visse sur les flacons standard (col DIN 18, de 5 à 50 ml).',
        'Screws onto standard bottles (DIN 18 neck, 5 to 50 ml).',
        'Se enrosca en frascos estándar (cuello DIN 18, de 5 a 50 ml).'
      ),
    },
    {
      icon: Wrench,
      title: t3(language, 'Réparable', 'Repairable', 'Reparable'),
      text: t3(
        language,
        'Batterie remplaçable, pièces changées séparément.',
        'Replaceable battery, parts changed separately.',
        'Batería reemplazable, piezas sustituibles por separado.'
      ),
    },
    {
      icon: Palette,
      title: t3(language, 'À votre image', 'Yours to customise', 'A su imagen'),
      text: t3(
        language,
        'Couleurs, matières, finitions, logo et coffret.',
        'Colours, materials, finishes, logo and box.',
        'Colores, materiales, acabados, logotipo y estuche.'
      ),
    },
  ];

  const footnote = t3(
    language,
    '¹ 70 à 90 h lumière éteinte, 16 à 20 h lumière d’ambiance allumée, selon l’intensité.',
    '¹ 70–90 h with the light off, 16–20 h with the ambient light on, depending on intensity.',
    '¹ De 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental encendida, según la intensidad.'
  );

  return (
    <section id="technologie" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <LegacyAnchors ids={['four-innovations', 'why-innobiz', 'rse']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Technologie', 'Technology', 'Tecnología')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(language, 'Simple pour vos clients. Pensé pour durer.', 'Simple for your customers. Built to last.', 'Sencillo para sus clientes. Pensado para durar.')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            className="overflow-hidden rounded-3xl shadow-xl border border-border/40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeBlurUp}
          >
            <img
              src={IMG}
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
              alt={t3(
                language,
                'Diffuseur Tolia ouvert sur une table : la cloche est posée à côté de la base, des flacons avec leur module de diffusion attendent',
                'Tolia diffuser opened on a table: the cover stands beside the base, bottles with their diffusion module wait their turn',
                'Difusor Tolia abierto sobre una mesa: la cubierta junto a la base y frascos con su módulo de difusión a la espera'
              )}
            />
          </motion.div>

          <motion.ul
            className="grid sm:grid-cols-2 gap-x-8 gap-y-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {items.map((it, i) => (
              <motion.li key={i} className="flex gap-4" variants={fadeBlurUp}>
                <span
                  className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full"
                  style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 52% 36%)' }}
                  aria-hidden="true"
                >
                  <it.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-lg leading-snug">
                    {it.title}
                    {it.note && <sup className="ml-0.5 text-xs text-muted-foreground">1</sup>}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{it.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">{footnote}</p>
      </div>
    </section>
  );
};

export default HomeTechSection;
