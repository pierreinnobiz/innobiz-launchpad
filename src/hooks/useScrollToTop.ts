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

    // The anchor target can live in a lazily loaded chunk, and the hero video
    // player can steal focus once it loads and drag the viewport back to the
    // top. So keep re-asserting the anchor position for ~5 s, unless the
    // visitor scrolls on their own.
    let tries = 0;
    let userScrolled = false;
    const onUserScroll = () => {
      userScrolled = true;
    };
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });
    window.addEventListener('keydown', onUserScroll);

    scrollToAnchor();
    const poll = setInterval(() => {
      if (userScrolled || ++tries > 50) {
        clearInterval(poll);
        return;
      }
      const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
      if (!el) return;
      // Re-scroll only when the target has drifted away from the top of the viewport.
      if (Math.abs(el.getBoundingClientRect().top) > 4) scrollToAnchor();
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
