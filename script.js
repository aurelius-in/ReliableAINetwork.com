// RAIN site small scripts

document.addEventListener('DOMContentLoaded', () => {
  // ----- Splash logic -----
  const splash = document.getElementById('splash');
  if (splash) {
    const skip = document.getElementById('skipSplash');
    const showLogoAtMs = 8000;  // 8 seconds on GIF
    const exitAtMs = 10000;     // +2 seconds on logo, then exit

    const showLogoTimer = setTimeout(() => {
      splash.classList.add('show-logo');
    }, showLogoAtMs);

    const exitTimer = setTimeout(() => {
      splash.classList.add('fade-out');
    }, exitAtMs);

    splash.addEventListener('transitionend', (e) => {
      // When overlay itself has finished fading
      if (e.target === splash && splash.classList.contains('fade-out')) {
        splash.setAttribute('hidden', '');
      }
    });

    const skipAll = () => {
      clearTimeout(showLogoTimer);
      clearTimeout(exitTimer);
      splash.classList.add('fade-out');
    };
    if (skip) skip.addEventListener('click', skipAll);
  }

  // ----- Tabs (index only) -----
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('[data-tab]');
  if (tabs.length && panels.length) {
    const activate = (btn) => {
      tabs.forEach(t => t.setAttribute('aria-selected','false'));
      panels.forEach(p => p.hidden = true);
      btn.setAttribute('aria-selected','true');
      const id = btn.getAttribute('data-target');
      const panel = document.getElementById(id);
      if (panel) panel.hidden = false;
    };
    tabs.forEach(btn => btn.addEventListener('click', () => activate(btn)));
  }
});
