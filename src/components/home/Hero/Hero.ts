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
  private domHomeCrosses: HTMLElement[] = [];
  public isInitialized: boolean = false;

  public init(): void {
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

  private _bindEvents(): void {
    if (!this.domVisualContainer) return;

    this.domVisualContainer.addEventListener('click', () => {
      this.triggerBalloonImpulse();
    });

    window.addEventListener(
      'wheel',
      () => {
        if (this.domHomeScroll) {
          this.domHomeScroll.classList.add('is-animating');
        }
      },
      { once: true }
    );
  }

  /**
   * Triggers physical impulse and color change on the 3D balloons
   */
  public triggerBalloonImpulse(): void {
    const win = window as any;
    if (win.homeBalloons && win.homeBalloons.changeHomeHeroColorSignal) {
      win.homeBalloons.changeHomeHeroColorSignal.dispatch();
    }
    if (typeof window !== 'undefined' && window.audios && typeof window.audios.countPlay === 'function') {
      window.audios.countPlay('click');
    }
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
