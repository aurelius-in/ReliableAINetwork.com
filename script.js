
// -------- Industry & UI helpers --------
async function loadIndustries(){
  try{
    const res = await fetch('./data/industries.json');
    if(!res.ok) throw new Error('industries.json not found');
    const data = await res.json();
    window.__INDUSTRIES__ = data;
    renderIndustryOptions(data);
    renderIndustryGrid(data);
  }catch(err){
    // Fail silently in UI; log for debugging
    console.warn('Failed loading industries:', err);
  }
}

function renderIndustryOptions(list){
  const sel = document.querySelector('#industrySelect');
  if (!sel) return;
  // Avoid duplicating options on rerender
  if (sel.dataset.bound === '1') return;
  list.forEach(i => {
    const opt = document.createElement('option');
    opt.value = i.id;
    opt.textContent = i.name;
    sel.appendChild(opt);
  });
  sel.dataset.bound = '1';
}

function renderIndustryGrid(list, filterId){
  const grid = document.querySelector('#industryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = filterId ? list.filter(i => i.id === filterId) : list;
  filtered.forEach(i => {
    const card = document.createElement('article');
    card.className = 'card panel fade-in';
    const demos = (i.demos || []).map(d => `<a href="${d.url}" target="_blank" rel="noopener">${d.title}</a>`).join(' • ');
    const tags = (i.value || []).slice(0,3).map(v => `<span class="tag">${v}</span>`).join(' ');
    card.innerHTML = `
      <h3 class="title">${i.name}</h3>
      <p class="muted">${i.summary}</p>
      <div style="margin:10px 0; display:flex; gap:8px; flex-wrap:wrap;">${tags}</div>
      <div>${demos || '<span class="muted">Demo link on request</span>'}</div>
      <div style="margin-top:10px">
        <a class="cta" href="./estimator.html">Estimate your project</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function onSelectIndustry(){
  const id = document.querySelector('#industrySelect')?.value;
  if (!window.__INDUSTRIES__) return;
  renderIndustryGrid(window.__INDUSTRIES__, id || undefined);
}

function switchTab(id){
  const tabs = document.querySelectorAll('[data-tab]');
  const btns = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => { t.hidden = (t.id !== id); });
  btns.forEach(b => b.setAttribute('aria-selected', b.dataset.target === id ? 'true' : 'false'));
  if (id === 'tab-industries' && !window.__INDUSTRIES__) loadIndustries();
}

// -------- Splash overlay: every visit, 9s auto-hide --------
function setupSplash(){
  const s = document.getElementById('splash');
  if (!s) return;

  const SKIP = () => {
    if (s.hasAttribute('hidden')) return; // idempotent
    s.classList.add('fade-out');
    setTimeout(() => { s.setAttribute('hidden','true'); }, 800);
  };

  // Dismiss options
  const skipBtn = document.getElementById('skipSplash');
  skipBtn && skipBtn.addEventListener('click', SKIP);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') SKIP(); });
  s.addEventListener('click', (e)=>{ if (e.target === s) SKIP(); });

  // Always show on load, auto-hide after 9s
  // (No sessionStorage gating)
  setTimeout(SKIP, 9000);
}

// -------- Boot --------
document.addEventListener('DOMContentLoaded', () => {
  // Default tab
  switchTab('tab-overview');

  // Tab handlers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });

  // Industry selector
  const sel = document.querySelector('#industrySelect');
  sel && sel.addEventListener('change', onSelectIndustry);

  // Splash
  setupSplash();
});
