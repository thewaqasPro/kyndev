import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface ProductViewerControlsOptions {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  dampingFactor?: number;
}

/**
 * Enhanced OrbitControls controller with smooth damping, polar boundaries,
 * animated camera reset, and zoom controls.
 */
export class ProductViewerControls {
  public controls: OrbitControls;
  public camera: THREE.PerspectiveCamera;
  public domElement: HTMLElement;

  public defaultPosition: THREE.Vector3 = new THREE.Vector3(0, 1.6, 3.6);
  public defaultTarget: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  private isResetting: boolean = false;
  private resetProgress: number = 0;
  private startPosition: THREE.Vector3 = new THREE.Vector3();
  private startTarget: THREE.Vector3 = new THREE.Vector3();

  constructor(
    camera: THREE.PerspectiveCamera,
    domElement: HTMLElement,
    options: ProductViewerControlsOptions = {}
  ) {
    this.camera = camera;
    this.domElement = domElement;

    this.controls = new OrbitControls(camera, domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = options.dampingFactor ?? 0.06;
    this.controls.enablePan = false; // Keep product centered
    this.controls.enableZoom = true;
    this.controls.minDistance = options.minDistance ?? 1.8;
    this.controls.maxDistance = options.maxDistance ?? 8.5;
    this.controls.minPolarAngle = options.minPolarAngle ?? 0.15;
    this.controls.maxPolarAngle = options.maxPolarAngle ?? Math.PI * 0.52; // Keep above floor
    this.controls.autoRotate = options.autoRotate ?? true;
    this.controls.autoRotateSpeed = options.autoRotateSpeed ?? 1.2;

    this.controls.target.copy(this.defaultTarget);
    this.camera.position.copy(this.defaultPosition);

    this.bindEvents();
  }

  private bindEvents(): void {
    this.domElement.addEventListener('dblclick', this.onDoubleClick);
  }

  private onDoubleClick = (): void => {
    this.resetView(true);
  };

  public setAutoRotate(enabled: boolean): void {
    this.controls.autoRotate = enabled;
  }

  public toggleAutoRotate(): boolean {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  public zoomIn(delta: number = 0.5): void {
    const dir = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
    const newPos = this.camera.position.clone().sub(dir.multiplyScalar(delta));
    if (newPos.distanceTo(this.controls.target) >= this.controls.minDistance) {
      this.camera.position.copy(newPos);
    }
  }

  public zoomOut(delta: number = 0.5): void {
    const dir = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
    const newPos = this.camera.position.clone().add(dir.multiplyScalar(delta));
    if (newPos.distanceTo(this.controls.target) <= this.controls.maxDistance) {
      this.camera.position.copy(newPos);
    }
  }

  public resetView(animated: boolean = true): void {
    if (!animated) {
      this.camera.position.copy(this.defaultPosition);
      this.controls.target.copy(this.defaultTarget);
      this.controls.update();
      return;
    }

    this.isResetting = true;
    this.resetProgress = 0;
    this.startPosition.copy(this.camera.position);
    this.startTarget.copy(this.controls.target);
  }

  public update(_delta: number): void {
    if (this.isResetting) {
      this.resetProgress += 0.05;
      const t = Math.min(this.resetProgress, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      this.camera.position.lerpVectors(this.startPosition, this.defaultPosition, eased);
      this.controls.target.lerpVectors(this.startTarget, this.defaultTarget, eased);

      if (t >= 1) {
        this.isResetting = false;
      }
    }

    this.controls.update();
  }

  public destroy(): void {
    this.domElement.removeEventListener('dblclick', this.onDoubleClick);
    this.controls.dispose();
  }
}
