import { CardDisplacementRendererV2 } from './ProjectsShaderV2';
import { ProjectsTextAnimator, TagScrambleAnimator } from '../Projects/ProjectsTextAnim';

export class ProjectCardControllerV2 {
  public element: HTMLElement;
  public imageCard: HTMLElement | null = null;
  public innerLayer: HTMLElement | null = null;
  public canvas: HTMLCanvasElement | null = null;
  public renderer: CardDisplacementRendererV2 | null = null;
  public textAnimator: ProjectsTextAnimator | null = null;
  public tagAnimator: TagScrambleAnimator | null = null;

  public isHovered: boolean = false;
  public index: number = 0;
  public isLeftColumn: boolean = true;
  public isIntersecting: boolean = false;

  // Viewport-triggered entrance state
  private hasTriggered: boolean = false;
  private isAnimating: boolean = false;
  private startTime: number = 0;
  private duration: number = 1.35; // 1.35 seconds for smooth cinematic expoOut entrance

  private observer: IntersectionObserver | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private rafId: number | null = null;

  // Mouse lens shift targets & currents for inner layer
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;

  constructor(cardEl: HTMLElement, index: number = 0) {
    this.element = cardEl;
    this.index = index;
    this.isLeftColumn = index % 2 === 0;
  }

  public async init(): Promise<void> {
    const slug = this.element.getAttribute('data-slug');
    if (!slug) return;

    // The image card container (.v2-card-viewport) is what scales up & enters
    this.imageCard = this.element.querySelector('.v2-card-viewport') as HTMLElement;
    this.innerLayer = this.element.querySelector('.v2-card-inner-layer') as HTMLElement;
    this.canvas = this.element.querySelector('.v2-card-canvas') as HTMLCanvasElement;
    const titleEl = this.element.querySelector('.v2-card-title') as HTMLElement;
    const tagsEl = this.element.querySelector('.v2-card-tags') as HTMLElement;

    if (titleEl) {
      this.textAnimator = new ProjectsTextAnimator(titleEl);
    }
    if (tagsEl) {
      this.tagAnimator = new TagScrambleAnimator(tagsEl);
    }

    if (this.canvas) {
      const textureUrl = `/assets/projects/${slug}/home.webp`;
      const depthUrl = `/assets/projects/${slug}/home_depth.webp`;
      this.renderer = new CardDisplacementRendererV2(this.canvas, textureUrl, depthUrl);
    }

    this.bindEvents();
    this.setInitialState();
    this.initObserver();
  }

  private setInitialState(): void {
    if (!this.imageCard) return;
    const dir = this.isLeftColumn ? 1 : -1;

    this.imageCard.style.transformOrigin = `${(50 + 22 * dir).toFixed(1)}% 70%`;
    this.imageCard.style.transform = `translate3d(${(44 * dir).toFixed(2)}px, 58px, 0) scale3d(0.760, 0.720, 1) rotateX(-4.80deg) rotateY(${(5.4 * dir).toFixed(2)}deg) rotateZ(${(1.8 * dir).toFixed(2)}deg) skew(${(2.2 * dir).toFixed(2)}deg, 1.50deg)`;
    this.imageCard.style.opacity = '0.15';

    if (this.renderer) {
      this.renderer.setShowRatio(0.0);
    }
  }

  private bindEvents(): void {
    this.element.addEventListener('pointerenter', this.onPointerEnter);
    this.element.addEventListener('pointermove', this.onPointerMove);
    this.element.addEventListener('pointerleave', this.onPointerLeave);
    window.addEventListener('resize', this.onResize);
  }

  /**
   * Viewport Entrance Trigger: Once the card comes into view, it plays its
   * full entrance animation to completion independent of scrolling.
   */
  private triggerEntrance(): void {
    if (this.hasTriggered) return;
    this.hasTriggered = true;
    this.isAnimating = true;
    this.startTime = performance.now();
    this.startLoop();
  }

  private startLoop(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.updateFrame);
  }

  private stopLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Animation Frame Loop:
   * Drives the time-based expoOut entrance for the entire image card (.v2-card-viewport),
   * with asymmetric 4-side / 4-corner dynamic scaling and smooth mouse lens shift.
   */
  private updateFrame = (now: number): void => {
    if (!this.imageCard) return;

    let progress = 1.0;
    if (this.isAnimating) {
      const elapsed = (now - this.startTime) / 1000;
      progress = Math.min(1.0, elapsed / this.duration);
      if (progress >= 1.0) {
        this.isAnimating = false;
      }
    }

    // High-precision expoOut easing: 1 - 2^(-10 * t)
    const eased = progress >= 1.0 ? 1.0 : 1 - Math.pow(2, -10 * progress);
    const dir = this.isLeftColumn ? 1 : -1;
    const hoverScale = this.isHovered ? 1.025 : 1.0;

    // Asymmetric 4-Side Dynamic Scaling:
    // scaleX expands with sublinear power (0.76 to 1.04)
    // scaleY expands with superlinear power (0.72 to 1.04)
    const scaleX = (0.76 + 0.28 * Math.pow(eased, 0.75)) * hoverScale;
    const scaleY = (0.72 + 0.32 * Math.pow(eased, 1.4)) * hoverScale;

    // 3D Perspective Foreshortening (different corners scale at different ratios):
    const rotX = (1 - eased) * -4.8;
    const rotY = (1 - eased) * 5.4 * dir;
    const rotZ = (1 - eased) * 1.8 * dir;
    const skewX = (1 - eased) * 2.2 * dir;
    const skewY = (1 - eased) * 1.5;

    // Asymmetric dynamic transform-origin
    const originX = 50 + (1 - eased) * 22 * dir;
    const originY = 50 + (1 - eased) * 20;

    // Directional Slide & Lift
    const offsetX = (1 - eased) * 44 * dir;
    const offsetY = (1 - eased) * 58;
    const opacity = 0.15 + 0.85 * eased;

    // Apply transformation directly to the image card container (.v2-card-viewport)
    this.imageCard.style.transformOrigin = `${originX.toFixed(1)}% ${originY.toFixed(1)}%`;
    this.imageCard.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale3d(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}, 1) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) skew(${skewX.toFixed(2)}deg, ${skewY.toFixed(2)}deg)`;
    this.imageCard.style.opacity = opacity.toFixed(3);

    // Update WebGL depth displacement shader
    if (this.renderer) {
      this.renderer.setShowRatio(eased);
    }

    // Smooth mouse lens shift inside the image card (.v2-card-inner-layer)
    if (this.innerLayer) {
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;
      this.innerLayer.style.transform = `translate3d(${this.mouseX.toFixed(2)}px, ${this.mouseY.toFixed(2)}px, 0)`;
    }

    // Keep loop active while entrance is animating or while mouse is moving
    const hasMouseOffset = Math.abs(this.targetMouseX - this.mouseX) > 0.05 || Math.abs(this.targetMouseY - this.mouseY) > 0.05;
    if (this.isAnimating || this.isHovered || hasMouseOffset) {
      this.rafId = requestAnimationFrame(this.updateFrame);
    } else {
      this.rafId = null;
    }
  };

  private onPointerEnter = (): void => {
    this.isHovered = true;
    if (this.renderer) {
      this.renderer.setHover(true);
    }
    if (this.textAnimator) {
      this.textAnimator.triggerHover(true);
    }
    if (this.tagAnimator) {
      this.tagAnimator.scramble();
    }

    this.playAudioHover();
    this.startLoop();
  };

  private onPointerMove = (e: PointerEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // NDC coordinates from -1.0 to 1.0
    const ndcX = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const ndcY = Math.max(-1, Math.min(1, (y - 0.5) * 2));

    // Internal lens shift targets for inner image layer
    this.targetMouseX = ndcX * 10;
    this.targetMouseY = ndcY * 8;

    // 2.5D depth raymarching shader parallax inside image
    if (this.renderer) {
      this.renderer.setPointer(ndcX, ndcY);
    }

    this.startLoop();
  };

  private onPointerLeave = (): void => {
    this.isHovered = false;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    if (this.renderer) {
      this.renderer.setPointer(0, 0);
      this.renderer.setHover(false);
    }
    if (this.textAnimator) {
      this.textAnimator.triggerHover(false);
    }
    if (this.tagAnimator) {
      this.tagAnimator.reset();
    }

    this.startLoop();
  };

  private onResize = (): void => {
    if (this.renderer) {
      this.renderer.resize();
    }
  };

  private initObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.triggerEntrance();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting) {
            this.triggerEntrance();
          } else {
            // When scrolled completely offscreen, reset so it re-triggers smoothly when scrolled back
            this.hasTriggered = false;
            this.isAnimating = false;
            this.stopLoop();
            this.setInitialState();
            if (this.renderer?.isContextActive) {
              this.renderer.suspendContext();
            }
          }
        });
      },
      { rootMargin: '60px 0px 60px 0px', threshold: 0.08 }
    );

    this.observer.observe(this.element);
  }

  private playAudioHover(): void {
    try {
      if (!this.audioEl) {
        this.audioEl = new Audio('/assets/audios/hover_0.ogg');
        this.audioEl.volume = 0.15;
      }
      this.audioEl.currentTime = 0;
      this.audioEl.play().catch(() => {});
    } catch (_) {}
  }

  public destroy(): void {
    this.stopLoop();
    this.element.removeEventListener('pointerenter', this.onPointerEnter);
    this.element.removeEventListener('pointermove', this.onPointerMove);
    this.element.removeEventListener('pointerleave', this.onPointerLeave);
    window.removeEventListener('resize', this.onResize);

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
  }
}
