# KYNDEV Agent Guidelines & Superpowers

@./.gemini/skills/using-superpowers/SKILL.md
@./.gemini/skills/using-superpowers/references/antigravity-tools.md

## Project Architecture & Standards
- **Framework**: Astro 7+ SSG with Three.js WebGL runtime and client-side SPA routing (`RouteManager.js` + `PageManager.js`).
- **Interactive 3D**: Decoupled scene controllers (`HomeBalloons`, `GoalTunnels`, `AboutHero`, `FlipFluid`) and post-processing stack (SMAA, Bloom, FSR).
- **Component Lifecycle**: Every section conforms to the 5-step lifecycle (`preInit`, `init`, `resize`, `update`, `hide`) registered through `SectionRegistry.js`.
- **Preloader & Transitions**: Branded KYNDEV "K" geometric origami morph with zero-seam offscreen canvas rasterization (`_kCanvas`) and live debug HUD (`?debug-k`).
- **Project Depth Maps**: Portfolio projects on `/projects` use paired 1200x900 assets (`home.webp` + `home_depth.webp`) for 2.5D optical parallax raymarching.
- **Documentation**: Comprehensive offline-capable HTML documentation portal in `documentation/index.html` and mirrored to `public/documentation/`.
