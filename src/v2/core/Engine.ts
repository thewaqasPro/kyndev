import * as THREE from 'three';
import type { Stage3D } from './Stage3D';

export class Engine {
  public canvas: HTMLCanvasElement | null = null;
  public container: HTMLElement | null = null;
  public renderer: THREE.WebGLRenderer | null = null;
  public currentStage: Stage3D | null = null;
  public isRunning: boolean = false;
  private animFrameId: number | null = null;
  private lastTime: number = 0;
  private resizeObserver: ResizeObserver | null = null;

  // Pointer tracking
  public mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  public prevMouse: THREE.Vector2 = new THREE.Vector2(0, 0);

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.container = canvas.parentElement || canvas;

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(dpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    window.addEventListener('resize', this.onResize);
    if (typeof ResizeObserver !== 'undefined' && this.container) {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.container);
    }
    window.addEventListener('pointermove', this.onPointerMove);
  }

  public setStage(stage: Stage3D): void {
    if (this.currentStage) {
      this.currentStage.destroy();
    }
    this.currentStage = stage;
    const width = this.container?.clientWidth || window.innerWidth;
    const height = this.container?.clientHeight || window.innerHeight;
    const aspect = width / Math.max(1, height);
    stage.camera.aspect = aspect;
    stage.camera.updateProjectionMatrix();
    stage.resize(width, height);
    stage.onPointerMove?.(this.mouse);
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private loop = (now: number): void => {
    if (!this.isRunning) return;

    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    if (this.currentStage && this.renderer && this.currentStage.isActive) {
      this.currentStage.time += delta;
      this.currentStage.onPointerMove?.(this.mouse);
      this.currentStage.update(delta, this.currentStage.time);
      this.renderer.render(this.currentStage.scene, this.currentStage.camera);
    }

    this.prevMouse.copy(this.mouse);
    this.animFrameId = requestAnimationFrame(this.loop);
  };

  public onResize = (): void => {
    if (!this.canvas) return;
    const width = this.container?.clientWidth || window.innerWidth;
    const height = this.container?.clientHeight || window.innerHeight;
    const aspect = width / Math.max(1, height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (this.renderer) {
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(dpr);
    }
    if (this.currentStage) {
      this.currentStage.camera.aspect = aspect;
      this.currentStage.camera.updateProjectionMatrix();
      this.currentStage.resize(width, height);
    }
  };

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.mouse.set(x, y);
    if (this.currentStage) {
      this.currentStage.onPointerMove?.(this.mouse);
    }
  };

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.container) {
      this.container = null;
    }
    if (this.currentStage) {
      this.currentStage.destroy();
      this.currentStage = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}
