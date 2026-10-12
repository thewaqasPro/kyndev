# 3D Hero Scene (Jacks Physics) &bull; Component V2

> **AI Agent Reference & Architecture Guide**  
> Component Path: `src/v2/components/Hero/`  
> Live Preview Route: `/preview/hero`  
> Parent Architecture: Kyndev V2 Modular Engine

---

## 1. Overview & Visual Effects

The **Hero** component is an independent, high-performance 3D physics simulation extracted from the monolithic `runtime.js`. It renders a dynamic cluster of metallic and colored jacks (rigid bodies) interacting with a floor plane, gravity, inter-body collisions, and pointer interactions.

### Key Interactive Features
- **Hover to Push**: Mouse cursor projects a 3D repulsion vector into the scene, pushing nearby jacks away smoothly.
- **Click to Scatter**: Clicking or tapping sends an omnidirectional outward impulse, scattering jacks with realistic rotational torque.
- **Dynamic Palette Cycler**: Cycles through curated PBR material color palettes (Warm Orange, Cyan Tech, Neon, Monochrome, Velvet Purple) without reloading.
- **Binary Model Ingestion**: Loads binary geometries from `/assets/models/jacks_1.buf` using `BufLoader`.

---

## 2. File Structure & Responsibilities

| File | Type | Primary Responsibility |
| :--- | :--- | :--- |
| [`Hero.astro`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Hero/Hero.astro) | Astro Component | DOM container, canvas mount, interactive action buttons (Scatter, Cycle Palette), and scoped CSS. |
| [`HeroScene.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Hero/HeroScene.ts) | TypeScript | Extends `Stage3D`. Manages Three.js scene graph, Directional/Ambient lighting, shadows, ground plane, mesh instantiation, and palette application. |
| [`HeroPhysics.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Hero/HeroPhysics.ts) | TypeScript | Custom deterministic rigid body physics engine. Computes velocity, gravity, ground restitution, bounding sphere collisions, and cursor repulsion. |
| [`HeroData.ts`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Hero/HeroData.ts) | TypeScript | Curated color palettes, material roughness/metalness parameters, and initial transform configurations. |

---

## 3. Physics Simulation Specifications

- **Integration Method**: Semi-implicit Euler integration run on each frame inside `HeroPhysics.step(dt)`.
- **Bounding Volumes**: Spherical collision hulls (`radius = 0.72`) with elastic inter-body collision resolution.
- **Ground Floor**: Plane collision at `y = -1.8` with restitution coefficient `e = 0.52` and lateral friction `0.92`.
- **Mouse Repulsion**: Screen coordinates unprojected to camera plane. Jacks within distance `R < 3.2` experience an exponential repulsion vector:
  $$\vec{F}_{\text{push}} = \frac{\vec{r}}{\|\vec{r}\|} \cdot \left(1 - \frac{\|\vec{r}\|}{R}\right)^2 \cdot K_{\text{push}}$$
- **Scatter Force**: Radial blast from cursor/center applying `velocity += blastDir * 12.0` with randomized angular velocity.

---

## 4. Integration & Usage

To use this component in any Astro page:

```astro
---
import Hero from '../../v2/components/Hero/Hero.astro';
---

<div class="hero-container">
  <Hero />
</div>
```

---

## 5. AI Agent Prompt Cheatsheet

When a user asks you to modify this component, use this table to know **exactly which file and variable to edit**:

| Desired Change | Target File | Lines / Variables |
| :--- | :--- | :--- |
| **Increase / Decrease Object Count** | `HeroScene.ts` | Change `NUM_JACKS` (default: 18) |
| **Make Hover Push Stronger / Weaker** | `HeroPhysics.ts` | Adjust `mouseRepelRadius` and `mouseRepelStrength` |
| **Increase Scatter Explosion Distance** | `HeroPhysics.ts` | In `scatter()`, increase the impulse multiplier (default: `14.0`) |
| **Change Gravity or Falling Speed** | `HeroPhysics.ts` | Modify `gravity` (default: `-9.8`) |
| **Add / Edit Color Palettes** | `HeroData.ts` | Add new hex colors to `PALETTES` array |
| **Change Metallic / Glossiness Look** | `HeroScene.ts` | In `createMaterial()`, adjust `metalness` and `roughness` |
| **Replace 3D Model with Another `.buf`** | `HeroScene.ts` | In `init()`, change `BufLoader.load('/assets/models/...')` |

---

## 6. Performance Guardrails

1. **Geometry Reuse**: All jacks share **one single `BufferGeometry` instance** created by `BufLoader`. Never duplicate geometries.
2. **Material Cloning**: Only materials with distinct palette colors are instanced; do not instantiate redundant shader programs.
3. **Resize Observer**: Canvas resize is handled through `Engine.ts` with device pixel ratio capped at `Math.min(window.devicePixelRatio, 2)`.
