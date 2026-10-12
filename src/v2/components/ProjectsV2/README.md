# 2.5D Projects Gallery (V2: Image Card Scale & Triggered Entrance) &bull; Component V2

> **AI Agent Reference & Architecture Guide**  
> Component Path: `src/v2/components/ProjectsV2/`  
> Live Preview Route: `/preview/projects-v2`  
> Variant: Viewport-Triggered Image Card Asymmetric 4-Corner Scaling

---

## 1. Overview & Visual Effects

The **Projects Gallery V2** component provides a stationary frame with a viewport-triggered, asymmetric 4-corner scale-up entrance animation. Unlike V1 (where the entire card tilts on mouse hover), in V2 the outer card container and footer content stay stationary, while the **image card viewport (`.v2-card-viewport`)** executes a cinematic entrance animation.

### Key Interactive Features
- **Viewport-Triggered (Time-Based) Entrance**: Once a card enters the viewport, it triggers an autonomous ~1.35s `expoOut` animation that completes smoothly on its own, independent of whether the user scrolls fast, slow, or stops.
- **Asymmetric 4-Corner / 4-Side Dynamic Scaling**:
  - Width and height expand with different non-linear curves (sublinear horizontal vs. superlinear vertical expansion).
  - 3D perspective pitch (`rotateX`), yaw (`rotateY`), and skew ensure that all four corners and all four sides scale at different rates and speeds.
  - Transform-origin shifts dynamically based on column parity (left vs. right).
- **Directional Side Glide**: Left-column cards glide in from the right (`+44px`), and right-column cards glide in from the left (`-44px`).
- **Internal Mouse Lens Shift**: Cursor hover causes the inner layer (`.v2-card-inner-layer`) to shift subtly inside the viewport (`10px` X / `8px` Y), while WebGL 2.5D depth raymarching displaces pixels in 3D.
- **Slot Reel & Tag Scramble**: Hover triggers word-grouped slot machine reels on title and ticker decode on tags.

---

## 2. File Structure & Responsibilities

| File | Type | Primary Responsibility |
| :--- | :--- | :--- |
| [`ProjectsGalleryV2.astro`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/ProjectsGalleryV2.astro) | Astro Component | Layout wrapper, projects mapping, and instantiating `ProjectCardControllerV2(card, index)`. |
| [`ProjectCardV2.astro`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/ProjectCardV2.astro) | Astro Component | Card markup: stationary `.v2-project-card-v2`, animated `.v2-card-viewport`, and clean `.v2-card-footer`. |
| [`CardControllerV2.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/CardControllerV2.ts) | TypeScript | Drives viewport entrance timer, `expoOut` calculations, 4-corner scale matrix, and inner lens shift. |
| [`ProjectsShaderV2.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/ProjectsShaderV2.ts) | TypeScript | 2.5D depth raymarching shader with corner-weighted zoom and singleton context pool (max 4 contexts). |
| [`projectsV2.css`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/projectsV2.css) | CSS | Scoped styling with `perspective: 1400px` on card container, 3D preserve on viewport, and bleed margins. |

---

## 3. Mathematical Specifications & Dynamics

### Time-Based Viewport Entrance
- Triggered by `IntersectionObserver` (threshold `0.08`, root margin `60px`).
- Elapsed time normalized:
  $$t = \min\left(1.0, \frac{\text{now} - \text{startTime}}{\text{duration}}\right)$$
- Exponential Ease Out Curve (matching original Kyndev `ease.expoOut`):
  $$\text{eased}(t) = 1 - 2^{-10t} \quad (\text{if } t < 1.0, \text{ else } 1.0)$$

### Asymmetric 4-Side Scale Equations
- Horizontal Scale (sublinear expansion, expands rapidly first):
  $$\text{scaleX} = 0.76 + 0.28 \cdot \text{eased}^{0.75}$$
- Vertical Scale (superlinear expansion, catches up towards the end):
  $$\text{scaleY} = 0.72 + 0.32 \cdot \text{eased}^{1.40}$$
- Result: At mid-transition ($\text{eased} = 0.5$), $\text{scaleX} \approx 0.93$ while $\text{scaleY} \approx 0.84$. The sides expand with completely different ratios!

### 3D Perspective Foreshortening (4-Corner Differentiation)
- 3D Rotations applied to `.v2-card-viewport`:
  $$\text{rotX} = (1 - \text{eased}) \cdot -4.8^\circ, \quad \text{rotY} = (1 - \text{eased}) \cdot 5.4^\circ \cdot \text{dir}$$
  $$\text{rotZ} = (1 - \text{eased}) \cdot 1.8^\circ \cdot \text{dir}, \quad \text{skewX} = (1 - \text{eased}) \cdot 2.2^\circ \cdot \text{dir}$$
- Dynamic transform-origin:
  $$\text{originX} = 50\% + (1 - \text{eased}) \cdot 22\% \cdot \text{dir}, \quad \text{originY} = 50\% + (1 - \text{eased}) \cdot 20\%$$
- Because the transform-origin is offset and the quad is rotated in 3D perspective space, each of the four corners ($(\pm X, \pm Y)$) projects onto the screen along a distinct curve and at a different speed.

---

## 4. Integration & Usage

```astro
---
import ProjectsGalleryV2 from '../../v2/components/ProjectsV2/ProjectsGalleryV2.astro';
---

<div class="gallery-wrapper">
  <ProjectsGalleryV2 limit={6} />
</div>
```

---

## 5. AI Agent Prompt Cheatsheet

| Desired Change | Target File | What to Edit |
| :--- | :--- | :--- |
| **Make Entrance Animation Faster / Slower** | `CardControllerV2.ts` | Change `this.duration` (default: `1.35` seconds) |
| **Increase / Decrease Scale Range** | `CardControllerV2.ts` | Adjust `scaleX` (`0.76 + 0.28`) and `scaleY` (`0.72 + 0.32`) |
| **Adjust Directional Slide Distance** | `CardControllerV2.ts` | In `updateFrame()`, change `offsetX` (`44 * dir`) and `offsetY` (`58`) |
| **Make Hover Elevation Larger** | `CardControllerV2.ts` | In `updateFrame()`, change `hoverScale` (default: `1.025`) |
| **Adjust Mouse Lens Shift Inside Image** | `CardControllerV2.ts` | In `onPointerMove()`, change `ndcX * 10` and `ndcY * 8` |
| **Change WebGL Shader Depth Effect** | `ProjectsShaderV2.ts` | In `FRAGMENT_SHADER`, adjust `mix(0.015, 0.048, u_hover)` |
| **Re-Trigger Animation on Viewport Re-entry**| `CardControllerV2.ts` | Controlled in `initObserver()` (resets `hasTriggered = false` when exiting) |
