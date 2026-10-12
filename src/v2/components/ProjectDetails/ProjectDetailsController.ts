/**
 * Kyndev V2 - Project Details Controller
 *
 * Implements smooth dual-axis inertial scrolling, drag-to-pan physics,
 * real-time media parallax, video auto-play intersection observer,
 * and next-project overscroll spring transitions.
 */

import { math } from '../../shared/math';
import { audioManager } from '../../shared/audio';
import { ProjectDetailsImageShader } from './ProjectDetailsShader';
import { ProjectDetailsViewer3D } from './ProjectDetailsViewer3D';

export interface ProjectDetailsOptions {
  nextSlug?: string;
  onNextProject?: (nextSlug: string) => void;
}

export class ProjectDetailsController {
  private container: HTMLElement | null = null;
  private viewport: HTMLElement | null = null;
  private track: HTMLElement | null = null;
  private scrollHint: HTMLElement | null = null;
  private meterFill: HTMLElement | null = null;
  private hudBarInner: HTMLElement | null = null;
  private hudProgressText: HTMLElement | null = null;
  private mediaItems: HTMLElement[] = [];

  // WebGL Image Shaders & 3D Viewer
  private imageShaders: Array<{ item: HTMLElement; shader: ProjectDetailsImageShader }> = [];
  private viewer3d: ProjectDetailsViewer3D | null = null;
  private modalEl: HTMLElement | null = null;

  // Scroll physics state
  private targetScrollX = 0;
  private currentScrollX = 0;
  private maxScrollX = 0;
  private isMobile = false;

  // Drag physics state
  private isDragging = false;
  private startPointerX = 0;
  private startScrollX = 0;
  private dragVelocity = 0;
  private lastDragX = 0;
  private lastDragTime = 0;

  // Overscroll spring state
  private overscrollRatio = 0;
  private nextSlug: string = '';
  private onNextProject?: (nextSlug: string) => void;

  private rafId: number | null = null;
  private isDestroyed = false;
  private hasScrolled = false;

  constructor(options: ProjectDetailsOptions = {}) {
    this.nextSlug = options.nextSlug || '';
    this.onNextProject = options.onNextProject;
  }

  public init(root: HTMLElement): void {
    this.container = root;
    this.viewport = root.querySelector('.v2-pd-viewport');
    this.track = root.querySelector('.v2-pd-track');
    this.scrollHint = root.querySelector('.v2-pd-scroll-hint');
    this.meterFill = root.querySelector('.v2-pd-meter-fill');
    this.hudBarInner = root.querySelector('.v2-pd-hud-bar-inner');
    this.hudProgressText = root.querySelector('.v2-pd-hud-progress-text');
    this.mediaItems = Array.from(root.querySelectorAll('.v2-pd-media-item'));

    if (!this.viewport || !this.track) return;

    this.checkMobile();
    this.calculateBounds();
    this.bindEvents();
    this.initVideoObservers();
    this.initImageShaders();
    this.init3DViewerModal();
    this.startLoop();
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth <= 900;
  }

  private calculateBounds(): void {
    if (!this.viewport || !this.track || this.isMobile) {
      this.maxScrollX = 0;
      return;
    }
    const trackWidth = this.track.scrollWidth;
    const viewWidth = this.viewport.clientWidth;
    this.maxScrollX = Math.max(0, trackWidth - viewWidth);
  }

  private bindEvents(): void {
    if (!this.viewport) return;

    // Window resize
    window.addEventListener('resize', this.onResize);

    // Wheel listener (Desktop horizontal translation)
    window.addEventListener('wheel', this.onWheel, { passive: false });

    // Drag / Pan listeners
    this.viewport.addEventListener('mousedown', this.onPointerDown);
    window.addEventListener('mousemove', this.onPointerMove);
    window.addEventListener('mouseup', this.onPointerUp);

    // Touch listeners
    this.viewport.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd);

    // Audio triggers on interactive controls
    const interactiveBtns = this.container?.querySelectorAll('a, button, .v2-pd-next-section');
    interactiveBtns?.forEach((btn) => {
      btn.addEventListener('mouseenter', () => audioManager.play('hover'));
      btn.addEventListener('click', () => audioManager.play('click'));
    });

    // Next project card direct click
    const nextCard = this.container?.querySelector('.v2-pd-next-section');
    if (nextCard && this.nextSlug) {
      nextCard.addEventListener('click', () => {
        this.triggerNextProject();
      });
    }

    // Video play/pause buttons
    this.container?.querySelectorAll('.v2-pd-video-play-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = (btn as HTMLElement).closest('.v2-pd-media-item');
        const video = parent?.querySelector('video');
        if (video) {
          if (video.paused) {
            video.play();
            (btn as HTMLElement).innerHTML = `
              <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            `;
          } else {
            video.pause();
            (btn as HTMLElement).innerHTML = `
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            `;
          }
        }
      });
    });
  }

  private onResize = (): void => {
    this.checkMobile();
    this.calculateBounds();
    this.imageShaders.forEach(({ shader }) => shader.resize());
  };

  private onWheel = (e: WheelEvent): void => {
    if (this.isMobile || !this.viewport) return;

    // Prevent default vertical page scroll inside horizontal gallery
    e.preventDefault();

    if (!this.hasScrolled) {
      this.hasScrolled = true;
      this.scrollHint?.classList.add('is-hidden');
    }

    // Prefer deltaX if present, else deltaY
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const speed = 1.35;

    // Check overscroll at right edge
    if (this.currentScrollX >= this.maxScrollX - 5 && delta > 0) {
      this.overscrollRatio = math.saturate(this.overscrollRatio + 0.05);
      if (this.overscrollRatio >= 1) {
        this.triggerNextProject();
      }
    } else if (delta < 0 && this.overscrollRatio > 0) {
      this.overscrollRatio = math.saturate(this.overscrollRatio - 0.08);
    }

    this.targetScrollX = math.clamp(this.targetScrollX + delta * speed, 0, this.maxScrollX);
  };

  private onPointerDown = (e: MouseEvent): void => {
    if (this.isMobile) return;
    this.isDragging = true;
    this.startPointerX = e.clientX;
    this.startScrollX = this.targetScrollX;
    this.lastDragX = e.clientX;
    this.lastDragTime = performance.now();
    this.dragVelocity = 0;
    this.viewport?.classList.add('is-dragging');
  };

  private onPointerMove = (e: MouseEvent): void => {
    if (!this.isDragging || this.isMobile) return;

    if (!this.hasScrolled) {
      this.hasScrolled = true;
      this.scrollHint?.classList.add('is-hidden');
    }

    const now = performance.now();
    const dt = Math.max(1, now - this.lastDragTime);
    const dx = e.clientX - this.lastDragX;
    this.dragVelocity = dx / dt;
    this.lastDragX = e.clientX;
    this.lastDragTime = now;

    const delta = (e.clientX - this.startPointerX) * 1.5;
    this.targetScrollX = math.clamp(this.startScrollX - delta, 0, this.maxScrollX);
  };

  private onPointerUp = (): void => {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.viewport?.classList.remove('is-dragging');

    // Apply drag inertia momentum
    const momentum = this.dragVelocity * -250;
    this.targetScrollX = math.clamp(this.targetScrollX + momentum, 0, this.maxScrollX);
  };

  private onTouchStart = (e: TouchEvent): void => {
    if (this.isMobile || e.touches.length === 0) return;
    this.isDragging = true;
    this.startPointerX = e.touches[0].clientX;
    this.startScrollX = this.targetScrollX;
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (!this.isDragging || this.isMobile || e.touches.length === 0) return;
    const delta = (e.touches[0].clientX - this.startPointerX) * 1.4;
    this.targetScrollX = math.clamp(this.startScrollX - delta, 0, this.maxScrollX);
  };

  private onTouchEnd = (): void => {
    this.isDragging = false;
  };

  private initVideoObservers(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video') as HTMLVideoElement | null;
          if (!video) return;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.mediaItems.forEach((item) => {
      if (item.querySelector('video')) {
        observer.observe(item);
      }
    });
  }

  private initImageShaders(): void {
    if (this.isMobile) return;
    this.mediaItems.forEach((item) => {
      const img = item.querySelector('img.v2-pd-media-asset') as HTMLImageElement | null;
      const inner = item.querySelector('.v2-pd-media-inner') as HTMLElement | null;
      if (img && inner && img.src) {
        // Overlay authentic WebGL UfxMesh image shader
        const shader = new ProjectDetailsImageShader(inner, img.src);
        this.imageShaders.push({ item, shader });
      }
    });
  }

  private init3DViewerModal(): void {
    if (!this.container) return;
    this.modalEl = this.container.querySelector('#v2-pd-3d-modal');
    const openBtn = this.container.querySelector('#v2-pd-inspect-btn');
    const closeBtn = this.container.querySelector('#v2-pd-3d-modal-close');
    const backdrop = this.container.querySelector('#v2-pd-3d-modal-backdrop');
    const viewport = this.container.querySelector<HTMLElement>('#v2-pd-3d-viewer-viewport');

    const openModal = (): void => {
      audioManager.play('click');
      if (this.modalEl) {
        this.modalEl.classList.add('is-open');
        this.modalEl.setAttribute('aria-hidden', 'false');
      }
      if (viewport && !this.viewer3d) {
        this.viewer3d = new ProjectDetailsViewer3D(viewport);
      }
    };

    const closeModal = (): void => {
      audioManager.play('click');
      if (this.modalEl) {
        this.modalEl.classList.remove('is-open');
        this.modalEl.setAttribute('aria-hidden', 'true');
      }
    };

    openBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
  }

  private triggerNextProject(): void {
    if (!this.nextSlug) return;
    audioManager.play('click');
    if (this.onNextProject) {
      this.onNextProject(this.nextSlug);
    } else {
      window.location.href = `/projects/${this.nextSlug}`;
    }
  }

  private startLoop(): void {
    const tick = (): void => {
      if (this.isDestroyed) return;

      if (!this.isMobile && this.track) {
        // Smooth lerp physics
        this.currentScrollX = math.lerp(this.currentScrollX, this.targetScrollX, 0.09);

        // Apply track transform
        this.track.style.transform = `translate3d(-${this.currentScrollX.toFixed(2)}px, 0, 0)`;

        // Progress HUD update
        const progress = this.maxScrollX > 0 ? math.saturate(this.currentScrollX / this.maxScrollX) : 0;
        if (this.hudBarInner) {
          this.hudBarInner.style.transform = `scaleX(${progress})`;
        }
        if (this.hudProgressText) {
          this.hudProgressText.textContent = `${Math.round(progress * 100)}%`;
        }

        // Overscroll meter decay if not actively overscrolling
        if (!this.isDragging && this.overscrollRatio > 0) {
          this.overscrollRatio = math.saturate(this.overscrollRatio - 0.015);
        }
        if (this.meterFill) {
          this.meterFill.style.transform = `scaleX(${this.overscrollRatio})`;
        }

        // Media items parallax inside frames & WebGL UfxMesh shader updates
        const viewWidth = window.innerWidth;
        const elapsedTime = performance.now() * 0.001;

        this.mediaItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const offsetNorm = (itemCenterX - viewWidth / 2) / (viewWidth / 2);
          const asset = item.querySelector('.v2-pd-media-asset') as HTMLElement | null;
          if (asset) {
            const shiftX = -offsetNorm * 22; // subtle 22px internal shift
            asset.style.transform = `translate3d(${shiftX.toFixed(1)}px, 0, 0) scale(1.04)`;
          }
        });

        this.imageShaders.forEach(({ item, shader }) => {
          const rect = item.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const offsetNorm = (itemCenterX - viewWidth / 2) / (viewWidth / 2);
          shader.render(offsetNorm, elapsedTime);
        });
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    this.imageShaders.forEach(({ shader }) => shader.destroy());
    this.imageShaders = [];
    this.viewer3d?.destroy();
    this.viewer3d = null;

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('mouseup', this.onPointerUp);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
  }
}
