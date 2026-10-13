import * as THREE from 'three';

/**
 * FboHelper
 *
 * Exact 1-to-1 reverse-engineered FboHelper utility for managing offscreen ping-pong render targets and fullscreen quad passes.
 */
export class FboHelper {
  private static _camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private static _scene: THREE.Scene = new THREE.Scene();
  private static _quad: THREE.Mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));

  static {
    this._scene.add(this._quad);
  }

  public static createRenderTarget(
    width: number,
    height: number,
    options: THREE.RenderTargetOptions = {}
  ): THREE.WebGLRenderTarget {
    return new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      stencilBuffer: false,
      depthBuffer: false,
      ...options
    });
  }

  public static render(
    renderer: THREE.WebGLRenderer,
    material: THREE.Material,
    target: THREE.WebGLRenderTarget | null = null
  ): void {
    this._quad.material = material;
    const prevTarget = renderer.getRenderTarget();
    renderer.setRenderTarget(target);
    renderer.render(this._scene, this._camera);
    renderer.setRenderTarget(prevTarget);
  }

  public static clearColor(
    renderer: THREE.WebGLRenderer,
    r: number,
    g: number,
    b: number,
    a: number,
    target: THREE.WebGLRenderTarget
  ): void {
    const prevTarget = renderer.getRenderTarget();
    renderer.setRenderTarget(target);
    renderer.setClearColor(new THREE.Color(r, g, b), a);
    renderer.clear(true, true, true);
    renderer.setRenderTarget(prevTarget);
  }
}
