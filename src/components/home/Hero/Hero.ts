/**
 * Hero Section Controller (Kyndev Architectural Redesign)
 *
 * Encapsulates the 3D Balloons Physics interactions, SplitType title word animations,
 * scroll trigger indicators, and click impulses for the Hero section.
 */

export class HeroController {
  private domContainer: HTMLElement | null = null;
  private domVisualContainer: HTMLElement | null = null;
  private domHomeTitle: HTMLElement | null = null;
  private domHomeScroll: HTMLElement | null = null;
  public isInitialized: boolean = false;

  private onVisualClick = (): void => {
    this.triggerBalloonImpulse();
  };

  private onWindowWheel = (): void => {
    if (this.domHomeScroll) {
      this.domHomeScroll.classList.add('is-animating');
    }
  };

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.querySelector('#home-hero');
    if (!this.domContainer) return;

    this.domVisualContainer = this.domContainer.querySelector('#home-hero-visual-container');
    this.domHomeTitle = this.domContainer.querySelector('#home-hero-title');
    this.domHomeScroll = this.domContainer.querySelector('#home-hero-scroll');

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    if (this.domVisualContainer) {
      this.domVisualContainer.addEventListener('click', this.onVisualClick);
    }
    window.addEventListener('wheel', this.onWindowWheel, { once: true });
  }

  /**
   * Cleans up event listeners
   */
  public destroy(): void {
    if (this.domVisualContainer) {
      this.domVisualContainer.removeEventListener('click', this.onVisualClick);
    }
    window.removeEventListener('wheel', this.onWindowWheel);
    this.isInitialized = false;
  }

  /**
   * Triggers physical impulse and color change on the 3D balloons
   */
  public triggerBalloonImpulse(): void {
    if (typeof window === 'undefined') return;
    window.homeBalloons?.changeHomeHeroColorSignal?.dispatch();
    window.audios?.countPlay?.('click');
  }

  /**
   * Resets Hero section animations
   */
  public reset(): void {
    if (!this.domHomeTitle) return;
    const words = this.domHomeTitle.querySelectorAll<HTMLElement>('.word');
    words.forEach((w) => {
      w.style.transform = 'translate3d(0, 100%, 0)';
    });
  }
}

// Singleton instance
export const heroController = new HeroController();

/**
 * Hydration helper function called by Hero.astro
 */
export function initHero(): void {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => heroController.init());
  } else {
    heroController.init();
  }
}
