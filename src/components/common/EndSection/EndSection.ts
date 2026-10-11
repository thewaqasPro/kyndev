/**
 * End Section Controller (Kyndev Architectural Redesign)
 * Coordinates the CTA simulation triggers, particle activation, and scroll indicator events.
 */

export class EndSectionController {
  private section: HTMLElement | null = null;
  private titleLink: HTMLElement | null = null;
  private scrollBtn: HTMLElement | null = null;
  private cleanups: Array<() => void> = [];

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.getElementById('end-section');
    this.titleLink = document.getElementById('end-section-title-link');
    this.scrollBtn = document.getElementById('end-bottom');

    if (!this.section) return;
    this.init();
  }

  private init(): void {
    if (this.titleLink) {
      const onTitleClick = (): void => {
        window.dispatchEvent(new CustomEvent('lusion:work-together-click'));
      };
      this.titleLink.addEventListener('click', onTitleClick);
      this.cleanups.push(() => {
        this.titleLink?.removeEventListener('click', onTitleClick);
      });
    }

    if (this.scrollBtn) {
      const onScrollClick = (): void => {
        const nextSection = document.getElementById('footer-section');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
      this.scrollBtn.addEventListener('click', onScrollClick);
      this.cleanups.push(() => {
        this.scrollBtn?.removeEventListener('click', onScrollClick);
      });
    }
  }

  public destroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
    this.section = null;
  }
}

export function initEndSection(): EndSectionController | undefined {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EndSectionController());
  } else {
    return new EndSectionController();
  }
}
