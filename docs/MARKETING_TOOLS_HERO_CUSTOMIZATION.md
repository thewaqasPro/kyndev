# Marketing Tools Hero 3D Architecture & Customization Guide

This guide covers how to adjust parameters, swap brand logos/icons, configure 3D physical behaviors (speeds, tumbling, bouncing, centering forces), and modify background color palettes in the interactive **Marketing Tools Hero** section.

---

## 1. Quick File Map

| File Path | Description |
|-----------|-------------|
| [`src/components/home/HeroTools/HeroToolsScene.ts`](file:///Users/waqas/DEV/kyndev.com/src/components/home/HeroTools/HeroToolsScene.ts) | Core 3D engine: chip definitions, physics loop, collision solver, materials, and WebGL background shader. |
| [`src/components/home/HeroTools/HeroTools.astro`](file:///Users/waqas/DEV/kyndev.com/src/components/home/HeroTools/HeroTools.astro) | Astro section component, HUD card, action buttons, layout toggle banner, and client hydration scripts. |
| [`src/components/home/HeroTools/heroTools.css`](file:///Users/waqas/DEV/kyndev.com/src/components/home/HeroTools/heroTools.css) | Section styles: pure white background canvas, 40/60 split layout, responsive media queries, and HUD glassmorphism. |
| [`src/scripts/runtime/sections/HeroToolsSection.js`](file:///Users/waqas/DEV/kyndev.com/src/scripts/runtime/sections/HeroToolsSection.js) | Lifecycle coordinator (`preInit`, `init`, `resize`, `hide`), layout toggling, and sound integration. |

---

## 2. How to Add, Edit, or Replace Chip Icons

All chip models are defined in `HeroToolsScene.ts` inside the `getToolConfigs()` method.

### The `MarketingToolConfig` Object Schema

```typescript
export interface MarketingToolConfig {
  id: string;                                                      // Unique key (e.g. 'google-ads')
  name: string;                                                    // Display name (rendered on face & HUD)
  subtitle: string;                                                // Subtitle (e.g. 'PPC & Search Scaling')
  primaryColor: string;                                            // Front border glow & HUD accent color
  accentColor: string;                                             // Metallic rim color
  metalness: number;                                               // Rim metallic shine (0.0 - 1.0, default: 0.85)
  roughness: number;                                               // Rim roughness (0.0 - 1.0, default: 0.18)
  radius: number;                                                  // 3D Disc radius (default: 1.24 - 1.30)
  thickness: number;                                               // 3D Disc depth/thickness (default: 0.30 - 0.34)
  drawIcon: (ctx: CanvasRenderingContext2D, size: number) => void; // Procedural vector icon drawing function
}
```

### Option A: Customizing Vector Icons (Canvas 2D API)
The default approach draws high-resolution vectors directly onto a 1024×1024 texture canvas. This ensures zero network latency and pixel-crisp rendering at any 3D perspective angle:

```typescript
{
  id: 'custom-tool',
  name: 'My Tool',
  subtitle: 'Growth & Automation',
  primaryColor: '#00F2FE',
  accentColor: '#0081FB',
  metalness: 0.5,
  roughness: 0.2,
  radius: 1.26,
  thickness: 0.30,
  drawIcon: (ctx, size) => {
    const c = size / 2;
    const r = size * 0.35;
    ctx.save();
    ctx.translate(c, c);

    // Draw custom vector paths using standard CanvasRenderingContext2D
    ctx.fillStyle = '#00F2FE';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },
}
```

### Option B: Using an External PNG, SVG, or WebP Image File
If you want to use an image file (e.g., from `public/assets/icons/my-icon.svg` or `public/assets/icons/my-icon.png`):

1. Add an optional `imageSrc?: string;` property to `MarketingToolConfig`.
2. In `createTexture(tool, isFront)` in `HeroToolsScene.ts`, add image drawing logic:

```typescript
if (isFront) {
  if (tool.imageSrc) {
    const img = new Image();
    img.src = tool.imageSrc;
    img.onload = () => {
      // Draw image centered on the 1024x1024 badge face
      ctx.drawImage(img, c - 180, c - 240, 360, 360);
      texture.needsUpdate = true;
    };
  } else {
    tool.drawIcon(ctx, size * 0.72);
  }
  // Title & subtitle text below icon...
}
```

---

## 3. How to Adjust Physics, Speeds, and 3D Behaviors

All physics simulation parameters are concentrated in `HeroToolsScene.ts` in the `updatePhysics(dt)` loop, `applyImpulseToAll()`, and `onPointerDown`:

### 1. 3D Tumbling & Rotation Speed
- **Scatter Spin Speed**: In `applyImpulseToAll()`, look for `b.angularVelocity.set(...)`. Change `9.0` to a higher or lower number to control how aggressively chips spin when scattered:
  ```typescript
  b.angularVelocity.set(
    (Math.random() - 0.5) * 9.0, // X spin speed
    (Math.random() - 0.5) * 9.0, // Y spin speed
    (Math.random() - 0.5) * 7.0  // Z spin speed
  );
  ```
- **Tumble Duration / Spin Drag**: In `updatePhysics()`, look for:
  ```typescript
  b.angularVelocity.multiplyScalar(Math.pow(0.86, dt));
  ```
  - Lower value (e.g. `0.70`): Spin stops very quickly.
  - Higher value (e.g. `0.94`): Chips continue tumbling freely for a long time.
- **Upright Restorative Spring**: Look for `tiltX * 0.55`:
  ```typescript
  b.angularVelocity.x += -tiltX * 0.55 * dt;
  b.angularVelocity.y += -tiltY * 0.55 * dt;
  ```
  - Higher value (e.g. `1.2`): Chips right themselves facing the camera rapidly.
  - Lower value (e.g. `0.2`): Chips remain tilted in 3D for several seconds before gently returning.

### 2. Movement & Scatter Velocities
- **Scatter Impulse Speed**: In `applyImpulseToAll()`:
  ```typescript
  const speedXY = 8.0 + Math.random() * 10.0; // X and Y scatter velocity
  const velZ = (Math.random() - 0.5) * 16.0;   // 3D Depth forward/backward velocity
  ```
- **Click Punch Velocity**: In `onPointerDown`, when clicking a chip:
  ```typescript
  const punchSpeed = 10.0 + Math.random() * 6.0; // Radial kick
  body.velocity.set(
    Math.cos(punchAngle) * punchSpeed,
    Math.sin(punchAngle) * punchSpeed,
    -(8.0 + Math.random() * 6.0)                 // Z-depth kick (pushes back into screen)
  );
  ```
- **Centering Gravity Pull**: In `updatePhysics()`:
  ```typescript
  b.velocity.x += -b.position.x * 0.38 * dt; // Pull toward center X
  b.velocity.y += -b.position.y * 0.38 * dt; // Pull toward center Y
  b.velocity.z += -b.position.z * 0.55 * dt; // Pull toward center plane (z=0)
  ```
  - Higher multipliers (e.g. `0.8`): Chips quickly cluster back in the center.
  - Lower multipliers (e.g. `0.15`): Chips drift out toward the perimeter walls.
- **Air Drag (Movement Damping)**:
  ```typescript
  b.velocity.multiplyScalar(Math.pow(0.88, dt));
  ```
- **Maximum Speed Limit**:
  ```typescript
  b.velocity.clampLength(0, 18.0); // Strict upper speed ceiling
  ```

### 3. Collision Elasticity & Bounciness
- In `updatePhysics()`, look for `const restitution = 0.82;`:
  - `0.95`: Highly bouncy, rubber-like collisions.
  - `0.50`: Moderate, heavier metal collisions.
  - `0.20`: Inelastic thud.
- Look for `torqueMag = impulseMagnitude * 0.18;`:
  - Controls how much rotational spin is transferred between chips upon impact.

---

## 4. 3D Depth Boundaries (Z-Axis Range)

The 3D boundary volume is defined in `getBounds()` in `HeroToolsScene.ts`:

```typescript
public getBounds(): { boundX: number; boundY: number; minZ: number; maxZ: number } {
  // Horizontal & vertical bounds automatically calculated from camera FOV and aspect ratio
  const boundX = (visibleWidthAtZero * 0.5) * 0.84;
  const boundY = (visibleHeightAtZero * 0.5) * 0.80;
  
  // 3D Depth boundaries:
  const minZ = -5.5; // Furthest back depth (smaller perspective scale)
  const maxZ = 4.2;  // Closest depth toward camera (larger perspective scale)

  return { boundX, boundY, minZ, maxZ };
}
```

---

## 5. Background Vignette Shader & Color Palettes

The background is an interactive WebGL shader rendered on a full-screen quad (`bgMesh`) behind all 3D chips.

### Adding or Customizing Mood Palettes
In `HeroToolsScene.ts`, edit the `palettes` array:

```typescript
private palettes = [
  { c0: new THREE.Color('#141d3d'), c1: new THREE.Color('#05070f') }, // Midnight Navy
  { c0: new THREE.Color('#0c2b25'), c1: new THREE.Color('#030e0c') }, // Emerald Obsidian
  { c0: new THREE.Color('#24113a'), c1: new THREE.Color('#0b0514') }, // Imperial Violet
  { c0: new THREE.Color('#2b0e1d'), c1: new THREE.Color('#0e0409') }, // Crimson Velvet
  { c0: new THREE.Color('#261a0c'), c1: new THREE.Color('#0e0803') }, // Royal Bronze / Amber
  { c0: new THREE.Color('#0c2534'), c1: new THREE.Color('#030d15') }, // Cyan Abyss
  { c0: new THREE.Color('#1b1e28'), c1: new THREE.Color('#080a0e') }, // Graphite Slate
];
```
- `c0`: Center spotlight color (illuminated area behind chips and under cursor).
- `c1`: Edge vignette color (fades toward container border).

### Adjusting Color Transition Speed
In `startLoop()`:
```typescript
// dt * 3.5 creates a smooth ~0.3s color morph upon each click
this.currentColor0.lerp(this.targetColor0, dt * 3.5);
this.currentColor1.lerp(this.targetColor1, dt * 3.5);
```

---

## 6. Layout Switching: Full Deck vs 40/60 Split

You can switch layouts statically or interactively:

### In Astro:
```astro
---
import HeroTools from "../components/home/HeroTools/HeroTools.astro";
---

<!-- 1. Full Deck (Default, full-bleed 3D physics stage) -->
<HeroTools layout="full" />

<!-- 2. 40/60 Split Mode (Left 40% headline & CTAs, Right 60% dedicated 3D scene) -->
<HeroTools layout="split" />
```

### In URL / Live Preview:
- Full Deck: `http://localhost:4321/hero-tools`
- 40/60 Split Mode: `http://localhost:4321/hero-tools?layout=split`
- Live toggle buttons are also built into the floating glass preview banner in the top-right corner.
