import React from 'react';

interface SectionDividerProps {
  from?: string;
  to?: string;
  variant?: 'wave' | 'curve' | 'angle';
  flip?: boolean;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  from = 'hsl(35 30% 97%)',
  to = 'hsl(30 25% 93%)',
  variant = 'wave',
  flip = false,
  className = '',
}) => {
  const paths = {
    wave: 'M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,160 L0,160 Z',
    curve: 'M0,96 Q720,0 1440,96 L1440,160 L0,160 Z',
    angle: 'M0,128 L720,32 L1440,128 L1440,160 L0,160 Z',
  };

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        height: '80px',
        marginTop: '-1px',
        marginBottom: '-1px',
        background: to,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d={paths[variant]} fill={from} />
      </svg>
    </div>
  );
};

export default SectionDivider;
