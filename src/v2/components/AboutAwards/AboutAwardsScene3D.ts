/**
 * Kyndev V2 - About Awards 3D Scene
 *
 * Implements the authentic 3D Starburst Medal and Chromatic Edge Gradient Shader
 * ported directly from src/scripts/unpacked-project/deobfuscated.js (AboutAwardSection).
 *
 * Features:
 * 1. 3D Starburst Geometric Medal: 8-point star with 16 faceted triangular wedges
 * 2. Chromatic Edge Shader: Mapped with /assets/textures/award_gradient.png
 * 3. 3D Perspective Tilt: Smooth cursor lookAt tracking & continuous zero-G rotation
 */

import * as THREE from 'three';

const starburstVert = `
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_pos;

void main() {
  v_uv = uv;
  v_normal = normalize(normalMatrix * normal);
  v_pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const starburstFrag = `
uniform sampler2D u_gradientTexture;
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_pos;

void main() {
  // Chromatic gradient sweep across starburst points
  float angle = atan(v_pos.y, v_pos.x) / 6.2831853 + 0.5;
  float sweep = fract(angle + u_time * 0.12);
  vec3 gradColor = texture2D(u_gradientTexture, vec2(sweep, 0.5)).rgb;

  // Specular sheen responding to cursor tilt
  vec3 lightDir = normalize(vec3(u_mouse.x, u_mouse.y, 1.5));
  float spec = pow(max(dot(v_normal, lightDir), 0.0), 16.0) * 0.8;

  // Rim glow
  float rim = 1.0 - max(dot(v_normal, vec3(0.0, 0.0, 1.0)), 0.0);
  rim = pow(rim, 2.5);

  vec3 finalColor = gradColor * 0.85 + vec3(spec) + vec3(0.22, 0.74, 0.97) * rim * 0.6;
  gl_FragColor = vec4(finalColor, 0.95);
}
`;

export class AboutAwardsScene3D {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  private starMesh: THREE.Mesh | null = null;
  private coreMesh: THREE.Mesh | null = null;
  private texture: THREE.Texture | null = null;

  private width = 0;
  private height = 0;
  private mouseTarget = new THREE.Vector2(0, 0);
  private mouseCurrent = new THREE.Vector2(0, 0);

  private rafId: number | null = null;
  private isDestroyed = false;
  private clock = new THREE.Clock();

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'v2-awards-3d-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '2';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  }

  public async init(): Promise<void> {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 320;
    this.height = rect.height || 320;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.updateCamera();

    // 1. Load award_gradient.png texture
    const texLoader = new THREE.TextureLoader();
    this.texture = await new Promise<THREE.Texture>((resolve) => {
      texLoader.load('/assets/textures/award_gradient.png', (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        resolve(tex);
      });
    });

    // 2. Build 3D 8-Point Starburst Geometry
    this.buildStarburstMesh();

    this.bindEvents();
    this.startLoop();
  }

  private updateCamera(): void {
    const w = this.width;
    const h = this.height;
    this.camera.aspect = w / h;
    this.camera.position.set(0, 0, 5.0);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  private buildStarburstMesh(): void {
    const points = 8;
    const outerRadius = 1.6;
    const innerRadius = 0.95;
    const depth = 0.25;

    const vertices: number[] = [];
    const indices: number[] = [];
    const uvs: number[] = [];

    // Apex front center
    vertices.push(0, 0, depth);
    uvs.push(0.5, 0.5);

    // Outer star vertices
    const totalOuter = points * 2;
    for (let i = 0; i < totalOuter; i++) {
      const angle = (i / totalOuter) * Math.PI * 2;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      vertices.push(x, y, 0);
      uvs.push(x / (outerRadius * 2) + 0.5, y / (outerRadius * 2) + 0.5);
    }

    // Front faces
    for (let i = 1; i <= totalOuter; i++) {
      const next = i === totalOuter ? 1 : i + 1;
      indices.push(0, i, next);
    }

    // Back apex
    const backApexIndex = vertices.length / 3;
    vertices.push(0, 0, -depth);
    uvs.push(0.5, 0.5);

    // Back faces
    for (let i = 1; i <= totalOuter; i++) {
      const next = i === totalOuter ? 1 : i + 1;
      indices.push(backApexIndex, next, i);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_gradientTexture: { value: this.texture },
        u_time: { value: 0 },
        u_mouse: { value: this.mouseCurrent }
      },
      vertexShader: starburstVert,
      fragmentShader: starburstFrag,
      side: THREE.DoubleSide
    });

    this.starMesh = new THREE.Mesh(geom, mat);
    this.scene.add(this.starMesh);

    // Central core metallic disc
    const coreGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d0e,
      roughness: 0.2,
      metalness: 0.9
    });
    this.coreMesh = new THREE.Mesh(coreGeom, coreMat);
    this.coreMesh.rotation.x = Math.PI / 2;
    this.scene.add(this.coreMesh);
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onResize = (): void => {
    if (!this.container || !this.renderer) return;
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 320;
    this.height = rect.height || 320;

    this.renderer.setSize(this.width, this.height);
    this.updateCamera();
  };

  private onMouseMove = (e: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.mouseTarget.set(nx, ny);
  };

  private startLoop(): void {
    const tick = (): void => {
      if (this.isDestroyed || !this.renderer) return;
      const elapsedTime = this.clock.getElapsedTime();

      this.mouseCurrent.lerp(this.mouseTarget, 0.08);

      if (this.starMesh) {
        // Continuous 3D rotation & mouse tilt
        this.starMesh.rotation.z = elapsedTime * 0.45;
        this.starMesh.rotation.y = this.mouseCurrent.x * 0.4;
        this.starMesh.rotation.x = -this.mouseCurrent.y * 0.3;

        const mat = this.starMesh.material as THREE.ShaderMaterial;
        mat.uniforms.u_time.value = elapsedTime;
        mat.uniforms.u_mouse.value.copy(this.mouseCurrent);
      }

      if (this.coreMesh) {
        this.coreMesh.rotation.z = -elapsedTime * 0.25;
        this.coreMesh.rotation.y = this.mouseCurrent.x * 0.4;
        this.coreMesh.rotation.x = -this.mouseCurrent.y * 0.3 + Math.PI / 2;
      }

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

    this.texture?.dispose();
    this.starMesh?.geometry.dispose();
    (this.starMesh?.material as THREE.Material)?.dispose();
    this.coreMesh?.geometry.dispose();
    (this.coreMesh?.material as THREE.Material)?.dispose();

    this.renderer?.dispose();
    this.canvas.remove();
  }
}
