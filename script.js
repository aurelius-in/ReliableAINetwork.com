
document.addEventListener('DOMContentLoaded', () => {
  // Splash sequence: 4s GIF full-height, 1s logo at 80%, then fade
  const splash = document.getElementById('splash');
  if (splash) {
    const gifLayer = splash.querySelector('.gif-layer');
    const logoLayer = splash.querySelector('.logo-layer');
    const skipBtn = document.getElementById('skipSplash');

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GIF_MS = reduceMotion ? 1000 : 4000;
    const LOGO_MS = reduceMotion ? 700 : 1000;

    let finished = false;
    function endSplash(){
      if (finished) return;
      finished = true;
      splash.classList.add('hidden');
      setTimeout(() => splash.remove(), 500);
    }
    function showLogo(){
      if (finished) return;
      if (gifLayer) gifLayer.style.display = 'none';
      if (logoLayer) logoLayer.classList.add('show');
      setTimeout(endSplash, LOGO_MS);
    }
    const t1 = setTimeout(showLogo, GIF_MS);
    if (skipBtn) skipBtn.addEventListener('click', () => {
      clearTimeout(t1);
      endSplash();
    });
  }
});
