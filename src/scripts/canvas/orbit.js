export function initOrbit() {
  const canvas = document.getElementById('Ηcv0');
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

  const nodes = ['n0', 'n1', 'n2', 'n3', 'n4'];
  const colors = ['184,79,255', '184,79,255', '196,165,90', '184,79,255', '255,62,181'];

  function getNodePos(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const c = canvas.getBoundingClientRect();
    return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top };
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    angle += .005;
    const cx = W / 2, cy = H / 2;

    [80, 130, 175].forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184,79,255,${.04 - i * .01})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    nodes.forEach((id, i) => {
      const pos = getNodePos(id);
      if (!pos) return;
      const t = angle + i * .7;
      const a = (Math.sin(t) * .5 + .5) * .4 + .07;
      const grad = ctx.createLinearGradient(cx, cy, pos.x, pos.y);
      grad.addColorStop(0, `rgba(${colors[i]},${a})`);
      grad.addColorStop(1, `rgba(${colors[i]},0)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const p = Math.sin(angle * 1.8 + i * .9) * .5 + .5;
      ctx.beginPath();
      ctx.arc(cx + (pos.x - cx) * p, cy + (pos.y - cy) * p, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors[i]},${.8 + Math.sin(angle * 3 + i) * .2})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors[i]},${(Math.sin(angle + i * .8) * .3 + .4) * .06})`;
      ctx.fill();
    });

    requestAnimationFrame(loop);
  })();
}
