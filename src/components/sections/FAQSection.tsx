import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

// Onze questions, réponses courtes. Les minimums, délais et la conformité sont ceux déjà publiés sur le site ; RSE, supports marketing et prix retrouvent leur réponse de l'ancien site.
// 17/10/2026 : ajout « Quelles huiles peut-on diffuser ? » (plus de 150 huiles testées, phrase de Pierre) et « Peut-on encadrer l'usage de nos huiles ? » ;
// « Comment démarrer ? » propose aussi l'appel de 15 minutes ; prix : plus de « conversation qualifiée » ; hydrolats retirés (à confirmer par Pierre).
const FAQSection: React.FC = () => {
  const { language } = useLanguage();

  const faqs = [
    {
      q: t3(language, 'Pouvons-nous utiliser nos propres huiles essentielles ?', 'Can we use our own essential oils?', '¿Podemos usar nuestros propios aceites esenciales?'),
      a: t3(
        language,
        'Oui. Le module se visse sur vos flacons standard (col DIN 18, de 5 à 50 ml), sans transfert ni remplissage.',
        'Yes. The module screws onto your standard bottles (DIN 18 neck, 5 to 50 ml), with no decanting and no refilling.',
        'Sí. El módulo se enrosca en sus frascos estándar (cuello DIN 18, de 5 a 50 ml), sin trasvase ni rellenado.'
      ),
    },
    {
      q: t3(language, 'Quelles huiles et quels parfums peut-on diffuser avec Tolia ?', 'Which oils and fragrances can Tolia diffuse?', '¿Qué aceites y fragancias puede difundir Tolia?'),
      a: t3(
        language,
        'La technologie a été testée sur plus de 150 huiles essentielles et synergies, et elle diffuse aussi les parfums synthétiques et les parfums d’intérieur. Pour vos références les plus visqueuses, le plus simple est de les essayer avec l’échantillon.',
        'The technology has been tested on more than 150 essential oils and blends, and it also diffuses synthetic and home fragrances. For your most viscous oils, the simplest way is to try them with the sample.',
        'La tecnología se ha probado con más de 150 aceites esenciales y sinergias, y difunde también perfumes sintéticos y fragancias para el hogar. Para sus referencias más viscosas, lo más sencillo es probarlas con la muestra.'
      ),
    },
    {
      q: t3(language, 'Peut-on encadrer l’usage de nos huiles ?', 'Can we control how our oils are used?', '¿Podemos programar el uso recomendado de nuestros aceites?'),
      a: t3(
        language,
        'Oui. Intensité, durée et intermittence peuvent être préprogrammées selon vos recommandations, et la diffusion s’arrête d’elle-même au bout de la durée choisie.',
        'Yes. Intensity, run time and on/off cycles can be pre-programmed to your recommendations, and diffusion stops by itself after the chosen time.',
        'Sí. La intensidad, la duración y la intermitencia pueden preprogramarse según sus recomendaciones, y la difusión se detiene sola al cabo del tiempo elegido.'
      ),
    },
    {
      q: t3(language, 'Qu’est-ce qui ramène vos clients vers vos huiles, et pas vers celles d’un concurrent ?', 'What brings customers back to your oils rather than a competitor’s?', '¿Qué hace que sus clientes vuelvan a sus aceites y no a los de la competencia?'),
      a: t3(
        language,
        'Le col DIN 18 est un standard : un autre flacon peut se visser. Ce qui ramène vos clients vers vos huiles, c’est tout ce qui porte votre marque : le diffuseur et ses modules à vos couleurs, des modes de diffusion préprogrammés selon vos recommandations, une notice et un QR code vers votre programme de fidélité, et vos huiles, qu’ils connaissent déjà.',
        'The DIN 18 neck is a standard, so another bottle can be screwed on. What brings customers back to your oils is everything that carries your brand: the diffuser and its modules in your colours, diffusion modes pre-programmed to your recommendations, a guide and a QR code to your loyalty programme, and your oils, which they already know.',
        'El cuello DIN 18 es un estándar: otro frasco puede enroscarse. Lo que hace que sus clientes vuelvan a sus aceites es todo lo que lleva su marca: el difusor y sus módulos con sus colores, modos de difusión preprogramados según sus recomendaciones, un manual y un código QR que lleva a su programa de fidelización, y sus aceites, que ya conocen.'
      ),
    },
    {
      q: t3(language, 'Quels sont les minimums de commande ?', 'What are the minimum order quantities?', '¿Cuáles son los pedidos mínimos?'),
      a: t3(
        language,
        'Marque blanche : généralement dès 3 000 pièces, selon le projet. Commande stock : dès 500 pièces, expédiées de France sous 72 h si le stock le permet. Les prix sont partagés lors du premier échange.',
        'White label: typically from 3,000 units, depending on the project. Stock order: from 500 units, shipped from France within 72 h if in stock. Pricing is shared from first contact.',
        'Marca blanca: normalmente desde 3.000 unidades, según el proyecto. Pedido de stock: desde 500 unidades, enviadas desde Francia en 72 h si hay stock. Le facilitamos los precios desde el primer contacto.'
      ),
    },
    {
      q: t3(language, 'Qu’en est-il de la conformité réglementaire ?', 'What about regulatory compliance?', '¿Qué hay de la conformidad regulatoria?'),
      a: t3(
        language,
        'Tolia est marqué CE, conforme RoHS et déjà vendu en Europe. Nous fournissons la documentation du diffuseur ; celle des huiles reste à la charge de la marque. Vous vendez hors de l’UE ? Indiquez-nous vos marchés : nous vous confirmerons par écrit les règles applicables.',
        'Tolia is CE-marked, RoHS-compliant and already sold across Europe. We provide the diffuser documentation; essential oil compliance remains with the brand. Selling outside the EU? Tell us your markets and we will confirm in writing which rules apply.',
        'Tolia lleva marcado CE, cumple RoHS y ya se vende en Europa. Facilitamos la documentación del difusor; la de los aceites sigue a cargo de la marca. ¿Vende fuera de la UE? Indíquenos sus mercados y le confirmaremos por escrito qué normas se aplican.'
      ),
    },
    {
      q: t3(language, 'Exclusivité et co-branding ?', 'Exclusivity and co-branding?', '¿Exclusividad y co-branding?'),
      a: t3(
        language,
        'Marque blanche : exclusivité de catégorie et de territoire négociable selon le volume. Commande stock : non exclusive, avec fourreau co‑brandé en option.',
        'White label: category and territory exclusivity is negotiable based on volume. Stock order: non-exclusive, with an optional co-branded sleeve.',
        'Marca blanca: la exclusividad de categoría y territorio es negociable según el volumen. Pedido de stock: no exclusivo, con funda exterior opcional con su marca.'
      ),
    },
    {
      q: t3(language, 'Comment Tolia soutient-il nos engagements RSE ?', 'How does Tolia support our sustainability commitments?', '¿Cómo apoya Tolia nuestros compromisos de sostenibilidad?'),
      a: t3(
        language,
        'Tolia est conçu pour la longévité : composants modulaires, batterie remplaçable par l’utilisateur et système de diagnostic pour identifier et remplacer les pièces individuelles.',
        'Tolia is designed for longevity: modular components, user-replaceable battery, and a diagnostic system to identify and replace individual parts.',
        'Tolia está diseñado para la longevidad: componentes modulares, batería reemplazable por el usuario y sistema de diagnóstico para identificar y reemplazar piezas individuales.'
      ),
    },
    {
      q: t3(language, 'Fournissez-vous des supports marketing pour le lancement ?', 'Do you support product launches with marketing assets?', '¿Apoyan los lanzamientos de producto con material de marketing?'),
      a: t3(
        language,
        'Oui : nous fournissons photographies produit professionnelles, vidéos, spécifications techniques et textes prêts à l’emploi pour votre site, votre catalogue et vos présentations commerciales. Votre lancement commence avec un kit complet.',
        'Yes: professional product photos, videos, technical specifications and ready-to-use copy for your online shop, catalogue and sales presentations. Everything comes in one launch kit.',
        'Sí: le proporcionamos fotografías profesionales del producto, vídeos, especificaciones técnicas y textos listos para usar en su tienda en línea, su catálogo y sus presentaciones comerciales. Su lanzamiento empieza con un kit completo.'
      ),
    },
    {
      q: t3(language, 'Comment obtenir vos prix et un prix de vente conseillé ?', 'How do we get your prices and a recommended retail price?', '¿Cómo obtenemos sus precios y el PVP recomendado?'),
      a: t3(
        language,
        'Le prix de vente conseillé dépend de votre marché, de votre canal (magasin ou en ligne) et du coffret choisi. Nos prix professionnels et la structure de marge vous sont communiqués dès le premier échange.',
        'The recommended retail price depends on your market, your channel (in store or online) and the box you choose. Our trade prices and margin structure are shared with you from first contact.',
        'El PVP recomendado depende de su mercado, de su canal (tienda o en línea) y del estuche elegido. Le facilitamos nuestros precios profesionales y la estructura de margen desde el primer contacto.'
      ),
    },
    {
      q: t3(language, 'Comment démarrer ?', 'How do we get started?', '¿Cómo empezamos?'),
      a: t3(
        language,
        'Deux possibilités, sans engagement : demandez un échantillon gratuit avec le formulaire ci-dessous (expédié de France sous 5 jours ouvrés), ou réservez 15 minutes en visio avec notre équipe. Une personne de notre équipe vous répond sous un jour ouvré.',
        'Two options, no commitment: request a free sample with the form below (shipped from France within 5 business days), or book a 15-minute video call with our team. A member of our team replies within one business day.',
        'Dos opciones, sin compromiso: solicite una muestra gratuita con el formulario de abajo (enviada desde Francia en 5 días hábiles) o reserve 15 minutos por videollamada con nuestro equipo. Una persona de nuestro equipo le responde en un día hábil.'
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
