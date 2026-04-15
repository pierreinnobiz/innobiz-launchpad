import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaLabel = language === 'es' ? 'Iniciar una conversación' : language === 'en' ? 'Start a conversation' : 'Démarrer une conversation';

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

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </header>

      <StickyMobileCTA label={ctaLabel} />
    </>
  );
};

/** FIX 6 — Sticky mobile CTA bar */
const StickyMobileCTA: React.FC<{ label: string }> = ({ label }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero || !contact) return;

    const observers: IntersectionObserver[] = [];
    let heroVisible = true;
    let contactVisible = false;

    const update = () => setVisible(!heroVisible && !contactVisible);

    const heroObs = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }, { threshold: 0.1 });
    heroObs.observe(hero);
    observers.push(heroObs);

    const contactObs = new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; update(); }, { threshold: 0.1 });
    contactObs.observe(contact);
    observers.push(contactObs);

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <a
      href="#contact"
      onClick={() => trackCTAClick(label, 'sticky-mobile')}
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground h-14 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5" />
    </a>
  );
};

export default Navigation;
