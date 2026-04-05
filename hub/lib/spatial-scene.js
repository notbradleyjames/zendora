// Spatial Neural Network Scene — Zendora Hub
// Vexel-inspired 3D particle background with depth, connections, and mouse parallax

const CONFIG = {
  particleCount: 70,
  nodeCount: 6,
  maxConnectDist: 160,
  mouseStrength: 0.025,
  depthRange: 900,
  trailOpacity: 0.13,
  fov: 550,
};

const COLORS = {
  particles: [
    'rgba(106, 17, 203, ',   // purple
    'rgba(37, 117, 252, ',   // blue
    'rgba(12, 210, 240, ',   // cyan
    'rgba(255, 107, 53, ',   // orange — Zendora brand
    'rgba(200, 200, 255, ',  // soft white-blue
  ],
  nodes: [
    'rgba(255, 107, 53, ',   // orange
    'rgba(106, 17, 203, ',   // purple
    'rgba(37, 117, 252, ',   // blue
  ],
};

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeParticle(w, h, isNode = false) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * CONFIG.depthRange,
    vx: (Math.random() - 0.5) * (isNode ? 0.15 : 0.3),
    vy: (Math.random() - 0.5) * (isNode ? 0.08 : 0.18),
    vz: (Math.random() - 0.5) * (isNode ? 0.3 : 0.5),
    size: isNode ? Math.random() * 4 + 3 : Math.random() * 1.8 + 0.4,
    color: isNode ? randomFrom(COLORS.nodes) : randomFrom(COLORS.particles),
    baseOpacity: isNode ? 0.85 : Math.random() * 0.55 + 0.2,
    pulse: Math.random() * Math.PI * 2,
    isNode,
  };
}

class SpatialScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -9999, y: -9999 };
    this.running = true;
    this._raf = null;
    this._reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._onResize = () => this._resize();
    this._onMouse = (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; };

    this._resize();
    this._createParticles();
    this._bindEvents();

    if (this._reducedMotion) {
      this._drawStatic();
    } else {
      this._tick();
    }
  }

  _resize() {
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
  }

  _createParticles() {
    this.particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      this.particles.push(makeParticle(this.w, this.h, false));
    }
    for (let i = 0; i < CONFIG.nodeCount; i++) {
      this.particles.push(makeParticle(this.w, this.h, true));
    }
  }

  _bindEvents() {
    window.addEventListener('resize', this._onResize);
    window.addEventListener('mousemove', this._onMouse);
  }

  _project(x, y, z) {
    const scale = CONFIG.fov / (CONFIG.fov + z);
    return {
      px: (x - this.w / 2) * scale + this.w / 2,
      py: (y - this.h / 2) * scale + this.h / 2,
      scale,
    };
  }

  _update() {
    for (const p of this.particles) {
      // Mouse repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 90000) { // within 300px
        const dist = Math.sqrt(distSq);
        const force = CONFIG.mouseStrength * (1 - dist / 300);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // Drift
      p.vx += (Math.random() - 0.5) * 0.015;
      p.vy += (Math.random() - 0.5) * 0.008;

      // Velocity integration with damping
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.vx *= 0.978;
      p.vy *= 0.978;
      p.vz *= 0.988;

      // Pulse
      p.pulse += 0.018;

      // Wrap edges
      if (p.x < -80) p.x = this.w + 80;
      else if (p.x > this.w + 80) p.x = -80;
      if (p.y < -80) p.y = this.h + 80;
      else if (p.y > this.h + 80) p.y = -80;
      if (p.z < 0) p.z = CONFIG.depthRange;
      else if (p.z > CONFIG.depthRange) p.z = 0;
    }
  }

  _draw() {
    const { ctx, w, h } = this;

    // Trail — partial clear for motion blur effect
    ctx.fillStyle = `rgba(8, 6, 14, ${CONFIG.trailOpacity})`;
    ctx.fillRect(0, 0, w, h);

    // Sort back-to-front for depth
    const sorted = [...this.particles].sort((a, b) => b.z - a.z);

    // Connections
    for (let i = 0; i < sorted.length; i++) {
      const a = sorted[i];
      const pa = this._project(a.x, a.y, a.z);

      for (let j = i + 1; j < sorted.length; j++) {
        const b = sorted[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = (a.z - b.z) * 0.15;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist >= CONFIG.maxConnectDist) continue;

        const pb = this._project(b.x, b.y, b.z);
        const opacity = (1 - dist / CONFIG.maxConnectDist) * 0.28;
        const depthFade = 1 - ((a.z + b.z) / 2) / CONFIG.depthRange * 0.65;

        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.strokeStyle = a.color + opacity * depthFade + ')';
        ctx.lineWidth = pa.scale * 0.6;
        ctx.stroke();
      }
    }

    // Particles
    for (const p of sorted) {
      const proj = this._project(p.x, p.y, p.z);
      const depthFade = 1 - p.z / CONFIG.depthRange * 0.72;
      const pulseMod = p.isNode ? Math.sin(p.pulse) * 1.2 : 0;
      const r = Math.max(0.4, (p.size + pulseMod) * proj.scale);
      const alpha = p.baseOpacity * depthFade;

      if (p.isNode) {
        // Outer glow halo
        const glow = ctx.createRadialGradient(proj.px, proj.py, 0, proj.px, proj.py, r * 7);
        glow.addColorStop(0, p.color + alpha * 0.6 + ')');
        glow.addColorStop(0.4, p.color + alpha * 0.15 + ')');
        glow.addColorStop(1, p.color + '0)');
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, r * 7, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(proj.px, proj.py, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha + ')';
      ctx.fill();
    }
  }

  _drawStatic() {
    const { ctx, w, h } = this;
    ctx.fillStyle = 'rgb(8, 6, 14)';
    ctx.fillRect(0, 0, w, h);
    // Draw a still frame for reduced motion
    this._update();
    this._draw();
  }

  _tick() {
    if (!this.running) return;
    this._update();
    this._draw();
    this._raf = requestAnimationFrame(() => this._tick());
  }

  destroy() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('mousemove', this._onMouse);
  }
}

export { SpatialScene };
