import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackCTAClick, trackEvent } from '@/lib/tracking';
import { createJourneeEngine, type JourneeEngine } from './engine';
import { JOURNEE_TEXTS } from './texts';
import LegacyAnchors from '@/components/LegacyAnchors';
import './journee.css';

// Les images de la séquence sont dans public/journee (104 images par animation, chargées au dernier moment).
const BASE = `${import.meta.env.BASE_URL}journee/`;

/**
 * « Une journée avec Tolia » : l'écran reste en place, bord à bord, et le défilement pilote les messages
 * et l'animation 3D. Remplace les anciennes sections Twist & Mist, Stratégie Rituel et leurs cartes en doublon.
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
      // jusqu'où vont les visiteurs ? un événement par écran de la séquence (A à I), une seule fois par visite
      (id) => trackEvent('journee_scene', { scene: id }),
    );
    engineRef.current = engine;
    builtLang.current = langRef.current;
    // permet aux contrôles automatiques de se placer sur une étape (aucun effet pour les visiteurs)
    (window as unknown as { __journee?: JourneeEngine }).__journee = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // changement de langue : on reconstruit les écrans sans recharger la page
  useEffect(() => {
    if (engineRef.current && builtLang.current !== language) {
      builtLang.current = language;
      engineRef.current.rebuild();
    }
  }, [language]);

  return (
    <section id="journee" ref={rootRef} className="journee bg-background">
      <LegacyAnchors ids={['twist-and-mist', 'ritual-strategy']} />
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-10 text-center md:pt-24 md:pb-14">
        <span className="mb-4 block text-sm font-semibold uppercase tracking-wide text-primary">{tx['day.kicker']}</span>
        <h2 className="heading-section text-foreground" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {tx['day.h2']}
        </h2>
      </div>

      <div className="story" aria-label={tx['day.aria']}>
        <div className="pin">
          <div className="stage" />
          <a className="jr-skip" href="#technologie">{tx['day.skip']}</a>
          <nav className="timeline" aria-label={tx['st.tl.aria']}>
            <div className="tl">
              <span className="rail" aria-hidden="true" />
              <span className="fill" aria-hidden="true" />
              <span className="cursor" aria-hidden="true" />
              <ol className="stops" />
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default JourneeSection;
