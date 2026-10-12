# Kyndev V2 &bull; Architecture & System Design

> **Technical Architecture Reference for Modernization & Scalability**  
> Root Path: `src/v2/`

---

## 1. System Philosophy

Kyndev's original web experience relied on a single monolithic 25,000-line bundled script (`runtime.js`). While visually rich, it suffered from:
1. Tight coupling: Modifying one effect broke unrelated scenes.
2. Inflexible asset loading: Monolithic shaders and binary models were loaded in one giant pipeline.
3. Lack of modularity: Components could not be tested, benchmarked, or styled in isolation.

**V2 Architecture** solves this by establishing an isolated, modular, TypeScript-driven component architecture that runs independently in Astro while leaving the live production site 100% untouched.

```
src/
├── v2/
│   ├── core/           # Low-level 3D engine, loader, stage & viewport management
│   ├── shared/         # Reusable math, audio, text animators, and WebGL pools
│   ├── components/     # Self-contained feature components
│   │   ├── Hero/       # 3D Rigid Body Jacks Physics (BufLoader + Stage3D)
│   │   ├── Projects/   # V1: 2.5D Full 3D Tilt Gallery (Displacement Shader)
│   │   └── ProjectsV2/ # V2: Viewport-Triggered 4-Corner Scale Image Card Gallery
│   └── docs/           # System design & SOP creation workflows
└── pages/
    └── preview/        # Isolated preview testbeds & sandbox hub
```

---

## 2. The Core Infrastructure (`src/v2/core/`)

### `Engine.ts` &bull; Central WebGL Lifecycle & Loop
- **Renderer Setup**: Configures `THREE.WebGLRenderer` with `antialias: true`, `alpha: true`, and `THREE.ACESFilmicToneMapping`.
- **DPI Capping**: Enforces `Math.min(window.devicePixelRatio || 1, 2)` to guarantee consistent 60–120 FPS on high-density Retina displays.
- **Resize Observer**: Listens to both `window.resize` and container `ResizeObserver`, ensuring accurate projection matrix updates even inside responsive containers.
- **Render Loop**: Manages the master `requestAnimationFrame` loop, calculating `deltaTime` and passing it to the active `Stage3D`.

### `Stage3D.ts` &bull; Standardized Scene Contract
Every full-canvas 3D scene implements the `Stage3D` abstract class:
```typescript
export abstract class Stage3D {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public abstract init(): Promise<void> | void;
  public abstract resize(width: number, height: number): void;
  public abstract update(delta: number, time: number): void;
  public onPointerMove?(_mouse: THREE.Vector2): void;
  public abstract destroy(): void;
}
```
This guarantees uniform lifecycle control, effortless stage switching, and zero memory leaks upon destruction.

### `BufLoader.ts` &bull; Binary Geometry Decompressor
Kyndev uses a proprietary `.buf` binary format for high-polygon 3D meshes (e.g. Jacks, astronaut, terrain, cork coaster).
- **Structure**:
  1. Bytes 0–3: `uint32` representing `headerSize`.
  2. Bytes 4 to `4 + headerSize`: JSON text metadata defining `vertexCount`, `indexCount`, storage types, and packing rules.
  3. Remaining bytes: Contiguous typed array buffers (`Float32Array`, `Int16Array`, `Uint8Array`).
- **Packed Attributes**: Automatically unpacks signed and normalized coordinate deltas back to full-precision 3D vectors.

### `Viewport.ts` &bull; Resolution & Coordinate Normalizer
Tracks window width, height, aspect ratio, and DPR, providing screen-to-NDC mapping for raycasting and pointer parallax.

---

## 3. The Shared Utilities Layer (`src/v2/shared/`)

| Module | Location | Purpose |
| :--- | :--- | :--- |
| **Math & Easing** | `src/v2/shared/math.ts` | Frame-rate independent `damp`, smooth `fit`, `saturate`, and Kyndev's signature `expoOut` curve. |
| **Audio Manager** | `src/v2/shared/audio.ts` | Sound effect pooling with concurrency caps and browser autoplay suppression. |
| **SplitType Text**| `src/v2/shared/text/TextAnim.ts` | Character-by-character drum slot reels and alphanumeric category ticker scramble. |
| **Context Pool**  | `src/v2/shared/webgl/ContextPool.ts`| WebGL context pooling to prevent Chrome's `16 context limit` (`CONTEXT_LOST_WEBGL`). |

---

## 4. Current Component Registry

### 1. `Hero` (3D Jacks Physics Scene)
- Extends `Stage3D`, driven by `Engine.ts`.
- Pure TypeScript rigid-body physics simulation (`HeroPhysics.ts`) with semi-implicit Euler integration.
- Ground restitution, inter-body sphere collisions, cursor repulsion vector, and click scatter.
- Binary geometry loaded via `BufLoader.load('/assets/models/jacks_1.buf')`.

### 2. `Projects` (V1: Full 3D Card Tilt)
- 2-column staggered responsive grid.
- Outer card rotates in full 3D perspective space on pointer move (`rotateX`, `rotateY`, `translateZ`).
- Dynamic specular radial shine.
- 12-sample depth raymarching shader + 6-sample bokeh blur.

### 3. `ProjectsV2` (V2: Image Card 4-Corner Scale & Viewport Entrance)
- Stationary outer container (`transform: none`).
- Entrance animation targets the **image card viewport (`.v2-card-viewport`)**, leaving footer content undistorted.
- Autonomous, time-based `expoOut` entrance triggered when entering the viewport (~1.35s duration).
- Asymmetric 4-corner / 4-side dynamic scaling: sublinear width expansion ($t^{0.75}$) vs. superlinear height expansion ($t^{1.40}$).
- Internal mouse lens shift on hover + 2.5D depth shader raymarching.

---

## 5. Roadmap: Planned Future Components

The following components are queued to be modernized using the V2 system:
1. **Lunar Terrain Scene (About Page)**: Full 3D moon mesh, floating astronaut, particle dust cluster (`/assets/models/lunar_*.buf`).
2. **Product 3D Viewer (Project Details)**: Standalone orbit-controlled 3D inspector for project artifacts (cork coaster, dream machine).
3. **Interactive Cursor & Magnetism**: Custom inertial magnetic cursor with trailing dot and element snapping.
4. **Fluid Shader Transitions**: Custom FBO render-target page transition shaders.
