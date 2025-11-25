// scripts/main.js

// Intersection Observer: reveals elements with .fade-in as they enter the viewport.
// This is lightweight and accessible (no motion when prefers-reduced-motion is set).
const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.fade-in');
const canAnimate = 'IntersectionObserver' in window && !prefersReducedMotion;

if (canAnimate) {
  document.body.classList.add('motion');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve once revealed
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15, // reveal when ~15% is visible
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback for reduced-motion preference or older browsers
  revealEls.forEach((el) => el.classList.add('visible'));
}

// Future: Swap to Anime.js Scroll Observer for richer effects
// Example idea (not enabled yet):
// anime.scrollObserver({
//   targets: '.fade-in',
//   enter: (el) => anime({
//     targets: el,
//     opacity: [0, 1],
//     translateY: [-10, 0],
//     easing: 'easeOutQuad',
//     duration: 600
//   })
// });
