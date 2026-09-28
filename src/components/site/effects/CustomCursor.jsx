'use client';

import { useEffect, useRef } from 'react';

/** Smooth-follow cursor ball; grows and shows a label over `.data_cursor` areas. */
export default function CustomCursor() {
  const ballRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    const cursorText = textRef.current;
    let lastHovered = null;
    let mouseX = 0;
    let mouseY = 0;
    let ballX = 0;
    let ballY = 0;
    const speed = 0.1;
    let frame;

    const update = () => {
      ballX += (mouseX - ballX) * speed;
      ballY += (mouseY - ballY) * speed;
      ball.style.left = `${ballX}px`;
      ball.style.top = `${ballY}px`;
      cursorText.style.left = `${ballX}px`;
      cursorText.style.top = `${ballY}px`;
      if (lastHovered === null) {
        ball.style.display = 'block';
        ball.style.height = '12px';
        ball.style.width = '12px';
        cursorText.style.opacity = '0';
      }
      frame = requestAnimationFrame(update);
    };

    const onMove = (e) => {
      mouseX = e.clientX + (window.pageXOffset || document.documentElement.scrollLeft);
      mouseY = e.clientY + (window.pageYOffset || document.documentElement.scrollTop);
    };

    // Delegated equivalent of binding mouseenter/mouseleave on every .data_cursor
    const onOver = (e) => {
      const area = e.target.closest?.('.data_cursor');
      if (!area || area === lastHovered) return;
      cursorText.textContent = area.getAttribute('data-cursor-text') || '';
      cursorText.style.opacity = '1';
      ball.style.height = '90px';
      ball.style.width = '90px';
      lastHovered = area;
    };
    const onOut = (e) => {
      if (!lastHovered) return;
      if (e.relatedTarget && lastHovered.contains(e.relatedTarget)) return;
      if (!lastHovered.contains(e.target)) return;
      cursorText.style.opacity = '0';
      ball.style.display = 'block';
      lastHovered = null;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    update();
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <div className="cursor yes">
      <div className="hide">
        <div id="cursor-ball" ref={ballRef}></div>
      </div>
      <div id="cursor-text" ref={textRef}></div>
    </div>
  );
}
