import React from 'react';
import { motion } from 'framer-motion';
import { BatteryFull, Droplets, RefreshCw, FlaskConical, Wrench, Palette, MousePointerClick, Beaker, SlidersHorizontal, Microscope, Boxes, Flag, LayoutGrid, Compass, ChevronDown, type LucideIcon } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import LegacyAnchors from '@/components/LegacyAnchors';

// Image issue des fichiers 3D (STP) : cloche retirée, base ouverte, flacons avec leur module de diffusion.
const IMG = `${import.meta.env.BASE_URL}journee/anim/living/d_base.webp`;

/** Technologie, en six repères. Remplace « Six ruptures », « Qui fabrique Tolia », « Engagement RSE » et leurs cartes. */
const HomeTechSection: React.FC = () => {
  const { language } = useLanguage();

  const items: { icon: LucideIcon; title: string; text: string; note?: boolean }[] = [
    {
      icon: BatteryFull,
      title: t3(language, 'Jusqu’à 90 h', 'Up to 90 h', 'Hasta 90 h'),
      text: t3(language, 'd’autonomie sans fil, recharge USB-C.', 'of cordless battery life, USB-C charging.', 'de autonomía sin cables, carga USB-C.'),
      note: true,
    },
    {
      icon: Droplets,
      title: t3(language, 'Pure et silencieuse', 'Pure and quiet', 'Pura y silenciosa'),
      text: t3(
        language,
        'Ni eau, ni chaleur, ni pompe, ni ventilateur, ni vibration : l’huile est diffusée telle qu’elle sort du flacon. Rien ne dérange le sommeil, la méditation ou le travail concentré.',
        'No water, no heat, no pump, no fan, no vibration: the oil is diffused exactly as it comes out of the bottle. Nothing disturbs sleep, meditation or focused work.',
        'Sin agua, sin calor, sin bomba, sin ventilador, sin vibración: el aceite se difunde tal como sale del frasco. Nada molesta al sueño, la meditación ni el trabajo concentrado.'
      ),
    },
    {
      icon: RefreshCw,
      title: t3(language, '1 seconde', '1 second', '1 segundo'),
      text: t3(
        language,
        'pour changer d’huile : on échange un flacon contre un autre.',
        'to change oil: you simply swap one bottle for another.',
        'para cambiar de aceite: basta con cambiar un frasco por otro.'
      ),
    },
    {
      icon: FlaskConical,
      title: t3(language, 'Vos flacons', 'Your bottles', 'Sus frascos'),
      text: t3(
        language,
        'Se visse sur les flacons standard (col DIN 18, de 5 à 50 ml).',
        'Screws onto standard bottles (DIN 18 neck, 5 to 50 ml).',
        'Se enrosca en frascos estándar (cuello DIN 18, de 5 a 50 ml).'
      ),
    },
    {
      icon: Wrench,
      title: t3(language, 'Réparable', 'Repairable', 'Reparable'),
      text: t3(
        language,
        'Batterie remplaçable, pièces changées séparément.',
        'Replaceable battery, parts changed separately.',
        'Batería reemplazable, piezas sustituibles por separado.'
      ),
    },
    {
      icon: Palette,
      title: t3(language, 'À votre image', 'Yours to customise', 'A su imagen'),
      text: t3(
        language,
        'Couleurs, matières, finitions, logo et coffret.',
        'Colours, materials, finishes, logo and box.',
        'Colores, materiales, acabados, logotipo y estuche.'
      ),
    },
  ];


  // Avantages produit de l'ancien site (« Six ruptures technologiques », « Qui fabrique Tolia », gamme) qui n'apparaissaient plus.
  const more: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: MousePointerClick,
      title: t3(language, 'Vissez, clipsez, appuyez', 'Screw, clip, press', 'Enrosque, encaje, pulse'),
      text: t3(
        language,
        'Le geste se comprend dès la première utilisation, sans notice : le flacon se visse sur le module, le module se clipse dans le diffuseur, un appui lance la diffusion.',
        'The gesture is clear from the first use, no manual needed: the bottle screws onto the module, the module clips into the diffuser, one press starts diffusion.',
        'El gesto se entiende desde el primer uso, sin manual: el frasco se enrosca en el módulo, el módulo se encaja en el difusor y una pulsación inicia la difusión.'
      ),
    },
    {
      icon: Beaker,
      title: t3(language, 'Tout votre catalogue', 'Your whole catalogue', 'Todo su catálogo'),
      text: t3(
        language,
        'Huiles essentielles pures, synergies complexes, hydrolats, parfums d’intérieur : un seul appareil pour tout votre catalogue, validé sur des centaines de formulations en laboratoire. Plus besoin d’associer un diffuseur à chaque produit.',
        'Pure essential oils, complex blends, hydrosols, home fragrances: one device for your whole catalogue, validated on hundreds of laboratory formulations. No more matching a diffuser to each product.',
        'Aceites esenciales puros, mezclas complejas, hidrolatos, fragancias para el hogar: un solo dispositivo para todo su catálogo, validado en cientos de formulaciones de laboratorio. Ya no hace falta emparejar un difusor con cada producto.'
      ),
    },
    {
      icon: SlidersHorizontal,
      title: t3(language, 'Réglages en un geste', 'Settings in one press', 'Ajustes con una pulsación'),
      text: t3(
        language,
        'Intensité, durée, intermittence : tout se règle d’une pression. Un indicateur LED change de couleur (bleu = durée, vert = intensité, ambre = intermittence), sans application.',
        'Intensity, duration, intermittence: everything adjusts with a single press. An LED indicator changes colour (blue = duration, green = intensity, amber = intermittence), no app needed.',
        'Intensidad, duración, intermitencia: todo se ajusta con una pulsación. Un indicador LED cambia de color (azul = duración, verde = intensidad, ámbar = intermitencia), sin aplicación.'
      ),
    },
    {
      icon: Microscope,
      title: t3(language, 'Zéro colmatage', 'No clogging', 'Sin obstrucciones'),
      text: t3(
        language,
        'Maîtrise microfluidique : huiles résineuses, essences d’agrumes et hydrolats passent sans boucher la buse. Chaque buse est validée au laser, pour une diffusion régulière cycle après cycle.',
        'Microfluidic mastery: resinous oils, citrus essences and hydrosols flow without clogging the nozzle. Every nozzle is laser-validated, for steady diffusion cycle after cycle.',
        'Dominio microfluídico: aceites resinosos, esencias cítricas e hidrolatos fluyen sin obstruir la boquilla. Cada boquilla se valida con láser, para una difusión regular ciclo tras ciclo.'
      ),
    },
    {
      icon: Boxes,
      title: t3(language, 'Un module pour toute la gamme', 'One module for the whole range', 'Un módulo para toda la gama'),
      text: t3(
        language,
        'Le même module de nébulisation fonctionne sur tous les diffuseurs Tolia, actuels et futurs : vos clients gardent leurs flacons d’un modèle à l’autre. De nouveaux formats arrivent (grandes pièces, espaces professionnels, véhicules).',
        'The same nebulisation module works across every current and future Tolia diffuser: your customers keep their bottles from one model to the next. New formats are coming (large rooms, professional spaces, vehicles).',
        'El mismo módulo de nebulización funciona en todos los difusores Tolia, actuales y futuros: sus clientes conservan sus frascos de un modelo a otro. Llegan nuevos formatos (grandes espacios, entornos profesionales, vehículos).'
      ),
    },
    {
      icon: Flag,
      title: t3(language, 'Conçu en France, 20 ans de R&D', 'Designed in France, 20 years of R&D', 'Diseñado en Francia, 20 años de I+D'),
      text: t3(
        language,
        'Ingénierie, prototypage et assemblage dans notre site français. Microfluidique, acoustique, laser, électronique embarquée : quatre disciplines, un seul fabricant, qui conçoit et développe lui-même la technologie. Tolia est notre 7ᵉ génération.',
        'Engineering, prototyping and assembly at our French facility. Microfluidics, acoustics, laser, embedded electronics: four disciplines, one manufacturer that designs and develops the technology itself. Tolia is our 7th generation.',
        'Ingeniería, prototipado y ensamblaje en nuestra instalación francesa. Microfluídica, acústica, láser, electrónica embarcada: cuatro disciplinas, un solo fabricante que diseña y desarrolla la tecnología él mismo. Tolia es nuestra 7ª generación.'
      ),
    },
    {
      icon: LayoutGrid,
      title: t3(language, 'Une seule référence à gérer', 'One reference to manage', 'Una sola referencia que gestionar'),
      text: t3(
        language,
        'Un diffuseur universel à la place de 5, 8 ou 10 références : moins de stock immobilisé, moins de SAV, plus de marge par référence, et un seul discours produit pour vos équipes.',
        'One universal diffuser instead of 5, 8 or 10 references: less tied-up stock, less after-sales, more margin per reference, and a single product story for your teams.',
        'Un difusor universal en lugar de 5, 8 o 10 referencias: menos stock inmovilizado, menos postventa, más margen por referencia y un solo discurso de producto para sus equipos.'
      ),
    },
    {
      icon: Compass,
      title: t3(language, 'Il voyage avec vos clients', 'It travels with your customers', 'Viaja con sus clientes'),
      text: t3(
        language,
        'Léger et sans fil : chambre, bureau, voiture, spa, salle de yoga. Chaque nouveau lieu d’usage est un nouveau moment de consommation d’huile.',
        'Light and cordless: bedroom, office, car, spa, yoga room. Each new place of use is a new moment of oil consumption.',
        'Ligero e inalámbrico: dormitorio, oficina, coche, spa, sala de yoga. Cada nuevo lugar de uso es un nuevo momento de consumo de aceite.'
      ),
    },
  ];


  // Comparaison de l'ancien site (« Pourquoi les diffuseurs échouent »), sans les chiffres non confirmés.
  const comparison: { tech: string; issue: string; tolia?: boolean }[] = [
    {
      tech: t3(language, 'Ultrasonique (à eau)', 'Ultrasonic (water-based)', 'Ultrasónico (con agua)'),
      issue: t3(language, 'Remplissage et nettoyage obligatoires, eau stagnante, huile diluée dans l’eau.', 'Daily filling and cleaning, stagnant water, oil diluted in water.', 'Llenado y limpieza obligatorios, agua estancada, aceite diluido en agua.'),
    },
    {
      tech: t3(language, 'Diffusion par chaleur', 'Heat diffusion', 'Difusión por calor'),
      issue: t3(language, 'La chaleur altère les terpènes et les molécules actives : rendu olfactif faible et de courte durée.', 'Heat degrades terpenes and active molecules: weak, short-lived scent.', 'El calor altera los terpenos y las moléculas activas: aroma débil y de corta duración.'),
    },
    {
      tech: t3(language, 'Passif (bâtonnets, pierre)', 'Passive (reeds, stone)', 'Pasivo (varillas, piedra)'),
      issue: t3(language, 'Aucun contrôle d’intensité ni de durée, rendement faible : aucune routine ne s’installe.', 'No control over intensity or duration, low output: no routine builds up.', 'Sin control de intensidad ni de duración, bajo rendimiento: no se crea ninguna rutina.'),
    },
    {
      tech: t3(language, 'Nébuliseur classique (verre)', 'Classic nebuliser (glass)', 'Nebulizador clásico (vidrio)'),
      issue: t3(language, 'Bruit de pompe, verrerie fragile, démontage et nettoyage complexes entre chaque utilisation.', 'Pump noise, fragile glassware, complex disassembly and cleaning after every use.', 'Ruido de bomba, cristalería frágil, desmontaje y limpieza complejos tras cada uso.'),
    },
    {
      tech: 'Tolia',
      tolia: true,
      issue: t3(language, 'Zéro friction : on visse, on appuie. Pas d’eau, pas de nettoyage, pas de bruit, une huile différente en 1 seconde.', 'Zero friction: screw, press. No water, no cleaning, no noise, a different oil in 1 second.', 'Cero fricción: se enrosca y se pulsa. Sin agua, sin limpieza, sin ruido, un aceite distinto en 1 segundo.'),
    },
  ];

  const footnote = t3(
    language,
    '¹ 70 à 90 h lumière éteinte, 16 à 20 h lumière d’ambiance allumée, selon l’intensité.',
    '¹ 70–90 h with the light off, 16–20 h with the ambient light on, depending on intensity.',
    '¹ De 70 a 90 h con la luz apagada, de 16 a 20 h con la luz ambiental encendida, según la intensidad.'
  );

  return (
    <section id="technologie" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <LegacyAnchors ids={['four-innovations', 'why-innobiz']} />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Technologie', 'Technology', 'Tecnología')}
          </span>
          <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t3(language, 'Simple pour vos clients. Pensé pour durer.', 'Simple for your customers. Built to last.', 'Sencillo para sus clientes. Pensado para durar.')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            className="overflow-hidden rounded-3xl shadow-xl border border-border/40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeBlurUp}
          >
            <img
              src={IMG}
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
              alt={t3(
                language,
                'Diffuseur Tolia ouvert sur une table : la cloche est posée à côté de la base, des flacons avec leur module de diffusion attendent',
                'Tolia diffuser opened on a table: the cover stands beside the base, bottles with their diffusion module wait their turn',
                'Difusor Tolia abierto sobre una mesa: la cubierta junto a la base y frascos con su módulo de difusión a la espera'
              )}
            />
          </motion.div>

          <motion.ul
            className="grid sm:grid-cols-2 gap-x-8 gap-y-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            {items.map((it, i) => (
              <motion.li key={i} className="flex gap-4" variants={fadeBlurUp}>
                <span
                  className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full"
                  style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 52% 36%)' }}
                  aria-hidden="true"
                >
                  <it.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-lg leading-snug">
                    {it.title}
                    {it.note && <sup className="ml-0.5 text-xs text-muted-foreground">1</sup>}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{it.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="mt-14 border-t border-border/60 pt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground" variants={fadeBlurUp}>
            {t3(language, 'Et tout ce qui fait la différence', 'And everything that makes the difference', 'Y todo lo que marca la diferencia')}
          </motion.p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            {more.map((it, i) => (
              <motion.li key={i} className="flex gap-4" variants={fadeBlurUp}>
                <span
                  className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-full"
                  style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 52% 36%)' }}
                  aria-hidden="true"
                >
                  <it.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-lg leading-snug">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{it.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <details className="group mx-auto mt-12 max-w-4xl rounded-2xl border border-border/50 bg-card px-5 md:px-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
            <span>{t3(language, 'Pourquoi les autres diffuseurs finissent dans un placard', 'Why other diffusers end up in a cupboard', 'Por qué otros difusores acaban en un armario')}</span>
            <ChevronDown className="h-5 w-5 flex-none text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <dl className="divide-y divide-border/60 pb-3">
            {comparison.map((row, i) => (
              <div key={i} className="grid gap-1 py-4 md:grid-cols-[13rem_1fr] md:gap-6">
                <dt className={`font-semibold ${row.tolia ? '' : 'text-foreground'}`} style={row.tolia ? { color: 'hsl(28 52% 36%)' } : undefined}>{row.tech}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{row.issue}</dd>
              </div>
            ))}
          </dl>
        </details>

        <p className="mt-10 text-center text-xs text-muted-foreground">{footnote}</p>
      </div>
    </section>
  );
};

export default HomeTechSection;
