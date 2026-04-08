import React from 'react';

interface SectionGradientProps {
  from: string;
  to: string;
  height?: string;
}

const SectionGradient: React.FC<SectionGradientProps> = ({ from, to, height = '160px' }) => (
  <div
    aria-hidden
    className="w-full pointer-events-none"
    style={{
      height,
      background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      marginTop: '-1px',
      marginBottom: '-1px',
    }}
  />
);

export default SectionGradient;
