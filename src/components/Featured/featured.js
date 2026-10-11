/**
 * Featured Section Controller
 * Manages featured work interactive events, card hover sound triggers, and WebGL coordinate bindings.
 */

export class FeaturedController {
  constructor() {
    this.section = document.querySelector('#home-featured');
    this.title = document.querySelector('#home-featured-title');
    this.items = document.querySelectorAll('.project-item');
    this.cta = document.querySelector('#home-featured-cta');

    if (!this.section) return;
    this.init();
  }

  init() {
    this.setupHoverEffects();
    this.setupKeyboardNavigation();
  }

  setupHoverEffects() {
    this.items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const id = item.getAttribute('data-id');
        // Dispatch custom event for 3D displacement mesh coordinator
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

  setupKeyboardNavigation() {
    this.items.forEach((item) => {
      item.setAttribute('role', 'article');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const href = item.getAttribute('href');
          if (href) window.location.href = href;
        }
      });
    });
  }
}

// Auto-initialize when the DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FeaturedController());
  } else {
    new FeaturedController();
  }
}
