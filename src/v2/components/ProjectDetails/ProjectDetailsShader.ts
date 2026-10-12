/**
 * Kyndev V2 - Project Details WebGL Image Shader
 *
 * Implements the authentic UfxMesh Image Shader ported directly from
 * src/scripts/unpacked-project/deobfuscated.js (lines 14585-14603).
 *
 * Features:
 * 1. sdRoundedBox Signed Distance Field mask with subpixel antialiasing via fwidth(d)
 * 2. Internal texture UV parallax shift responding to horizontal pan (u_parallax)
 * 3. Subtle blue noise film grain and readyRatio highlight color flash
 */

import * as THREE from 'three';

const imageVert = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const imageFrag = `
uniform sampler2D u_texture;
uniform vec2 u_domWH;
uniform float u_parallax;
uniform float u_parallaxRatio;
uniform float u_borderRadius;
uniform float u_activeRatio;
uniform float u_readyRatio;
uniform vec3 u_highlightColor;
uniform float u_time;
varying vec2 v_uv;

float sdRoundedBox(in vec2 p, in vec2 b, in vec4 r) {
  r.xy = (p.x > 0.0) ? r.xy : r.zw;
  r.x = (p.y > 0.0) ? r.x : r.y;
  vec2 q = abs(p) - b + r.x;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
}

float getRoundedCornerMask(vec2 uv, vec4 radius) {
  float d = sdRoundedBox((uv - 0.5) * u_domWH, u_domWH * 0.5 * mix(0.9, 1.0, u_activeRatio), radius.yzwx);
  return smoothstep(0.0, 0.0 - fwidth(d), d);
}

float pseudoNoise(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = v_uv;
  uv -= 0.5;
  uv *= mix(0.92, 1.0, u_activeRatio);
  uv.x *= u_parallaxRatio;
  uv.x += u_parallax * (1.0 - u_parallaxRatio);
  uv += 0.5;

  vec3 color = texture2D(u_texture, uv).rgb;
  float imageAlpha = getRoundedCornerMask(v_uv, vec4(u_borderRadius));
  color = mix(u_highlightColor, color, u_readyRatio);

  // Subtle blue noise film grain
  float noise = (pseudoNoise(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.035;
  color += vec3(noise);

  gl_FragColor = vec4(color, imageAlpha);
}
`;

export class ProjectDetailsImageShader {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private mesh: THREE.Mesh | null = null;
  private texture: THREE.Texture | null = null;

  private width = 0;
  private height = 0;
  private isDestroyed = false;

  constructor(container: HTMLElement, imageSrc: string, highlightColor = '#061dfb') {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'v2-pd-shader-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.borderRadius = '16px';
    this.canvas.style.zIndex = '1';

    this.container.style.position = 'relative';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.init(imageSrc, highlightColor).catch(console.error);
  }

  private async init(imageSrc: string, highlightHex: string): Promise<void> {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 400;
    this.height = rect.height || 300;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const texLoader = new THREE.TextureLoader();
    this.texture = await new Promise<THREE.Texture>((resolve) => {
      texLoader.load(imageSrc, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        resolve(tex);
      });
    });

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: this.texture },
        u_domWH: { value: new THREE.Vector2(this.width, this.height) },
        u_parallax: { value: 0.0 },
        u_parallaxRatio: { value: 0.88 },
        u_borderRadius: { value: 16.0 },
        u_activeRatio: { value: 1.0 },
        u_readyRatio: { value: 1.0 },
        u_highlightColor: { value: new THREE.Color(highlightHex) },
        u_time: { value: 0.0 }
      },
      vertexShader: imageVert,
      fragmentShader: imageFrag,
      transparent: true,
      depthTest: false
    });

    const geom = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(geom, mat);
    this.scene.add(this.mesh);

    // Initial render
    this.render(0, 0);
  }

  public render(parallaxOffset: number, elapsedTime: number): void {
    if (this.isDestroyed || !this.renderer || !this.mesh) return;

    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_parallax.value = parallaxOffset;
    mat.uniforms.u_time.value = elapsedTime;

    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    if (!this.renderer || !this.mesh) return;
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.renderer.setSize(this.width, this.height);
    const mat = this.mesh.material as THREE.ShaderMaterial;
    mat.uniforms.u_domWH.value.set(this.width, this.height);
  }

  public destroy(): void {
    this.isDestroyed = true;
    this.texture?.dispose();
    this.mesh?.geometry.dispose();
    (this.mesh?.material as THREE.Material)?.dispose();
    this.renderer?.dispose();
    this.canvas.remove();
  }
}
