// Minimal port of WOW.js 1.1.3 (the version the theme shipped with).
// Reveals `.wow` elements with their animate.css animation when they scroll into view.

const BOX_CLASS = 'wow';
const ANIMATE_CLASS = 'animated';
const DONE_ATTR = 'data-wow-init';

function offsetTop(element) {
  let top = 0;
  while (element) {
    top += element.offsetTop;
    element = element.offsetParent;
  }
  return top;
}

export function createWow({ offset = 0 } = {}) {
  let boxes = [];
  let scrolled = true;
  let interval = null;
  let observer = null;

  const applyStyle = (box, hidden) => {
    const duration = box.getAttribute('data-wow-duration');
    const delay = box.getAttribute('data-wow-delay');
    const iteration = box.getAttribute('data-wow-iteration');
    box.style.visibility = hidden ? 'hidden' : 'visible';
    if (duration) box.style.animationDuration = duration;
    if (delay) box.style.animationDelay = delay;
    if (iteration) box.style.animationIterationCount = iteration;
    box.style.animationName = hidden ? 'none' : box.__wowAnimationName || '';
  };

  const isVisible = (box) => {
    const boxOffset = Number(box.getAttribute('data-wow-offset')) || offset;
    const viewTop = window.pageYOffset;
    const viewBottom = viewTop + Math.min(document.documentElement.clientHeight, window.innerHeight) - boxOffset;
    const top = offsetTop(box);
    const bottom = top + box.clientHeight;
    return top <= viewBottom && bottom >= viewTop;
  };

  // WOW 1.1.3 strips the animate class once the animation ends (on the event target).
  const resetAnimation = (event) => {
    const target = event.target;
    if (typeof target.className !== 'string') return;
    target.className = target.className.replace(ANIMATE_CLASS, '').trim();
  };

  const show = (box) => {
    applyStyle(box, false);
    box.classList.add(ANIMATE_CLASS);
    box.addEventListener('animationend', resetAnimation);
  };

  const register = (box) => {
    if (box.hasAttribute(DONE_ATTR)) return;
    box.setAttribute(DONE_ATTR, '');
    // Cache the animation name coming from the CSS classes (fadeInUp, img_top_animation…)
    box.__wowAnimationName = window.getComputedStyle(box).animationName;
    applyStyle(box, true);
    boxes.push(box);
  };

  const sync = (root = document) => {
    root.querySelectorAll(`.${BOX_CLASS}`).forEach(register);
    scrolled = true;
  };

  const scrollHandler = () => {
    scrolled = true;
  };

  const tick = () => {
    if (!scrolled) return;
    scrolled = false;
    boxes = boxes.filter((box) => {
      if (!box.isConnected) return false;
      if (isVisible(box)) {
        show(box);
        return false;
      }
      return true;
    });
  };

  return {
    init() {
      sync();
      window.addEventListener('scroll', scrollHandler, { passive: true });
      window.addEventListener('resize', scrollHandler);
      interval = window.setInterval(tick, 50);
      tick();
      // "live" mode: pick up .wow elements rendered later (services switcher, etc.)
      observer = new MutationObserver((records) => {
        for (const record of records) {
          record.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            if (node.classList.contains(BOX_CLASS)) register(node);
            sync(node);
          });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    },
    sync,
    destroy() {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
      window.clearInterval(interval);
      observer?.disconnect();
      boxes = [];
    },
  };
}
