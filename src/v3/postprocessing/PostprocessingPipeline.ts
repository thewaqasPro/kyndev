import * as THREE from 'three';
import { FboHelper } from '../shared/fbo';
import { BloomPass } from './BloomPass';
import { SmaaPass } from './SmaaPass';
import { FsrPass } from './FsrPass';
import { ScreenDistortionPass } from '../effects/ScreenPaint/ScreenDistortionPass';

/**
 * PostprocessingPipeline
 *
 * Exact 1-to-1 reverse-engineered production post-processing stack from deobfuscated.js (lines 23464–24464).
 */
export class PostprocessingPipeline {
  private _renderer: THREE.WebGLRenderer;
  private _sceneRenderTarget: THREE.WebGLRenderTarget;
  private _pingPongRT: THREE.WebGLRenderTarget;

  public bloom: BloomPass;
  public smaa: SmaaPass;
  public fsr: FsrPass;
  public screenDistortion: ScreenDistortionPass;

  public enabled: boolean = true;
  public enableBloom: boolean = true;
  public enableSmaa: boolean = true;
  public enableFsr: boolean = true;
  public enableDistortion: boolean = true;

  constructor(renderer: THREE.WebGLRenderer, width: number, height: number) {
    this._renderer = renderer;

    this._sceneRenderTarget = FboHelper.createRenderTarget(width, height);
    this._pingPongRT = FboHelper.createRenderTarget(width, height);

    this.bloom = new BloomPass(width, height);
    this.smaa = new SmaaPass(width, height);
    this.fsr = new FsrPass(width, height);
    this.screenDistortion = new ScreenDistortionPass();
  }

  public resize(width: number, height: number): void {
    this._sceneRenderTarget.setSize(width, height);
    this._pingPongRT.setSize(width, height);
    this.bloom.resize(width, height);
    this.smaa.resize(width, height);
    this.fsr.resize(width, height);
    this.screenDistortion.resize(width, height);
  }

  public render(
    scene: THREE.Scene,
    camera: THREE.Camera,
    screenPaintTexture: THREE.Texture | null = null
  ): void {
    if (!this.enabled) {
      this._renderer.setRenderTarget(null);
      this._renderer.render(scene, camera);
      return;
    }

    // 1. Render Base 3D Scene to offscreen RT
    this._renderer.setRenderTarget(this._sceneRenderTarget);
    this._renderer.render(scene, camera);

    let currentTexture: THREE.Texture = this._sceneRenderTarget.texture;

    // 2. Screen Paint Refractive Distortion Pass
    if (this.enableDistortion && screenPaintTexture) {
      this.screenDistortion.render(
        this._renderer,
        currentTexture,
        screenPaintTexture,
        this._pingPongRT
      );
      currentTexture = this._pingPongRT.texture;
    }

    // 3. Bloom Pass
    if (this.enableBloom) {
      this.bloom.render(this._renderer, currentTexture);
    }

    // 4. SMAA Anti-Aliasing Pass
    if (this.enableSmaa) {
      this.smaa.render(this._renderer, currentTexture, this._pingPongRT);
      currentTexture = this._pingPongRT.texture;
    }

    // 5. AMD FSR Sharpening Pass to Screen
    if (this.enableFsr) {
      this.fsr.render(this._renderer, currentTexture, null);
    } else {
      // Direct Blit
      this._renderer.setRenderTarget(null);
      this.screenDistortion.render(this._renderer, currentTexture, screenPaintTexture || currentTexture, null);
    }
  }

  public destroy(): void {
    this._sceneRenderTarget.dispose();
    this._pingPongRT.dispose();
    this.bloom.destroy();
    this.smaa.destroy();
    this.fsr.destroy();
    this.screenDistortion.destroy();
  }
}
