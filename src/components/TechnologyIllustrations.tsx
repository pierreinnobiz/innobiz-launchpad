import React from 'react';

// Candle SVG Illustration - Dark mode optimized
export const CandleIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="candleGlow" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#FFA500" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#FF6B35" />
        <stop offset="50%" stopColor="#FFA500" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
      <linearGradient id="waxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--secondary))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--muted))]" />
      </linearGradient>
    </defs>
    
    {/* Glow effect */}
    <ellipse cx="100" cy="50" rx="60" ry="40" fill="url(#candleGlow)">
      <animate attributeName="rx" values="55;65;55" dur="2s" repeatCount="indefinite" />
      <animate attributeName="ry" values="35;45;35" dur="2s" repeatCount="indefinite" />
    </ellipse>
    
    {/* Candle jar */}
    <rect x="60" y="80" width="80" height="70" rx="8" className="fill-secondary stroke-border" strokeWidth="2" />
    <rect x="65" y="85" width="70" height="60" rx="4" fill="url(#waxGradient)" />
    
    {/* Wick */}
    <line x1="100" y1="85" x2="100" y2="55" className="stroke-foreground" strokeWidth="2" strokeLinecap="round" />
    
    {/* Flame */}
    <path d="M100 55 Q95 40 100 25 Q105 40 100 55" fill="url(#flameGradient)">
      <animate attributeName="d" 
        values="M100 55 Q95 40 100 25 Q105 40 100 55;M100 55 Q92 42 100 28 Q108 42 100 55;M100 55 Q95 40 100 25 Q105 40 100 55" 
        dur="0.5s" repeatCount="indefinite" />
    </path>
    <ellipse cx="100" cy="45" rx="4" ry="8" fill="#FFFACD" opacity="0.8">
      <animate attributeName="ry" values="8;10;8" dur="0.3s" repeatCount="indefinite" />
    </ellipse>
    
    {/* Danger icon */}
    <circle cx="160" cy="40" r="18" className="fill-destructive/10 stroke-destructive" strokeWidth="2" />
    <path d="M160 32 L160 42" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" />
    <circle cx="160" cy="48" r="2" className="fill-destructive" />
    
    {/* Smoke particles */}
    <circle cx="95" cy="18" r="3" className="fill-muted-foreground" opacity="0.4">
      <animate attributeName="cy" values="18;5;-10" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0.2;0" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="105" cy="15" r="2" className="fill-muted-foreground" opacity="0.3">
      <animate attributeName="cy" values="15;0;-15" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.1;0" dur="4s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// Reed Diffuser SVG Illustration - Dark mode optimized
export const ReedIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bottleGradientReed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--secondary))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--muted))]" />
      </linearGradient>
      <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    
    {/* Bottle */}
    <path d="M85 60 L85 40 L75 35 L75 25 L125 25 L125 35 L115 40 L115 60 L130 70 L130 145 Q130 150 125 150 L75 150 Q70 150 70 145 L70 70 Z" 
      fill="url(#bottleGradientReed)" className="stroke-border" strokeWidth="2" />
    
    {/* Liquid level - decreasing */}
    <rect x="72" y="100" width="56" height="48" rx="2" fill="url(#liquidGradient)" opacity="0.8">
      <animate attributeName="height" values="48;30;20" dur="4s" repeatCount="indefinite" />
      <animate attributeName="y" values="100;118;128" dur="4s" repeatCount="indefinite" />
    </rect>
    
    {/* Reed sticks */}
    {[75, 85, 95, 105, 115, 125].map((x, i) => (
      <line 
        key={i}
        x1={x} y1="60" 
        x2={x + (i % 2 === 0 ? -10 : 10)} y2="5" 
        stroke="#8B7355" strokeWidth="3" strokeLinecap="round"
        className="dark:stroke-amber-700"
      />
    ))}
    
    {/* Very weak scent particles */}
    <circle cx="70" cy="30" r="2" fill="#F59E0B" opacity="0.2">
      <animate attributeName="cx" values="70;60;50" dur="5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.2;0.1;0" dur="5s" repeatCount="indefinite" />
    </circle>
    
    {/* Clock showing time passing */}
    <circle cx="160" cy="80" r="20" className="fill-amber-100 dark:fill-amber-900/30 stroke-amber-500" strokeWidth="2" />
    <line x1="160" y1="80" x2="160" y2="68" className="stroke-amber-800 dark:stroke-amber-400" strokeWidth="2" strokeLinecap="round" />
    <line x1="160" y1="80" x2="170" y2="85" className="stroke-amber-800 dark:stroke-amber-400" strokeWidth="2" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 160 80" to="360 160 80" dur="10s" repeatCount="indefinite" />
    </line>
    
    {/* Decreasing arrow */}
    <path d="M40 50 L40 110 L30 100" className="stroke-destructive" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <text x="25" y="130" fontSize="10" className="fill-destructive" fontWeight="bold">-80%</text>
  </svg>
);

// Ultrasonic Diffuser SVG Illustration - Dark mode optimized
export const UltrasonicIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="deviceGradientUltrasonic" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--secondary))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--muted))]" />
      </linearGradient>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    
    {/* Device body */}
    <ellipse cx="100" cy="140" rx="50" ry="15" className="fill-muted" />
    <path d="M50 140 L50 80 Q50 60 70 50 L130 50 Q150 60 150 80 L150 140" fill="url(#deviceGradientUltrasonic)" className="stroke-border" strokeWidth="2" />
    
    {/* Water tank inside */}
    <ellipse cx="100" cy="100" rx="35" ry="25" fill="url(#waterGradient)" opacity="0.6" />
    
    {/* Water droplet being added */}
    <path d="M100 20 Q95 30 100 40 Q105 30 100 20" fill="#3B82F6">
      <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
      <animateTransform attributeName="transform" type="translate" values="0 0;0 20;0 40" dur="2s" repeatCount="indefinite" />
    </path>
    
    {/* Steam/mist coming out */}
    <ellipse cx="100" cy="45" rx="20" ry="8" className="fill-blue-200 dark:fill-blue-400/30" opacity="0.5">
      <animate attributeName="ry" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
    </ellipse>
    
    {/* Mist particles */}
    {[80, 100, 120].map((x, i) => (
      <circle key={i} cx={x} cy="35" r="4" className="fill-blue-300 dark:fill-blue-400" opacity="0.4">
        <animate attributeName="cy" values="35;15;-5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.2;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
      </circle>
    ))}
    
    {/* Bacteria warning */}
    <circle cx="165" cy="100" r="18" className="fill-destructive/10 stroke-destructive" strokeWidth="2" />
    <text x="165" y="95" textAnchor="middle" fontSize="10" className="fill-destructive">🦠</text>
    <text x="165" y="108" textAnchor="middle" fontSize="8" className="fill-destructive" fontWeight="bold">!</text>
    
    {/* Manual refill arrow */}
    <path d="M40 60 C40 30 70 30 70 50" className="stroke-amber-500" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    <text x="30" y="80" fontSize="8" className="fill-amber-500 dark:fill-amber-400" fontWeight="bold">Daily</text>
    <text x="30" y="90" fontSize="8" className="fill-amber-500 dark:fill-amber-400" fontWeight="bold">refill</text>
  </svg>
);

// Nebulizer SVG Illustration - Dark mode optimized
export const NebulizerIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glassGradientNeb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--accent))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--secondary))]" />
      </linearGradient>
    </defs>
    
    {/* Base unit */}
    <ellipse cx="100" cy="145" rx="45" ry="12" className="fill-muted-foreground/50 dark:fill-muted" />
    <rect x="60" y="120" width="80" height="25" rx="5" className="fill-muted stroke-border" strokeWidth="2" />
    
    {/* Glass reservoir */}
    <path d="M75 120 L75 70 Q75 50 100 50 Q125 50 125 70 L125 120" fill="url(#glassGradientNeb)" className="stroke-purple-300 dark:stroke-purple-500" strokeWidth="2" />
    
    {/* Oil inside */}
    <rect x="77" y="80" width="46" height="38" className="fill-purple-400 dark:fill-purple-500" opacity="0.6" rx="2" />
    
    {/* Mist nozzle */}
    <rect x="95" y="40" width="10" height="15" className="fill-muted-foreground dark:fill-muted" rx="2" />
    
    {/* Intense mist spray */}
    <path d="M100 35 Q90 20 85 5" className="stroke-purple-400 dark:stroke-purple-500" strokeWidth="3" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.5s" repeatCount="indefinite" />
    </path>
    <path d="M100 35 Q100 15 100 0" className="stroke-purple-400 dark:stroke-purple-500" strokeWidth="3" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.4;0.7" dur="0.4s" repeatCount="indefinite" />
    </path>
    <path d="M100 35 Q110 20 115 5" className="stroke-purple-400 dark:stroke-purple-500" strokeWidth="3" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.6s" repeatCount="indefinite" />
    </path>
    
    {/* Sound waves */}
    <path d="M145 100 Q155 100 155 90" className="stroke-destructive" strokeWidth="2" fill="none" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="0.5s" repeatCount="indefinite" />
    </path>
    <path d="M150 105 Q165 105 165 85" className="stroke-destructive" strokeWidth="2" fill="none" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.6s" repeatCount="indefinite" />
    </path>
    <path d="M155 110 Q175 110 175 80" className="stroke-destructive" strokeWidth="2" fill="none" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="0.7s" repeatCount="indefinite" />
    </path>
    
    {/* Noise label */}
    <text x="160" y="125" fontSize="10" className="fill-destructive" fontWeight="bold">NOISE</text>
    
    {/* Cleaning tools */}
    <rect x="25" y="90" width="25" height="8" rx="2" className="fill-muted" />
    <rect x="30" y="70" width="15" height="25" rx="2" className="fill-secondary stroke-border" />
    <text x="20" y="115" fontSize="8" className="fill-muted-foreground">Weekly</text>
    <text x="20" y="125" fontSize="8" className="fill-muted-foreground">cleaning</text>
  </svg>
);

// Heat Diffuser SVG Illustration - Dark mode optimized
export const HeatIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heatGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
      <linearGradient id="ceramicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
    </defs>
    
    {/* Base/heating element */}
    <ellipse cx="100" cy="145" rx="50" ry="12" className="fill-red-900 dark:fill-red-950" />
    <rect x="55" y="120" width="90" height="25" rx="5" className="fill-red-500 dark:fill-red-600 stroke-red-700" strokeWidth="2" />
    
    {/* Heat indicator light */}
    <circle cx="130" cy="132" r="5" fill="#FCD34D">
      <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
    </circle>
    
    {/* Ceramic dish */}
    <ellipse cx="100" cy="115" rx="40" ry="12" fill="url(#ceramicGradient)" className="stroke-amber-500" strokeWidth="2" />
    <ellipse cx="100" cy="112" rx="32" ry="8" className="fill-amber-400 dark:fill-amber-500" opacity="0.5" />
    
    {/* Oil drops on dish */}
    <ellipse cx="95" cy="110" rx="8" ry="4" className="fill-green-500" opacity="0.7" />
    <ellipse cx="108" cy="112" rx="6" ry="3" className="fill-green-500" opacity="0.6" />
    
    {/* Heat waves rising */}
    <path d="M80 100 Q85 90 80 80" stroke="url(#heatGradient)" strokeWidth="3" fill="none" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1s" repeatCount="indefinite" />
    </path>
    <path d="M100 95 Q105 80 100 65" stroke="url(#heatGradient)" strokeWidth="3" fill="none" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.8s" repeatCount="indefinite" />
    </path>
    <path d="M120 100 Q115 90 120 80" stroke="url(#heatGradient)" strokeWidth="3" fill="none" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.2s" repeatCount="indefinite" />
    </path>
    
    {/* Thermometer showing high temp */}
    <rect x="155" y="60" width="12" height="60" rx="6" className="fill-destructive/10 stroke-destructive" strokeWidth="2" />
    <rect x="158" y="85" width="6" height="32" rx="3" className="fill-destructive">
      <animate attributeName="height" values="32;25;32" dur="2s" repeatCount="indefinite" />
      <animate attributeName="y" values="85;92;85" dur="2s" repeatCount="indefinite" />
    </rect>
    <circle cx="161" cy="115" r="8" className="fill-destructive" />
    
    {/* Molecule breaking symbol */}
    <circle cx="40" cy="60" r="20" className="fill-amber-100 dark:fill-amber-900/30 stroke-amber-500" strokeWidth="2" />
    <circle cx="35" cy="55" r="6" className="fill-green-500" />
    <circle cx="45" cy="65" r="6" className="fill-green-500" />
    <line x1="35" y1="55" x2="45" y2="65" className="stroke-green-500" strokeWidth="2" />
    <line x1="28" y1="48" x2="52" y2="72" className="stroke-destructive" strokeWidth="3" />
    <text x="25" y="95" fontSize="8" className="fill-destructive" fontWeight="bold">Degraded</text>
    <text x="22" y="105" fontSize="8" className="fill-destructive" fontWeight="bold">molecules</text>
  </svg>
);

// Innobiz Technology SVG Illustration - Dark mode optimized
export const InnobizIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="innobizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="bottleGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" className="[stop-color:hsl(var(--background))]" />
        <stop offset="100%" className="[stop-color:hsl(var(--secondary))]" />
      </linearGradient>
      <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Glow effect */}
    <ellipse cx="100" cy="90" rx="70" ry="50" fill="url(#glowGradient)">
      <animate attributeName="rx" values="65;75;65" dur="3s" repeatCount="indefinite" />
    </ellipse>
    
    {/* Modern device base */}
    <ellipse cx="100" cy="145" rx="45" ry="12" className="fill-emerald-600 dark:fill-emerald-700" />
    <rect x="60" y="90" width="80" height="55" rx="10" fill="url(#innobizGradient)" className="stroke-emerald-700" strokeWidth="2" />
    
    {/* Device top with bottle slot */}
    <ellipse cx="100" cy="90" rx="35" ry="10" className="fill-emerald-700 dark:fill-emerald-800" />
    <ellipse cx="100" cy="88" rx="25" ry="7" className="fill-emerald-800 dark:fill-emerald-900" />
    
    {/* Bottle inserted directly */}
    <rect x="88" y="30" width="24" height="60" rx="4" fill="url(#bottleGradient2)" className="stroke-emerald-500" strokeWidth="2" />
    <rect x="92" y="20" width="16" height="12" rx="2" className="fill-emerald-500" />
    
    {/* Oil inside bottle */}
    <rect x="90" y="50" width="20" height="38" rx="2" className="fill-emerald-400 dark:fill-emerald-500" opacity="0.6" />
    
    {/* Micro-droplets dispersing evenly */}
    {[70, 85, 100, 115, 130].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={45 - i * 3} r="3" className="fill-emerald-400 dark:fill-emerald-500" opacity="0.6">
          <animate attributeName="cy" values={`${45 - i * 3};${25 - i * 3};${5 - i * 3}`} dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.3;0" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      </g>
    ))}
    
    {/* Control panel */}
    <rect x="75" y="105" width="50" height="25" rx="5" className="fill-emerald-800 dark:fill-emerald-900" />
    <circle cx="90" cy="117" r="6" className="fill-emerald-400">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <rect x="102" y="112" width="18" height="3" rx="1" className="fill-emerald-400" />
    <rect x="102" y="118" width="12" height="3" rx="1" className="fill-emerald-400" opacity="0.6" />
    
    {/* Checkmarks for benefits */}
    <g transform="translate(155, 40)">
      <circle r="12" className="fill-emerald-100 dark:fill-emerald-900/50 stroke-emerald-500" strokeWidth="2" />
      <path d="M-4 0 L-1 3 L5 -3" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="155" y="60" textAnchor="middle" fontSize="7" className="fill-emerald-600 dark:fill-emerald-400" fontWeight="bold">Silent</text>
    
    <g transform="translate(155, 90)">
      <circle r="12" className="fill-emerald-100 dark:fill-emerald-900/50 stroke-emerald-500" strokeWidth="2" />
      <path d="M-4 0 L-1 3 L5 -3" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="155" y="110" textAnchor="middle" fontSize="7" className="fill-emerald-600 dark:fill-emerald-400" fontWeight="bold">No water</text>
    
    <g transform="translate(45, 65)">
      <circle r="12" className="fill-emerald-100 dark:fill-emerald-900/50 stroke-emerald-500" strokeWidth="2" />
      <path d="M-4 0 L-1 3 L5 -3" className="stroke-emerald-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="45" y="85" textAnchor="middle" fontSize="7" className="fill-emerald-600 dark:fill-emerald-400" fontWeight="bold">Cold</text>
    
    {/* Programmable indicator */}
    <rect x="15" y="110" width="35" height="20" rx="4" className="fill-emerald-800 dark:fill-emerald-900" />
    <text x="32" y="123" textAnchor="middle" fontSize="8" className="fill-emerald-400" fontFamily="monospace">24/7</text>
  </svg>
);

// Comparison illustration showing bottle insertion - Dark mode optimized
export const BottleInsertIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 300 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    
    {/* Step 1: Brand bottle */}
    <g transform="translate(30, 20)">
      <rect x="15" y="10" width="30" height="70" rx="4" className="fill-red-100 dark:fill-red-900/30 stroke-destructive" strokeWidth="2" />
      <rect x="20" y="0" width="20" height="12" rx="2" className="fill-red-500 dark:fill-red-600" />
      <text x="30" y="95" textAnchor="middle" fontSize="10" className="fill-muted-foreground">Your bottle</text>
    </g>
    
    {/* Arrow 1 */}
    <path d="M85 60 L115 60" stroke="url(#arrowGrad)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowhead)">
      <animate attributeName="stroke-dashoffset" values="30;0" dur="1s" repeatCount="indefinite" />
    </path>
    <polygon points="120,60 110,55 110,65" className="fill-emerald-500" />
    
    {/* Step 2: Insert into device */}
    <g transform="translate(130, 10)">
      {/* Device */}
      <rect x="10" y="50" width="60" height="50" rx="8" className="fill-emerald-500" />
      <ellipse cx="40" cy="50" rx="25" ry="8" className="fill-emerald-600 dark:fill-emerald-700" />
      {/* Bottle going in */}
      <rect x="28" y="15" width="24" height="45" rx="3" className="fill-red-100 dark:fill-red-900/30 stroke-destructive" strokeWidth="2">
        <animate attributeName="y" values="0;15;15" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="40" y="115" textAnchor="middle" fontSize="10" className="fill-muted-foreground">Insert</text>
    </g>
    
    {/* Arrow 2 */}
    <path d="M205 60 L235 60" stroke="url(#arrowGrad)" strokeWidth="3" strokeLinecap="round">
      <animate attributeName="stroke-dashoffset" values="30;0" dur="1s" repeatCount="indefinite" />
    </path>
    <polygon points="240,60 230,55 230,65" className="fill-emerald-500" />
    
    {/* Step 3: Diffusion */}
    <g transform="translate(245, 10)">
      <rect x="5" y="50" width="50" height="40" rx="6" className="fill-emerald-500" />
      {/* Scent particles */}
      {[15, 30, 45].map((x, i) => (
        <circle key={i} cx={x} cy="40" r="4" className="fill-emerald-400 dark:fill-emerald-500" opacity="0.7">
          <animate attributeName="cy" values="40;20;0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.3;0" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="30" y="105" textAnchor="middle" fontSize="10" className="fill-muted-foreground">Diffuse</text>
    </g>
  </svg>
);
