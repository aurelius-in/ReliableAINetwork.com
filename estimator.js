
function ceil(x){ return Math.ceil(x); }
function fmtUSD(n){ return n.toLocaleString(undefined, {style:'currency', currency:'USD', maximumFractionDigits:0}); }
function compute(){
  const agents = +document.getElementById('agents').value;
  const integrations = +document.getElementById('integrations').value;
  const dataSources = +document.getElementById('dataSources').value;
  const etl = +document.getElementById('etl').value;
  const safety = +document.getElementById('safety').value;
  const deploy = +document.getElementById('deploy').value;
  const ux = +document.getElementById('ux').value;
  const rate = +document.getElementById('rate').value;

  let base = 250;
  let h_agents = 40*agents;
  let h_integrations = 28*integrations;
  let h_data = 36*dataSources;
  base = ceil(base); h_agents = ceil(h_agents); h_integrations = ceil(h_integrations); h_data = ceil(h_data);
  let conventional = base + h_agents + h_integrations + h_data;

  conventional = ceil(conventional * etl);
  conventional = ceil(conventional * safety);
  conventional = ceil(conventional * deploy);
  conventional = ceil(conventional * ux);

  let ai_hours = ceil(conventional * 0.25);
  const weeks = 5;
  const hoursPerWeek = ceil(ai_hours / weeks);
  const totalPrice = rate * ai_hours;

  const out = document.getElementById('out');
  out.innerHTML = `
    <div class="grid cols-2">
      <div class="highlight"><div><strong>Total Estimate (hours)</strong></div>
        <div style="font-size:28px; font-weight:800">${ai_hours} h</div><div class="muted">Rounded up; AI‑accelerated</div></div>
      <div class="highlight"><div><strong>Hours / Week (≤5 weeks)</strong></div>
        <div style="font-size:28px; font-weight:800">${hoursPerWeek} h/week</div><div class="muted">5‑week delivery promise</div></div>
    </div>
    <div style="margin-top:10px" class="panel">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div><strong>Estimated Total Price</strong></div>
        <div style="font-size:24px; font-weight:900">${fmtUSD(totalPrice)}</div>
      </div>
      <div class="muted">Based on a blended rate of ${fmtUSD(rate)} / hr.</div>
    </div>
    <details style="margin-top:10px"><summary>How we calculated this</summary>
      <div class="muted" style="margin-top:6px">
        Conventional hours = 250 + 40×agents + 28×integrations + 36×dataSources, then × ETL × Safety × Deployment × UX, rounded after each step. Then ÷4 for AI acceleration, rounded up.
      </div>
    </details>
    <div style="margin-top:10px"><button id="copy" class="cta">Copy estimate</button></div>`;

  const sched = document.getElementById('schedule');
  const pay = Math.round(totalPrice * 0.20);
  const rows = [
    ["Upfront (at signing)", pay], ["Week 1 (on acceptance)", pay],
    ["Week 2 (on acceptance)", pay], ["Week 3 (on acceptance)", pay],
    ["Week 4 (on acceptance)", pay]
  ];
  let rowsHtml = rows.map(r => `<tr><td>${r[0]}</td><td style="text-align:right">${fmtUSD(r[1])}</td></tr>`).join('');
  sched.innerHTML = `<table style="width:100%; border-collapse:collapse">
    <thead><tr><th style="text-align:left">Milestone</th><th style="text-align:right">Amount</th></tr></thead>
    <tbody>${rowsHtml}</tbody>
    <tfoot><tr><td style="text-align:right"><strong>Total</strong></td><td style="text-align:right"><strong>${fmtUSD(pay*5)}</strong></td></tr></tfoot>
  </table>`;

  const btn = document.getElementById('copy');
  btn?.addEventListener('click', () => {
    const text = `RAIN Project Estimate
Agents: ${agents}, Integrations: ${integrations}, Data sources: ${dataSources}
ETL: ${etl}×, Safety: ${safety}×, Deploy: ${deploy}×, UX: ${ux}×
Total hours: ${ai_hours} (AI‑accelerated)
Hours/week (5 weeks): ${hoursPerWeek}
Total price: ${fmtUSD(totalPrice)}
Payment plan: 20% upfront, then 20% at the end of Weeks 1‑4 (5 payments total)`;
    navigator.clipboard.writeText(text);
    btn.textContent = "Copied ✓"; setTimeout(()=>btn.textContent="Copy estimate", 1200);
  });
}
document.addEventListener('DOMContentLoaded', () => { document.getElementById('calc').addEventListener('click', compute); compute(); });
