import * as THREE from 'three';

export interface Stage3DOptions {
  cameraFov?: number;
  cameraNear?: number;
  cameraFar?: number;
}

/**
 * Base abstract class for modular 3D scenes.
 * Every v2 component implements this clean lifecycle.
 */
export abstract class Stage3D {
  public scene: THREE.Scene = new THREE.Scene();
  public camera: THREE.PerspectiveCamera;
  public isActive: boolean = true;
  public time: number = 0;

  constructor(options: Stage3DOptions = {}) {
    this.camera = new THREE.PerspectiveCamera(
      options.cameraFov ?? 25,
      1,
      options.cameraNear ?? 0.1,
      options.cameraFar ?? 100
    );
  }

  public abstract init(): Promise<void> | void;
  public abstract resize(width: number, height: number): void;
  public abstract update(delta: number, time: number): void;
  public onPointerMove?(_mouse: THREE.Vector2): void;
  public abstract destroy(): void;
}
