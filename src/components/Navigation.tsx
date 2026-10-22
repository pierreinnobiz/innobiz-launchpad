import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import innobizLogo from '@/assets/innobiz-logo-140.png'; // 140 px suffisent pour un logo affiché à 28 px de haut (avant : 680 px)
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { isHomePath } from '@/lib/langPath';

type LangCode = 'en' | 'fr' | 'es';

// nom de chaque langue écrit dans cette langue (lu par les lecteurs d'écran à la place de « FR », « EN », « ES »)
const languages: { code: LangCode; label: string; name: string }[] = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
];


const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const overHero = isHomePath(pathname) && !isScrolled; // en-tête transparent posé sur le film sombre de l'accueil

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaLabel = language === 'es' ? 'Iniciar una conversación' : language === 'en' ? 'Start a conversation' : 'Démarrer une conversation';
  const sampleLabel = language === 'es' ? 'Recibir mi muestra' : language === 'en' ? 'Get my sample' : 'Recevoir mon échantillon';
  const sampleLabelShort = language === 'es' ? 'Muestra' : language === 'en' ? 'Sample' : 'Échantillon';

  // Une adresse par langue (/fr/, /en/, /es/) : sur l'accueil, changer de langue change aussi l'adresse (référencement, 17/10/2026).
  const switchLang = (code: LangCode) => {
    setLanguage(code);
    if (isHomePath(pathname)) navigate({ pathname: `/${code}/`, search }, { replace: true });
  };

  // Au-dessus du film du haut de page (fond sombre, en-tête transparent), les langues non choisies sont écrites en blanc :
  // en gris, elles étaient presque invisibles (17/10/2026).
  // 22/10/2026 : de vrais liens (/fr/, /en/, /es/) que Google et les assistants IA peuvent suivre ; affichés par un simple appel
  // de fonction (un composant déclaré ici était recréé à chaque affichage et le clavier perdait sa place après un changement de langue).
  const langHref = (code: LangCode) => (isHomePath(pathname) ? `/${code}/${search}` : `${pathname}?lang=${code}`);
  const renderLanguages = () => (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <a
          key={lang.code}
          href={langHref(lang.code)}
          hrefLang={lang.code}
          lang={lang.code}
          onClick={(e) => { e.preventDefault(); switchLang(lang.code); }}
          className={`tap-target tap-target-tight px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            language === lang.code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : overHero
                ? 'text-white/85 hover:text-white hover:bg-white/10 border border-white/35'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50'
          }`}
          aria-label={lang.name}
          aria-current={language === lang.code ? 'true' : undefined}
        >
          {lang.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm' : 'bg-transparent'}`}>
        <div className="section-container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <Link to={`/${language}/`} className="tap-target flex items-center gap-2.5 group">
              <span className="text-xl lg:text-2xl font-bold text-primary transition-colors group-hover:text-primary/80">Tolia</span>
              <span className="text-muted-foreground text-xs hidden sm:inline">by</span>
              <img src={innobizLogo} alt="Innobiz" className="h-7 hidden sm:inline opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              {renderLanguages()}
              {/* un seul élément cliquable (avant : un bouton dans un lien, deux arrêts au clavier) */}
              <Button
                asChild
                size="sm"
                className="tap-target shrink-0 rounded-full font-semibold bg-primary text-primary-foreground hover:brightness-110 px-3 sm:px-4"
              >
                <a href="#contact" onClick={() => trackCTAClick(sampleLabel, 'nav', 'sample_nav')}>
                  <span className="lg:hidden whitespace-nowrap">{sampleLabelShort}</span>
                  <span className="hidden lg:inline whitespace-nowrap">{sampleLabel}</span>
                </a>
              </Button>
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
      // cachée : ni visible, ni atteignable au clavier, ni lue par les lecteurs d'écran (22/10/2026)
      {...({ inert: visible ? undefined : '' } as Record<string, unknown>)}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
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
