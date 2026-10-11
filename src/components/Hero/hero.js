/**
 * Hero Section Controller (Lusion.co Component Re-engineering)
 * 
 * Encapsulates the 3D Balloons Physics interactions, SplitType title word animations,
 * scroll trigger indicators, and click impulses for the Hero section.
 */

export class HeroController {
  constructor() {
    this.domContainer = null;
    this.domVisualContainer = null;
    this.domHomeTitle = null;
    this.domHomeScroll = null;
    this.domHomeCrosses = [];
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.querySelector('#home-hero');
    if (!this.domContainer) return;

    this.domVisualContainer = this.domContainer.querySelector('#home-hero-visual-container');
    this.domHomeTitle = this.domContainer.querySelector('#home-hero-title');
    this.domHomeScroll = this.domContainer.querySelector('#home-hero-scroll');
    this.domHomeCrosses = Array.from(this.domContainer.querySelectorAll('.home-hero-scroll-container-cross'));

    this._bindEvents();
    this.isInitialized = true;
  }

  _bindEvents() {
    if (!this.domVisualContainer) return;

    // Interactive balloon color cycle & explosion impulse on click
    this.domVisualContainer.addEventListener('click', () => {
      this.triggerBalloonImpulse();
    });

    // Wheel listener for scroll indicator fade
    window.addEventListener('wheel', () => {
      if (this.domHomeScroll) {
        this.domHomeScroll.classList.add('is-animating');
      }
    }, { once: true });
  }

  /**
   * Triggers physical impulse and color change on the 3D balloons
   */
  triggerBalloonImpulse() {
    if (window.homeBalloons && window.homeBalloons.changeHomeHeroColorSignal) {
      window.homeBalloons.changeHomeHeroColorSignal.dispatch();
    }
    if (window.audios && typeof window.audios.countPlay === 'function') {
      window.audios.countPlay('click');
    }
  }

  /**
   * Resets Hero section animations
   */
  reset() {
    if (!this.domHomeTitle) return;
    const words = this.domHomeTitle.querySelectorAll('.word');
    words.forEach(w => {
      w.style.transform = 'translate3d(0, 100%, 0)';
    });
  }
}

// Singleton instance
export const heroController = new HeroController();

/**
 * Hydration helper function called by Hero.astro
 */
export function initHero() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => heroController.init());
  } else {
    heroController.init();
  }
}
