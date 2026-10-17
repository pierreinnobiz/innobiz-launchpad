import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, Boxes, Droplets, Flag, FlaskConical, Microscope, MousePointerClick, RefreshCw, SlidersHorizontal, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import LegacyAnchors from '@/components/LegacyAnchors';
import CarouselDots from '@/components/CarouselDots';

/**
 * « Simple pour vos clients. Pensé pour durer. » — version compacte (17/10/2026, demande de Pierre) :
 * neuf repères de longueur semblable (douze au cycle 1, réduits après le test par les marques), sans image ni tableau replié (la comparaison des technologies est maintenant
 * expliquée dès le début du site, dans « Le constat »). « Zéro colmatage » devient « Plus de 150 huiles testées ».
 */
const HomeTechSection: React.FC = () => {
  const { language: l } = useLanguage();
  const liste = useRef<HTMLUListElement>(null);

  const items: { icon: LucideIcon; title: string; text: string; note?: boolean }[] = [
    {
      icon: BatteryFull,
      title: t3(l, 'Jusqu’à 90 h, sans fil', 'Up to 90 h, cordless', 'Hasta 90 h, sin cables'),
      text: t3(
        l,
        'Sur batterie, rechargeable en USB‑C : il passe de la chambre au bureau, au spa ou à la salle de yoga, sans chercher de prise.',
        'Battery-powered with USB‑C charging: it moves from bedroom to office, spa or yoga room, no socket needed.',
        'Con batería y carga USB‑C: pasa del dormitorio a la oficina, al spa o a la sala de yoga, sin buscar un enchufe.'
      ),
      note: true,
    },
    {
      icon: Droplets,
      title: t3(l, 'Pure et silencieuse', 'Pure and quiet', 'Pura y silenciosa'),
      text: t3(
        l,
        'Ni eau, ni chaleur : l’huile est diffusée pure. Ni pompe ni ventilateur : aucun bruit de moteur.',
        'No water, no heat: the oil is diffused pure. No pump, no fan: no motor noise.',
        'Sin agua ni calor: el aceite se difunde puro. Sin bomba ni ventilador: ningún ruido de motor.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(l, 'Une autre huile en 1 seconde', 'A different oil in 1 second', 'Otro aceite en 1 segundo'),
      text: t3(
        l,
        'Le module reste vissé sur chaque flacon : on échange un flacon contre un autre, sans rien vider, rincer ni sécher.',
        'The module stays screwed onto each bottle: swap one bottle for another, with nothing to empty, rinse or dry.',
        'El módulo permanece enroscado en cada frasco: se cambia un frasco por otro, sin vaciar, enjuagar ni secar nada.'
      ),
    },
    {
      icon: FlaskConical,
      title: t3(l, 'Vos flacons, tels quels', 'Your bottles, as they are', 'Sus frascos, tal cual'),
      text: t3(
        l,
        'Le module se visse sur les flacons standard du marché (col DIN 18, de 5 à 50 ml). Rien à transvaser : le flacon s’utilise tel quel.',
        'The module screws onto industry-standard bottles (DIN 18 neck, 5 to 50 ml). Nothing to decant: the bottle is used as it is.',
        'El módulo se enrosca en los frascos estándar del mercado (cuello DIN 18, de 5 a 50 ml). Nada que trasvasar: el frasco se usa tal cual.'
      ),
    },
    {
      icon: MousePointerClick,
      title: t3(l, 'Vissez, clipsez, appuyez', 'Screw, clip, press', 'Enrosque, encaje, pulse'),
      text: t3(
        l,
        'Le geste se comprend dès la première fois : le flacon se visse sur son module, puis se clipse dans la base ; un appui lance la diffusion.',
        'Intuitive from the very first use: the bottle screws onto its module, then clips into the base; one press starts diffusion.',
        'El gesto se entiende a la primera: el frasco se enrosca en su módulo y luego se encaja en la base; una pulsación inicia la difusión.'
      ),
    },
    {
      icon: Microscope,
      title: t3(l, 'Plus de 150 huiles testées', 'Over 150 oils tested', 'Más de 150 aceites probados'),
      text: t3(
        l,
        'Une technologie testée sur plus de 150 huiles essentielles et synergies, capable de diffuser aussi des parfums synthétiques et d’intérieur.',
        'A technology tested on more than 150 essential oils and blends, which can also diffuse synthetic and home fragrances.',
        'Una tecnología probada con más de 150 aceites esenciales y sinergias, capaz de difundir también perfumes sintéticos y fragancias para el hogar.'
      ),
    },
    {
      icon: SlidersHorizontal,
      title: t3(l, 'Une diffusion facile à régler', 'Easy-to-adjust diffusion', 'Una difusión fácil de ajustar'),
      text: t3(
        l,
        'La durée, la puissance et l’intermittence de la diffusion se règlent très simplement, pour répondre à toutes les conditions d’usage.',
        'Diffusion time, strength and on/off cycles are very easy to adjust, to suit every situation.',
        'La duración, la potencia y la intermitencia de la difusión se ajustan de forma muy sencilla, para adaptarse a cualquier situación de uso.'
      ),
    },
    {
      icon: Boxes,
      // avantage de l'ancien site gardé (règle de Pierre : ne perdre aucun avantage). Au cycle 3, l'expert conseillait de le retirer
      // (lu comme une contradiction avec « Une seule référence à gérer », devenue « Un seul diffuseur pour toutes vos huiles ») :
      // décision laissée à Pierre.
      title: t3(l, 'Un module pour toute la gamme', 'One module for the whole range', 'Un módulo para toda la gama'),
      text: t3(
        l,
        'Le même module de diffusion sert sur tous les modèles Tolia, y compris les formats à venir pour les grandes pièces et les espaces professionnels.',
        'The same diffusion module works in every Tolia model, including upcoming formats for large rooms and professional spaces.',
        'El mismo módulo de difusión sirve en todos los modelos Tolia, incluidos los futuros formatos para grandes espacios y entornos profesionales.'
      ),
    },
    {
      icon: Flag,
      title: t3(l, 'Conçu en France, 7ᵉ génération', 'Designed in France, 7th generation', 'Diseñado en Francia, 7.ª generación'),
      text: t3(
        l,
        'Notre équipe d’ingénieurs l’a conçu en s’appuyant sur 20 ans de R&D en microfluidique et en électronique.',
        'Designed by our engineering team, drawing on 20 years of R&D in microfluidics and electronics.',
        'Diseñado por nuestro equipo de ingenieros, con 20 años de I+D en microfluídica y electrónica.'
      ),
    },
  ];

  const footnote = t3(
    l,
    '¹ 70 à 90 h lumière éteinte, 16 à 20 h lumière d’ambiance allumée, selon l’intensité.',
    '¹ 70–90 h with the light off, 16–20 h with the ambient light on, depending on intensity.',
    '¹ De 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental encendida, según la intensidad.'
  );

  return (
    <section id="technologie" className="py-14 md:py-20 bg-background relative overflow-hidden">
      <LegacyAnchors ids={['four-innovations', 'why-innobiz']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'Technologie', 'Technology', 'Tecnología')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(l, 'Simple pour vos clients. Pensé pour durer.', 'Simple for your customers. Built to last.', 'Sencillo para sus clientes. Pensado para durar.')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            {t3(
              l,
              'Les caractéristiques qui rendent Tolia si simple, en neuf repères.',
              'The features that make Tolia so simple, in nine points.',
              'Las características que hacen que Tolia sea tan sencillo, en nueve puntos.'
            )}
          </p>
        </motion.div>

        <motion.ul
          ref={liste}
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {items.map((it) => (
            <motion.li key={it.title} className="flex min-w-[80%] snap-start gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:min-w-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0" variants={fadeBlurUp}>
              <span
                className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full"
                style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 52% 36%)' }}
                aria-hidden="true"
              >
                <it.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground text-base md:text-lg leading-snug">
                  {it.title}
                  {it.note && <sup className="ml-0.5 text-xs text-muted-foreground">1</sup>}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{it.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <CarouselDots target={liste} count={items.length} className="mt-2 sm:hidden" />

        <p className="mt-8 sm:mt-10 text-center text-xs text-muted-foreground">{footnote}</p>
      </div>
    </section>
  );
};

export default HomeTechSection;
