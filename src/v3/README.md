# Kyndev V3 &bull; True 1-to-1 Reverse-Engineered 3D & Animation System

> **Master Architecture & Review Hub Guide**  
> Direct 1-to-1 extraction of all animations, physics solvers, and shaders from [`src/scripts/unpacked-project/deobfuscated.js`](file:///Users/waqas/DEV/kyndev.com/src/scripts/unpacked-project/deobfuscated.js).

---

## ⚡ Quick Navigation

| Document / Area | Link | Description |
| :--- | :--- | :--- |
| **Reverse-Engineering Master Plan** | [`docs/V3_REVERSE_ENGINEERING_PLAN.md`](file:///Users/waqas/DEV/kyndev.com/src/v3/docs/V3_REVERSE_ENGINEERING_PLAN.md) | **MANDATORY**: Full catalog of 46 GLSL shaders, 18 animations, and execution milestones. |
| **Interactive V3 Review Hub** | [`src/pages/v3/index.astro`](file:///Users/waqas/DEV/kyndev.com/src/pages/v3/index.astro) | Master review sandbox to inspect, scrub, and benchmark all 18 setups. |
| **Core 3D Engine & Spline Ribbons** | [`core/`](file:///Users/waqas/DEV/kyndev.com/src/v3/core/) | Central `Engine`, `Stage3D`, `BufLoader`, and `SplineRibbon` ribbon engine. |
| **Physics & Fluid Dynamics** | [`effects/FlipFluid/`](file:///Users/waqas/DEV/kyndev.com/src/v3/effects/FlipFluid/) | Exact Eulerian-Lagrangian FLIP fluid tank simulator (`FlipSim`). |
| **Screen Paint & Fluid Distortion** | [`effects/ScreenPaint/`](file:///Users/waqas/DEV/kyndev.com/src/v3/effects/ScreenPaint/) | Pointer fluid injection, viscous decay, and refractive distortion pass. |
| **Flagship Lunar 3D Scene** | [`components/LunarScene/`](file:///Users/waqas/DEV/kyndev.com/src/v3/components/LunarScene/) | Complete `AboutHero` lunar terrain, spline camera flight, rocks, and FBO dust. |
| **Space Tunnels 3D Ride** | [`components/SpaceTunnels/`](file:///Users/waqas/DEV/kyndev.com/src/v3/components/SpaceTunnels/) | Full 3D grid tunnels, rigged zero-g astronaut EVA suit, and glass shattering. |

---

## 🗂️ Directory Architecture

```
src/v3/
├── README.md                           # Master V3 manifest & developer guide
├── docs/
│   └── V3_REVERSE_ENGINEERING_PLAN.md  # Comprehensive 1-to-1 reverse-engineering blueprint
│
├── core/                               # Foundational 3D Engine & Systems
│   ├── Engine.ts                       # Master WebGL renderer & ticker loop
│   ├── Stage3D.ts                      # Standard Stage3D base contract
│   ├── BufLoader.ts                    # Binary .buf parser (header + typed arrays)
│   ├── SecondOrderDynamics.ts          # Exact spring physics dynamics solver
│   ├── SplineRibbon.ts                 # Exact Line & UfxMesh ribbon generator
│   └── SplineRibbonShader.ts           # Shaders vert$j and frag$m
│
├── postprocessing/                     # Production Compositing Pipeline
│   ├── PostprocessingPipeline.ts       # Master FBO ping-pong composer
│   ├── BloomPass.ts                    # Dual-filter bloom down/upsample pyramid
│   ├── SmaaPass.ts                     # SMAA anti-aliasing with area/search LUTs
│   ├── FsrPass.ts                      # AMD FSR spatial upscaler pass
│   └── BlueNoiseDither.ts              # Blue noise banding elimination
│
├── shared/                             # Mathematical & Audio Utilities
│   ├── math.ts                         # Exact lerp, clamp, fit, damp, expoOut
│   ├── noise.ts                        # BrownianMotion & Simple1DNoise
│   ├── fbo.ts                          # FboHelper ping-pong utility
│   ├── text/                           # Slot-machine text animators
│   └── audio/                          # Procedural Web Audio engine
│       └── AudioEngine.ts
│
├── effects/                            # Dedicated Standalone Simulation Engines
│   ├── ScreenPaint/                    # ScreenPaint & ScreenPaintDistortion
│   │   ├── ScreenPaint.ts              # FBO capture & mouse velocity injector
│   │   ├── ScreenPaintShaders.ts       # Shaders vert$k, frag$o, frag$n
│   │   └── ScreenDistortionPass.ts     # Refractive chromatic distortion pass (frag$1)
│   └── FlipFluid/                      # FLIP Fluid Dynamics Tank
│       ├── FlipSim.ts                  # Eulerian-Lagrangian FLIP physics solver
│       ├── FlipAnimation.ts            # Particle container & tank manager
│       └── FlipFluidShader.ts          # Metasurface liquid shader (frag$3)
│
├── components/                         # The 1-to-1 Reverse-Engineered Components
│   ├── HeroBalloons/                   # 3D Jacks Rigid Body physics & palette cycler
│   ├── ProjectsGallery/                # 2.5D Displacement card gallery (vert$i, frag$l)
│   ├── ProductViewer/                  # Product inspection viewer with studio lighting
│   ├── ShowreelStage/                  # Filmstrip stage with line_reel.buf & magnetic orb
│   ├── FeaturedProjects/               # Dynamic palette morphing project showcase
│   ├── SpaceTunnels/                   # Full 3D Goal tunnels, glass shatter & astronaut
│   ├── LunarScene/                     # Full AboutHero lunar terrain, rocks & astronaut
│   ├── AboutWhoLogo/                   # AboutWho 3D wireframe logo (vert$1, frag$4)
│   ├── AboutClients/                   # Infinite marquee with SVG parser
│   ├── AboutAwards/                    # Starburst medal & award tally
│   ├── AboutCapabilities/              # 3D flip matrix & line_capability.buf
│   └── ProjectCaseStudy/               # Case study track & parallax media (vert$a, frag$e)
│
└── hub/                                # Review Hub Componentry
    └── V3HubRegistry.ts                # Metadata, controls & live metrics for all 18 setups
```

---

## 🚀 Interactive Review Hub

The V3 Review Hub is located at:
👉 **[http://localhost:4321/v3](http://localhost:4321/v3)**

It provides live inspection cards for all 18 authentic setups, complete with real-time FPS telemetry, shader code inspection, uniform parameter sliders, and isolated test stages.
