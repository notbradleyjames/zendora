// ============================================================
// ZENDORA — main.js
// HD starfield + navbar + mobile menu + scroll reveal
// ============================================================

// ---------- HD Starfield ----------
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

const STAR_COUNT = 320;
const stars = [];
function rand(min, max) { return min + Math.random() * (max - min); }

function initStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) {
    const tier = Math.random();
    let radius, baseOpacity;
    if (tier > 0.97)      { radius = rand(1.4, 2.2); baseOpacity = rand(0.75, 1.0); }
    else if (tier > 0.85) { radius = rand(0.7, 1.3); baseOpacity = rand(0.45, 0.75); }
    else                  { radius = rand(0.2, 0.65); baseOpacity = rand(0.15, 0.45); }
    stars.push({
      x: rand(0, W), y: rand(0, H), radius, baseOpacity,
      opacity: baseOpacity,
      twinkleSpeed: rand(0.0004, 0.0018),
      twinkleAmp:   rand(0.04, 0.18) * baseOpacity,
      phase: rand(0, Math.PI * 2),
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
    s.opacity = s.baseOpacity + Math.sin(t * s.twinkleSpeed * 60 + s.phase) * s.twinkleAmp;
    s.opacity = Math.max(0.02, Math.min(1, s.opacity));
    s.x += s.vx; s.y += s.vy;
    if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
    if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;

    if (s.radius > 1.2) {
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3.5);
      glow.addColorStop(0,    `rgba(255,255,255,${s.opacity})`);
      glow.addColorStop(0.35, `rgba(255,255,255,${s.opacity * 0.4})`);
      glow.addColorStop(1,    'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  }
}

resize();
window.addEventListener('resize', () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  resize();
});
drawStars();

// ---------- Navbar ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---------- Mobile Menu ----------
const menuToggle = document.getElementById('menu-toggle');
const menuClose  = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
menuClose.addEventListener('click',  () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---------- Scroll Reveal ----------
const revealEls = document.querySelectorAll(
  '.hero-tag, .hero-title, .hero-desc, .hero-actions, .hero-stats, .player-card, ' +
  '.section-title, .see-all, .section-tag, ' +
  '.album-card, .feature-card, .artist-card, .pricing-card, ' +
  '.footer-logo, .footer-tagline, .footer-copy'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0 && idx <= 3) el.classList.add(`reveal-delay-${idx}`);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));
