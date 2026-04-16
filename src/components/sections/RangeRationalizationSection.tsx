import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Rocket, CheckCircle, ArrowRight, Gift, Palette } from 'lucide-react';
import rangeSimplificationImg from '@/assets/tolia-replaces-all.png';
import customizationImg from '@/assets/customization-options.png';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';

const RangeRationalizationSection: React.FC = () => {
  const { language: l } = useLanguage();

  const ctaText = t3(l,
    'Planifiez votre démo et recevez votre échantillon',
    'Book your demo and get your free sample',
    'Reserve su demo y reciba su muestra gratis'
  );

  const benefits = [
    {
      fr: "Imaginez : au lieu de gérer 5, 8 ou 10 références de diffuseurs différents, votre catalogue n'en propose qu'un seul. Un seul diffuseur universel compatible avec toutes vos huiles essentielles, synergies, hydrolats et parfums d'intérieur. Plus de confusion en rayon, plus de stock dormant, plus de clients perdus devant trop de choix.",
      en: "Imagine: instead of managing 5, 8 or 10 different diffuser references, your catalogue offers just one. One universal diffuser compatible with all your essential oils, blends, hydrosols and home fragrances. No more shelf confusion, no more dormant stock, no more customers lost in front of too many choices.",
      es: "Imagine: en lugar de gestionar 5, 8 o 10 referencias de difusores diferentes, su catálogo ofrece solo uno. Un difusor universal compatible con todos sus aceites esenciales, mezclas, hidrolatos y fragancias para el hogar. Sin más confusión en estantes, sin stock inactivo, sin clientes perdidos ante demasiadas opciones.",
    },
    {
      fr: "Moins de SKU signifie moins de stock immobilisé, moins de SAV à gérer, et plus de marge par référence. Vos équipes commerciales se concentrent sur un seul discours produit, clair et convaincant. La formation en magasin passe de complexe à immédiate. Chaque vendeur devient un expert en 5 minutes.",
      en: "Fewer SKUs means less immobilised stock, less after-sales to manage, and more margin per reference. Your sales teams focus on one clear, compelling product story. In-store training goes from complex to immediate. Every salesperson becomes an expert in 5 minutes.",
      es: "Menos SKU significa menos stock inmovilizado, menos servicio postventa que gestionar, y más margen por referencia. Sus equipos comerciales se concentran en un solo discurso de producto, claro y convincente. La formación en tienda pasa de compleja a inmediata.",
    },
    {
      fr: "La technologie Twist & Mist est transversale : le même module de nébulisation fonctionne sur tous les diffuseurs Tolia actuels et futurs. Votre client construit une aromathèque d'huiles essentielles qui fonctionne avec chaque nouveau modèle. Il ne repart jamais de zéro. Chaque flacon acheté est un investissement qui dure, et chaque nouveau diffuseur renforce la consommation d'huiles.",
      en: "Twist & Mist technology is cross-platform: the same nebulisation module works across every current and future Tolia diffuser. Your customer builds an essential oil library that works with every new model. They never start from scratch. Every bottle purchased is a lasting investment, and every new diffuser increases oil consumption.",
      es: "La tecnología Twist & Mist es transversal: el mismo módulo de nebulización funciona en todos los difusores Tolia actuales y futuros. Su cliente construye una aromateca de aceites esenciales que funciona con cada nuevo modelo. Nunca parte de cero. Cada frasco comprado es una inversión duradera.",
    },
  ];

  const roadmapItems = [
    {
      fr: 'Tolia, le diffuseur portable et sans fil, déjà disponible.',
      en: 'Tolia, the portable wireless diffuser, already available.',
      es: 'Tolia, el difusor portátil e inalámbrico, ya disponible.',
    },
    {
      fr: 'De nouveaux formats Twist & Mist arrivent pour couvrir grandes pièces, espaces professionnels et véhicules.',
      en: 'New Twist & Mist formats are coming to cover large rooms, professional spaces and vehicles.',
      es: 'Nuevos formatos Twist & Mist llegan para cubrir grandes espacios, entornos profesionales y vehículos.',
    },
    {
      fr: 'Une seule technologie, une seule gamme. Votre client retrouve ses flacons d\'un modèle à l\'autre. La fidélisation est mécanique.',
      en: 'One technology, one range. Your customers keep their bottles across models. Loyalty is built in.',
      es: 'Una tecnología, una gama. Sus clientes conservan sus frascos de un modelo a otro. La fidelización es mecánica.',
    },
  ];

  const customizationOptions = [
    {
      fr: 'Couleur de la coque : choisissez parmi notre palette ou créez une couleur sur mesure à votre charte graphique.',
      en: 'Shell colour: choose from our palette or create a custom colour matching your brand guidelines.',
      es: 'Color de la carcasa: elija de nuestra paleta o cree un color personalizado según su identidad de marca.',
    },
    {
      fr: 'Logo et gravure : apposez votre logo en gravure laser, sérigraphie ou impression UV sur la coque et le socle.',
      en: 'Logo and engraving: add your logo via laser engraving, screen printing or UV printing on the shell and base.',
      es: 'Logo y grabado: añada su logo mediante grabado láser, serigrafía o impresión UV en la carcasa y la base.',
    },
    {
      fr: 'Packaging personnalisé : boîte individuelle aux couleurs de votre marque, insert explicatif, QR code pour votre programme de fidélité.',
      en: 'Custom packaging: individual box in your brand colours, explanatory insert, QR code for your loyalty programme.',
      es: 'Empaque personalizado: caja individual con los colores de su marca, inserto explicativo, código QR para su programa de fidelización.',
    },
    {
      fr: 'Module de nébulisation aux couleurs de votre gamme pour un alignement visuel complet.',
      en: 'Nebulisation module in your range colours for complete visual alignment.',
      es: 'Módulo de nebulización con los colores de su gama para una alineación visual completa.',
    },
    {
      fr: 'Sélection de diffusion préprogrammée : configurez les modes de diffusion (durée, intensité) selon vos recommandations d\'usage.',
      en: 'Pre-programmed diffusion modes: configure duration and intensity settings based on your usage recommendations.',
      es: 'Modos de difusión preprogramados: configure la duración e intensidad según sus recomendaciones de uso.',
    },
  ];

  return (
    <section id="range-rationalization" className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
              <Layers className="w-5 h-5" style={{ color: 'hsl(28 45% 48%)' }} />
            </div>
            <span className="font-semibold text-sm tracking-wide uppercase" style={{ color: 'hsl(28 45% 48%)' }}>
              {t3(l,
                'Simplifiez votre gamme. Multipliez vos ventes.',
                'Simplify your range. Multiply your sales.',
                'Simplifique su gama. Multiplique sus ventas.'
              )}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            {t3(l,
              'Un diffuseur qui remplace tous les autres',
              'One diffuser to replace them all',
              'Un difusor que reemplaza a todos los demás'
            )}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            {t3(l,
              'Aujourd\'hui, les marques d\'aromathérapie proposent 3, 5, parfois 10 diffuseurs différents. Chacun avec ses limites, ses consommables, son discours spécifique. Le résultat ? Un catalogue confus, des stocks lourds, un SAV fragmenté, et des clients qui ne savent plus quoi choisir. Tolia change cette équation.',
              'Today, aromatherapy brands offer 3, 5, sometimes 10 different diffusers. Each with its own limitations, consumables, and messaging. The result? A confusing catalogue, heavy inventory, fragmented after-sales, and customers who no longer know what to choose. Tolia changes this equation.',
              'Hoy, las marcas de aromaterapia ofrecen 3, 5, a veces 10 difusores diferentes. Cada uno con sus limitaciones, sus consumibles, su discurso. ¿El resultado? Un catálogo confuso, inventarios pesados, servicio postventa fragmentado, y clientes que ya no saben qué elegir. Tolia cambia esta ecuación.'
            )}
          </p>
        </motion.div>

        {/* Hero image - Tolia diffuser */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={rangeSimplificationImg}
            alt={t3(l,
              "Illustration montrant plusieurs diffuseurs obsolètes remplacés par le Tolia universel",
              "Illustration showing multiple obsolete diffusers replaced by the universal Tolia",
              "Ilustración que muestra múltiples difusores obsoletos reemplazados por el Tolia universal"
            )}
            className="w-full h-auto no-select rounded-2xl"
            draggable={false}
            loading="lazy"
            decoding="async"
            width={1408}
            height={768}
          />
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-20"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {benefits.map((b, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="p-6 md:p-8 bg-card rounded-2xl border border-border/40 transition-all duration-500 hover:shadow-[0_12px_40px_-8px_hsl(28_45%_48%/0.12)]">
              <CheckCircle className="w-6 h-6 mb-4" style={{ color: 'hsl(28 45% 48%)' }} />
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t3(l, b.fr, b.en, b.es)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Customization section */}
        <motion.div
          className="max-w-5xl mx-auto mb-20"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
              <Palette className="w-5 h-5" style={{ color: 'hsl(28 45% 48%)' }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {t3(l,
                'Faites de Tolia le diffuseur de votre marque',
                'Make Tolia your brand\'s own diffuser',
                'Haga de Tolia el difusor de su marca'
              )}
            </h3>
          </div>

          <p className="text-base text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            {t3(l,
              "Chaque détail peut être personnalisé pour que Tolia porte l'identité de votre marque. Nos clients ne voient pas un produit générique : ils voient votre diffuseur, conçu pour votre univers.",
              "Every detail can be customised so Tolia carries your brand identity. Your customers do not see a generic product: they see your diffuser, designed for your world.",
              "Cada detalle puede personalizarse para que Tolia lleve la identidad de su marca. Sus clientes no ven un producto genérico: ven su difusor, diseñado para su universo."
            )}
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3">
              {customizationOptions.map((opt, i) => (
                <motion.div key={i} variants={fadeBlurUp}
                  className="flex gap-3 items-start p-4 rounded-xl bg-card border border-border/30">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(28 45% 48%)' }} />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t3(l, opt.fr, opt.en, opt.es)}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={customizationImg}
                alt={t3(l,
                  "Table de design avec des diffuseurs Tolia en différentes couleurs et personnalisations, entourés de carnets et échantillons",
                  "Design table with Tolia diffusers in different colours and customisations, surrounded by notebooks and samples",
                  "Mesa de diseño con difusores Tolia en diferentes colores y personalizaciones, rodeados de cuadernos y muestras"
                )}
                className="w-full h-auto object-cover"
                loading="lazy"
                width={1280}
                height={720}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
              <Rocket className="w-5 h-5" style={{ color: 'hsl(28 45% 48%)' }} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {t3(l,
                'La gamme Twist & Mist s\'élargit',
                'The Twist & Mist range is expanding',
                'La gama Twist & Mist se amplía'
              )}
            </h3>
          </div>

          <div className="space-y-4 mb-10">
            {roadmapItems.map((item, i) => (
              <motion.div key={i} variants={fadeBlurUp}
                className="flex gap-4 items-start p-5 rounded-xl bg-card border border-border/30">
                <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(28 45% 48%)' }} />
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t3(l, item.fr, item.en, item.es)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <MagneticButton>
              <a href="#contact" onClick={() => trackCTAClick(ctaText, 'range-rationalization')}>
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

export default RangeRationalizationSection;
