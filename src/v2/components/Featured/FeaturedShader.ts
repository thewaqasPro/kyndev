import * as THREE from 'three';

const VERTEX_SHADER = /* glsl */ `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform sampler2D u_texture;
uniform sampler2D u_depthTexture;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv - 0.5;

  // Zoom-in scale on hover
  uv *= mix(1.0, 0.94, u_hover);

  // Parallax ray direction based on normalized mouse
  vec2 rayDir = u_mouse * mix(0.02, 0.05, u_hover);

  // 12-sample raymarching depth displacement
  vec2 currentUv = uv + 0.5;
  vec2 stepUv = rayDir / 12.0;

  for (int i = 0; i < 12; i++) {
    float depthVal = texture2D(u_depthTexture, clamp(currentUv, 0.0, 1.0)).r;
    currentUv += stepUv * (depthVal - 0.5);
  }
  currentUv = clamp(currentUv, 0.001, 0.999);

  vec4 color = texture2D(u_texture, currentUv);
  float depth = texture2D(u_depthTexture, currentUv).r;

  // Depth-of-Field bokeh blur when hovered
  if (u_hover > 0.05) {
    float focalDepth = 0.5;
    float dofDist = abs(depth - focalDepth);
    float blurAmount = u_hover * dofDist * 0.007;

    vec4 blurColor = vec4(0.0);
    for (int j = 0; j < 6; j++) {
      float angle = float(j) * 1.047197;
      vec2 offset = vec2(cos(angle), sin(angle)) * blurAmount;
      blurColor += texture2D(u_texture, clamp(currentUv + offset, 0.0, 1.0));
    }
    color = mix(color, blurColor / 6.0, clamp(blurAmount * 80.0, 0.0, 0.6));
  }

  // Atmospheric edge vignette
  float vignette = 1.0 - length(v_uv - 0.5) * 0.28;
  color.rgb *= vignette;

  gl_FragColor = vec4(color.rgb, 1.0);
}
`;

export class FeaturedShaderRenderer {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private mesh: THREE.Mesh | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private textureLoader = new THREE.TextureLoader();

  private textureCache: Map<string, THREE.Texture> = new Map();
  private depthCache: Map<string, THREE.Texture> = new Map();

  private mouseTarget = new THREE.Vector2(0, 0);
  private mouseCurrent = new THREE.Vector2(0, 0);
  private hoverTarget = 0;
  private hoverCurrent = 0;

  private rafId: number | null = null;
  private isDestroyed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  public init(): void {
    const width = this.canvas.clientWidth || 360;
    const height = this.canvas.clientHeight || 240;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        u_texture: { value: null },
        u_depthTexture: { value: null },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_hover: { value: 0 },
        u_time: { value: 0 }
      },
      depthTest: false,
      depthWrite: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    this.startLoop();
  }

  public setProject(projectId: string): void {
    const diffusePath = `/assets/projects/${projectId}/home.webp`;
    const depthPath = `/assets/projects/${projectId}/home_depth.webp`;

    if (!this.textureCache.has(diffusePath)) {
      const tex = this.textureLoader.load(diffusePath);
      tex.minFilter = THREE.LinearFilter;
      this.textureCache.set(diffusePath, tex);
    }

    if (!this.depthCache.has(depthPath)) {
      const depth = this.textureLoader.load(depthPath);
      depth.minFilter = THREE.LinearFilter;
      this.depthCache.set(depthPath, depth);
    }

    if (this.material) {
      this.material.uniforms.u_texture.value = this.textureCache.get(diffusePath);
      this.material.uniforms.u_depthTexture.value = this.depthCache.get(depthPath);
    }
  }

  public setMouse(x: number, y: number): void {
    this.mouseTarget.set(x, y);
  }

  public setHover(hover: number): void {
    this.hoverTarget = hover;
  }

  private startLoop(): void {
    let lastTime = performance.now();

    const loop = (now: number): void => {
      if (this.isDestroyed || !this.renderer || !this.material) return;
      const dt = (now - lastTime) * 0.001;
      lastTime = now;

      this.mouseCurrent.lerp(this.mouseTarget, 0.1);
      this.hoverCurrent += (this.hoverTarget - this.hoverCurrent) * 0.12;

      this.material.uniforms.u_mouse.value.copy(this.mouseCurrent);
      this.material.uniforms.u_hover.value = this.hoverCurrent;
      this.material.uniforms.u_time.value += dt;

      this.renderer.render(this.scene, this.camera);
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);

    this.textureCache.forEach((tex) => tex.dispose());
    this.depthCache.forEach((tex) => tex.dispose());
    this.textureCache.clear();
    this.depthCache.clear();

    this.material?.dispose();
    this.mesh?.geometry.dispose();
    this.renderer?.dispose();
  }
}
