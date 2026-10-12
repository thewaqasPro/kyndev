# 2.5D Projects Gallery (V1: Full 3D Card Tilt) &bull; Component V2

> **AI Agent Reference & Architecture Guide**  
> Component Path: `src/v2/components/Projects/`  
> Live Preview Route: `/preview/projects`  
> Variant: Full 3D Perspective Card Tilt

---

## 1. Overview & Visual Effects

The **Projects Gallery V1** component provides a perspective 3D card tilt gallery. When a user interacts with a card, the entire card container rotates smoothly in 3D perspective space following the mouse cursor, accompanied by a dynamic specular reflection shine and a 2.5D depth-displaced image shader.

### Key Interactive Features
- **Full 3D Hover Tilt**: The outer card frame executes real-time 3D rotation (`rotateX`, `rotateY`, `translateZ`) in response to cursor position.
- **Specular Radial Shine**: Dynamic radial gradient tracks pointer coordinates, simulating realistic surface light reflectance.
- **Slot-Machine Character Reels**: Card titles use a drum slot-machine roll animation on hover, rolling characters forward and reversing on leave with word-boundary preservation.
- **Tag Ticker Scramble**: Project categories execute a character-by-character alphanumeric decoding effect on hover.
- **WebGL Depth Raymarching**: Shaders raymarch against high-resolution depth textures (`/assets/projects/{slug}/home_depth.webp`) to create a 2.5D parallax effect.

---

## 2. File Structure & Responsibilities

| File | Type | Primary Responsibility |
| :--- | :--- | :--- |
| [`ProjectsGallery.astro`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/ProjectsGallery.astro) | Astro Component | Gallery layout, header count & badge, 2-column asymmetric grid, and controller mounting. |
| [`ProjectCard.astro`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/ProjectCard.astro) | Astro Component | Card markup: `.v2-card-main`, base `<img>`, WebGL `<canvas>`, `.v2-card-shine`, and footer metadata. |
| [`CardController.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/CardController.ts) | TypeScript | Drives 3D transform matrix, pointer tracking, hover state, audio triggers, and WebGL lifecycle. |
| [`ProjectsShader.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/ProjectsShader.ts) | TypeScript | 12-sample parallax raymarching, 6-sample bokeh blur, and singleton `CardContextPool` (max 4 contexts). |
| [`ProjectsTextAnim.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/ProjectsTextAnim.ts) | TypeScript | Word-grouped SplitType slot reel and tag scramble decoders. |
| [`projects.css`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/projects.css) | CSS | Asymmetric 2-column staggering (even cards offset downwards by `4rem`) and 3D card styles. |

---

## 3. Tilt Mathematics & Shaders

### 3D Card Tilt Transform
- Normalized Device Coordinates (NDC) calculated from mouse position within the card:
  $$\text{ndcX} = \frac{x - 0.5 \cdot W}{0.5 \cdot W} \in [-1, 1], \quad \text{ndcY} = \frac{y - 0.5 \cdot H}{0.5 \cdot H} \in [-1, 1]$$
- Applied 3D matrix transform:
  $$\text{rotX} = -\text{ndcY} \cdot 9.5^\circ, \quad \text{rotY} = \text{ndcX} \cdot 12^\circ, \quad \text{translateZ} = 14\text{px}$$
- Transition: Smooth cubic bezier `0.18s cubic-bezier(0.16, 1, 0.3, 1)`.

### WebGL Parallax Shader
- Raymarching loop (12 steps):
  $$\vec{P}_{i+1} = \vec{P}_i + \vec{D}_{\text{step}} \cdot (Z_{\text{depth}} - 0.5)$$
- Context management: Only cards near or inside the viewport receive an active WebGL context via `CardContextPool` (capped to 4 active contexts to strictly avoid Chrome's 16-context limit).

---

## 4. Integration & Usage

```astro
---
import ProjectsGallery from '../../v2/components/Projects/ProjectsGallery.astro';
---

<div class="gallery-wrapper">
  <ProjectsGallery limit={6} />
</div>
```

---

## 5. AI Agent Prompt Cheatsheet

| Desired Change | Target File | What to Edit |
| :--- | :--- | :--- |
| **Increase / Decrease 3D Tilt Intensity** | `CardController.ts` | In `onPointerMove()`, change rotation multipliers (`9.5` and `12`) |
| **Make Card Pop Out More on Hover** | `CardController.ts` | In `onPointerMove()`, increase `translate3d(..., 14px)` |
| **Change Card Aspect Ratio** | `projects.css` | In `.v2-card-main`, change `aspect-ratio: 16 / 10` |
| **Change Even Card Vertical Stagger** | `projects.css` | In `.v2-project-card:nth-child(even)`, change `margin-top: 4rem` |
| **Speed Up or Slow Down Slot Text Reel** | `ProjectsTextAnim.ts` | Adjust `delay = index * 20ms` and `transition: 0.55s` |
| **Adjust 2.5D Depth Displacement Strength**| `ProjectsShader.ts` | In `FRAGMENT_SHADER`, adjust `mix(0.015, 0.048, u_hover)` |
