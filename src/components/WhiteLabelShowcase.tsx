import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, Package, Puzzle, FileText, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { fadeBlurUp } from '@/lib/animations';

import wlDiffuserImg from '@/assets/tolia-moodboard.png';
import wlPackagingImg from '@/assets/wl-packaging.jpg';
import wlAccessoriesImg from '@/assets/wl-accessories.jpg';
import wlDocumentationImg from '@/assets/wl-documentation.jpg';

interface Pillar {
  id: string;
  icon: React.ElementType;
  title: { fr: string; en: string; es: string };
  subtitle: { fr: string; en: string; es: string };
  points: { fr: string; en: string; es: string }[];
  image: string;
  stat: { value: string; label: { fr: string; en: string; es: string } };
}

const pillars: Pillar[] = [
  {
    id: 'diffuser',
    icon: Paintbrush,
    title: {
      fr: 'Le diffuseur',
      en: 'The diffuser',
      es: 'El difusor',
    },
    subtitle: {
      fr: 'Couleurs, finitions et gravures sur mesure',
      en: 'Custom colours, finishes and engravings',
      es: 'Colores, acabados y grabados a medida',
    },
    points: [
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
    ],
    image: wlDiffuserImg,
    stat: {
      value: '∞',
      label: { fr: 'combinaisons de couleurs', en: 'colour combinations', es: 'combinaciones de colores' },
    },
  },
  {
    id: 'accessories',
    icon: Puzzle,
    title: {
      fr: 'Les accessoires',
      en: 'Accessories',
      es: 'Los accesorios',
    },
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
    image: wlAccessoriesImg,
    stat: {
      value: '100%',
      label: { fr: 'alignement visuel', en: 'visual alignment', es: 'alineación visual' },
    },
  },
  {
    id: 'packaging',
    icon: Package,
    title: {
      fr: 'Le packaging',
      en: 'Packaging',
      es: 'El empaque',
    },
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
    image: wlPackagingImg,
    stat: {
      value: 'A-Z',
      label: { fr: 'personnalisation complète', en: 'full customisation', es: 'personalización completa' },
    },
  },
  {
    id: 'documentation',
    icon: FileText,
    title: {
      fr: 'Les notices',
      en: 'Documentation',
      es: 'La documentación',
    },
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
    image: wlDocumentationImg,
    stat: {
      value: '0',
      label: { fr: "effort de création pour vous", en: 'design effort for you', es: 'esfuerzo de diseño para usted' },
    },
  },
];

const WhiteLabelShowcase: React.FC = () => {
  const { language: l } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeBlurUp}
    >
      {/* Header */}
      <div className="text-center mb-10">
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
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                isActive
                  ? 'bg-card shadow-lg border-border/60 scale-105'
                  : 'bg-transparent border-transparent hover:bg-card/60 hover:border-border/30'
              }`}
              style={isActive ? { boxShadow: '0 8px 30px -6px hsl(28 45% 48% / 0.15)' } : {}}
            >
              <Icon className="w-4 h-4" style={{ color: isActive ? 'hsl(28 45% 48%)' : 'hsl(28 45% 48% / 0.5)' }} />
              <span className={isActive ? 'text-foreground' : 'text-muted-foreground'}>
                {t3(l, p.title.fr, p.title.en, p.title.es)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active pillar content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden group order-2 md:order-1">
            <img
              src={active.image}
              alt={t3(l, active.title.fr, active.title.en, active.title.es)}
              className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width={800}
              height={800}
            />
            {/* Stat overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex items-end gap-3">
                <span className="text-3xl md:text-4xl font-bold text-white">{active.stat.value}</span>
                <span className="text-sm text-white/80 pb-1">
                  {t3(l, active.stat.label.fr, active.stat.label.en, active.stat.label.es)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {t3(l, active.subtitle.fr, active.subtitle.en, active.subtitle.es)}
            </h4>
            <div className="space-y-4 mt-6">
              {active.points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex gap-4 items-start p-4 rounded-xl bg-card border border-border/30 hover:border-border/60 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                    <span className="text-xs font-bold" style={{ color: 'hsl(28 45% 48%)' }}>{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t3(l, point.fr, point.en, point.es)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default WhiteLabelShowcase;
