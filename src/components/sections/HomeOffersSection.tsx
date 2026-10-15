import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import LegacyAnchors from '@/components/LegacyAnchors';

const BASE = `${import.meta.env.BASE_URL}journee/img/`;

// Même comportement qu'avant : le bouton mémorise le type de projet puis fait défiler jusqu'au formulaire.
const goToContact = (type: 'white-label' | 'stock', label: string) => {
  trackCTAClick(label, 'offers', type === 'white-label' ? 'whitelabel' : 'quote_stock');
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('type', type);
    url.hash = '#contact';
    window.history.replaceState(null, '', url.toString());
    window.dispatchEvent(new Event('tolia:pathchange'));
  } catch {
    /* adresse non modifiable (page intégrée dans un cadre) : on fait défiler quand même jusqu'au formulaire */
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

/** Les deux façons de démarrer. Remplace « Le calcul financier », « Preuve marché », « Une gamme simplifiée » et « Deux modèles ». */
const HomeOffersSection: React.FC = () => {
  const { language } = useLanguage();

  const offers = [
    {
      type: 'white-label' as const,
      img: `${BASE}custom_variants_d.webp`,
      alt: t3(
        language,
        'Sept diffuseurs Tolia personnalisés : motifs de cloche, couleurs et matières différents',
        'Seven customised Tolia diffusers: different cover patterns, colours and materials',
        'Siete difusores Tolia personalizados: distintos motivos de cubierta, colores y materiales'
      ),
      title: t3(language, 'Marque blanche', 'White label', 'Marca blanca'),
      text: t3(
        language,
        'Votre diffuseur, à votre image : couleurs, matières, logo et coffret.',
        'Your diffuser, in your image: colours, materials, logo and box.',
        'Su difusor, a su imagen: colores, materiales, logotipo y estuche.'
      ),
      facts: t3(language, 'Généralement dès 3 000 pièces · 12 à 20 semaines', 'Typically from 3,000 units · 12 to 20 weeks', 'Normalmente desde 3.000 unidades · 12 a 20 semanas'),
      cta: t3(language, 'Parler de mon projet', 'Discuss my project', 'Hablar de mi proyecto'),
    },
    {
      type: 'stock' as const,
      img: `${BASE}zoom_living_d.webp`,
      alt: t3(
        language,
        'Diffuseur Tolia refermé sur une table : la brume sort de la buse en jet oblique',
        'Closed Tolia diffuser on a table: the mist leaves the nozzle in an oblique jet',
        'Difusor Tolia cerrado sobre una mesa: la bruma sale de la boquilla en un chorro oblicuo'
      ),
      title: t3(language, 'Commande stock', 'Stock order', 'Pedido de stock'),
      text: t3(
        language,
        'Ajoutez Tolia à votre catalogue : stock prêt à expédier depuis la France.',
        'Add Tolia to your catalogue: ready-to-ship stock from France.',
        'Añada Tolia a su catálogo: stock listo para enviar desde Francia.'
      ),
      facts: t3(language, 'Dès 500 pièces · 72 h si en stock', 'From 500 units · 72 h if in stock', 'Desde 500 unidades · 72 h si hay stock'),
      cta: t3(language, 'Demander un devis', 'Request a quote', 'Solicitar presupuesto'),
    },
  ];

  return (
    <section id="offres" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <LegacyAnchors ids={['two-ways', 'business-math', 'market-proof', 'range-rationalization']} />
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Pour votre marque', 'For your brand', 'Para su marca')}
          </span>
          <h2 className="heading-section text-foreground">
            {t3(language, 'Deux façons de démarrer.', 'Two ways to start.', 'Dos formas de empezar.')}
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {offers.map((o) => (
            <motion.article
              key={o.type}
              className="flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card shadow-md"
              variants={fadeBlurUp}
            >
              <img
                src={o.img}
                alt={o.alt}
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="text-2xl font-bold text-foreground">{o.title}</h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{o.text}</p>
                <p className="mt-4 text-sm font-semibold text-foreground">{o.facts}</p>
                <button
                  type="button"
                  onClick={() => goToContact(o.type, o.cta)}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {o.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeOffersSection;
