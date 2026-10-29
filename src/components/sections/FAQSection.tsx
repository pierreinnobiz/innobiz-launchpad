import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

// Onze questions, réponses courtes. Les minimums, délais et la conformité sont ceux déjà publiés sur le site ; RSE, supports marketing et prix retrouvent leur réponse de l'ancien site.
// 17/10/2026 : ajout « Quelles huiles peut-on diffuser ? » (plus de 150 huiles testées, phrase de Pierre ; « toutes les huiles du marché » + parfums naturels et de synthèse + compte‑gouttes, 26/10/2026) et « Peut-on encadrer l'usage de nos huiles ? » ;
// « Comment démarrer ? » propose aussi l'appel de 30 minutes avec Simon (19/10/2026) ; prix : plus de « conversation qualifiée » ; hydrolats retirés (à confirmer par Pierre).
const FAQSection: React.FC = () => {
  const { language } = useLanguage();

  const faqs = [
    // 17/10/2026 : 4 questions ajoutées pour le référencement (ce que les marques et les assistants IA demandent), sans fait nouveau
    {
      q: t3(language, 'Qu’est-ce qu’un diffuseur d’huiles essentielles en marque blanche ?', 'What is a white-label essential oil diffuser?', '¿Qué es un difusor de aceites esenciales de marca blanca?'),
      a: t3(
        language,
        'C’est un diffuseur conçu par un spécialiste et vendu sous le nom de votre marque. Avec Tolia, Innobiz adapte la couleur, les finitions, le logo, le coffret et les modes de diffusion à votre marque, généralement dès 3 000 pièces. Pour démarrer plus vite, Tolia existe aussi sur stock, dès 500 pièces.',
        'It is a diffuser designed by a specialist and sold under your brand’s name. With Tolia, Innobiz adapts the colour, finishes, logo, box and diffusion modes to your brand, typically from 3,000 units. To start faster, Tolia is also available from stock, from 500 units.',
        'Es un difusor diseñado por un especialista y vendido con el nombre de su marca. Con Tolia, Innobiz adapta el color, los acabados, el logotipo, el estuche y los modos de difusión a su marca, normalmente desde 3.000 unidades. Para empezar más rápido, Tolia también está disponible en stock, desde 500 unidades.'
      ),
    },
    {
      q: t3(language, 'Pouvons-nous utiliser nos propres huiles essentielles ?', 'Can we use our own essential oils?', '¿Podemos usar nuestros propios aceites esenciales?'),
      a: t3(
        language,
        'Oui, tout votre catalogue : le module se visse sur les flacons standard de 5, 10, 15, 30 ou 50 ml (col DIN 18), sans retirer le compte‑gouttes, sans transfert ni remplissage.',
        'Yes, your whole range: the module screws onto standard 5, 10, 15, 30 or 50 ml bottles (DIN 18 neck), without removing the dropper, with no decanting and nothing to fill.',
        'Sí, todo su catálogo: el módulo se enrosca en los frascos estándar de 5, 10, 15, 30 o 50 ml (cuello DIN 18), sin quitar el cuentagotas, sin trasvase ni llenado.'
      ),
    },
    {
      q: t3(language, 'Quelles huiles et quels parfums peut-on diffuser avec Tolia ?', 'Which oils and fragrances can Tolia diffuse?', '¿Qué aceites y fragancias puede difundir Tolia?'),
      a: t3(
        language,
        'Toutes les huiles essentielles du marché : notre technologie exclusive a été testée sur plus de 150 huiles essentielles et synergies. Elle diffuse aussi les parfums naturels et les parfums d’intérieur de synthèse.',
        'Every essential oil on the market: our exclusive technology has been tested on more than 150 essential oils and blends. It also diffuses natural fragrances and synthetic home fragrances.',
        'Todos los aceites esenciales del mercado: nuestra tecnología exclusiva se ha probado con más de 150 aceites esenciales y sinergias. También difunde perfumes naturales y fragancias sintéticas para el hogar.'
      ),
    },
    {
      q: t3(language, 'Tolia fonctionne-t-il sans eau ?', 'Does Tolia work without water?', '¿Tolia funciona sin agua?'),
      a: t3(
        language,
        'Oui. Tolia diffuse l’huile essentielle pure, sans eau ni chaleur : il n’y a aucun réservoir à remplir ni à nettoyer, et l’huile garde tout son parfum.',
        'Yes. Tolia diffuses pure essential oil, with no water and no heat: there is no tank to fill or clean, and the oil keeps its full scent.',
        'Sí. Tolia difunde el aceite esencial puro, sin agua ni calor: no hay ningún depósito que llenar ni limpiar, y el aceite conserva todo su aroma.'
      ),
    },
    {
      q: t3(language, 'Quelle est l’autonomie de Tolia ?', 'How long does Tolia’s battery last?', '¿Cuánto dura la batería de Tolia?'),
      a: t3(
        language,
        'Jusqu’à 90 heures d’autonomie sur batterie : de 70 à 90 h lumière éteinte, de 16 à 20 h avec la lumière d’ambiance, selon l’intensité. La batterie se recharge en USB‑C, et l’utilisateur peut la remplacer lui-même.',
        'Up to 90 hours of battery life: 70 to 90 h with the light off, 16 to 20 h with the ambient light on, depending on intensity. The battery charges via USB‑C, and users can replace it themselves.',
        'Hasta 90 horas de autonomía con batería: de 70 a 90 h con la luz apagada y de 16 a 20 h con la luz ambiental, según la intensidad. La batería se recarga por USB‑C y el propio usuario puede sustituirla.'
      ),
    },
    {
      q: t3(language, 'Peut-on encadrer l’usage de nos huiles ?', 'Can we control how our oils are used?', '¿Podemos programar el uso recomendado de nuestros aceites?'),
      a: t3(
        language,
        'Oui. La durée, la puissance et l’intermittence de la diffusion peuvent être préprogrammées selon vos recommandations, et la diffusion s’arrête d’elle-même au bout de la durée choisie.',
        'Yes. Diffusion duration, strength and on/off cycles can be pre-programmed to your recommendations, and diffusion stops by itself after the chosen time.',
        'Sí. La duración, la potencia y la intermitencia de la difusión pueden preprogramarse según sus recomendaciones, y la difusión se detiene sola al cabo del tiempo elegido.'
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
        'Marque blanche : généralement dès 3 000 pièces, selon le projet. Commande sur stock : dès 500 pièces, expédiées de France sous 72 h si le stock le permet. Nos prix vous sont communiqués dès le premier échange.',
        'White label: typically from 3,000 units, depending on the project. Stock order: from 500 units, shipped from France within 72 h if in stock. We share our prices from the very first conversation.',
        'Marca blanca: normalmente desde 3.000 unidades, según el proyecto. Pedido de stock: desde 500 unidades, enviadas desde Francia en 72 h si hay stock. Le facilitamos los precios desde el primer contacto.'
      ),
    },
    {
      q: t3(language, 'Combien de temps faut-il pour lancer un diffuseur à votre marque ?', 'How long does it take to launch a diffuser under your brand?', '¿Cuánto tiempo se tarda en lanzar un difusor con su marca?'),
      a: t3(
        language,
        'En marque blanche, comptez généralement 12 à 20 semaines, selon le projet. Pour aller plus vite, la commande sur stock (dès 500 pièces) part de France sous 72 h si le stock le permet, sous la marque Tolia, avec un fourreau à vos couleurs en option.',
        'For white label, typically allow 12 to 20 weeks, depending on the project. To move faster, a stock order (from 500 units) ships from France within 72 h if in stock, under the Tolia brand, with an optional sleeve in your colours.',
        'En marca blanca, calcule normalmente entre 12 y 20 semanas, según el proyecto. Para ir más rápido, el pedido de stock (desde 500 unidades) sale de Francia en 72 h si hay stock, con la marca Tolia y una funda con sus colores como opción.'
      ),
    },
    {
      q: t3(language, 'Qu’en est-il de la conformité réglementaire ?', 'What about regulatory compliance?', '¿Y la conformidad normativa?'),
      a: t3(
        language,
        'Tolia est marqué CE et conforme RoHS. Plus de 100 000 diffuseurs dotés de notre technologie ont déjà été vendus dans le monde. Nous fournissons la documentation du diffuseur ; celle des huiles reste à la charge de la marque. Vous vendez hors de l’UE ? Indiquez-nous vos marchés : nous vous confirmerons par écrit les règles applicables.',
        'Tolia is CE-marked and RoHS-compliant. More than 100,000 diffusers using our technology have already been sold worldwide. We provide the diffuser documentation; essential oil compliance remains with the brand. Selling outside the EU? Tell us your markets and we will confirm in writing which rules apply.',
        'Tolia lleva marcado CE y cumple RoHS. Ya se han vendido en todo el mundo más de 100.000 difusores con nuestra tecnología. Facilitamos la documentación del difusor; la de los aceites sigue a cargo de la marca. ¿Vende fuera de la UE? Indíquenos sus mercados y le confirmaremos por escrito qué normas se aplican.'
      ),
    },
    {
      q: t3(language, 'Exclusivité et co-branding ?', 'Exclusivity and co-branding?', '¿Exclusividad y co-branding?'),
      a: t3(
        language,
        'Marque blanche : exclusivité de catégorie et de territoire négociable selon le volume. Commande sur stock : non exclusive, avec fourreau co‑brandé en option.',
        'White label: category and territory exclusivity is negotiable based on volume. Stock order: non-exclusive, with an optional co-branded sleeve.',
        'Marca blanca: la exclusividad de categoría y territorio es negociable según el volumen. Pedido de stock: no exclusivo, con funda exterior opcional con su marca.'
      ),
    },
    {
      q: t3(language, 'Comment Tolia soutient-il nos engagements RSE ?', 'How does Tolia support our sustainability commitments?', '¿Cómo apoya Tolia nuestros compromisos de sostenibilidad?'),
      a: t3(
        language,
        'Tolia est conçu pour la longévité : composants modulaires, batterie remplaçable par l’utilisateur et système de diagnostic pour repérer et remplacer chaque pièce séparément.',
        'Tolia is designed for longevity: modular components, user-replaceable battery, and a diagnostic system to identify and replace individual parts.',
        'Tolia está diseñado para la longevidad: componentes modulares, batería reemplazable por el usuario y sistema de diagnóstico para identificar y reemplazar piezas individuales.'
      ),
    },
    {
      q: t3(language, 'Fournissez-vous des supports marketing pour le lancement ?', 'Do you support product launches with marketing assets?', '¿Proporcionan material de marketing para el lanzamiento?'),
      a: t3(
        language,
        'Oui : nous fournissons des photographies produit professionnelles, des vidéos, des spécifications techniques et des textes prêts à l’emploi pour votre site, votre catalogue et vos présentations commerciales. Votre lancement commence avec un kit complet.',
        'Yes: professional product photos, videos, technical specifications and ready-to-use copy for your online shop, catalogue and sales presentations. Everything comes in one launch kit.',
        'Sí: le proporcionamos fotografías profesionales del producto, vídeos, especificaciones técnicas y textos listos para usar en su web, su catálogo y sus presentaciones comerciales. Su lanzamiento empieza con un kit completo.'
      ),
    },
    {
      q: t3(language, 'Comment obtenir vos prix et un prix de vente conseillé ?', 'How do we get your prices and a recommended retail price?', '¿Cómo obtenemos sus precios y el PVP recomendado?'),
      a: t3(
        language,
        'Le prix de vente conseillé dépend de votre marché, de votre canal (magasin ou en ligne) et du coffret choisi. Nos prix professionnels et la structure de marge vous sont communiqués dès le premier échange.',
        'The recommended retail price depends on your market, your channel (in store or online) and the box you choose. Our trade prices and margin structure are shared with you from the very first conversation.',
        'El PVP recomendado depende de su mercado, de su canal (tienda o en línea) y del estuche elegido. Le facilitamos nuestros precios profesionales y la estructura de margen desde el primer contacto.'
      ),
    },
    {
      q: t3(language, 'Comment démarrer ?', 'How do we get started?', '¿Cómo empezamos?'),
      a: t3(
        language,
        'Deux possibilités, sans engagement : demandez un échantillon gratuit avec le formulaire ci-dessous (expédié de France sous 5 jours ouvrés), ou réservez 30 minutes en visio avec Simon Desbuisson, de notre équipe. Une vraie personne vous répond sous un jour ouvré.',
        'Two options, no commitment: request a free sample with the form below (shipped from France within 5 working days), or book a 30-minute video call with Simon Desbuisson from our team. A member of our team replies within one working day.',
        'Dos opciones, sin compromiso: solicite una muestra gratuita con el formulario de abajo (enviada desde Francia en 5 días hábiles) o reserve 30 minutos por videollamada con Simon Desbuisson, de nuestro equipo. Una persona de nuestro equipo le responde en un día hábil.'
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
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 52% 36%)' }}>FAQ</span>
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
