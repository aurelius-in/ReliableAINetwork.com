// Splash sequence: 8s GIF full-height -> 2s logo @ 80% -> fade out
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  if (!splash) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { splash.style.display = 'none'; return; }

  splash.classList.add('sequence-start');

  let tLogo = setTimeout(() => { splash.classList.add('show-logo'); }, 8000);
  let tEnd  = setTimeout(() => {
    if (!splash.classList.contains('fade-out')) splash.classList.add('fade-out');
    setTimeout(()=>{ splash.style.display = 'none'; }, 600);
  }, 10000);

  const skipBtn = document.getElementById('skipSplash');
  const cancelTimers = ()=>{ clearTimeout(tLogo); clearTimeout(tEnd); };
  if (skipBtn) skipBtn.addEventListener('click', () => {
    cancelTimers();
    splash.classList.add('fade-out');
    setTimeout(()=>{ splash.style.display='none'; }, 400);
  });
});
