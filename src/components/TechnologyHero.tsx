import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, FlaskConical, Cpu, Cog, Code, Shield, ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// Animated diffusion illustration
const DiffusionAnimation: React.FC = () => (
  <svg viewBox="0 0 400 200" className="w-full max-w-xl mx-auto" fill="none">
    <defs>
      <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--primary))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--primary)/0.8)]" />
      </linearGradient>
      <linearGradient id="moduleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--highlight))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--highlight)/0.8)]" />
      </linearGradient>
      <radialGradient id="mistGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" className="[stop-color:hsl(var(--highlight))]" stopOpacity="0.4" />
        <stop offset="100%" className="[stop-color:hsl(var(--highlight))]" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Step 1: Bottle */}
    <g className="animate-fade-in" style={{ animationDelay: '0s' }}>
      <rect x="30" y="40" width="60" height="120" rx="8" fill="url(#bottleGrad)" className="stroke-primary" strokeWidth="2" />
      <rect x="42" y="25" width="36" height="20" rx="4" className="fill-primary" />
      <rect x="38" y="60" width="44" height="80" rx="4" className="fill-highlight/30" />
      <text x="60" y="185" textAnchor="middle" className="fill-muted-foreground text-xs font-medium">FLACON</text>
    </g>

    {/* Arrow 1 */}
    <g className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <path d="M110 100 L150 100" className="stroke-highlight" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowHead)" />
      <polygon points="155,100 145,95 145,105" className="fill-highlight" />
    </g>

    {/* Step 2: Module */}
    <g className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <rect x="170" y="60" width="80" height="80" rx="12" fill="url(#moduleGrad)" className="stroke-highlight" strokeWidth="2" />
      <circle cx="210" cy="100" r="25" className="fill-background/50 stroke-background" strokeWidth="2" />
      <circle cx="210" cy="100" r="15" className="fill-primary/20">
        <animate attributeName="r" values="12;18;12" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="210" y="165" textAnchor="middle" className="fill-muted-foreground text-xs font-medium">MODULE</text>
    </g>

    {/* Arrow 2 */}
    <g className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
      <path d="M270 100 L310 100" className="stroke-highlight" strokeWidth="3" strokeLinecap="round" />
      <polygon points="315,100 305,95 305,105" className="fill-highlight" />
    </g>

    {/* Step 3: Diffusion cloud */}
    <g className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
      <ellipse cx="360" cy="100" rx="35" ry="35" fill="url(#mistGlow)">
        <animate attributeName="rx" values="30;40;30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="ry" values="30;40;30" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle
          key={i}
          cx={360 + Math.cos((angle * Math.PI) / 180) * 20}
          cy={100 + Math.sin((angle * Math.PI) / 180) * 20}
          r="4"
          className="fill-highlight"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur={`${1.5 + i * 0.1}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <text x="360" y="165" textAnchor="middle" className="fill-muted-foreground text-xs font-medium">DIFFUSION</text>
    </g>
  </svg>
);

// Credibility badges
const CredibilityBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
    <span className="text-highlight">{icon}</span>
    <span className="text-sm font-medium text-foreground/80">{label}</span>
  </div>
);

const TechnologyHero: React.FC = () => {
  const { language } = useLanguage();
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase((prev) => (prev < 2 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const content = {
    fr: {
      phase1: {
        micro: "Diffusion directe. Sans préparation. Sans compromis.",
      },
      phase2: {
        h1: "Un nouveau mode de diffusion, conçu pour supprimer tous les freins à l'usage",
        subtitle: "Vissez le flacon, appuyez, diffusez. C'est tout.",
        explanation: "Le liquide est transformé en micro-gouttelettes par un disque vibrant haute précision, sans chaleur ni eau.",
      },
      phase3: {
        before: "Avant",
        after: "Après",
        beforeItems: ["Préparation complexe", "Recharges fréquentes", "Nettoyage régulier", "Diffusion inconstante"],
        afterItems: ["Utilisation immédiate", "Changement en 3 secondes", "Zéro entretien", "Diffusion maîtrisée"],
        message: "Nous n'avons pas inventé un diffuseur. Nous avons inventé un nouvel usage.",
        impact: "Impact : récurrence x3, consommation produit +40%",
      },
      badges: {
        rd: "26 mois de R&D",
        exclusive: "Technologie exclusive",
        liquids: "Tous liquides compatibles",
        industrial: "Production industrielle",
      },
      cta: "Découvrir comment l'intégrer à ma marque",
      ctaMicro: "Une démonstration claire vaut mieux qu'un long discours.",
    },
    en: {
      phase1: {
        micro: "Direct diffusion. No preparation. No compromise.",
      },
      phase2: {
        h1: "A new diffusion method, designed to remove all barriers to use",
        subtitle: "Screw in the bottle, press, diffuse. That's it.",
        explanation: "The liquid is transformed into micro-droplets by a high-precision vibrating disc, without heat or water.",
      },
      phase3: {
        before: "Before",
        after: "After",
        beforeItems: ["Complex preparation", "Frequent refills", "Regular cleaning", "Inconsistent diffusion"],
        afterItems: ["Immediate use", "3-second change", "Zero maintenance", "Controlled diffusion"],
        message: "We didn't invent a diffuser. We invented a new usage.",
        impact: "Impact: x3 recurrence, +40% product consumption",
      },
      badges: {
        rd: "26 months R&D",
        exclusive: "Exclusive technology",
        liquids: "All liquids compatible",
        industrial: "Industrial production",
      },
      cta: "Discover how to integrate it into my brand",
      ctaMicro: "A clear demonstration is worth a thousand words.",
    },
  };

  const t = content[language];

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* PHASE 1: Visual Hook - Video placeholder */}
      <div className="relative h-[70vh] bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        {/* Video placeholder with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-highlight/5">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated bottle and mist visualization */}
            <div className="relative">
              <div className="w-32 h-48 bg-gradient-to-b from-primary to-primary/80 rounded-xl transform rotate-180 shadow-xl">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary rounded-b-lg" />
              </div>
              {/* Mist cloud */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-highlight/40"
                    style={{
                      left: `${Math.cos((i * 30 * Math.PI) / 180) * 40}px`,
                      top: `${Math.sin((i * 30 * Math.PI) / 180) * 40 + 20}px`,
                      animation: `float ${2 + i * 0.1}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
                <div className="w-24 h-24 rounded-full bg-highlight/20 blur-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Micro-text overlay */}
        <div className="absolute bottom-12 left-0 right-0 text-center">
          <p className="text-lg md:text-xl text-foreground/60 font-light tracking-wide">
            {t.phase1.micro}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>

      {/* PHASE 2: Revelation */}
      <div className="py-20 bg-background">
        <div className="section-container">
          <ScrollReveal>
            <h1 className="heading-display text-center mb-6 max-w-4xl mx-auto">
              {t.phase2.h1}
            </h1>
            <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t.phase2.subtitle}
            </p>
          </ScrollReveal>

          {/* Animation: Bottle → Module → Diffusion */}
          <ScrollReveal delay={200}>
            <DiffusionAnimation />
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
              {t.phase2.explanation}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* PHASE 3: Business Projection */}
      <div className="py-20 bg-secondary/30">
        <div className="section-container">
          {/* Before / After */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {/* Before */}
              <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
                <h3 className="text-lg font-semibold text-destructive mb-4">{t.phase3.before}</h3>
                <ul className="space-y-3">
                  {t.phase3.beforeItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/70">
                      <span className="w-2 h-2 rounded-full bg-destructive/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="p-8 rounded-2xl bg-highlight/10 border border-highlight/30">
                <h3 className="text-lg font-semibold text-highlight mb-4">{t.phase3.after}</h3>
                <ul className="space-y-3">
                  {t.phase3.afterItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/90">
                      <span className="w-2 h-2 rounded-full bg-highlight" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Key message */}
          <ScrollReveal delay={200}>
            <blockquote className="text-2xl md:text-3xl font-medium text-center text-primary mb-4 max-w-3xl mx-auto">
              "{t.phase3.message}"
            </blockquote>
            <p className="text-center text-highlight font-semibold mb-12">
              {t.phase3.impact}
            </p>
          </ScrollReveal>

          {/* Credibility badges */}
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <CredibilityBadge icon={<FlaskConical className="w-4 h-4" />} label={t.badges.rd} />
              <CredibilityBadge icon={<Shield className="w-4 h-4" />} label={t.badges.exclusive} />
              <CredibilityBadge icon={<FlaskConical className="w-4 h-4" />} label={t.badges.liquids} />
              <CredibilityBadge icon={<Cog className="w-4 h-4" />} label={t.badges.industrial} />
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={400}>
            <div className="text-center">
              <Link to="/contact?type=demo">
                <Button size="lg" className="px-8 py-6 text-lg">
                  {t.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                {t.ctaMicro}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TechnologyHero;
