/**
 * Featured Section Controller (Kyndev Architectural Redesign)
 * Manages featured work interactive events, card hover sound triggers, and WebGL coordinate bindings.
 */

export class FeaturedController {
  private section: HTMLElement | null = null;
  private title: HTMLElement | null = null;
  private items: NodeListOf<HTMLElement> | null = null;
  private cta: HTMLElement | null = null;

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.querySelector('#home-featured');
    this.title = document.querySelector('#home-featured-title');
    this.items = document.querySelectorAll('.project-item');
    this.cta = document.querySelector('#home-featured-cta');

    if (!this.section) return;
    this.init();
  }

  private init(): void {
    this.setupHoverEffects();
    this.setupKeyboardNavigation();
  }

  private setupHoverEffects(): void {
    if (!this.items) return;
    this.items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const id = item.getAttribute('data-id');
        window.dispatchEvent(
          new CustomEvent('lusion:project-hover', {
            detail: { id, active: true },
          })
        );
      });

      item.addEventListener('mouseleave', () => {
        const id = item.getAttribute('data-id');
        window.dispatchEvent(
          new CustomEvent('lusion:project-hover', {
            detail: { id, active: false },
          })
        );
      });
    });
  }

  private setupKeyboardNavigation(): void {
    if (!this.items) return;
    this.items.forEach((item) => {
      item.setAttribute('role', 'article');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const href = item.getAttribute('href');
          if (href) window.location.href = href;
        }
      });
    });
  }
}

export function initFeatured(): FeaturedController | undefined {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FeaturedController());
  } else {
    return new FeaturedController();
  }
}
