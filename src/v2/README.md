# Kyndev V2 &bull; Modular 3D & UI Architecture

> **Master Directory & AI Agent Onboarding Guide**  
> Welcome to the modern V2 modular architecture for `kyndev.com`.

---

## ⚡ Quick Navigation for Developers & AI Agents

If you are an AI agent or developer tasked with maintaining, modifying, or creating components, consult these references first:

| Document / Area | Link | Description |
| :--- | :--- | :--- |
| **How to Build New Components** | [`docs/COMPONENT_CREATION_WORKFLOW.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/docs/COMPONENT_CREATION_WORKFLOW.md) | **MANDATORY**: Step-by-step SOP to build new components 4 through 20. |
| **Complete System Architecture** | [`docs/V2_ARCHITECTURE_SYSTEM.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/docs/V2_ARCHITECTURE_SYSTEM.md) | Deep technical breakdown of `core/`, `shared/`, WebGL context limits, and shaders. |
| **Hero 3D Physics Scene** | [`components/Hero/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Hero/README.md) | Rigid body physics, BufLoader, repulsion math, and palette cycler. |
| **Projects Gallery V1 (Card Tilt)** | [`components/Projects/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/README.md) | Full 3D perspective hover tilt, specular shine, and depth raymarching. |
| **Projects Gallery V2 (Image Scale)**| [`components/ProjectsV2/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/README.md) | Viewport-triggered entrance, asymmetric 4-corner scaling, and stationary frame. |
| **Product 3D Viewer** | [`components/ProductViewer/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProductViewer/README.md) | Standalone PBR inspection viewer, OrbitControls, normals/depth prepass, and studio lighting. |
| **Showreel Video Showcase** | [`components/Reel/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Reel/README.md) | Cinematic video stage, magnetic pulse button, timecode HUD, and Vimeo modal. |
| **Featured Projects Showcase** | [`components/Featured/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Featured/README.md) | Dynamic background color morphing, floating cursor preview card, and tag filtering. |
| **Goal & Depth Portals** | [`components/Goal/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Goal/README.md) | Creative manifesto, interactive 3D perspective tunnel portals, and geometric rings. |
| **About Who & Team Showcase** | [`components/AboutWho/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/AboutWho/README.md) | Agency manifesto, multi-column kinetic headlines, cross grid matrix, and interactive team carousel. |
| **Brands & Clients Infinite Marquee** | [`components/AboutClients/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/AboutClients/README.md) | Triple-track alternating marquee, SVG logo hover glow, and speed damping. |
| **Awards Starburst & Recognition** | [`components/AboutAwards/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/AboutAwards/README.md) | Rotating 58 Starburst medal, filterable organization tabs, and interactive awards tally. |
| **Areas of Expertise 3D Flip Cards** | [`components/AboutCapability/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/AboutCapability/README.md) | 3D perspective flip cards across Strategy, Creative, Technology, and Production pillars. |

---

## 🗂️ Directory Architecture

```
src/v2/
├── core/                       # Foundational 3D Engine Infrastructure
│   ├── Engine.ts               # Master WebGLRenderer, ticker loop, DPR cap & ResizeObserver
│   ├── Stage3D.ts              # Abstract lifecycle contract for 3D scenes
│   ├── BufLoader.ts            # Binary .buf geometry parser (jacks, terrain, models)
│   └── Viewport.ts             # Screen resolution, aspect ratio, and DPR tracker
│
├── shared/                     # Reusable Utilities (Zero inter-component coupling)
│   ├── math.ts                 # Math helpers (lerp, clamp, saturate, fit, damp, expoOut)
│   ├── audio.ts                # Audio pool manager for UI micro-interactions
│   ├── text/
│   │   └── TextAnim.ts         # Word-grouped slot machine reels & tag scramble decoders
│   └── webgl/
│       └── ContextPool.ts      # WebGL context pool (caps active contexts to 4)
│
├── components/                 # Isolated, Self-Contained Feature Components
│   ├── Hero/                   # 3D Jacks Rigid Body Physics scene
│   ├── Projects/               # V1: 2.5D Full 3D Card Tilt Gallery
│   ├── ProjectsV2/             # V2: Viewport-Triggered 4-Corner Scale Image Card Gallery
│   ├── ProductViewer/          # 3D PBR Product Inspection Viewer & Prepass Studio
│   ├── Reel/                   # Cinematic Video Stage, Magnetic Play Orb & Modal
│   ├── Featured/               # Dynamic Palette Shift & Interactive Project Feed
│   ├── Goal/                   # Creative Manifesto & Perspective Tunnel Portals
│   ├── AboutWho/               # Agency Profile, Matrix Grid & Interactive Team Index
│   ├── AboutClients/           # Triple-Track Infinite Client Marquee & Logo Glow
│   ├── AboutAwards/            # Starburst Medal, Organization Tabs & Awards Tally
│   ├── AboutCapability/        # Strategic Pillars, Flip Matrix & Tech Capabilities
│   └── ProjectDetails/         # Case Study Track, Dynamic Palette & Parallax Media
│
└── docs/                       # Standard Operating Procedures & Guidelines
    ├── COMPONENT_CREATION_WORKFLOW.md
    └── V2_ARCHITECTURE_SYSTEM.md
```

---

## 🚀 Live Preview Testbeds

All V2 components are hosted on dedicated preview routes with dark framed stages on a clean `#ffffff` canvas:

- **Component Lab Sandbox**: [http://localhost:4321/preview](http://localhost:4321/preview)
- **3D Hero Scene**: [http://localhost:4321/preview/hero](http://localhost:4321/preview/hero)
- **Projects Gallery V1 (Full 3D Tilt)**: [http://localhost:4321/preview/projects](http://localhost:4321/preview/projects)
- **Projects Gallery V2 (Image Card Scale)**: [http://localhost:4321/preview/projects-v2](http://localhost:4321/preview/projects-v2)
- **Interactive 3D Product Showcase**: [http://localhost:4321/preview/product-viewer](http://localhost:4321/preview/product-viewer)
- **Showreel Video Showcase**: [http://localhost:4321/preview/reel](http://localhost:4321/preview/reel)
- **Featured Projects Showcase**: [http://localhost:4321/preview/featured](http://localhost:4321/preview/featured)
- **Goal & Tunnel Depth Portals**: [http://localhost:4321/preview/goal](http://localhost:4321/preview/goal)
- **About Who & Team Showcase**: [http://localhost:4321/preview/about-who](http://localhost:4321/preview/about-who)
- **Brands & Clients Infinite Marquee**: [http://localhost:4321/preview/about-clients](http://localhost:4321/preview/about-clients)
- **Awards Starburst & Recognition**: [http://localhost:4321/preview/about-awards](http://localhost:4321/preview/about-awards)
- **Capabilities 3D Flip Matrix**: [http://localhost:4321/preview/about-capability](http://localhost:4321/preview/about-capability)
- **Project Details Case Study Track**: [http://localhost:4321/preview/project-details](http://localhost:4321/preview/project-details)

---

## 💡 AI Agent Golden Rules

1. **Leave Legacy Code Intact**: The live site (`src/scripts/runtime.js`, `src/pages/index.astro`, etc.) must remain 100% untouched. All new work lives in `src/v2/` and `src/pages/preview/`.
2. **Consult Component READMEs Before Editing**: Every component in `src/v2/components/` has an AI prompt cheatsheet detailing the exact variables and functions to touch.
3. **Use Shared Utilities**: Reuse `src/v2/shared/math.ts`, `src/v2/shared/audio.ts`, and `src/v2/shared/text/TextAnim.ts` instead of duplicating logic.
4. **Enforce WebGL Context Limit**: Always route multi-canvas renderers through `src/v2/shared/webgl/ContextPool.ts` (max 4 active contexts).
5. **Verify with Astro Check**: Always run `npx astro check` to guarantee 0 errors and 0 warnings before completing any task.
