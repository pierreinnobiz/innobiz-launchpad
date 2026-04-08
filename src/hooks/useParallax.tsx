import { useEffect, useState, useRef, RefObject } from 'react';

interface ParallaxConfig {
  speed?: number; // 0.1 = slow, 1 = normal scroll speed
  direction?: 'up' | 'down';
}

export function useParallax<T extends HTMLElement>(
  config: ParallaxConfig = {}
): [RefObject<T>, { transform: string }] {
  const { speed = 0.5, direction = 'up' } = config;
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = (windowHeight / 2 - elementCenter) * speed;
      
      setOffset(direction === 'up' ? distanceFromCenter : -distanceFromCenter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  const style = {
    transform: `translateY(${offset}px)`,
  };

  return [ref, style];
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      setProgress(scrollTop / scrollHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function useSectionInView<T extends HTMLElement>(
  threshold = 0.3
): [RefObject<T>, boolean, number] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const elementVisibility = visibleHeight / rect.height;
      
      setVisibility(elementVisibility);
      setIsInView(elementVisibility >= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return [ref, isInView, visibility];
}
