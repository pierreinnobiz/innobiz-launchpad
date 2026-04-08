import React, { useEffect, useRef, ReactNode } from 'react';

type AnimationVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'scale' 
  | 'blur'
  | 'slide-up'
  | 'rotate';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  duration?: number;
  distance?: number;
  once?: boolean;
}

const getVariantStyles = (variant: AnimationVariant, distance: number): string => {
  switch (variant) {
    case 'fade-up':
      return `opacity-0 translate-y-[${distance}px]`;
    case 'fade-down':
      return `opacity-0 -translate-y-[${distance}px]`;
    case 'fade-left':
      return `opacity-0 translate-x-[${distance}px]`;
    case 'fade-right':
      return `opacity-0 -translate-x-[${distance}px]`;
    case 'scale':
      return 'opacity-0 scale-95';
    case 'blur':
      return 'opacity-0 blur-sm';
    case 'slide-up':
      return `opacity-0 translate-y-[${distance * 1.5}px]`;
    case 'rotate':
      return 'opacity-0 rotate-3';
    default:
      return 'opacity-0 translate-y-5';
  }
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'fade-up',
  duration = 600,
  distance = 30,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state
    element.style.opacity = '0';
    element.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    element.style.transitionDelay = `${delay}ms`;
    
    switch (variant) {
      case 'fade-up':
        element.style.transform = `translateY(${distance}px)`;
        break;
      case 'fade-down':
        element.style.transform = `translateY(-${distance}px)`;
        break;
      case 'fade-left':
        element.style.transform = `translateX(${distance}px)`;
        break;
      case 'fade-right':
        element.style.transform = `translateX(-${distance}px)`;
        break;
      case 'scale':
        element.style.transform = 'scale(0.95)';
        break;
      case 'blur':
        element.style.filter = 'blur(8px)';
        break;
      case 'slide-up':
        element.style.transform = `translateY(${distance * 1.5}px)`;
        break;
      case 'rotate':
        element.style.transform = 'rotate(3deg) translateY(20px)';
        break;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0)';
            element.style.filter = 'blur(0)';
            
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // Reset if not once-only
            switch (variant) {
              case 'fade-up':
                element.style.opacity = '0';
                element.style.transform = `translateY(${distance}px)`;
                break;
              case 'fade-down':
                element.style.opacity = '0';
                element.style.transform = `translateY(-${distance}px)`;
                break;
              case 'fade-left':
                element.style.opacity = '0';
                element.style.transform = `translateX(${distance}px)`;
                break;
              case 'fade-right':
                element.style.opacity = '0';
                element.style.transform = `translateX(-${distance}px)`;
                break;
              case 'scale':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.95)';
                break;
              case 'blur':
                element.style.opacity = '0';
                element.style.filter = 'blur(8px)';
                break;
              case 'slide-up':
                element.style.opacity = '0';
                element.style.transform = `translateY(${distance * 1.5}px)`;
                break;
              case 'rotate':
                element.style.opacity = '0';
                element.style.transform = 'rotate(3deg) translateY(20px)';
                break;
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, variant, duration, distance, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
