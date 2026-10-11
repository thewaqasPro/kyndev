/**
 * Footer Section Controller
 * Handles scroll-to-top, newsletter input states, and social link interactions.
 */

export class FooterController {
  constructor() {
    this.section = document.getElementById('footer-section');
    this.scrollToTopBtn = document.getElementById('footer-bottom-up');
    this.newsletterForm = document.getElementById('footer-newsletter-form');
    this.newsletterInput = document.getElementById('footer-newsletter-input-field');
    this.feedbackMessage = document.getElementById('footer-newsletter-feedback-message');

    if (!this.section) return;
    this.init();
  }

  init() {
    if (this.scrollToTopBtn) {
      this.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (this.newsletterForm) {
      this.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = this.newsletterInput?.value?.trim();
        if (!email || !email.includes('@')) {
          if (this.feedbackMessage) {
            this.feedbackMessage.innerHTML = '<span class="error">Please enter a valid email.</span>';
          }
          return;
        }

        if (this.feedbackMessage) {
          this.feedbackMessage.innerHTML = '<span class="success">Thank you for subscribing!</span>';
        }
        if (this.newsletterInput) {
          this.newsletterInput.value = '';
        }
      });
    }
  }
}

// Auto-initialize when the DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FooterController());
  } else {
    new FooterController();
  }
}
