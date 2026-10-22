import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SeoOpenGraph from '@/components/SeoOpenGraph';
import { MANAGE_COOKIES_EVENT } from '@/components/CookieConsent';
import { t3 } from '@/lib/t3';

// Pages légales réécrites le 22/10/2026 (point V8, accord de Pierre) : en français, anglais et espagnol ; directeur de la
// publication nommé ; liste réelle des données collectées, des services qui les traitent et des cookies (mesurés sur le site).

const SeoHead: React.FC<{ title: string; description: string; path: string }> = ({ title, description, path }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://www.innobiz-tolia.com${path}`} />
    </Helmet>
    <SeoOpenGraph title={title} description={description} path={path} />
  </>
);

const Page: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main id="contenu" className="pt-32 pb-20">
      <div className="section-container max-w-3xl">
        <h1 className="heading-display mb-8">{title}</h1>
        <div className="prose prose-lg text-muted-foreground space-y-8">{children}</div>
      </div>
    </main>
    <Footer />
  </div>
);

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
    {children}
  </div>
);

const Legal: React.FC = () => {
  const { language: l } = useLanguage();
  return (
    <>
      <SeoHead
        path="/legal"
        title={t3(l, 'Mentions légales | Tolia by Innobiz', 'Legal Notice | Tolia by Innobiz', 'Aviso legal | Tolia by Innobiz')}
        description={t3(l, 'Mentions légales de Tolia by Innobiz : INNOBIZ SARL à Jacou, près de Montpellier, directeur de la publication, hébergement du site et propriété intellectuelle.', 'Legal notice for the Tolia by Innobiz website: INNOBIZ SARL in Jacou, near Montpellier, France, publication director, website hosting and intellectual property.', 'Aviso legal de Tolia by Innobiz: INNOBIZ SARL en Jacou, cerca de Montpellier (Francia), director de la publicación, alojamiento y propiedad intelectual.')}
      />
      <Page title={t3(l, 'Mentions légales', 'Legal Notice', 'Aviso legal')}>
        <Block title={t3(l, 'Éditeur du site', 'Site publisher', 'Editor del sitio')}>
          <p className="leading-relaxed">
            <strong>INNOBIZ</strong><br />
            {t3(l, 'Société à responsabilité limitée (SARL) au capital de 7 500 €', 'Limited liability company (SARL) with a share capital of €7,500', 'Sociedad de responsabilidad limitada (SARL) con un capital de 7.500 €')}<br />
            SIRET : 484 775 432 00034 · RCS Montpellier<br />
            {t3(l, 'N° TVA intracommunautaire', 'EU VAT number', 'N.º de IVA intracomunitario')} : FR 42 484775432
          </p>
        </Block>
        <Block title={t3(l, 'Siège social', 'Registered office', 'Domicilio social')}>
          <p className="leading-relaxed">
            8 rue Louis Breguet<br />
            Immeuble le 601, Bâtiment B<br />
            34830 Jacou<br />
            {t3(l, 'France', 'France', 'Francia')}
          </p>
        </Block>
        <Block title={t3(l, 'Contact', 'Contact', 'Contacto')}>
          <p className="leading-relaxed">
            {t3(l, 'Téléphone', 'Phone', 'Teléfono')} : +33 (0)4 67 84 89 14<br />
            Email : contact@innobiz.fr<br />
            {t3(l, 'Site web', 'Website', 'Sitio web')} : <a href="https://www.innobiz.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.innobiz.fr</a>
          </p>
        </Block>
        <Block title={t3(l, 'Directeur de la publication', 'Publication director', 'Director de la publicación')}>
          <p className="leading-relaxed">{t3(l, 'Pierre-Emmanuel Thuret, gérant de la société INNOBIZ.', 'Pierre-Emmanuel Thuret, managing director of INNOBIZ.', 'Pierre-Emmanuel Thuret, gerente de la sociedad INNOBIZ.')}</p>
        </Block>
        <Block title={t3(l, 'Hébergement', 'Hosting', 'Alojamiento')}>
          <p className="leading-relaxed">
            {t3(l, 'Ce site est hébergé par :', 'This site is hosted by:', 'Este sitio está alojado por:')}<br />
            <strong>Lovable / GPT Engineer Inc.</strong><br />
            San Francisco, CA, {t3(l, 'États-Unis', 'United States', 'Estados Unidos')}<br />
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.lovable.dev</a><br />
            {t3(l, 'Les demandes envoyées par les formulaires sont enregistrées par Supabase.', 'Requests sent through the forms are stored by Supabase.', 'Las solicitudes enviadas a través de los formularios las registra Supabase.')}
          </p>
        </Block>
        <Block title={t3(l, 'Propriété intellectuelle', 'Intellectual property', 'Propiedad intelectual')}>
          <p className="leading-relaxed">
            {t3(
              l,
              "L'ensemble du contenu de ce site (textes, images, vidéos, logos, marques) est la propriété exclusive d'INNOBIZ ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable.",
              'All content on this site (texts, images, videos, logos, trademarks) is the exclusive property of INNOBIZ or its partners. Any reproduction, representation, modification, publication or adaptation of all or part of the site is prohibited without prior written authorisation.',
              'Todo el contenido de este sitio (textos, imágenes, vídeos, logotipos, marcas) es propiedad exclusiva de INNOBIZ o de sus socios. Queda prohibida cualquier reproducción, representación, modificación, publicación o adaptación de la totalidad o de parte del sitio sin autorización previa por escrito.'
            )}
          </p>
        </Block>
        <Block title={t3(l, 'Données personnelles', 'Personal data', 'Datos personales')}>
          <p className="leading-relaxed">
            {t3(l, 'Voir notre ', 'See our ', 'Consulte nuestra ')}
            <a href="/privacy" className="text-primary hover:underline">{t3(l, 'politique de confidentialité', 'privacy policy', 'política de privacidad')}</a>
            {t3(l, ' et notre ', ' and our ', ' y nuestra ')}
            <a href="/cookies" className="text-primary hover:underline">{t3(l, 'politique cookies', 'cookie policy', 'política de cookies')}</a>.
          </p>
        </Block>
      </Page>
    </>
  );
};

export const Privacy: React.FC = () => {
  const { language: l } = useLanguage();
  return (
    <>
      <SeoHead
        path="/privacy"
        title={t3(l, 'Politique de confidentialité | Tolia by Innobiz', 'Privacy Policy | Tolia by Innobiz', 'Política de privacidad | Tolia by Innobiz')}
        description={t3(l, 'Politique de confidentialité de Tolia by Innobiz : données du formulaire d\'échantillon, utilisation, prestataires, durée de conservation et vos droits RGPD.', 'Tolia by Innobiz privacy policy: data collected through the sample request form, how it is used, service providers, retention period and your GDPR rights.', 'Política de privacidad de Tolia by Innobiz: datos del formulario de solicitud de muestra, uso, proveedores, plazo de conservación y sus derechos RGPD.')}
      />
      <Page title={t3(l, 'Politique de confidentialité', 'Privacy Policy', 'Política de privacidad')}>
        <Block title={t3(l, 'Responsable du traitement', 'Data controller', 'Responsable del tratamiento')}>
          <p className="leading-relaxed">
            INNOBIZ SARL<br />
            8 rue Louis Breguet, Immeuble le 601, Bâtiment B<br />
            34830 Jacou, {t3(l, 'France', 'France', 'Francia')}<br />
            Email : contact@innobiz.fr
          </p>
        </Block>
        <Block title={t3(l, 'Données collectées', 'Data collected', 'Datos recogidos')}>
          <p className="leading-relaxed">
            {t3(
              l,
              "Quand vous demandez un échantillon : votre email professionnel, vos prénom et nom, votre société, son site web, votre pays et votre adresse de livraison ; et, si vous les donnez, votre poste, votre téléphone et quelques mots sur votre projet.",
              'When you request a sample: your work email, first and last name, company, its website, your country and your delivery address; and, if you provide them, your job title, your phone number and a few words about your project.',
              'Cuando solicita una muestra: su email profesional, su nombre y apellidos, su empresa, su sitio web, su país y su dirección de envío; y, si los facilita, su cargo, su teléfono y unas palabras sobre su proyecto.'
            )}
          </p>
          <p className="leading-relaxed mt-3">
            {t3(
              l,
              "Si vous arrivez sur le site par un lien d'un de nos emails, votre visite est rattachée à votre adresse email pour notre suivi commercial.",
              'If you reach the site through a link in one of our emails, your visit is linked to your email address for our sales follow-up.',
              'Si llega al sitio a través de un enlace de uno de nuestros emails, su visita se vincula a su dirección de email para nuestro seguimiento comercial.'
            )}
          </p>
        </Block>
        <Block title={t3(l, 'Pourquoi nous les utilisons', 'Why we use them', 'Para qué los utilizamos')}>
          <p className="leading-relaxed">
            {t3(
              l,
              "Vous envoyer l'échantillon, vous recontacter au sujet de votre projet et suivre nos échanges commerciaux. Cette utilisation repose sur notre intérêt légitime à développer une relation entre entreprises.",
              'To send you the sample, to contact you about your project and to follow up on our business exchanges. This use is based on our legitimate interest in developing a business-to-business relationship.',
              'Para enviarle la muestra, volver a contactarle sobre su proyecto y hacer el seguimiento de nuestros intercambios comerciales. Este uso se basa en nuestro interés legítimo en desarrollar una relación entre empresas.'
            )}
          </p>
        </Block>
        <Block title={t3(l, 'Qui les traite pour nous', 'Who processes them for us', 'Quién los trata por nosotros')}>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t3(l, 'Lovable : hébergement du site', 'Lovable: website hosting', 'Lovable: alojamiento del sitio')}</li>
            <li>{t3(l, 'Supabase : enregistrement des demandes', 'Supabase: storage of requests', 'Supabase: registro de las solicitudes')}</li>
            <li>{t3(l, 'Resend : envoi des emails', 'Resend: sending emails', 'Resend: envío de los emails')}</li>
            <li>{t3(l, 'notre outil de gestion commerciale', 'our sales management tool', 'nuestra herramienta de gestión comercial')}</li>
            <li>{t3(l, 'Google Analytics : mesure d’audience, seulement si vous acceptez les cookies', 'Google Analytics: audience measurement, only if you accept cookies', 'Google Analytics: medición de audiencia, solo si acepta las cookies')}</li>
            <li>{t3(l, 'Vimeo : lecture du film de présentation', 'Vimeo: playback of the presentation film', 'Vimeo: reproducción del vídeo de presentación')}</li>
            <li>{t3(l, 'Calendly : si vous réservez un rendez-vous', 'Calendly: if you book a meeting', 'Calendly: si reserva una cita')}</li>
          </ul>
          <p className="leading-relaxed mt-3">
            {t3(l, "Certains de ces services sont situés hors de l'Union européenne.", 'Some of these services are located outside the European Union.', 'Algunos de estos servicios se encuentran fuera de la Unión Europea.')}
          </p>
        </Block>
        <Block title={t3(l, 'Durée de conservation', 'Retention period', 'Plazo de conservación')}>
          <p className="leading-relaxed">
            {t3(l, '3 ans à compter de notre dernier contact.', '3 years from our last contact.', '3 años a partir de nuestro último contacto.')}
          </p>
        </Block>
        <Block title={t3(l, 'Vos droits', 'Your rights', 'Sus derechos')}>
          <p className="leading-relaxed">
            {t3(
              l,
              "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition. Pour les exercer : contact@innobiz.fr. Vous pouvez aussi adresser une réclamation à la CNIL (www.cnil.fr).",
              'You have the right to access, rectify, erase, restrict, port and object. To exercise these rights: contact@innobiz.fr. You can also lodge a complaint with the CNIL, the French data protection authority (www.cnil.fr).',
              'Tiene derecho de acceso, rectificación, supresión, limitación, portabilidad y oposición. Para ejercerlos: contact@innobiz.fr. También puede presentar una reclamación ante la CNIL, la autoridad francesa de protección de datos (www.cnil.fr).'
            )}
          </p>
        </Block>
      </Page>
    </>
  );
};

export const Cookies: React.FC = () => {
  const { language: l } = useLanguage();
  return (
    <>
      <SeoHead
        path="/cookies"
        title={t3(l, 'Politique cookies | Tolia by Innobiz', 'Cookie Policy | Tolia by Innobiz', 'Política de cookies | Tolia by Innobiz')}
        description={t3(l, 'Politique cookies de Tolia by Innobiz : cookies nécessaires, mesure d\'audience Google Analytics seulement avec votre accord, durées et comment changer d\'avis.', 'Tolia by Innobiz cookie policy: necessary cookies, Google Analytics audience measurement only with your consent, how long they last and how to change your mind.', 'Política de cookies de Tolia by Innobiz: cookies necesarias, Google Analytics solo con su consentimiento, duración de cada cookie y cómo cambiar de opinión.')}
      />
      <Page title={t3(l, 'Politique cookies', 'Cookie Policy', 'Política de cookies')}>
        <Block title={t3(l, "Qu'est-ce qu'un cookie ?", 'What is a cookie?', '¿Qué es una cookie?')}>
          <p className="leading-relaxed">
            {t3(
              l,
              "Un cookie est un petit fichier déposé sur votre ordinateur, tablette ou téléphone quand vous visitez un site. Il permet de garder des informations sur votre visite.",
              'A cookie is a small file stored on your computer, tablet or phone when you visit a website. It keeps information about your visit.',
              'Una cookie es un pequeño archivo que se guarda en su ordenador, tableta o teléfono cuando visita un sitio web. Permite conservar información sobre su visita.'
            )}
          </p>
        </Block>
        <Block title={t3(l, 'Toujours présents (nécessaires)', 'Always present (necessary)', 'Siempre presentes (necesarias)')}>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t3(l, 'Votre choix sur les cookies : 6 mois.', 'Your cookie choice: 6 months.', 'Su elección sobre las cookies: 6 meses.')}</li>
            <li>{t3(l, "Des cookies de sécurité de l'hébergeur et de Vimeo : de quelques minutes à un an.", 'Security cookies from the host and from Vimeo: from a few minutes to one year.', 'Cookies de seguridad del alojamiento y de Vimeo: de unos minutos a un año.')}</li>
            <li>{t3(l, "Une statistique de visite de l'hébergeur : 30 minutes.", 'A visit statistic from the host: 30 minutes.', 'Una estadística de visita del alojamiento: 30 minutos.')}</li>
          </ul>
        </Block>
        <Block title={t3(l, 'Seulement si vous cliquez « Tout accepter »', 'Only if you click “Accept all”', 'Solo si hace clic en «Aceptar todo»')}>
          <p className="leading-relaxed">
            {t3(l, "Google Analytics, pour mesurer l'audience du site : 13 mois.", 'Google Analytics, to measure site traffic: 13 months.', 'Google Analytics, para medir la audiencia del sitio: 13 meses.')}
          </p>
        </Block>
        <Block title={t3(l, "Changer d'avis", 'Changing your mind', 'Cambiar de opinión')}>
          <p className="leading-relaxed">
            {t3(l, 'Vous pouvez changer votre choix à tout moment avec le lien « Gérer les cookies » en bas de chaque page, ou ici : ', 'You can change your choice at any time with the “Manage cookies” link at the bottom of every page, or here: ', 'Puede cambiar su elección en cualquier momento con el enlace «Gestionar las cookies» al pie de cada página, o aquí: ')}
            <button type="button" onClick={() => window.dispatchEvent(new Event(MANAGE_COOKIES_EVENT))} className="text-primary underline underline-offset-2 hover:opacity-80">
              {t3(l, 'Gérer les cookies', 'Manage cookies', 'Gestionar las cookies')}
            </button>
            .
          </p>
        </Block>
      </Page>
    </>
  );
};

export default Legal;
