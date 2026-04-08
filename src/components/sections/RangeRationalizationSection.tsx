import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Layers, Rocket, CheckCircle, ArrowRight, Gift } from 'lucide-react';
import toliaOneForAll from '@/assets/tolia-one-for-all.jpg';
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
      fr: 'Un seul diffuseur pour huiles essentielles, synergies, hydrolats et parfums d\'intérieur. Plus besoin de références multiples.',
      en: 'One single diffuser for essential oils, blends, hydrosols and home fragrances. No more multiple references.',
      es: 'Un solo difusor para aceites esenciales, mezclas, hidrolatos y fragancias para el hogar. Sin necesidad de múltiples referencias.',
    },
    {
      fr: 'Moins de SKU à gérer, moins de stock dormant, moins de SAV. Votre catalogue gagne en lisibilité et vos équipes en efficacité.',
      en: 'Fewer SKUs to manage, less dormant stock, less after-sales support. Your catalogue gains clarity and your teams gain efficiency.',
      es: 'Menos SKU que gestionar, menos stock inactivo, menos servicio postventa. Su catálogo gana en claridad y sus equipos en eficiencia.',
    },
    {
      fr: 'Vos clients retrouvent un discours simple et cohérent : un appareil, toutes les possibilités. La recommandation en magasin devient immédiate.',
      en: 'Your customers get a simple, coherent message: one device, every possibility. In-store recommendation becomes instant.',
      es: 'Sus clientes reciben un mensaje simple y coherente: un dispositivo, todas las posibilidades. La recomendación en tienda se vuelve inmediata.',
    },
  ];

  const roadmapItems = [
    {
      fr: 'Tolia, le diffuseur portable et sans fil, déjà disponible.',
      en: 'Tolia, the portable wireless diffuser, already available.',
      es: 'Tolia, el difusor portátil e inalámbrico, ya disponible.',
    },
    {
      fr: 'De nouveaux formats Twist & Mist arrivent cette année pour couvrir d\'autres usages : grandes pièces, espaces professionnels, véhicules.',
      en: 'New Twist & Mist formats are arriving this year to cover more use cases: large rooms, professional spaces, vehicles.',
      es: 'Nuevos formatos Twist & Mist llegan este año para cubrir más usos: grandes espacios, entornos profesionales, vehículos.',
    },
    {
      fr: 'Une seule technologie, une seule gamme, une seule histoire à raconter. La cohérence parfaite pour votre marque.',
      en: 'One technology, one range, one story to tell. Perfect coherence for your brand.',
      es: 'Una tecnología, una gama, una historia que contar. Coherencia perfecta para su marca.',
    },
  ];

  return (
    <section id="range-rationalization" className="py-24 md:py-32 relative overflow-hidden"
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
              'Aujourd\'hui, les marques d\'aromathérapie proposent 3, 5, parfois 10 diffuseurs différents. Chacun avec ses limites, ses consommables, son discours spécifique. Le résultat ? Un catalogue confus, des stocks lourds, un SAV fragmenté, et des clients qui ne savent plus quoi choisir. Tolia change cette équation. Un seul appareil compatible avec toutes les formulations, un seul geste pour changer de flacon, et une technologie qui s\'adapte à tous les contextes d\'usage.',
              'Today, aromatherapy brands offer 3, 5, sometimes 10 different diffusers. Each with its own limitations, consumables, and specific messaging. The result? A confusing catalogue, heavy inventory, fragmented after-sales, and customers who no longer know what to choose. Tolia changes this equation. One single device compatible with every formulation, one gesture to switch bottles, and a technology that adapts to every usage context.',
              'Hoy, las marcas de aromaterapia ofrecen 3, 5, a veces 10 difusores diferentes. Cada uno con sus limitaciones, sus consumibles, su discurso específico. ¿El resultado? Un catálogo confuso, inventarios pesados, un servicio postventa fragmentado, y clientes que ya no saben qué elegir. Tolia cambia esta ecuación. Un solo dispositivo compatible con todas las formulaciones, un gesto para cambiar de frasco, y una tecnología que se adapta a todos los contextos de uso.'
            )}
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="max-w-4xl mx-auto mb-20 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={toliaOneForAll}
            alt={t3(l,
              "Un diffuseur Tolia entouré de dizaines de flacons d'huiles essentielles, synergies, hydrolats et parfums d'intérieur",
              "A Tolia diffuser surrounded by dozens of essential oil, blend, hydrosol and home fragrance bottles",
              "Un difusor Tolia rodeado de decenas de frascos de aceites esenciales, mezclas, hidrolatos y fragancias para el hogar"
            )}
            className="w-full h-auto object-cover no-select"
            draggable={false}
            loading="lazy"
            decoding="async"
            width={1280}
            height={720}
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
