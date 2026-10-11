/**
 * ScrollNav Section Controller (Kyndev Architectural Redesign)
 * Coordinates transition threshold and next-page progress indicator.
 */

export class ScrollNavController {
  private section: HTMLElement | null = null;
  private barInner: HTMLElement | null = null;
  private nextBtn: HTMLElement | null = null;

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.getElementById('scroll-nav-section');
    this.barInner = document.getElementById('scroll-nav-next-bar-inner');
    this.nextBtn = document.getElementById('scroll-nav-next');

    if (!this.section) return;
    this.init();
  }

  private init(): void {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        const path = this.section?.getAttribute('data-path') || '/about';
        window.location.href = path;
      });
    }
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
