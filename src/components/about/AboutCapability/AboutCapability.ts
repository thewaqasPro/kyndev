/**
 * About Capability Section Controller (Kyndev Architectural Redesign)
 *
 * Manages Area of Expertise section and card 3D transforms.
 */

export class AboutCapabilityController {
  private domContainer: HTMLElement | null = null;
  private domCardsWrapper: HTMLElement | null = null;
  public isInitialized: boolean = false;

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('about-capability');
    if (!this.domContainer) return;

    this.domCardsWrapper = document.getElementById('about-capability-cards-wrapper');
    this.isInitialized = true;
  }
}

export function initAboutCapability(): AboutCapabilityController | undefined {
  if (typeof window === 'undefined') return;
  const controller = new AboutCapabilityController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
