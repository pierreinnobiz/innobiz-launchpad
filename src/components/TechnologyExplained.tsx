import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  ArrowRight, 
  Sparkles, 
  Droplets, 
  Disc3, 
  FlaskConical, 
  Layers, 
  Shield, 
  CheckCircle2, 
  TrendingUp,
  Zap,
  RefreshCw,
  Clock,
  Package
} from 'lucide-react';

// Vibrating disc illustration
const VibratingDiscIllustration: React.FC = () => (
  <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto" fill="none">
    <defs>
      <linearGradient id="discGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--highlight))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--highlight)/0.7)]" />
      </linearGradient>
      <radialGradient id="dropletGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.5" />
        <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Liquid drop entering */}
    <ellipse cx="150" cy="40" rx="20" ry="8" className="fill-primary/40">
      <animate attributeName="cy" values="40;80;40" dur="2s" repeatCount="indefinite" />
      <animate attributeName="rx" values="20;5;20" dur="2s" repeatCount="indefinite" />
      <animate attributeName="ry" values="8;15;8" dur="2s" repeatCount="indefinite" />
    </ellipse>

    {/* Vibrating disc */}
    <ellipse cx="150" cy="120" rx="60" ry="15" fill="url(#discGrad)" className="stroke-highlight" strokeWidth="2">
      <animate attributeName="ry" values="15;12;15" dur="0.1s" repeatCount="indefinite" />
    </ellipse>
    
    {/* Vibration lines */}
    {[-30, 0, 30].map((offset, i) => (
      <g key={i}>
        <line x1={120 + offset} y1="110" x2={120 + offset} y2="100" className="stroke-highlight/50" strokeWidth="2">
          <animate attributeName="y1" values="110;105;110" dur="0.15s" repeatCount="indefinite" />
        </line>
        <line x1={180 + offset} y1="110" x2={180 + offset} y2="100" className="stroke-highlight/50" strokeWidth="2">
          <animate attributeName="y1" values="110;105;110" dur="0.15s" repeatCount="indefinite" />
        </line>
      </g>
    ))}

    {/* Micro-droplets dispersing */}
    {[...Array(16)].map((_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      const distance = 40 + (i % 3) * 15;
      return (
        <circle
          key={i}
          cx={150 + Math.cos(angle) * distance}
          cy={120 - Math.sin(angle) * distance - 20}
          r="3"
          className="fill-primary"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur={`${1 + i * 0.1}s`}
            repeatCount="indefinite"
            begin={`${i * 0.1}s`}
          />
          <animate
            attributeName="cy"
            values={`${120 - Math.sin(angle) * distance - 20};${80 - Math.sin(angle) * distance - 40};${40 - Math.sin(angle) * distance - 60}`}
            dur={`${1 + i * 0.1}s`}
            repeatCount="indefinite"
            begin={`${i * 0.1}s`}
          />
        </circle>
      );
    })}

    {/* Labels */}
    <text x="50" y="50" className="fill-muted-foreground text-xs">Liquide</text>
    <text x="220" y="120" className="fill-muted-foreground text-xs">Disque vibrant</text>
    <text x="150" y="180" textAnchor="middle" className="fill-muted-foreground text-xs">Micro-gouttelettes</text>
  </svg>
);

// Section card component
const ExplainedSection: React.FC<{
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
  children?: React.ReactNode;
}> = ({ number, title, description, icon, highlight, children }) => (
  <div className={`p-8 rounded-2xl ${highlight ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'}`}>
    <div className="flex items-start gap-4 mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${highlight ? 'bg-primary-foreground/10' : 'bg-highlight/10'}`}>
        <span className={highlight ? 'text-primary-foreground' : 'text-highlight'}>{icon}</span>
      </div>
      <div>
        <span className={`text-sm font-medium ${highlight ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
          {number}
        </span>
        <h3 className={`text-xl font-semibold ${highlight ? '' : 'text-foreground'}`}>{title}</h3>
      </div>
    </div>
    <p className={`leading-relaxed ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
      {description}
    </p>
    {children}
  </div>
);

// Benefit item component
const BenefitItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
    <div className="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center flex-shrink-0">
      <span className="text-highlight">{icon}</span>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const TechnologyExplained: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      sectionTitle: "La technologie expliquée",
      sectionSubtitle: "Comprendre en quelques minutes ce qui a demandé 26 mois de recherche",
      sections: [
        {
          number: "01",
          title: "Simplification radicale de l'usage",
          description: "Fini les préparations, les dilutions, les recharges d'eau. Le flacon se visse directement. L'utilisateur appuie, le parfum se diffuse. Rien de plus.",
          icon: <Sparkles className="w-6 h-6" />,
        },
        {
          number: "02",
          title: "Diffusion directe depuis le flacon",
          description: "Le principe fondamental : le flacon de la marque cliente est vissé tête en bas. Le liquide descend par gravité jusqu'au cœur du module de diffusion. Aucun transfert, aucune manipulation.",
          icon: <Droplets className="w-6 h-6" />,
        },
        {
          number: "03",
          title: "Transformation en micro-gouttelettes",
          description: "Un disque vibrant haute fréquence transforme le liquide en un nuage de micro-gouttelettes parfaitement calibrées. Pas de chaleur qui dégrade les molécules. Pas d'eau qui dilue le produit.",
          icon: <Disc3 className="w-6 h-6" />,
          hasIllustration: true,
        },
        {
          number: "04",
          title: "26 mois de R&D intensive",
          description: "Des centaines de tests, des dizaines de prototypes. Notre équipe a exploré le spectre complet des liquides : viscosités, compositions chimiques, températures. Le résultat : une technologie qui fonctionne avec tous les produits liquides du marché.",
          icon: <FlaskConical className="w-6 h-6" />,
        },
        {
          number: "05",
          title: "Expertise transverse",
          description: "La convergence de quatre domaines d'expertise : fluidique, mécanique de précision, électronique embarquée, logiciel de contrôle. C'est cette synergie qui rend la technologie unique et difficile à reproduire.",
          icon: <Layers className="w-6 h-6" />,
          highlight: true,
        },
        {
          number: "06",
          title: "Protection et exclusivité",
          description: "Technologie propriétaire. Partenariats industriels exclusifs. Cette technologie n'est accessible qu'aux marques sélectionnées, dans le cadre d'un co-développement avec nos équipes.",
          icon: <Shield className="w-6 h-6" />,
        },
      ],
      userBenefits: {
        title: "Bénéfices pour l'utilisateur final",
        items: [
          { icon: <Zap className="w-5 h-5" />, title: "Utilisation instantanée", description: "Aucune préparation, aucun temps d'attente" },
          { icon: <RefreshCw className="w-5 h-5" />, title: "Changement en 3 secondes", description: "Dévisser, revisser, c'est fait" },
          { icon: <Clock className="w-5 h-5" />, title: "Zéro entretien", description: "Pas de nettoyage, pas de maintenance" },
          { icon: <CheckCircle2 className="w-5 h-5" />, title: "Diffusion maîtrisée", description: "Intensité constante, couverture homogène" },
        ],
      },
      brandBenefits: {
        title: "Impact business pour les marques",
        items: [
          { icon: <TrendingUp className="w-5 h-5" />, title: "Récurrence x3", description: "L'usage quotidien devient naturel" },
          { icon: <Package className="w-5 h-5" />, title: "Consommation +40%", description: "Plus d'usage = plus de recharges" },
          { icon: <Sparkles className="w-5 h-5" />, title: "Différenciation radicale", description: "Une innovation visible et mémorable" },
          { icon: <Shield className="w-5 h-5" />, title: "Exclusivité garantie", description: "Technologie protégée et réservée" },
        ],
      },
      cta: "Demander une démonstration",
      ctaMicro: "Voir la technologie en action dans vos locaux",
    },
    en: {
      sectionTitle: "Technology Explained",
      sectionSubtitle: "Understand in minutes what took 26 months of research",
      sections: [
        {
          number: "01",
          title: "Radical usage simplification",
          description: "No more preparations, dilutions, or water refills. The bottle screws directly in. The user presses, the fragrance diffuses. Nothing more.",
          icon: <Sparkles className="w-6 h-6" />,
        },
        {
          number: "02",
          title: "Direct diffusion from the bottle",
          description: "The fundamental principle: the client brand's bottle is screwed upside down. The liquid descends by gravity to the diffusion module core. No transfer, no handling.",
          icon: <Droplets className="w-6 h-6" />,
        },
        {
          number: "03",
          title: "Transformation into micro-droplets",
          description: "A high-frequency vibrating disc transforms the liquid into a cloud of perfectly calibrated micro-droplets. No heat degrading molecules. No water diluting the product.",
          icon: <Disc3 className="w-6 h-6" />,
          hasIllustration: true,
        },
        {
          number: "04",
          title: "26 months of intensive R&D",
          description: "Hundreds of tests, dozens of prototypes. Our team explored the full spectrum of liquids: viscosities, chemical compositions, temperatures. The result: technology that works with all liquid products on the market.",
          icon: <FlaskConical className="w-6 h-6" />,
        },
        {
          number: "05",
          title: "Cross-functional expertise",
          description: "The convergence of four areas of expertise: fluidics, precision mechanics, embedded electronics, control software. This synergy makes the technology unique and difficult to replicate.",
          icon: <Layers className="w-6 h-6" />,
          highlight: true,
        },
        {
          number: "06",
          title: "Protection and exclusivity",
          description: "Proprietary technology. Exclusive industrial partnerships. This technology is only accessible to selected brands, through co-development with our teams.",
          icon: <Shield className="w-6 h-6" />,
        },
      ],
      userBenefits: {
        title: "End-user benefits",
        items: [
          { icon: <Zap className="w-5 h-5" />, title: "Instant use", description: "No preparation, no waiting time" },
          { icon: <RefreshCw className="w-5 h-5" />, title: "3-second change", description: "Unscrew, screw back, done" },
          { icon: <Clock className="w-5 h-5" />, title: "Zero maintenance", description: "No cleaning, no upkeep" },
          { icon: <CheckCircle2 className="w-5 h-5" />, title: "Controlled diffusion", description: "Constant intensity, even coverage" },
        ],
      },
      brandBenefits: {
        title: "Business impact for brands",
        items: [
          { icon: <TrendingUp className="w-5 h-5" />, title: "x3 recurrence", description: "Daily use becomes natural" },
          { icon: <Package className="w-5 h-5" />, title: "+40% consumption", description: "More usage = more refills" },
          { icon: <Sparkles className="w-5 h-5" />, title: "Radical differentiation", description: "A visible and memorable innovation" },
          { icon: <Shield className="w-5 h-5" />, title: "Guaranteed exclusivity", description: "Protected and reserved technology" },
        ],
      },
      cta: "Request a demonstration",
      ctaMicro: "See the technology in action at your premises",
    },
  };

  const t = content[language];

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-section mb-4">{t.sectionTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.sectionSubtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Main sections grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {t.sections.map((section, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <ExplainedSection
                number={section.number}
                title={section.title}
                description={section.description}
                icon={section.icon}
                highlight={section.highlight}
              >
                {section.hasIllustration && (
                  <div className="mt-6">
                    <VibratingDiscIllustration />
                  </div>
                )}
              </ExplainedSection>
            </ScrollReveal>
          ))}
        </div>

        {/* Benefits sections */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* User benefits */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-highlight" />
                {t.userBenefits.title}
              </h3>
              <div className="space-y-4">
                {t.userBenefits.items.map((item, i) => (
                  <BenefitItem key={i} {...item} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Brand benefits */}
          <ScrollReveal delay={200}>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-highlight" />
                {t.brandBenefits.title}
              </h3>
              <div className="space-y-4">
                {t.brandBenefits.items.map((item, i) => (
                  <BenefitItem key={i} {...item} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Final CTA */}
        <ScrollReveal>
          <div className="text-center py-12 px-8 rounded-3xl bg-gradient-to-br from-primary to-primary/90">
            <h3 className="text-2xl font-semibold text-primary-foreground mb-4">
              {language === 'fr' ? 'Prêt à découvrir la technologie ?' : 'Ready to discover the technology?'}
            </h3>
            <Link to="/contact?type=demo">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg"
              >
                {t.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-primary-foreground/60 mt-4">
              {t.ctaMicro}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TechnologyExplained;
