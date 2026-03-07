const SEQUENCE = [
  { d: 800, t: 'out', v: '> Session initialized' },
  { d: 1200, t: 'cmd', v: '> Scanning transaction parameters...' },
  { d: 2000, t: 'kv', k: 'contract_address', v: '0x7f4e...a83c' },
  { d: 2400, t: 'kv', k: 'network', v: 'ZETTA CHAIN', c: 'route' },
  { d: 2800, t: 'div' },
  { d: 3000, t: 'out', v: '> Running layer analysis...' },
  { d: 3600, t: 'kv', k: 'custody_check', v: 'VERIFIED', c: 'ok' },
  { d: 4000, t: 'kv', k: 'route_integrity', v: 'OK', c: 'ok' },
  { d: 4400, t: 'kv', k: 'contract_risk', v: 'LOW', c: 'ok' },
  { d: 4800, t: 'kv', k: 'liquidity_depth', v: 'SUFFICIENT', c: 'ok' },
  { d: 5200, t: 'div' },
  { d: 5400, t: 'out', v: '> Generating advisory output...' },
  { d: 6000, t: 'kv', k: 'risk_score', v: '12 / 100', c: 'ok', s: true },
  { d: 6400, t: 'kv', k: 'recommended_route', v: 'Z-SWAP → ZETTA CHAIN', c: 'route' },
  { d: 6800, t: 'kv', k: 'estimated_impact', v: '< 0.1%', c: 'ok' },
  { d: 7200, t: 'div' },
  { d: 7400, t: 'gold', v: '> Advisory complete. Awaiting user authorization.' },
  { d: 7800, t: 'kv', k: 'execution_status', v: 'PENDING USER CONFIRMATION', c: 'warn' },
  { d: 8200, t: 'cur' },
];

let running = false;

function runTerminal() {
  const body = document.getElementById('Tm0');
  const tsv = document.getElementById('TsV0');
  if (running || !body) return;
  running = true;

  SEQUENCE.forEach(item => setTimeout(() => {
    let el;
    if (item.t === 'div') {
      el = document.createElement('div');
      el.className = 'Tdv';
    } else if (item.t === 'kv') {
      el = document.createElement('span');
      el.className = 'Tl';
      el.innerHTML = `<span class="Tk">${item.k}</span><span style="color:var(--τ4)"> : </span><span class="Tv ${item.c || ''}">${item.v}</span>`;
      if (item.s && tsv) {
        const n = new Date();
        tsv.textContent = `${n.getHours()}:${String(n.getMinutes()).padStart(2, '0')}:${String(n.getSeconds()).padStart(2, '0')}`;
      }
    } else if (item.t === 'cur') {
      el = document.createElement('span');
      el.className = 'Tl';
      el.innerHTML = '<span class="Tp">zion@obelisk-z</span><span style="color:var(--τ3)"> ~ </span><span class="Tcsr"></span>';
    } else if (item.t === 'gold') {
      el = document.createElement('span');
      el.className = 'Tl';
      el.style.color = 'rgba(196,165,90,.9)';
      el.textContent = item.v;
    } else {
      el = document.createElement('span');
      el.className = 'Tl To';
      el.textContent = item.v;
    }
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }, item.d));

  setTimeout(() => {
    running = false;
    setTimeout(() => {
      body.querySelectorAll('.Tl:not(:first-child), .Tdv').forEach(el => el.remove());
      runTerminal();
    }, 4000);
  }, 16000);
}

export function initTerminal() {
  const section = document.getElementById('s5b');
  if (!section) return;

  new IntersectionObserver(
    entries => { if (entries[0].isIntersecting) runTerminal(); },
    { threshold: 0.3 }
  ).observe(section);
}
