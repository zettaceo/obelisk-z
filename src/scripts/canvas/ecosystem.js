export function initEcosystem() {
  const canvas = document.getElementById('Ecv0');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, angle = 0;

  function resize() {
    const r = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = r.width;
    H = canvas.height = r.height;
  }
  resize();
  addEventListener('resize', resize);

  const nodes = ['e0', 'e1', 'e2', 'e3', 'e4'];
  const colors = ['184,79,255', '255,62,181', '0,212,255', '196,165,90', '255,62,181'];

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    angle += .004;
    const cx = W / 2, cy = H / 2;

    [60, 90, 120].forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184,79,255,${.06 - i * .015})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.lineDashOffset = -angle * 15;
      ctx.stroke();
      ctx.setLineDash([]);
    });

    nodes.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      const pos = { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top };

      const t = angle + i * .9;
      const a = (Math.sin(t) * .5 + .5) * .35 + .06;
      const grad = ctx.createLinearGradient(cx, cy, pos.x, pos.y);
      grad.addColorStop(0, `rgba(${colors[i]},${a})`);
      grad.addColorStop(.5, `rgba(${colors[i]},${a * .7})`);
      grad.addColorStop(1, `rgba(${colors[i]},0)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      [0, .45].forEach(offset => {
        const p = ((angle * .8 + i * .4 + offset) % 1 + 1) % 1;
        const dx = cx + (pos.x - cx) * p;
        const dy = cy + (pos.y - cy) * p;
        const da = Math.sin(p * Math.PI) * .8 + .2;
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[i]},${da})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(dx, dy, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[i]},${da * .15})`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors[i]},${(Math.sin(angle * 1.5 + i) * .5 + .5) * .06})`;
      ctx.fill();
    });

    requestAnimationFrame(loop);
  })();
}
