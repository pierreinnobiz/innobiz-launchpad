import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, Puzzle, Package, FileText, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';

import wlDiffuserImg from '@/assets/tolia-moodboard.png';

interface TextPillar {
  icon: React.ElementType;
  title: { fr: string; en: string; es: string };
  subtitle: { fr: string; en: string; es: string };
  points: { fr: string; en: string; es: string }[];
}

const textPillars: TextPillar[] = [
  {
    icon: Puzzle,
    title: { fr: 'Les accessoires', en: 'Accessories', es: 'Los accesorios' },
    subtitle: {
      fr: 'Modules de nébulisation et câbles aux couleurs de votre gamme',
      en: 'Nebulisation modules and cables in your range colours',
      es: 'Módulos de nebulización y cables con los colores de su gama',
    },
    points: [
      {
        fr: 'Module Twist & Mist personnalisé aux couleurs de votre marque',
        en: 'Custom Twist & Mist module in your brand colours',
        es: 'Módulo Twist & Mist personalizado con los colores de su marca',
      },
      {
        fr: 'Câble de recharge USB-C avec manchon à votre charte graphique',
        en: 'USB-C charging cable with sleeve in your brand guidelines',
        es: 'Cable de carga USB-C con funda según su identidad de marca',
      },
      {
        fr: 'Modes de diffusion préprogrammés selon vos recommandations',
        en: 'Pre-programmed diffusion modes based on your recommendations',
        es: 'Modos de difusión preprogramados según sus recomendaciones',
      },
    ],
  },
  {
    icon: Package,
    title: { fr: 'Le packaging', en: 'Packaging', es: 'El empaque' },
    subtitle: {
      fr: "Un unboxing premium qui porte l'identité de votre marque",
      en: 'A premium unboxing that carries your brand identity',
      es: 'Un unboxing premium que lleva la identidad de su marca',
    },
    points: [
      {
        fr: "Boîte individuelle entièrement personnalisable : dimensions, matériaux, couleurs",
        en: 'Fully customisable individual box: dimensions, materials, colours',
        es: 'Caja individual totalmente personalizable: dimensiones, materiales, colores',
      },
      {
        fr: "Insert explicatif et carte de bienvenue brandée pour un effet premium",
        en: 'Branded explanatory insert and welcome card for a premium feel',
        es: 'Inserto explicativo y tarjeta de bienvenida de marca para un efecto premium',
      },
      {
        fr: "QR code intégré reliant à votre programme de fidélité ou votre application",
        en: 'Integrated QR code linking to your loyalty programme or app',
        es: 'Código QR integrado vinculado a su programa de fidelización o aplicación',
      },
    ],
  },
  {
    icon: FileText,
    title: { fr: 'Les notices', en: 'Documentation', es: 'La documentación' },
    subtitle: {
      fr: "Guides d'utilisation et supports marketing clé en main",
      en: 'User guides and turnkey marketing materials',
      es: 'Guías de uso y materiales de marketing llave en mano',
    },
    points: [
      {
        fr: "Notice d'utilisation personnalisée avec votre logo, vos couleurs et vos conseils d'usage",
        en: 'Custom user manual with your logo, colours and usage tips',
        es: 'Manual de uso personalizado con su logo, colores y consejos de uso',
      },
      {
        fr: "Carte de garantie et carte de remerciement brandées pour renforcer la relation client",
        en: 'Branded warranty and thank-you cards to strengthen customer relationships',
        es: 'Tarjeta de garantía y de agradecimiento de marca para fortalecer la relación con el cliente',
      },
      {
        fr: "Supports PLV et fiches produit en magasin prêtes à imprimer",
        en: 'POS displays and in-store product sheets ready to print',
        es: 'Displays PLV y fichas de producto en tienda listos para imprimir',
      },
    ],
  },
];

const diffuserPoints = [
  {
    fr: 'Palette illimitée : choisissez parmi nos teintes ou créez un Pantone exclusif',
    en: 'Unlimited palette: choose from our shades or create an exclusive Pantone',
    es: 'Paleta ilimitada: elija entre nuestras tonalidades o cree un Pantone exclusivo',
  },
  {
    fr: 'Gravure laser, sérigraphie ou impression UV de votre logo sur coque et socle',
    en: 'Laser engraving, screen printing or UV printing of your logo on shell and base',
    es: 'Grabado láser, serigrafía o impresión UV de su logo en carcasa y base',
  },
  {
    fr: 'Finitions mat, brillant, soft-touch ou texturée selon votre positionnement',
    en: 'Matte, gloss, soft-touch or textured finishes to match your positioning',
    es: 'Acabados mate, brillante, soft-touch o texturizado según su posicionamiento',
  },
];

const WhiteLabelShowcase: React.FC = () => {
  const { language: l } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
          style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(28 45% 48%)' }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Expert marque blanche', 'White-label expert', 'Experto en marca blanca')}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {t3(l,
            'Faites de Tolia le diffuseur de votre marque',
            'Make Tolia your brand\'s own diffuser',
            'Haga de Tolia el difusor de su marca'
          )}
        </h3>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t3(l,
            "Innobiz personnalise chaque composant de votre diffuseur. Des milliers de combinaisons possibles pour un produit qui ne ressemble qu'à vous.",
            "Innobiz customises every component of your diffuser. Thousands of possible combinations for a product that looks only like you.",
            "Innobiz personaliza cada componente de su difusor. Miles de combinaciones posibles para un producto que solo se parece a usted."
          )}
        </p>
      </motion.div>

      {/* Diffuser section with image */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src={wlDiffuserImg}
            alt={t3(l, 'Le diffuseur Tolia personnalisable', 'The customisable Tolia diffuser', 'El difusor Tolia personalizable')}
            className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width={800}
            height={800}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="flex items-end gap-3">
              <span className="text-3xl md:text-4xl font-bold text-white">∞</span>
              <span className="text-sm text-white/80 pb-1">
                {t3(l, 'combinaisons de couleurs', 'colour combinations', 'combinaciones de colores')}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
              <Paintbrush className="w-4 h-4" style={{ color: 'hsl(28 45% 48%)' }} />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-foreground">
              {t3(l, 'Le diffuseur', 'The diffuser', 'El difusor')}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            {t3(l,
              'Couleurs, finitions et gravures sur mesure',
              'Custom colours, finishes and engravings',
              'Colores, acabados y grabados a medida'
            )}
          </p>
          <div className="space-y-3">
            {diffuserPoints.map((point, i) => (
              <div key={i} className="flex gap-3 items-start p-3.5 rounded-xl bg-card border border-border/30">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                  <span className="text-xs font-bold" style={{ color: 'hsl(28 45% 48%)' }}>{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t3(l, point.fr, point.en, point.es)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Text-only pillars for accessories, packaging, documentation */}
      <div className="grid md:grid-cols-3 gap-6">
        {textPillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title.en}
              className="p-6 md:p-7 bg-card rounded-2xl border border-border/40 hover:border-border/60 transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)]"
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'hsl(28 45% 48%)' }} />
                </div>
                <h4 className="text-lg font-bold text-foreground">
                  {t3(l, pillar.title.fr, pillar.title.en, pillar.title.es)}
                </h4>
              </div>
              <p className="text-sm font-medium text-foreground/80 mb-4">
                {t3(l, pillar.subtitle.fr, pillar.subtitle.en, pillar.subtitle.es)}
              </p>
              <ul className="space-y-2.5">
                {pillar.points.map((point, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-sm text-muted-foreground leading-relaxed">
                    <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                      style={{ background: 'hsl(28 45% 48% / 0.08)', color: 'hsl(28 45% 48%)' }}>
                      {i + 1}
                    </span>
                    {t3(l, point.fr, point.en, point.es)}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WhiteLabelShowcase;
