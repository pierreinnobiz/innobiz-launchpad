import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Package, Palette } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { trackCTAClick } from '@/lib/tracking';
import LegacyAnchors from '@/components/LegacyAnchors';

// Même comportement qu'avant : le bouton mémorise le type de projet puis fait défiler jusqu'au formulaire.
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

  // Sans image (17/10/2026) : les rendus 3D faisaient « image de synthèse ». Chaque carte dit pour qui elle est, puis les chiffres clés.
  const offers = [
    {
      type: 'white-label' as const,
      icon: Palette,
      who: t3(
        language,
        'Pour les marques qui veulent leur propre diffuseur, en exclusivité.',
        'For brands that want an exclusive diffuser of their own.',
        'Para las marcas que quieren su propio difusor, en exclusiva.'
      ),
      title: t3(language, 'Marque blanche', 'White label', 'Marca blanca'),
      text: t3(
        language,
        'Votre diffuseur, à votre image : couleurs, matières, logo et coffret.',
        'Your diffuser, unmistakably your brand: colours, materials, logo and box.',
        'Su difusor, a su imagen: colores, materiales, logotipo y estuche.'
      ),
      facts: t3(language, 'Généralement dès 3 000 pièces · 12 à 20 semaines', 'Typically from 3,000 units · 12 to 20 weeks', 'Normalmente desde 3.000 unidades · 12 a 20 semanas'),
      cta: t3(language, 'Parler de mon projet', 'Discuss my project', 'Hablar de mi proyecto'),
      // détails de l'ancien site (offres et tableau comparatif) qui n'apparaissaient plus
      points: [
        t3(language, 'Vos synergies, ou des synergies d’huiles essentielles co‑développées avec Innobiz pour l’histoire de votre marque', 'Your own blends, or essential oil blends co‑developed with Innobiz to fit your brand story', 'Sus sinergias, o sinergias de aceites esenciales codesarrolladas con Innobiz para la historia de su marca'),
        t3(language, 'Accompagnement industriel, réglementaire et logistique complet par Innobiz', 'Full industrial, regulatory and supply chain support from Innobiz', 'Acompañamiento industrial, normativo y logístico completo por parte de Innobiz'),
        t3(language, 'Couleur RAL ou Pantone, finitions mate, brillante, soft‑touch, texturée ou métallique, matériaux : bois, résine, verre soufflé', 'RAL or Pantone colour; matt, gloss, soft‑touch, textured or metallic finishes; materials: wood, resin, blown glass', 'Color RAL o Pantone, acabados mate, brillante, soft‑touch, texturizado o metalizado, materiales: madera, resina, vidrio soplado'),
        t3(language, 'Kit de lancement : photos, vidéos et textes prêts pour votre site et vos réseaux', 'Launch kit: photos, videos and copy ready for your website and social media', 'Kit de lanzamiento: fotos, vídeos y textos listos para su web y sus redes'),
        t3(language, 'Exclusivité de catégorie et de territoire négociable (par volume et engagement)', 'Category and territory exclusivity negotiable (by volume and commitment)', 'Exclusividad de categoría y territorio negociable (por volumen y compromiso)'),
      ],
    },
    {
      type: 'stock' as const,
      icon: Package,
      who: t3(
        language,
        'Pour démarrer vite et proposer Tolia à vos clients dès ce mois-ci.',
        'To start fast and offer Tolia to your customers this month.',
        'Para empezar rápido y ofrecer Tolia a sus clientes este mismo mes.'
      ),
      title: t3(language, 'Commande sur stock', 'Stock order', 'Pedido de stock'),
      text: t3(
        language,
        'Ajoutez Tolia à votre catalogue : stock prêt à expédier depuis la France.',
        'Add Tolia to your catalogue: ready-to-ship stock from France.',
        'Añada Tolia a su catálogo: stock listo para enviar desde Francia.'
      ),
      facts: t3(language, 'Dès 500 pièces · expédition sous 72 h si en stock', 'From 500 units · ships within 72 h if in stock', 'Desde 500 unidades · envío en 72 h si hay stock'),
      cta: t3(language, 'Demander un devis', 'Request a quote', 'Solicitar presupuesto'),
      points: [
        t3(language, 'Livré sous la marque Tolia, avec documentation produit complète', 'Delivered under the Tolia brand, with full product documentation', 'Entregado con la marca Tolia y documentación completa del producto'),
        t3(language, 'Fourreau extérieur co‑brandé en option, pour l’intégrer à votre gamme', 'Optional co-branded outer sleeve to fit it into your range', 'Funda exterior opcional con su marca, para integrarlo en su gama'),
        t3(language, 'En rayon ou sur votre e-shop en moins d’un mois', 'On shelf or in your online shop in under a month', 'En el lineal o en su tienda online en menos de un mes'),
        t3(language, 'Kit de lancement : photos, vidéos et textes prêts pour votre site et vos réseaux', 'Launch kit: photos, videos and copy ready for your website and social media', 'Kit de lanzamiento: fotos, vídeos y textos listos para su web y sus redes'),
        t3(language, 'Fonctionne avec les flacons standard du marché (col DIN 18, de 5 à 50 ml)', 'Works with industry-standard bottles (DIN 18 neck, 5 to 50 ml)', 'Funciona con los frascos estándar del mercado (cuello DIN 18, de 5 a 50 ml)'),
        t3(language, 'Commande non exclusive : rapidité et flexibilité', 'Non-exclusive order: speed and flexibility', 'Pedido no exclusivo: rapidez y flexibilidad'),
      ],
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
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 52% 36%)' }}>
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
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl"
                    style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 52% 36%)' }}
                    aria-hidden="true"
                  >
                    <o.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">{o.title}</h3>
                </div>
                <p className="mt-3 text-sm font-medium text-foreground/80">{o.who}</p>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{o.text}</p>
                <p className="mt-4 inline-flex w-fit rounded-full px-3.5 py-1.5 text-sm font-semibold" style={{ background: 'hsl(28 45% 48% / 0.1)', color: 'hsl(28 52% 32%)' }}>
                  {o.facts}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {o.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'hsl(28 52% 36%)' }} aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {/* le bouton reste en bas de la carte : les deux boutons sont alignés */}
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => goToContact(o.type, o.cta)}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {o.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* tester le marché d'abord : sous les deux cartes (arbitrage de l'expert, cycle 3 : chacun lit d'abord son offre) */}
        <motion.div
          className="mx-auto mt-6 flex max-w-4xl flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card px-5 py-4 text-center md:flex-row md:justify-between md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeBlurUp}
        >
          <p className="text-sm md:text-base text-foreground">
            <strong>{t3(language, 'Envie de tester le marché d’abord ?', 'Want to test the market first?', '¿Prefiere probar el mercado primero?')}</strong>{' '}
            {t3(
              language,
              'Commencez par 500 pièces sur stock, avec un fourreau co‑brandé, puis passez à la marque blanche quand vos ventes suivent.',
              'Start with 500 units from stock, with a co-branded sleeve, then move to white label as your sales grow.',
              'Empiece con 500 unidades de stock, con funda personalizada, y pase a la marca blanca cuando sus ventas lo justifiquen.'
            )}
          </p>
          <button
            type="button"
            onClick={() => goToContact('stock', t3(language, 'Démarrer avec 500 pièces', 'Start with 500 units', 'Empezar con 500 unidades'))}
            className="tap-target inline-flex flex-none items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t3(language, 'Démarrer avec 500 pièces', 'Start with 500 units', 'Empezar con 500 unidades')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeOffersSection;
