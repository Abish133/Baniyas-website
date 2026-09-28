'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const OFFSET = 50;
const DURATION = 950;

/** Circular scroll-progress button (bottom right). */
export default function ScrollToTop() {
  const pathRef = useRef(null);
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.transition = 'none';
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 10ms linear';

    const update = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      path.style.strokeDashoffset = height > 0 ? length - (scroll * length) / height : length;
      setActive(scroll > OFFSET);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const scrollUp = (event) => {
    event.preventDefault();
    const start = window.scrollY;
    const startTime = performance.now();
    // jQuery "swing" easing, same duration as the original theme.
    const step = (now) => {
      const progress = Math.min((now - startTime) / DURATION, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      window.scrollTo(0, start * (1 - eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className={`scroll-up scroll-one${active ? ' active-scroll' : ''}`} onClick={scrollUp}>
      <svg className="scroll-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path ref={pathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
}
