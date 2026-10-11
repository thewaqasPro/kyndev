/**
 * About Capability Section Controller
 * 
 * Manages Area of Expertise section and card 3D transforms.
 */

export class AboutCapabilityController {
  constructor() {
    this.domContainer = null;
    this.domCardsWrapper = null;
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('about-capability');
    if (!this.domContainer) return;

    this.domCardsWrapper = document.getElementById('about-capability-cards-wrapper');
    this.isInitialized = true;
  }
}

export function initAboutCapability() {
  if (typeof window === 'undefined') return;
  const controller = new AboutCapabilityController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
