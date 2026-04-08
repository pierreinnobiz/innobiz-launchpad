import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
// Twist & Mist logo - using text instead of image for now

const HeroVideoAnimation: React.FC = () => {
  const { language } = useLanguage();
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const content = {
    fr: {
      scene1: {
        line1: "Plus la diffusion est simple,",
        line2: "plus elle est utilisée.",
        line3: "Plus elle est utilisée,",
        line4: "plus vos parfums se vendent."
      },
      scene2: {
        candle: {
          title: "Bougie parfumée",
          remarks: ["« Risque d'incendie »", "« Nécessite une surveillance »", "« Usage occasionnel »", "« Pas pratique »"]
        },
        reeds: {
          title: "Bâtonnets",
          remarks: ["« Aucun contrôle »", "« Trop fort, puis plus rien »", "« Expérience passive »", "« Efficacité limitée »"]
        },
        ultrasonic: {
          title: "Diffuseur à eau",
          remarks: ["« Trop d'étapes »", "« Dosage flou »", "« Nettoyage régulier »", "« Finit par ne plus servir »"]
        },
        heat: {
          title: "Diffusion par chaleur",
          remarks: ["« Altère les parfums »", "« Détruit les propriétés »", "« Résultats inconstants »"]
        }
      },
      scene3: {
        title: "Il était temps de réinventer la diffusion."
      },
      scene4: {
        features: [
          "Diffusion directe depuis le flacon",
          "Sans eau",
          "Sans gouttes à doser",
          "Sans chaleur",
          "Sans manipulation"
        ]
      },
      scene5: {
        points: [
          "Usage plus fréquent",
          "Consommation de parfum accélérée",
          "Rachat naturel des flacons",
          "Une vraie innovation pour votre marque"
        ]
      },
      scene6: {
        tagline: "La diffusion essentielle, réinventée.",
        cta: "Découvrir la technologie"
      }
    },
    en: {
      scene1: {
        line1: "The easier the diffusion,",
        line2: "the more it is used.",
        line3: "The more it is used,",
        line4: "the more your fragrances sell."
      },
      scene2: {
        candle: {
          title: "Scented candle",
          remarks: ["\"Fire risk\"", "\"Needs attention\"", "\"Occasional use\"", "\"Not practical\""]
        },
        reeds: {
          title: "Reed diffusers",
          remarks: ["\"No control\"", "\"Too strong, then nothing\"", "\"Passive experience\"", "\"Limited effect\""]
        },
        ultrasonic: {
          title: "Water diffuser",
          remarks: ["\"Too many steps\"", "\"Unclear dosage\"", "\"Regular cleaning\"", "\"Stops being used\""]
        },
        heat: {
          title: "Heat diffusion",
          remarks: ["\"Alters fragrances\"", "\"Destroys properties\"", "\"Inconsistent results\""]
        }
      },
      scene3: {
        title: "It was time for a new generation of diffusion."
      },
      scene4: {
        features: [
          "Direct diffusion from the bottle",
          "No water",
          "No drops to measure",
          "No heat",
          "No handling"
        ]
      },
      scene5: {
        points: [
          "More frequent use",
          "Faster fragrance consumption",
          "Natural bottle repurchase",
          "A real innovation for your brand"
        ]
      },
      scene6: {
        tagline: "Essential diffusion, reinvented.",
        cta: "Discover the technology"
      }
    }
  };

  const c = content[language];

  // Scene timing (total ~30s compressed experience)
  const sceneDurations = [5000, 12000, 4000, 6000, 5000, 0]; // Scene 6 stays forever

  useEffect(() => {
    if (!isPlaying) return;
    
    if (currentScene < sceneDurations.length - 1) {
      const timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
      }, sceneDurations[currentScene]);
      return () => clearTimeout(timer);
    }
  }, [currentScene, isPlaying]);

  const startAnimation = () => {
    setCurrentScene(0);
    setIsPlaying(true);
  };

  const resetAnimation = () => {
    setCurrentScene(0);
    setIsPlaying(false);
  };

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[hsl(222,55%,8%)]">
      {/* Scene 1: Business Hook */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          currentScene === 0 && isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center px-8">
          <p className="text-[hsl(40,30%,92%)] text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed animate-fade-in-up">
            <span className="block mb-2 stagger-1">{c.scene1.line1}</span>
            <span className="block mb-6 stagger-2">{c.scene1.line2}</span>
            <span className="block mb-2 stagger-3">{c.scene1.line3}</span>
            <span className="block font-medium text-[hsl(38,92%,60%)] stagger-4">{c.scene1.line4}</span>
          </p>
        </div>
      </div>

      {/* Scene 2: Current Solutions & Frustrations */}
      <Scene2Frustrations 
        active={currentScene === 1 && isPlaying} 
        content={c.scene2} 
      />

      {/* Scene 3: The Breakthrough */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          currentScene === 2 && isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'hsl(40, 33%, 97%)' }}
      >
        <div className="text-center px-8">
          <h2 className="text-[hsl(222,55%,15%)] text-2xl md:text-4xl lg:text-5xl font-semibold animate-scale-in">
            {c.scene3.title}
          </h2>
          {/* Bottle connecting animation */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <BottleConnectAnimation />
          </div>
        </div>
      </div>

      {/* Scene 4: Technology in Action */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          currentScene === 3 && isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'hsl(40, 33%, 97%)' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8">
          {/* Diffuser with mist */}
          <DiffuserInAction />
          
          {/* Features list */}
          <div className="text-left space-y-3">
            {c.scene4.features.map((feature, i) => (
              <p 
                key={i}
                className="text-[hsl(222,55%,15%)] text-lg md:text-2xl font-medium animate-fade-in-up"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {feature}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Scene 5: Business Impact */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          currentScene === 4 && isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'hsl(40, 33%, 97%)' }}
      >
        <div className="text-center px-8">
          <div className="space-y-4">
            {c.scene5.points.map((point, i) => (
              <p 
                key={i}
                className="text-[hsl(222,55%,15%)] text-xl md:text-3xl font-semibold animate-fade-in-up"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Scene 6: Conclusion & CTA */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          currentScene === 5 && isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'hsl(222, 55%, 8%)' }}
      >
        <div className="text-center px-8">
          {/* Twist & Mist Logo */}
          <div className="mb-8 animate-scale-in">
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-[hsl(38,92%,60%)]">Twist & Mist</span>
              <span className="text-lg md:text-xl text-[hsl(40,30%,70%)] block mt-1">™</span>
            </div>
          </div>
          
          <h2 className="text-[hsl(40,30%,92%)] text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 animate-fade-in-up">
            {c.scene6.tagline}
          </h2>
          
          <button 
            onClick={resetAnimation}
            className="px-8 py-4 bg-[hsl(40,30%,92%)] text-[hsl(222,55%,15%)] rounded-xl font-medium text-lg hover:bg-[hsl(40,30%,85%)] transition-all animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            {c.scene6.cta}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div 
          className="h-full bg-[hsl(38,92%,60%)] transition-all duration-300"
          style={{ width: `${((currentScene + 1) / 6) * 100}%` }}
        />
      </div>

      {/* Scene indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            onClick={() => { setCurrentScene(i); setIsPlaying(true); }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentScene === i ? 'bg-[hsl(38,92%,60%)] w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Replay button (when finished) */}
      {currentScene === 5 && isPlaying && (
        <button
          onClick={startAnimation}
          className="absolute top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-lg text-sm transition-all"
        >
          ↻ Replay
        </button>
      )}
    </div>
  );
};

// Scene 2: Frustrations carousel
const Scene2Frustrations: React.FC<{ active: boolean; content: any }> = ({ active, content }) => {
  const [subScene, setSubScene] = useState(0);
  const products = ['candle', 'reeds', 'ultrasonic', 'heat'];

  useEffect(() => {
    if (!active) {
      setSubScene(0);
      return;
    }

    const timer = setInterval(() => {
      setSubScene(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, [active]);

  const ProductIllustration = ({ type }: { type: string }) => {
    switch(type) {
      case 'candle':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-32 md:h-32">
            <rect x="40" y="50" width="40" height="50" rx="4" fill="hsl(40, 30%, 85%)" />
            <rect x="55" y="30" width="10" height="25" fill="hsl(40, 50%, 90%)" />
            <ellipse cx="60" cy="30" rx="8" ry="12" fill="hsl(38, 92%, 60%)">
              <animate attributeName="ry" values="12;14;12" dur="0.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.8;1" dur="0.3s" repeatCount="indefinite" />
            </ellipse>
          </svg>
        );
      case 'reeds':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-32 md:h-32">
            <rect x="45" y="60" width="30" height="40" rx="4" fill="hsl(40, 30%, 85%)" />
            {[0, 1, 2, 3, 4].map(i => (
              <line 
                key={i} 
                x1={52 + i * 4} 
                y1="60" 
                x2={50 + i * 5} 
                y2="25" 
                stroke="hsl(30, 40%, 60%)" 
                strokeWidth="2"
              />
            ))}
          </svg>
        );
      case 'ultrasonic':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-32 md:h-32">
            <ellipse cx="60" cy="90" rx="35" ry="15" fill="hsl(200, 30%, 80%)" />
            <ellipse cx="60" cy="75" rx="30" ry="12" fill="hsl(200, 40%, 85%)" />
            <path d="M35 75 Q35 40 60 40 Q85 40 85 75" fill="hsl(200, 40%, 90%)" />
            {/* Water drops */}
            <circle cx="50" cy="50" r="3" fill="hsl(200, 70%, 70%)">
              <animate attributeName="cy" values="50;45;50" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="70" cy="55" r="2" fill="hsl(200, 70%, 70%)">
              <animate attributeName="cy" values="55;48;55" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case 'heat':
        return (
          <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-32 md:h-32">
            <rect x="35" y="60" width="50" height="35" rx="6" fill="hsl(30, 30%, 75%)" />
            <circle cx="60" cy="77" r="15" fill="hsl(0, 60%, 50%)">
              <animate attributeName="opacity" values="1;0.6;1" dur="1s" repeatCount="indefinite" />
            </circle>
            {/* Heat waves */}
            {[0, 1, 2].map(i => (
              <path 
                key={i}
                d={`M${50 + i * 10} 50 Q${55 + i * 10} 40 ${50 + i * 10} 30`}
                stroke="hsl(0, 60%, 60%)"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              >
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </path>
            ))}
          </svg>
        );
      default:
        return null;
    }
  };

  const currentProduct = products[subScene];
  const productContent = content[currentProduct];

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
        active ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'hsl(222, 55%, 8%)' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-8">
        {/* Product illustration */}
        <div className="relative">
          <ProductIllustration type={currentProduct} />
          <p className="text-center mt-4 text-[hsl(40,30%,70%)] text-lg font-medium">
            {productContent.title}
          </p>
        </div>

        {/* Floating remarks */}
        <div className="space-y-3">
          {productContent.remarks.map((remark: string, i: number) => (
            <p 
              key={i}
              className="text-[hsl(0,60%,70%)] text-lg md:text-xl italic animate-fade-in-up"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {remark}
            </p>
          ))}
        </div>
      </div>

      {/* Sub-scene indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              subScene === i ? 'bg-[hsl(40,30%,70%)]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Bottle connecting animation
const BottleConnectAnimation: React.FC = () => {
  return (
    <svg viewBox="0 0 300 150" className="w-full max-w-md h-auto">
      {/* Bottle */}
      <g className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <rect x="50" y="20" width="40" height="80" rx="4" fill="hsl(222, 55%, 15%)" />
        <rect x="60" y="10" width="20" height="15" rx="2" fill="hsl(222, 55%, 25%)" />
        <text x="70" y="65" textAnchor="middle" fill="hsl(40, 30%, 92%)" fontSize="8">PARFUM</text>
      </g>

      {/* Arrow */}
      <path 
        d="M100 60 L130 60" 
        stroke="hsl(38, 92%, 60%)" 
        strokeWidth="3" 
        strokeDasharray="5,5"
        className="animate-fade-in"
        style={{ animationDelay: '0.6s' }}
      >
        <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
      </path>

      {/* Module */}
      <g className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
        <rect x="140" y="40" width="50" height="40" rx="8" fill="hsl(40, 30%, 92%)" />
        <circle cx="165" cy="60" r="10" fill="hsl(222, 55%, 15%)" />
        <text x="165" y="90" textAnchor="middle" fill="hsl(222, 55%, 15%)" fontSize="8" fontWeight="500">MODULE</text>
      </g>

      {/* Arrow */}
      <path 
        d="M200 60 L230 60" 
        stroke="hsl(38, 92%, 60%)" 
        strokeWidth="3" 
        strokeDasharray="5,5"
        className="animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
      </path>

      {/* Diffuser */}
      <g className="animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
        <rect x="240" y="30" width="50" height="70" rx="10" fill="hsl(222, 55%, 15%)" />
        <rect x="255" y="45" width="20" height="40" rx="4" fill="hsl(40, 30%, 92%)" />
        <text x="265" y="115" textAnchor="middle" fill="hsl(222, 55%, 15%)" fontSize="8" fontWeight="500">DIFFUSEUR</text>
      </g>
    </svg>
  );
};

// Diffuser with mist animation
const DiffuserInAction: React.FC = () => {
  return (
    <svg viewBox="0 0 150 200" className="w-32 h-48 md:w-40 md:h-56">
      {/* Diffuser base */}
      <rect x="35" y="80" width="80" height="100" rx="12" fill="hsl(222, 55%, 15%)" />
      
      {/* Module area */}
      <rect x="50" y="95" width="50" height="50" rx="6" fill="hsl(40, 30%, 92%)" />
      
      {/* Mist opening */}
      <ellipse cx="75" cy="85" rx="20" ry="5" fill="hsl(222, 45%, 20%)" />
      
      {/* LED indicator */}
      <circle cx="75" cy="165" r="5" fill="hsl(38, 92%, 60%)">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Mist particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = 55 + Math.random() * 40;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random();
        const size = 2 + Math.random() * 3;
        
        return (
          <circle
            key={i}
            cx={x}
            cy="70"
            r={size}
            fill="hsl(200, 60%, 80%)"
            opacity="0.6"
          >
            <animate 
              attributeName="cy" 
              values="70;20;70" 
              dur={`${duration}s`} 
              begin={`${delay}s`}
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="opacity" 
              values="0.6;0;0.6" 
              dur={`${duration}s`} 
              begin={`${delay}s`}
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="cx" 
              values={`${x};${x + (Math.random() - 0.5) * 30};${x}`} 
              dur={`${duration}s`} 
              begin={`${delay}s`}
              repeatCount="indefinite" 
            />
          </circle>
        );
      })}
    </svg>
  );
};

export default HeroVideoAnimation;
