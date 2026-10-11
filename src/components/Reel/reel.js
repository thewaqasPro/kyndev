/**
 * Reel Section Controller (Lusion.co Component Re-engineering)
 * 
 * Encapsulates the Showreel Section interactions, including the interactive
 * Play Reel / Watch button, ticker animations, hover states, audio sound effects,
 * and Vimeo modal trigger bridge.
 */

export class ReelController {
  constructor() {
    this.domContainer = null;
    this.domTitle = null;
    this.domContent = null;
    this.domWatchBtn = null;
    this.domVideoPlaceholder = null;
    this.domTopDeco = null;
    this.domBottomDeco = null;
    this.isInitialized = false;
  }

  init() {
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

  _bindEvents() {
    if (this.domWatchBtn) {
      // Click trigger to play the reel video overlay
      this.domWatchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openReelVideo();
      });

      // Hover feedback and audio trigger
      this.domWatchBtn.addEventListener('mouseenter', () => {
        this._setHoverState(true);
        if (window.audios && typeof window.audios.countPlay === 'function') {
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

  _setHoverState(isActive) {
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
  openReelVideo() {
    if (window.audios && typeof window.audios.countPlay === 'function') {
      window.audios.countPlay('click');
    }

    if (window.videoOverlay && typeof window.videoOverlay.initAndPlayVideo === 'function') {
      // 761102167 is VIDEO_LIST.MAIN_VIDEO_REEL
      window.videoOverlay.initAndPlayVideo(761102167);
    } else if (window.homeReelSection && typeof window.homeReelSection._onDomVideoButtonClick === 'function') {
      window.homeReelSection._onDomVideoButtonClick();
    }
  }
}

// Singleton instance
export const reelController = new ReelController();
if (typeof window !== 'undefined') {
  window.reelController = reelController;
}

/**
 * Hydration helper function called by Reel.astro
 */
export function initReel() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => reelController.init());
  } else {
    reelController.init();
  }
}
