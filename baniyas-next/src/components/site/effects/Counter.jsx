'use client';

import { useEffect, useRef } from 'react';

const TIME = 2500;
const DELAY = 100;

/** Port of jquery.counterup (time 2500, delay 100, triggers when the number enters the viewport). */
export default function Counter({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const target = String(value);
    const isComma = /[0-9]+,[0-9]+/.test(target);
    const num = target.replace(/,/g, '');
    const decimals = (num.split('.')[1] || []).length;
    const divisions = TIME / DELAY;
    const steps = [];
    for (let i = divisions; i >= 0; i -= 1) {
      let next = parseFloat((num / divisions) * i).toFixed(decimals);
      if (isComma) {
        while (/(\d+)(\d{3})/.test(next.toString())) next = next.toString().replace(/(\d+)(\d{3})/, '$1,$2');
      }
      steps.unshift(next);
    }

    let timer;
    const run = () => {
      el.textContent = '0';
      const tick = () => {
        el.textContent = steps.shift();
        if (steps.length) timer = setTimeout(tick, DELAY);
      };
      timer = setTimeout(tick, DELAY);
    };

    // Waypoint "offset: 100%": fire once the top of the number reaches the bottom of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <span className="counter" ref={ref}>
      {value}
    </span>
  );
}
