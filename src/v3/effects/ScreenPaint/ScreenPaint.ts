import * as THREE from 'three';
import { FboHelper } from '../../shared/fbo';
import { math } from '../../shared/math';
import { screenPaintVert, screenPaintSimFrag } from './ScreenPaintShaders';

/**
 * ScreenPaint
 *
 * Exact 1-to-1 reverse-engineered ScreenPaint fluid buffer from deobfuscated.js (lines 4103–4253).
 */
export class ScreenPaint {
  private _renderer: THREE.WebGLRenderer;
  private _lowRenderTarget!: THREE.WebGLRenderTarget;
  private _prevPaintRenderTarget!: THREE.WebGLRenderTarget;
  private _currPaintRenderTarget!: THREE.WebGLRenderTarget;
  private _material!: THREE.ShaderMaterial;

  private _fromDrawData = new THREE.Vector4(0, 0, 0, 0);
  private _toDrawData = new THREE.Vector4(0, 0, 0, 0);

  public drawEnabled = true;
  public needsMouseDown = false;
  public enabled = true;

  public minRadius = 0;
  public maxRadius = 100;
  public radiusDistanceRange = 100;
  public pushStrength = 25;
  public accelerationDissipation = 0.8;
  public velocityDissipation = 0.985;
  public weight1Dissipation = 0.985;
  public weight2Dissipation = 0.5;

  private _mousePixelXY = new THREE.Vector2();
  private _prevMousePixelXY = new THREE.Vector2();
  private _mouseNormXY = new THREE.Vector2();
  private _isDown = false;
  private _hadMoved = false;

  public sharedUniforms: {
    u_paintTexelSize: { value: THREE.Vector2 };
    u_paintTextureSize: { value: THREE.Vector2 };
    u_prevPaintTexture: { value: THREE.Texture | null };
    u_currPaintTexture: { value: THREE.Texture | null };
    u_lowPaintTexture: { value: THREE.Texture | null };
  };

  constructor(renderer: THREE.WebGLRenderer) {
    this._renderer = renderer;

    this.sharedUniforms = {
      u_paintTexelSize: { value: new THREE.Vector2(1 / 256, 1 / 256) },
      u_paintTextureSize: { value: new THREE.Vector2(256, 256) },
      u_prevPaintTexture: { value: null },
      u_currPaintTexture: { value: null },
      u_lowPaintTexture: { value: null }
    };

    this.init();
  }

  public init(): void {
    this._lowRenderTarget = FboHelper.createRenderTarget(128, 128);
    this._prevPaintRenderTarget = FboHelper.createRenderTarget(256, 256);
    this._currPaintRenderTarget = FboHelper.createRenderTarget(256, 256);

    this.sharedUniforms.u_lowPaintTexture.value = this._lowRenderTarget.texture;
    this.sharedUniforms.u_prevPaintTexture.value = this._prevPaintRenderTarget.texture;
    this.sharedUniforms.u_currPaintTexture.value = this._currPaintRenderTarget.texture;

    this._material = new THREE.ShaderMaterial({
      vertexShader: screenPaintVert,
      fragmentShader: screenPaintSimFrag,
      uniforms: {
        u_lowPaintTexture: { value: this._lowRenderTarget.texture },
        u_prevPaintTexture: this.sharedUniforms.u_prevPaintTexture,
        u_paintTexelSize: this.sharedUniforms.u_paintTexelSize,
        u_drawFrom: { value: this._fromDrawData },
        u_drawTo: { value: this._toDrawData },
        u_pushStrength: { value: this.pushStrength },
        u_vel: { value: new THREE.Vector2(0, 0) },
        u_dissipations: { value: new THREE.Vector3(this.velocityDissipation, this.weight1Dissipation, this.weight2Dissipation) },
        u_scrollOffset: { value: new THREE.Vector2(0, 0) },
        u_clipScale: { value: new THREE.Vector2(1, 1) },
        u_clipOffset: { value: new THREE.Vector2(0, 0) }
      },
      depthTest: false,
      depthWrite: false
    });

    this.clear();
  }

  public resize(width: number, height: number): void {
    const w = Math.max(width >> 2, 64);
    const h = Math.max(height >> 2, 64);
    const lowW = Math.max(width >> 3, 32);
    const lowH = Math.max(height >> 3, 32);

    if (w !== this._currPaintRenderTarget.width || h !== this._currPaintRenderTarget.height) {
      this._currPaintRenderTarget.setSize(w, h);
      this._prevPaintRenderTarget.setSize(w, h);
      this._lowRenderTarget.setSize(lowW, lowH);

      this.sharedUniforms.u_paintTexelSize.value.set(1 / w, 1 / h);
      this.sharedUniforms.u_paintTextureSize.value.set(w, h);
      this.clear();
    }
  }

  public clear(): void {
    FboHelper.clearColor(this._renderer, 0.5, 0.5, 0, 0, this._lowRenderTarget);
    FboHelper.clearColor(this._renderer, 0.5, 0.5, 0, 0, this._prevPaintRenderTarget);
    FboHelper.clearColor(this._renderer, 0.5, 0.5, 0, 0, this._currPaintRenderTarget);
    this._material.uniforms.u_vel.value.set(0, 0);
  }

  public onPointerMove(clientX: number, clientY: number, width: number, height: number): void {
    this._prevMousePixelXY.copy(this._mousePixelXY);
    this._mousePixelXY.set(clientX, clientY);
    this._mouseNormXY.set((clientX / width) * 2 - 1, -(clientY / height) * 2 + 1);
    this._hadMoved = true;
  }

  public onPointerDown(): void {
    this._isDown = true;
  }

  public onPointerUp(): void {
    this._isDown = false;
  }

  public update(delta: number): void {
    if (!this.enabled) return;

    // Ping-pong swap
    const temp = this._prevPaintRenderTarget;
    this._prevPaintRenderTarget = this._currPaintRenderTarget;
    this._currPaintRenderTarget = temp;

    this.sharedUniforms.u_prevPaintTexture.value = this._prevPaintRenderTarget.texture;
    this.sharedUniforms.u_currPaintTexture.value = this._currPaintRenderTarget.texture;

    const w = this._currPaintRenderTarget.width;
    const h = this._currPaintRenderTarget.height;

    const dist = this._mousePixelXY.distanceTo(this._prevMousePixelXY);
    let radius = math.fit(dist, 0, this.radiusDistanceRange, this.minRadius, this.maxRadius);

    if (!this._hadMoved || !this.drawEnabled || (this.needsMouseDown && !this._isDown)) {
      radius = 0;
    }

    this._material.uniforms.u_pushStrength.value = this.pushStrength;
    this._material.uniforms.u_dissipations.value.set(
      this.velocityDissipation,
      this.weight1Dissipation,
      this.weight2Dissipation
    );

    this._fromDrawData.copy(this._toDrawData);
    this._toDrawData.set(
      ((this._mouseNormXY.x + 1) * w) / 2,
      ((this._mouseNormXY.y + 1) * h) / 2,
      radius,
      1
    );

    const deltaVel = new THREE.Vector2(
      this._toDrawData.x - this._fromDrawData.x,
      this._toDrawData.y - this._fromDrawData.y
    ).multiplyScalar(delta * 0.8);

    this._material.uniforms.u_vel.value
      .multiplyScalar(this.accelerationDissipation)
      .add(deltaVel);

    FboHelper.render(this._renderer, this._material, this._currPaintRenderTarget);
    this._hadMoved = false;
  }

  public get texture(): THREE.Texture {
    return this._currPaintRenderTarget.texture;
  }

  public destroy(): void {
    this._lowRenderTarget.dispose();
    this._prevPaintRenderTarget.dispose();
    this._currPaintRenderTarget.dispose();
    this._material.dispose();
  }
}
