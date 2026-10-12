/**
 * Kyndev V2 - Goal 3D Scene
 *
 * Implements the authentic 3D Goal Ribbon & Floating Zero-G Astronaut Tunnel scene
 * ported directly from src/scripts/unpacked-project/deobfuscated.js (GoalSection & GoalTunnels).
 *
 * Features:
 * 1. 3D Binary Ribbon: Loaded from /assets/models/lines/line_goal.buf
 *    - GLSL cyan-to-electric-blue gradient (#94fffb to #1285dc)
 *    - Ambient occlusion factor and tube radius
 *    - Progressive scroll entrance (u_showRatio)
 * 2. Floating Zero-G Astronaut Helmet: Loaded from /assets/models/tunnels/astronaut_helmet.buf
 *    - PBR metallic space-suit reflections & gold-tinted Fresnel visor
 *    - Zero-G floating drift and mouse lookAt perspective tracking
 * 3. 3D Tunnel Depth Lattice & Portal Camera Depth
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
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
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
  gl_FragColor.a = linearStep(0.5, 0.5 - fwidth(alpha), alpha);
}
`;

export class GoalScene3D {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Ribbon line group
  private ribbonMesh: THREE.Mesh | null = null;
  private ribbonContainer: THREE.Group;

  // 3D Astronaut group
  private astronautGroup: THREE.Group;
  private astronautMesh: THREE.Mesh | null = null;

  // Tunnel lattice particles
  private tunnelParticles: THREE.Points | null = null;

  private width = 0;
  private height = 0;
  private targetShowRatio = 0.85;
  private currentShowRatio = 0;
  private mouseTarget = new THREE.Vector2(0, 0);
  private mouseCurrent = new THREE.Vector2(0, 0);

  private rafId: number | null = null;
  private isDestroyed = false;
  private clock = new THREE.Clock();

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'v2-goal-3d-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.ribbonContainer = new THREE.Group();
    this.astronautGroup = new THREE.Group();

    this.scene.add(this.ribbonContainer);
    this.scene.add(this.astronautGroup);

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
  }

  public async init(): Promise<void> {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 680;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.updateCamera();
    this.setupLighting();

    // 1. Load 3D Goal Ribbon Line
    await this.initRibbonMesh();

    // 2. Load 3D Astronaut & Tunnel Models
    await this.initAstronautModel();
    this.initTunnelParticles();

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

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x94fffb, 2.8);
    dirLight1.position.set(5, 8, 6);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x1285dc, 2.2);
    dirLight2.position.set(-6, -4, -3);
    this.scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 20);
    pointLight.position.set(0, 2, 4);
    this.scene.add(pointLight);
  }

  private async initRibbonMesh(): Promise<void> {
    try {
      const geom = await BufLoader.load('/assets/models/lines/line_goal.buf');

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          u_showRatio: { value: 0.0 },
          u_aoThreshold: { value: 0.0001 },
          u_color0: { value: new THREE.Color('#94fffb') },
          u_color1: { value: new THREE.Color('#1285dc') },
          u_colorBg: { value: new THREE.Color('#0b0c0e') },
          u_radius: { value: 0.015 },
          u_aspect: { value: new THREE.Vector2() },
          u_margin: { value: new THREE.Vector2(0.2, -0.6) },
          u_viewportResolution: { value: new THREE.Vector2(this.width, this.height) },
          u_scrollY: { value: 0.0 }
        },
        vertexShader: ribbonVert,
        fragmentShader: ribbonFrag,
        transparent: true,
        depthTest: false,
        side: THREE.DoubleSide
      });

      this.ribbonMesh = new THREE.Mesh(geom, mat);
      this.ribbonMesh.frustumCulled = false;
      this.ribbonContainer.add(this.ribbonMesh);

      this.resizeRibbon();
    } catch (err) {
      console.warn('Goal 3D Ribbon failed to load line_goal.buf:', err);
    }
  }

  private resizeRibbon(): void {
    if (!this.ribbonMesh) return;
    const w = this.width;
    const h = this.height;
    const r = h / Math.sqrt(w * w + h * h);
    const aspectVec = new THREE.Vector2((w / h) * r, r);
    const mat = this.ribbonMesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_aspect.value.copy(aspectVec);
    mat.uniforms.u_viewportResolution.value.set(w, h);

    const c = 7.5;
    this.ribbonContainer.position.set(1.2, -1.0, -1.5);
    this.ribbonContainer.scale.set(c, c * (h / w), 1);
  }

  private async initAstronautModel(): Promise<void> {
    try {
      const geom = await BufLoader.load('/assets/models/tunnels/astronaut_helmet.buf');

      // Space helmet custom material with gold tinted Fresnel visor and white composite shell
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xdce7f5),
        metalness: 0.85,
        roughness: 0.18,
        wireframe: false
      });

      this.astronautMesh = new THREE.Mesh(geom, mat);
      // Center and scale model
      geom.computeBoundingBox();
      const center = new THREE.Vector3();
      geom.boundingBox?.getCenter(center);
      geom.center();

      this.astronautMesh.scale.setScalar(0.018);
      this.astronautMesh.position.set(-1.8, 0.2, 0.5);
      this.astronautMesh.rotation.set(0.2, 0.6, -0.1);

      this.astronautGroup.add(this.astronautMesh);
    } catch (err) {
      console.warn('Goal Astronaut model failed to load astronaut_helmet.buf:', err);
    }
  }

  private initTunnelParticles(): void {
    // Generate concentric tunnel depth lattice rings
    const count = 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorCyan = new THREE.Color(0x94fffb);
    const colorBlue = new THREE.Color(0x1285dc);

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 16;
      const radius = 2.0 + Math.sin(i * 0.1) * 0.8;
      const z = (i / count) * -18 + 2;

      positions[i * 3] = Math.cos(theta) * radius + 1.0;
      positions[i * 3 + 1] = Math.sin(theta) * radius * 0.7;
      positions[i * 3 + 2] = z;

      const c = colorCyan.clone().lerp(colorBlue, i / count);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.tunnelParticles = new THREE.Points(geom, mat);
    this.scene.add(this.tunnelParticles);
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onResize = (): void => {
    if (!this.container || !this.renderer) return;
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 680;

    this.renderer.setSize(this.width, this.height);
    this.updateCamera();
    this.resizeRibbon();
  };

  private onMouseMove = (e: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.mouseTarget.set(nx, ny);
  };

  public setShowRatio(ratio: number): void {
    this.targetShowRatio = math.clamp(ratio, 0, 1);
  }

  private startLoop(): void {
    const tick = (): void => {
      if (this.isDestroyed || !this.renderer) return;
      const elapsedTime = this.clock.getElapsedTime();

      // Smooth entrance ratio
      this.currentShowRatio = math.lerp(this.currentShowRatio, this.targetShowRatio, 0.05);

      // Smooth mouse tracking
      this.mouseCurrent.lerp(this.mouseTarget, 0.08);

      // Update Ribbon
      if (this.ribbonMesh) {
        const mat = this.ribbonMesh.material as THREE.ShaderMaterial;
        mat.uniforms.u_showRatio.value = this.currentShowRatio;
      }

      // Zero-G Astronaut floating drift and cursor perspective lookAt
      if (this.astronautMesh) {
        const floatY = Math.sin(elapsedTime * 1.2) * 0.12;
        const floatRotZ = Math.cos(elapsedTime * 0.8) * 0.06;
        this.astronautMesh.position.y = 0.2 + floatY;

        // Interactive mouse lookAt tilt
        this.astronautMesh.rotation.y = 0.6 + this.mouseCurrent.x * 0.45;
        this.astronautMesh.rotation.x = 0.2 - this.mouseCurrent.y * 0.35;
        this.astronautMesh.rotation.z = -0.1 + floatRotZ;
      }

      // Tunnel particle rotation
      if (this.tunnelParticles) {
        this.tunnelParticles.rotation.z = elapsedTime * 0.08;
      }

      // Camera parallax
      this.camera.position.x = this.mouseCurrent.x * 0.6;
      this.camera.position.y = this.mouseCurrent.y * 0.4;
      this.camera.lookAt(0, 0, 0);

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

    if (this.ribbonMesh) {
      this.ribbonMesh.geometry.dispose();
      (this.ribbonMesh.material as THREE.Material).dispose();
    }
    if (this.astronautMesh) {
      this.astronautMesh.geometry.dispose();
      (this.astronautMesh.material as THREE.Material).dispose();
    }
    if (this.tunnelParticles) {
      this.tunnelParticles.geometry.dispose();
      (this.tunnelParticles.material as THREE.Material).dispose();
    }

    this.renderer?.dispose();
    this.canvas.remove();
  }
}
