/**
 * HeroToolsScene.ts
 *
 * Real-time 3D Marketing Tools Physics Playground
 * Features tactile 3D badges for Google Ads, Meta, HubSpot, Klaviyo, GA4, Shopify, TikTok, and ClickUp.
 * Includes interactive mouse raycasting, elastic collisions, tossing, and PBR lighting.
 */

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
  private bodies: PhysicsBody[] = [];
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
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
        radius: 1.55,
        thickness: 0.38,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.28;
          ctx.save();
          ctx.translate(c, c);

          // Google Ads Angled Pill / Loops
          // 1. Blue pill
          ctx.save();
          ctx.rotate((-25 * Math.PI) / 180);
          ctx.fillStyle = '#4285F4';
          ctx.beginPath();
          ctx.roundRect(-r * 0.3, -r * 1.1, r * 0.6, r * 2.2, r * 0.3);
          ctx.fill();
          ctx.restore();

          // 2. Green pill
          ctx.save();
          ctx.rotate((35 * Math.PI) / 180);
          ctx.fillStyle = '#34A853';
          ctx.beginPath();
          ctx.roundRect(-r * 0.3, -r * 1.1, r * 0.6, r * 2.2, r * 0.3);
          ctx.fill();
          ctx.restore();

          // 3. Yellow circle
          ctx.fillStyle = '#FBBC04';
          ctx.beginPath();
          ctx.arc(-r * 0.65, r * 0.5, r * 0.38, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'meta',
        name: 'Meta Ads',
        subtitle: 'Paid Social & Retargeting',
        primaryColor: '#0081FB',
        accentColor: '#0064E0',
        metalness: 0.5,
        roughness: 0.2,
        radius: 1.6,
        thickness: 0.38,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.35;
          ctx.save();
          ctx.translate(c, c);

          // Meta Infinity Emblem
          ctx.lineWidth = size * 0.085;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          const grad = ctx.createLinearGradient(-r, -r, r, r);
          grad.addColorStop(0, '#0081FB');
          grad.addColorStop(0.5, '#0064E0');
          grad.addColorStop(1, '#00B2FF');
          ctx.strokeStyle = grad;

          ctx.beginPath();
          for (let t = 0; t <= Math.PI * 2; t += 0.05) {
            const a = r * 1.1;
            const x = (a * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
            const y = (a * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        },
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        subtitle: 'Inbound & CRM Automation',
        primaryColor: '#FF7A59',
        accentColor: '#2D3E50',
        metalness: 0.35,
        roughness: 0.3,
        radius: 1.5,
        thickness: 0.36,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const r = size * 0.16;
          ctx.save();
          ctx.translate(c, c);

          ctx.strokeStyle = '#FF7A59';
          ctx.fillStyle = '#FF7A59';
          ctx.lineWidth = size * 0.055;
          ctx.lineCap = 'round';

          // Hub central ring
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.1, 0, Math.PI * 2);
          ctx.stroke();

          // Stalk 1 (top right)
          const angle1 = (-35 * Math.PI) / 180;
          const d1 = r * 2.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle1) * d1, Math.sin(angle1) * d1);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(Math.cos(angle1) * d1, Math.sin(angle1) * d1, r * 0.55, 0, Math.PI * 2);
          ctx.fill();

          // Stalk 2 (bottom right)
          const angle2 = (45 * Math.PI) / 180;
          const d2 = r * 2.1;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle2) * d2, Math.sin(angle2) * d2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(Math.cos(angle2) * d2, Math.sin(angle2) * d2, r * 0.48, 0, Math.PI * 2);
          ctx.fill();

          // Stalk 3 (top left)
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
        radius: 1.45,
        thickness: 0.35,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const w = size * 0.32;
          ctx.save();
          ctx.translate(c, c);

          // Klaviyo Dynamic Chevron / Flag
          ctx.fillStyle = '#12B76A';
          ctx.beginPath();
          ctx.moveTo(-w, -w * 0.9);
          ctx.lineTo(w * 0.8, -w * 0.9);
          ctx.lineTo(w * 0.4, w * 0.9);
          ctx.lineTo(-w, w * 0.9);
          ctx.closePath();
          ctx.fill();

          // Crisp K cutout
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `900 ${size * 0.32}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('K', -w * 0.1, 0);

          ctx.restore();
        },
      },
      {
        id: 'ga4',
        name: 'Google Analytics',
        subtitle: 'Attribution & Conversion',
        primaryColor: '#F9AB00',
        accentColor: '#E37400',
        metalness: 0.45,
        roughness: 0.22,
        radius: 1.5,
        thickness: 0.36,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const w = size * 0.11;
          const h = size * 0.48;
          ctx.save();
          ctx.translate(c, c);

          // Ascending Analytics Pillars
          ctx.fillStyle = '#F9AB00';
          // Bar 1 (short)
          ctx.beginPath();
          ctx.roundRect(-w * 2.2, h * 0.1, w, h * 0.4, w * 0.4);
          ctx.fill();

          // Bar 2 (medium)
          ctx.beginPath();
          ctx.roundRect(-w * 0.5, -h * 0.15, w, h * 0.65, w * 0.4);
          ctx.fill();

          // Bar 3 (tall)
          ctx.beginPath();
          ctx.roundRect(w * 1.2, -h * 0.5, w, h * 1.0, w * 0.4);
          ctx.fill();

          ctx.restore();
        },
      },
      {
        id: 'shopify',
        name: 'Shopify Plus',
        subtitle: 'E-Commerce Infrastructure',
        primaryColor: '#96BF48',
        accentColor: '#5E8E3E',
        metalness: 0.4,
        roughness: 0.28,
        radius: 1.5,
        thickness: 0.36,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const s = size * 0.38;
          ctx.save();
          ctx.translate(c, c);

          // Shopify Bag Silhouette
          ctx.fillStyle = '#96BF48';
          ctx.beginPath();
          ctx.moveTo(-s * 0.6, -s * 0.5);
          ctx.lineTo(s * 0.6, -s * 0.5);
          ctx.lineTo(s * 0.8, s * 0.8);
          ctx.lineTo(-s * 0.8, s * 0.8);
          ctx.closePath();
          ctx.fill();

          // Bag handle
          ctx.strokeStyle = '#5E8E3E';
          ctx.lineWidth = size * 0.05;
          ctx.beginPath();
          ctx.arc(0, -s * 0.5, s * 0.3, Math.PI, 0);
          ctx.stroke();

          // Monogram 'S'
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `900 ${size * 0.3}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('S', 0, s * 0.2);

          ctx.restore();
        },
      },
      {
        id: 'tiktok',
        name: 'TikTok Ads',
        subtitle: 'Short-Form Viral Reach',
        primaryColor: '#00F2FE',
        accentColor: '#FE2C55',
        metalness: 0.6,
        roughness: 0.18,
        radius: 1.45,
        thickness: 0.35,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const s = size * 0.38;
          ctx.save();
          ctx.translate(c, c);

          // Dark backing circle
          ctx.fillStyle = '#08080C';
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.9, 0, Math.PI * 2);
          ctx.fill();

          // Dual-Color Musical Note
          ctx.lineWidth = size * 0.06;
          ctx.lineCap = 'round';

          // Cyan layer
          ctx.strokeStyle = '#00F2FE';
          ctx.beginPath();
          ctx.arc(-s * 0.2, s * 0.3, s * 0.3, 0, Math.PI * 2);
          ctx.stroke();

          // Pink layer
          ctx.strokeStyle = '#FE2C55';
          ctx.beginPath();
          ctx.moveTo(-s * 0.2, s * 0.3);
          ctx.lineTo(-s * 0.2, -s * 0.5);
          ctx.lineTo(s * 0.3, -s * 0.3);
          ctx.stroke();

          ctx.restore();
        },
      },
      {
        id: 'clickup',
        name: 'ClickUp / CRM',
        subtitle: 'Campaign Execution',
        primaryColor: '#7B68EE',
        accentColor: '#FF005A',
        metalness: 0.45,
        roughness: 0.25,
        radius: 1.4,
        thickness: 0.34,
        drawIcon: (ctx, size) => {
          const c = size / 2;
          const s = size * 0.34;
          ctx.save();
          ctx.translate(c, c);

          // Clickup Chevron
          ctx.strokeStyle = '#7B68EE';
          ctx.lineWidth = size * 0.08;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(-s * 0.8, s * 0.2);
          ctx.lineTo(0, -s * 0.4);
          ctx.lineTo(s * 0.8, s * 0.2);
          ctx.stroke();

          // Pink Dot
          ctx.fillStyle = '#FF005A';
          ctx.beginPath();
          ctx.arc(0, s * 0.6, s * 0.25, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        },
      },
    ];
  }

  private createBadgeTexture(
    tool: MarketingToolConfig,
    isBack = false,
  ): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    const c = 512;
    const r = 480;

    // 1. Crisp background disk
    const bgGrad = ctx.createRadialGradient(c, c * 0.85, 50, c, c, r);
    if (!isBack) {
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.7, '#F4F5F8');
      bgGrad.addColorStop(1, '#E6E8EF');
    } else {
      bgGrad.addColorStop(0, '#1E2028');
      bgGrad.addColorStop(0.8, '#12141A');
      bgGrad.addColorStop(1, '#0A0C10');
    }

    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.fill();

    // 2. Beveled metallic border ring
    const borderGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    borderGrad.addColorStop(0, tool.primaryColor);
    borderGrad.addColorStop(0.5, tool.accentColor || tool.primaryColor);
    borderGrad.addColorStop(1, '#FFFFFF');

    ctx.lineWidth = 32;
    ctx.strokeStyle = borderGrad;
    ctx.stroke();

    // Subtle inner ring shadow
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.beginPath();
    ctx.arc(c, c, r - 24, 0, Math.PI * 2);
    ctx.stroke();

    if (!isBack) {
      // FRONT FACE: Official Tool Logo & Title
      tool.drawIcon(ctx, 1024);

      // Tool Name Pill at bottom
      ctx.fillStyle = tool.primaryColor;
      ctx.font = 'bold 54px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tool.name.toUpperCase(), c, 860);

      // Micro badge
      ctx.fillStyle = '#6E7485';
      ctx.font = '500 32px IBMPlexMono, monospace';
      ctx.fillText(tool.subtitle, c, 920);
    } else {
      // BACK FACE: Capability Description & Agency Branding
      ctx.fillStyle = tool.primaryColor;
      ctx.beginPath();
      ctx.arc(c, 340, 100, 0, Math.PI * 2);
      ctx.fill();

      // Brand Icon Micro on Back
      tool.drawIcon(ctx, 680);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 58px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tool.name, c, 530);

      ctx.fillStyle = '#A0AEC0';
      ctx.font = '400 38px IBMPlexMono, monospace';
      ctx.fillText(tool.subtitle, c, 610);

      ctx.fillStyle = tool.primaryColor;
      ctx.font = 'bold 36px IBMPlexMono, monospace';
      ctx.fillText('KYNDEV GROWTH STACK', c, 760);

      ctx.fillStyle = '#4A5568';
      ctx.font = '500 28px IBMPlexMono, monospace';
      ctx.fillText('ACTIVE PERFORMANCE ENGINE', c, 810);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }

  private getBounds(): { boundX: number; boundY: number; boundZ: number } {
    const vFov = (this.camera.fov * Math.PI) / 180;
    const visibleHeightAtZero = 2 * Math.tan(vFov / 2) * this.camera.position.z;
    const visibleWidthAtZero = visibleHeightAtZero * this.camera.aspect;

    // Strict containment inside the visible deck container
    // Inset safely by 14% so all badges bounce off interior walls and never touch container edge
    const boundX = (visibleWidthAtZero * 0.5) * 0.86;
    const boundY = (visibleHeightAtZero * 0.5) * 0.82;
    const boundZ = 2.5;

    return { boundX, boundY, boundZ };
  }

  private createTools(): void {
    const tools = this.getToolConfigs();
    const count = tools.length * 2; // 16 interactive 3D tool badges

    for (let i = 0; i < count; i++) {
      const tool = tools[i % tools.length];
      const geom = new THREE.CylinderGeometry(
        tool.radius,
        tool.radius,
        tool.thickness,
        64,
        1,
      );

      // Multi-material: [rim, front, back]
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: tool.primaryColor,
        metalness: tool.metalness,
        roughness: tool.roughness,
      });

      const frontTexture = this.createBadgeTexture(tool, false);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: 0.2,
        roughness: 0.35,
      });

      const backTexture = this.createBadgeTexture(tool, true);
      const backMaterial = new THREE.MeshStandardMaterial({
        map: backTexture,
        metalness: 0.2,
        roughness: 0.35,
      });

      const materials = [rimMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(geom, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Position within safe inner deck bounds
      const { boundX, boundY } = this.getBounds();
      const maxR = tool.radius + tool.thickness * 0.5;
      const limitX = Math.max(boundX - maxR, 0.5) * 0.85;
      const limitY = Math.max(boundY - maxR, 0.5) * 0.75;

      const x = (Math.random() - 0.5) * 2 * limitX;
      const y = (Math.random() - 0.5) * 2 * limitY;
      const z = (Math.random() - 0.5) * 2.0;

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      this.scene.add(mesh);

      this.bodies.push({
        mesh,
        tool,
        position: mesh.position,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.0,
        ),
        angularVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
        ),
        rotation: mesh.rotation,
        radius: tool.radius,
        mass: 1.0 + Math.random() * 0.5,
        isDragging: false,
      });
    }
  }

  private onPointerMove = (e: MouseEvent) => {
    if (!this.renderer || !this.renderer.domElement) return;
    const el = this.renderer.domElement;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.mouseVelocity.set(x - this.lastMouse.x, y - this.lastMouse.y);
    this.lastMouse.set(x, y);
    this.mouse.set(x, y);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    if (this.draggedBody) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersectionPoint)) {
        const { boundX, boundY } = this.getBounds();
        const maxR = this.draggedBody.radius + this.draggedBody.thickness * 0.5;
        const limitX = Math.max(boundX - maxR, 0.5);
        const limitY = Math.max(boundY - maxR, 0.5);

        const targetX = Math.max(-limitX, Math.min(limitX, this.intersectionPoint.x));
        const targetY = Math.max(-limitY, Math.min(limitY, this.intersectionPoint.y));
        const clampedTarget = new THREE.Vector3(targetX, targetY, this.draggedBody.position.z);

        this.draggedBody.velocity.copy(
          clampedTarget.sub(this.draggedBody.position).multiplyScalar(15),
        );
      }
    }
  };

  private onPointerDown = (e: MouseEvent) => {
    this.onPointerMove(e);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.bodies.map((b) => b.mesh),
    );

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh;
      const body = this.bodies.find((b) => b.mesh === hitMesh);
      if (body) {
        this.draggedBody = body;
        body.isDragging = true;
        this.plane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 0, 1),
          body.position,
        );
        this.onToolSelect?.(body.tool);
        this.applyImpulseToAll(body.position);
      }
    }
  };

  private onPointerUp = () => {
    if (this.draggedBody) {
      this.draggedBody.isDragging = false;
      this.draggedBody.velocity.add(
        new THREE.Vector3(
          this.mouseVelocity.x * 25,
          this.mouseVelocity.y * 25,
          (Math.random() - 0.5) * 5,
        ),
      );
      this.draggedBody = null;
    }
  };

  private bindEvents(): void {
    const el = this.renderer.domElement;
    el.addEventListener('mousemove', this.onPointerMove);
    el.addEventListener('mousedown', this.onPointerDown);
    window.addEventListener('mouseup', this.onPointerUp);
    window.addEventListener('resize', this.onResize);
  }

  public applyImpulseToAll(origin?: THREE.Vector3): void {
    const center = origin || new THREE.Vector3(0, 0, 0);
    this.bodies.forEach((b) => {
      const diff = b.position.clone().sub(center);
      const dist = Math.max(diff.length(), 0.5);
      const dir = diff.normalize();
      const force = 12 / dist;
      b.velocity.add(dir.multiplyScalar(force));
      b.angularVelocity.add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ),
      );
    });
  }

  private onResize = (): void => {
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

      if (!b.isDragging) {
        // Subtle drift toward gentle floating orbit
        b.velocity.x += -b.position.x * 0.08 * dt;
        b.velocity.y += -b.position.y * 0.08 * dt;
        b.velocity.z += -b.position.z * 0.12 * dt;

        // Damping
        b.velocity.multiplyScalar(0.985);
        b.angularVelocity.multiplyScalar(0.98);

        // Update position & rotation
        b.position.addScaledVector(b.velocity, dt);
        b.rotation.x += b.angularVelocity.x * dt;
        b.rotation.y += b.angularVelocity.y * dt;
        b.rotation.z += b.angularVelocity.z * dt;

        // Wall collisions (Elastic Bounce strictly within Deck Container walls)
        if (b.position.x > limitX) {
          b.position.x = limitX;
          b.velocity.x = -Math.abs(b.velocity.x) * 0.85;
        } else if (b.position.x < -limitX) {
          b.position.x = -limitX;
          b.velocity.x = Math.abs(b.velocity.x) * 0.85;
        }

        if (b.position.y > limitY) {
          b.position.y = limitY;
          b.velocity.y = -Math.abs(b.velocity.y) * 0.85;
        } else if (b.position.y < -limitY) {
          b.position.y = -limitY;
          b.velocity.y = Math.abs(b.velocity.y) * 0.85;
        }

        if (b.position.z > boundZ) {
          b.position.z = boundZ;
          b.velocity.z = -Math.abs(b.velocity.z) * 0.8;
        } else if (b.position.z < -boundZ) {
          b.position.z = -boundZ;
          b.velocity.z = Math.abs(b.velocity.z) * 0.8;
        }
      }

      // Inter-token sphere collisions
      for (let j = i + 1; j < this.bodies.length; j++) {
        const b2 = this.bodies[j];
        const diff = b.position.clone().sub(b2.position);
        const dist = diff.length();
        const minDist = b.radius + b2.radius;

        if (dist < minDist && dist > 0.001) {
          const normal = diff.normalize();
          const overlap = minDist - dist;

          // Push apart
          b.position.addScaledVector(normal, overlap * 0.5);
          b2.position.addScaledVector(normal, -overlap * 0.5);

          // Elastic collision response
          const relativeVelocity = b.velocity.clone().sub(b2.velocity);
          const velocityAlongNormal = relativeVelocity.dot(normal);

          if (velocityAlongNormal < 0) {
            const restitution = 0.85;
            const impulseMagnitude =
              (-(1 + restitution) * velocityAlongNormal) /
              (1 / b.mass + 1 / b2.mass);
            const impulse = normal.clone().multiplyScalar(impulseMagnitude);

            b.velocity.addScaledVector(impulse, 1 / b.mass);
            b2.velocity.addScaledVector(impulse, -1 / b2.mass);
          }
        }
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
