import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

// Cinq questions, réponses courtes. Les minimums, délais et la conformité sont ceux déjà publiés sur le site.
const FAQSection: React.FC = () => {
  const { language } = useLanguage();

  const faqs = [
    {
      q: t3(language, 'Puis-je utiliser mes propres huiles essentielles ?', 'Can I use my own essential oils?', '¿Puedo usar mis propios aceites esenciales?'),
      a: t3(
        language,
        'Oui. Le module se visse sur vos flacons standard (col DIN 18, de 5 à 50 ml), sans transfert ni remplissage.',
        'Yes. The module screws onto your standard bottles (DIN 18 neck, 5 to 50 ml), with no transfer and no refilling.',
        'Sí. El módulo se enrosca en sus frascos estándar (cuello DIN 18, de 5 a 50 ml), sin trasvase ni rellenado.'
      ),
    },
    {
      q: t3(language, 'Quels sont les minimums de commande ?', 'What are the minimum order quantities?', '¿Cuáles son los pedidos mínimos?'),
      a: t3(
        language,
        'Marque blanche : généralement dès 3 000 pièces, selon le projet. Commande stock : dès 500 pièces, expédiées de France sous 72 h si le stock le permet. Les prix sont partagés lors du premier échange.',
        'White label: typically from 3,000 units, depending on the project. Stock order: from 500 units, shipped from France within 72 h if in stock. Pricing is shared during the first conversation.',
        'Marca blanca: normalmente desde 3.000 unidades, según el proyecto. Pedido de stock: desde 500 unidades, enviadas desde Francia en 72 h si hay stock. Los precios se comparten en la primera conversación.'
      ),
    },
    {
      q: t3(language, 'Qu’en est-il de la conformité réglementaire ?', 'What about regulatory compliance?', '¿Qué hay de la conformidad regulatoria?'),
      a: t3(
        language,
        'Tolia est marqué CE, conforme RoHS et déjà vendu en Europe. Nous fournissons la documentation du diffuseur ; celle des huiles reste à la charge de la marque.',
        'Tolia is CE-marked, RoHS-compliant and already sold across Europe. We provide the diffuser documentation; essential oil compliance remains with the brand.',
        'Tolia lleva marcado CE, cumple RoHS y ya se vende en Europa. Facilitamos la documentación del difusor; la de los aceites sigue a cargo de la marca.'
      ),
    },
    {
      q: t3(language, 'Exclusivité et co-branding ?', 'Exclusivity and co-branding?', '¿Exclusividad y co-branding?'),
      a: t3(
        language,
        'Marque blanche : exclusivité de catégorie et de territoire négociable selon le volume. Commande stock : non exclusive, avec fourreau co-brandé en option.',
        'White label: category and territory exclusivity is negotiable based on volume. Stock order: non-exclusive, with an optional co-branded sleeve.',
        'Marca blanca: la exclusividad de categoría y territorio es negociable según el volumen. Pedido de stock: no exclusivo, con funda co-brandeada opcional.'
      ),
    },
    {
      q: t3(language, 'Comment démarrer ?', 'How do I get started?', '¿Cómo empiezo?'),
      a: t3(
        language,
        'Remplissez le formulaire ci-dessous : il arrive directement à notre équipe (pas un chatbot), qui répond sous un jour ouvré. Échantillon expédié de France sous 5 jours ouvrés.',
        'Fill in the form below: it goes straight to our team (not a chatbot), who reply within one business day. Sample shipped from France within 5 business days.',
        'Rellene el formulario de abajo: llega directamente a nuestro equipo (no es un chatbot), que responde en un día hábil. Muestra enviada desde Francia en 5 días hábiles.'
      ),
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>FAQ</span>
          <h2 className="heading-section text-foreground">
            {t3(language, 'Questions fréquentes', 'Frequently asked questions', 'Preguntas frecuentes')}
          </h2>
        </motion.div>

        <div className="divide-y divide-border/60 rounded-2xl border border-border/50 bg-card">
          {faqs.map((faq, i) => (
            <details key={i} className="group px-5 md:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <span className="text-left">{faq.q}</span>
                <ChevronDown className="h-5 w-5 flex-none text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
