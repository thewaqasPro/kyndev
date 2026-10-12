# Kyndev V2 &bull; Showreel Video Showcase (`Reel`)

> **Component ID**: `reel` / `Reel`  
> **Type**: Pattern B (DOM + Interactive Overlay Component)  
> **Preview URL**: `/preview/reel`  
> **Source Directory**: `src/v2/components/Reel/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **Reel** component encapsulates Kyndev's cinematic video showreel presentation, featuring:
1. **Interactive Magnetic Play Orb**:
   - Circular glassmorphic orb with rotating dashed ripple border (`reelSpin`).
   - Hover scaling and sound effect micro-interactions via `audioManager`.
2. **Cinematic Stage Card**:
   - 16:9 responsive video preview framed in a dark container (`#0e1117`) with 24px border radius.
   - Top and bottom filmstrip telemetry bars (`4K 60FPS`, resolution, timecode, audio specs).
3. **Responsive Video Modal**:
   - High-fidelity modal overlay with `backdrop-filter: blur(28px)`.
   - Responsive 16:9 Vimeo player embed (`761102167`).
   - Dismissible via background click, close button, or keyboard `Esc`.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `Reel.astro` | Astro Component | Header split typography, video stage markup, play button, and embedded video modal. |
| `ReelController.ts` | Controller | Event listeners for button clicks, modal open/close transitions, ESC listener, and audio trigger bridge. |
| `reel.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), radial gradients, ripple keyframe animations, and modal glassmorphism. |
| `README.md` | Documentation | Architecture overview, props reference, and AI prompt cheatsheet. |

---

## 3. Props Reference

```typescript
interface Props {
  titleLine1?: string;    // Default: 'Bold Ideas,'
  titleLine2?: string;    // Default: 'Brought to Life'
  description?: string;   // Paragraph summary
  ctaText?: string;       // Default: 'Our Approach'
  ctaLink?: string;       // Default: '/about'
  vimeoId?: string;       // Default: '761102167'
}
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Change showreel Vimeo video ID"** | `Reel.astro` or `ReelController.ts` | Pass `vimeoId="<ID>"` prop or edit default `vimeoId` in `ReelController.ts`. |
| **"Make the Play button bigger or smaller"** | `reel.css` | Adjust `.reel-btn-orb` `width` and `height` (default `104px`). |
| **"Change background gradient"** | `reel.css` | Edit `.v2-reel-root` `background: radial-gradient(...)`. |
| **"Update telemetry text in top/bottom strips"** | `Reel.astro` | Modify text inside `.reel-strip-top` and `.reel-strip-bottom`. |
| **"Make video modal close automatically on end"** | `ReelController.ts` | Add Vimeo Player SDK event listener for `ended` event. |
