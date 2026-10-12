# 🎬 Project Details (V2 Component)

> **Case Study Presentation Track, Dual-Axis Inertial Scroll, Parallax Media Cards & Next-Project Overscroll Transitions**

The **ProjectDetails** component presents a comprehensive case study showcase. It transforms editorial case study assets (high-resolution `.webp` image assets, `.mp4` loop videos, and typography callouts) into a responsive horizontal gliding track on desktop, and an ergonomic vertical gallery on mobile.

---

## 🗂️ Component Manifest

| File | Purpose |
|---|---|
| [`ProjectDetails.astro`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/ProjectDetails.astro) | Astro structural template with dynamic CSS theme custom properties, meta section, media cards, 3D inspection modal, and next-project preview |
| [`ProjectDetailsShader.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/ProjectDetailsShader.ts) | Authentic WebGL `UfxMesh` image shader ported from `deobfuscated.js` lines 14585-14603 (`sdRoundedBox` signed distance field mask, internal UV parallax shift, and film grain) |
| [`ProjectDetailsViewer3D.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/ProjectDetailsViewer3D.ts) | Interactive 3D Product Inspection Showcase with binary `.buf` loader, PBR studio lighting, and inertial orbit controls |
| [`ProjectDetailsController.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/ProjectDetailsController.ts) | Typescript physics engine: Lerp inertial wheel/drag scrolling, WebGL shader updates, video observers, 3D modal management, and overscroll spring transitions |
| [`projectDetails.css`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/projectDetails.css) | Scoped CSS module: Responsive media card framing, 3D modal dialog, atmospheric spotlight, typography, and mobile adaptations |
| [`README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/README.md) | This AI reference document & prompt cheatsheet |

---

## 🎮 Key Features

1. **Dynamic Theming Per Project**:
   Each case study injects its bespoke palette into `--pd-bg`, `--pd-highlight`, `--pd-text`, `--pd-btn-bg`, etc., morphing the entire atmosphere to match the project's brand identity.
2. **Dual-Axis Inertial Scrolling**:
   Converts mouse wheel deltas (horizontal and vertical) into smooth horizontal gliding on desktop using Lerp dampening (`lerp(current, target, 0.09)`).
3. **Grab-to-Pan Mouse Drag Physics**:
   Click-and-drag panning with momentum release flick (`dragVelocity * -250`).
4. **Media Parallax Depth**:
   Internal image/video parallax shift (`shiftX = -offsetNorm * 22px`) as items traverse the viewport center.
5. **Autoplay Video Viewport Intersections**:
   `IntersectionObserver` autoplays muted `.mp4` video cards when in view, and pauses when out of view, with manual play/pause toggle controls.
6. **Next-Project Overscroll Spring**:
   Scrolling past the end of the track fills an overscroll meter (`scaleX(progress)`). Reaching 100% or clicking triggers a transition to the next case study.

---

## 🛠️ AI Prompt Cheatsheet

### 1. Adjust Scroll Speed or Inertia
In [`ProjectDetailsController.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/ProjectDetailsController.ts):
```typescript
// Wheel speed
const speed = 1.35; // Increase for faster glide

// Lerp dampening (smoothness)
this.currentScrollX = lerp(this.currentScrollX, this.targetScrollX, 0.09); // Lower (e.g. 0.06) is silkier
```

### 2. Modify Parallax Intensity
In [`ProjectDetailsController.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/ProjectDetailsController.ts):
```typescript
const shiftX = -offsetNorm * 22; // Increase to 35 for deeper 3D depth
```

### 3. Change Media Card Height & Sizing
In [`projectDetails.css`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectDetails/projectDetails.css):
```css
.v2-pd-media-item {
  height: calc(100vh - 180px);
  max-height: 720px;
  border-radius: 20px;
}
```

---

## 🚀 Live Preview Testbed

- Route: [http://localhost:4321/preview/project-details](http://localhost:4321/preview/project-details)
- Switch projects with the top toolbar: `Porsche: Dream Machine`, `Oryzo AI`, `Infinite Passerella`, `Devin AI`, `Atlas Motion`.
