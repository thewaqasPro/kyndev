# Kyndev V2 &bull; Mission & Tunnel Depth Portals (`Goal`)

> **Component ID**: `goal` / `Goal`  
> **Type**: Pattern B (Kinetic Text & Depth Portals Component)  
> **Preview URL**: `/preview/goal`  
> **Source Directory**: `src/v2/components/Goal/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **Goal** component expresses Kyndev's creative manifesto and brand ethos, combining:
1. **Typographic Manifesto Grid**:
   - Massive statement headline (*"Where Creative Ideas Become Immersive Experiences"*).
   - Multi-column manifesto philosophy describing bespoke digital craft over repetitive templates.
2. **Dual Perspective Tunnel Depth Portals**:
   - Two interactive portal windows (`Entry Horizon` and `Creative Reach`).
   - Concentric geometric depth rings that scale dynamically on hover.
   - 3D perspective tilt reacting to cursor coordinates (`perspective(800px) rotateY(...) rotateX(...)`).
3. **Studio Ethos Telemetry Footer**:
   - Minimalist monospace telemetry badges communicating studio capabilities.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `Goal.astro` | Astro Component | Manifesto typography, dual portal cards, concentric depth rings, telemetry footer. |
| `GoalController.ts` | Controller | Mouse pointer coordinate tracking, 3D perspective card tilt, audio triggers. |
| `goal.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), radial gradients, concentric depth rings. |
| `README.md` | Documentation | Architecture overview, tilt equations, and AI prompt cheatsheet. |

---

## 3. Mathematical Perspective Formula

```typescript
const px = (clientX - rect.left) / rect.width - 0.5;
const py = (clientY - rect.top) / rect.height - 0.5;
card.style.transform = `perspective(800px) rotateY(${px * 16}deg) rotateX(${-py * 16}deg) scale3d(1.02, 1.02, 1.02)`;
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Edit manifesto headline or mission paragraphs"** | `Goal.astro` | Update `headline` or `paragraphs` array in props. |
| **"Increase / decrease 3D portal tilt angle"** | `GoalController.ts` | Change rotation multiplier (default `16deg` in `rotateY(${px * 16}deg)`). |
| **"Change concentric rings size or colors"** | `goal.css` | Edit `.tunnel-ring-1` through `.tunnel-ring-4` rules. |
| **"Adjust portal card aspect ratio"** | `goal.css` | Modify `.goal-portal-card` `aspect-ratio: 16 / 10`. |
