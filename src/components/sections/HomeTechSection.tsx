import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, Boxes, Droplets, Flag, FlaskConical, Microscope, MousePointerClick, RefreshCw, SlidersHorizontal, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import LegacyAnchors from '@/components/LegacyAnchors';

/**
 * « Simple pour vos clients. Pensé pour durer. » — version compacte (17/10/2026, demande de Pierre) :
 * neuf repères de longueur semblable (douze au cycle 1, réduits après le test par les marques), sans image ni tableau replié (la comparaison des technologies est maintenant
 * expliquée dès le début du site, dans « Le constat »). « Zéro colmatage » devient « Plus de 150 huiles testées ».
 */
const HomeTechSection: React.FC = () => {
  const { language: l } = useLanguage();

  const items: { icon: LucideIcon; title: string; text: string; note?: boolean }[] = [
    {
      icon: BatteryFull,
      title: t3(l, 'Jusqu’à 90 h, sans fil', 'Up to 90 h, cordless', 'Hasta 90 h, sin cables'),
      text: t3(
        l,
        'Sur batterie, recharge USB-C. Il passe de la chambre au bureau, à la voiture, au spa ou à la salle de yoga.',
        'Battery-powered, USB-C charging. It moves from bedroom to office, car, spa or yoga room, no socket needed.',
        'Con batería y carga USB-C. Pasa del dormitorio a la oficina, al coche, al spa o a la sala de yoga.'
      ),
      note: true,
    },
    {
      icon: Droplets,
      title: t3(l, 'Pure et silencieuse', 'Pure and silent', 'Pura y silenciosa'),
      text: t3(
        l,
        'Ni eau, ni chaleur : l’huile est diffusée pure. Ni pompe, ni ventilateur, ni vibration : rien ne trouble le sommeil.',
        'No water, no heat: the oil is diffused pure. No pump, no fan, no vibration: nothing disturbs sleep.',
        'Sin agua ni calor: el aceite se difunde puro. Sin bomba, sin ventilador, sin vibración: nada perturba el sueño.'
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
        'Le module se visse sur les flacons standard du marché (col DIN 18, de 5 à 50 ml). Le flacon devient la recharge.',
        'The module screws onto industry-standard bottles (DIN 18 neck, 5 to 50 ml). The bottle becomes the refill.',
        'El módulo se enrosca en los frascos estándar del mercado (cuello DIN 18, de 5 a 50 ml). El frasco es la recarga.'
      ),
    },
    {
      icon: MousePointerClick,
      title: t3(l, 'Vissez, clipsez, appuyez', 'Screw, clip, press', 'Enrosque, encaje, pulse'),
      text: t3(
        l,
        'Le geste se comprend dès la première fois, sans notice : le flacon se visse, le module se clipse, un appui diffuse.',
        'Intuitive from the very first use, no manual needed: the bottle screws on, the module clips in, one press starts diffusion.',
        'El gesto se entiende desde la primera vez, sin manual: el frasco se enrosca, el módulo se encaja y una pulsación difunde.'
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
      title: t3(l, 'Réglages en un geste', 'Settings in one press', 'Ajustes con una pulsación'),
      text: t3(
        l,
        'Intensité, durée et intermittence se règlent d’une pression, avec un indicateur LED bleu, vert ou ambre. Sans application.',
        'Intensity, run time and on/off cycles are all set from one button, with a blue, green or amber LED indicator. No app.',
        'Intensidad, duración e intermitencia se ajustan con una pulsación, con un indicador LED azul, verde o ámbar. Sin aplicación.'
      ),
    },
    {
      icon: Boxes,
      title: t3(l, 'Un module pour toute la gamme', 'One module for the whole range', 'Un módulo para toda la gama'),
      text: t3(
        l,
        'Le même module sert sur tous les diffuseurs Tolia, actuels et futurs : grandes pièces, espaces pros, véhicules.',
        'The same module works in every Tolia diffuser, current and future: large rooms, professional spaces, vehicles.',
        'El mismo módulo sirve en todos los difusores Tolia, actuales y futuros: grandes espacios, entornos profesionales, vehículos.'
      ),
    },
    {
      icon: Flag,
      title: t3(l, 'Conçu en France, 7ᵉ génération', 'Designed in France, 7th generation', 'Diseñado en Francia, 7.ª generación'),
      text: t3(
        l,
        'Ingénierie, prototypage et assemblage dans notre site français : 20 ans de R&D en microfluidique et électronique.',
        'Engineering, prototyping and assembly at our French facility: 20 years of R&D in microfluidics and electronics.',
        'Ingeniería, prototipado y ensamblaje en nuestra planta francesa: 20 años de I+D en microfluídica y electrónica.'
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
          className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {items.map((it) => (
            <motion.li key={it.title} className="flex gap-4" variants={fadeBlurUp}>
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

        <p className="mt-10 text-center text-xs text-muted-foreground">{footnote}</p>
      </div>
    </section>
  );
};

export default HomeTechSection;
