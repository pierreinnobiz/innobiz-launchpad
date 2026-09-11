import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // When there is no fragment, always return to the top of the page.
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.replace('#', ''));
    if (!id) return;

    const scrollToAnchor = () => {
      const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (!el) return;

      // Temporarily disable smooth scrolling so the anchor jump is instant and
      // cannot be cancelled by a later layout shift or focus event.
      const html = document.documentElement;
      const originalBehavior = html.style.scrollBehavior || '';
      const originalSmooth = getComputedStyle(html).scrollBehavior;
      if (originalSmooth === 'smooth') {
        html.style.scrollBehavior = 'auto';
      }
      el.scrollIntoView({ behavior: 'auto' });
      if (originalSmooth === 'smooth') {
        // Restore smooth scrolling after the browser has processed the jump.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            html.style.scrollBehavior = originalBehavior || '';
          });
        });
      }
    };

    // The anchor target can live in a lazily loaded chunk, so poll until it
    // exists and its position has stopped moving (max ~4 s), then give up.
    let tries = 0;
    let lastTop: number | null = null;
    scrollToAnchor();
    const poll = setInterval(() => {
      const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (el) {
        const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
        scrollToAnchor();
        if (lastTop !== null && top === lastTop) {
          clearInterval(poll);
          return;
        }
        lastTop = top;
      }
      if (++tries > 40) clearInterval(poll);
    }, 100);


    // The hero background video iframe sometimes grabs focus after load and
    // pulls the viewport back to the top. When that happens, restore the
    // anchor position so deep links like /#contact still land on the form.
    const restoreAnchor = () => {
      if (!window.location.hash) return;
      const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (!el) return;
      // Only snap back if the page has been pulled well above the anchor.
      const anchorTop = el.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY < anchorTop - window.innerHeight) {
        scrollToAnchor();
      }
    };
    window.addEventListener('tolia:heroiframe:focus', restoreAnchor);

    return () => {
      clearInterval(poll);

      window.removeEventListener('tolia:heroiframe:focus', restoreAnchor);
    };
  }, [pathname, hash]);
};
