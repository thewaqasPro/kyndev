import * as THREE from 'three';

/**
 * Procedural Texture and PBR Material Factory for ProductViewer
 */

/**
 * Generates an authentic high-resolution procedural cork texture with laser-engraved
 * technical typography and circuitry markings for the Oryzo-1 Neural Coaster.
 */
export function createCorkCanvasTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Base cork tone
  ctx.fillStyle = '#b78759';
  ctx.fillRect(0, 0, size, size);

  // 2. Procedural agglomerate cork granule flecks (120,000 multi-frequency grains)
  const corkPalette = ['#9b683b', '#cf9e6f', '#7e5229', '#dcb183', '#5d3b1b', '#c29263'];
  for (let i = 0; i < 90000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.8 + 0.6;
    ctx.fillStyle = corkPalette[Math.floor(Math.random() * corkPalette.length)];
    ctx.globalAlpha = Math.random() * 0.45 + 0.15;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.6 + Math.random() * 0.8), Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Subtle organic cork fiber streaks
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const len = Math.random() * 16 + 6;
    const angle = Math.random() * Math.PI * 2;
    ctx.strokeStyle = '#432612';
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  // 4. Laser-engraved markings (dark charred brown / recessed laser burn)
  ctx.globalAlpha = 0.82;
  ctx.strokeStyle = '#2b1b11';
  ctx.fillStyle = '#2b1b11';
  const cx = size / 2;
  const cy = size / 2;

  // Outer concentric precision rings
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.46, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.38, 0, Math.PI * 2);
  ctx.stroke();

  // Compass / radar perimeter tick marks (64 precision ticks)
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const isMajor = i % 8 === 0;
    const rOuter = size * 0.46;
    const rInner = isMajor ? size * 0.42 : size * 0.445;
    ctx.lineWidth = isMajor ? 2.5 : 1.2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * rInner, cy + Math.sin(angle) * rInner);
    ctx.lineTo(cx + Math.cos(angle) * rOuter, cy + Math.sin(angle) * rOuter);
    ctx.stroke();
  }

  // Circular laser-etched typography along the top ring
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const topText = 'ORYZO // NEURAL COASTER GEN-1';
  drawCurvedText(ctx, topText, cx, cy, size * 0.41, -Math.PI / 2, true);

  // Bottom ring typography
  ctx.font = '500 16px "IBM Plex Mono", monospace';
  const bottomText = 'KYNDEV AUTONOMOUS SURFACE • PROTO-04';
  drawCurvedText(ctx, bottomText, cx, cy, size * 0.41, Math.PI / 2, false);

  // Center neural circuit aperture & insignia
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.16, 0, Math.PI * 2);
  ctx.stroke();

  // Inner crosshairs & telemetry
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy);
  ctx.lineTo(cx + 30, cy);
  ctx.moveTo(cx, cy - 30);
  ctx.lineTo(cx, cy + 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();

  // Circuit trace segments radiating outward
  for (let a = 0; a < 8; a++) {
    const ang = (a / 8) * Math.PI * 2 + Math.PI / 8;
    const r1 = size * 0.18;
    const r2 = size * 0.28;
    const r3 = size * 0.35;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
    ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
    // 45-degree dog-leg trace
    const angOffset = ang + 0.15;
    ctx.lineTo(cx + Math.cos(angOffset) * r3, cy + Math.sin(angOffset) * r3);
    ctx.stroke();

    // Circuit contact via pad
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angOffset) * r3, cy + Math.sin(angOffset) * r3, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Generates corresponding bump height map for the cork surface.
 * Recessed engravings are darker (indented), cork pores are granular.
 */
export function createCorkBumpTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Neutral mid-gray base
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Grain height noise
  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.2 + 0.5;
    const val = Math.random() > 0.5 ? 200 : 80;
    ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
    ctx.globalAlpha = Math.random() * 0.35 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Laser engraved depth channels (darker = recessed)
  const cx = size / 2;
  const cy = size / 2;
  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.46, 0, Math.PI * 2);
  ctx.arc(cx, cy, size * 0.38, 0, Math.PI * 2);
  ctx.arc(cx, cy, size * 0.16, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Helper to render curved text along a circular arc.
 */
function drawCurvedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  centerAngle: number,
  inward: boolean
): void {
  ctx.save();
  const chars = text.split('');
  const totalAngle = (text.length * 15 * Math.PI) / (180 * (radius / 100));
  const startAngle = centerAngle - totalAngle / 2;

  chars.forEach((char, i) => {
    const charAngle = startAngle + (i / (chars.length - 1)) * totalAngle;
    ctx.save();
    ctx.translate(cx + Math.cos(charAngle) * radius, cy + Math.sin(charAngle) * radius);
    ctx.rotate(charAngle + (inward ? Math.PI / 2 : -Math.PI / 2));
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
  ctx.restore();
}

/**
 * Generates a soft blurred radial contact shadow plane texture.
 */
export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = size / 2;
  const cy = size / 2;
  const gradient = ctx.createRadialGradient(cx, cy, size * 0.08, cx, cy, size * 0.48);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.45)');
  gradient.addColorStop(0.65, 'rgba(0, 0, 0, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Normal Vector Prepass Material (Visualizes tangent/world surface normals in RGB)
 */
export function createNormalsPrepassMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        vec3 n = normalize(vNormal) * 0.5 + 0.5;
        gl_FragColor = vec4(n, 1.0);
      }
    `,
  });
}

/**
 * Depth Occlusion Prepass Material (Visualizes z-depth buffer gradient)
 */
export function createDepthPrepassMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uNear: { value: 1.0 },
      uFar: { value: 8.0 },
    },
    vertexShader: `
      varying float vDepth;
      void main() {
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mvPos.z;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uNear;
      uniform float uFar;
      varying float vDepth;
      void main() {
        float d = clamp((vDepth - uNear) / (uFar - uNear), 0.0, 1.0);
        // Cool cyan-blue to white to deep slate depth spectrum
        vec3 col = mix(vec3(0.04, 0.12, 0.28), vec3(0.85, 0.95, 1.0), 1.0 - d);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}

/**
 * Wireframe Topology Prepass Material
 */
export function createWireframeMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  });
}

/**
 * Ensures geometry has valid UV coordinates for PBR and procedural textures.
 * Uses cylindrical/spherical planar projection if missing.
 */
export function ensureUVs(geometry: THREE.BufferGeometry): void {
  if (geometry.getAttribute('uv')) return;
  const pos = geometry.getAttribute('position');
  if (!pos) return;
  const count = pos.count;
  const uvs = new Float32Array(count * 2);
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox || new THREE.Box3();
  const size = new THREE.Vector3();
  bbox.getSize(size);
  const min = bbox.min;
  const sy = size.y || 1;

  for (let i = 0; i < count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const u = Math.atan2(x, z) / (2 * Math.PI) + 0.5;
    const v = (y - min.y) / sy;
    uvs[i * 2] = u;
    uvs[i * 2 + 1] = v;
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
}
