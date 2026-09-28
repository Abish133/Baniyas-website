'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { createWow } from './wow';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({ nullTargetWarn: false });

/** Same split-title setup as the theme (it intentionally runs two passes). */
function splitTitles(passes) {
  document.querySelectorAll('.title_split_anim').forEach((element) => {
    passes.forEach((pass, index) => {
      const onScroll = element.getAttribute('data-on-scroll') || 1;
      // The second pass splits the already-split words again (like SplitText 3.11 did),
      // so it must not undo the first split.
      const split = new SplitText(element, { type: 'chars, words', overwrite: index === 0, aria: 'none' });
      const config = {
        duration: element.getAttribute('data-duration') || pass.duration,
        delay: element.getAttribute('data-delay') || pass.delay,
        x: element.getAttribute('data-translateX') || 20,
        y: element.getAttribute('data-translateY') || 0,
        autoAlpha: 0,
        stagger: element.getAttribute('data-stagger') || pass.stagger,
      };
      if (onScroll == 1) {
        // Finish the animation if the title is already scrolled past (e.g. reload mid-page),
        // otherwise it would stay invisible.
        config.scrollTrigger = { trigger: element, start: 'top 90%', toggleActions: 'play complete play none' };
      }
      gsap.from(split.words, config);
    });
  });
}

/**
 * Re-creates the theme's page animations (custom.js) on every route:
 * WOW reveal, GSAP bounce buttons, split titles and Bootstrap collapse.
 */
export default function ThemeEffects() {
  const pathname = usePathname();

  // Bootstrap's collapse data-API (FAQ accordions) — loaded once, client only.
  useEffect(() => {
    import('bootstrap/js/dist/collapse');
  }, []);

  // Runs before paint so animated elements never flash in their final state.
  useIsomorphicLayoutEffect(() => {
    const wow = createWow();
    wow.init();

    const ctx = gsap.context(() => {
      // Bounce Animation
      gsap.set('.item_bounce', { opacity: 0, y: -100 });
      const bounceIn = (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.4, duration: 1.5, ease: 'bounce', overwrite: 'auto' });
      // onLeave/onEnterBack reveal buttons that are already above the viewport on load.
      ScrollTrigger.batch('.item_bounce', { onEnter: bounceIn, onLeave: bounceIn, onEnterBack: bounceIn, start: 'top 90%' });
      // Split Title
      splitTitles([
        { duration: 0.8, delay: 0.2, stagger: 0.06 },
        { duration: 0.75, delay: 0.1, stagger: 0.04 },
      ]);
    });

    // Images, fonts and refreshed CMS content change the layout after first paint
    // (window "load" never fires again after a client-side navigation).
    let refreshTimer;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(refreshTimer);
      ctx.revert();
      wow.destroy();
    };
  }, [pathname]);

  return null;
}
