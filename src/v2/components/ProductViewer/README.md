# Kyndev V2 &bull; Interactive 3D Product Showcase (`ProductViewer`)

> **Component ID**: `details` / `ProductViewer`  
> **Type**: Pattern A (Full 3D Stage3D Scene Component)  
> **Preview URL**: `/preview/product-viewer`  
> **Source Directory**: `src/v2/components/ProductViewer/`  
> **Status**: Production Ready &bull; Modular V2 Architecture  

---

## 1. Overview & Visual Effects

The **Interactive 3D Product Showcase** is a standalone, studio-grade 3D product inspection viewer designed for Kyndev project case studies (including the satirical Oryzo AI cork coaster, Porsche Dream Machine, Kyndev Cyber Cross, and Quantum Orbital Sphere).

### Core Capabilities:
1. **PBR Physical Materials**:
   - Multi-layer natural agglomerate cork texture with procedural 1024x1024 granule synthesis.
   - Laser-etched vector typography, concentric precision dials, and radial neural circuitry.
   - Procedural height bump map providing tactile surface pores and recessed engraving depth.
   - Optical transmission glass (`transmission: 0.93`, `ior: 1.88`, `clearcoat: 1.0`, chromatic attenuation).
   - High-spec liquid chrome and anisotropic titanium finishes.
2. **Enhanced Orbit Controls**:
   - 360-degree orbit rotation with smooth inertial damping (`dampingFactor: 0.06`).
   - Polar angle clamping (`minPolarAngle: 0.15`, `maxPolarAngle: 0.52 * PI`) preventing camera floor clipping.
   - Smooth camera reset interpolation with cubic easing (`easeOutCubic`).
   - Turntable auto-rotation with toggleable spinning indicator.
   - Canvas double-click to reset view to default perspective.
3. **Model Prepass Inspection Modes**:
   - **Beauty (PBR)**: Full photorealistic lighting, reflections, transmission, and studio shadows.
   - **Normals Prepass**: Visualizes surface normal vectors in RGB `(N * 0.5 + 0.5)` for surface curvature analysis.
   - **Depth Prepass**: Visualizes normalized camera z-buffer depth occlusion gradient.
   - **Wireframe Topology**: High-precision cyan wireframe mesh overlay.
4. **Studio 3-Point Lighting Rig & Mood Cycler**:
   - **Studio Daylight**: Neutral 5500K key light, cool sky fill, warm floor bounce.
   - **Cyber Neon**: Intense cyan key, hot magenta fill, deep cobalt rim.
   - **Golden Hour**: 3200K amber warm direct sunlight, slate fill, golden rim.
   - **Dark Monolith**: High-contrast single spotlight, deep shadows, luxury jewelry aesthetic.
5. **Contact Shadow & Pedestal**:
   - Soft radial gradient contact shadow plane beneath products for depth grounding.
   - Studio pedestal ring and toggleable precision measurement grid.

---

## 2. File Structure & Responsibilities

| File | Type | Responsibility |
| :--- | :--- | :--- |
| `ProductViewer.astro` | Astro Component | Mounts WebGL canvas, initializes `Engine`, binds floating glassmorphic HUD controls, telemetry updates. |
| `ProductViewerScene.ts` | Stage3D Scene | Extends `Stage3D`. Manages 3D lighting rig, contact shadow, product meshes, switching animations, and prepass mode overrides. |
| `ProductViewerControls.ts` | Controller | OrbitControls wrapper with inertia damping, polar constraints, zoom boundaries, and camera reset interpolation. |
| `ProductViewerMaterials.ts` | Shader & Material Factory | Procedural cork texture canvas generator, cork bump map, contact shadow gradient, normals/depth prepass shaders, UV projection helper. |
| `productViewer.css` | Stylesheet | Scoped styling for dark container (`#0b0c0e`), floating glassmorphic HUD, pills, telemetry badges, and tool buttons. |
| `README.md` | Documentation | Architecture overview, equations, prompt cheatsheet for AI agents and developers. |

---

## 3. Product Catalog

| Preset Index | Product Name | Case Study Reference | Geometry Source | Primary Material |
| :---: | :--- | :--- | :--- | :--- |
| **0** | **Oryzo-1 Neural Coaster** | Oryzo AI (`oryzo_ai`) | Procedural Bevelled Cylinder (`CylinderGeometry`) | Procedural PBR Agglomerate Cork + Gold Inlay |
| **1** | **Obsidian Dream Machine** | Porsche Dream Machine (`porsche`) | `tunnels/diamond.buf` via `BufLoader` | Smoked Obsidian Transmission Glass (`ior: 1.88`) + Titanium Gyro |
| **2** | **Cyber Cross Monolith** | Kyndev Brand Monolith | `home/cross.buf` via `BufLoader` | Specular Liquid Chrome (`metalness: 0.98`, `clearcoat: 1.0`) |
| **3** | **Quantum Orbital Sphere** | Lunar Exploration Mission | `about/sphere_l.buf` via `BufLoader` | Frosted Aerogel Shell + Pulsating Emissive Core |

---

## 4. Mathematics & Shader Formulas

### 1. Normal Vector Prepass Shader
```glsl
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
// Fragment:
varying vec3 vNormal;
void main() {
  vec3 n = normalize(vNormal) * 0.5 + 0.5;
  gl_FragColor = vec4(n, 1.0);
}
```

### 2. Depth Buffer Occlusion Prepass
```glsl
varying float vDepth;
void main() {
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vDepth = -mvPos.z;
  gl_Position = projectionMatrix * mvPos;
}
// Fragment:
uniform float uNear;
uniform float uFar;
varying float vDepth;
void main() {
  float d = clamp((vDepth - uNear) / (uFar - uNear), 0.0, 1.0);
  vec3 col = mix(vec3(0.04, 0.12, 0.28), vec3(0.85, 0.95, 1.0), 1.0 - d);
  gl_FragColor = vec4(col, 1.0);
}
```

### 3. Cubic Camera Reset Interpolation
```typescript
const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
camera.position.lerpVectors(startPosition, defaultPosition, eased);
controls.target.lerpVectors(startTarget, defaultTarget, eased);
```

---

## 5. Integration Code Snippet

To embed the viewer into any Astro page or project detail template:

```astro
---
import ProductViewer from '../v2/components/ProductViewer/ProductViewer.astro';
---

<div class="product-inspection-container">
  <ProductViewer initialProduct={0} />
</div>

<style>
  .product-inspection-container {
    width: 100%;
    height: 700px;
    border-radius: 28px;
    overflow: hidden;
    background: #0b0c0e;
  }
</style>
```

---

## 6. AI Agent Prompt Cheatsheet

When users ask for adjustments to `ProductViewer`, refer to this rapid modification guide:

| User Request | Target File | What to Adjust |
| :--- | :--- | :--- |
| **"Make cork texture darker / change cork color"** | `ProductViewerMaterials.ts` | Edit `corkPalette` array and base fill color `#b78759` in `createCorkCanvasTexture()`. |
| **"Adjust coaster laser text / add company logo"** | `ProductViewerMaterials.ts` | Modify `topText` and `bottomText` strings in `createCorkCanvasTexture()`. |
| **"Make auto-spin faster / slower"** | `ProductViewerControls.ts` or `ProductViewerScene.ts` | Adjust `autoRotateSpeed` parameter (default `1.0` or `1.2`). |
| **"Change default camera angle / initial distance"** | `ProductViewerControls.ts` | Edit `defaultPosition` vector (default `(0, 1.6, 3.6)`). |
| **"Allow camera to tilt lower below the pedestal"** | `ProductViewerControls.ts` | Increase `maxPolarAngle` from `Math.PI * 0.52` to e.g. `Math.PI * 0.65`. |
| **"Change lighting intensity or add another mood"** | `ProductViewerScene.ts` | Edit `applyLightingMood(mood)` method and adjust `keyLight` / `fillLight` / `rimLight` values. |
| **"Add a new 3D model to the product list"** | `ProductViewerScene.ts` | Create a new `createModel()` method, push to `productMeshes`, and add metadata in `getProductMetadata()`. |
| **"Customize HUD buttons or styling"** | `productViewer.css` & `ProductViewer.astro` | Update glassmorphic container `.product-info-panel` or tool buttons `.hud-btn`. |
