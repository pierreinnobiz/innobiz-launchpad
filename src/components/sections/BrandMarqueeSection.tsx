import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

// logos dans src/assets/logos : servis depuis /assets/ avec empreinte, gardés en mémoire par le navigateur (22/10/2026)
const LOGOS = import.meta.glob('../../assets/logos/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const logo = (file: string) => LOGOS[`../../assets/logos/${file}`];

const BRANDS = [
  { name: 'Pierre Fabre', src: logo('pierre-fabre.svg') },
  { name: 'Puressentiel', src: logo('puressentiel.svg') },
  { name: 'Arkopharma', src: logo('arkopharma.svg') },
  { name: 'Florame', src: logo('florame.svg') },
  { name: 'Nature & Découvertes', src: logo('nature-et-decouvertes.svg') },
  { name: 'Esteban Paris Parfums', src: logo('esteban.svg') },
  { name: 'Tisserand Aromatherapy', src: logo('tisserand.svg') },
  { name: 'Aromalife', src: logo('aromalife.svg') },
  { name: 'La Compagnie des Sens', src: logo('compagnie-des-sens.svg') },
  { name: 'Primavera Life', src: logo('primavera.svg') },
];

// Version courte : une seule ligne de texte (les anciens titre et paragraphe sont retirés).
const BrandMarqueeSection: React.FC = () => {
  const { language } = useLanguage();
  const loop = [...BRANDS, ...BRANDS];

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
        {/* 22/10/2026 (accessibilité) : défilé arrêté si « réduire les animations » est activé ; pause au toucher et au clavier ;
            la 2e série (copie pour la boucle) est cachée aux lecteurs d'écran ; texte des logos dans la langue de la page */}
        <div
          className="flex w-max animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center gap-16 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] group-active:[animation-play-state:paused] items-center py-2"
        >
          {loop.map((b, i) => (
            <img
              key={i}
              src={b.src}
              aria-hidden={i >= BRANDS.length ? true : undefined}
              alt={i >= BRANDS.length ? '' : t3(language, `Logo ${b.name}`, `${b.name} logo`, `Logotipo de ${b.name}`)}
              className={`h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${i >= BRANDS.length ? 'motion-reduce:hidden' : ''}`}
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
