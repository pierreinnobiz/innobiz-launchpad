import React from 'react';
import { motion } from 'framer-motion';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const FAQSection: React.FC = () => {
  const { language } = useLanguage();

  const faqs = [
    { q: t3(language, "Quel est le MOQ pour un programme marque blanche ?", 'What is the MOQ for a white-label program?', '¿Cuál es el MOQ para un programa de marca blanca?'), a: t3(language, "Les MOQ marque blanche sont adaptés au projet. Les premières commandes démarrent généralement à 3 000 unités, mais nous adaptons le programme à votre plan de lancement, calendrier et marché. Partagez votre vision — nous construirons une proposition sur mesure.", "White-label MOQs are project-based. Typical first orders start at 3,000 units, but we tailor the program to your launch plan, timeline, and market. Share your vision — we'll build a proposal that fits.", 'Los MOQ de marca blanca son por proyecto. Los primeros pedidos típicamente comienzan en 3.000 unidades, pero adaptamos el programa a su plan de lanzamiento, calendario y mercado. Comparta su visión — construiremos una propuesta a medida.') },
    { q: t3(language, "Quel est le MOQ pour une commande stock ?", 'What is the MOQ for a stock order?', '¿Cuál es el MOQ para un pedido de stock?'), a: t3(language, "Minimum 300 unités, livrées en Tolia brandé. Expédition depuis notre entrepôt français sous 2 à 4 semaines. Parfait pour tester le marché ou compléter une gamme existante sans délais longs.", 'Minimum 300 units, delivered as branded Tolia. Ships from our French warehouse within 2 to 4 weeks. Perfect for testing the market or complementing an existing range without long lead times.', 'Mínimo 300 unidades, entregadas como Tolia con marca. Envío desde nuestro almacén francés en 2 a 4 semanas. Perfecto para probar el mercado o complementar una gama existente sin plazos largos.') },
    { q: t3(language, "Puis-je co-brander le packaging de la commande stock ?", 'Can I co-brand the stock-order packaging?', '¿Puedo co-brandar el packaging del pedido de stock?'), a: t3(language, "Absolument. Vous pouvez ajouter un fourreau extérieur ou un coffret cadeau co-brandé avec votre marque aux côtés de Tolia. Le diffuseur reste brandé Tolia — vous apportant crédibilité pendant que vous testez la demande.", 'Absolutely. You can add a co-branded outer sleeve or gift box featuring your brand alongside Tolia. The diffuser itself stays branded Tolia — giving you credibility while you test demand.', 'Absolutamente. Puede añadir una funda exterior o caja de regalo co-brandada con su marca junto a Tolia. El difusor se mantiene con marca Tolia — dándole credibilidad mientras prueba la demanda.') },
    { q: t3(language, "Ma marque peut-elle utiliser ses propres huiles essentielles avec Tolia ?", 'Can my brand use its own essential oils with Tolia?', '¿Mi marca puede usar sus propios aceites esenciales con Tolia?'), a: t3(language, "Oui — c'est le cœur du modèle. Les modules Twist & Mist sont fabriqués par Innobiz et pré-remplis avec vos synergies propriétaires. Vous êtes propriétaire des formules, nous gérons toute la production industrielle et le contrôle qualité.", "Yes — that's the core of the model. Twist & Mist modules are manufactured by Innobiz and pre-filled with your proprietary blends. You own the formulas, we handle all industrial production and quality control.", 'Sí — eso es el núcleo del modelo. Los módulos Twist & Mist son fabricados por Innobiz y pre-llenados con sus mezclas propietarias. Usted es dueño de las fórmulas, nosotros manejamos toda la producción industrial y control de calidad.') },
    { q: t3(language, "Proposez-vous une exclusivité territoriale ?", 'Do you offer territorial exclusivity?', '¿Ofrecen exclusividad territorial?'), a: t3(language, "Sur les programmes marque blanche — oui. L'exclusivité de catégorie et de territoire est négociable en fonction de l'engagement volume et de l'alignement stratégique. Les commandes stock sont non exclusives pour maintenir rapidité et flexibilité.", 'On white-label programs — yes. Category and territory exclusivity is negotiable based on volume commitment and strategic alignment. Stock orders are non-exclusive to maintain speed and flexibility.', 'En programas de marca blanca — sí. La exclusividad de categoría y territorio es negociable según compromiso de volumen y alineación estratégica. Los pedidos de stock son no exclusivos para mantener velocidad y flexibilidad.') },
    { q: t3(language, "Qu'en est-il de la conformité réglementaire ?", 'What about regulatory compliance?', '¿Qué hay de la conformidad regulatoria?'), a: t3(language, "Tolia est marqué CE, conforme RoHS, et déjà commercialisé sur les marchés européens réglementés. Nous fournissons toute la documentation réglementaire côté diffuseur. La conformité des huiles essentielles reste à la charge du propriétaire de la marque, conformément aux standards de l'industrie.", 'Tolia is CE-marked, RoHS-compliant, and already sold across regulated European markets. We provide all diffuser-side regulatory documentation. Essential oil compliance remains with the brand owner, as per industry standard.', 'Tolia tiene marcado CE, cumple con RoHS, y ya se vende en mercados europeos regulados. Proporcionamos toda la documentación regulatoria del lado del difusor. El cumplimiento de aceites esenciales queda con el propietario de la marca, según estándar del sector.') },
    { q: t3(language, "Comment Tolia soutient-il nos engagements RSE ?", 'How does Tolia support our sustainability commitments?', '¿Cómo apoya Tolia nuestros compromisos de sostenibilidad?'), a: t3(language, "Tolia est conçu pour la longévité : composants modulaires, batterie remplaçable par l'utilisateur et système de diagnostic pour identifier et remplacer les pièces individuelles. Un produit utilisé quotidiennement pendant des années ne devient jamais un déchet dormant — c'est le meilleur argument RSE que vous puissiez avoir.", 'Tolia is designed for longevity: modular components, user-replaceable battery, and a diagnostic system to identify and replace individual parts. A product used daily for years never becomes dormant waste — which is the strongest RSE story you can tell.', 'Tolia está diseñado para la longevidad: componentes modulares, batería reemplazable por el usuario y sistema de diagnóstico para identificar y reemplazar piezas individuales. Un producto usado diariamente durante años nunca se convierte en residuo inactivo — que es la historia de RSE más fuerte que puede contar.') },
    { q: t3(language, "Quel prix de vente prévoir ?", 'What retail price should we plan for?', '¿Qué precio de venta deberíamos planificar?'), a: t3(language, "Le positionnement retail typique se situe entre 79 € et 129 € selon le marché, le canal et le niveau de packaging. Les prix B2B et la structure de marge sont partagés lors de votre première conversation qualifiée avec notre équipe.", 'Typical retail positioning is €79 to €129 depending on market, channel, and packaging tier. B2B pricing and margin structure are shared during your first qualified conversation with our team.', 'El posicionamiento retail típico es de 79 € a 129 € dependiendo del mercado, canal y nivel de packaging. Los precios B2B y la estructura de margen se comparten durante su primera conversación cualificada con nuestro equipo.') },
    { q: t3(language, "Fournissez-vous des supports marketing pour le lancement ?", 'Do you support product launches with marketing assets?', '¿Apoyan los lanzamientos de producto con material de marketing?'), a: t3(language, "Oui — nous fournissons photographies produit professionnelles, contenu vidéo, spécifications techniques et textes prêts à l'emploi pour l'e-commerce, le catalogue et les présentations trade. Votre lancement commence avec un toolkit complet.", 'Yes — we provide professional product photography, video content, technical specifications, and ready-to-use copy for e-commerce, catalog, and trade presentations. Your launch starts with a complete toolkit.', 'Sí — proporcionamos fotografía profesional de producto, contenido de video, especificaciones técnicas y copy listo para usar para e-commerce, catálogo y presentaciones comerciales. Su lanzamiento comienza con un toolkit completo.') },
    { q: t3(language, "À qui m'adresser pour commencer ?", 'Who do I talk to to get started?', '¿Con quién hablo para empezar?'), a: t3(language, "Remplissez le formulaire ci-dessous — il est envoyé directement à notre équipe de développement commercial (pas un chatbot). Vous recevrez une réponse personnalisée sous un jour ouvré, accompagnée d'une proposition adaptée à votre situation spécifique.", "Fill out the form below — it goes directly to our business development team (not a chatbot). You'll receive a personalized response within one business day, along with a proposal tailored to your specific situation.", 'Complete el formulario a continuación — va directamente a nuestro equipo de desarrollo de negocio (no un chatbot). Recibirá una respuesta personalizada en un día laborable, junto con una propuesta adaptada a su situación específica.') },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, 'Vos questions, réponses honnêtes', 'Your questions, answered honestly', 'Sus preguntas, respuestas honestas')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            {t3(language,
              'Tout ce que vous devez savoir avant votre premier appel avec notre équipe.',
              'Everything you need to know before your first call with our team.',
              'Todo lo que necesita saber antes de su primera llamada con nuestro equipo.'
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            {t3(language,
              "Nous avons compilé les questions que les directeurs de marque, category managers et équipes achats nous posent le plus souvent. Si la vôtre n'y figure pas, le formulaire ci-dessous est le moyen le plus rapide d'obtenir une réponse précise et personnalisée.",
              "We've compiled the questions that brand directors, category managers, and purchasing teams ask us most often. If yours isn't here, the form below is the fastest way to a precise, personalized answer.",
              'Hemos compilado las preguntas que los directores de marca, category managers y equipos de compras nos hacen con más frecuencia. Si la suya no está aquí, el formulario a continuación es la forma más rápida de obtener una respuesta precisa y personalizada.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerSlow}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="p-6 bg-card rounded-2xl border border-border/40 group
                transition-all duration-400 hover:shadow-[0_8px_32px_-8px_hsl(25_15%_18%/0.1)] hover:-translate-y-0.5
                hover:border-primary/20"
              variants={fadeBlurUp}
            >
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base group-hover:text-primary transition-colors duration-300">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
