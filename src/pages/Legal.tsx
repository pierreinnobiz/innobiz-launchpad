import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Legal: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container max-w-3xl">
          <h1 className="heading-display mb-8">{language === 'fr' ? 'Mentions légales' : 'Legal Notice'}</h1>
          <div className="prose prose-lg text-muted-foreground space-y-8">
            
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Éditeur du site' : 'Site Publisher'}</h2>
              <p className="leading-relaxed">
                <strong>INNOBIZ</strong><br />
                Société à responsabilité limitée (SARL)<br />
                Capital social : 7 500 €<br />
                SIRET : 484 775 432 00034<br />
                RCS Montpellier<br />
                N° TVA intracommunautaire : FR 42 484775432
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Siège social' : 'Headquarters'}</h2>
              <p className="leading-relaxed">
                8 rue Louis Breguet<br />
                Immeuble le 601 - Bâtiment B<br />
                34830 Jacou<br />
                France
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Contact' : 'Contact'}</h2>
              <p className="leading-relaxed">
                Téléphone : +33 (0)4 67 84 89 14<br />
                Email : contact@innobiz.fr<br />
                Site web : <a href="https://www.innobiz.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.innobiz.fr</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Direction de la publication' : 'Publication Director'}</h2>
              <p className="leading-relaxed">
                Directeur de la publication : Gérant de la société INNOBIZ
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Hébergement' : 'Hosting'}</h2>
              <p className="leading-relaxed">
                Ce site est hébergé par :<br />
                <strong>Lovable / GPT Engineer Inc.</strong><br />
                San Francisco, CA, États-Unis<br />
                <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.lovable.dev</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Propriété intellectuelle' : 'Intellectual Property'}</h2>
              <p className="leading-relaxed">
                {language === 'fr' 
                  ? "L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est la propriété exclusive d'INNOBIZ ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable."
                  : "All content on this site (texts, images, videos, logos, trademarks) is the exclusive property of INNOBIZ or its partners. Any reproduction, representation, modification, publication or adaptation of all or part of the site elements is prohibited without prior written authorization."
                }
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Données personnelles' : 'Personal Data'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant. Pour exercer ces droits, contactez-nous à : contact@innobiz.fr"
                  : "In accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act, you have the right to access, rectify, delete and object to your personal data. To exercise these rights, contact us at: contact@innobiz.fr"
                }
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const Privacy: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container max-w-3xl">
          <h1 className="heading-display mb-8">{language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}</h1>
          <div className="prose prose-lg text-muted-foreground space-y-8">
            
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Responsable du traitement' : 'Data Controller'}</h2>
              <p className="leading-relaxed">
                INNOBIZ - SARL<br />
                8 rue Louis Breguet, Immeuble le 601 - Bâtiment B<br />
                34830 Jacou, France<br />
                Email : contact@innobiz.fr
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Données collectées' : 'Data Collected'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Nous collectons les données que vous nous fournissez volontairement via nos formulaires de contact : nom, prénom, email, numéro de téléphone, nom de l'entreprise, et le contenu de votre message."
                  : "We collect data that you voluntarily provide through our contact forms: name, email, phone number, company name, and the content of your message."
                }
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Finalité du traitement' : 'Purpose of Processing'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Vos données sont utilisées pour répondre à vos demandes de contact, vous envoyer des informations commerciales si vous y avez consenti, et améliorer nos services."
                  : "Your data is used to respond to your contact requests, send you commercial information if you have consented, and improve our services."
                }
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Durée de conservation' : 'Retention Period'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Vos données personnelles sont conservées pendant une durée de 3 ans à compter de votre dernier contact avec nous."
                  : "Your personal data is kept for 3 years from your last contact with us."
                }
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Vos droits' : 'Your Rights'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Conformément au RGPD, vous disposez des droits suivants : accès, rectification, effacement, limitation, portabilité et opposition. Pour les exercer : contact@innobiz.fr"
                  : "Under the GDPR, you have the following rights: access, rectification, erasure, restriction, portability and objection. To exercise them: contact@innobiz.fr"
                }
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const Cookies: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container max-w-3xl">
          <h1 className="heading-display mb-8">{language === 'fr' ? 'Politique cookies' : 'Cookie Policy'}</h1>
          <div className="prose prose-lg text-muted-foreground space-y-8">
            
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? "Qu'est-ce qu'un cookie ?" : 'What is a cookie?'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet de stocker des informations relatives à votre navigation."
                  : "A cookie is a small text file stored on your device (computer, tablet, smartphone) when visiting a website. It allows storing information related to your browsing."
                }
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Cookies utilisés' : 'Cookies Used'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Ce site utilise uniquement des cookies techniques essentiels au fonctionnement du site. Aucun cookie publicitaire ou de tracking n'est utilisé sans votre consentement."
                  : "This site only uses essential technical cookies necessary for the site to function. No advertising or tracking cookies are used without your consent."
                }
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">{language === 'fr' ? 'Gestion des cookies' : 'Cookie Management'}</h2>
              <p className="leading-relaxed">
                {language === 'fr'
                  ? "Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur."
                  : "You can modify your cookie preferences at any time through your browser settings."
                }
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Legal;
