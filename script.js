// Splash sequence: 8s GIF, then 2s logo, then fade out.
// Skip button remains available the whole time.

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  if (!splash) return;
  const gifLayer  = splash.querySelector('.gif-layer');
  const logoLayer = splash.querySelector('.logo-layer');
  const skipBtn   = document.getElementById('skipSplash');

  // If reduced motion is requested, skip the splash.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    splash.style.display = 'none';
    return;
  }

  // Ensure initial state
  splash.classList.add('sequence-start'); // makes GIF visible, logo hidden

  let tLogo = null;
  let tEnd  = null;

  const showLogo = () => {
    splash.classList.add('show-logo'); // crossfade GIF -> logo (CSS handles opacity)
  };

  const finish = () => {
    // Prevent double-finishing
    if (splash.classList.contains('fade-out')) return;
    splash.classList.add('fade-out'); // overlay opacity -> 0
    const onEnd = () => {
      splash.style.display = 'none';
      splash.removeEventListener('transitionend', onEnd);
    };
    // Fallback in case transition event doesn't fire
    setTimeout(onEnd, 600);
    splash.addEventListener('transitionend', onEnd);
  };

  const cancelTimers = () => {
    if (tLogo) clearTimeout(tLogo);
    if (tEnd)  clearTimeout(tEnd);
  };

  // 8s GIF, then 2s logo, then fade out
  tLogo = setTimeout(showLogo, 8000);
  tEnd  = setTimeout(finish, 8000 + 2000);

  // Skip handler
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      cancelTimers();
      finish();
    });
  }
});
