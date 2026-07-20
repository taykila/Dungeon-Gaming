/* =============================================================
   DUNGEON GAMING — MAIN.JS
   Phase 1: loading sequence, nav scroll/mobile behaviour.
   Later phases append their own modules to this file — keep each
   feature in its own clearly-commented block so it stays easy to
   extend without touching unrelated code.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNav();
});

/* -------------------------------------------------------------
   LOADING SCREEN
   1. Spawns drifting ember particles for the duration of the load.
   2. Fills the progress bar.
   3. On finish: triggers the vault-door split, unlocks scrolling,
      and removes the screen from the DOM once the transition ends.
------------------------------------------------------------- */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const particleField = document.getElementById('loadingParticles');
  const barFill = document.getElementById('loadingBarFill');
  const statusText = document.getElementById('loadingStatus');
  const site = document.getElementById('site');

  if (!screen) return;

  // --- 1. Ember particles ---
  const EMBER_COUNT = 26;
  for (let i = 0; i < EMBER_COUNT; i++) {
    const ember = document.createElement('span');
    ember.className = 'ember';
    ember.style.left = `${Math.random() * 100}%`;
    ember.style.setProperty('--drift', `${(Math.random() - 0.5) * 60}px`);
    ember.style.animationDuration = `${3 + Math.random() * 3}s`;
    ember.style.animationDelay = `${Math.random() * 2.5}s`;
    particleField.appendChild(ember);
  }

  // --- 2. Progress bar + status copy ---
  // Simulated progress; swap for real asset-load tracking later if needed.
  const messages = ['OPENING THE GATE', 'LIGHTING THE TORCHES', 'READY'];
  let progress = 0;

  const tick = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(tick);
      statusText.textContent = messages[2];
      setTimeout(finishLoading, 350);
    } else if (progress > 55) {
      statusText.textContent = messages[1];
    }
    barFill.style.width = `${progress}%`;
  }, 220);

  function finishLoading() {
    screen.classList.add('is-finished');
    site.classList.remove('is-locked');

    // Remove from DOM after the door-split transition completes
    // so it stops intercepting clicks/scroll.
    setTimeout(() => {
      screen.classList.add('is-hidden');
    }, 950);
  }
}

/* -------------------------------------------------------------
   NAVIGATION
   - Adds a background/blur once the page is scrolled.
   - Handles the mobile hamburger open/close + link-click close.
------------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}
