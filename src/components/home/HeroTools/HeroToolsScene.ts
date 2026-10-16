// src/components/home/HeroTools/HeroToolsScene.ts
import * as THREE from 'three';

export interface MarketingToolConfig {
  id: string;
  name: string;
  subtitle: string;
  primaryColor: string;
  accentColor: string;
  metalness: number;
  roughness: number;
  radius: number;
  thickness: number;
  drawIcon: (ctx: CanvasRenderingContext2D, size: number) => void;
}

interface PhysicsBody {
  mesh: THREE.Mesh;
  tool: MarketingToolConfig;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  rotation: THREE.Euler;
  radius: number;
  mass: number;
  isDragging: boolean;
}

export class HeroToolsScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  public bodies: PhysicsBody[] = [];
  private animationFrameId: number | null = null;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-999, -999);
  private lastMouse = new THREE.Vector2(-999, -999);
  private mouseVelocity = new THREE.Vector2(0, 0);
  private draggedBody: PhysicsBody | null = null;
  private plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private intersectionPoint = new THREE.Vector3();
  private isDestroyed = false;
  private clock = new THREE.Clock();

  // Dynamic Shaded Background: Vignette shader that shifts palette on click
  private bgMesh!: THREE.Mesh;
  private bgMaterial!: THREE.ShaderMaterial;
  private currentPaletteIndex = 0;
  private currentColor0 = new THREE.Color('#121a36');
  private currentColor1 = new THREE.Color('#05070e');
  private targetColor0 = new THREE.Color('#121a36');
  private targetColor1 = new THREE.Color('#05070e');
  private bgPulse = 0.0;
  private cursorLight!: THREE.PointLight;

  private palettes = [
    { c0: new THREE.Color('#141d3d'), c1: new THREE.Color('#05070f') }, // Deep Midnight Navy
    { c0: new THREE.Color('#0c2b25'), c1: new THREE.Color('#030e0c') }, // Deep Emerald Obsidian
    { c0: new THREE.Color('#24113a'), c1: new THREE.Color('#0b0514') }, // Imperial Violet
    { c0: new THREE.Color('#2b0e1d'), c1: new THREE.Color('#0e0409') }, // Crimson Velvet
    { c0: new THREE.Color('#261a0c'), c1: new THREE.Color('#0e0803') }, // Royal Bronze / Amber
    { c0: new THREE.Color('#0c2534'), c1: new THREE.Color('#030d15') }, // Cyan Abyss
    { c0: new THREE.Color('#1b1e28'), c1: new THREE.Color('#080a0e') }, // Graphite Slate
  ];

  public onToolSelect?: (tool: MarketingToolConfig) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 18);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    container.appendChild(this.renderer.domElement);

    this.setupBackground();
    this.setupLighting();
    this.createTools();
    this.bindEvents();
    this.startLoop();
  }

  private setupBackground(): void {
    const bgGeom = new THREE.PlaneGeometry(2, 2);
    this.bgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_color0: { value: this.currentColor0 },
        u_color1: { value: this.currentColor1 },
        u_aspect: { value: this.camera.aspect },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0.0 },
        u_pulse: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 v_uv;
        void main() {
          v_uv = position.xy * 0.5 + 0.5;
          gl_Position = vec4(position.xy, 0.9999, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 u_color0;
        uniform vec3 u_color1;
        uniform float u_aspect;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_pulse;
        varying vec2 v_uv;

        // Pseudo-random dithering hash to prevent color banding
        float hash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        void main() {
          vec2 q = v_uv - 0.5;
          q.x *= u_aspect;
          float dist = length(q);
          float vignette = smoothstep(0.12, 0.95, dist);

          vec2 m = u_mouse - 0.5;
          m.x *= u_aspect;
          float mDist = length(q - m);
          float mouseGlow = exp(-mDist * 3.2) * 0.15;

          float wave = sin(dist * 18.0 - u_pulse * 12.0) * exp(-u_pulse * 3.5) * 0.08;

          vec3 col = mix(u_color0 + mouseGlow + max(0.0, wave), u_color1, vignette);

          // Subtle noise dithering
          float dither = (hash(gl_FragCoord.xy + fract(u_time * 0.05)) - 0.5) * (1.6 / 255.0);
          col += dither;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });

    this.bgMesh = new THREE.Mesh(bgGeom, this.bgMaterial);
    this.bgMesh.frustumCulled = false;
    this.bgMesh.renderOrder = -1000;
    this.scene.add(this.bgMesh);
  }

  public nextPalette(): void {
    this.currentPaletteIndex = (this.currentPaletteIndex + 1) % this.palettes.length;
    const pal = this.palettes[this.currentPaletteIndex];
    this.targetColor0.copy(pal.c0);
    this.targetColor1.copy(pal.c1);
    this.bgPulse = 0.0;
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(12, 18, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7090ff, 1.3);
    rimLight.position.set(-15, -10, -8);
    this.scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xfff0dd, 0.9);
    fillLight.position.set(-10, 12, 10);
    this.scene.add(fillLight);

    // Interactive glint light following mouse in 3D
    this.cursorLight = new THREE.PointLight(0xffffff, 1.8, 26);
    this.cursorLight.position.set(0, 0, 5);
    this.scene.add(this.cursorLight);
  }

  private getToolConfigs(): MarketingToolConfig[] {
    return [
      {
        id: 'google-ads',
        name: 'Google Ads',
        subtitle: 'PPC & Search Scaling',
        primaryColor: '#4285F4',
        accentColor: '#FBBC04',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.28,
        thickness: 0.32,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.36;
          ctx.save();
          ctx.translate(c, c);
          ctx.lineWidth = r * 0.42;
          ctx.lineCap = 'butt';

          // Blue arc
          ctx.beginPath();
          ctx.strokeStyle = '#4285F4';
          ctx.arc(0, 0, r * 0.78, (-12 * Math.PI) / 180, (45 * Math.PI) / 180, false);
          ctx.stroke();

          // Green arc
          ctx.beginPath();
          ctx.strokeStyle = '#34A853';
          ctx.arc(0, 0, r * 0.78, (45 * Math.PI) / 180, (135 * Math.PI) / 180, false);
          ctx.stroke();

          // Yellow arc
          ctx.beginPath();
          ctx.strokeStyle = '#FBBC05';
          ctx.arc(0, 0, r * 0.78, (135 * Math.PI) / 180, (225 * Math.PI) / 180, false);
          ctx.stroke();

          // Red arc
          ctx.beginPath();
          ctx.strokeStyle = '#EA4335';
          ctx.arc(0, 0, r * 0.78, (225 * Math.PI) / 180, (315 * Math.PI) / 180, false);
          ctx.stroke();

          // Crossbar
          ctx.fillStyle = '#4285F4';
          ctx.fillRect(0, -r * 0.21, r * 0.95, r * 0.42);

          ctx.restore();
        },
      },
      {
        id: 'meta-ads',
        name: 'Meta Ads',
        subtitle: 'Paid Social & Retargeting',
        primaryColor: '#0081FB',
        accentColor: '#0064E0',
        metalness: 0.5,
        roughness: 0.2,
        radius: 1.30,
        thickness: 0.34,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.34;
          ctx.save();
          ctx.translate(c, c);

          const grad = ctx.createLinearGradient(-r, 0, r, 0);
          grad.addColorStop(0, '#0064E0');
          grad.addColorStop(0.5, '#0081FB');
          grad.addColorStop(1, '#00C6FF');

          ctx.strokeStyle = grad;
          ctx.lineWidth = r * 0.38;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(-r * 0.9, 0);
          ctx.bezierCurveTo(-r * 0.9, -r * 0.8, -r * 0.3, -r * 0.8, 0, 0);
          ctx.bezierCurveTo(r * 0.3, r * 0.8, r * 0.9, r * 0.8, r * 0.9, 0);
          ctx.bezierCurveTo(r * 0.9, -r * 0.8, r * 0.3, -r * 0.8, 0, 0);
          ctx.bezierCurveTo(-r * 0.3, r * 0.8, -r * 0.9, r * 0.8, -r * 0.9, 0);
          ctx.stroke();

          ctx.restore();
        },
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        subtitle: 'Inbound CRM & Lead Gen',
        primaryColor: '#FF7A59',
        accentColor: '#FF5C35',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.26,
        thickness: 0.32,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.35;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#FF7A59';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
          ctx.fill();

          ctx.lineWidth = r * 0.22;
          ctx.strokeStyle = '#FF7A59';
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(0, -r * 0.45);
          ctx.lineTo(0, -r * 0.9);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, -r * 0.9, r * 0.22, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(r * 0.38, r * 0.22);
          ctx.lineTo(r * 0.85, r * 0.5);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(r * 0.85, r * 0.5, r * 0.18, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'klaviyo',
        name: 'Klaviyo',
        subtitle: 'Lifecycle & SMS Automation',
        primaryColor: '#2B2929',
        accentColor: '#54e38e',
        metalness: 0.6,
        roughness: 0.2,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.35;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#54e38e';
          ctx.beginPath();
          ctx.moveTo(-r * 0.85, -r * 0.7);
          ctx.lineTo(-r * 0.3, -r * 0.7);
          ctx.lineTo(-r * 0.3, r * 0.7);
          ctx.lineTo(-r * 0.85, r * 0.7);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-r * 0.05, -r * 0.7);
          ctx.lineTo(r * 0.45, -r * 0.7);
          ctx.lineTo(r * 0.85, 0);
          ctx.lineTo(r * 0.25, 0);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(r * 0.25, 0);
          ctx.lineTo(r * 0.85, 0);
          ctx.lineTo(r * 0.45, r * 0.7);
          ctx.lineTo(-r * 0.05, r * 0.7);
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'shopify-plus',
        name: 'Shopify Plus',
        subtitle: 'Enterprise E-Commerce',
        primaryColor: '#95BF47',
        accentColor: '#5E8E3E',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.28,
        thickness: 0.32,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.35;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#95BF47';
          ctx.beginPath();
          ctx.moveTo(-r * 0.6, -r * 0.3);
          ctx.lineTo(0, -r * 0.85);
          ctx.lineTo(r * 0.65, -r * 0.45);
          ctx.lineTo(r * 0.5, r * 0.85);
          ctx.lineTo(-r * 0.5, r * 0.8);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = '#303030';
          ctx.lineWidth = r * 0.16;
          ctx.beginPath();
          ctx.arc(0, -r * 0.25, r * 0.35, Math.PI, 0, false);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = `800 ${r * 0.85}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', 0, r * 0.2);

          ctx.restore();
        },
      },
      {
        id: 'tiktok-ads',
        name: 'TikTok Ads',
        subtitle: 'Viral Creative Acquisition',
        primaryColor: '#00F2FE',
        accentColor: '#FE2C55',
        metalness: 0.5,
        roughness: 0.2,
        radius: 1.26,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.36;
          ctx.save();
          ctx.translate(c, c);

          const drawNote = (color: string, ox: number, oy: number) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(-r * 0.25 + ox, r * 0.35 + oy, r * 0.32, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillRect(-r * 0.08 + ox, -r * 0.6 + oy, r * 0.22, r * 0.95);

            ctx.beginPath();
            ctx.moveTo(r * 0.14 + ox, -r * 0.6 + oy);
            ctx.bezierCurveTo(r * 0.4 + ox, -r * 0.6 + oy, r * 0.65 + ox, -r * 0.35 + oy, r * 0.75 + ox, 0 + oy);
            ctx.lineTo(r * 0.75 + ox, -r * 0.25 + oy);
            ctx.bezierCurveTo(r * 0.6 + ox, -r * 0.5 + oy, r * 0.4 + ox, -r * 0.75 + oy, r * 0.14 + ox, -r * 0.75 + oy);
            ctx.closePath();
            ctx.fill();
          };

          drawNote('#00F2FE', -r * 0.08, 0);
          drawNote('#FE2C55', r * 0.08, 0);
          drawNote('#ffffff', 0, 0);

          ctx.restore();
        },
      },
      {
        id: 'stripe',
        name: 'Stripe',
        subtitle: 'Global Checkout & Billing',
        primaryColor: '#635BFF',
        accentColor: '#00D4FF',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.26,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.36;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#635BFF';
          ctx.beginPath();
          ctx.roundRect(-r * 0.9, -r * 0.65, r * 1.8, r * 1.3, [r * 0.3]);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = `800 ${r * 1.05}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', 0, 0);

          ctx.restore();
        },
      },
      {
        id: 'ga4',
        name: 'Google Analytics',
        subtitle: 'GA4 Multi-Touch Attribution',
        primaryColor: '#F9AB00',
        accentColor: '#E37400',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.24,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.34;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#F9AB00';
          ctx.beginPath();
          ctx.roundRect(-r * 0.8, r * 0.1, r * 0.42, r * 0.7, [r * 0.2]);
          ctx.fill();

          ctx.fillStyle = '#E37400';
          ctx.beginPath();
          ctx.roundRect(-r * 0.2, -r * 0.35, r * 0.42, r * 1.15, [r * 0.2]);
          ctx.fill();

          ctx.fillStyle = '#F9AB00';
          ctx.beginPath();
          ctx.roundRect(r * 0.4, -r * 0.8, r * 0.42, r * 1.6, [r * 0.2]);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'figma',
        name: 'Figma',
        subtitle: 'Creative Systems & UI',
        primaryColor: '#A259FF',
        accentColor: '#F24E1E',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.26;
          ctx.save();
          ctx.translate(c, c);

          const w = r * 0.9;
          ctx.fillStyle = '#F24E1E';
          ctx.beginPath();
          ctx.roundRect(-w, -w * 1.5, w, w, [w / 2, 0, 0, w / 2]);
          ctx.fill();

          ctx.fillStyle = '#FF7262';
          ctx.beginPath();
          ctx.roundRect(0, -w * 1.5, w, w, [0, w / 2, w / 2, 0]);
          ctx.fill();

          ctx.fillStyle = '#A259FF';
          ctx.beginPath();
          ctx.roundRect(-w, -w * 0.5, w, w, [w / 2, 0, 0, w / 2]);
          ctx.fill();

          ctx.fillStyle = '#1ABCFE';
          ctx.beginPath();
          ctx.arc(w / 2, 0, w / 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#0ACF83';
          ctx.beginPath();
          ctx.roundRect(-w, w * 0.5, w, w, [w / 2, 0, w / 2, w / 2]);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'linkedin-ads',
        name: 'LinkedIn Ads',
        subtitle: 'B2B Enterprise Pipeline',
        primaryColor: '#0A66C2',
        accentColor: '#004182',
        metalness: 0.5,
        roughness: 0.2,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.36;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#0A66C2';
          ctx.beginPath();
          ctx.roundRect(-r * 0.9, -r * 0.9, r * 1.8, r * 1.8, [r * 0.3]);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = `800 ${r * 1.15}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('in', 0, -r * 0.05);

          ctx.restore();
        },
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        subtitle: 'Visual Discovery & E-Com',
        primaryColor: '#E60023',
        accentColor: '#BD081C',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.24,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.36;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#E60023';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.95, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = `800 ${r * 1.25}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('P', 0, 0);

          ctx.restore();
        },
      },
      {
        id: 'posthog',
        name: 'PostHog',
        subtitle: 'Funnel & Product Analytics',
        primaryColor: '#F54E00',
        accentColor: '#9B2C00',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.24,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.35;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#F54E00';
          ctx.beginPath();
          ctx.moveTo(-r * 0.85, -r * 0.6);
          ctx.lineTo(r * 0.85, -r * 0.6);
          ctx.lineTo(r * 0.4, r * 0.1);
          ctx.lineTo(r * 0.4, r * 0.7);
          ctx.lineTo(-r * 0.4, r * 0.7);
          ctx.lineTo(-r * 0.4, r * 0.1);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        },
      },
    ];
  }

  private createTexture(tool: MarketingToolConfig, isFront: boolean): THREE.CanvasTexture {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const c = size / 2;
    const r = c * 0.94;

    const bgGrad = ctx.createRadialGradient(c, c, r * 0.1, c, c, r);
    bgGrad.addColorStop(0, '#1c2236');
    bgGrad.addColorStop(0.7, '#111422');
    bgGrad.addColorStop(1, '#090b12');

    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = tool.primaryColor;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(c, c, r - 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(c, c, r - 26, 0, Math.PI * 2);
    ctx.stroke();

    if (isFront) {
      tool.drawIcon(ctx, size * 0.72);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 64px Space Grotesk, sans-serif';
      ctx.fillText(tool.name.toUpperCase(), c, 800);

      ctx.fillStyle = tool.primaryColor;
      ctx.font = '600 32px IBMPlexMono, monospace';
      ctx.fillText(tool.subtitle.toUpperCase(), c, 860);
    } else {
      ctx.save();
      ctx.translate(c, c);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = tool.primaryColor;
      ctx.font = '800 110px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KYNDEV', 0, -40);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 42px Space Grotesk, sans-serif';
      ctx.fillText('OPTIMIZED STACK', 0, 50);

      ctx.restore();

      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '500 28px IBMPlexMono, monospace';
      ctx.fillText('ACTIVE PERFORMANCE ENGINE', c, 810);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }

  public getBounds(): { boundX: number; boundY: number; minZ: number; maxZ: number } {
    const vFov = (this.camera.fov * Math.PI) / 180;
    const visibleHeightAtZero = 2 * Math.tan(vFov / 2) * this.camera.position.z;
    const visibleWidthAtZero = visibleHeightAtZero * this.camera.aspect;

    const boundX = (visibleWidthAtZero * 0.5) * 0.84;
    const boundY = (visibleHeightAtZero * 0.5) * 0.80;
    // Rich 3D depth bounds
    const minZ = -5.5;
    const maxZ = 4.2;

    return { boundX, boundY, minZ, maxZ };
  }

  private createTools(): void {
    const configs = this.getToolConfigs();

    configs.forEach((tool, index) => {
      const geom = new THREE.CylinderGeometry(
        tool.radius,
        tool.radius,
        tool.thickness,
        64,
        2
      );
      geom.rotateX(Math.PI / 2);

      const frontTexture = this.createTexture(tool, true);
      const backTexture = this.createTexture(tool, false);

      const rimMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tool.accentColor),
        metalness: 0.85,
        roughness: 0.18,
      });

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: 0.25,
        roughness: 0.32,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.25,
        roughness: 0.32,
      });

      const materials = [rimMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(geom, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const { boundX, boundY } = this.getBounds();
      const maxR = tool.radius + tool.thickness * 0.5;
      const limitX = Math.max(boundX - maxR, 0.5) * 0.88;
      const limitY = Math.max(boundY - maxR, 0.5) * 0.82;

      const total = configs.length;
      const cols = 4;
      const rows = Math.ceil(total / cols);
      const col = index % cols;
      const row = Math.floor(index / cols);

      const cellX = ((col + 0.5) / cols - 0.5) * 2 * limitX;
      const cellY = ((row + 0.5) / rows - 0.5) * 2 * limitY;
      const jitterX = (Math.random() - 0.5) * (limitX / cols) * 0.6;
      const jitterY = (Math.random() - 0.5) * (limitY / rows) * 0.6;

      const x = Math.max(-limitX, Math.min(limitX, cellX + jitterX));
      const y = Math.max(-limitY, Math.min(limitY, cellY + jitterY));
      const z = (Math.random() - 0.5) * 2.5;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.6
      );

      this.scene.add(mesh);

      const body: PhysicsBody = {
        mesh,
        tool,
        position: mesh.position,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.0
        ),
        angularVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.6
        ),
        rotation: mesh.rotation,
        radius: tool.radius,
        mass: tool.radius * 2.0,
        isDragging: false,
      };

      this.bodies.push(body);
    });
  }

  private bindEvents(): void {
    const el = this.renderer.domElement;
    el.addEventListener('mousemove', this.onPointerMove);
    el.addEventListener('mousedown', this.onPointerDown);
    window.addEventListener('mouseup', this.onPointerUp);
    window.addEventListener('resize', this.onResize);
  }

  private onPointerMove = (e: MouseEvent): void => {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.mouseVelocity.set(x - this.lastMouse.x, y - this.lastMouse.y);
    this.lastMouse.set(x, y);
    this.mouse.set(x, y);

    // Update background shader mouse spotlight
    if (this.bgMaterial?.uniforms?.u_mouse) {
      this.bgMaterial.uniforms.u_mouse.value.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      );
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Position cursor glint light in 3D
    if (this.raycaster.ray.intersectPlane(this.plane, this.intersectionPoint)) {
      if (this.cursorLight) {
        this.cursorLight.position.set(
          this.intersectionPoint.x,
          this.intersectionPoint.y,
          4.5
        );
      }
    }

    if (this.draggedBody) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersectionPoint)) {
        const { boundX, boundY } = this.getBounds();
        const maxR = this.draggedBody.radius + this.draggedBody.tool.thickness * 0.5;
        const limitX = Math.max(boundX - maxR, 0.5);
        const limitY = Math.max(boundY - maxR, 0.5);

        const targetX = Math.max(-limitX, Math.min(limitX, this.intersectionPoint.x));
        const targetY = Math.max(-limitY, Math.min(limitY, this.intersectionPoint.y));
        const clampedTarget = new THREE.Vector3(targetX, targetY, this.draggedBody.position.z);

        const throwVel = clampedTarget.clone().sub(this.draggedBody.position).multiplyScalar(14);
        throwVel.clampLength(0, 16.0);
        this.draggedBody.velocity.copy(throwVel);
        this.draggedBody.position.set(targetX, targetY, this.draggedBody.position.z);
      }
    }
  };

  private onPointerDown = (e: MouseEvent): void => {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.mouse.set(x, y);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.bodies.map((b) => b.mesh);
    const intersects = this.raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      // Direct click on a 3D chip!
      const hitMesh = intersects[0].object as THREE.Mesh;
      const body = this.bodies.find((b) => b.mesh === hitMesh);
      if (body) {
        this.draggedBody = body;
        body.isDragging = true;
        this.plane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 0, 1),
          body.position
        );

        // Punch the clicked chip back into 3D space with high tumble spin
        const punchAngle = Math.random() * Math.PI * 2;
        const punchSpeed = 10.0 + Math.random() * 6.0;
        body.velocity.set(
          Math.cos(punchAngle) * punchSpeed,
          Math.sin(punchAngle) * punchSpeed,
          -(8.0 + Math.random() * 6.0) // Punches deep into 3D space
        );

        // 3D rotational tumble
        body.angularVelocity.set(
          (Math.random() - 0.5) * 10.0,
          (Math.random() - 0.5) * 10.0,
          (Math.random() - 0.5) * 8.0
        );

        // 3D Shockwave: scatter nearby chips away in 3D
        for (let k = 0; k < this.bodies.length; k++) {
          const other = this.bodies[k];
          if (other === body) continue;
          const diff = other.position.clone().sub(body.position);
          const dist = diff.length();
          if (dist < 7.5 && dist > 0.05) {
            const factor = (7.5 - dist) / 7.5;
            const dir = diff.normalize();
            other.velocity.addScaledVector(dir, factor * 12.0);
            other.velocity.z += (Math.random() - 0.5) * factor * 10.0;
            other.angularVelocity.add(
              new THREE.Vector3(
                (Math.random() - 0.5) * factor * 7.0,
                (Math.random() - 0.5) * factor * 7.0,
                (Math.random() - 0.5) * factor * 5.0
              )
            );
          }
        }

        // Change background shade on click
        this.nextPalette();

        if (this.onToolSelect) {
          this.onToolSelect(body.tool);
        }
      }
    } else {
      // Clicked on the deck background!
      // Scatter all shapes in 3D and advance the background shade
      this.applyImpulseToAll();
      if (typeof window !== 'undefined' && (window as any).audios?.countPlay) {
        (window as any).audios.countPlay('click');
      }
    }
  };

  private onPointerUp = (): void => {
    if (this.draggedBody) {
      // Add slight 3D spin on release
      this.draggedBody.angularVelocity.set(
        (Math.random() - 0.5) * 4.0,
        (Math.random() - 0.5) * 4.0,
        (Math.random() - 0.5) * 3.0
      );
      this.draggedBody.isDragging = false;
      this.draggedBody = null;
    }
  };

  public applyImpulseToAll(): void {
    this.nextPalette();
    const { boundX, boundY, minZ, maxZ } = this.getBounds();

    this.bodies.forEach((b) => {
      // Full 3D impulse: scattered in X, Y, and Z depth
      const angle = Math.random() * Math.PI * 2;
      const speedXY = 8.0 + Math.random() * 10.0;
      const velZ = (Math.random() - 0.5) * 16.0;

      b.velocity.set(
        Math.cos(angle) * speedXY,
        Math.sin(angle) * speedXY,
        velZ
      );

      // Full 3D tumbling rotation around X, Y, and Z
      b.angularVelocity.set(
        (Math.random() - 0.5) * 9.0,
        (Math.random() - 0.5) * 9.0,
        (Math.random() - 0.5) * 7.0
      );
    });
  }

  public onResize = (): void => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    if (this.bgMaterial?.uniforms?.u_aspect) {
      this.bgMaterial.uniforms.u_aspect.value = width / height;
    }
  };

  private updatePhysics(dt: number): void {
    const { boundX, boundY, minZ, maxZ } = this.getBounds();

    for (let i = 0; i < this.bodies.length; i++) {
      const b = this.bodies[i];
      const maxR = b.radius + (b.tool?.thickness || 0.35) * 0.5;
      const limitX = Math.max(boundX - maxR, 0.5);
      const limitY = Math.max(boundY - maxR, 0.5);

      // Defense against NaN/Infinity
      if (!isFinite(b.position.x) || !isFinite(b.position.y) || !isFinite(b.position.z)) {
        b.position.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0);
        b.velocity.set(0, 0, 0);
      }
      if (!isFinite(b.velocity.x) || !isFinite(b.velocity.y) || !isFinite(b.velocity.z)) {
        b.velocity.set(0, 0, 0);
      }
      if (!isFinite(b.angularVelocity.x) || !isFinite(b.angularVelocity.y) || !isFinite(b.angularVelocity.z)) {
        b.angularVelocity.set(0, 0, 0);
      }

      if (!b.isDragging) {
        // Organic centering gravity toward center of deck & z=0 (matching reference hero)
        b.velocity.x += -b.position.x * 0.38 * dt;
        b.velocity.y += -b.position.y * 0.38 * dt;
        b.velocity.z += -b.position.z * 0.55 * dt;

        // Aerodynamic damping
        b.velocity.multiplyScalar(Math.pow(0.88, dt));
        b.velocity.clampLength(0, 18.0);

        // Angular damping: allows free 3D spin and tumble that smoothly calms
        b.angularVelocity.multiplyScalar(Math.pow(0.86, dt));
        b.angularVelocity.clampLength(0, 12.0);

        // Gentle upright alignment torque (softly returns toward front-facing over time)
        const tiltX = Math.sin(b.rotation.x);
        const tiltY = Math.sin(b.rotation.y);
        b.angularVelocity.x += -tiltX * 0.55 * dt;
        b.angularVelocity.y += -tiltY * 0.55 * dt;

        // Position & 3D rotation integration
        b.position.addScaledVector(b.velocity, dt);
        b.rotation.x += b.angularVelocity.x * dt;
        b.rotation.y += b.angularVelocity.y * dt;
        b.rotation.z += b.angularVelocity.z * dt;
      }

      // 3D Inter-token Sphere Collisions
      for (let j = i + 1; j < this.bodies.length; j++) {
        const b2 = this.bodies[j];
        const diff = b.position.clone().sub(b2.position);
        const dist = diff.length();
        const minDist = b.radius + b2.radius;

        if (dist < minDist && dist > 0.005) {
          const normal = diff.normalize();
          const overlap = minDist - dist;

          // Push apart in 3D
          const pushAmt = Math.min(overlap * 0.5, 0.6);
          b.position.addScaledVector(normal, pushAmt);
          b2.position.addScaledVector(normal, -pushAmt);

          // Elastic collision response in 3D
          const relativeVelocity = b.velocity.clone().sub(b2.velocity);
          const velocityAlongNormal = relativeVelocity.dot(normal);

          if (velocityAlongNormal < 0) {
            const restitution = 0.82;
            const impulseMagnitude = Math.min(
              (-(1 + restitution) * velocityAlongNormal) /
              (1 / b.mass + 1 / b2.mass),
              14.0
            );
            const impulse = normal.clone().multiplyScalar(impulseMagnitude);
            b.velocity.addScaledVector(impulse, 1 / b.mass);
            b2.velocity.addScaledVector(impulse, -1 / b2.mass);

            // Impart 3D rotational spin on collision
            const torqueMag = impulseMagnitude * 0.18;
            b.angularVelocity.x += normal.y * torqueMag;
            b.angularVelocity.y -= normal.x * torqueMag;
            b.angularVelocity.z += (Math.random() - 0.5) * torqueMag;

            b2.angularVelocity.x -= normal.y * torqueMag;
            b2.angularVelocity.y += normal.x * torqueMag;
            b2.angularVelocity.z -= (Math.random() - 0.5) * torqueMag;
          }
        }
      }

      // Container boundary containment
      if (b.position.x > limitX) {
        b.position.x = limitX;
        b.velocity.x = -Math.abs(b.velocity.x) * 0.75;
      } else if (b.position.x < -limitX) {
        b.position.x = -limitX;
        b.velocity.x = Math.abs(b.velocity.x) * 0.75;
      }

      if (b.position.y > limitY) {
        b.position.y = limitY;
        b.velocity.y = -Math.abs(b.velocity.y) * 0.75;
      } else if (b.position.y < -limitY) {
        b.position.y = -limitY;
        b.velocity.y = Math.abs(b.velocity.y) * 0.75;
      }

      // 3D Depth boundaries (Z-axis bounce)
      if (b.position.z > maxZ) {
        b.position.z = maxZ;
        b.velocity.z = -Math.abs(b.velocity.z) * 0.72;
      } else if (b.position.z < minZ) {
        b.position.z = minZ;
        b.velocity.z = Math.abs(b.velocity.z) * 0.72;
      }
    }
  }

  private startLoop(): void {
    const render = () => {
      if (this.isDestroyed) return;

      const dt = Math.min(this.clock.getDelta(), 0.05);

      // Smoothly interpolate background shader palette
      this.currentColor0.lerp(this.targetColor0, dt * 3.5);
      this.currentColor1.lerp(this.targetColor1, dt * 3.5);
      if (this.bgMaterial?.uniforms) {
        this.bgMaterial.uniforms.u_color0.value.copy(this.currentColor0);
        this.bgMaterial.uniforms.u_color1.value.copy(this.currentColor1);
        this.bgPulse += dt;
        this.bgMaterial.uniforms.u_pulse.value = this.bgPulse;
        this.bgMaterial.uniforms.u_time.value += dt;
      }

      this.updatePhysics(dt);

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(render);
    };

    this.animationFrameId = requestAnimationFrame(render);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    const el = this.renderer?.domElement;
    if (el) {
      el.removeEventListener('mousemove', this.onPointerMove);
      el.removeEventListener('mousedown', this.onPointerDown);
    }
    window.removeEventListener('mouseup', this.onPointerUp);
    window.removeEventListener('resize', this.onResize);

    this.bodies.forEach((b) => {
      b.mesh.geometry.dispose();
      if (Array.isArray(b.mesh.material)) {
        b.mesh.material.forEach((m) => m.dispose());
      } else {
        b.mesh.material.dispose();
      }
    });
    this.bodies = [];

    if (this.bgMesh) {
      this.bgMesh.geometry.dispose();
      this.bgMaterial.dispose();
    }

    this.renderer?.dispose();
    if (this.renderer?.domElement?.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
