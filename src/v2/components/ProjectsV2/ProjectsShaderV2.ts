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
uniform float u_showRatio;

varying vec2 v_uv;

void main() {
  // Center-normalized UV coordinates
  vec2 uv = v_uv - 0.5;

  // Non-linear corner placement weighting (inspired by Kyndev quad placementWeight)
  // Top, bottom, left, and right sides expand with different dynamic ratios
  float cornerDist = (pow(abs(uv.x) * 2.0, 1.25) + pow(max(0.0, uv.y + 0.5), 1.45)) * 0.45;
  float cornerRatio = smoothstep(cornerDist * 0.35, 0.72 + cornerDist * 0.28, clamp(u_showRatio, 0.0, 1.0));

  // Dynamic zoom: scales in/out smoothly both ways (center focus vs top/bottom exit)
  float zoomFactor = mix(0.76, 1.0, cornerRatio);
  float hoverZoom = mix(1.0, 0.93, u_hover);
  uv *= (zoomFactor * hoverZoom);

  // Parallax raymarching direction based on mouse offset (moves strictly inside image)
  vec2 rayDir = u_mouse * mix(0.015, 0.048, u_hover);

  // Multi-step parallax raymarching (12 samples)
  vec2 currentUv = uv + 0.5;
  vec2 stepUv = rayDir / 12.0;

  for (int i = 0; i < 12; i++) {
    float depthVal = texture2D(u_depthTexture, clamp(currentUv, 0.0, 1.0)).r;
    currentUv += stepUv * (depthVal - 0.5);
  }
  currentUv = clamp(currentUv, 0.001, 0.999);

  // Fetch diffuse color and depth at displaced coordinates
  vec4 color = texture2D(u_texture, currentUv);
  float depth = texture2D(u_depthTexture, currentUv).r;

  // Multi-sample Depth of Field (Bokeh Blur) on background when hovered
  if (u_hover > 0.02) {
    float focalDepth = 0.5;
    float dofDist = abs(depth - focalDepth);
    float blurAmount = u_hover * dofDist * 0.009;
    
    vec4 blurColor = vec4(0.0);
    float totalWeight = 0.0;
    
    for (int j = 0; j < 6; j++) {
      float angle = float(j) * 1.047197; // 2 * PI / 6
      vec2 offset = vec2(cos(angle), sin(angle)) * blurAmount;
      blurColor += texture2D(u_texture, clamp(currentUv + offset, 0.0, 1.0));
      totalWeight += 1.0;
    }
    color = mix(color, blurColor / totalWeight, clamp(blurAmount * 90.0, 0.0, 0.65));
  }

  // Subtle specular vignette lighting responding to mouse inside image
  float vignette = 1.0 - length(v_uv - (0.5 + u_mouse * 0.15)) * 0.22;
  color.rgb *= vignette;

  gl_FragColor = vec4(color.rgb, 1.0);
}
`;

/**
 * Singleton WebGL Context Pool for V2
 */
export class CardContextPoolV2 {
  private static maxActive: number = 4;
  private static activeList: CardDisplacementRendererV2[] = [];

  public static requestContext(renderer: CardDisplacementRendererV2): void {
    if (this.activeList.includes(renderer)) {
      this.activeList = this.activeList.filter((r) => r !== renderer);
      this.activeList.push(renderer);
      return;
    }

    if (this.activeList.length >= this.maxActive) {
      const oldest = this.activeList.shift();
      if (oldest) {
        oldest.suspendContext();
      }
    }

    this.activeList.push(renderer);
  }

  public static releaseContext(renderer: CardDisplacementRendererV2): void {
    this.activeList = this.activeList.filter((r) => r !== renderer);
  }
}

export class CardDisplacementRendererV2 {
  public canvas: HTMLCanvasElement;
  private textureUrl: string;
  private depthUrl: string;

  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  private material: THREE.ShaderMaterial | null = null;
  private mesh: THREE.Mesh | null = null;
  private animId: number | null = null;

  public isContextActive: boolean = false;
  public isReady: boolean = false;

  // Pointer & Motion state
  public mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  public targetMouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  public hover: number = 0;
  public targetHover: number = 0;
  public showRatio: number = 1.0;
  private clock: THREE.Clock = new THREE.Clock();

  constructor(canvas: HTMLCanvasElement, textureUrl: string, depthUrl: string) {
    this.canvas = canvas;
    this.textureUrl = textureUrl;
    this.depthUrl = depthUrl;
  }

  public async activateContext(): Promise<void> {
    if (this.isContextActive) return;

    CardContextPoolV2.requestContext(this);
    this.isContextActive = true;

    const width = this.canvas.clientWidth || 640;
    const height = this.canvas.clientHeight || 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
      this.renderer.setSize(width, height, false);
      this.renderer.setPixelRatio(dpr);

      const loader = new THREE.TextureLoader();
      const [colorTexture, depthTexture] = await Promise.all([
        new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(this.textureUrl, resolve, undefined, reject);
        }),
        new Promise<THREE.Texture>((resolve, reject) => {
          loader.load(this.depthUrl, resolve, undefined, reject);
        }),
      ]);

      colorTexture.minFilter = THREE.LinearFilter;
      colorTexture.magFilter = THREE.LinearFilter;
      depthTexture.minFilter = THREE.LinearFilter;
      depthTexture.magFilter = THREE.LinearFilter;

      this.material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          u_texture: { value: colorTexture },
          u_depthTexture: { value: depthTexture },
          u_mouse: { value: new THREE.Vector2(0, 0) },
          u_hover: { value: 0 },
          u_showRatio: { value: 1.0 },
          u_time: { value: 0 },
        },
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      this.mesh = new THREE.Mesh(geometry, this.material);
      this.mesh.frustumCulled = false;
      this.scene.add(this.mesh);

      this.isReady = true;
      this.canvas.style.opacity = '1';
      this.start();
    } catch (err) {
      console.warn('[CardDisplacementRendererV2] Activation error:', err);
      this.suspendContext();
    }
  }

  public suspendContext(): void {
    this.stop();
    this.isContextActive = false;
    this.isReady = false;
    this.canvas.style.opacity = '0';

    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.mesh = null;
    }
    if (this.material) {
      if (this.material.uniforms.u_texture?.value) {
        this.material.uniforms.u_texture.value.dispose();
      }
      if (this.material.uniforms.u_depthTexture?.value) {
        this.material.uniforms.u_depthTexture.value.dispose();
      }
      this.material.dispose();
      this.material = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    CardContextPoolV2.releaseContext(this);
  }

  public resize(): void {
    if (!this.renderer || !this.isContextActive) return;
    const width = this.canvas.clientWidth || 640;
    const height = this.canvas.clientHeight || 420;
    this.renderer.setSize(width, height, false);
  }

  public setHover(isHovering: boolean): void {
    this.targetHover = isHovering ? 1.0 : 0.0;
    if (isHovering && !this.isContextActive) {
      this.activateContext();
    }
  }

  public setShowRatio(ratio: number): void {
    this.showRatio = ratio;
    if (this.material) {
      this.material.uniforms.u_showRatio.value = ratio;
    }
  }

  public setPointer(ndcX: number, ndcY: number): void {
    this.targetMouse.set(-ndcX, ndcY);
  }

  public start(): void {
    if (this.animId !== null || !this.isContextActive) return;
    const loop = () => {
      if (!this.isContextActive) {
        this.animId = null;
        return;
      }

      this.mouse.lerp(this.targetMouse, 0.08);
      this.hover += (this.targetHover - this.hover) * 0.1;

      if (this.material && this.renderer) {
        this.material.uniforms.u_mouse.value.copy(this.mouse);
        this.material.uniforms.u_hover.value = this.hover;
        this.material.uniforms.u_time.value = this.clock.getElapsedTime();
        this.renderer.render(this.scene, this.camera);
      }

      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  public stop(): void {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  public destroy(): void {
    this.suspendContext();
  }
}
