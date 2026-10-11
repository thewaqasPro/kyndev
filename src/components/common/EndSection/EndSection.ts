/**
 * End Section Controller (Kyndev Architectural Redesign)
 * Coordinates the CTA simulation triggers, particle activation, and scroll indicator events.
 */

export class EndSectionController {
  private section: HTMLElement | null = null;
  private titleLink: HTMLElement | null = null;
  private crosses: NodeListOf<HTMLElement> | null = null;
  private scrollBtn: HTMLElement | null = null;

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.getElementById('end-section');
    this.titleLink = document.getElementById('end-section-title-link');
    this.crosses = document.querySelectorAll('.end-section-content-cross');
    this.scrollBtn = document.getElementById('end-bottom');

    if (!this.section) return;
    this.init();
  }

  private init(): void {
    if (this.titleLink) {
      this.titleLink.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('lusion:work-together-click'));
      });
    }

    if (this.scrollBtn) {
      this.scrollBtn.addEventListener('click', () => {
        const nextSection = document.getElementById('footer-section');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
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
