import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Package, Paintbrush, Puzzle, SlidersHorizontal, Sparkles, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import LegacyAnchors from '@/components/LegacyAnchors';

// Image de l'ancien site (section « Faites de Tolia le diffuseur de votre marque ») : planche de teintes, motifs et croquis.
// 22/10/2026 (point B7) : deux colonnes seulement sur grand écran (sur tablette, la photo et les textes étaient trop serrés)
import IMG from '@/assets/journee/img/personnalisation_atelier_3d.webp';
import IMG_900 from '@/assets/journee/img/personnalisation_atelier_3d_900.webp'; // version 900 px pour les écrans où l'image est petite (22/10/2026, point D5)

type Tri = { fr: string; en: string; es: string };
interface Pillar {
  icon: LucideIcon;
  title: Tri;
  subtitle: Tri;
  points: Tri[];
}

// Textes repris de l'ancien site. Seul changement : le nom « Twist & Mist » n'est plus employé (« module de diffusion »),
// comme dans le reste de la nouvelle page.
const diffuserPoints: Tri[] = [
  {
    fr: 'Votre couleur exacte : choisissez parmi nos teintes ou donnez-nous votre référence RAL ou Pantone',
    en: 'Your exact colour: choose from our shades or give us your RAL or Pantone reference',
    es: 'Su color exacto: elija entre nuestros tonos o indíquenos su referencia RAL o Pantone',
  },
  {
    fr: 'Gravure laser, sérigraphie ou impression UV de votre logo sur la cloche et la base',
    en: 'Laser engraving, screen printing or UV printing of your logo on the cover and base',
    es: 'Grabado láser, serigrafía o impresión UV de su logotipo en la cubierta y la base',
  },
  {
    fr: 'Finitions mat, brillante, soft‑touch, texturée ou métallique selon votre positionnement',
    en: 'Matt, gloss, soft‑touch, textured or metallic finishes to match your positioning',
    es: 'Acabados mate, brillante, soft‑touch, texturizado o metalizado según su posicionamiento',
  },
  {
    fr: 'Matériaux au choix : bois, résine, verre soufflé',
    en: 'Choice of materials: wood, resin, blown glass',
    es: 'Materiales a elegir: madera, resina, vidrio soplado',
  },
];

const pillars: Pillar[] = [
  {
    icon: Puzzle,
    title: { fr: 'Les accessoires', en: 'Accessories', es: 'Los accesorios' },
    subtitle: {
      fr: 'Modules de diffusion et câbles aux couleurs de votre gamme',
      en: 'Diffusion modules and cables in your range colours',
      es: 'Módulos de difusión y cables con los colores de su gama',
    },
    points: [
      {
        fr: 'Module de diffusion personnalisé aux couleurs de votre marque',
        en: 'Custom diffusion module in your brand colours',
        es: 'Módulo de difusión personalizado con los colores de su marca',
      },
      {
        fr: 'Câble de recharge USB‑C avec manchon à votre charte graphique',
        en: 'USB‑C charging cable with a sleeve in your brand colours',
        es: 'Cable de carga USB‑C con funda según su identidad de marca',
      },
    ],
  },
  {
    icon: Package,
    title: { fr: 'Le packaging', en: 'Packaging', es: 'El estuche' },
    subtitle: {
      fr: 'Un unboxing qui porte l’identité de votre marque',
      en: 'An unboxing that carries your brand identity',
      es: 'Un unboxing que lleva la identidad de su marca',
    },
    points: [
      {
        fr: 'Boîte individuelle entièrement personnalisable : dimensions, matériaux, couleurs',
        en: 'Fully customisable individual box: dimensions, materials, colours',
        es: 'Caja individual totalmente personalizable: dimensiones, materiales, colores',
      },
      {
        fr: 'Insert explicatif et carte de bienvenue à vos couleurs',
        en: 'Explanatory insert and welcome card in your colours',
        es: 'Folleto explicativo y tarjeta de bienvenida con sus colores',
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
        fr: 'Cartes de garantie et de remerciement à votre marque',
        en: 'Warranty and thank-you cards with your branding',
        es: 'Tarjetas de garantía y de agradecimiento con su marca',
      },
      {
        fr: 'Supports PLV et fiches produit en magasin prêtes à imprimer',
        en: 'POS displays and in-store product sheets ready to print',
        es: 'Expositores PLV y fichas de producto en tienda listos para imprimir',
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

  // Mise en page resserrée (17/10/2026, « trop d'espaces blancs ») : l'image et les quatre points du diffuseur côte à côte,
  // puis les trois familles (accessoires, packaging, notices) en cartes compactes. Le contenu est inchangé.
  return (
    <section id="personnalisation" className="py-14 md:py-20 bg-background relative overflow-hidden">
      <LegacyAnchors ids={['white-label', 'personalization']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'hsl(28 45% 48% / 0.08)', color: 'hsl(28 45% 48%)' }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t3(l, 'Expert marque blanche', 'White-label expert', 'Experto en marca blanca')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(l, 'Faites de Tolia le diffuseur de votre marque', 'Make Tolia your brand’s own diffuser', 'Haga de Tolia el difusor de su marca')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t3(
              l,
              'Innobiz personnalise chaque composant de votre diffuseur. Couleurs, matières, finitions, logo, coffret : un diffuseur qui porte votre marque de bout en bout.',
              'Innobiz customises every component of your diffuser. Colours, materials, finishes, logo, box: a diffuser that carries your brand throughout.',
              'Innobiz personaliza cada componente de su difusor. Colores, materiales, acabados, logotipo, estuche: un difusor que lleva su marca de principio a fin.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeBlurUp}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg border border-border/40 lg:col-span-5">
            <img
              src={IMG}
              srcSet={`${IMG_900} 900w, ${IMG} 1600w`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              width={1600}
              height={892}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
              alt={t3(l, 'Des diffuseurs Tolia aux cloches de couleurs et de motifs différents (diamant, stries, tressé, vagues), sur une table de travail avec un cahier d’idées, des nuanciers, des croquis et un brouillon de notice', 'Tolia diffusers with covers in different colours and patterns (diamond, ribbed, woven, waves) on a work table with an idea book, colour fans, sketches and a draft manual', 'Difusores Tolia con cubiertas de colores y motivos distintos (diamante, estrías, trenzado, ondas) sobre una mesa de trabajo con un cuaderno de ideas, muestrarios, bocetos y un borrador de manual')}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3">
              <div className="flex items-end gap-2.5">
                <span className="text-sm font-semibold text-white/90">{t3(l, 'RAL · Pantone : la couleur de votre marque', 'RAL · Pantone: your brand’s colour', 'RAL · Pantone: el color de su marca')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 45% 48%)' }} aria-hidden="true">
                <Paintbrush className="h-4 w-4" />
              </span>
              <h3 className="text-xl font-bold text-foreground">{t3(l, 'Le diffuseur', 'The diffuser', 'El difusor')}</h3>
              <span className="text-sm text-muted-foreground">
                {t3(l, 'Couleurs, finitions et gravures sur mesure', 'Custom colours, finishes and engravings', 'Colores, acabados y grabados a medida')}
              </span>
            </div>
            <ol className="grid gap-2.5 sm:grid-cols-2">
              {diffuserPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl border border-border/30 bg-card px-3.5 py-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md text-xs font-bold"
                    style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 45% 48%)' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t3(l, p.fr, p.en, p.es)}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 flex items-start gap-2 rounded-xl px-3.5 py-2.5 text-sm text-foreground" style={{ background: 'hsl(28 45% 48% / 0.08)' }}>
              <SlidersHorizontal className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'hsl(28 45% 48%)' }} aria-hidden="true" />
              <span>
                <strong>{t3(l, 'Et vos réglages :', 'And your settings:', 'Y sus ajustes:')}</strong>{' '}
                {t3(l, 'modes de diffusion préprogrammés selon vos recommandations.', 'diffusion modes pre-programmed to your recommendations.', 'modos de difusión preprogramados según sus recomendaciones.')}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 grid gap-4 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.title.en}
              className="rounded-2xl border border-border/40 bg-card p-5"
              variants={fadeBlurUp}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 45% 48%)' }} aria-hidden="true">
                  <pillar.icon className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{t3(l, pillar.title.fr, pillar.title.en, pillar.title.es)}</h3>
              </div>
              <p className="mb-3 text-sm font-medium text-foreground/80">{t3(l, pillar.subtitle.fr, pillar.subtitle.en, pillar.subtitle.es)}</p>
              <ul className="space-y-1.5">
                {pillar.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full" style={{ background: 'hsl(28 45% 48%)' }} aria-hidden="true" />
                    {t3(l, p.fr, p.en, p.es)}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
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
