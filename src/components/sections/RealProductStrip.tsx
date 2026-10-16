import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const BASE = `${import.meta.env.BASE_URL}journee/img/`;

/**
 * « Le produit existe » : trois vraies photos du prototype (iPhone, avril 2026), recadrées sans retouche de couleur.
 * Elles montrent que Tolia est un objet réel, à côté des images 3D de la page.
 * Version d'essai : les photos de la séance « vrai Tolia » les remplaceront.
 */
const RealProductStrip: React.FC = () => {
  const { language } = useLanguage();

  const photos = [
    {
      file: 'reel_ferme.webp',
      alt: t3(
        language,
        'Photo du diffuseur Tolia fermé sur une table : cloche blanche à motif diamant, base rose pâle, buse dorée',
        'Photo of the closed Tolia diffuser on a table: white diamond-pattern cover, pale pink base, gold nozzle',
        'Foto del difusor Tolia cerrado sobre una mesa: cubierta blanca con motivo de diamante, base rosa pálido, boquilla dorada'
      ),
      caption: t3(language, 'Tolia fermé : cloche à motif diamant.', 'Tolia closed: diamond-pattern cover.', 'Tolia cerrado: cubierta con motivo de diamante.'),
    },
    {
      file: 'reel_ouvert.webp',
      alt: t3(
        language,
        'Photo du diffuseur Tolia ouvert : la cloche est posée à côté, un flacon est vissé dans la base',
        'Photo of the open Tolia diffuser: the cover stands beside it, a bottle is screwed into the base',
        'Foto del difusor Tolia abierto: la cubierta a un lado y un frasco enroscado en la base'
      ),
      caption: t3(language, 'Cloche retirée : le flacon se visse dans la base.', 'Cover removed: the bottle screws into the base.', 'Cubierta retirada: el frasco se enrosca en la base.'),
    },
    {
      file: 'reel_diamant.webp',
      alt: t3(
        language,
        'Gros plan sur le motif diamant en relief de la cloche Tolia',
        'Close-up of the raised diamond pattern on the Tolia cover',
        'Primer plano del motivo de diamante en relieve de la cubierta Tolia'
      ),
      caption: t3(language, 'Le motif diamant, au plus près.', 'The diamond pattern, up close.', 'El motivo de diamante, de cerca.'),
    },
  ];

  return (
    <section id="produit-reel" className="py-14 md:py-20 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-9 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Un objet réel', 'A real object', 'Un objeto real')}
          </span>
          <h2 className="heading-section text-foreground">{t3(language, 'Le produit existe.', 'The product exists.', 'El producto existe.')}</h2>
        </motion.div>

        <motion.ul
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {photos.map((p) => (
            <motion.li key={p.file} className="w-[72%] flex-none snap-center md:w-auto" variants={fadeBlurUp}>
              <figure>
                <img
                  src={`${BASE}${p.file}`}
                  width={1000}
                  height={1250}
                  loading="lazy"
                  decoding="async"
                  alt={p.alt}
                  className="aspect-[4/5] w-full rounded-2xl border border-border/40 object-cover shadow-md"
                />
                <figcaption className="mt-3 text-sm text-muted-foreground">{p.caption}</figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t3(
            language,
            'Photos non retouchées, prises en avril 2026 sur nos prototypes.',
            'Unretouched photos, taken in April 2026 on our prototypes.',
            'Fotos sin retocar, tomadas en abril de 2026 con nuestros prototipos.'
          )}
        </p>
      </div>
    </section>
  );
};

export default RealProductStrip;
