import * as THREE from 'three';
import { Stage3D } from '../../core/Stage3D';
import { BufLoader } from '../../core/BufLoader';
import { createBalloonsData, HERO_COLORS, type BalloonConfig } from './HeroData';
import { HeroPhysics } from './HeroPhysics';

export class HeroScene extends Stage3D {
  public physics: HeroPhysics = new HeroPhysics();
  public meshes: THREE.Mesh[] = [];
  public balloonConfigs: BalloonConfig[] = [];
  public colorIndex: number = 0;

  private geometry: THREE.BufferGeometry | null = null;
  private mouseNDC: THREE.Vector2 = new THREE.Vector2(0, 0);
  private targetCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 16);

  constructor() {
    super({
      cameraFov: 28,
      cameraNear: 0.1,
      cameraFar: 100,
    });
    this.camera.position.set(0, 0, 16);
  }

  public async init(): Promise<void> {
    // 1. Setup Scene Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(8, 12, 10);
    this.scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x4488ff, 1.5);
    rimLight.position.set(-10, -8, -5);
    this.scene.add(rimLight);

    // 2. Load Jack Geometry
    try {
      this.geometry = await BufLoader.load('/assets/models/home/cross.buf');
    } catch (err) {
      console.warn('[HeroScene] Could not load cross.buf, generating procedural jack geometry:', err);
      this.geometry = this.createFallbackJackGeometry();
    }

    // 3. Initialize Physics Bodies
    this.balloonConfigs = createBalloonsData(HERO_COLORS[this.colorIndex]);
    this.physics.init(this.balloonConfigs);

    // 4. Create 3D Meshes
    for (let i = 0; i < this.balloonConfigs.length; i++) {
      const config = this.balloonConfigs[i];
      const material = this.createMaterial(config);
      const mesh = new THREE.Mesh(this.geometry, material);
      mesh.scale.setScalar(config.radius);
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
  }

  private createMaterial(config: BalloonConfig): THREE.Material {
    if (config.isSemitransparent) {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(config.color),
        roughness: 0.15,
        transmission: 0.85,
        thickness: 1.2,
        ior: 1.45,
        transparent: true,
        opacity: 0.9,
      });
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.color),
      roughness: config.isRough ? 0.65 : 0.18,
      metalness: 0.08,
    });
  }

  public updateColor(newIndex: number): void {
    this.colorIndex = newIndex % HERO_COLORS.length;
    const accent = HERO_COLORS[this.colorIndex];
    this.balloonConfigs = createBalloonsData(accent);

    this.meshes.forEach((mesh, i) => {
      const cfg = this.balloonConfigs[i];
      if (mesh.material instanceof THREE.MeshStandardMaterial || mesh.material instanceof THREE.MeshPhysicalMaterial) {
        mesh.material.color.set(cfg.color);
      }
    });

    this.physics.bodies.forEach((b) => b.applyImpulse(1.2));
  }

  public onPointerMove(ndc: THREE.Vector2): void {
    this.mouseNDC.copy(ndc);
    this.targetCameraPos.x = ndc.x * 1.5;
    this.targetCameraPos.y = ndc.y * 1.5;
  }

  public onPointerClick(): void {
    this.updateColor(this.colorIndex + 1);
  }

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    // Dynamically calculate visible frustum boundaries at Z = 0
    const vFovRad = (this.camera.fov * Math.PI) / 180;
    const halfH = Math.tan(vFovRad / 2) * this.camera.position.z;
    const halfW = halfH * aspect;

    // Buffer margin so jack meshes (radius ~1.0) never touch or breach container edges
    const boundX = Math.max(2.0, halfW - 1.15);
    const boundY = Math.max(1.5, halfH - 1.15);
    this.physics.setBounds(boundX, boundY, 2.2);
  }

  public update(delta: number, _time: number): void {
    // Smooth camera motion
    this.camera.position.lerp(this.targetCameraPos, 0.05);
    this.camera.lookAt(0, 0, 0);

    // Step physics
    this.physics.update(delta, this.camera, this.mouseNDC);

    // Sync 3D meshes with physics bodies
    for (let i = 0; i < this.meshes.length; i++) {
      const body = this.physics.bodies[i];
      const mesh = this.meshes[i];
      if (body && mesh) {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
      }
    }
  }

  public destroy(): void {
    this.meshes.forEach((m) => {
      this.scene.remove(m);
      if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
      else m.material.dispose();
    });
    this.meshes = [];
    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }
  }

  private createFallbackJackGeometry(): THREE.BufferGeometry {
    // Creates 3 intersecting cylinders along X, Y, Z
    const geomX = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 16);
    geomX.rotateZ(Math.PI / 2);

    const geomY = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 16);

    const geomZ = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 16);
    geomZ.rotateX(Math.PI / 2);

    // Merge geometries
    const merged = new THREE.BufferGeometry();
    const pos = [
      ...geomX.attributes.position.array,
      ...geomY.attributes.position.array,
      ...geomZ.attributes.position.array,
    ];
    merged.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    merged.computeVertexNormals();
    return merged;
  }
}
