# Kyndev V2 &bull; Areas of Expertise 3D Flip Cards (`AboutCapability`)

> **Component ID**: `about-capability` / `AboutCapability`  
> **Type**: Pattern B (3D Perspective Flip Cards & Expertise Matrix)  
> **Preview URL**: `/preview/about-capability`  
> **Source Directory**: `src/v2/components/AboutCapability/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **AboutCapability** component articulates Kyndev's multidisciplinary service offerings across four core pillars:
1. **Interactive 3D Perspective Flip Cards**:
   - Four dual-faced cards: **Strategy**, **Creative**, **Technology**, **Production**.
   - Front Face: Pillar letter badge, primary capabilities list with dash bullet points, and flip prompt.
   - Back Face: Radial blue gradient glow, deep strategic manifesto, and tech stack tags.
   - 3D CSS flip transition with `perspective: 1200px` and `transform-style: preserve-3d`.
2. **Subheader Glyph Indicators**:
   - Circular glyph indicator pills `[ s | c | t | p ]` corresponding to each pillar.
3. **Sound Micro-Interactions**:
   - Audio feedback on card hover and flip transitions via `audioManager`.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `AboutCapability.astro` | Astro Component | Header layout, 4-pillar 3D card grid, front/back faces, telemetry footer. |
| `AboutCapabilityScene3D.ts` | WebGL Scene | Dual 3D binary ribbons (`line_capability.buf` & `line_office.buf`) with custom GLSL shaders (`vert$j` & `frag$m`), ambient kinetic particles, and cursor parallax tilt. |
| `AboutCapabilityController.ts` | Controller | 3D WebGL scene lifecycle, click flip toggles (`.is-flipped`), hover sound triggers. |
| `aboutCapability.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), 3D flip transform keyframes, card headers. |
| `README.md` | Documentation | Architecture overview, 3D CSS mechanics, and AI prompt cheatsheet. |

---

## 3. CSS 3D Perspective Card Flip Formula

```css
.capability-3d-card {
  perspective: 1200px;
}

.capability-card-inner {
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.capability-3d-card:hover .capability-card-inner,
.capability-3d-card.is-flipped .capability-card-inner {
  transform: rotateY(180deg);
}

.capability-face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.capability-face-back {
  transform: rotateY(180deg);
}
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Edit capability pillar items or add a new service"** | `AboutCapability.astro` | Modify `items` array inside the `pillars` configuration. |
| **"Change card flip speed"** | `aboutCapability.css` | Edit `.capability-card-inner` `transition: transform 0.65s ...`. |
| **"Change back face background color / glow"** | `aboutCapability.css` | Edit `.capability-face-back` `background: radial-gradient(...)` and `border`. |
| **"Adjust glyph badges in header"** | `AboutCapability.astro` & `aboutCapability.css` | Update `.capability-glyph-pill` elements. |
