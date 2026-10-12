import { audioManager } from '../../shared/audio';
import { ReelScene3D } from './ReelScene3D';

/**
 * Controller for Kyndev V2 Reel Component
 *
 * Coordinates:
 * 1. 3D WebGL Ribbon Scene (ReelScene3D) with line_reel.buf & video shaders
 * 2. Rotating cross glyph matrices and continuous running ticker strips
 * 3. Video modal playback with Vimeo iframe
 * 4. Magnetic button hover states and audio triggers
 */
export class ReelController {
  private container: HTMLElement | null = null;
  private stageContainer: HTMLElement | null = null;
  private watchBtn: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private modalCloseBtn: HTMLElement | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private scene3d: ReelScene3D | null = null;

  // Cross glyph decorations
  private crossesTop: HTMLElement[] = [];
  private crossesBottom: HTMLElement[] = [];
  private tickerTop: HTMLElement | null = null;
  private tickerBottom: HTMLElement | null = null;

  private cleanups: Array<() => void> = [];
  private rafId: number | null = null;
  private isDestroyed = false;
  private time = 0;

  // Default Kyndev Vimeo Showreel ID
  private vimeoId: string = '761102167';

  public async init(rootElement: HTMLElement): Promise<void> {
    this.container = rootElement;
    this.stageContainer = this.container.querySelector('.reel-stage-container');
    this.watchBtn = this.container.querySelector('.reel-watch-btn');
    this.modal = this.container.querySelector('.reel-video-modal');
    this.modalCloseBtn = this.container.querySelector('.reel-modal-close-btn');
    this.iframe = this.container.querySelector('.reel-modal-iframe');

    this.crossesTop = Array.from(this.container.querySelectorAll('.reel-cross-top'));
    this.crossesBottom = Array.from(this.container.querySelectorAll('.reel-cross-bottom'));
    this.tickerTop = this.container.querySelector('.reel-ticker-top');
    this.tickerBottom = this.container.querySelector('.reel-ticker-bottom');

    // 1. Initialize 3D Ribbon & Video Scene
    if (this.stageContainer) {
      this.scene3d = new ReelScene3D(this.stageContainer);
      await this.scene3d.init();
    }

    this.bindEvents();
    this.startAnimationLoop();
  }

  private bindEvents(): void {
    // Intersection Observer for scroll entrance
    if (typeof IntersectionObserver !== 'undefined' && this.container) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.scene3d?.setShowRatio(1.0);
              this.container?.classList.add('is-in-view');
            } else {
              this.scene3d?.setShowRatio(0.2);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(this.container);
      this.cleanups.push(() => observer.disconnect());
    }

    // Interactive Watch Button
    if (this.watchBtn) {
      const onBtnClick = (e: MouseEvent): void => {
        e.stopPropagation();
        audioManager.play('click');
        this.openModal();
      };

      const onBtnEnter = (): void => {
        audioManager.play('hover');
        this.container?.classList.add('is-btn-hovered');
      };

      const onBtnLeave = (): void => {
        this.container?.classList.remove('is-btn-hovered');
      };

      this.watchBtn.addEventListener('click', onBtnClick);
      this.watchBtn.addEventListener('mouseenter', onBtnEnter);
      this.watchBtn.addEventListener('mouseleave', onBtnLeave);

      this.cleanups.push(() => {
        this.watchBtn?.removeEventListener('click', onBtnClick);
        this.watchBtn?.removeEventListener('mouseenter', onBtnEnter);
        this.watchBtn?.removeEventListener('mouseleave', onBtnLeave);
      });
    }

    // Modal Close
    if (this.modalCloseBtn) {
      const onCloseClick = (e: MouseEvent): void => {
        e.stopPropagation();
        audioManager.play('click');
        this.closeModal();
      };
      this.modalCloseBtn.addEventListener('click', onCloseClick);
      this.cleanups.push(() => {
        this.modalCloseBtn?.removeEventListener('click', onCloseClick);
      });
    }

    // Backdrop Click
    if (this.modal) {
      const onBackdropClick = (e: MouseEvent): void => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      };
      this.modal.addEventListener('click', onBackdropClick);
      this.cleanups.push(() => {
        this.modal?.removeEventListener('click', onBackdropClick);
      });
    }

    // Keyboard ESC
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && this.modal?.classList.contains('is-open')) {
        this.closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    this.cleanups.push(() => {
      window.removeEventListener('keydown', onKeyDown);
    });
  }

  private startAnimationLoop(): void {
    let lastTime = performance.now();

    const loop = (now: number): void => {
      if (this.isDestroyed) return;
      const dt = (now - lastTime) * 0.001;
      lastTime = now;
      this.time += dt;

      // Animate Rotating Cross Glyphs (from deobfuscated.js line 8702)
      const crossRot = (this.time * 45) % 360;
      this.crossesTop.forEach((cross, i) => {
        const offset = i * 20;
        cross.style.transform = `rotate(${crossRot + offset}deg) scale(1)`;
      });
      this.crossesBottom.forEach((cross, i) => {
        const offset = i * 20;
        cross.style.transform = `rotate(${-crossRot - offset}deg) scale(1)`;
      });

      // Animate Running Ticker Strips (from deobfuscated.js lines 8725-8728)
      const tickerX = (this.time * 60) % 600;
      if (this.tickerTop) {
        this.tickerTop.style.transform = `translate3d(${-tickerX}px, 0, 0)`;
      }
      if (this.tickerBottom) {
        this.tickerBottom.style.transform = `translate3d(${tickerX - 300}px, 0, 0)`;
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public openModal(): void {
    if (!this.modal) return;
    this.modal.classList.add('is-open');

    if (this.iframe && !this.iframe.src) {
      this.iframe.src = `https://player.vimeo.com/video/${this.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
    }
  }

  public closeModal(): void {
    if (!this.modal) return;
    this.modal.classList.remove('is-open');

    if (this.iframe) {
      this.iframe.src = '';
    }
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.scene3d?.destroy();
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
  }
}
