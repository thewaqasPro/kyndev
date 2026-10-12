# Kyndev V2 &bull; Brands & Clients Infinite Marquee (`AboutClients`)

> **Component ID**: `about-clients` / `AboutClients`  
> **Type**: Pattern B (Multi-Row Infinite Marquee Component)  
> **Preview URL**: `/preview/about-clients`  
> **Source Directory**: `src/v2/components/AboutClients/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **AboutClients** component showcases Kyndev's enterprise and luxury client relationships:
1. **Triple-Track Alternating Infinite Marquee**:
   - Row 1: Leftward drift (`35s`).
   - Row 2: Rightward drift (`40s`).
   - Row 3: Leftward fast drift (`30s`).
2. **Interactive Hover Modulation & Glow**:
   - Hovering over any track smoothly pauses animation for easy visual examination.
   - Hovering directly over individual client logos illuminates the SVG with cyan/white ambient glow and scale amplification (`scale(1.15)`).
   - Audio feedback triggered via `audioManager`.
3. **Edge Masking**:
   - CSS gradient mask feathering edges (`mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`) so logos enter and exit gracefully.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `AboutClients.astro` | Astro Component | Header layout, 3 marquee tracks, brand SVG listings, telemetry footer. |
| `AboutClientsController.ts` | Controller | Hover detection, audio feedback triggers, and event listener lifecycle. |
| `aboutClients.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), CSS keyframes, mask gradients, and logo filters. |
| `README.md` | Documentation | Architecture overview, marquee math, and AI prompt cheatsheet. |

---

## 3. Seamless Marquee CSS Formula

```css
@keyframes marqueeScrollLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes marqueeScrollRight {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Add new client logos"** | `AboutClients.astro` | Add `{ src: '/assets/images/logo/...', alt: '...' }` to `row1`, `row2`, or `row3`. |
| **"Speed up or slow down marquee scroll"** | `aboutClients.css` | Adjust animation durations (e.g. `35s`, `40s`, `30s` in `.marquee-left`, etc.). |
| **"Change logo hover glow color"** | `aboutClients.css` | Edit `.clients-logo-item:hover` `drop-shadow(0 0 16px rgba(56, 189, 248, 0.6))`. |
| **"Make marquee keep moving when hovered"** | `aboutClients.css` | Remove `.clients-marquee-row:hover .clients-marquee-track { animation-play-state: paused; }`. |
