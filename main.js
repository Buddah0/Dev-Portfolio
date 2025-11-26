// scripts/main.js

// Anime.js + Intersection Observer: reveal elements with .fade-in as they enter the viewport.
const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fadeTargets = Array.from(document.querySelectorAll('.fade-in'));
const hasObserver = 'IntersectionObserver' in window;
const hasAnime = typeof anime !== 'undefined';

const runFadeIn = (target, delay = 0) => {
  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutQuad',
    duration: 750,
    delay,
    complete: () => target.classList.add('visible'),
  });
};

if (!prefersReducedMotion && hasObserver && hasAnime) {
  document.body.classList.add('motion');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0);
        runFadeIn(entry.target, delay);
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeTargets.forEach((el, idx) => {
    if (!el.dataset.delay) el.dataset.delay = idx * 60; // light stagger for down-cards
    observer.observe(el);
  });
} else {
  // Fallback for reduced-motion preference, older browsers, or missing Anime.js
  document.body.classList.add('no-motion');
  fadeTargets.forEach((el) => el.classList.add('visible'));
}
