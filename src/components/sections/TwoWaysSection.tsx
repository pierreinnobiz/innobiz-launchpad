import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Paintbrush, Package, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const handleCTA = (type: 'white-label' | 'stock', label: string) => {
  trackCTAClick(label, 'two-ways');
  const url = new URL(window.location.href);
  url.searchParams.set('type', type);
  url.hash = '#contact';
  window.history.replaceState(null, '', url.toString());
  window.dispatchEvent(new Event('tolia:pathchange'));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const TwoWaysSection: React.FC = () => {
  const { language } = useLanguage();

  const comparisonRows = [
    { label: t3(language, 'Idéal pour', 'Ideal for', 'Ideal para'), wl: t3(language, 'Les marques créant une ligne de diffuseurs signature', 'Brands building a signature diffuser line', 'Marcas que crean una línea de difusores propia'), stock: t3(language, "Les marques ajoutant Tolia à une gamme existante", 'Brands adding Tolia to an existing range', 'Marcas que añaden Tolia a una gama existente') },
    { label: t3(language, 'Branding', 'Branding', 'Branding'), wl: t3(language, 'Entièrement personnalisé, diffuseur, synergies, packaging', 'Fully custom, diffuser, blends, packaging', 'Totalmente personalizado, difusor, mezclas, packaging'), stock: t3(language, 'Tolia brandé, option fourreau co-brandé', 'Branded Tolia, co-branded sleeve option', 'Tolia con marca, opción de funda co-brandada') },
    { label: t3(language, 'MOQ', 'MOQ', 'MOQ'), wl: t3(language, 'Sur projet (généralement 3 000+)', 'Project-based (typically 3,000+)', 'Por proyecto (típicamente 3.000+)'), stock: t3(language, 'À partir de 300 unités', 'From 300 units', 'Desde 300 unidades') },
    { label: t3(language, 'Personnalisation', 'Customization', 'Personalización'), wl: t3(language, 'Couleur (RAL/Pantone), finitions (mat, soft-touch, métallique), matériaux (bois, résine, verre soufflé), logo, synergies personnalisées, coffret complet', 'Color (RAL/Pantone), finishes (matte, soft-touch, metallic), materials (wood, resin, blown glass), logo, custom blends, full box', 'Color (RAL/Pantone), acabados (mate, soft-touch, metálico), materiales (madera, resina, vidrio soplado), logo, mezclas personalizadas, caja completa'), stock: t3(language, 'Fourreau extérieur co-brandé, packaging intérieur neutre', 'Co-branded outer sleeve, neutral inner packaging', 'Funda exterior co-brandada, packaging interior neutro') },
    { label: t3(language, 'Délai de production', 'Lead time', 'Plazo de producción'), wl: t3(language, '12 à 20 semaines', '12 to 20 weeks', '12 a 20 semanas'), stock: t3(language, '72 heures si les produits sont en stock', '72 hours if products are in stock', '72 horas si los productos están en stock') },
    { label: t3(language, 'Time to market', 'Time to market', 'Time to market'), wl: t3(language, '3 à 6 mois', '3 to 6 months', '3 a 6 meses'), stock: t3(language, "Moins d'1 mois", 'Under 1 month', 'Menos de 1 mes') },
    { label: t3(language, 'Exclusivité territoriale', 'Territorial exclusivity', 'Exclusividad territorial'), wl: t3(language, 'Négociable (par volume & engagement)', 'Negotiable (by volume & commitment)', 'Negociable (por volumen y compromiso)'), stock: t3(language, 'Non exclusive', 'Non-exclusive', 'No exclusiva') },
  ];

  const cards = [
    {
      icon: Paintbrush,
      title: t3(language, 'Lancez Tolia sous votre propre marque', 'Launch Tolia under your own brand', 'Lance Tolia bajo su propia marca'),
      subtitle: t3(language, 'Pour les marques qui veulent un diffuseur signature, entièrement personnalisé, exclusivement le vôtre', 'For brands that want a signature diffuser, fully customised, exclusively yours', 'Para marcas que quieren un difusor firma, totalmente personalizado, exclusivamente suyo'),
      bullets: [
        t3(language, 'Votre logo, vos couleurs, vos matériaux. Un produit qui est 100 % le vôtre', 'Your logo, your colors, your materials, a product that feels 100% yours', 'Su logo, sus colores, sus materiales. Un producto que es 100 % suyo'),
        t3(language, "Synergies d'huiles essentielles co-développées et adaptées à l'histoire de votre marque", 'Co-developed essential oil blends tailored to your brand story', 'Mezclas de aceites esenciales co-desarrolladas y adaptadas a la historia de su marca'),
        t3(language, "Support industriel, réglementaire et supply chain complet d'Innobiz", 'Full industrial, regulatory, and supply chain support from Innobiz', 'Soporte industrial, regulatorio y de cadena de suministro completo de Innobiz'),
        t3(language, 'MOQ adapté à votre plan de lancement, généralement à partir de 3 000 unités', 'MOQ tailored to your launch plan, typically starting at 3,000 units', 'MOQ adaptado a su plan de lanzamiento, típicamente desde 3.000 unidades'),
      ],
      cta: t3(language, 'Demander une consultation marque blanche', 'Request a white-label consultation', 'Solicitar una consulta de marca blanca'),
      type: 'white-label' as const,
      trackLabel: 'twoways_cta_whitelabel',
      accent: 'hsl(28 45% 48%)',
    },
    {
      icon: Package,
      title: t3(language, 'Ajoutez Tolia à votre catalogue, livré en semaines', 'Add Tolia to your catalog, ships in weeks', 'Añada Tolia a su catálogo, envío en semanas'),
      subtitle: t3(language, "Pour les marques qui veulent proposer Tolia immédiatement, sans programme marque blanche complet", 'For brands that want to offer Tolia immediately, without a full white-label program', 'Para marcas que quieren ofrecer Tolia inmediatamente, sin un programa completo de marca blanca'),
      bullets: [
        t3(language, 'Stock prêt à expédier, minimum 300 unités, depuis notre entrepôt français', 'Ready-to-ship inventory, minimum 300 units, from our French warehouse', 'Inventario listo para enviar, mínimo 300 unidades, desde nuestro almacén francés'),
        t3(language, 'Livré en tant que Tolia brandé avec documentation produit complète', 'Delivered as branded Tolia with full product documentation', 'Entregado como Tolia con marca y documentación completa del producto'),
        t3(language, 'Packaging extérieur co-brandé optionnel pour intégration à votre gamme', 'Optional co-branded outer packaging to integrate with your range', 'Packaging exterior co-brandado opcional para integración con su gama'),
        t3(language, "Le time-to-market le plus rapide de l'industrie, produits en rayon en moins d'1 mois", 'Fastest time-to-market in the industry, products on shelf in under 1 month', 'El time-to-market más rápido del sector, productos en estantería en menos de 1 mes'),
      ],
      cta: t3(language, 'Demander un devis stock', 'Request a stock-order quote', 'Solicitar un presupuesto de stock'),
      type: 'stock' as const,
      trackLabel: 'twoways_cta_stock',
      accent: 'hsl(220 40% 45%)',
    },
  ];

  return (
    <section id="two-ways" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(35 30% 96%) 0%, hsl(33 35% 94%) 100%)' }}>
      <div className="section-container">
        <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Votre accès au marché, choisissez celui qui vous convient', 'Your path to market, choose the one that fits', 'Su acceso al mercado, elija el que le convenga')}
          </span>
          <h2 className="heading-section mb-4">
            {t3(language, 'Deux modèles. Un seul objectif : le revenu récurrent.', 'Two models. One goal: recurring revenue.', 'Dos modelos. Un objetivo: ingresos recurrentes.')}
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            {t3(language,
              "Que vous souhaitiez un diffuseur signature entièrement brandé autour de votre identité, ou un produit éprouvé, validé par le marché, prêt à être expédié ce trimestre, Tolia s'adapte à votre stratégie et à votre calendrier.",
              'Whether you want a fully branded signature diffuser built around your identity, or a proven, market-validated product ready to ship this quarter, Tolia adapts to your strategy and your timeline.',
              'Ya sea que quiera un difusor firma totalmente brandado en torno a su identidad, o un producto probado, validado por el mercado, listo para enviar este trimestre, Tolia se adapta a su estrategia y su calendario.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="rounded-3xl p-8 md:p-10 border bg-card flex flex-col h-full"
              style={{ borderColor: `${card.accent} / 0.2` }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ y: -6, boxShadow: `0 20px 40px -12px ${card.accent.replace(')', ' / 0.15)')}` }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${card.accent} / 0.1` }}>
                <card.icon className="w-6 h-6" style={{ color: card.accent }} />
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{card.subtitle}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {card.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: card.accent }} />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
              <MagneticButton>
                <Button
                  className="w-full font-semibold text-base py-4 rounded-2xl group"
                  style={{ background: card.accent, color: 'hsl(0 0% 100%)' }}
                  onClick={() => handleCTA(card.type, card.trackLabel)}
                >
                  {card.cta}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* Comparison table : desktop */}
        <motion.div
          className="hidden md:block max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left p-4 font-medium text-muted-foreground w-1/4"></th>
                  <th className="text-left p-4 font-bold text-foreground w-[37.5%]" style={{ color: 'hsl(28 45% 48%)' }}>{t3(language, 'Programme Marque Blanche', 'White-Label Program', 'Programa Marca Blanca')}</th>
                  <th className="text-left p-4 font-bold text-foreground w-[37.5%]" style={{ color: 'hsl(220 40% 45%)' }}>{t3(language, 'Commande Stock', 'Stock Order', 'Pedido Stock')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i < comparisonRows.length - 1 ? 'border-b border-border/40' : ''}>
                    <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                    <td className="p-4 text-foreground/90">{row.wl}</td>
                    <td className="p-4 text-foreground/90">{row.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile stacked */}
        <motion.div
          className="md:hidden space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { title: t3(language, 'Programme Marque Blanche', 'White-Label Program', 'Programa Marca Blanca'), color: 'hsl(28 45% 48%)', key: 'wl' as const },
            { title: t3(language, 'Commande Stock', 'Stock Order', 'Pedido Stock'), color: 'hsl(220 40% 45%)', key: 'stock' as const },
          ].map((col) => (
            <div key={col.key} className="rounded-2xl border border-border/60 bg-card p-6">
              <h4 className="font-bold text-lg mb-4" style={{ color: col.color }}>{col.title}</h4>
              <dl className="space-y-3">
                {comparisonRows.map((row, i) => (
                  <div key={i}>
                    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{row.label}</dt>
                    <dd className="text-sm text-foreground/90 mt-0.5">{row[col.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TwoWaysSection;
