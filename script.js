
async function loadIndustries(){
  const res = await fetch('./data/industries.json');
  const data = await res.json();
  window.__INDUSTRIES__ = data;
  renderIndustryOptions(data);
  renderIndustryGrid(data);
}

function renderIndustryOptions(list){
  const sel = document.querySelector('#industrySelect');
  list.forEach(i => {
    const opt = document.createElement('option');
    opt.value = i.id; opt.textContent = i.name;
    sel.appendChild(opt);
  });
}

function renderIndustryGrid(list, filterId){
  const grid = document.querySelector('#industryGrid');
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
        <a class="cta" href="https://calendly.com/oliveraellison/15min" target="_blank" rel="noopener">Book a 15‑min Fit Call</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function onSelectIndustry(){
  const id = document.querySelector('#industrySelect').value;
  renderIndustryGrid(window.__INDUSTRIES__, id || undefined);
}

function switchTab(id){
  const tabs = document.querySelectorAll('[data-tab]');
  const btns = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.hidden = t.id !== id);
  btns.forEach(b => b.setAttribute('aria-selected', b.dataset.target === id ? 'true' : 'false'));
  if (id === 'tab-industries' && !window.__INDUSTRIES__) loadIndustries();
}

document.addEventListener('DOMContentLoaded', () => {
  switchTab('tab-overview'); // default
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });
  document.querySelector('#industrySelect').addEventListener('change', onSelectIndustry);
});
