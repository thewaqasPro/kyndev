/**
 * Reel Section Controller (Kyndev Architectural Redesign)
 * 
 * Encapsulates the Showreel Section interactions, including the interactive
 * Play Reel / Watch button, ticker animations, hover states, audio sound effects,
 * and Vimeo modal trigger bridge.
 */

export class ReelController {
  private domContainer: HTMLElement | null = null;
  private domTitle: HTMLElement | null = null;
  private domContent: HTMLElement | null = null;
  private domWatchBtn: HTMLElement | null = null;
  private domVideoPlaceholder: HTMLElement | null = null;
  private domTopDeco: HTMLElement | null = null;
  private domBottomDeco: HTMLElement | null = null;
  public isInitialized: boolean = false;

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.querySelector('#home-reel');
    if (!this.domContainer) return;

    this.domTitle = this.domContainer.querySelector('#home-reel-title');
    this.domContent = this.domContainer.querySelector('#home-reel-content');
    this.domWatchBtn = this.domContainer.querySelector('#home-reel-video-watch-btn');
    this.domVideoPlaceholder = this.domContainer.querySelector('#home-reel-video-placeholder');
    this.domTopDeco = this.domContainer.querySelector('#home-reel-video-container-top');
    this.domBottomDeco = this.domContainer.querySelector('#home-reel-video-container-bottom');

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    if (this.domWatchBtn) {
      this.domWatchBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        this.openReelVideo();
      });

      this.domWatchBtn.addEventListener('mouseenter', () => {
        this._setHoverState(true);
        if (typeof window !== 'undefined' && window.audios && typeof window.audios.countPlay === 'function') {
          window.audios.countPlay('hover');
        }
      });

      this.domWatchBtn.addEventListener('mouseleave', () => {
        this._setHoverState(false);
      });
    }

    if (this.domVideoPlaceholder) {
      this.domVideoPlaceholder.addEventListener('click', () => {
        this.openReelVideo();
      });
    }
  }

  private _setHoverState(isActive: boolean): void {
    if (this.domTopDeco) {
      if (isActive) this.domTopDeco.classList.add('--is-active');
      else this.domTopDeco.classList.remove('--is-active');
    }
    if (this.domBottomDeco) {
      if (isActive) this.domBottomDeco.classList.add('--is-active');
      else this.domBottomDeco.classList.remove('--is-active');
    }
  }

  /**
   * Opens the main showreel Vimeo video overlay
   */
  public openReelVideo(): void {
    if (typeof window !== 'undefined' && window.audios && typeof window.audios.countPlay === 'function') {
      window.audios.countPlay('click');
    }

    const win = window as any;
    if (win.videoOverlay && typeof win.videoOverlay.initAndPlayVideo === 'function') {
      // 761102167 is VIDEO_LIST.MAIN_VIDEO_REEL
      win.videoOverlay.initAndPlayVideo(761102167);
    } else if (win.homeReelSection && typeof win.homeReelSection._onDomVideoButtonClick === 'function') {
      win.homeReelSection._onDomVideoButtonClick();
    }
  }
}

// Singleton instance
export const reelController = new ReelController();
if (typeof window !== 'undefined') {
  (window as any).reelController = reelController;
}

/**
 * Hydration helper function called by Reel.astro
 */
export function initReel(): void {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => reelController.init());
  } else {
    reelController.init();
  }
}
