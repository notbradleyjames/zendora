# Hub Redesign: Vexel Spatial + macOS Folder Browser (Hybrid)

> **Status**: Planning | **Reference**: Vexel AI (`https://vexel.peachworlds.com/`) + Current hub v1

---

## Overview

**Goal**: Merge Vexel's spatial 3D design language with the current macOS folder browser hub, creating an intelligent, minimal interface that feels both functional and futuristic.

**Why**: 
- Current hub is functional but visually static
- Vexel demonstrates AI brand identity through spatial design
- Hybrid approach keeps Zendora's folder navigation (core UX) while adding depth & intelligence

---

## Design Principles

### From Vexel
- **Spatial depth** — Elements exist in 3D space, not flat layers
- **Minimal interaction** — Hover/scroll triggers subtle transformations
- **AI-first aesthetic** — Dark backgrounds, accent colors, glowing elements
- **Adaptive architecture** — UI responds to user intent and context

### Keep From Current Hub
- **Folder browser UX** — Sidebar navigation + grid view (proven for Zendora use)
- **Glassmorphism** — Frosted glass effect for window
- **Color-coded folders** — Each service pillar has distinct gradient
- **Dark mode native** — Zendora brand alignment

---

## Technical Components

### 1. **3D Background Scene** (Replaces Blob Animations)

**Current**: 
```css
.blob { filter: blur(100px); animation: float 20s infinite; }
```

**New**:
- Three.js or Babylon.js for WebGL 3D scene
- Floating geometric shapes that respond to mouse position
- Subtle particle effects suggesting neural networks / connections
- Parallax effect as window scrolls
- Maintains performance with GPU acceleration

**Key metrics**:
- Low poly count (< 5k triangles)
- 60fps target
- Preload during page load, render on demand

---

### 2. **Spatial Folder Icons** (Extends Current 3D Folder UI)

**Current**: 
```css
.folder-icon { /* 2D perspective folder with front/back */ }
```

**New**:
- Add true 3D transform on hover: `perspective(1000px) rotateX(-10deg) rotateY(15deg)`
- Shadow depth that changes with mouse position
- Glow effect on hover (rgba accent color)
- Smooth easing: `cubic-bezier(0.25, 1, 0.5, 1)`

```css
.grid-item:hover .folder-icon {
  transform: perspective(1200px) rotateX(-8deg) rotateY(12deg) translateZ(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 
              0 0 30px rgba(var(--accent-rgb), 0.3);
  filter: brightness(1.1);
}
```

---

### 3. **Neural Network Accent Pattern** (Visual Intelligence Cue)

Add subtle animated SVG lines connecting folder icons when hovering over a section:
- Thin lines with gradient colors
- Animated dashes that flow
- Opacity: 0.2 default, 0.5 on hover
- Communicates interconnected workflows

**Trigger**: `section-title:hover` or on sidebar hover

---

### 4. **Scroll-Triggered Depth** (Spatial Adaptation)

As user scrolls through files:
- Content area items have increasing z-depth
- Sidebar slightly pulls back with parallax offset
- Window shadow intensifies/softens based on scroll position
- Breadcrumb changes opacity and scale

```javascript
// Pseudocode
window.addEventListener('scroll', (e) => {
  const offset = e.target.scrollTop;
  contentArea.style.transform = `translateZ(${offset * 0.2}px)`;
  sidebar.style.transform = `translateZ(-${offset * 0.1}px)`;
});
```

---

### 5. **Loading State (Vexel Reference)**

Integrate Vexel's circular progress bar design:
- SVG circular progress indicator
- Smooth easing: `_pwLoadingProgressEasing` (cubic bezier acceleration)
- Percentage display
- Zendora logo in center
- Glassmorphic loading overlay

---

### 6. **Navigation Transitions**

**Current**: Simple opacity/background changes
**New**: 
- Sidebar items scale and rotate slightly on hover
- Active item glows with accent color
- Breadcrumb title slides down with fade when changing sections
- Grid items have staggered entrance animation on load

---

## Color & Typography

### Palette (From Current Hub + Vexel Dark Mode)
```css
:root {
  --bg-dark: #0a0e1a;        /* Vexel-inspired dark */
  --window-bg: rgba(15, 15, 20, 0.8);
  --accent-glow: #6366f1;    /* Indigo glow */
  --accent-secondary: #ec4899; /* Pink accent */
  
  /* Keep existing folder gradients */
  --folder-ai: linear-gradient(135deg, #FF6B35 0%, #F77F00 100%);
  --folder-design: linear-gradient(135deg, #c471ed 0%, #f64f59 100%);
  /* ... rest unchanged ... */
}
```

### Typography
- **Headings**: Inter 700, letter-spacing: -0.5px (keep current)
- **Body**: Inter 400, 13px (keep current)
- **Accent text**: Inter 600 with glow effect on hover

---

## Animation Easing & Timing

| Element | Duration | Easing |
|---|---|---|
| Folder hover | 300ms | `cubic-bezier(0.25, 1, 0.5, 1)` |
| Sidebar active | 200ms | `ease-out` |
| Window shadow | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| 3D bg scene | Continuous | Custom easing per shape |
| Scroll parallax | Real-time | Linear |
| Loading progress | 50ms steps | Easing function (Vexel style) |

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Replace blob background with Three.js 3D scene
- [ ] Add perspective + transform effects to folder icons
- [ ] Enhance hover states (glow, shadow, scale)
- [ ] Update color palette (darker background)

### Phase 2: Polish (Week 2)
- [ ] Add neural network accent pattern (SVG lines)
- [ ] Implement scroll-triggered parallax depth
- [ ] Update loading state design
- [ ] Refine animation timing

### Phase 3: Optional (Week 3)
- [ ] Mouse tracking for background elements
- [ ] Animated hero section (on first load)
- [ ] Smooth page transitions between sections
- [ ] Accessibility improvements (prefers-reduced-motion)

---

## File Structure

```
hub/
├── index.html           (Update markup for 3D scene)
├── main.js              (ES modules, 3D scene logic)
├── style.css            (Enhanced with 3D transforms)
├── lib/
│   ├── three.min.js     (3D library)
│   └── spatial-scene.js (Custom 3D background)
└── package.json         (Add three.js dependency)
```

---

## Performance Targets

| Metric | Target | Notes |
|---|---|---|
| LCP | < 2s | 3D scene preloads async |
| FCP | < 1s | Critical CSS inline |
| CLS | 0 | No layout shift on load |
| FPS | 60 | GPU-accelerated transforms |
| Bundle | < 500kb | Three.js min + gzip |

---

## Accessibility

- [ ] `prefers-reduced-motion` disables animations
- [ ] High contrast mode support
- [ ] Keyboard navigation (Tab through folders, arrow keys)
- [ ] ARIA labels for sidebar items
- [ ] Loading spinner has role="progressbar"

---

## References

- **Current hub**: `portfolios/references/hub-v1-macos-folder-browser/`
- **Vexel design**: `https://vexel.peachworlds.com/`
- **Three.js docs**: `https://threejs.org/`
- **Vexel HTML structure**: Large spatial-first layout with 3D model integration

---

**Next Steps**: 
1. Get approval on design direction
2. Start Phase 1 implementation
3. Test 3D performance on target devices
4. Gather feedback from Zendora team
