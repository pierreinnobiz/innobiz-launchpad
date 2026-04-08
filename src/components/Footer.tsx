import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import innobizLogo from '@/assets/innobiz-logo.png';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-6 text-center border-b border-primary-foreground/10">
        <p className="text-sm text-primary-foreground/80 max-w-3xl mx-auto mb-4 leading-relaxed">
          {t3(language, 'Tolia vous permet de transformer votre offre d\'huiles essentielles en un véritable programme de routines d\'aromathérapie, vécu chaque jour par vos clients.', 'Tolia enables you to transform your essential oils range into a genuine aromatherapy routine programme, experienced daily by your customers.', 'Tolia le permite transformar su oferta de aceites esenciales en un verdadero programa de rutinas de aromaterapia, vivido cada día por sus clientes.')}
        </p>
        <a href="#contact" onClick={() => trackCTAClick(t3(language, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis'), 'footer')}>
          <Button className="bg-primary-foreground text-primary font-semibold rounded-2xl px-6 py-3 text-sm hover:brightness-95 transition-all group">
            {t3(language, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis')}
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
      </div>

      <div className="section-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">Tolia</span>
              <span className="text-primary-foreground/50">by</span>
              <img src={innobizLogo} alt="Innobiz" className="h-7 brightness-0 invert opacity-80" />
            </div>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed mb-4 text-sm">
              {t3(language, 'Le diffuseur qui transforme l\'aromathérapie en routines quotidiennes et vos synergies en revenus récurrents.', 'The diffuser that transforms aromatherapy into daily routines and your blends into recurring revenue.', 'El difusor que transforma la aromaterapia en rutinas diarias y sus sinergias en ingresos recurrentes.')}
            </p>
            <div className="text-primary-foreground/50 text-sm space-y-1">
              <p>INNOBIZ SARL - SIRET 484 775 432 00034</p>
              <p>8 rue Louis Breguet, 34830 Jacou, France</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">{t3(language, 'Informations', 'Information', 'Información')}</h4>
            <ul className="space-y-2">
              <li><Link to="/legal" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t3(language, 'Mentions légales', 'Legal notice', 'Aviso legal')}</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">{t3(language, 'Politique de confidentialité', 'Privacy policy', 'Política de privacidad')}</Link></li>
              <li><Link to="/cookies" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Cookies</Link></li>
            </ul>
            <div className="mt-6 pt-4 border-t border-primary-foreground/10">
              <p className="text-primary-foreground/60 text-sm">+33 (0)4 67 84 89 14</p>
              <p className="text-primary-foreground/60 text-sm">contact@innobiz.fr</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">© {new Date().getFullYear()} Tolia by INNOBIZ. {t3(language, 'Tous droits réservés.', 'All rights reserved.', 'Todos los derechos reservados.')}</p>
            <p className="text-primary-foreground/50 text-sm">
              Jacou, France • <a href="https://www.innobiz.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">www.innobiz.fr</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
