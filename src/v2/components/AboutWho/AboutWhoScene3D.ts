/**
 * Kyndev V2 - About Who 3D Scene
 *
 * Implements the authentic 3D Landscape Terrain, Floating Rocks, and
 * Particle Team Busts ported directly from src/scripts/unpacked-project/deobfuscated.js
 * (AboutHero, AboutHeroGround, AboutHeroRocks, AboutHeroFaces).
 *
 * Features:
 * 1. 3D Terrain: Loaded from /assets/models/about/terrain.buf
 * 2. Floating Rocks: Loaded from /assets/models/about/rock_0.buf
 * 3. Point Cloud Team Busts: Loaded from /assets/team/{member}.buf
 *    - Point cloud particles with additive cyan/white sheen
 *    - Rotates and switches when navigating the team carousel
 *    - Mouse lookAt tracking
 */

import * as THREE from 'three';
import { BufLoader } from '../../core/BufLoader';

export class AboutWhoScene3D {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Scene objects
  private terrainMesh: THREE.Mesh | null = null;
  private rockMesh: THREE.Mesh | null = null;
  private teamPoints: THREE.Points | null = null;
  private teamGroup: THREE.Group;

  // Cache for loaded team busts
  private teamGeometries: Map<string, THREE.BufferGeometry> = new Map();

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
    this.canvas.className = 'v2-about-who-3d-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.teamGroup = new THREE.Group();
    this.scene.add(this.teamGroup);

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  }

  public async init(): Promise<void> {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 700;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.updateCamera();
    this.setupLighting();

    // 1. Load 3D Terrain
    await this.initTerrain();

    // 2. Load Floating Rock
    await this.initRock();

    // 3. Load Active Team Bust (Edan by default)
    await this.setTeamMember('edan');

    this.bindEvents();
    this.startLoop();
  }

  private updateCamera(): void {
    const w = this.width;
    const h = this.height;
    this.camera.aspect = w / h;
    this.camera.position.set(0, 1.2, 5.5);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  private setupLighting(): void {
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.0);
    dirLight1.position.set(5, 8, 4);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x061dfb, 2.0);
    dirLight2.position.set(-5, -4, -2);
    this.scene.add(dirLight2);
  }

  private async initTerrain(): Promise<void> {
    try {
      const geom = await BufLoader.load('/assets/models/about/terrain.buf');
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x151824),
        roughness: 0.8,
        metalness: 0.2,
        wireframe: false
      });

      this.terrainMesh = new THREE.Mesh(geom, mat);
      this.terrainMesh.scale.setScalar(0.0035);
      this.terrainMesh.position.set(0, -2.4, -4);
      this.terrainMesh.rotation.set(-0.35, 0.2, 0);
      this.scene.add(this.terrainMesh);
    } catch (err) {
      console.warn('AboutWho terrain failed to load:', err);
    }
  }

  private async initRock(): Promise<void> {
    try {
      const geom = await BufLoader.load('/assets/models/about/rock_0.buf');
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x283042),
        roughness: 0.5,
        metalness: 0.3
      });

      this.rockMesh = new THREE.Mesh(geom, mat);
      this.rockMesh.scale.setScalar(0.008);
      this.rockMesh.position.set(-2.2, -0.6, -1);
      this.scene.add(this.rockMesh);
    } catch (err) {
      console.warn('AboutWho rock failed to load:', err);
    }
  }

  public async setTeamMember(memberId: string): Promise<void> {
    const validMembers = ['edan', 'pierre', 'paul', 'sunny', 'andrii', 'yannic', 'ffi'];
    const safeId = validMembers.includes(memberId) ? memberId : 'edan';

    try {
      let geom = this.teamGeometries.get(safeId);
      if (!geom) {
        geom = await BufLoader.load(`/assets/team/${safeId}.buf`);
        geom.center();
        this.teamGeometries.set(safeId, geom);
      }

      if (this.teamPoints) {
        this.teamGroup.remove(this.teamPoints);
        this.teamPoints.geometry.dispose();
      }

      const mat = new THREE.PointsMaterial({
        size: 0.022,
        color: new THREE.Color(0x7dd3fc),
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending
      });

      this.teamPoints = new THREE.Points(geom, mat);
      this.teamPoints.scale.setScalar(0.0038);
      this.teamPoints.position.set(1.8, 0.4, 0.5);
      this.teamPoints.rotation.set(0, -0.4, 0);

      this.teamGroup.add(this.teamPoints);
    } catch (err) {
      console.warn(`AboutWho team bust for ${safeId} failed to load:`, err);
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onResize = (): void => {
    if (!this.container || !this.renderer) return;
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 700;

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

      // Animate floating rock
      if (this.rockMesh) {
        this.rockMesh.rotation.y = elapsedTime * 0.25;
        this.rockMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
        this.rockMesh.position.y = -0.6 + Math.sin(elapsedTime * 0.8) * 0.08;
      }

      // Animate team particle bust
      if (this.teamPoints) {
        this.teamPoints.rotation.y = -0.4 + this.mouseCurrent.x * 0.45;
        this.teamPoints.rotation.x = -this.mouseCurrent.y * 0.25;
        this.teamPoints.position.y = 0.4 + Math.sin(elapsedTime * 1.1) * 0.05;
      }

      // Camera parallax
      this.camera.position.x = this.mouseCurrent.x * 0.4;
      this.camera.position.y = 1.2 + this.mouseCurrent.y * 0.25;
      this.camera.lookAt(0, 0, 0);

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

    this.terrainMesh?.geometry.dispose();
    (this.terrainMesh?.material as THREE.Material)?.dispose();

    this.rockMesh?.geometry.dispose();
    (this.rockMesh?.material as THREE.Material)?.dispose();

    this.teamGeometries.forEach((g) => g.dispose());
    this.teamGeometries.clear();

    this.teamPoints?.geometry.dispose();
    (this.teamPoints?.material as THREE.Material)?.dispose();

    this.renderer?.dispose();
    this.canvas.remove();
  }
}
