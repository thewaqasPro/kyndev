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

  // Liquid Wave Post-processing Pipeline (Signature Kyndev Fluid Wave)
  public postRenderTarget: THREE.WebGLRenderTarget | null = null;
  public postScene: THREE.Scene | null = null;
  public postCamera: THREE.OrthographicCamera | null = null;
  public postMaterial: THREE.ShaderMaterial | null = null;
  public postQuad: THREE.Mesh | null = null;

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
    this.setupPostProcessing(width, height);
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

  private setupPostProcessing(width: number, height: number): void {
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.postRenderTarget = new THREE.WebGLRenderTarget(
      Math.max(1, Math.floor(width * dpr)),
      Math.max(1, Math.floor(height * dpr)),
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
      }
    );

    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const vertexShader = `
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture;
      uniform sampler2D u_screenPaintTexture;
      uniform int u_hasScreenPaint;
      uniform vec4 u_containerRect;
      uniform vec2 u_screenPaintTexelSize;
      uniform vec2 u_localMouse;
      uniform vec2 u_localVelocity;
      uniform float u_amount;
      uniform float u_rgbShift;
      uniform float u_multiplier;
      uniform float u_colorMultiplier;
      uniform float u_shade;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_uv;

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      void main() {
        vec2 vel = vec2(0.0);
        float weight = 0.0;

        // 1. Global Kyndev screenPaint fluid simulation FBO
        if (u_hasScreenPaint == 1) {
          vec2 screenUv = vec2(
            u_containerRect.x + v_uv.x * u_containerRect.z,
            u_containerRect.y + v_uv.y * u_containerRect.w
          );
          vec4 data = texture2D(u_screenPaintTexture, clamp(screenUv, 0.0, 1.0));
          float spWeight = (data.z + data.w) * 0.5;
          if (spWeight > 0.003) {
            vel = (0.5 - data.xy - 0.001) * 2.0 * spWeight;
            weight = spWeight;
          }
        }

        // 2. Local interactive mouse wave velocity over the 3D scene
        float aspect = u_resolution.x / max(u_resolution.y, 1.0);
        vec2 delta = (v_uv - u_localMouse) * vec2(aspect, 1.0);
        float localDist = length(delta);
        float localRadius = 0.32;
        float localFalloff = smoothstep(localRadius, 0.0, localDist);
        float localSpeed = length(u_localVelocity);
        if (localSpeed > 0.0001 && localFalloff > 0.005) {
          vec2 localVel = u_localVelocity * localFalloff * 4.0;
          vel += localVel;
          weight = max(weight, localFalloff * min(localSpeed * 30.0, 1.0));
        }

        // 3. Fluid refractive wave distortion
        vec2 velocity = vel * (u_amount / 4.0) * u_screenPaintTexelSize * u_multiplier;
        float noise = hash12(gl_FragCoord.xy + u_time * 12.0) * 0.5;
        vec2 uv = v_uv + noise * velocity;
        vec4 color = vec4(0.0);

        for (int i = 0; i < 9; i++) {
          color += texture2D(u_texture, clamp(uv, 0.0, 1.0));
          uv += velocity;
        }
        color /= 9.0;

        // 4. Iridescent spectral shimmer wave (signature Kyndev liquid wave chromatic sheen)
        float speed = max(abs(vel.x), abs(vel.y));
        if (speed > 0.0001) {
          vec3 wavePhase = vec3(vel.x + vel.y) * 45.0 + vec3(0.0, 2.0, 4.0) * u_rgbShift;
          vec3 shimmer = sin(wavePhase) * smoothstep(0.4, -0.9, weight) * u_shade * speed * u_colorMultiplier;
          color.rgb += shimmer;
        }

        gl_FragColor = color;
      }
    `;

    this.postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: null },
        u_screenPaintTexture: { value: null },
        u_hasScreenPaint: { value: 0 },
        u_containerRect: { value: new THREE.Vector4(0, 0, 1, 1) },
        u_screenPaintTexelSize: { value: new THREE.Vector2(1 / 500, 1 / 500) },
        u_localMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_localVelocity: { value: new THREE.Vector2(0, 0) },
        u_amount: { value: 3.5 },
        u_rgbShift: { value: 0.5 },
        u_multiplier: { value: 5.0 },
        u_colorMultiplier: { value: 10.0 },
        u_shade: { value: 1.25 },
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    const geom = new THREE.PlaneGeometry(2, 2);
    this.postQuad = new THREE.Mesh(geom, this.postMaterial);
    this.postScene.add(this.postQuad);
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
        radius: 1.6,
        thickness: 0.4,
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
        radius: 1.5,
        thickness: 0.35,
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
        radius: 1.45,
        thickness: 0.35,
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
        radius: 1.5,
        thickness: 0.36,
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

    configs.forEach((tool) => {
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
      const limitX = Math.max(boundX - maxR, 0.5) * 0.85;
      const limitY = Math.max(boundY - maxR, 0.5) * 0.75;

      const x = (Math.random() - 0.5) * 2 * limitX;
      const y = (Math.random() - 0.5) * 2 * limitY;
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
    const dpr = Math.min(window.devicePixelRatio, 2);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    if (this.postRenderTarget) {
      this.postRenderTarget.setSize(
        Math.max(1, Math.floor(width * dpr)),
        Math.max(1, Math.floor(height * dpr))
      );
    }
    if (this.postMaterial) {
      this.postMaterial.uniforms.u_resolution.value.set(width, height);
    }
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

      // Liquid Wave Post-processing Pass
      if (this.postRenderTarget && this.postScene && this.postCamera && this.postMaterial) {
        this.renderer.setRenderTarget(this.postRenderTarget);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);

        const uniforms = this.postMaterial.uniforms;
        uniforms.u_texture.value = this.postRenderTarget.texture;
        uniforms.u_time.value = this.clock.getElapsedTime();

        // Connect to global ScreenPaint FBO if active
        const sp = (window as any).screenPaint;
        const spTexture = sp?.sharedUniforms?.u_currPaintTexture?.value;
        if (spTexture) {
          uniforms.u_screenPaintTexture.value = spTexture;
          uniforms.u_hasScreenPaint.value = 1;
          if (sp.sharedUniforms?.u_paintTexelSize?.value) {
            uniforms.u_screenPaintTexelSize.value.copy(sp.sharedUniforms.u_paintTexelSize.value);
          }
        } else {
          uniforms.u_hasScreenPaint.value = 0;
        }

        // Map container bounding box into screen UV space
        const rect = this.container.getBoundingClientRect();
        const winW = window.innerWidth || 1;
        const winH = window.innerHeight || 1;
        uniforms.u_containerRect.value.set(
          rect.left / winW,
          (winH - rect.bottom) / winH,
          rect.width / winW,
          rect.height / winH
        );

        // Local pointer tracking
        uniforms.u_localMouse.value.set(
          this.mouse.x * 0.5 + 0.5,
          this.mouse.y * 0.5 + 0.5
        );
        uniforms.u_localVelocity.value.copy(this.mouseVelocity);

        // Dampen local mouse velocity smoothly
        this.mouseVelocity.multiplyScalar(0.92);

        this.renderer.render(this.postScene, this.postCamera);
      } else {
        this.renderer.render(this.scene, this.camera);
      }

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
    if (this.postRenderTarget) {
      this.postRenderTarget.dispose();
      this.postRenderTarget = null;
    }
    if (this.postMaterial) {
      this.postMaterial.dispose();
      this.postMaterial = null;
    }
    if (this.postQuad) {
      this.postQuad.geometry.dispose();
      this.postQuad = null;
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
