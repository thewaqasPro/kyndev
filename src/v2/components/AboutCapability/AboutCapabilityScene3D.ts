/**
 * Kyndev V2 - About Capability 3D Scene
 *
 * Implements the authentic Dual 3D Ribbon Curves & Spatial Parallax
 * ported directly from src/scripts/unpacked-project/deobfuscated.js (AboutCapabilitySection lines 20570-20584).
 *
 * Features:
 * 1. 3D Binary Ribbon 1: Loaded from /assets/models/lines/line_capability.buf
 *    - Authentic shader (vert$j + frag$m) with monochromatic gradient (#fff to #bbb)
 *    - Ambient occlusion threshold 0.0001 and smooth aspect fitting
 * 2. 3D Binary Ribbon 2: Loaded from /assets/models/lines/line_office.buf
 *    - Intersecting flow with offset margin (y: -2.2)
 * 3. Reactive Mouse Parallax & Dynamic progressive scroll ratio
 */

import * as THREE from 'three';
import { BufLoader } from '../../core/BufLoader';
import { math } from '../../shared/math';

// Ribbon Vertex Shader (vert$j)
const ribbonVert = `
attribute vec3 CP;
attribute float Cd;
varying float v_cd;
varying float v_lineRatio;
varying float v_s;
uniform float u_scrollY;
uniform vec2 u_viewportResolution;
uniform vec2 u_aspect;
uniform vec2 u_margin;
uniform float u_radius;

void main() {
  vec3 pos = vec3(CP.xy + position.xy * u_radius, 0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_cd = Cd;
  v_lineRatio = position.z;
  v_s = CP.z;
}
`;

// Ribbon Fragment Shader (frag$m)
const ribbonFrag = `
varying float v_cd;
varying float v_lineRatio;
varying float v_s;
uniform float u_showRatio;
uniform float u_hideRatio;
uniform vec3 u_colorBg;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform float u_aoThreshold;

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

vec3 hsv2rgb(in vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  rgb = rgb * rgb * (3.0 - 2.0 * rgb);
  return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.gb, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 lerpHSV(in vec3 a, in vec3 b, in float x) {
  float hue = (mod(mod((b.x - a.x), 1.0) + 1.5, 1.0) - 0.5) * x + a.x;
  return vec3(hue, mix(a.yz, b.yz, x));
}

void main() {
  float ao = 0.9 + 0.1 * v_cd;
  float aoRatio = linearStep(u_aoThreshold - 0.02, u_aoThreshold + 0.02, u_showRatio);
  if (step(u_showRatio, v_lineRatio) > 0.5) discard;
  
  float mixRatio = 1.0 - pow(1.0 - clamp(v_lineRatio, 0.0, 1.0), 2.0);
  gl_FragColor.rgb = hsv2rgb(lerpHSV(rgb2hsv(u_color1), rgb2hsv(u_color0), mixRatio));
  gl_FragColor.rgb *= min(1.0, ao + 1.0 - aoRatio);
  
  float alpha = abs(v_s - 0.5);
  gl_FragColor.a = linearStep(0.5, 0.5 - fwidth(alpha), alpha) * 0.95;
}
`;

export class AboutCapabilityScene3D {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Ribbon line groups
  private ribbonGroup1: THREE.Group;
  private ribbonMesh1: THREE.Mesh | null = null;
  private ribbonGroup2: THREE.Group;
  private ribbonMesh2: THREE.Mesh | null = null;

  // Ambient kinetic particles
  private ambientParticles: THREE.Points | null = null;

  private width = 0;
  private height = 0;
  private targetShowRatio = 0.95;
  private currentShowRatio = 0.0;
  private mouseTarget = new THREE.Vector2(0, 0);
  private mouseCurrent = new THREE.Vector2(0, 0);

  private rafId: number | null = null;
  private isDestroyed = false;
  private clock = new THREE.Clock();

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'v2-capability-3d-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.ribbonGroup1 = new THREE.Group();
    this.ribbonGroup2 = new THREE.Group();

    this.scene.add(this.ribbonGroup1);
    this.scene.add(this.ribbonGroup2);

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
  }

  public async init(): Promise<void> {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 750;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.updateCamera();

    // 1. Load Dual 3D Binary Ribbons
    await Promise.all([
      this.initRibbon1(),
      this.initRibbon2()
    ]);

    // 2. Add subtle ambient depth particles
    this.initAmbientParticles();

    this.bindEvents();
    this.startLoop();
  }

  private updateCamera(): void {
    const w = this.width;
    const h = this.height;
    this.camera.aspect = w / h;
    this.camera.position.set(0, 0, 7.5);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  private async initRibbon1(): Promise<void> {
    try {
      const geom = await BufLoader.load('/assets/models/lines/line_capability.buf');
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          u_showRatio: { value: 0.0 },
          u_aoThreshold: { value: 0.0001 },
          u_color0: { value: new THREE.Color('#ffffff') },
          u_color1: { value: new THREE.Color('#bbbbbb') },
          u_colorBg: { value: new THREE.Color('#0b0c0e') },
          u_radius: { value: 0.016 },
          u_aspect: { value: new THREE.Vector2() },
          u_margin: { value: new THREE.Vector2(0, -1.15) },
          u_viewportResolution: { value: new THREE.Vector2(this.width, this.height) },
          u_scrollY: { value: 0.0 }
        },
        vertexShader: ribbonVert,
        fragmentShader: ribbonFrag,
        transparent: true,
        depthTest: false,
        side: THREE.DoubleSide
      });

      this.ribbonMesh1 = new THREE.Mesh(geom, mat);
      this.ribbonMesh1.frustumCulled = false;
      this.ribbonGroup1.add(this.ribbonMesh1);

      this.resizeRibbon(this.ribbonMesh1, this.ribbonGroup1, 0, -0.6);
    } catch (err) {
      console.warn('Failed to load line_capability.buf:', err);
    }
  }

  private async initRibbon2(): Promise<void> {
    try {
      const geom = await BufLoader.load('/assets/models/lines/line_office.buf');
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          u_showRatio: { value: 0.0 },
          u_aoThreshold: { value: 0.0001 },
          u_color0: { value: new THREE.Color('#ffffff') },
          u_color1: { value: new THREE.Color('#bbbbbb') },
          u_colorBg: { value: new THREE.Color('#0b0c0e') },
          u_radius: { value: 0.014 },
          u_aspect: { value: new THREE.Vector2() },
          u_margin: { value: new THREE.Vector2(0, -2.2) },
          u_viewportResolution: { value: new THREE.Vector2(this.width, this.height) },
          u_scrollY: { value: 0.0 }
        },
        vertexShader: ribbonVert,
        fragmentShader: ribbonFrag,
        transparent: true,
        depthTest: false,
        side: THREE.DoubleSide
      });

      this.ribbonMesh2 = new THREE.Mesh(geom, mat);
      this.ribbonMesh2.frustumCulled = false;
      this.ribbonGroup2.add(this.ribbonMesh2);

      this.resizeRibbon(this.ribbonMesh2, this.ribbonGroup2, 0.4, 0.2);
    } catch (err) {
      console.warn('Failed to load line_office.buf:', err);
    }
  }

  private resizeRibbon(mesh: THREE.Mesh, group: THREE.Group, offsetX: number, offsetY: number): void {
    const w = this.width;
    const h = this.height;
    const r = h / Math.sqrt(w * w + h * h);
    const aspectVec = new THREE.Vector2((w / h) * r, r);
    const mat = mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_aspect.value.copy(aspectVec);
    mat.uniforms.u_viewportResolution.value.set(w, h);

    const c = 7.0;
    group.position.set(offsetX, offsetY, -1.0);
    group.scale.set(c, c * (h / w), 1);
  }

  private initAmbientParticles(): void {
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      opacities[i] = 0.2 + Math.random() * 0.6;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('a_opacity', new THREE.BufferAttribute(opacities, 1));

    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(0x38bdf8) }
      },
      vertexShader: `
        attribute float a_opacity;
        varying float v_opacity;
        uniform float u_time;
        void main() {
          v_opacity = a_opacity;
          vec3 pos = position;
          pos.y += sin(u_time * 0.6 + position.x * 2.0) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.5 * (10.0 / -gl_Position.z);
        }
      `,
      fragmentShader: `
        uniform vec3 u_color;
        varying float v_opacity;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(u_color, (1.0 - dist * 2.0) * v_opacity * 0.45);
        }
      `,
      transparent: true,
      depthTest: false
    });

    this.ambientParticles = new THREE.Points(geom, pMat);
    this.scene.add(this.ambientParticles);
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onResize = (): void => {
    if (!this.container || !this.renderer) return;
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 750;

    this.renderer.setSize(this.width, this.height);
    this.updateCamera();

    if (this.ribbonMesh1) this.resizeRibbon(this.ribbonMesh1, this.ribbonGroup1, 0, -0.6);
    if (this.ribbonMesh2) this.resizeRibbon(this.ribbonMesh2, this.ribbonGroup2, 0.4, 0.2);
  };

  private onMouseMove = (e: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.mouseTarget.set(nx, ny);
  };

  private startLoop(): void {
    const tick = (): void => {
      if (this.isDestroyed || !this.renderer) return;
      const elapsedTime = this.clock.getElapsedTime();

      this.mouseCurrent.lerp(this.mouseTarget, 0.05);

      // Smooth progressive entrance of ribbons
      this.currentShowRatio = math.lerp(this.currentShowRatio, this.targetShowRatio, 0.04);

      if (this.ribbonMesh1) {
        const mat = this.ribbonMesh1.material as THREE.ShaderMaterial;
        mat.uniforms.u_showRatio.value = this.currentShowRatio;
        this.ribbonGroup1.rotation.y = this.mouseCurrent.x * 0.15;
        this.ribbonGroup1.rotation.x = -this.mouseCurrent.y * 0.1;
      }

      if (this.ribbonMesh2) {
        const mat = this.ribbonMesh2.material as THREE.ShaderMaterial;
        mat.uniforms.u_showRatio.value = this.currentShowRatio;
        this.ribbonGroup2.rotation.y = this.mouseCurrent.x * 0.12;
        this.ribbonGroup2.rotation.x = -this.mouseCurrent.y * 0.08;
      }

      if (this.ambientParticles) {
        const pMat = this.ambientParticles.material as THREE.ShaderMaterial;
        pMat.uniforms.u_time.value = elapsedTime;
        this.ambientParticles.rotation.y = elapsedTime * 0.02 + this.mouseCurrent.x * 0.05;
      }

      this.renderer.render(this.scene, this.camera);
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);

    if (this.ribbonMesh1) {
      this.ribbonMesh1.geometry.dispose();
      (this.ribbonMesh1.material as THREE.Material).dispose();
    }
    if (this.ribbonMesh2) {
      this.ribbonMesh2.geometry.dispose();
      (this.ribbonMesh2.material as THREE.Material).dispose();
    }
    if (this.ambientParticles) {
      this.ambientParticles.geometry.dispose();
      (this.ambientParticles.material as THREE.Material).dispose();
    }

    this.renderer?.dispose();
    this.canvas.remove();
  }
}
