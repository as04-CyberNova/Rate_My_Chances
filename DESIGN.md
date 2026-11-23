# Design System & UX Specification (DESIGN.md)
## Rate My Chances — Design System (Bento Grid + Glassmorphic / Claymorphic UI)

---

### 1. Visual Direction & Styling Philosophy
- **Layout Architecture**: **Bento Grid** — Modular, content-first cards organized in balanced multi-span rows with tight visual harmony.
- **Surfaces & Cards**: **Glassmorphism** — Translucent surfaces with frosted backdrop blur (`backdrop-blur-xl`), soft white gradient borders (`border border-white/40`), subtle interior highlights, and layered depth.
- **Buttons & Interactive Elements**: **Claymorphism** — Tactile, friendly 3D pill and rounded button shapes featuring dual inner highlights and soft diffuse exterior drop shadows that depress realistically on tap/click.
- **Typography**: **Minimalism** — Clean, geometric sans-serif (Inter / system fallback), airy tracking, restrained weights (Light/Regular body, Bold/Black metrics), ample whitespace, zero clutter.
- **Motion & Animations**: **Material & Fluent Design** — Natural cubic bezier physics (`cubic-bezier(0.2, 0.0, 0, 1.0)` / `ease-out`), responsive surface ripples, smooth spring gauges, and elevation shifts on hover.

---

### 2. Design Tokens & Styling Primitives

#### 2.1 Glassmorphic Cards Token Rules
```css
/* Light Mode Frosted Glass Surface */
.glass-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05), 
              0 1px 3px 0 rgba(0, 0, 0, 0.03),
              inset 0 1px 1px 0 rgba(255, 255, 255, 0.8);
  border-radius: 1.5rem; /* 24px */
}

/* Dark/Roast Glass Surface */
.glass-card-dark {
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
  border-radius: 1.5rem;
}
```

#### 2.2 Claymorphic Buttons Token Rules
```css
/* Primary Clay Button (Electric Blue) */
.clay-btn-primary {
  background: linear-gradient(145deg, #2f65ff, #1d4ed8);
  color: #ffffff;
  border-radius: 1rem; /* 16px */
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 18px -4px rgba(36, 91, 255, 0.45),
              inset 2px 2px 4px 0 rgba(255, 255, 255, 0.45),
              inset -2px -2px 4px 0 rgba(0, 0, 0, 0.25);
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.clay-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -4px rgba(36, 91, 255, 0.55),
              inset 2px 2px 5px 0 rgba(255, 255, 255, 0.55),
              inset -2px -2px 4px 0 rgba(0, 0, 0, 0.25);
}

.clay-btn-primary:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 4px 8px -2px rgba(36, 91, 255, 0.35),
              inset 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
}

/* Secondary / Pill Clay Button */
.clay-pill {
  background: linear-gradient(145deg, #ffffff, #f1f5f9);
  color: #1e293b;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.08),
              inset 1.5px 1.5px 3px 0 rgba(255, 255, 255, 0.9),
              inset -1.5px -1.5px 3px 0 rgba(0, 0, 0, 0.05);
}
```

---

### 3. Bento Grid Specification

The Assessment Overview is arranged as an asymmetric, highly legible Bento Grid:
- **Cell A (Span 4)**: Chance Score Radial Gauge Hero with Confidence Indicator.
- **Cell B (Span 8)**: Candidate Status & Target Company Brief with Key Readiness Metrics.
- **Cell C (Span 7)**: Skill Gap Matrix (Signals vs. Gaps) with Glassmorphic Badges.
- **Cell D (Span 5)**: Salary Predictor & Growth Potential Band.
- **Cell E (Span 6)**: Industry Benchmark Comparison (You vs. Average Hire).
- **Cell F (Span 6)**: Alternative High-Fit Companies.
- **Full Width**: Action Roadmap with expandable timeline milestones.
