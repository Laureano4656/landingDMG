/**
 * page-nav.js
 *
 * Handles the one gap CSS snap can't cover cross-browser:
 * scrolling UP from the top of ServicesContact to snap back to Hero.
 *
 * Mirrors the isAtTop() / isNavigating debounce pattern.
 */

const COOLDOWN_MS = 800;
const EDGE_BUFFER_PX = 8;
const SWIPE_THRESHOLD = 80;
const SWIPE_MAX_DURATION_MS = 400;
const VERTICAL_DOMINANCE = 1.4;

let isNavigating = false;

const wrapper = document.getElementById('scroll-wrapper');
const servicesEl = document.querySelector('.services-contact');

if (wrapper && servicesEl) {
  const isAtServicesTop = () => servicesEl.scrollTop <= EDGE_BUFFER_PX;
  const isOnServicesPage = () =>
    wrapper.scrollTop >= servicesEl.offsetTop - EDGE_BUFFER_PX;

  const goToHero = () => {
    if (isNavigating) return;
    isNavigating = true;
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => (isNavigating = false), COOLDOWN_MS);
  };

  // -- Wheel --
  servicesEl.addEventListener(
    'wheel',
    (e) => {
      if (isNavigating) return;
      if (e.deltaY < 0 && isAtServicesTop() && isOnServicesPage()) {
        e.preventDefault();
        goToHero();
      }
    },
    { passive: false }
  );

  // -- Touch (mirrors handleTouchEnd pattern) --
  let touchStartY = 0;
  let touchStartX = 0;
  let touchStartTime = 0;

  servicesEl.addEventListener(
    'touchstart',
    (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  servicesEl.addEventListener(
    'touchend',
    (e) => {
      if (isNavigating) return;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const duration = Date.now() - touchStartTime;
      if (duration > SWIPE_MAX_DURATION_MS) return;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      if (Math.abs(deltaY) < Math.abs(deltaX) * VERTICAL_DOMINANCE) return;
      if (deltaY > SWIPE_THRESHOLD && isAtServicesTop() && isOnServicesPage()) {
        goToHero();
      }
    },
    { passive: true }
  );
}
