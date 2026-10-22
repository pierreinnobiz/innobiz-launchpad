import React from 'react';
import { Link } from 'react-router-dom';
import innobizLogo from '@/assets/innobiz-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import { MANAGE_COOKIES_EVENT } from '@/components/CookieConsent';

// Pied de page allégé : plus de phrase d'accroche ni de bouton répété (le formulaire est juste au-dessus).
// Les informations légales (société, SIRET, adresse, liens) sont inchangées.
const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">Tolia</span>
              <span className="text-primary-foreground/50">by</span>
              <img src={innobizLogo} alt="Innobiz - Aromatherapy and wellness experts" className="h-7 brightness-0 invert opacity-80" loading="lazy" decoding="async" />
            </div>
            <div className="text-primary-foreground/60 text-sm space-y-1">
              <p>INNOBIZ SARL - SIRET 484 775 432 00034</p>
              <p>8 rue Louis Breguet, 34830 Jacou, France</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">{t3(language, 'Informations', 'Information', 'Información')}</h4>
            <ul className="space-y-2">
              <li><Link to="/legal" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t3(language, 'Mentions légales', 'Legal notice', 'Aviso legal')}</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t3(language, 'Politique de confidentialité', 'Privacy policy', 'Política de privacidad')}</Link></li>
              <li><Link to="/cookies" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Cookies</Link></li>
              <li>
                <button type="button" onClick={() => window.dispatchEvent(new Event(MANAGE_COOKIES_EVENT))} className="text-left text-primary-foreground/70 hover:text-primary-foreground underline-offset-2 hover:underline transition-colors">
                  {t3(language, 'Gérer les cookies', 'Manage cookies', 'Gestionar las cookies')}
                </button>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-primary-foreground/10">
              <p className="text-primary-foreground/70 text-sm">+33 (0)4 67 84 89 14</p>
              <p className="text-primary-foreground/70 text-sm">contact@innobiz.fr</p>
              {/* profil LinkedIn du fondateur (19/10/2026) : visible ici et repris dans les données structurées (vite.config.ts) */}
              <p className="text-sm mt-2">
                <a href="https://www.linkedin.com/in/pierre-emmanuel-thuret-b5bb7910/" target="_blank" rel="noopener" className="text-primary-foreground/70 hover:text-primary-foreground underline underline-offset-2 transition-colors">
                  {t3(language, 'Pierre-Emmanuel Thuret, fondateur, sur LinkedIn', 'Pierre-Emmanuel Thuret, founder, on LinkedIn', 'Pierre-Emmanuel Thuret, fundador, en LinkedIn')}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">© {new Date().getFullYear()} Tolia by INNOBIZ. {t3(language, 'Tous droits réservés.', 'All rights reserved.', 'Todos los derechos reservados.')}</p>
            <p className="text-primary-foreground/60 text-sm">
              Jacou, France • <a href="https://www.innobiz.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">www.innobiz.fr</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
