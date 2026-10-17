import React, { useEffect, useState } from 'react';

/**
 * Points sous un carrousel à faire glisser (téléphone) : ils montrent la carte affichée et le nombre de cartes
 * (« 1/4 »). Demandé par la marque testeuse qui lit sur téléphone (cycle 3, 17/10/2026).
 * `target` = la liste qui défile sur le côté ; ses enfants directs sont les cartes.
 */
const CarouselDots: React.FC<{ target: React.RefObject<HTMLElement>; count: number; className?: string }> = ({ target, count, className = '' }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const update = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) return setIndex(count - 1);
      const left = el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0);
      let best = 0;
      let dist = Infinity;
      Array.from(el.children).forEach((k, j) => {
        const d = Math.abs((k as HTMLElement).getBoundingClientRect().left - left);
        if (d < dist) { dist = d; best = j; }
      });
      setIndex(best);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, [target, count]);

  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, j) => (
        <span key={j} className={`h-1.5 rounded-full transition-all duration-300 ${j === index ? 'w-5 bg-foreground/60' : 'w-1.5 bg-foreground/20'}`} />
      ))}
      <span className="ml-2 text-xs tabular-nums text-muted-foreground">{index + 1}/{count}</span>
    </div>
  );
};

export default CarouselDots;
