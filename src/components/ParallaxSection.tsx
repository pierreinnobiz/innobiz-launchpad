import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
  rotate?: boolean;
  opacity?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.3,
  direction = 'up',
  scale = false,
  rotate = false,
  opacity = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const progress = (windowHeight / 2 - elementCenter) / windowHeight;
      const offset = progress * speed * 100;

      let x = 0, y = 0, s = 1, r = 0, o = 1;

      switch (direction) {
        case 'up':
          y = offset;
          break;
        case 'down':
          y = -offset;
          break;
        case 'left':
          x = offset;
          break;
        case 'right':
          x = -offset;
          break;
      }

      if (scale) {
        s = 1 + (progress * 0.05);
        s = Math.max(0.95, Math.min(1.05, s));
      }

      if (rotate) {
        r = progress * 3;
      }

      if (opacity) {
        o = 1 - Math.abs(progress) * 0.3;
        o = Math.max(0.7, Math.min(1, o));
      }

      setTransform({ x, y, scale: s, rotate: r, opacity: o });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, scale, rotate, opacity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
        opacity: transform.opacity,
        willChange: 'transform, opacity',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
