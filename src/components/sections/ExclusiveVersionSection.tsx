import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Palette, Package, Camera, ArrowRight } from 'lucide-react';

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const scaleBlur: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import toliaFrame03 from '@/assets/tolia-frame-03.png';
import toliaFrame04 from '@/assets/tolia-frame-04.png';
import toliaFrame05 from '@/assets/tolia-frame-05.png';
import { useLanguage } from '@/contexts/LanguageContext';

const ExclusiveVersionSection: React.FC = () => {
  const { language } = useLanguage();
  const en = language === 'en';

  const productImages = [
    { src: toliaFrame03, label: en ? "Diamond beige" : "Beige diamanté" },
    { src: toliaFrame04, label: en ? "Noble wood" : "Bois noble" },
    { src: toliaFrame05, label: en ? "Blown glass" : "Verre soufflé" },
  ];

  const customBlocks = en ? [
    { icon: Palette, title: "Product customisation", items: ["Colours: RAL, Pantone, bespoke creations.", "Materials: wood (oak, walnut, bamboo…), resin, glass, etc.", "Finishes: matt, gloss, soft-touch, metallic.", "Programming: diffusion durations, intensities, sequences tailored to your uses.", "Branding: logo, engraving, patterns, textures, so every Tolia carries your identity."] },
    { icon: Package, title: "Packaging & unboxing experience", items: ["Gift box in your brand colours, refined interior design.", "Instructions and guides in your visual identity.", "Option to add cards, samples, QR codes linking to digital content."] },
    { icon: Camera, title: "Ready-to-use marketing kit", items: ["HD photos, videos, 3D animations, lifestyle visuals.", "Formats optimised for social media, website, newsletters and adverts.", "Goal: launch your version of Tolia quickly, with all communication assets already prepared."] },
  ] : [
    { icon: Palette, title: "Personnalisation produit", items: ["Couleurs : RAL, Pantone, créations sur mesure.", "Matériaux : bois (chêne, noyer, bambou…), résine, verre, etc.", "Finitions : mat, brillant, soft-touch, métallisé.", "Programmation : durées de diffusion, intensités, séquences adaptées à vos usages.", "Signature : logo, gravure, motifs, textures, pour que chaque Tolia porte votre identité."] },
    { icon: Package, title: "Packaging & expérience d'unboxing", items: ["Coffret aux couleurs de votre marque, design intérieur soigné.", "Notices et guides à votre charte graphique.", "Possibilité d'ajouter cartes, échantillons, QR codes vers du contenu digital."] },
    { icon: Camera, title: "Kit marketing prêt à l'emploi", items: ["Photos HD, vidéos, animations 3D, visuels lifestyle.", "Formats optimisés pour réseaux sociaux, site web, newsletters et publicités.", "Objectif : lancer votre version de Tolia rapidement, avec tous les outils de communication déjà prêts."] },
  ];

  return (
    <section id="exclusif" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {en ? 'Customisation & 360° offering' : 'Personnalisation & offre 360°'}
          </span>
          <h2 className="heading-section mb-4">
            {en ? 'Create your exclusive version of Tolia' : 'Créer votre version exclusive de Tolia'}
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            {en ? 'Tolia is a platform we adapt to your brand\'s DNA. We work with you to develop an exclusive version of the diffuser, customising the design, materials, finishes and user experience.' : 'Tolia est une plateforme que nous adaptons à l\'ADN de votre marque. Nous travaillons avec vous pour développer une version exclusive du diffuseur, en personnalisant le design, les matériaux, les finitions et l\'expérience utilisateur.'}
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          {productImages.map((img, i) => (
            <motion.div key={i} className="text-center" animate={{ y: [0, -4, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}>
              <div className="rounded-3xl overflow-hidden aspect-square mb-3 border border-border/30 shadow-lg">
                <img src={img.src} alt={img.label} className="w-full h-full object-cover no-select" draggable={false} loading="lazy" decoding="async" />
              </div>
              <p className="font-semibold text-sm">{img.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-6 mb-14 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          {customBlocks.map((block, i) => (
            <motion.div key={i} className="bg-card rounded-3xl p-8 border border-border/50" variants={scaleBlur} whileHover={{ y: -6, boxShadow: '0 20px 40px -12px hsl(28 45% 48% / 0.15)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'hsl(28 45% 48% / 0.1)' }}>
                <block.icon className="w-6 h-6" style={{ color: 'hsl(28 45% 42%)' }} />
              </div>
              <h3 className="font-bold text-lg mb-4">{block.title}</h3>
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed">• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <a href="#contact" onClick={() => trackCTAClick(en ? 'Discuss your exclusive version' : 'Discuter de votre version exclusive', 'exclusif')}>
            <Button className="btn-hero-primary group">
              {en ? 'Discuss your exclusive version of Tolia' : 'Discuter de votre version exclusive de Tolia'}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveVersionSection;
