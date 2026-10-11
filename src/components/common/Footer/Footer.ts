/**
 * Footer Section Controller (Kyndev Architectural Redesign)
 * Handles scroll-to-top, newsletter input states, and social link interactions.
 */

export class FooterController {
  private section: HTMLElement | null = null;
  private scrollToTopBtn: HTMLElement | null = null;
  private newsletterForm: HTMLFormElement | null = null;
  private newsletterInput: HTMLInputElement | null = null;
  private feedbackMessage: HTMLElement | null = null;

  constructor() {
    if (typeof document === 'undefined') return;
    this.section = document.getElementById('footer-section');
    this.scrollToTopBtn = document.getElementById('footer-bottom-up');
    this.newsletterForm = document.getElementById(
      'footer-newsletter-form'
    ) as HTMLFormElement | null;
    this.newsletterInput = document.getElementById(
      'footer-newsletter-input-field'
    ) as HTMLInputElement | null;
    this.feedbackMessage = document.getElementById('footer-newsletter-feedback-message');

    if (!this.section) return;
    this.init();
  }

  private init(): void {
    if (this.scrollToTopBtn) {
      this.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (this.newsletterForm) {
      this.newsletterForm.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        const email = this.newsletterInput?.value?.trim();
        if (!email || !email.includes('@')) {
          if (this.feedbackMessage) {
            this.feedbackMessage.innerHTML =
              '<span class="error">Please enter a valid email.</span>';
          }
          return;
        }

        if (this.feedbackMessage) {
          this.feedbackMessage.innerHTML =
            '<span class="success">Thank you for subscribing!</span>';
        }
        if (this.newsletterInput) {
          this.newsletterInput.value = '';
        }
      });
    }
  }
}

export function initFooter(): FooterController | undefined {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FooterController());
  } else {
    return new FooterController();
  }
}
