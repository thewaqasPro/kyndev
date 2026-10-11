/**
 * ScrollNav Section Controller
 * Coordinates transition threshold and next-page progress indicator.
 */

export class ScrollNavController {
  constructor() {
    this.section = document.getElementById('scroll-nav-section');
    this.barInner = document.getElementById('scroll-nav-next-bar-inner');
    this.nextBtn = document.getElementById('scroll-nav-next');

    if (!this.section) return;
    this.init();
  }

  init() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        const path = this.section.getAttribute('data-path') || '/about';
        window.location.href = path;
      });
    }
  }
}

// Auto-initialize when the DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollNavController());
  } else {
    new ScrollNavController();
  }
}
