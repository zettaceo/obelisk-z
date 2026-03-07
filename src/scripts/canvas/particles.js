export function initParticles() {
  const canvas = document.getElementById('α');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  resize();
  addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * .9 + .15;
      this.a = Math.random() * .35 + .08;
      this.vx = (Math.random() - .5) * .12;
      this.vy = (Math.random() - .5) * .12;
      const c = Math.random();
      this.c = c > .6
        ? `rgba(184,79,255,${this.a})`
        : c > .3
          ? `rgba(255,62,181,${this.a * .8})`
          : `rgba(212,128,255,${this.a * .6})`;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 160 }, () => new Particle());

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  })();
}
