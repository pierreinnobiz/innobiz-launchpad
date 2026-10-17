import React from 'react';
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

// Version courte : une seule ligne de texte (les anciens titre et paragraphe sont retirés).
const BrandMarqueeSection: React.FC = () => {
  const { language } = useLanguage();
  const loop = [...BRANDS, ...BRANDS];
  const base = import.meta.env.BASE_URL;

  return (
    <section id="marques" className="py-12 md:py-14 relative overflow-hidden" style={{ background: 'hsl(35 30% 97%)' }}>
      <h2 className="text-center text-lg md:text-xl font-semibold text-foreground px-6 mb-8">
        {t3(
          language,
          'Elles travaillent, ou ont travaillé, avec Innobiz.',
          'They work, or have worked, with Innobiz.',
          'Trabajan, o han trabajado, con Innobiz.'
        )}
      </h2>

      <div
        className="group relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused] items-center py-2">
          {loop.map((b, i) => (
            <img
              key={i}
              src={`${base}${b.src.replace(/^\//, '')}`}
              alt={`${b.name} logo`}
              className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground px-6">
        {t3(
          language,
          'Logos : propriété de leurs détenteurs respectifs.',
          'Logos are the property of their respective owners.',
          'Logotipos: propiedad de sus respectivos titulares.'
        )}
      </p>
    </section>
  );
};

export default BrandMarqueeSection;
