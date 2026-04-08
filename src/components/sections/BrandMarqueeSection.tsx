import React from 'react';
import { motion } from 'framer-motion';

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
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'hsl(35 30% 97%)' }}>
      <div className="section-container text-center mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            20 years of trust
          </span>
          <h2 className="heading-section mb-4">
            Trusted by the brands that shape aromatherapy and natural wellness
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            For over 20 years, Innobiz has partnered with the industry's most respected names.
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
        Brand logos shown are the property of their respective owners and reflect historical or ongoing collaborations with Innobiz.
      </p>
    </section>
  );
};

export default BrandMarqueeSection;
