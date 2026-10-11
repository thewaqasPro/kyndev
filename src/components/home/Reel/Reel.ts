/**
 * Reel Section Controller (Kyndev Architectural Redesign)
 *
 * Encapsulates the Showreel Section interactions, including the interactive
 * Play Reel / Watch button, ticker animations, hover states, audio sound effects,
 * and Vimeo modal trigger bridge.
 */

export class ReelController {
  private domContainer: HTMLElement | null = null;
  private domWatchBtn: HTMLElement | null = null;
  private domVideoPlaceholder: HTMLElement | null = null;
  private domTopDeco: HTMLElement | null = null;
  private domBottomDeco: HTMLElement | null = null;
  public isInitialized: boolean = false;
  private cleanups: Array<() => void> = [];

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.querySelector('#home-reel');
    if (!this.domContainer) return;

    this.domWatchBtn = this.domContainer.querySelector('#home-reel-video-watch-btn');
    this.domVideoPlaceholder = this.domContainer.querySelector('#home-reel-video-placeholder');
    this.domTopDeco = this.domContainer.querySelector('#home-reel-video-container-top');
    this.domBottomDeco = this.domContainer.querySelector('#home-reel-video-container-bottom');

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    if (this.domWatchBtn) {
      const onBtnClick = (e: MouseEvent): void => {
        e.stopPropagation();
        this.openReelVideo();
      };

      const onEnter = (): void => {
        this._setHoverState(true);
        window.audios?.countPlay?.('hover');
      };

      const onLeave = (): void => {
        this._setHoverState(false);
      };

      this.domWatchBtn.addEventListener('click', onBtnClick);
      this.domWatchBtn.addEventListener('mouseenter', onEnter);
      this.domWatchBtn.addEventListener('mouseleave', onLeave);

      this.cleanups.push(() => {
        this.domWatchBtn?.removeEventListener('click', onBtnClick);
        this.domWatchBtn?.removeEventListener('mouseenter', onEnter);
        this.domWatchBtn?.removeEventListener('mouseleave', onLeave);
      });
    }

    if (this.domVideoPlaceholder) {
      const onPlaceholderClick = (): void => {
        this.openReelVideo();
      };
      this.domVideoPlaceholder.addEventListener('click', onPlaceholderClick);
      this.cleanups.push(() => {
        this.domVideoPlaceholder?.removeEventListener('click', onPlaceholderClick);
      });
    }
  }

  public destroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
    this.isInitialized = false;
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
    window.audios?.countPlay?.('click');

    if (typeof window !== 'undefined' && window.videoOverlay?.initAndPlayVideo) {
      // 761102167 is VIDEO_LIST.MAIN_VIDEO_REEL
      window.videoOverlay.initAndPlayVideo('761102167');
    } else if (
      typeof window !== 'undefined' &&
      window.homeReelSection &&
      typeof (window.homeReelSection as { _onDomVideoButtonClick?: () => void })
        ._onDomVideoButtonClick === 'function'
    ) {
      (window.homeReelSection as { _onDomVideoButtonClick: () => void })._onDomVideoButtonClick();
    }
  }
}

// Singleton instance
export const reelController = new ReelController();

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
