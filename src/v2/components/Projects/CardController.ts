import { CardDisplacementRenderer } from './ProjectsShader';
import { ProjectsTextAnimator, TagScrambleAnimator } from './ProjectsTextAnim';

export class ProjectCardController {
  public element: HTMLElement;
  public canvas: HTMLCanvasElement | null = null;
  public renderer: CardDisplacementRenderer | null = null;
  public textAnimator: ProjectsTextAnimator | null = null;
  public tagAnimator: TagScrambleAnimator | null = null;
  public isHovered: boolean = false;

  private maxTiltDeg: number = 8.5;
  private observer: IntersectionObserver | null = null;
  private audioEl: HTMLAudioElement | null = null;

  constructor(cardEl: HTMLElement) {
    this.element = cardEl;
  }

  public async init(): Promise<void> {
    const slug = this.element.getAttribute('data-slug');
    if (!slug) return;

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
      this.renderer = new CardDisplacementRenderer(this.canvas, textureUrl, depthUrl);
    }

    this.bindEvents();
    this.initObserver();
  }

  private bindEvents(): void {
    this.element.addEventListener('pointerenter', this.onPointerEnter);
    this.element.addEventListener('pointermove', this.onPointerMove);
    this.element.addEventListener('pointerleave', this.onPointerLeave);

    window.addEventListener('resize', this.onResize);
  }

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

    // Play subtle hover audio if possible
    this.playAudioHover();
  };

  private onPointerMove = (e: PointerEvent): void => {
    const rect = this.element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // NDC coordinates from -1.0 to 1.0
    const ndcX = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const ndcY = Math.max(-1, Math.min(1, (y - 0.5) * 2));

    // 1. Interactive 3D Perspective Tilt on the Card
    const tiltX = -ndcY * this.maxTiltDeg;
    const tiltY = ndcX * this.maxTiltDeg;
    this.element.style.transform = `perspective(1100px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

    // 2. Parallax raymarching displacement in shader
    if (this.renderer) {
      this.renderer.setPointer(ndcX, ndcY);
    }
  };

  private onPointerLeave = (): void => {
    this.isHovered = false;
    this.element.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

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
  };

  private onResize = (): void => {
    if (this.renderer) {
      this.renderer.resize();
    }
  };

  private initObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && this.renderer?.isContextActive) {
            this.renderer.suspendContext();
          }
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.05 }
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
