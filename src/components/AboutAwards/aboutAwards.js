/**
 * About Awards Section Controller
 * 
 * Manages award category toggles and hover states.
 */

export class AboutAwardsController {
  constructor() {
    this.domContainer = null;
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('about-award');
    if (!this.domContainer) return;

    this.isInitialized = true;
  }
}

export function initAboutAwards() {
  if (typeof window === 'undefined') return;
  const controller = new AboutAwardsController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
