import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackCTAClick, trackEvent } from '@/lib/tracking';
import { createJourneeEngine, type JourneeEngine } from './engine';
import { JOURNEE_TEXTS } from './texts';
import LegacyAnchors from '@/components/LegacyAnchors';
import './journee.css';

// Les images de la visite sont dans public/journee (les images d'animation sont chargées au dernier moment).
const BASE = `${import.meta.env.BASE_URL}journee/`;

/**
 * « Une journée avec Tolia » : visite guidée en cinq pages (07:30, 18:30, 22:00, Votre gamme, Bilan).
 * Sur ordinateur, l'écran reste en place et chaque page se déroule en entier (texte, cadres blancs fléchés, animation) ;
 * on passe à la suivante avec le bouton « Suivant » ou en faisant défiler. Sur téléphone, les pages se suivent dans la page.
 * Tout le contenu est construit par engine.ts (selon la langue et la forme de l'écran).
 */
const JourneeSection: React.FC = () => {
  const { language } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const engineRef = useRef<JourneeEngine | null>(null);
  const langRef = useRef(language);
  const builtLang = useRef(language);
  langRef.current = language;
  const tx = JOURNEE_TEXTS[language] ?? JOURNEE_TEXTS.fr;

  useEffect(() => {
    if (!rootRef.current) return undefined;
    const engine = createJourneeEngine(
      rootRef.current,
      () => langRef.current,
      BASE,
      (label) => trackCTAClick(label, 'journee', 'sample_journee'),
      // jusqu'où vont les visiteurs ? un événement par page de la visite, une seule fois par visite
      (id) => trackEvent('journee_scene', { scene: id }),
    );
    engineRef.current = engine;
    builtLang.current = langRef.current;
    // permet aux contrôles automatiques de se placer sur une page (aucun effet pour les visiteurs)
    (window as unknown as { __journee?: JourneeEngine }).__journee = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // changement de langue : on reconstruit les pages sans recharger le site
  useEffect(() => {
    if (engineRef.current && builtLang.current !== language) {
      builtLang.current = language;
      engineRef.current.rebuild();
    }
  }, [language]);

  return (
    <section id="journee" ref={rootRef} className="journee bg-background" aria-label={tx.ui.aria}>
      <LegacyAnchors ids={['twist-and-mist', 'ritual-strategy']} />
      <div className="jr-head mx-auto max-w-4xl px-6 pt-16 pb-10 text-center md:pt-24 md:pb-12">
        <span className="mb-4 block text-sm font-semibold uppercase tracking-wide text-primary">{tx.head.kicker}</span>
        <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {tx.head.h2}
        </h2>
        {/* le mode d'emploi dépend de la présentation choisie par engine.ts (écran fixe avec boutons, ou pages qui se suivent) */}
        <p className="jr-how-pin mx-auto mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed">{tx.head.how}</p>
        <p className="jr-how-flow mx-auto mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed">{tx.head.howFlow}</p>
      </div>

      <div className="story" />
    </section>
  );
};

export default JourneeSection;
