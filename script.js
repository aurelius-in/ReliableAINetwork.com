document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const skip = document.getElementById('skipSplash');

  const hide = () => { if (splash) splash.style.display = 'none'; };

  // Respect reduced motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    hide();
    return;
  }

  // Auto-skip after ~2.4s
  const t = setTimeout(hide, 2400);
  if (skip) skip.addEventListener('click', () => { clearTimeout(t); hide(); });
});
