import React from 'react';
import { motion } from 'framer-motion';

interface SocialProofProps {
  className?: string;
}

const SocialProof: React.FC<SocialProofProps> = ({ className = '' }) => {
  const stats = [
    { value: '50+', label: 'Marques partenaires' },
    { value: '1.5M', label: 'Diffusions mensuelles' },
    { value: '+47%', label: 'Consommation accrue' },
    { value: '89%', label: 'Taux de fidélité' },
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
            {stat.value}
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SocialProof;
