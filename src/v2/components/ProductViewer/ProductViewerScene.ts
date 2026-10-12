import * as THREE from 'three';
import { Stage3D } from '../../core/Stage3D';
import { BufLoader } from '../../core/BufLoader';
import {
  createCorkCanvasTexture,
  createCorkBumpTexture,
  createContactShadowTexture,
  createNormalsPrepassMaterial,
  createDepthPrepassMaterial,
  createWireframeMaterial,
  ensureUVs,
} from './ProductViewerMaterials';
import { ProductViewerControls } from './ProductViewerControls';

export type PrepassMode = 'pbr' | 'normals' | 'depth' | 'wireframe';
export type LightingMood = 'studio' | 'neon' | 'golden' | 'dark';

export interface ProductMetadata {
  id: string;
  name: string;
  slug: string;
  caseStudy: string;
  tagline: string;
  material: string;
  polyCount: number;
  vertexCount: number;
  dimensions: string;
}

export class ProductViewerScene extends Stage3D {
  public controls: ProductViewerControls | null = null;
  public currentProductIndex: number = 0;
  public prepassMode: PrepassMode = 'pbr';
  public lightingMood: LightingMood = 'studio';

  // Scene elements
  private rootProductGroup: THREE.Group = new THREE.Group();
  private productMeshes: THREE.Group[] = [];
  private contactShadow: THREE.Mesh | null = null;
  private pedestal: THREE.Mesh | null = null;
  private gridHelper: THREE.GridHelper | null = null;

  // Lighting rig
  private keyLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
  private fillLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xd8e6f5, 1.2);
  private rimLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xf5eed8, 1.5);
  private ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x202530, 0.8);
  private topSpot: THREE.SpotLight = new THREE.SpotLight(0xffffff, 1.5);

  // Prepass override materials
  private normalsMaterial: THREE.ShaderMaterial = createNormalsPrepassMaterial();
  private depthMaterial: THREE.ShaderMaterial = createDepthPrepassMaterial();
  private wireframeMaterial: THREE.MeshBasicMaterial = createWireframeMaterial();

  // Cork textures
  private corkTexture: THREE.CanvasTexture | null = null;
  private corkBumpTexture: THREE.CanvasTexture | null = null;
  private shadowTexture: THREE.CanvasTexture | null = null;

  // Animation & switching state
  private switchProgress: number = 1.0;
  private isSwitching: boolean = false;
  private targetProductIndex: number = 0;

  // Telemetry callback
  public onProductChanged?: (meta: ProductMetadata) => void;

  constructor() {
    super({
      cameraFov: 32,
      cameraNear: 0.1,
      cameraFar: 50,
    });
    this.camera.position.set(0, 1.6, 3.6);
  }

  public async init(): Promise<void> {
    this.setupLighting();
    this.setupPedestal();

    // Textures
    this.corkTexture = createCorkCanvasTexture();
    this.corkBumpTexture = createCorkBumpTexture();
    this.shadowTexture = createContactShadowTexture();

    // Scene hierarchy
    this.scene.add(this.rootProductGroup);

    // Build Product 0: Oryzo-1 Cork Coaster
    const coasterGroup = this.createCorkCoaster();
    this.productMeshes.push(coasterGroup);

    // Build Product 1: Obsidian Dream Machine
    const dreamMachineGroup = await this.createDreamMachine();
    this.productMeshes.push(dreamMachineGroup);

    // Build Product 2: Cyber Cross Monolith
    const crossGroup = await this.createCyberCross();
    this.productMeshes.push(crossGroup);

    // Build Product 3: Quantum Orbital Sphere
    const sphereGroup = await this.createQuantumSphere();
    this.productMeshes.push(sphereGroup);

    // Mount initial active product
    this.productMeshes.forEach((group, idx) => {
      group.visible = idx === this.currentProductIndex;
      this.rootProductGroup.add(group);
    });

    this.applyLightingMood(this.lightingMood);
    this.notifyProductMeta();
  }

  public attachControls(domElement: HTMLElement): void {
    this.controls = new ProductViewerControls(this.camera, domElement, {
      autoRotate: true,
      autoRotateSpeed: 1.0,
      minDistance: 1.8,
      maxDistance: 8.0,
      dampingFactor: 0.06,
    });
  }

  private setupLighting(): void {
    this.keyLight.position.set(4, 6, 4);
    this.keyLight.castShadow = false;
    this.scene.add(this.keyLight);

    this.fillLight.position.set(-5, 3, -3);
    this.scene.add(this.fillLight);

    this.rimLight.position.set(0, -3, -5);
    this.scene.add(this.rimLight);

    this.topSpot.position.set(0, 7, 0);
    this.topSpot.angle = Math.PI / 4;
    this.topSpot.penumbra = 0.8;
    this.scene.add(this.topSpot);

    this.scene.add(this.ambientLight);
  }

  private setupPedestal(): void {
    // 1. Soft contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createContactShadowTexture(),
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    this.contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.contactShadow.position.y = -0.75;
    this.scene.add(this.contactShadow);

    // 2. Pedestal ring base
    const pedGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.08, 48);
    const pedMat = new THREE.MeshStandardMaterial({
      color: 0x121418,
      roughness: 0.35,
      metalness: 0.8,
    });
    this.pedestal = new THREE.Mesh(pedGeo, pedMat);
    this.pedestal.position.y = -0.8;
    this.scene.add(this.pedestal);

    // 3. Precision measurement grid
    this.gridHelper = new THREE.GridHelper(8, 24, 0x061dfb, 0x1b2028);
    this.gridHelper.position.y = -0.84;
    this.gridHelper.visible = true;
    this.scene.add(this.gridHelper);
  }

  // --- PRODUCT GENERATORS ---

  private createCorkCoaster(): THREE.Group {
    const group = new THREE.Group();
    group.name = 'OryzoCorkCoaster';

    // 1. Bevelled cylindrical coaster body
    const radius = 1.35;
    const height = 0.18;
    const coasterGeo = new THREE.CylinderGeometry(radius, radius * 0.98, height, 64, 4);

    // Materials: [Side (brass/cork edge), Top (laser cork), Bottom (dark cork)]
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Champagne gold chamfer rim
      roughness: 0.28,
      metalness: 0.9,
    });

    const topMat = new THREE.MeshPhysicalMaterial({
      map: this.corkTexture,
      bumpMap: this.corkBumpTexture,
      bumpScale: 0.035,
      roughness: 0.76,
      metalness: 0.04,
      clearcoat: 0.06,
      sheen: 0.3,
      sheenColor: new THREE.Color(0xd6ad85),
    });

    const bottomMat = new THREE.MeshStandardMaterial({
      color: 0x8a5d35,
      roughness: 0.85,
      metalness: 0.02,
    });

    const coasterMesh = new THREE.Mesh(coasterGeo, [sideMat, topMat, bottomMat]);
    coasterMesh.position.y = -0.65;
    group.add(coasterMesh);

    // 2. Subtle outer brass rim accent ring
    const ringGeo = new THREE.TorusGeometry(radius + 0.015, 0.02, 16, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xefd17b,
      metalness: 0.95,
      roughness: 0.18,
    });
    const rimRing = new THREE.Mesh(ringGeo, ringMat);
    rimRing.position.y = -0.65 + height / 2;
    group.add(rimRing);

    return group;
  }

  private async createDreamMachine(): Promise<THREE.Group> {
    const group = new THREE.Group();
    group.name = 'ObsidianDreamMachine';

    let diamondGeo: THREE.BufferGeometry;
    try {
      diamondGeo = await BufLoader.load('/assets/models/tunnels/diamond.buf');
      ensureUVs(diamondGeo);
    } catch (e) {
      diamondGeo = new THREE.OctahedronGeometry(1.2, 2);
    }
    diamondGeo.center();

    // High refraction smoked obsidian glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x161b22),
      roughness: 0.05,
      metalness: 0.12,
      transmission: 0.93,
      thickness: 2.2,
      ior: 1.88,
      attenuationColor: new THREE.Color(0x061dfb),
      attenuationDistance: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    const diamondMesh = new THREE.Mesh(diamondGeo, glassMat);
    diamondMesh.scale.setScalar(1.25);
    diamondMesh.position.y = 0.05;
    group.add(diamondMesh);

    // Floating orbital gyroscope rings
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.025, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x004488,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.name = 'gyro1';
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.name = 'gyro2';
    group.add(ring2);

    return group;
  }

  private async createCyberCross(): Promise<THREE.Group> {
    const group = new THREE.Group();
    group.name = 'CyberCrossMonolith';

    let crossGeo: THREE.BufferGeometry;
    try {
      crossGeo = await BufLoader.load('/assets/models/home/cross.buf');
      ensureUVs(crossGeo);
    } catch (e) {
      crossGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    }
    crossGeo.center();

    // Mirror liquid chrome with subtle blue iridescent sheen
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf0f3f8),
      roughness: 0.12,
      metalness: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      sheen: 0.4,
      sheenColor: new THREE.Color(0x38bdf8),
    });

    const crossMesh = new THREE.Mesh(crossGeo, chromeMat);
    crossMesh.scale.setScalar(1.35);
    crossMesh.position.y = 0.08;
    group.add(crossMesh);

    return group;
  }

  private async createQuantumSphere(): Promise<THREE.Group> {
    const group = new THREE.Group();
    group.name = 'QuantumOrbitalSphere';

    let sphereGeo: THREE.BufferGeometry;
    try {
      sphereGeo = await BufLoader.load('/assets/models/about/sphere_l.buf');
      ensureUVs(sphereGeo);
    } catch (e) {
      sphereGeo = new THREE.IcosahedronGeometry(1.15, 3);
    }
    sphereGeo.center();

    // Outer frosted quantum aerogel shell
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x38bdf8),
      transmission: 0.88,
      roughness: 0.22,
      metalness: 0.08,
      ior: 1.54,
      thickness: 1.8,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const outerSphere = new THREE.Mesh(sphereGeo, outerMat);
    outerSphere.scale.setScalar(1.2);
    group.add(outerSphere);

    // Inner pulsating quantum core
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x061dfb,
      emissive: 0x061dfb,
      emissiveIntensity: 1.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.name = 'quantumCore';
    group.add(coreMesh);

    return group;
  }

  // --- CONTROLS & STATE SWITCHING ---

  public setProduct(index: number): void {
    if (index === this.currentProductIndex || index < 0 || index >= this.productMeshes.length) {
      return;
    }

    this.targetProductIndex = index;
    this.isSwitching = true;
    this.switchProgress = 0;
  }

  public setPrepassMode(mode: PrepassMode): void {
    this.prepassMode = mode;
    this.applyPrepassMaterials();
  }

  private applyPrepassMaterials(): void {
    this.productMeshes.forEach((group) => {
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Store original material on userData if not already cached
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material;
          }

          if (this.prepassMode === 'pbr') {
            child.material = child.userData.originalMaterial;
          } else if (this.prepassMode === 'normals') {
            child.material = this.normalsMaterial;
          } else if (this.prepassMode === 'depth') {
            child.material = this.depthMaterial;
          } else if (this.prepassMode === 'wireframe') {
            child.material = this.wireframeMaterial;
          }
        }
      });
    });
  }

  public setLightingMood(mood: LightingMood): void {
    this.lightingMood = mood;
    this.applyLightingMood(mood);
  }

  private applyLightingMood(mood: LightingMood): void {
    switch (mood) {
      case 'studio':
        this.keyLight.color.setHex(0xffffff);
        this.keyLight.intensity = 2.4;
        this.fillLight.color.setHex(0xd8e6f5);
        this.fillLight.intensity = 1.3;
        this.rimLight.color.setHex(0xf5eed8);
        this.rimLight.intensity = 1.6;
        this.ambientLight.color.setHex(0x222630);
        this.ambientLight.intensity = 0.9;
        this.topSpot.intensity = 1.5;
        break;

      case 'neon':
        this.keyLight.color.setHex(0x00f0ff);
        this.keyLight.intensity = 2.8;
        this.fillLight.color.setHex(0xff0077);
        this.fillLight.intensity = 2.2;
        this.rimLight.color.setHex(0x061dfb);
        this.rimLight.intensity = 3.0;
        this.ambientLight.color.setHex(0x0c1122);
        this.ambientLight.intensity = 0.5;
        this.topSpot.intensity = 0.8;
        break;

      case 'golden':
        this.keyLight.color.setHex(0xff9944);
        this.keyLight.intensity = 3.0;
        this.fillLight.color.setHex(0x604070);
        this.fillLight.intensity = 1.2;
        this.rimLight.color.setHex(0xffdf99);
        this.rimLight.intensity = 2.4;
        this.ambientLight.color.setHex(0x281912);
        this.ambientLight.intensity = 0.7;
        this.topSpot.intensity = 1.2;
        break;

      case 'dark':
        this.keyLight.color.setHex(0xffffff);
        this.keyLight.intensity = 3.4;
        this.fillLight.color.setHex(0x181e28);
        this.fillLight.intensity = 0.3;
        this.rimLight.color.setHex(0x38bdf8);
        this.rimLight.intensity = 2.0;
        this.ambientLight.color.setHex(0x08090d);
        this.ambientLight.intensity = 0.2;
        this.topSpot.intensity = 2.2;
        break;
    }
  }

  public toggleGrid(): boolean {
    if (this.gridHelper) {
      this.gridHelper.visible = !this.gridHelper.visible;
      return this.gridHelper.visible;
    }
    return false;
  }

  public getProductMetadata(): ProductMetadata[] {
    return [
      {
        id: 'oryzo-coaster',
        name: 'Oryzo-1 Neural Coaster',
        slug: 'oryzo_ai',
        caseStudy: 'Oryzo AI Satirical Campaign',
        tagline: 'Agglomerate Cork with Laser-Etched Neural Circuitry & Gold Inlay',
        material: 'PBR Multi-Layer Cork • Brass Edge Chamfer • Pore Roughness Map',
        polyCount: 12544,
        vertexCount: 6400,
        dimensions: '94mm × 94mm × 6.8mm',
      },
      {
        id: 'dream-machine',
        name: 'Obsidian Dream Machine',
        slug: 'porsche',
        caseStudy: 'Porsche Dream Machine',
        tagline: 'Polyhedral Faceted Smoked Obsidian with Gyroscope Orbital Cage',
        material: 'PBR Transmission Glass • IOR 1.88 • Titanium Gyro Rings',
        polyCount: 8432,
        vertexCount: 4620,
        dimensions: '110mm × 110mm × 110mm',
      },
      {
        id: 'cyber-cross',
        name: 'Cyber Cross Monolith',
        slug: 'kyndev-brand',
        caseStudy: 'Kyndev Brand Monolith',
        tagline: 'Precision 3D Jack Artifact with Anisotropic Liquid Chrome Finish',
        material: 'Specular Liquid Chrome • Clearcoat 1.0 • Specular Sheen',
        polyCount: 16896,
        vertexCount: 9216,
        dimensions: '88mm × 88mm × 88mm',
      },
      {
        id: 'quantum-sphere',
        name: 'Quantum Orbital Sphere',
        slug: 'lunar-mission',
        caseStudy: 'Lunar Exploration Case Study',
        tagline: 'Dual-Layer Geodesic Frosted Aerogel with Pulsating Blue Core',
        material: 'Frosted Aerogel Transmission • Emissive Pulse Core',
        polyCount: 9600,
        vertexCount: 5120,
        dimensions: '96mm × 96mm × 96mm',
      },
    ];
  }

  private notifyProductMeta(): void {
    const list = this.getProductMetadata();
    const meta = list[this.currentProductIndex];
    if (meta && this.onProductChanged) {
      this.onProductChanged(meta);
    }
  }

  // --- LIFECYCLE ---

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  public update(delta: number, time: number): void {
    // 1. Update orbit controls
    if (this.controls) {
      this.controls.update(delta);
    }

    // 2. Smooth product switching transition
    if (this.isSwitching) {
      this.switchProgress += delta * 4.0;
      if (this.switchProgress < 0.5) {
        // Scale down current
        const currentGroup = this.productMeshes[this.currentProductIndex];
        const s = Math.max(0, 1 - this.switchProgress * 2);
        currentGroup.scale.setScalar(s);
      } else {
        // Swap visibility
        this.productMeshes[this.currentProductIndex].visible = false;
        this.currentProductIndex = this.targetProductIndex;
        const newGroup = this.productMeshes[this.currentProductIndex];
        newGroup.visible = true;
        const s = Math.min(1, (this.switchProgress - 0.5) * 2);
        newGroup.scale.setScalar(s);
        this.applyPrepassMaterials();
      }

      if (this.switchProgress >= 1.0) {
        this.isSwitching = false;
        this.productMeshes[this.currentProductIndex].scale.setScalar(1);
        this.notifyProductMeta();
      }
    }

    // 3. Subtle idle motions for mechanical / optical elements
    const active = this.productMeshes[this.currentProductIndex];
    if (active) {
      // Gyro rings in Dream Machine
      const g1 = active.getObjectByName('gyro1');
      const g2 = active.getObjectByName('gyro2');
      if (g1) g1.rotation.z += delta * 0.8;
      if (g2) g2.rotation.x += delta * 0.6;

      // Pulsating quantum core in Sphere
      const qCore = active.getObjectByName('quantumCore');
      if (qCore && qCore instanceof THREE.Mesh) {
        const mat = qCore.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 1.4 + Math.sin(time * 3.0) * 0.6;
        qCore.rotation.y += delta * 0.4;
      }
    }
  }

  public destroy(): void {
    if (this.controls) {
      this.controls.destroy();
      this.controls = null;
    }

    this.productMeshes.forEach((g) => {
      g.traverse((c) => {
        if (c instanceof THREE.Mesh) {
          c.geometry.dispose();
          if (Array.isArray(c.material)) c.material.forEach((m) => m.dispose());
          else c.material.dispose();
        }
      });
    });
    this.productMeshes = [];

    if (this.normalsMaterial) this.normalsMaterial.dispose();
    if (this.depthMaterial) this.depthMaterial.dispose();
    if (this.wireframeMaterial) this.wireframeMaterial.dispose();

    if (this.corkTexture) this.corkTexture.dispose();
    if (this.corkBumpTexture) this.corkBumpTexture.dispose();
    if (this.shadowTexture) this.shadowTexture.dispose();
  }
}
