import React, { useRef, useState, useEffect, Suspense, ComponentType } from 'react';

interface LazySectionProps {
  factory: () => Promise<{ default: ComponentType }>;
  rootMargin?: string;
  fallbackHeight?: string;
}

const LazySection: React.FC<LazySectionProps> = ({ factory, rootMargin = '400px', fallbackHeight = '100vh' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          factory().then(mod => setComponent(() => mod.default));
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [factory, rootMargin]);

  return (
    <div ref={ref} style={Component ? undefined : { minHeight: fallbackHeight }}>
      {Component && (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      )}
    </div>
  );
};

export default LazySection;