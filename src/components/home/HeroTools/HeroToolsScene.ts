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
    this.renderer.toneMappingExposure = 1.1;

    container.appendChild(this.renderer.domElement);

    this.setupLighting();
    this.createTools();
    this.bindEvents();
    this.startLoop();
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(12, 18, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7090ff, 1.2);
    rimLight.position.set(-15, -10, -8);
    this.scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xfff0dd, 0.8);
    fillLight.position.set(-10, 12, 10);
    this.scene.add(fillLight);
  }

  private getToolConfigs(): MarketingToolConfig[] {
    return [
      {
        id: 'google-ads',
        name: 'Google Ads',
        subtitle: 'PPC & Search Scaling',
        primaryColor: '#4285F4',
        accentColor: '#FBBC04',
        metalness: 0.4,
        roughness: 0.25,
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
          ctx.arc(0, 0, r * 0.78, (-45 * Math.PI) / 180, (45 * Math.PI) / 180, false);
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
          ctx.fillRect(0, -r * 0.21, r * 0.84, r * 0.42);

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
        subtitle: 'Inbound CRM & Automation',
        primaryColor: '#FF7A59',
        accentColor: '#FF5C35',
        metalness: 0.35,
        roughness: 0.3,
        radius: 1.26,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.32;
          ctx.save();
          ctx.translate(c, c);

          ctx.strokeStyle = '#FF7A59';
          ctx.fillStyle = '#FF7A59';
          ctx.lineWidth = r * 0.22;

          ctx.beginPath();
          ctx.arc(0, 0, r * 1.1, 0, Math.PI * 2);
          ctx.stroke();

          const angle1 = (-35 * Math.PI) / 180;
          const d1 = r * 2.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle1) * d1, Math.sin(angle1) * d1);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(Math.cos(angle1) * d1, Math.sin(angle1) * d1, r * 0.55, 0, Math.PI * 2);
          ctx.fill();

          const angle2 = (45 * Math.PI) / 180;
          const d2 = r * 2.1;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle2) * d2, Math.sin(angle2) * d2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(Math.cos(angle2) * d2, Math.sin(angle2) * d2, r * 0.48, 0, Math.PI * 2);
          ctx.fill();

          const angle3 = (-145 * Math.PI) / 180;
          const d3 = r * 1.8;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle3) * d3, Math.sin(angle3) * d3);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(Math.cos(angle3) * d3, Math.sin(angle3) * d3, r * 0.45, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'klaviyo',
        name: 'Klaviyo',
        subtitle: 'Email & SMS Marketing',
        primaryColor: '#12B76A',
        accentColor: '#1A382B',
        metalness: 0.4,
        roughness: 0.25,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const w = size * 0.65;
          const h = size * 0.48;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#12B76A';
          ctx.beginPath();
          ctx.moveTo(-w * 0.45, -h * 0.45);
          ctx.lineTo(w * 0.45, 0);
          ctx.lineTo(-w * 0.45, h * 0.45);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#0a0d16';
          ctx.beginPath();
          ctx.arc(-w * 0.1, 0, h * 0.22, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'shopify',
        name: 'Shopify Plus',
        subtitle: 'High-Scale Checkout',
        primaryColor: '#95BF47',
        accentColor: '#5E8E3E',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.28,
        thickness: 0.32,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.38;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#95BF47';
          ctx.beginPath();
          ctx.roundRect(-r * 0.8, -r * 0.5, r * 1.6, r * 1.5, [r * 0.25, r * 0.25, r * 0.15, r * 0.15]);
          ctx.fill();

          ctx.strokeStyle = '#5E8E3E';
          ctx.lineWidth = r * 0.22;
          ctx.beginPath();
          ctx.arc(0, -r * 0.5, r * 0.45, Math.PI, 0, false);
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.round(r * 0.95)}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', -r * 0.05, r * 0.28);

          ctx.restore();
        },
      },
      {
        id: 'tiktok',
        name: 'TikTok Ads',
        subtitle: 'Viral UGC & Social Commerce',
        primaryColor: '#00F2FE',
        accentColor: '#FE2C55',
        metalness: 0.5,
        roughness: 0.2,
        radius: 1.26,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.34;
          ctx.save();
          ctx.translate(c, c);

          const drawNote = (color: string, offsetX: number, offsetY: number) => {
            ctx.save();
            ctx.translate(offsetX, offsetY);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(-r * 0.25, r * 0.3, r * 0.4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillRect(-r * 0.05, -r * 0.7, r * 0.2, r * 1.0);

            ctx.beginPath();
            ctx.arc(r * 0.35, -r * 0.5, r * 0.45, (Math.PI * 3) / 2, Math.PI * 2);
            ctx.lineWidth = r * 0.22;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.restore();
          };

          ctx.globalCompositeOperation = 'screen';
          drawNote('#00F2FE', -r * 0.08, -r * 0.04);
          drawNote('#FE2C55', r * 0.08, r * 0.04);
          ctx.globalCompositeOperation = 'source-over';

          ctx.restore();
        },
      },
      {
        id: 'stripe',
        name: 'Stripe',
        subtitle: 'Global Payments & Billing',
        primaryColor: '#635BFF',
        accentColor: '#00D4FF',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.38;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#635BFF';
          ctx.font = `italic 900 ${Math.round(r * 1.7)}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', 0, 0);

          ctx.restore();
        },
      },
      {
        id: 'ga4',
        name: 'Google Analytics',
        subtitle: 'GA4 Attribution & Tracking',
        primaryColor: '#F9AB00',
        accentColor: '#E37400',
        metalness: 0.4,
        roughness: 0.25,
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
        metalness: 0.4,
        roughness: 0.25,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.26;
          ctx.save();
          ctx.translate(c, c);

          const w = r * 0.9;
          // Top Left: Orange
          ctx.fillStyle = '#F24E1E';
          ctx.beginPath();
          ctx.roundRect(-w, -w * 1.5, w, w, [w / 2, 0, 0, w / 2]);
          ctx.fill();

          // Top Right: Pink
          ctx.fillStyle = '#FF7262';
          ctx.beginPath();
          ctx.roundRect(0, -w * 1.5, w, w, [0, w / 2, w / 2, 0]);
          ctx.fill();

          // Middle Left: Purple
          ctx.fillStyle = '#A259FF';
          ctx.beginPath();
          ctx.roundRect(-w, -w * 0.5, w, w, [w / 2, 0, 0, w / 2]);
          ctx.fill();

          // Middle Right: Blue circle
          ctx.fillStyle = '#1ABCFE';
          ctx.beginPath();
          ctx.arc(w / 2, 0, w / 2, 0, Math.PI * 2);
          ctx.fill();

          // Bottom Left: Green teardrop
          ctx.fillStyle = '#0ACF83';
          ctx.beginPath();
          ctx.roundRect(-w, w * 0.5, w, w, [w / 2, 0, w / 2, w / 2]);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'linkedin',
        name: 'LinkedIn Ads',
        subtitle: 'B2B Demand Generation',
        primaryColor: '#0A66C2',
        accentColor: '#004182',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.25,
        thickness: 0.30,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.35;
          ctx.save();
          ctx.translate(c, c);

          ctx.fillStyle = '#0A66C2';
          ctx.beginPath();
          ctx.roundRect(-r * 0.9, -r * 0.9, r * 1.8, r * 1.8, [r * 0.3]);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.round(r * 1.15)}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('in', 0, 0);

          ctx.restore();
        },
      },
      {
        id: 'pinterest',
        name: 'Pinterest',
        subtitle: 'Visual Shopping Ads',
        primaryColor: '#E60023',
        accentColor: '#AD081B',
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
          ctx.font = `italic bold ${Math.round(r * 1.25)}px Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('P', 0, -r * 0.05);

          ctx.restore();
        },
      },
      {
        id: 'posthog',
        name: 'PostHog',
        subtitle: 'Funnel & Product Analytics',
        primaryColor: '#F54E00',
        accentColor: '#9B2C00',
        metalness: 0.4,
        roughness: 0.25,
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

  public getBounds(): { boundX: number; boundY: number; boundZ: number } {
    const vFov = (this.camera.fov * Math.PI) / 180;
    const visibleHeightAtZero = 2 * Math.tan(vFov / 2) * this.camera.position.z;
    const visibleWidthAtZero = visibleHeightAtZero * this.camera.aspect;

    // Strict containment inside the visible deck container
    // Inset safely by 16% so all badges bounce off interior walls and never escape
    const boundX = (visibleWidthAtZero * 0.5) * 0.84;
    const boundY = (visibleHeightAtZero * 0.5) * 0.80;
    const boundZ = 2.2;

    return { boundX, boundY, boundZ };
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
        roughness: 0.2,
      });

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: 0.2,
        roughness: 0.35,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.2,
        roughness: 0.35,
      });

      const materials = [rimMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(geom, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const { boundX, boundY } = this.getBounds();
      const maxR = tool.radius + tool.thickness * 0.5;
      const limitX = Math.max(boundX - maxR, 0.5) * 0.88;
      const limitY = Math.max(boundY - maxR, 0.5) * 0.82;

      // Distribute evenly across grid cells to prevent initial overlap
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
      const z = (Math.random() - 0.5) * 1.5;

      mesh.position.set(x, y, z);
      mesh.rotation.set(0, 0, (Math.random() - 0.5) * 0.4);

      this.scene.add(mesh);

      const body: PhysicsBody = {
        mesh,
        tool,
        position: mesh.position,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.2
        ),
        angularVelocity: new THREE.Vector3(0, 0, (Math.random() - 0.5) * 0.4),
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

    this.raycaster.setFromCamera(this.mouse, this.camera);

    if (this.draggedBody) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersectionPoint)) {
        const { boundX, boundY } = this.getBounds();
        const maxR = this.draggedBody.radius + this.draggedBody.tool.thickness * 0.5;
        const limitX = Math.max(boundX - maxR, 0.5);
        const limitY = Math.max(boundY - maxR, 0.5);

        const targetX = Math.max(-limitX, Math.min(limitX, this.intersectionPoint.x));
        const targetY = Math.max(-limitY, Math.min(limitY, this.intersectionPoint.y));
        const clampedTarget = new THREE.Vector3(targetX, targetY, this.draggedBody.position.z);

        const throwVel = clampedTarget.clone().sub(this.draggedBody.position).multiplyScalar(12);
        throwVel.clampLength(0, 10.0);
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
      const hitMesh = intersects[0].object as THREE.Mesh;
      const body = this.bodies.find((b) => b.mesh === hitMesh);
      if (body) {
        this.draggedBody = body;
        body.isDragging = true;
        this.plane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 0, 1),
          body.position
        );

        if (this.onToolSelect) {
          this.onToolSelect(body.tool);
        }

        // Controlled spin on click (safe magnitude to preserve face visibility)
        body.angularVelocity.set(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.0
        );
      }
    }
  };

  private onPointerUp = (): void => {
    if (this.draggedBody) {
      this.draggedBody.isDragging = false;
      this.draggedBody = null;
    }
  };

  public applyImpulseToAll(): void {
    const { boundX, boundY } = this.getBounds();
    this.bodies.forEach((b) => {
      const maxR = b.radius + (b.tool?.thickness || 0.35) * 0.5;
      const limitX = Math.max(boundX - maxR, 0.5);
      const limitY = Math.max(boundY - maxR, 0.5);

      b.velocity.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 3
      );
      b.angularVelocity.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 1.5
      );
      b.position.x = Math.max(-limitX, Math.min(limitX, b.position.x));
      b.position.y = Math.max(-limitY, Math.min(limitY, b.position.y));
    });
  }

  public onResize = (): void => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private updatePhysics(dt: number): void {
    const { boundX, boundY, boundZ } = this.getBounds();

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

      if (!b.isDragging) {
        // Subtle drift toward gentle floating orbit
        b.velocity.x += -b.position.x * 0.08 * dt;
        b.velocity.y += -b.position.y * 0.08 * dt;
        b.velocity.z += -b.position.z * 0.12 * dt;

        // Velocity damping & strict speed cap to prevent clipping escapes
        b.velocity.multiplyScalar(0.985);
        b.velocity.clampLength(0, 10.0);

        // Face-Forward Spring: keeps tokens upright and legible facing the camera
        b.angularVelocity.x += -b.rotation.x * 2.5 * dt;
        b.angularVelocity.y += -b.rotation.y * 2.5 * dt;
        b.angularVelocity.multiplyScalar(0.96);
        b.angularVelocity.clampLength(0, 5.0);

        // Update position & rotation
        b.position.addScaledVector(b.velocity, dt);
        b.rotation.x += b.angularVelocity.x * dt;
        b.rotation.y += b.angularVelocity.y * dt;
        b.rotation.z += b.angularVelocity.z * dt;
      }

      // Inter-token sphere collisions
      for (let j = i + 1; j < this.bodies.length; j++) {
        const b2 = this.bodies[j];
        const diff = b.position.clone().sub(b2.position);
        const dist = diff.length();
        const minDist = b.radius + b2.radius;

        if (dist < minDist && dist > 0.005) {
          const normal = diff.normalize();
          const overlap = minDist - dist;

          // Push apart with gentle separation
          const pushAmt = Math.min(overlap * 0.45, 0.5);
          b.position.addScaledVector(normal, pushAmt);
          b2.position.addScaledVector(normal, -pushAmt);

          // Elastic collision response
          const relativeVelocity = b.velocity.clone().sub(b2.velocity);
          const velocityAlongNormal = relativeVelocity.dot(normal);

          if (velocityAlongNormal < 0) {
            const restitution = 0.75;
            const impulseMagnitude = Math.min(
              (-(1 + restitution) * velocityAlongNormal) /
              (1 / b.mass + 1 / b2.mass),
              8.0
            );
            const impulse = normal.clone().multiplyScalar(impulseMagnitude);

            b.velocity.addScaledVector(impulse, 1 / b.mass);
            b2.velocity.addScaledVector(impulse, -1 / b2.mass);
          }
        }
      }

      // FINAL BOUNDARY CLAMP: Enforces strict containment after all collisions
      if (b.position.x > limitX) {
        b.position.x = limitX;
        b.velocity.x = -Math.abs(b.velocity.x) * 0.8;
      } else if (b.position.x < -limitX) {
        b.position.x = -limitX;
        b.velocity.x = Math.abs(b.velocity.x) * 0.8;
      }

      if (b.position.y > limitY) {
        b.position.y = limitY;
        b.velocity.y = -Math.abs(b.velocity.y) * 0.8;
      } else if (b.position.y < -limitY) {
        b.position.y = -limitY;
        b.velocity.y = Math.abs(b.velocity.y) * 0.8;
      }

      if (b.position.z > boundZ) {
        b.position.z = boundZ;
        b.velocity.z = -Math.abs(b.velocity.z) * 0.8;
      } else if (b.position.z < -boundZ) {
        b.position.z = -boundZ;
        b.velocity.z = Math.abs(b.velocity.z) * 0.8;
      }
    }
  }

  private startLoop(): void {
    const animate = () => {
      if (this.isDestroyed) return;
      const dt = Math.min(this.clock.getDelta(), 0.05);

      this.updatePhysics(dt);
      this.renderer.render(this.scene, this.camera);

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.renderer && this.renderer.domElement) {
      const el = this.renderer.domElement;
      el.removeEventListener('mousemove', this.onPointerMove);
      el.removeEventListener('mousedown', this.onPointerDown);
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }
    window.removeEventListener('mouseup', this.onPointerUp);
    window.removeEventListener('resize', this.onResize);
    try {
      this.renderer.dispose();
    } catch (e) {}
  }
}
