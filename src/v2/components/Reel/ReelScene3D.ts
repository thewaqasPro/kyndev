/**
 * Kyndev V2 - Reel 3D Scene
 *
 * Implements the authentic 3D Ribbon & WebGL Video shaders ported directly
 * from src/scripts/unpacked-project/deobfuscated.js (HomeReelSection).
 *
 * Features:
 * 1. 3D Binary Ribbon: Loaded from /assets/models/lines/line_reel.buf
 *    - Custom GLSL HSV gradient (#5a90ff to #2a38ee)
 *    - Ambient occlusion factor and tube radius
 *    - Progressive scroll/entrance draw-in (u_showRatio) with glowing tip
 * 2. WebGL Video Mesh:
 *    - Segmented plane running /assets/textures/reel/desktop.mp4
 *    - Custom video shaders (videoVert / videoFrag)
 *    - Rounded corner box mask (sdRoundedBox)
 *    - Radial center distortion following cursor (u_radialCenter)
 *    - Color tinting and aspect ratio scale
 */

import * as THREE from 'three';
import { BufLoader } from '../../core/BufLoader';
import { math } from '../../shared/math';

// Ribbon Vertex Shader from deobfuscated.js (vert$j)
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

// Ribbon Fragment Shader from deobfuscated.js (frag$m)
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

// Video Mesh Vertex Shader from deobfuscated.js (videoVert)
const videoVert = `
uniform vec2 u_domXY;
uniform vec2 u_domWH;
uniform float u_showRatio;
varying vec2 v_uv;
varying vec2 v_domWH;
varying float v_showRatio;

void main() {
  v_showRatio = u_showRatio;
  v_uv = vec2(uv.x, 1.0 - uv.y);
  v_domWH = u_domWH;
  
  // 3D subtle depth projection
  vec3 pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Video Mesh Fragment Shader from deobfuscated.js (videoFrag)
const videoFrag = `
uniform sampler2D u_texture;
uniform vec3 u_color;
uniform vec2 u_radialCenter;
uniform float u_showRatio;
uniform float u_aspectScale;
uniform float u_globalRadius;
varying vec2 v_uv;
varying vec2 v_domWH;
varying float v_showRatio;

float linearStep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sdRoundedBox(in vec2 p, in vec2 b, in float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

float getRoundedCornerMask(vec2 uv, vec2 size, float radius) {
  vec2 halfSize = size * 0.5;
  float d = sdRoundedBox((uv - 0.5) * size, halfSize, radius);
  return smoothstep(0.0, -fwidth(d), d);
}

// Procedural high-frequency blue noise hash for organic dithering
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 baseUv = v_uv;
  
  // Radial warping centered at cursor
  vec2 distVec = (baseUv - u_radialCenter) * vec2(v_domWH.x / v_domWH.y, 1.0);
  float dist = length(distVec);
  baseUv += distVec * (1.0 - smoothstep(0.0, 0.8, dist)) * 0.03 * (1.0 - v_showRatio);
  
  baseUv.y = (baseUv.y - 0.5) * mix(1.0, u_aspectScale, v_showRatio) + 0.5;
  vec3 color = texture2D(u_texture, baseUv).rgb;
  
  // Signature Kyndev blue-tint threshold mix
  vec3 tintedColor = max(u_color, vec3(dot(color, vec3(0.299, 0.587, 0.114))));
  vec3 finalColor = mix(tintedColor, color, v_showRatio);
  
  // Subtle blue noise film grain
  float noise = (hash12(gl_FragCoord.xy) - 0.5) * 0.03;
  finalColor += noise;
  
  float mask = getRoundedCornerMask(v_uv, v_domWH, u_globalRadius);
  gl_FragColor = vec4(finalColor, mask);
}
`;

export class ReelScene3D {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Ribbon line components
  private ribbonMesh: THREE.Mesh | null = null;
  private ribbonContainer: THREE.Group;
  private ribbonGeometry: THREE.BufferGeometry | null = null;

  // Video mesh components
  private video: HTMLVideoElement | null = null;
  private videoTexture: THREE.VideoTexture | null = null;
  private videoMesh: THREE.Mesh | null = null;

  // Animation & Interaction state
  private width = 0;
  private height = 0;
  private targetShowRatio = 0.85;
  private currentShowRatio = 0;
  private mouseRadial = new THREE.Vector2(0.5, 0.5);
  private rafId: number | null = null;
  private isDestroyed = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'v2-reel-3d-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '2';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.ribbonContainer = new THREE.Group();
    this.scene.add(this.ribbonContainer);

    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000);
  }

  public async init(): Promise<void> {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;

    // Initialize WebGLRenderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);

    this.updateCamera();

    // 1. Setup Video WebGL Surface
    await this.initVideoMesh();

    // 2. Load 3D Binary Ribbon Line
    await this.initRibbonMesh();

    this.bindEvents();
    this.startLoop();
  }

  private updateCamera(): void {
    const w = this.width;
    const h = this.height;
    this.camera.fov = 60;
    this.camera.aspect = w / h;
    const zDist = h / (Math.tan(((60 * Math.PI) / 360) * 2));
    this.camera.position.set(w / 2, -h / 2, zDist);
    this.camera.lookAt(w / 2, -h / 2, 0);
    this.camera.updateProjectionMatrix();
  }

  private async initVideoMesh(): Promise<void> {
    this.video = document.createElement('video');
    this.video.src = '/assets/textures/reel/desktop.mp4';
    this.video.crossOrigin = 'anonymous';
    this.video.muted = true;
    this.video.loop = true;
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');

    try {
      await this.video.play();
    } catch {
      // Autoplay blocked fallback: resume on first user interaction
      const resume = () => {
        this.video?.play();
        window.removeEventListener('click', resume);
      };
      window.addEventListener('click', resume, { once: true });
    }

    this.videoTexture = new THREE.VideoTexture(this.video);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;

    // Create 32x32 segmented video plane
    const geom = new THREE.PlaneGeometry(this.width * 0.9, this.height * 0.85, 32, 32);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: this.videoTexture },
        u_color: { value: new THREE.Color(0x1a2e5a) },
        u_radialCenter: { value: this.mouseRadial },
        u_showRatio: { value: 0 },
        u_aspectScale: { value: 1.0 },
        u_globalRadius: { value: 24.0 },
        u_domWH: { value: new THREE.Vector2(this.width * 0.9, this.height * 0.85) }
      },
      vertexShader: videoVert,
      fragmentShader: videoFrag,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    this.videoMesh = new THREE.Mesh(geom, mat);
    this.videoMesh.position.set(this.width / 2, -this.height / 2, -5);
    this.scene.add(this.videoMesh);
  }

  private async initRibbonMesh(): Promise<void> {
    try {
      this.ribbonGeometry = await BufLoader.load('/assets/models/lines/line_reel.buf');

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          u_showRatio: { value: 0.0 },
          u_aoThreshold: { value: 0.555 },
          u_color0: { value: new THREE.Color('#5a90ff') },
          u_color1: { value: new THREE.Color('#2a38ee') },
          u_colorBg: { value: new THREE.Color('#0b0c0e') },
          u_radius: { value: 0.012 },
          u_aspect: { value: new THREE.Vector2() },
          u_margin: { value: new THREE.Vector2(-0.05, -0.8) },
          u_viewportResolution: { value: new THREE.Vector2(this.width, this.height) },
          u_scrollY: { value: 0.0 }
        },
        vertexShader: ribbonVert,
        fragmentShader: ribbonFrag,
        transparent: true,
        depthTest: false,
        side: THREE.DoubleSide
      });

      this.ribbonMesh = new THREE.Mesh(this.ribbonGeometry, mat);
      this.ribbonMesh.frustumCulled = false;
      this.ribbonContainer.add(this.ribbonMesh);

      this.resizeRibbon();
    } catch (err) {
      console.warn('Reel 3D Ribbon failed to load from line_reel.buf:', err);
    }
  }

  private resizeRibbon(): void {
    if (!this.ribbonMesh) return;
    const w = this.width;
    const h = this.height;
    const r = h / Math.sqrt(w * w + h * h);
    const aspectVec = new THREE.Vector2((w / h) * r, r);
    const ribbonMat = this.ribbonMesh.material as THREE.ShaderMaterial;
    ribbonMat.uniforms.u_aspect.value.copy(aspectVec);
    ribbonMat.uniforms.u_viewportResolution.value.set(w, h);

    const c = w / aspectVec.x;
    const u = h / aspectVec.y;
    this.ribbonContainer.position.set(-0.05 * c, -0.8 * u + h * 0.2, 10);
    this.ribbonContainer.scale.set(c, u, 1);
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onResize = (): void => {
    if (!this.container || !this.renderer) return;
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;

    this.renderer.setSize(this.width, this.height);
    this.updateCamera();

    if (this.videoMesh) {
      this.videoMesh.geometry.dispose();
      this.videoMesh.geometry = new THREE.PlaneGeometry(this.width * 0.9, this.height * 0.85, 32, 32);
      this.videoMesh.position.set(this.width / 2, -this.height / 2, -5);
      const videoMat = this.videoMesh.material as THREE.ShaderMaterial;
      videoMat.uniforms.u_domWH.value.set(this.width * 0.9, this.height * 0.85);
    }

    this.resizeRibbon();
  };

  private onMouseMove = (e: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    this.mouseRadial.set(math.clamp(nx, 0, 1), math.clamp(1 - ny, 0, 1));
  };

  public setShowRatio(ratio: number): void {
    this.targetShowRatio = math.clamp(ratio, 0, 1);
  }

  private startLoop(): void {
    const tick = (): void => {
      if (this.isDestroyed || !this.renderer) return;

      // Smooth entrance ratio interpolation
      this.currentShowRatio = math.lerp(this.currentShowRatio, this.targetShowRatio, 0.05);

      // Update Ribbon Uniforms
      if (this.ribbonMesh) {
        const ribbonMat = this.ribbonMesh.material as THREE.ShaderMaterial;
        ribbonMat.uniforms.u_showRatio.value = this.currentShowRatio;
      }

      // Update Video Mesh Uniforms
      if (this.videoMesh) {
        const videoMat = this.videoMesh.material as THREE.ShaderMaterial;
        videoMat.uniforms.u_showRatio.value = this.currentShowRatio;
        videoMat.uniforms.u_radialCenter.value.copy(this.mouseRadial);
      }

      this.renderer.render(this.scene, this.camera);
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);

    if (this.video) {
      this.video.pause();
      this.video.src = '';
      this.video.remove();
    }
    this.videoTexture?.dispose();

    if (this.ribbonMesh) {
      this.ribbonMesh.geometry.dispose();
      (this.ribbonMesh.material as THREE.Material).dispose();
    }
    if (this.videoMesh) {
      this.videoMesh.geometry.dispose();
      (this.videoMesh.material as THREE.Material).dispose();
    }

    this.renderer?.dispose();
    this.canvas.remove();
  }
}
