/**
 * End Section Controller
 * Coordinates the CTA simulation triggers, particle activation, and scroll indicator events.
 */

export class EndSectionController {
  constructor() {
    this.section = document.getElementById('end-section');
    this.titleLink = document.getElementById('end-section-title-link');
    this.crosses = document.querySelectorAll('.end-section-content-cross');
    this.scrollBtn = document.getElementById('end-bottom');

    if (!this.section) return;
    this.init();
  }

  init() {
    if (this.titleLink) {
      this.titleLink.addEventListener('click', (e) => {
        // Broadcast custom event for talk / contact modal or scroll
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

// Auto-initialize when the DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EndSectionController());
  } else {
    new EndSectionController();
  }
}
