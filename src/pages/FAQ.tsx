import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();

  const faqCategories = [
    {
      title: t('faq.cat.tech'),
      questions: [
        { 
          q: language === 'fr' ? 'Comment fonctionne la technologie ?' : 'How does the technology work?', 
          a: language === 'fr' 
            ? 'Notre système de micro-fluidique propriétaire atomise les fragrances sans chaleur ni ultrason, garantissant une diffusion pure, contrôlée et efficace. Les principes de performance sont expliqués lors de la démonstration.' 
            : 'Our proprietary micro-fluidic system atomises fragrances without heat or ultrasound, ensuring pure, controlled and efficient diffusion. Performance principles are explained during the demonstration.' 
        },
        { 
          q: language === 'fr' ? 'Quelle surface peut être couverte ?' : 'What area can be covered?', 
          a: language === 'fr' 
            ? 'La couverture et l\'intensité dépendent de la formulation de fragrance et des conditions d\'usage. Nous testons la performance lors du développement.' 
            : 'Coverage and intensity depend on fragrance formulation and usage conditions. We test performance during development.' 
        },
        { 
          q: language === 'fr' ? 'Quelles fragrances sont compatibles ?' : 'Which fragrances are compatible?', 
          a: language === 'fr' 
            ? 'Notre technologie a été validée avec une large gamme d\'huiles essentielles et de compositions parfumées. Nous testons la compatibilité lors du prototypage.' 
            : 'Our technology has been validated with a wide range of essential oils and fragrance compositions. We test compatibility during prototyping.' 
        },
        { 
          q: language === 'fr' ? 'Le système est-il silencieux ?' : 'Is the system silent?', 
          a: language === 'fr' 
            ? 'Oui, le système de diffusion est ultra-silencieux, conçu pour le confort et la discrétion dans les environnements quotidiens.' 
            : 'Yes, the diffusion system is ultra-silent, designed for comfort and discretion in everyday environments.' 
        },
      ],
    },
    {
      title: t('faq.cat.integration'),
      questions: [
        { 
          q: language === 'fr' ? 'Quel est le délai total ?' : 'What is the total timeline?', 
          a: language === 'fr' 
            ? 'Prototype en ~3 mois, fabrication et livraison en ~4 mois additionnels. Les délais dépendent des validations client.' 
            : 'Prototype in ~3 months, manufacturing and delivery in ~4 additional months. Timelines depend on client validations.' 
        },
        { 
          q: language === 'fr' ? 'Pouvez-vous vous adapter à notre planning ?' : 'Can you adapt to our schedule?', 
          a: language === 'fr' 
            ? 'Oui, nous planifions ensemble les étapes clés. La réactivité de vos validations impacte le délai global.' 
            : 'Yes, we plan key milestones together. Your validation speed impacts the overall timeline.' 
        },
      ],
    },
    {
      title: t('faq.cat.moq'),
      questions: [
        { 
          q: language === 'fr' ? 'Quel est le MOQ ?' : 'What is the MOQ?', 
          a: language === 'fr' 
            ? 'La quantité minimum de commande est de 3 000 unités pour la production série. Contactez-nous pour discuter de votre projet.' 
            : 'The minimum order quantity is 3,000 units for series production. Contact us to discuss your project.' 
        },
        { 
          q: language === 'fr' ? 'Où est fabriqué le produit ?' : 'Where is the product manufactured?', 
          a: language === 'fr' 
            ? 'Production avec des partenaires industriels certifiés. Contrôle qualité rigoureux.' 
            : 'Production with certified industrial partners. Rigorous quality control.' 
        },
      ],
    },
    {
      title: t('faq.cat.branding'),
      questions: [
        { 
          q: language === 'fr' ? 'Le design est-il 100% personnalisable ?' : 'Is the design 100% customisable?', 
          a: language === 'fr' 
            ? 'Oui, le module technologique propriétaire s\'intègre dans des designs exclusifs créés pour votre marque.' 
            : 'Yes, the proprietary technology module integrates into exclusive designs created for your brand.' 
        },
        { 
          q: language === 'fr' ? 'Qui possède le design ?' : 'Who owns the design?', 
          a: language === 'fr' 
            ? 'Le design externe vous appartient. Le module technologique reste propriété Innobiz Lab.' 
            : 'The external design belongs to you. The technology module remains Innobiz Lab property.' 
        },
      ],
    },
    {
      title: t('faq.cat.compliance'),
      questions: [
        { 
          q: language === 'fr' ? 'Gérez-vous la conformité réglementaire ?' : 'Do you handle regulatory compliance?', 
          a: language === 'fr' 
            ? 'Oui, nous gérons l\'ensemble du processus de conformité selon vos marchés cibles.' 
            : 'Yes, we handle the entire compliance process according to your target markets.' 
        },
        { 
          q: language === 'fr' ? 'Et pour les marchés hors Europe ?' : 'What about markets outside Europe?', 
          a: language === 'fr' 
            ? 'Nous accompagnons aussi les certifications pour les Émirats et autres marchés sur demande.' 
            : 'We also support certifications for the Emirates and other markets on request.' 
        },
      ],
    },
    {
      title: t('faq.cat.ip'),
      questions: [
        { 
          q: language === 'fr' ? 'La technologie est-elle protégée ?' : 'Is the technology protected?', 
          a: language === 'fr' 
            ? 'Oui, Twist & Mist est une technologie propriétaire développée en exclusivité par Innobiz. Nous opérons avec des partenaires industriels sélectionnés.' 
            : 'Yes, Twist & Mist is a proprietary technology developed exclusively by Innobiz. We operate with selected industrial partners.' 
        },
        { 
          q: language === 'fr' ? 'Puis-je revendre les modules à d\'autres marques ?' : 'Can I resell modules to other brands?', 
          a: language === 'fr' 
            ? 'Non, le réassort de modules est exclusif via Innobiz Lab pour garantir la qualité et la cohérence.' 
            : 'No, module restocking is exclusive via Innobiz Lab to guarantee quality and consistency.' 
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="section-container">
          <ScrollReveal>
            <h1 className="heading-display text-center mb-6">{t('faq.page.title')}</h1>
            <p className="text-body-lg text-center max-w-2xl mx-auto">{t('faq.page.subtitle')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          {faqCategories.map((category, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="mb-12">
                <h2 className="heading-subsection mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((faq, j) => (
                    <AccordionItem key={j} value={`${i}-${j}`} className="border rounded-xl px-6 bg-card">
                      <AccordionTrigger className="hover:no-underline py-5 text-left">
                        <span className="font-medium pr-4">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="text-center mt-16 p-8 rounded-2xl bg-secondary/30">
              <h3 className="heading-subsection mb-4">
                {language === 'fr' ? 'D\'autres questions ?' : 'More questions?'}
              </h3>
              <p className="text-body mb-6">
                {language === 'fr' 
                  ? 'Accédez à une démonstration structurée pour obtenir des réponses détaillées.' 
                  : 'Access a structured demonstration for detailed answers.'}
              </p>
              <Link to="/contact?type=demo">
                <Button className="btn-hero-primary">
                  {t('cta.demo')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;
