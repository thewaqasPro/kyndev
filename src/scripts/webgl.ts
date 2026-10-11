import * as THREE from 'three';

class WebGLScene {
  private canvas: HTMLCanvasElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  
  // Objects
  private particleSystem: THREE.Points | null = null;
  private particlePositions: Float32Array | null = null;
  private originalPositions: Float32Array | null = null;
  private particleVelocities: Float32Array | null = null;
  private particleColors: Float32Array | null = null;
  private particleCount = 2200;

  // Geometric Wireframe Polyhedrons
  private floatingShapes: THREE.Group | null = null;
  private gridMesh: THREE.LineSegments | null = null;
  
  // Interaction & Motion
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private clock = new THREE.Clock();
  private animationFrameId: number | null = null;
  private isPaused = false;
  private isReducedMotion = false;
  private isInitialized = false;

  // Color schemes for pages
  private readonly pageThemes: Record<string, { primary: number; secondary: number; fog: number }> = {
    home: { primary: 0x00f0ff, secondary: 0x8c52ff, fog: 0x070709 },
    projects: { primary: 0x00d4ff, secondary: 0xff0055, fog: 0x070709 },
    services: { primary: 0xffaa00, secondary: 0x00f0ff, fog: 0x070709 },
    about: { primary: 0x39ff14, secondary: 0x00f0ff, fog: 0x070709 },
    contact: { primary: 0xff3366, secondary: 0x8c52ff, fog: 0x070709 }
  };
  private currentTheme = 'home';

  public init() {
    if (this.isInitialized) return;

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.isReducedMotion = true;
      this.canvas.style.display = 'none';
      return;
    }

    try {
      // 1. Renderer Setup
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x070709, 1);

      // 2. Scene & Fog
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x070709, 0.035);

      // 3. Camera Rig
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 18);

      // 4. Build Layers
      this.createParticles();
      this.createAtmosphereShapes();
      this.createTopologicalGrid();

      // 5. Event Listeners
      this.setupEventListeners();

      this.isInitialized = true;
      this.animate();
    } catch (e) {
      console.warn('WebGL Initialization skipped or failed:', e);
      if (this.canvas) this.canvas.style.display = 'none';
    }
  }

  private createParticles() {
    if (!this.scene) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const originalPositions = new Float32Array(this.particleCount * 3);
    const velocities = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const color1 = new THREE.Color(0x00f0ff); // Cyan
    const color2 = new THREE.Color(0x8c52ff); // Violet
    const color3 = new THREE.Color(0xffffff); // Star white

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      // Cylindrical / spherical volume distribution
      const radius = 5 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 45;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Color variation
      const mixRatio = Math.random();
      const mixedColor = mixRatio < 0.6 ? color1.clone().lerp(color2, Math.random()) : color3;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow particle texture using canvas
    const particleTexture = this.generateParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.38,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.85
    });

    this.particlePositions = positions;
    this.originalPositions = originalPositions;
    this.particleVelocities = velocities;
    this.particleColors = colors;
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  private generateParticleTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
    gradient.addColorStop(0.6, 'rgba(140, 82, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  private createAtmosphereShapes() {
    if (!this.scene) return;

    this.floatingShapes = new THREE.Group();

    // 1. Sleek wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(7, 2, -6);
    this.floatingShapes.add(icoMesh);

    // 2. Torus knot with subtle iridescent wireframe
    const torusGeo = new THREE.TorusKnotGeometry(2.4, 0.45, 80, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x8c52ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-8, -6, -4);
    this.floatingShapes.add(torusMesh);

    // 3. Floating concentric orbital rings
    const ringGroup = new THREE.Group();
    for (let r = 1; r <= 3; r++) {
      const ringGeo = new THREE.RingGeometry(r * 2.2, r * 2.2 + 0.04, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15 - r * 0.03
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI * 0.5 + r * 0.2;
      ringMesh.rotation.y = r * 0.3;
      ringGroup.add(ringMesh);
    }
    ringGroup.position.set(0, -12, -8);
    this.floatingShapes.add(ringGroup);

    this.scene.add(this.floatingShapes);
  }

  private createTopologicalGrid() {
    if (!this.scene) return;

    // Undulating topological grid lines at the base
    const size = 60;
    const divisions = 40;
    const gridGeo = new THREE.PlaneGeometry(size, size, divisions, divisions);
    gridGeo.rotateX(-Math.PI * 0.5);

    // Wireframe edges
    const wireframe = new THREE.WireframeGeometry(gridGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.08
    });

    this.gridMesh = new THREE.LineSegments(wireframe, lineMat);
    this.gridMesh.position.set(0, -14, 0);
    this.scene.add(this.gridMesh);
  }

  private setupEventListeners() {
    // Mouse Move (window-level for smooth parallax)
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Touch Move
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        this.mouse.targetY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    }, { passive: true });

    // Resize
    window.addEventListener('resize', () => {
      this.onResize();
    }, { passive: true });

    // Visibility Change (pause rendering when tab is hidden to save battery)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isPaused = true;
      } else {
        this.isPaused = false;
        this.clock.start();
      }
    });

    // Page navigation / Astro view transitions event
    document.addEventListener('astro:page-load', () => {
      this.updateForCurrentRoute();
    });
  }

  public setScrollProgress(progress: number) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  public setPageTheme(themeName: string) {
    if (!this.scene || !this.pageThemes[themeName]) return;
    this.currentTheme = themeName;
    const theme = this.pageThemes[themeName];

    if (this.particleSystem && this.particleColors) {
      const color1 = new THREE.Color(theme.primary);
      const color2 = new THREE.Color(theme.secondary);

      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        const mixRatio = Math.random();
        const mixed = color1.clone().lerp(color2, mixRatio);
        this.particleColors[i3] = mixed.r;
        this.particleColors[i3 + 1] = mixed.g;
        this.particleColors[i3 + 2] = mixed.b;
      }
      const colorAttr = this.particleSystem.geometry.getAttribute('color') as THREE.BufferAttribute;
      if (colorAttr) colorAttr.needsUpdate = true;
    }
  }

  private updateForCurrentRoute() {
    const path = window.location.pathname;
    if (path.includes('/projects')) {
      this.setPageTheme('projects');
    } else if (path.includes('/services')) {
      this.setPageTheme('services');
    } else if (path.includes('/about')) {
      this.setPageTheme('about');
    } else if (path.includes('/contact')) {
      this.setPageTheme('contact');
    } else {
      this.setPageTheme('home');
    }
  }

  private onResize() {
    if (!this.camera || !this.renderer) return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (this.isPaused || this.isReducedMotion || !this.renderer || !this.scene || !this.camera) {
      return;
    }

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Mouse Lerping
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 2. Scroll Lerping
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;

    // 3. Camera Choreography (Drift & Fly based on scroll + mouse)
    const baseCamY = -this.scrollProgress * 18;
    const baseCamZ = 18 - Math.sin(this.scrollProgress * Math.PI) * 4;

    this.camera.position.x = this.mouse.x * 2.5;
    this.camera.position.y = baseCamY + this.mouse.y * 1.5;
    this.camera.position.z = baseCamZ;

    this.camera.rotation.x = -this.mouse.y * 0.08 - this.scrollProgress * 0.2;
    this.camera.rotation.y = -this.mouse.x * 0.08;
    this.camera.rotation.z = Math.sin(elapsedTime * 0.2) * 0.02;

    // 4. Animate Particle Field (Gentle curl noise drift + mouse deflection)
    if (this.particleSystem && this.particlePositions && this.originalPositions) {
      const positions = this.particlePositions;
      const originals = this.originalPositions;

      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        
        // Gentle undulating wave
        const wave = Math.sin(elapsedTime * 0.8 + originals[i3] * 0.15 + originals[i3 + 2] * 0.15) * 0.4;
        positions[i3 + 1] = originals[i3 + 1] + wave;

        // Subtle rotation around Y axis
        const angle = 0.0008;
        const x = positions[i3];
        const z = positions[i3 + 2];
        positions[i3] = x * Math.cos(angle) - z * Math.sin(angle);
        positions[i3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);
      }

      const posAttr = this.particleSystem.geometry.getAttribute('position') as THREE.BufferAttribute;
      if (posAttr) posAttr.needsUpdate = true;
    }

    // 5. Animate Floating Shapes
    if (this.floatingShapes) {
      this.floatingShapes.children.forEach((child, idx) => {
        child.rotation.x += 0.003 * (idx + 1);
        child.rotation.y += 0.004 * (idx + 1);
      });
    }

    // 6. Animate Topological Grid
    if (this.gridMesh) {
      this.gridMesh.rotation.y = elapsedTime * 0.02;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    this.isInitialized = false;
  }
}

// Global Singleton Instance
export const webglScene = new WebGLScene();
