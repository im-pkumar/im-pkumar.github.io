/* Digital Gateway intro for im-pkumar.github.io. No external libraries. */
(() => {
  "use strict";
  const ID = "digital-gateway";
  const DURATION = 2000;
  const KEY = "pkGatewayIntroSeen";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seen = false;
  try { seen = sessionStorage.getItem(KEY) === "1"; } catch (_) {}

  function init() {
    // Respect accessibility preferences and don't replay on every same-tab navigation/refresh.
    if (seen || reducedMotion) {
      try { sessionStorage.setItem(KEY, "1"); } catch (_) {}
      return;
    }

    const html = `
      <section id="${ID}" role="dialog" aria-modal="true" aria-label="Welcome to Praveen Kumar's portfolio">
        <canvas class="dg-particles" aria-hidden="true"></canvas>
        <div class="dg-center">
          <div class="dg-gateway" aria-hidden="true">
            <div class="dg-arch"></div><div class="dg-floor"></div>
          </div>
          <p class="dg-eyebrow">Portfolio · Data · Insight</p>
          <h1 class="dg-name">Praveen Kumar</h1>
          <p class="dg-tagline">Analytics&nbsp; / &nbsp;Strategy&nbsp; / &nbsp;Impact</p>
        </div>
        <button class="dg-skip" type="button">Skip intro <span aria-hidden="true">↗</span></button>
      </section>`;
    document.body.insertAdjacentHTML("beforeend", html);

    const overlay = document.getElementById(ID);
    const canvas = overlay.querySelector(".dg-particles");
    const ctx = canvas.getContext("2d", { alpha: true });
    const skip = overlay.querySelector(".dg-skip");
    let w = 0, h = 0, dpr = 1, particles = [], raf = 0, finished = false;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(65, Math.max(22, Math.round(w * h / 20000)));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
        r: Math.random() * 1.2 + .35, alpha: Math.random() * .4 + .13
      }));
    }
    function draw() {
      if (finished) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -3) p.x = w + 3; if (p.x > w + 3) p.x = -3;
        if (p.y < -3) p.y = h + 3; if (p.y > h + 3) p.y = -3;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,218,69,${p.alpha})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j], dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,218,69,${(1 - dist / 100) * .1})`;
            ctx.lineWidth = .6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    function finish() {
      if (finished) return;
      finished = true; cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", onKeydown);
      try { sessionStorage.setItem(KEY, "1"); } catch (_) {}
      overlay.classList.add("dg-exit");
      window.setTimeout(() => overlay.remove(), 420);
    }
    function onKeydown(event) { if (event.key === "Escape") finish(); }

    skip.addEventListener("click", finish);
    document.addEventListener("keydown", onKeydown);
    resize(); draw();
    window.addEventListener("resize", resize, { passive: true });
    window.setTimeout(finish, DURATION);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else init();
})();
