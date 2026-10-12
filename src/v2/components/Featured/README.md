# Kyndev V2 &bull; Featured Projects Showcase (`Featured`)

> **Component ID**: `featured` / `Featured`  
> **Type**: Pattern B (Interactive Project Feed Component)  
> **Preview URL**: `/preview/featured`  
> **Source Directory**: `src/v2/components/Featured/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **Featured** component delivers an interactive, high-impact project directory featuring Kyndev's 9 flagship case studies:
1. **Dynamic Background Palette Morphing**:
   - As the user hovers over each project row, the viewport background dynamically shifts to the project's signature brand color (`#1a1411`, `#111a13`, `#352968`, etc.) with radial gradient feathering.
2. **Magnetic Cursor Preview Card**:
   - A floating glassmorphic thumbnail card tracks the cursor position on hover, displaying the project image, title, and tags.
3. **Instant Tag Filtering**:
   - Interactive category pills (`All Projects`, `3D • Animation`, `WebGL • Dev`, `Concept • Design`) filter rows with smooth transitions.
4. **Interactive Arrow Reveal**:
   - 45-degree rotational transform on hover with sound effect triggers via `audioManager`.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `Featured.astro` | Astro Component | Project list markup, header headline, filter strip, telemetry footer, and floating preview card. |
| `FeaturedController.ts` | Controller | Hover cursor tracking, CSS custom property `--active-accent-bg` morphing, tag filtering, audio triggers. |
| `featured.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), radial backdrop transition, typography, and hover states. |
| `README.md` | Documentation | Architecture overview, data structures, and AI prompt cheatsheet. |

---

## 3. Project Data Structure

```typescript
export interface ProjectEntry {
  id: string;         // Slug e.g. 'oryzo_ai'
  index: string;      // Formatted index '01'
  title: string;      // Display name
  href: string;       // Route link e.g. '/projects/oryzo_ai'
  tags: string;       // Monospace tag string
  colorBg: string;    // Brand background hex
  colorText: string;  // Brand contrast text hex
  thumb: string;      // Preview thumbnail URL
}
```

---

## 4. AI Agent Prompt Cheatsheet

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Add a new project to the featured list"** | `Featured.astro` | Append an object to the `projects` array with `id`, `title`, `colorBg`, and `thumb`. |
| **"Change project hover background color"** | `Featured.astro` | Update `colorBg` attribute for the corresponding project item. |
| **"Adjust floating preview card size"** | `featured.css` | Edit `.featured-floating-preview` `width` (default `260px`). |
| **"Make background color transition faster / slower"** | `featured.css` | Edit `.v2-featured-root` `transition: background 0.5s ...`. |
