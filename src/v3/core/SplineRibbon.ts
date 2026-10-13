import * as THREE from 'three';
import { BufLoader } from './BufLoader';
import { ribbonVert, ribbonFrag } from './SplineRibbonShader';

export interface SplineLineConfig {
  fileName: string;
  aoThreshold: number;
  margin: { x: number; y: number };
  scrollToRatioFactors: [number, number];
  boxMin: THREE.Vector3;
  boxMax: THREE.Vector3;
  color0: string;
  color1: string;
}

export const SPLINE_LINES_DATA: SplineLineConfig[] = [
  {
    fileName: 'line_reel',
    aoThreshold: 0.555,
    margin: { x: -0.05, y: -0.8 },
    scrollToRatioFactors: [0.4, 1.3],
    boxMin: new THREE.Vector3(-0.0112049, -0.0141946, 0),
    boxMax: new THREE.Vector3(1.01357, 0.718671, 0),
    color0: '#5a90ff',
    color1: '#2a38ee'
  },
  {
    fileName: 'line_goal',
    aoThreshold: 0.0001,
    margin: { x: 0.2, y: -0.6 },
    scrollToRatioFactors: [1.2, 2],
    boxMin: new THREE.Vector3(-0.0180006, -0.00963629, 0),
    boxMax: new THREE.Vector3(1.01777, 0.850395, 0),
    color0: '#94fffb',
    color1: '#1285dc'
  },
  {
    fileName: 'line_capability',
    aoThreshold: 0.0001,
    margin: { x: 0, y: -1.15 },
    scrollToRatioFactors: [0, 2],
    boxMin: new THREE.Vector3(-0.0165916, -0.0152524, 0),
    boxMax: new THREE.Vector3(1.018, 1.08872, 0),
    color0: '#ffffff',
    color1: '#bbbbbb'
  },
  {
    fileName: 'line_office',
    aoThreshold: 0.0001,
    margin: { x: 0, y: -2.2 },
    scrollToRatioFactors: [-2, 1.85],
    boxMin: new THREE.Vector3(-0.0131718, -0.0141192, 0),
    boxMax: new THREE.Vector3(1.01767, 1.2037, 0),
    color0: '#ffffff',
    color1: '#bbbbbb'
  }
];

/**
 * SplineRibbon
 *
 * Universal 3D camera-oriented spline ribbon mesh from deobfuscated.js (Line & UfxMesh, lines 6616–7640).
 */
export class SplineRibbon {
  public mesh: THREE.Mesh | null = null;
  public material: THREE.ShaderMaterial;
  public config: SplineLineConfig;

  public uniforms: {
    u_scrollY: { value: number };
    u_viewportResolution: { value: THREE.Vector2 };
    u_aspect: { value: THREE.Vector2 };
    u_margin: { value: THREE.Vector2 };
    u_radius: { value: number };
    u_showRatio: { value: number };
    u_hideRatio: { value: number };
    u_colorBg: { value: THREE.Color };
    u_color0: { value: THREE.Color };
    u_color1: { value: THREE.Color };
    u_aoThreshold: { value: number };
  };

  constructor(config: SplineLineConfig) {
    this.config = config;

    this.uniforms = {
      u_scrollY: { value: 0 },
      u_viewportResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_aspect: { value: new THREE.Vector2(1, 1) },
      u_margin: { value: new THREE.Vector2(config.margin.x, config.margin.y) },
      u_radius: { value: 1.8 },
      u_showRatio: { value: 1.0 },
      u_hideRatio: { value: 0.0 },
      u_colorBg: { value: new THREE.Color('#000000') },
      u_color0: { value: new THREE.Color(config.color0) },
      u_color1: { value: new THREE.Color(config.color1) },
      u_aoThreshold: { value: config.aoThreshold }
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader: ribbonVert,
      fragmentShader: ribbonFrag,
      uniforms: this.uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }

  public async init(basePath: string = '/assets/models/lines/'): Promise<THREE.Mesh> {
    const url = `${basePath}${this.config.fileName}.buf`;
    const geometry = await BufLoader.load(url);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.frustumCulled = false;
    return this.mesh;
  }

  public update(showRatio: number, scrollY: number = 0): void {
    this.uniforms.u_showRatio.value = showRatio;
    this.uniforms.u_scrollY.value = scrollY;
  }

  public resize(width: number, height: number): void {
    this.uniforms.u_viewportResolution.value.set(width, height);
    this.uniforms.u_aspect.value.set(width / height, 1);
  }

  public destroy(): void {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.material.dispose();
      this.mesh = null;
    }
  }
}
