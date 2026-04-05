// ============================================================
// VEXEL AI — main.js
// 3D canvas background + scroll/interaction behaviors
// ============================================================

// ---------- 3D Canvas: Rotating Wireframe Object ----------

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let W, H, cx, cy;
let mouseX = 0, mouseY = 0;
let targetRotX = 0, targetRotY = 0;
let rotX = 0, rotY = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  cx = W / 2;
  cy = H / 2;
}
resize();
window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / W - 0.5) * 2;
  mouseY = (e.clientY / H - 0.5) * 2;
});

// Build icosphere-like wireframe geometry
function buildGeometry() {
  const verts = [];
  const edges = [];

  // Outer ring — horizontal circles at different latitudes
  const rings = [
    { y: -0.85, r: 0.52, n: 8 },
    { y: -0.45, r: 0.88, n: 12 },
    { y:  0.00, r: 1.00, n: 16 },
    { y:  0.45, r: 0.88, n: 12 },
    { y:  0.85, r: 0.52, n: 8 },
  ];

  const ringStart = [];

  for (const ring of rings) {
    ringStart.push(verts.length);
    for (let i = 0; i < ring.n; i++) {
      const angle = (i / ring.n) * Math.PI * 2;
      verts.push([
        Math.cos(angle) * ring.r,
        ring.y,
        Math.sin(angle) * ring.r,
      ]);
    }
  }

  // Connect within each ring
  for (let ri = 0; ri < rings.length; ri++) {
    const start = ringStart[ri];
    const n = rings[ri].n;
    for (let i = 0; i < n; i++) {
      edges.push([start + i, start + (i + 1) % n]);
    }
  }

  // Connect between adjacent rings (vertical struts)
  for (let ri = 0; ri < rings.length - 1; ri++) {
    const startA = ringStart[ri];
    const nA = rings[ri].n;
    const startB = ringStart[ri + 1];
    const nB = rings[ri + 1].n;
    const step = nB / nA;
    for (let i = 0; i < nA; i++) {
      const j = Math.round(i * step) % nB;
      edges.push([startA + i, startB + j]);
    }
  }

  // Top & bottom poles
  verts.push([0, -1.15, 0]); // top pole
  const topPole = verts.length - 1;
  verts.push([0,  1.15, 0]); // bottom pole
  const botPole = verts.length - 1;

  for (let i = 0; i < rings[0].n; i++) {
    edges.push([topPole, ringStart[0] + i]);
  }
  for (let i = 0; i < rings[4].n; i++) {
    edges.push([botPole, ringStart[4] + i]);
  }

  // Inner core lines (sparse)
  const innerVerts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const iv = verts.length;
    verts.push([Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]);
    innerVerts.push(iv);
  }
  for (let i = 0; i < innerVerts.length; i++) {
    edges.push([innerVerts[i], innerVerts[(i + 1) % innerVerts.length]]);
    edges.push([innerVerts[i], topPole]);
    edges.push([innerVerts[i], botPole]);
  }

  return { verts, edges };
}

const geo = buildGeometry();
const SCALE = Math.min(window.innerWidth, window.innerHeight) * 0.28;

// Matrix multiply helpers
function rotateX(p, a) {
  const [x, y, z] = p;
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function rotateY(p, a) {
  const [x, y, z] = p;
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}

function project(p, scale, ox, oy) {
  const fov = 3.5;
  const z = p[2] + fov;
  const px = (p[0] / z) * scale + ox;
  const py = (p[1] / z) * scale + oy;
  return { x: px, y: py, z: p[2] };
}

let autoRot = 0;
let frame = 0;

function draw() {
  frame++;
  requestAnimationFrame(draw);

  ctx.clearRect(0, 0, W, H);

  // Ease rotation toward mouse
  targetRotY = mouseX * 0.6;
  targetRotX = mouseY * 0.4;
  rotX += (targetRotX - rotX) * 0.04;
  rotY += (targetRotY - rotY) * 0.04;
  autoRot += 0.004;

  const scale = Math.min(W, H) * 0.28;
  const offsetX = W * 0.62;
  const offsetY = H * 0.5;

  // Transform vertices
  const projected = geo.verts.map((v) => {
    let p = [...v];
    p = rotateY(p, autoRot + rotY);
    p = rotateX(p, rotX);
    return project(p, scale, offsetX, offsetY);
  });

  // Draw edges
  for (const [a, b] of geo.edges) {
    const pa = projected[a];
    const pb = projected[b];

    // Depth-based opacity: fade edges behind center
    const avgZ = (pa.z + pb.z) / 2;
    const opacity = Math.max(0.04, Math.min(0.55, (avgZ + 1.4) / 2.8));

    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  // Draw nodes
  for (const p of projected) {
    const opacity = Math.max(0.05, Math.min(0.9, (p.z + 1.4) / 2.8));
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  }

  // Subtle blue glow at center of object
  const grad = ctx.createRadialGradient(offsetX, offsetY, 0, offsetX, offsetY, scale * 0.8);
  grad.addColorStop(0, 'rgba(26, 108, 255, 0.06)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(offsetX - scale, offsetY - scale, scale * 2, scale * 2);
}

draw();

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
