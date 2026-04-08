import React from 'react';

const DiffusionProcessIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg 
        viewBox="0 0 800 200" 
        className="w-full h-auto"
        aria-label="Diffusion process illustration"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(222, 55%, 25%)" />
            <stop offset="100%" stopColor="hsl(222, 55%, 15%)" />
          </linearGradient>
          
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(38, 92%, 55%)" />
            <stop offset="100%" stopColor="hsl(38, 92%, 42%)" />
          </linearGradient>
          
          <linearGradient id="moduleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(222, 55%, 20%)" />
            <stop offset="100%" stopColor="hsl(222, 55%, 12%)" />
          </linearGradient>
          
          <linearGradient id="mistGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(38, 92%, 60%)" stopOpacity="0.1" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Step 1: Bottle (upside down) */}
        <g transform="translate(80, 30)">
          {/* Bottle body - upside down */}
          <rect 
            x="20" y="0" 
            width="60" height="100" 
            rx="8" 
            fill="url(#bottleGradient)"
            className="drop-shadow-lg"
          />
          
          {/* Bottle neck (at bottom since upside down) */}
          <rect 
            x="35" y="100" 
            width="30" height="25" 
            fill="url(#bottleGradient)"
          />
          
          {/* Bottle cap/thread area */}
          <rect 
            x="32" y="125" 
            width="36" height="15" 
            rx="3"
            fill="hsl(222, 55%, 10%)"
          />
          
          {/* Liquid inside - animated level */}
          <rect 
            x="24" y="8" 
            width="52" height="70" 
            rx="4"
            fill="url(#liquidGradient)"
            opacity="0.9"
          >
            <animate 
              attributeName="height" 
              values="70;65;70" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </rect>
          
          {/* Liquid drops falling - animation */}
          <circle cx="50" cy="140" r="3" fill="hsl(38, 92%, 50%)">
            <animate 
              attributeName="cy" 
              values="130;155;130" 
              dur="1.5s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="1;0;1" 
              dur="1.5s" 
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Label */}
          <text 
            x="50" y="180" 
            textAnchor="middle" 
            className="fill-foreground text-sm font-medium"
            fontSize="14"
          >
            Flacon
          </text>
        </g>

        {/* Arrow 1 */}
        <g transform="translate(200, 90)">
          <path 
            d="M0,20 L60,20" 
            stroke="hsl(222, 55%, 15%)" 
            strokeWidth="3" 
            strokeDasharray="8,4"
            fill="none"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              values="0;-24" 
              dur="1s" 
              repeatCount="indefinite"
            />
          </path>
          <polygon 
            points="60,10 80,20 60,30" 
            fill="hsl(222, 55%, 15%)"
          />
        </g>

        {/* Step 2: Module */}
        <g transform="translate(310, 50)">
          {/* Module base */}
          <rect 
            x="0" y="40" 
            width="120" height="60" 
            rx="12" 
            fill="url(#moduleGradient)"
            className="drop-shadow-lg"
          />
          
          {/* Connection point (where bottle attaches) */}
          <rect 
            x="45" y="20" 
            width="30" height="25" 
            rx="4"
            fill="hsl(222, 55%, 18%)"
          />
          
          {/* Ceramic disc visualization */}
          <ellipse 
            cx="60" cy="70" 
            rx="35" ry="8" 
            fill="hsl(40, 30%, 85%)"
            opacity="0.8"
          >
            <animate 
              attributeName="opacity" 
              values="0.6;0.9;0.6" 
              dur="0.1s" 
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Vibration waves from disc */}
          <ellipse 
            cx="60" cy="70" 
            rx="40" ry="10" 
            fill="none"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth="1"
            opacity="0.5"
          >
            <animate 
              attributeName="rx" 
              values="35;50;35" 
              dur="0.5s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0.5;0;0.5" 
              dur="0.5s" 
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Control button */}
          <circle 
            cx="100" cy="70" 
            r="8" 
            fill="hsl(142, 76%, 45%)"
            filter="url(#softGlow)"
          >
            <animate 
              attributeName="fill" 
              values="hsl(142, 76%, 45%);hsl(142, 76%, 55%);hsl(142, 76%, 45%)" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Label */}
          <text 
            x="60" y="130" 
            textAnchor="middle" 
            className="fill-foreground text-sm font-medium"
            fontSize="14"
          >
            Module
          </text>
        </g>

        {/* Arrow 2 */}
        <g transform="translate(460, 90)">
          <path 
            d="M0,20 L60,20" 
            stroke="hsl(222, 55%, 15%)" 
            strokeWidth="3" 
            strokeDasharray="8,4"
            fill="none"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              values="0;-24" 
              dur="1s" 
              repeatCount="indefinite"
            />
          </path>
          <polygon 
            points="60,10 80,20 60,30" 
            fill="hsl(222, 55%, 15%)"
          />
        </g>

        {/* Step 3: Micro-droplets cloud */}
        <g transform="translate(560, 20)">
          {/* Background glow */}
          <ellipse 
            cx="80" cy="80" 
            rx="70" ry="60" 
            fill="hsl(38, 92%, 50%)"
            opacity="0.1"
            filter="url(#glow)"
          >
            <animate 
              attributeName="rx" 
              values="65;75;65" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Mist cloud shape */}
          <ellipse 
            cx="80" cy="80" 
            rx="60" ry="50" 
            fill="url(#mistGradient)"
            opacity="0.4"
          >
            <animate 
              attributeName="ry" 
              values="45;55;45" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </ellipse>
          
          {/* Micro-droplets - multiple animated particles */}
          {[
            { cx: 50, cy: 60, r: 3, delay: 0 },
            { cx: 80, cy: 45, r: 4, delay: 0.3 },
            { cx: 110, cy: 55, r: 3, delay: 0.6 },
            { cx: 65, cy: 80, r: 2.5, delay: 0.9 },
            { cx: 95, cy: 75, r: 3.5, delay: 0.2 },
            { cx: 75, cy: 100, r: 2, delay: 0.5 },
            { cx: 100, cy: 95, r: 2.5, delay: 0.8 },
            { cx: 55, cy: 95, r: 2, delay: 0.4 },
            { cx: 85, cy: 65, r: 3, delay: 0.7 },
            { cx: 70, cy: 50, r: 2.5, delay: 0.1 },
            { cx: 105, cy: 85, r: 2, delay: 0.35 },
            { cx: 60, cy: 70, r: 2.5, delay: 0.55 },
          ].map((droplet, i) => (
            <circle 
              key={i}
              cx={droplet.cx} 
              cy={droplet.cy} 
              r={droplet.r} 
              fill="hsl(38, 92%, 55%)"
              opacity="0.8"
            >
              <animate 
                attributeName="cy" 
                values={`${droplet.cy};${droplet.cy - 10};${droplet.cy}`}
                dur="2s" 
                begin={`${droplet.delay}s`}
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                values="0.8;0.4;0.8" 
                dur="2s" 
                begin={`${droplet.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Rising particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle 
              key={`rising-${i}`}
              cx={60 + i * 12} 
              cy={120} 
              r={1.5 + Math.random()} 
              fill="hsl(38, 92%, 60%)"
              opacity="0"
            >
              <animate 
                attributeName="cy" 
                values="120;40;120" 
                dur={`${2 + i * 0.3}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                values="0;0.7;0" 
                dur={`${2 + i * 0.3}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Label */}
          <text 
            x="80" y="160" 
            textAnchor="middle" 
            className="fill-foreground text-sm font-medium"
            fontSize="14"
          >
            Micro-gouttelettes
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DiffusionProcessIllustration;
