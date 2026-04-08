import React from 'react';
import { Shield, Award, Leaf, Factory } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ variant = 'light', className = '' }) => {
  const badges = [
    { icon: Shield, label: 'Made in France' },
    { icon: Award, label: '2 ans de R&D' },
    { icon: Leaf, label: 'Éco-conçu' },
    { icon: Factory, label: '100% réparable' },
  ];

  const isDark = variant === 'dark';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className={`flex items-center gap-2 text-sm font-medium ${
              isDark ? 'text-foreground/70' : 'text-white/80'
            }`}
          >
            <Icon className={`w-4 h-4 ${isDark ? 'text-primary' : 'text-white/60'}`} />
            <span>{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrustBadges;
