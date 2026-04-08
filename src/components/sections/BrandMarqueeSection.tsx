import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const BRANDS = [
  { name: 'Pierre Fabre', src: '/logos/pierre-fabre.svg' },
  { name: 'Puressentiel', src: '/logos/puressentiel.svg' },
  { name: 'Arkopharma', src: '/logos/arkopharma.svg' },
  { name: 'Florame', src: '/logos/florame.svg' },
  { name: 'Nature & Découvertes', src: '/logos/nature-et-decouvertes.svg' },
  { name: 'Esteban Paris Parfums', src: '/logos/esteban.svg' },
  { name: 'Tisserand Aromatherapy', src: '/logos/tisserand.svg' },
  { name: 'Aromalife', src: '/logos/aromalife.svg' },
  { name: 'La Compagnie des Sens', src: '/logos/compagnie-des-sens.svg' },
  { name: 'Primavera Life', src: '/logos/primavera.svg' },
];

const BrandMarqueeSection: React.FC = () => {
  const { language } = useLanguage();
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'hsl(35 30% 97%)' }}>
      <div className="section-container text-center mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, "La confiance des leaders de l'industrie depuis 20 ans", 'Trusted by industry leaders for 20 years', 'La confianza de líderes del sector desde hace 20 años')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(language,
              "Les marques qui façonnent l'aromathérapie et le bien-être naturel travaillent déjà avec nous",
              'The brands shaping aromatherapy and natural wellness already work with us',
              'Las marcas que moldean la aromaterapia y el bienestar natural ya trabajan con nosotros'
            )}
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            {t3(language,
              "Des groupes pharmaceutiques aux marques de bien-être premium, Innobiz est le partenaire technologique de diffusion de confiance depuis plus de deux décennies. Ces relations sont bâties sur des performances prouvées, pas sur des promesses.",
              'From pharmaceutical groups to premium wellness brands, Innobiz has been the trusted diffusion technology partner for over two decades. These relationships are built on proven performance, not promises.',
              'Desde grupos farmacéuticos hasta marcas premium de bienestar, Innobiz ha sido el socio tecnológico de difusión de confianza durante más de dos décadas. Estas relaciones se basan en rendimiento probado, no en promesas.'
            )}
          </p>
        </motion.div>
      </div>

      <div
        className="group relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused] items-center py-4">
          {loop.map((b, i) => (
            <img
              key={i}
              src={b.src}
              alt={`${b.name} logo`}
              className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground px-6">
        {t3(language,
          "Les logos des marques affichés sont la propriété de leurs détenteurs respectifs et reflètent des collaborations historiques ou en cours avec Innobiz.",
          'Brand logos shown are the property of their respective owners and reflect historical or ongoing collaborations with Innobiz.',
          'Los logos de marcas mostrados son propiedad de sus respectivos titulares y reflejan colaboraciones históricas o en curso con Innobiz.'
        )}
      </p>
    </section>
  );
};

export default BrandMarqueeSection;
