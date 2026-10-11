/**
 * ScrollNav Section Controller (Kyndev Architectural Redesign)
 * Coordinates transition threshold and next-page progress indicator.
 */

export class ScrollNavController {
  private section: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;
  private cleanups: Array<() => void> = [];

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.getElementById('scroll-nav-section');
    this.nextBtn = document.getElementById('scroll-nav-next');

    if (!this.section) return;
    this.init();
  }

  private init(): void {
    if (this.nextBtn) {
      const onNextClick = (): void => {
        const path = this.section?.getAttribute('data-path') || '/about';
        window.location.href = path;
      };
      this.nextBtn.addEventListener('click', onNextClick);
      this.cleanups.push(() => {
        this.nextBtn?.removeEventListener('click', onNextClick);
      });
    }
  }

  public destroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
    this.section = null;
  }
}

export function initScrollNav(): ScrollNavController | undefined {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollNavController());
  } else {
    return new ScrollNavController();
  }
}
