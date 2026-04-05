// ============================================================
// VEXEL AI — main.js
// HD starfield background + scroll/interaction behaviors
// ============================================================

// ---------- HD Starfield Canvas ----------

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const DPR = window.devicePixelRatio || 1;
let W, H;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width  = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(DPR, DPR);
  initStars();
}

// Star pool
const STAR_COUNT = 320;
const stars = [];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function initStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) {
    // Size tiers: most tiny, a handful prominent
    const tier = Math.random();
    let radius, baseOpacity;
    if (tier > 0.97) {
      // Bright foreground stars (~3%)
      radius      = rand(1.4, 2.2);
      baseOpacity = rand(0.75, 1.0);
    } else if (tier > 0.85) {
      // Mid stars (~12%)
      radius      = rand(0.7, 1.3);
      baseOpacity = rand(0.45, 0.75);
    } else {
      // Distant pinpoints (~85%)
      radius      = rand(0.2, 0.65);
      baseOpacity = rand(0.15, 0.45);
    }

    stars.push({
      x:           rand(0, W),
      y:           rand(0, H),
      radius,
      baseOpacity,
      opacity:     baseOpacity,
      // Twinkle params — slow, subtle, each star out of phase
      twinkleSpeed: rand(0.0004, 0.0018),
      twinkleAmp:   rand(0.04, 0.18) * baseOpacity,
      phase:        rand(0, Math.PI * 2),
      // Tiny drift for depth illusion
      vx: rand(-0.008, 0.008),
      vy: rand(-0.004, 0.004),
    });
  }
}

let t = 0;

function drawStars() {
  t++;
  requestAnimationFrame(drawStars);

  ctx.clearRect(0, 0, W, H);

  for (const s of stars) {
    // Twinkle — smooth sine oscillation
    s.opacity = s.baseOpacity + Math.sin(t * s.twinkleSpeed * 60 + s.phase) * s.twinkleAmp;
    s.opacity = Math.max(0.02, Math.min(1, s.opacity));

    // Slow drift, wrap at edges
    s.x += s.vx;
    s.y += s.vy;
    if (s.x < 0)  s.x = W;
    if (s.x > W)  s.x = 0;
    if (s.y < 0)  s.y = H;
    if (s.y > H)  s.y = 0;

    // Sharp crisp point — no blur, just a tight radial gradient for the
    // brightest stars to give a natural diffraction glow
    if (s.radius > 1.2) {
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3.5);
      glow.addColorStop(0,   `rgba(255,255,255,${s.opacity})`);
      glow.addColorStop(0.35,`rgba(255,255,255,${s.opacity * 0.4})`);
      glow.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }

    // Solid crisp core
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  }
}

resize();
window.addEventListener('resize', () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale before resize reapplies it
  resize();
});

drawStars();

// ---------- Navbar scroll behavior ----------

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- Mobile menu ----------

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---------- Scroll reveal ----------

const revealEls = document.querySelectorAll(
  '.hero-tag, .hero-title, .hero-description, .btn-primary, ' +
  '.about-text, .about-line, ' +
  '.features-title, .features-sub, .feature-card, ' +
  '.usecases-title, .usecases-line, ' +
  '.cta-title, .btn-outline, .cta-avatars, .cta-footer'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger siblings within same parent
  const siblings = [...el.parentElement.children].filter((c) =>
    c.classList.contains('reveal')
  );
  const siblIdx = siblings.indexOf(el);
  if (siblIdx > 0 && siblIdx <= 4) {
    el.classList.add(`reveal-delay-${siblIdx}`);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));
