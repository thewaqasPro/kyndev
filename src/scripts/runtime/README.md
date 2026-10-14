# Kyndev Experience Runtime &bull; Modular Architecture (`src/scripts/runtime/`)

> **Deconstructed Architecture Hub**  
> Source Reference: [`src/scripts/runtime.js`](../runtime.js) (26,946 lines preserved intact)  
> Modular Subsystems: `src/scripts/runtime/` (11 domains, 48 focused modules)

---

## 1. Overview & Purpose

The original Kyndev experience relied on a single monolithic file (`runtime.js`, ~1MB, ~27,000 lines). While functional, managing physics equations, GLSL shaders, UI controllers, and page lifecycles in one file made maintenance, testing, and isolated enhancements challenging.

This creative modular structure deconstructs the monolith into **distinct, manageable subsystems** where every module has a clear single responsibility.

---

## 2. Directory Substructure

```
src/scripts/runtime/
├── index.js                           # Master barrel export & runtime module aggregator
├── three.js                           # Decoupled Three.js bindings & window injection
│
├── core/                              # Foundation math, configs & state singletons
│   ├── MathUtils.js                   # Clamp, lerp, fit, normalize & random generators (math)
│   ├── Browser.js                     # Device detection, mobile/desktop, GPU capabilities (browser)
│   ├── Settings.js                    # Global runtime settings, CDN paths & feature flags (settings)
│   ├── Properties.js                  # Viewport metrics, global uniforms & shared state (properties)
│   ├── Dynamics.js                    # SecondOrderDynamics, BrownianMotion & Simple1DNoise
│   ├── Input.js                       # Mouse coordinates, raycasting, touch & gestures (input)
│   ├── Ease.js                        # Cubic, expo, quad, sine easing functions (ease)
│   ├── Tween.js                       # Lightweight animation tweening engine (Tween)
│   ├── TaskManager.js                 # Frame task queues & deferred schedulers (taskManager)
│   ├── Support.js                     # WebGL 1/2, float textures & MSAA capabilities (support)
│   └── ScrollDomRange.js              # Section element scroll range bounds
│
├── loaders/                           # Asset ingestion & parsing pipeline
│   ├── QuickLoader.js                 # Core asset loader and signal dispatcher
│   └── items/
│       ├── FontItem.js                # WebFont loading and canvas width probe
│       ├── BufItem.js                 # Binary vertex attribute buffer parser (.buf)
│       ├── EXRLoader.js               # High Dynamic Range OpenEXR texture loader (.exr)
│       └── TextureItem.js             # WebP/PNG image textures & Three.js texture items
│
├── audio/                             # Web Audio Engine
│   ├── AudioGroup.js                  # Audio bus mixing channel
│   ├── AudioItem.js                   # Positional/global sound instance
│   ├── Audios.js                      # Master audio director & SFX triggers (audios)
│   └── PageAudios.js                  # Page-specific sound cues (Home, About, Projects)
│
├── webgl/                             # WebGL Engine & Shader Post-processing
│   ├── App.js                         # Root WebGL renderer, scene tree & render loop (app)
│   ├── Stage3D.js                     # Base 3D interactive stage extending Three.Scene
│   ├── FboHelper.js                   # Double-buffered render targets (FBOs) & ping-pong passes
│   ├── Blur.js                        # Dual-pass Gaussian blur pass
│   ├── BlueNoise.js                   # Void-and-Cluster blue noise matrices for raymarching
│   ├── ShaderHelper.js                # GLSL chunk injection & uniform helpers
│   ├── TextureHelper.js               # Procedural noise textures & gradient maps
│   ├── ScreenPaint.js                 # Fluid pointer injection buffer & dissipation solver
│   ├── Postprocessing.js              # Master post-processing stack coordinator
│   ├── passes/
│   │   ├── PostEffect.js              # Base PostEffect, Ufx, and PreUfx classes
│   │   ├── Smaa.js                    # Subpixel Morphological Anti-Aliasing (SMAA)
│   │   ├── Bloom.js                   # Dual-filter HDR bloom pyramid pass
│   │   ├── ScreenPaintDistortion.js   # Fluid refractive chromatic aberration pass
│   │   ├── Fsr.js                     # AMD FidelityFX Super Resolution upscaler
│   │   └── Final.js                   # Color grading, tone-mapping & canvas blit
│   └── geometry/
│       ├── UfxMesh.js                 # Screen-aligned quads & text meshes
│       ├── Line.js                    # Camera-facing 3D ribbon extrusion geometry
│       └── SVGParser.js               # Vector SVG path triangulator & bezier curves
│
├── scenes/                            # 3D Interactive Feature Scenes
│   ├── hero/
│   │   └── HomeBalloons.js            # Jacks rigid-body physics, collisions & balloons (homeBalloons)
│   ├── tunnels/
│   │   └── GoalTunnels.js             # Space tunnels, Voronoi glass, astronaut & particles (goalTunnels)
│   ├── lunar/
│   │   └── AboutHero.js               # Lunar landscape, terrain displacement, moon rocks & dust (aboutHero)
│   ├── fluid/
│   │   └── FlipFluid.js               # FLIP liquid grid simulation & metasurface (flipAnimation)
│   └── product/
│       └── ProjectDetails.js          # 3D interactive product showcase viewer & case study shaders
│
├── ui/                                # DOM UI Controllers & Transitions
│   ├── Header.js                      # Navigation menu, labs link & sound toggles (header)
│   ├── Preloader.js                   # Digits percentage counter & reveal sequencer (preloader)
│   ├── TransitionOverlay.js           # Route transition canvas & 1.5s safety watchdog (transitionOverlay)
│   ├── Links.js                       # Animated canvas link hover underlines (links)
│   ├── VideoOverlay.js                # Showreel video modal player & timecode sync (videoOverlay)
│   ├── DomHelper.js                   # DOM text splitting & word animations
│   ├── FooterSection.js               # Newsletter form, footer links & scroll navigation
│   └── UI.js                          # Root UI coordinator (ui)
│
└── navigation/                        # Virtual Scroll & Routing Engine
    ├── ScrollManager.js               # Smooth virtual scrolling engine & inertia (scrollManager)
    ├── RouteManager.js                # Client-side SPA routing, HTML fetcher & DOM swaps (routeManager)
    ├── PageManager.js                 # Active page lifecycle coordinator (pagesManager)
    └── pages/
        ├── Page.js                    # Abstract base page class
        ├── HomePage.js                # Hero jacks, showreel & featured projects
        ├── AboutPage.js               # Who we are, leadership team, awards & capabilities
        ├── ServicesPage.js            # Services listing & process steps
        ├── ContactPage.js             # Contact form & studio coordinates
        ├── ProjectsPage.js            # 2.5D tilting card portfolio grid
        ├── ProjectPage.js             # Case study hero & media showcase
        └── PlaygroundPage.js          # 3D physics & shader experiment laboratory
```

---

## 3. How to Manage and Extend Code Easily

### Working on a Specific Subsystem
1. **To edit 3D physics/visuals**: Navigate to [`scenes/`](./scenes/) directly. For example, to adjust the Jacks collision properties, edit [`scenes/hero/HomeBalloons.js`](./scenes/hero/HomeBalloons.js).
2. **To tweak shaders & postprocessing**: Navigate to [`webgl/passes/`](./webgl/passes/) (e.g. [`Bloom.js`](./webgl/passes/Bloom.js), [`Smaa.js`](./webgl/passes/Smaa.js)).
3. **To adjust page route behavior or animations**: Edit [`navigation/RouteManager.js`](./navigation/RouteManager.js) or individual pages in [`navigation/pages/`](./navigation/pages/).
4. **To modify navigation UI or menus**: Edit [`ui/Header.js`](./ui/Header.js) or [`ui/TransitionOverlay.js`](./ui/TransitionOverlay.js).

### Relationship with Legacy `runtime.js`
- [`src/scripts/runtime.js`](../runtime.js) remains the production file loaded by [`Layout.astro`](../../layouts/Layout.astro). It has been kept 100% intact and unchanged.
- The new [`src/scripts/runtime/`](./) directory provides the clean deconstruction, making it straightforward to review, test, or incrementally swap subsystems in future releases.
