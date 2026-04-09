import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type Language = 'fr' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Partial<Record<Language, string>>> = {
  // Navigation
  'nav.technology': { fr: 'Technologie', en: 'Technology' },
  'nav.solutions': { fr: 'Solutions', en: 'Solutions' },
  'nav.process': { fr: 'Processus', en: 'Process' },
  'nav.faq': { fr: 'FAQ', en: 'FAQ' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // CTAs
  'cta.demo': { fr: 'Demander une démo', en: 'Request a demo' },
  'cta.info': { fr: 'Demander des infos', en: 'Request information' },
  'cta.demo.subtitle': { fr: 'Accès agenda après quelques questions (2 min)', en: 'Calendar access after a short qualification.' },
  
  // Hero - Home
  'hero.title': { 
    fr: 'Technologie de diffusion propriétaire pour marques d\'huiles essentielles et de home fragrance', 
    en: 'Proprietary diffusion technology for essential oil and home fragrance brands' 
  },
  'hero.subtitle': { 
    fr: 'Innobiz Lab conçoit des diffuseurs en marque blanche équipés d\'une technologie de diffusion propriétaire, dédiés aux marques d\'huiles essentielles et de home fragrance. Du design produit à la conformité réglementaire, jusqu\'à la fabrication, nous aidons les marques à augmenter les achats récurrents de consommables grâce à un usage simplifié.', 
    en: 'Innobiz Lab designs white-label diffuser devices powered by a proprietary diffusion technology, dedicated to essential oil and home fragrance brands. From product design and regulatory compliance to manufacturing, we help brands increase consumable repeat purchase through simplified usage.' 
  },
  
  // Why brands choose
  'why.title': { fr: 'Pourquoi les marques choisissent Innobiz Lab', en: 'Why brands choose Innobiz Lab' },
  'why.intro': {
    fr: 'Les consommateurs n\'achètent pas un diffuseur, ils adoptent une expérience d\'usage. Quand la diffusion devient simple, contrôlable et constante, la fréquence d\'usage augmente, ce qui génère directement des ventes récurrentes d\'huiles essentielles et de parfums d\'intérieur.',
    en: 'Consumers do not buy a diffuser, they adopt a usage experience. When diffusion becomes effortless, controllable and consistent, usage frequency increases, directly driving repeat sales of essential oils and home fragrances.'
  },
  'why.business.title': { fr: 'Résultats business', en: 'Business outcomes' },
  'why.business.1': { fr: 'Augmentation des achats récurrents de consommables', en: 'Increased repeat purchase of consumables' },
  'why.business.2': { fr: 'Différenciation claire grâce à une nouvelle expérience de diffusion', en: 'Clear differentiation through a new diffusion experience' },
  'why.business.3': { fr: 'Positionnement premium soutenu par des bénéfices fonctionnels', en: 'Premium positioning supported by functional benefits' },
  'why.business.4': { fr: 'Acquisition de clients non engagés avec la diffusion traditionnelle', en: 'Acquisition of customers previously disengaged from traditional diffusion' },
  'why.usage.title': { fr: 'Bénéfices utilisateur', en: 'End-user benefits' },
  'why.usage.1': { fr: 'Diffusion de fragrance puissante et perceptible', en: 'Powerful and perceptible fragrance diffusion' },
  'why.usage.2': { fr: 'Usage nomade grâce au design sur batterie', en: 'Portable usage enabled by battery-powered design' },
  'why.usage.3': { fr: 'Contrôle programmable de la diffusion', en: 'Programmable diffusion control' },
  'why.usage.4': { fr: 'Fonctionnement ultra-silencieux', en: 'Ultra-silent operation' },
  'why.usage.5': { fr: 'Changement de fragrance instantané sans manipulation', en: 'Instant fragrance change without handling constraints' },
  
  // Outcomes / Metrics
  'outcomes.title': { fr: 'Impact mesurable sur l\'usage', en: 'Measurable impact on usage' },
  'outcomes.metric1': { fr: '+43% d\'augmentation de fréquence d\'usage', en: '+43% observed increase in usage frequency' },
  'outcomes.metric1.desc': { fr: 'Mesuré après adoption d\'une routine de diffusion simplifiée. Méthodologie expliquée lors de la démonstration.', en: 'Measured after adoption of a simplified diffusion routine. Methodology explained during the demonstration.' },
  'outcomes.metric2': { fr: 'Système de diffusion ultra-silencieux', en: 'Ultra-silent diffusion system' },
  'outcomes.metric2.desc': { fr: 'Conçu pour le confort et la discrétion dans les environnements quotidiens.', en: 'Designed for comfort and discretion in everyday environments.' },
  'outcomes.metric3': { fr: 'Haute performance de diffusion', en: 'High diffusion performance' },
  'outcomes.metric3.desc': { fr: 'Couverture et intensité dépendent de la formulation de fragrance et des conditions d\'usage.', en: 'Coverage and intensity depend on fragrance formulation and usage conditions.' },
  
  // Universal
  'universal.title': { fr: 'Une technologie de diffusion pour deux marchés', en: 'One diffusion technology for two markets' },
  'universal.desc': { fr: 'Innobiz Lab a développé une plateforme universelle de diffusion de fragrances adaptée aux huiles essentielles et aux applications home fragrance. Un module central propriétaire, intégré dans des designs de diffuseurs spécifiques à chaque marque, évite la multiplication des technologies et réduit la complexité du portefeuille produits.', en: 'Innobiz Lab developed a universal fragrance diffusion platform suitable for both essential oils and home fragrance applications. One proprietary core module, integrated into brand-specific diffuser designs, avoids technology multiplication and reduces product portfolio complexity.' },
  
  // How it works
  'how.title': { fr: 'Comment ça fonctionne, vue simplifiée', en: 'How it works – simplified overview' },
  'how.step1.title': { fr: 'Définir', en: 'Define' },
  'how.step1.desc': { fr: 'Définissez le positionnement de votre marque et votre stratégie de diffusion', en: 'Define your brand positioning and diffusion strategy' },
  'how.step2.title': { fr: 'Concevoir', en: 'Design' },
  'how.step2.desc': { fr: 'Concevez un diffuseur à votre marque intégrant notre technologie propriétaire', en: 'Design a branded diffuser integrating our proprietary technology' },
  'how.step3.title': { fr: 'Développer', en: 'Develop' },
  'how.step3.desc': { fr: 'Industrialisez, fabriquez et développez vos ventes récurrentes de consommables', en: 'Industrialise, manufacture and scale repeat consumable sales' },
  'how.technical': { fr: 'Voir les détails techniques', en: 'View technical details' },
  'how.technical.desc': { fr: 'Fondations techniques basées sur la fluidique, la mécanique, les matériaux, l\'électronique et le logiciel, expliquées sans exposer le savoir-faire sensible.', en: 'Technical foundation based on fluidics, mechanics, materials, electronics and software, explained without exposing sensitive know-how.' },
  
  // Proof
  'proof.title': { fr: 'Ce qu\'ils en disent', en: 'What they say' },
  
  // Trusted
  'trusted.title': { fr: 'Compatible avec les grandes marques de fragrance', en: 'Compatible with leading fragrance brands' },
  'trusted.disclaimer': { fr: 'Notre technologie de diffusion a été validée avec une large gamme d\'huiles essentielles et de compositions parfumées. Les logos affichés représentent des références de compatibilité et de tests de diffusion. Certaines collaborations restent confidentielles.', en: 'Our diffusion technology has been validated with a wide range of essential oils and fragrance compositions. Displayed logos represent compatibility and diffusion testing references. Some collaborations remain confidential.' },
  
  // Process
  'process.title': { fr: 'Du concept au diffuseur prêt pour le marché', en: 'From concept to market-ready diffuser' },
  'process.step1': { fr: 'Workshop positionnement marque & produit', en: 'Brand and product positioning workshop' },
  'process.step2': { fr: 'Design diffuseur personnalisé', en: 'Custom diffuser design aligned with brand identity' },
  'process.step3': { fr: 'Développement prototype (≈3 mois)', en: 'Prototype development (~3 months)' },
  'process.step4': { fr: 'Industrialisation et conformité', en: 'Industrialisation and regulatory compliance' },
  'process.step5': { fr: 'Fabrication et livraison (≈4 mois)', en: 'Manufacturing and delivery (~4 months)' },
  'process.timeline': { fr: 'Délais indicatifs dépendant de la validation client.', en: 'Indicative timelines depending on client validation.' },
  
  // FAQ
  'faq.title': { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
  'faq.seeAll': { fr: 'Voir toute la FAQ', en: 'See full FAQ' },
  
  // Footer
  'footer.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'footer.privacy': { fr: 'Politique de confidentialité', en: 'Privacy policy' },
  'footer.cookies': { fr: 'Cookies', en: 'Cookies' },
  
  // Technology page
  'tech.title': { fr: 'Technologie de diffusion propriétaire conçue pour les marques', en: 'Proprietary diffuser technology engineered for brands' },
  'tech.subtitle': { fr: 'Innobiz Lab développe une technologie de diffusion propriétaire permettant aux marques de lancer des diffuseurs premium en marque blanche avec une diffusion de fragrance contrôlée, constante et efficace.', en: 'Innobiz Lab develops a proprietary diffusion technology enabling brands to launch premium white-label diffuser devices with controlled, consistent and efficient fragrance diffusion.' },
  'tech.marketing': { fr: 'Perspective marketing', en: 'Marketing perspective' },
  'tech.technical': { fr: 'Fondations techniques', en: 'Technical foundations' },
  'tech.marketing.1': { fr: 'Conçu pour augmenter la fréquence d\'usage des consommables', en: 'Designed to increase consumable usage frequency' },
  'tech.marketing.2': { fr: 'Soutient le positionnement produit premium', en: 'Supports premium product positioning' },
  'tech.marketing.3': { fr: 'Compatible huiles essentielles et home fragrance', en: 'Compatible with essential oils and home fragrance' },
  'tech.marketing.4': { fr: 'Intégré dans votre langage design de marque', en: 'Fully integrated into your brand design language' },
  'tech.technical.1': { fr: 'Architecture fluidique optimisée pour une diffusion contrôlée', en: 'Optimised fluidic architecture for controlled diffusion' },
  'tech.technical.2': { fr: 'Systèmes mécaniques de précision pour la répétabilité', en: 'Precision mechanical systems for repeatability' },
  'tech.technical.3': { fr: 'Matériaux durables sélectionnés pour la performance long terme', en: 'Durable materials selected for long-term performance' },
  'tech.technical.4': { fr: 'Électronique et logiciel embarqués permettant la programmabilité', en: 'Embedded electronics and software enabling programmability' },
  'tech.ip.title': { fr: 'Propriété intellectuelle et exclusivité', en: 'Intellectual property and exclusivity' },
  'tech.ip.desc': { fr: 'Innobiz Lab opère avec des partenaires industriels exclusifs. Les démonstrations expliquent les principes de performance tout en préservant les avantages propriétaires.', en: 'Innobiz Lab operates with exclusive industrial partners. Demonstrations explain performance principles while preserving proprietary advantages.' },
  
  // Outcomes page
  'outcomes.page.title': { fr: 'Augmentez les achats récurrents grâce à une diffusion simplifiée', en: 'Increase repeat purchase through simplified fragrance diffusion' },
  'outcomes.page.subtitle': { fr: 'En réduisant les frictions d\'usage, les marques transforment la diffusion en habitude quotidienne plutôt qu\'en action occasionnelle. Ce changement augmente directement la rotation des consommables et la valeur vie client.', en: 'By reducing friction in usage, brands transform diffusion into a daily habit rather than an occasional action. This shift directly increases consumable turnover and customer lifetime value.' },
  'outcomes.increase.title': { fr: 'Plus de consommation d\'huiles et de parfums', en: 'Higher essential oil and fragrance consumption' },
  'outcomes.acquire.title': { fr: 'Attachement renforcé à l\'expérience de marque', en: 'Stronger attachment to the brand experience' },
  'outcomes.premium.title': { fr: 'Valeur perçue des consommables augmentée', en: 'Increased perceived value of consumables' },
  'outcomes.retention.title': { fr: 'Rétention client améliorée', en: 'Improved customer retention' },
  
  // Compare page
  'compare.title': { fr: 'Une alternative moderne aux bougies, diffuseurs à bâtonnets et systèmes ultrasoniques', en: 'A modern alternative to candles, reed diffusers and ultrasonic systems' },
  'compare.subtitle': { fr: 'Les solutions de diffusion traditionnelles souffrent d\'un contrôle limité, de performances inconsistantes et de routines utilisateur obsolètes. La technologie Innobiz Lab est conçue pour remplacer les systèmes de diffusion legacy avec une solution contrôlée, programmable et premium.', en: 'Traditional diffusion solutions suffer from limited control, inconsistent performance and outdated user routines. Innobiz Lab\'s technology is designed to replace legacy diffusion systems with a controlled, programmable and premium solution.' },
  'compare.disclaimer': { fr: 'Les performances dépendent de la composition de fragrance et de l\'environnement d\'usage.', en: 'Performance depends on fragrance composition and usage environment.' },
  'compare.candles': { fr: 'Bougies', en: 'Candles' },
  'compare.reeds': { fr: 'Diffuseurs à bâtonnets', en: 'Reed diffusers' },
  'compare.ultrasonic': { fr: 'Ultrasonique', en: 'Ultrasonic' },
  'compare.nebulizer': { fr: 'Nébulisation', en: 'Nebuliser' },
  'compare.heat': { fr: 'Chaleur', en: 'Heat' },
  'compare.spray': { fr: 'Sprays', en: 'Sprays' },
  'compare.innobiz': { fr: 'Innobiz Lab', en: 'Innobiz Lab' },
  
  // Solutions page
  'solutions.title': { fr: 'Une plateforme, deux marchés', en: 'One platform, two markets' },
  'solutions.eo.title': { fr: 'Pour les marques d\'huiles essentielles', en: 'For essential oil brands' },
  'solutions.eo.desc': { fr: 'Lancez une plateforme diffuseur premium unique au lieu de multiples SKUs à faible rotation. L\'usage simplifié augmente la consommation d\'huiles essentielles et les achats récurrents.', en: 'Launch a single premium diffuser platform instead of multiple low-rotation SKUs. Simplified usage increases essential oil consumption and repeat purchase.' },
  'solutions.hf.title': { fr: 'Pour les marques de home fragrance', en: 'For home fragrance brands' },
  'solutions.hf.desc': { fr: 'Allez au-delà des bougies et diffuseurs à bâtonnets. Offrez un diffuseur programmable délivrant une performance olfactive constante et une expérience utilisateur moderne.', en: 'Move beyond candles and reed diffusers. Offer a programmable fragrance diffusion device delivering consistent olfactive performance and modern user experience.' },
  
  // Process page
  'process.page.title': { fr: 'Design et fabrication de diffuseurs de bout en bout', en: 'End-to-end diffuser design and manufacturing' },
  'process.page.subtitle': { fr: 'Innobiz Lab accompagne les marques sur l\'ensemble du cycle de vie produit : design, prototypage, conformité réglementaire, fabrication et logistique.', en: 'Innobiz Lab supports brands across the full product lifecycle: design, prototyping, regulatory compliance, manufacturing and logistics.' },
  'process.deliver.title': { fr: 'Ce que nous livrons', en: 'What we deliver' },
  'process.need.title': { fr: 'Ce dont nous avons besoin', en: 'What we need from you' },
  'process.moq': { fr: 'Quantité minimum de commande : 3 000 unités', en: 'Minimum order quantity: 3,000 units' },
  
  // Proof page
  'proof.page.title': { fr: 'Expertise industrielle et validation terrain', en: 'Industrial expertise and real-world validation' },
  'proof.page.subtitle': { fr: 'Expérience avérée en fabrication de diffuseurs, capacité de production à grande échelle, références confidentielles sur les marchés huiles essentielles et home fragrance.', en: 'Proven diffuser manufacturing experience. Large-scale production capability. Confidential references across essential oil and home fragrance markets.' },
  'proof.track.title': { fr: 'Notre track record', en: 'Our track record' },
  
  // FAQ page
  'faq.page.title': { fr: 'Questions fréquentes', en: 'Frequently Asked Questions' },
  'faq.page.subtitle': { fr: 'Tout ce que vous devez savoir', en: 'Everything you need to know' },
  'faq.cat.tech': { fr: 'Technologie & performance', en: 'Technology & performance' },
  'faq.cat.integration': { fr: 'Intégration & délais', en: 'Integration & timeline' },
  'faq.cat.moq': { fr: 'MOQ & fabrication', en: 'MOQ & manufacturing' },
  'faq.cat.branding': { fr: 'Branding & design', en: 'Branding & design' },
  'faq.cat.compliance': { fr: 'Conformité', en: 'Compliance' },
  'faq.cat.ip': { fr: 'Propriété du projet / IP', en: 'Project ownership / IP' },
  
  // Contact page
  'contact.title': { fr: 'Discutons de votre prochain projet de diffuseur', en: 'Discuss your next diffuser project' },
  'contact.subtitle': { fr: 'Décrivez votre marque et vos objectifs. Accédez à une démonstration structurée montrant comment notre technologie de diffusion augmente les ventes de consommables.', en: 'Describe your brand and objectives. Access a structured demonstration showing how our diffusion technology increases consumable sales.' },
  'contact.demo.title': { fr: 'Demander une démo', en: 'Request a demo' },
  'contact.demo.desc': { fr: 'Réservez un appel visio de 45 minutes avec notre équipe', en: 'Book a 45-minute video call with our team' },
  'contact.question.title': { fr: 'Poser une question', en: 'Ask a question' },
  'contact.question.desc': { fr: 'Envoyez-nous un message, nous répondons sous 24h', en: 'Send us a message, we respond within 24h' },
  
  // Form fields
  'form.company': { fr: 'Entreprise / Marque', en: 'Company / Brand' },
  'form.website': { fr: 'Site web', en: 'Website' },
  'form.country': { fr: 'Pays', en: 'Country' },
  'form.name': { fr: 'Nom du contact', en: 'Contact name' },
  'form.role': { fr: 'Fonction', en: 'Role' },
  'form.email': { fr: 'Email', en: 'Email' },
  'form.phone': { fr: 'Téléphone', en: 'Phone' },
  'form.market': { fr: 'Marché', en: 'Market' },
  'form.market.eo': { fr: 'Huiles essentielles', en: 'Essential Oils' },
  'form.market.hf': { fr: 'Home Fragrance', en: 'Home Fragrance' },
  'form.market.both': { fr: 'Les deux', en: 'Both' },
  'form.channels': { fr: 'Canaux de distribution', en: 'Distribution channels' },
  'form.channels.dtc': { fr: 'DTC (site propre)', en: 'DTC (own website)' },
  'form.channels.retail': { fr: 'Retail', en: 'Retail' },
  'form.channels.marketplaces': { fr: 'Marketplaces', en: 'Marketplaces' },
  'form.channels.wholesale': { fr: 'Wholesale', en: 'Wholesale' },
  'form.sales': { fr: 'CA annuel consommables (estimé)', en: 'Annual consumable sales (estimated)' },
  'form.timing': { fr: 'Timing projet', en: 'Project timing' },
  'form.timing.0-3': { fr: '0-3 mois', en: '0-3 months' },
  'form.timing.3-6': { fr: '3-6 mois', en: '3-6 months' },
  'form.timing.6-12': { fr: '6-12 mois', en: '6-12 months' },
  'form.budget': { fr: 'Budget (optionnel)', en: 'Budget (optional)' },
  'form.message': { fr: 'Message', en: 'Message' },
  'form.next': { fr: 'Suivant', en: 'Next' },
  'form.previous': { fr: 'Précédent', en: 'Previous' },
  'form.submit': { fr: 'Accéder au calendrier', en: 'Access calendar' },
  'form.success': { fr: 'Merci ! Sélectionnez maintenant votre créneau.', en: 'Thank you! Now select your time slot.' },
  'form.step': { fr: 'Étape', en: 'Step' },
  'form.of': { fr: 'sur', en: 'of' },

  // Chips
  'chip.proprietary': { fr: 'Propriétaire', en: 'Proprietary' },
  'chip.exclusive': { fr: 'Exclusif', en: 'Exclusive' },
  'chip.programmable': { fr: 'Programmable', en: 'Programmable' },
  'chip.silent': { fr: 'Ultra-silencieux', en: 'Ultra-silent' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const value = useMemo(() => ({ language, setLanguage, t }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
