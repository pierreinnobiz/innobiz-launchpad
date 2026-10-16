import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Package, Paintbrush, Puzzle, Sparkles, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import LegacyAnchors from '@/components/LegacyAnchors';

// Image de l'ancien site (section « Faites de Tolia le diffuseur de votre marque ») : planche de teintes, motifs et croquis.
const IMG = `${import.meta.env.BASE_URL}journee/img/personnalisation_moodboard.webp`;

type Tri = { fr: string; en: string; es: string };
interface Pillar {
  icon: LucideIcon;
  title: Tri;
  subtitle: Tri;
  points: Tri[];
}

// Textes repris de l'ancien site. Seul changement : le nom « Twist & Mist » n'est plus employé (« module de diffusion »),
// comme dans le reste de la nouvelle page.
const diffuserPoints: Tri[] = [
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
  {
    fr: 'Matériaux au choix : bois, résine, verre soufflé',
    en: 'Choice of materials: wood, resin, blown glass',
    es: 'Materiales a elegir: madera, resina, vidrio soplado',
  },
];

const pillars: Pillar[] = [
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
        fr: 'Module de diffusion personnalisé aux couleurs de votre marque',
        en: 'Custom diffusion module in your brand colours',
        es: 'Módulo de difusión personalizado con los colores de su marca',
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
      fr: 'Un unboxing premium qui porte l’identité de votre marque',
      en: 'A premium unboxing that carries your brand identity',
      es: 'Un unboxing premium que lleva la identidad de su marca',
    },
    points: [
      {
        fr: 'Boîte individuelle entièrement personnalisable : dimensions, matériaux, couleurs',
        en: 'Fully customisable individual box: dimensions, materials, colours',
        es: 'Caja individual totalmente personalizable: dimensiones, materiales, colores',
      },
      {
        fr: 'Insert explicatif et carte de bienvenue brandée pour un effet premium',
        en: 'Branded explanatory insert and welcome card for a premium feel',
        es: 'Inserto explicativo y tarjeta de bienvenida de marca para un efecto premium',
      },
      {
        fr: 'QR code intégré reliant à votre programme de fidélité ou votre application',
        en: 'Integrated QR code linking to your loyalty programme or app',
        es: 'Código QR integrado vinculado a su programa de fidelización o aplicación',
      },
    ],
  },
  {
    icon: FileText,
    title: { fr: 'Les notices', en: 'Documentation', es: 'La documentación' },
    subtitle: {
      fr: 'Guides d’utilisation et supports marketing clé en main',
      en: 'User guides and turnkey marketing materials',
      es: 'Guías de uso y materiales de marketing llave en mano',
    },
    points: [
      {
        fr: 'Notice d’utilisation personnalisée avec votre logo, vos couleurs et vos conseils d’usage',
        en: 'Custom user manual with your logo, colours and usage tips',
        es: 'Manual de uso personalizado con su logo, colores y consejos de uso',
      },
      {
        fr: 'Carte de garantie et carte de remerciement brandées pour renforcer la relation client',
        en: 'Branded warranty and thank-you cards to strengthen customer relationships',
        es: 'Tarjeta de garantía y de agradecimiento de marca para fortalecer la relación con el cliente',
      },
      {
        fr: 'Supports PLV et fiches produit en magasin prêtes à imprimer',
        en: 'POS displays and in-store product sheets ready to print',
        es: 'Displays PLV y fichas de producto en tienda listos para imprimir',
      },
    ],
  },
];

const goToProject = (label: string) => {
  trackCTAClick(label, 'personnalisation', 'whitelabel');
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('type', 'white-label');
    url.hash = '#contact';
    window.history.replaceState(null, '', url.toString());
    window.dispatchEvent(new Event('tolia:pathchange'));
  } catch {
    /* adresse non modifiable (page intégrée dans un cadre) : on fait défiler quand même jusqu'au formulaire */
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Personnalisation : tout ce qui peut être aux couleurs de la marque (diffuseur, accessoires, packaging, notices).
 * Section reprise de l'ancien site, dont le contenu était plus complet que le résumé « couleurs, matières, logo et coffret ».
 */
const CustomizationSection: React.FC = () => {
  const { language: l } = useLanguage();
  const cta = t3(l, 'Parler de mon projet', 'Discuss my project', 'Hablar de mi proyecto');

  return (
    <section id="personnalisation" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <LegacyAnchors ids={['white-label', 'personalization']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'hsl(28 45% 48% / 0.08)', color: 'hsl(28 45% 48%)' }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t3(l, 'Expert marque blanche', 'White-label expert', 'Experto en marca blanca')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(l, 'Faites de Tolia le diffuseur de votre marque', 'Make Tolia your brand’s own diffuser', 'Haga de Tolia el difusor de su marca')}
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t3(
              l,
              'Innobiz personnalise chaque composant de votre diffuseur. Des milliers de combinaisons possibles pour un produit qui ne ressemble qu’à vous.',
              'Innobiz customises every component of your diffuser. Thousands of possible combinations for a product that looks only like you.',
              'Innobiz personaliza cada componente de su difusor. Miles de combinaciones posibles para un producto que solo se parece a usted.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeBlurUp}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg border border-border/40">
            <img
              src={IMG}
              width={1600}
              height={892}
              loading="lazy"
              decoding="async"
              className="w-full h-auto md:h-full md:object-cover md:aspect-square"
              alt={t3(l, 'Le diffuseur Tolia personnalisable : teintes, motifs et croquis', 'The customisable Tolia diffuser: shades, patterns and sketches', 'El difusor Tolia personalizable: tonos, motivos y bocetos')}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
              <div className="flex items-end gap-3">
                <span className="text-3xl md:text-4xl font-bold text-white" aria-hidden="true">∞</span>
                <span className="pb-1 text-sm text-white/85">{t3(l, 'combinaisons de couleurs', 'colour combinations', 'combinaciones de colores')}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 45% 48%)' }} aria-hidden="true">
                <Paintbrush className="h-4 w-4" />
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">{t3(l, 'Le diffuseur', 'The diffuser', 'El difusor')}</h3>
            </div>
            <p className="mb-5 text-sm text-muted-foreground">
              {t3(l, 'Couleurs, finitions et gravures sur mesure', 'Custom colours, finishes and engravings', 'Colores, acabados y grabados a medida')}
            </p>
            <ol className="space-y-3">
              {diffuserPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-border/30 bg-card p-3.5">
                  <span
                    className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg text-xs font-bold"
                    style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 45% 48%)' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t3(l, p.fr, p.en, p.es)}</p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.title.en}
              className="rounded-2xl border border-border/40 bg-card p-6 md:p-7 transition-shadow duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)]"
              variants={fadeBlurUp}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 45% 48%)' }} aria-hidden="true">
                  <pillar.icon className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{t3(l, pillar.title.fr, pillar.title.en, pillar.title.es)}</h3>
              </div>
              <p className="mb-4 text-sm font-medium text-foreground/80">{t3(l, pillar.subtitle.fr, pillar.subtitle.en, pillar.subtitle.es)}</p>
              <ul className="space-y-2.5">
                {pillar.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded text-xs font-bold"
                      style={{ background: 'hsl(28 45% 48% / 0.08)', color: 'hsl(28 45% 48%)' }}
                    >
                      {i + 1}
                    </span>
                    {t3(l, p.fr, p.en, p.es)}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => goToProject(cta)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomizationSection;
