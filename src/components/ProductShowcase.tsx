import React from 'react';
import toliaVariation1 from '@/assets/tolia-variation-1.jpg';

interface ProductShowcaseProps {
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ className = '' }) => {
  const features = [
    { label: 'Sans eau', description: 'Diffusion pure' },
    { label: '< 35 dB', description: 'Ultra silencieux' },
    { label: '100% réparable', description: 'Durable' },
  ];

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${className}`}>
      {/* Features list - Left side */}
      <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 order-2 lg:order-1">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-card/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-border/50 text-center lg:text-left"
          >
            <div className="text-sm font-semibold text-foreground">{feature.label}</div>
            <div className="text-xs text-muted-foreground hidden lg:block">{feature.description}</div>
          </div>
        ))}
      </div>

      {/* Product image - Center */}
      <div className="relative order-1 lg:order-2 flex-shrink-0">
        {/* Gradient glow behind product */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl scale-125" />
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          {/* Decorative rings */}
          <div className="absolute inset-2 rounded-full border border-primary/20" />
          <div className="absolute inset-6 rounded-full border border-primary/10" />
          
          {/* Main product image */}
          <img
            src={toliaVariation1}
            alt="Tolia, diffuseur d'huiles essentielles sans eau, silencieux et 100% réparable, design scandinave en blanc pur"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl no-select"
            draggable={false}
          />
        </div>
      </div>

      {/* Empty space for balance - Right side (desktop only) */}
      <div className="hidden lg:block lg:w-32 order-3" />
    </div>
  );
};

export default ProductShowcase;
