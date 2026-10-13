import * as THREE from 'three';
import { Stage3D } from './Stage3D';

/**
 * Engine
 *
 * Master WebGL engine ticker loop, DPR manager, and stage host for V3.
 */
export class Engine {
  public renderer!: THREE.WebGLRenderer;
  public canvas!: HTMLCanvasElement;
  public currentStage: Stage3D | null = null;

  private _animationFrameId: number | null = null;
  private _lastTime: number = 0;
  private _isRunning: boolean = false;
  private _resizeObserver: ResizeObserver | null = null;

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);

    this._setupResizeObserver();
    this._setupPointerListeners();
  }

  public setStage(stage: Stage3D): void {
    if (this.currentStage) {
      this.currentStage.destroy();
    }
    this.currentStage = stage;
    this.resize();
  }

  public start(): void {
    if (this._isRunning) return;
    this._isRunning = true;
    this._lastTime = performance.now();
    this._tick(this._lastTime);
  }

  public stop(): void {
    this._isRunning = false;
    if (this._animationFrameId !== null) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = null;
    }
  }

  private _tick = (currentTime: number): void => {
    if (!this._isRunning) return;

    const deltaMs = currentTime - this._lastTime;
    const delta = Math.min(deltaMs / 1000, 0.1);
    this._lastTime = currentTime;

    if (this.currentStage) {
      this.currentStage.update(delta, currentTime * 0.001);
      this.renderer.render(this.currentStage.scene, this.currentStage.camera);
    }

    this._animationFrameId = requestAnimationFrame(this._tick);
  };

  public resize(): void {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement
      ? this.canvas.parentElement.getBoundingClientRect()
      : this.canvas.getBoundingClientRect();

    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);

    if (this.currentStage) {
      this.currentStage.resize(width, height, dpr);
    }
  }

  private _setupResizeObserver(): void {
    const target = this.canvas.parentElement || this.canvas;
    this._resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this._resizeObserver.observe(target);
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  private _setupPointerListeners(): void {
    const pointer = new THREE.Vector2();

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!this.currentStage || !this.currentStage.onPointerMove) return;
      const rect = this.canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      this.currentStage.onPointerMove(pointer);
    };

    this.canvas.addEventListener('mousemove', onMove, { passive: true });
    this.canvas.addEventListener('touchmove', onMove, { passive: true });
  }

  public destroy(): void {
    this.stop();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    if (this.currentStage) {
      this.currentStage.destroy();
      this.currentStage = null;
    }
    this.renderer.dispose();
  }
}
