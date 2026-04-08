import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import innobizLogo from '@/assets/innobiz-logo.png';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';

type LangCode = 'en' | 'fr' | 'es';

const languages: { code: LangCode; label: string; available: boolean }[] = [
  { code: 'fr', label: 'FR', available: true },
  { code: 'en', label: 'EN', available: true },
  { code: 'es', label: 'ES', available: true },
  { code: 'de' as LangCode, label: 'DE', available: false },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaLabel = language === 'es' ? 'Reserve su demo' : language === 'en' ? 'Book your demo' : 'Réservez votre démo';

  const LanguageSwitcher = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => lang.available && setLanguage(lang.code)}
          disabled={!lang.available}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            language === lang.code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : lang.available
                ? 'text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50'
                : 'text-muted-foreground/40 border border-border/20 cursor-not-allowed'
          }`}
          aria-label={`Switch to ${lang.label}`}
          title={!lang.available ? (language === 'en' ? 'Coming soon' : 'Bientôt disponible') : undefined}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm' : 'bg-transparent'}`}>
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="text-xl lg:text-2xl font-bold text-primary transition-colors group-hover:text-primary/80">Tolia</span>
              <span className="text-muted-foreground text-xs hidden sm:inline">by</span>
              <img src={innobizLogo} alt="Innobiz" className="h-7 hidden sm:inline opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>

            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <a href="#contact" onClick={() => trackCTAClick(ctaLabel, 'nav')}>
                <Button className="bg-primary text-primary-foreground font-semibold rounded-full px-6 py-2.5 hover:brightness-110 transition-all shadow-md hover:shadow-lg group">
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2.5 rounded-xl hover:bg-secondary transition-colors">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border/40 animate-fade-in">
            <div className="section-container py-6">
              <a href="#contact" onClick={() => { setIsMobileMenuOpen(false); trackCTAClick(ctaLabel, 'nav-mobile'); }}>
                <Button className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 group">
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      <a href="#contact" onClick={() => trackCTAClick(ctaLabel, 'sticky-mobile')} className="lg:hidden sticky-cta text-sm flex items-center gap-1.5">
        {ctaLabel}
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </>
  );
};

export default Navigation;