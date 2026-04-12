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

const navLinks = [
  { label: { en: 'Problem', fr: 'Problème', es: 'Problema' }, href: '#closet-syndrome' },
  { label: { en: 'Solution', fr: 'Solution', es: 'Solución' }, href: '#twist-and-mist' },
  { label: { en: 'Business case', fr: 'Business case', es: 'Caso de negocio' }, href: '#business-math' },
  { label: { en: 'Partners', fr: 'Partenaires', es: 'Socios' }, href: '#market-proof' },
  { label: { en: 'FAQ', fr: 'FAQ', es: 'FAQ' }, href: '#faq' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const ctaLabel = language === 'es' ? 'Iniciar una conversación' : language === 'en' ? 'Start a conversation' : 'Démarrer une conversation';

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-primary/10 text-primary'
                      : isScrolled
                        ? 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label[language as keyof typeof link.label] || link.label.en}
                </button>
              ))}
            </div>

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
            <div className="section-container py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label[language as keyof typeof link.label] || link.label.en}
                </button>
              ))}
              <a href="#contact" onClick={() => { setIsMobileMenuOpen(false); trackCTAClick(ctaLabel, 'nav-mobile'); }}>
                <Button className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 mt-2 group">
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Sticky mobile CTA - appears after hero, hides near contact */}
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
