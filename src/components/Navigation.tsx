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
];


const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const overHero = pathname === '/' && !isScrolled; // en-tête transparent posé sur le film sombre de l'accueil

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaLabel = language === 'es' ? 'Iniciar una conversación' : language === 'en' ? 'Start a conversation' : 'Démarrer une conversation';
  const sampleLabel = language === 'es' ? 'Recibir mi muestra' : language === 'en' ? 'Get my sample' : 'Recevoir mon échantillon';
  const sampleLabelShort = language === 'es' ? 'Muestra' : language === 'en' ? 'Sample' : 'Échantillon';

  // Au-dessus du film du haut de page (fond sombre, en-tête transparent), les langues non choisies sont écrites en blanc :
  // en gris, elles étaient presque invisibles (17/10/2026).
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
              : !lang.available
                ? 'text-muted-foreground/40 border border-border/20 cursor-not-allowed'
                : overHero
                  ? 'text-white/85 hover:text-white hover:bg-white/10 border border-white/35'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50'
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
              <img src={innobizLogo} alt="Innobiz - Aromatherapy and wellness experts" className="h-7 hidden sm:inline opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <a
                href="#contact"
                onClick={() => trackCTAClick(sampleLabel, 'nav', 'sample_nav')}
                className="inline-flex shrink-0"
              >
                <Button
                  size="sm"
                  className="rounded-full font-semibold bg-primary text-primary-foreground hover:brightness-110 px-3 sm:px-4"
                >
                  <span className="lg:hidden whitespace-nowrap">{sampleLabelShort}</span>
                  <span className="hidden lg:inline whitespace-nowrap">{sampleLabel}</span>
                </Button>
              </a>
            </div>
          </nav>
        </div>
      </header>

      <StickyMobileCTA label={sampleLabel} />
    </>
  );
};

/** Barre d'action fixe sur téléphone : cachée tant que le haut de page (qui a déjà ses boutons) est à l'écran, et au-dessus du formulaire.
 *  17/10/2026 : trois boutons « échantillon » dans le premier écran, c'était trop (retour du test par les marques). */
const StickyMobileCTA: React.FC<{ label: string }> = ({ label }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = new Map<Element, boolean>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target, e.isIntersecting));
        setVisible(![...seen.values()].some(Boolean));
      },
      { threshold: 0.1 }
    );
    // la section contact n'existe qu'une fois le bas de page chargé : on la cherche jusqu'à la trouver
    const watch = () => ['hero', 'journee', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el && !seen.has(el)) { seen.set(el, false); obs.observe(el); } });
    watch();
    const timer = window.setInterval(() => { watch(); if (seen.size >= 3) window.clearInterval(timer); }, 800);
    return () => { obs.disconnect(); window.clearInterval(timer); };
  }, []);

  return (
    <a
      href="#contact"
      onClick={() => trackCTAClick(label, 'sticky-mobile', 'sample_hero')}
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
