/**
 * Featured Section Controller (Kyndev Architectural Redesign)
 * Manages featured work interactive events, card hover sound triggers, and WebGL coordinate bindings.
 */

export class FeaturedController {
  private section: HTMLElement | null = null;
  private items: NodeListOf<HTMLElement> | null = null;
  private cleanups: Array<() => void> = [];

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.querySelector('#home-featured');
    this.items = document.querySelectorAll('.project-item');

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
      const onEnter = (): void => {
        const id = item.getAttribute('data-id');
        window.dispatchEvent(
          new CustomEvent('lusion:project-hover', {
            detail: { id, active: true },
          })
        );
      };

      const onLeave = (): void => {
        const id = item.getAttribute('data-id');
        window.dispatchEvent(
          new CustomEvent('lusion:project-hover', {
            detail: { id, active: false },
          })
        );
      };

      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);

      this.cleanups.push(() => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupKeyboardNavigation(): void {
    if (!this.items) return;
    this.items.forEach((item) => {
      item.setAttribute('role', 'article');
      item.setAttribute('tabindex', '0');
      const onKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
          const href = item.getAttribute('href');
          if (href) window.location.href = href;
        }
      };
      item.addEventListener('keydown', onKeyDown);
      this.cleanups.push(() => {
        item.removeEventListener('keydown', onKeyDown);
      });
    });
  }

  public destroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
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
