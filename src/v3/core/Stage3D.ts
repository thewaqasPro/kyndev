import * as THREE from 'three';

/**
 * Stage3D
 *
 * Abstract contract for full 3D interactive stages in V3.
 */
export abstract class Stage3D {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  }

  public abstract init(): Promise<void> | void;
  public abstract resize(width: number, height: number, dpr: number): void;
  public abstract update(delta: number, time: number): void;
  public onPointerMove?(_pointer: THREE.Vector2): void;
  public onPointerDown?(_pointer: THREE.Vector2): void;
  public onPointerUp?(_pointer: THREE.Vector2): void;
  public onScroll?(_progress: number): void;
  public abstract destroy(): void;
}
