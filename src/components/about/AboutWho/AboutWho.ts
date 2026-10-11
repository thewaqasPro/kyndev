/**
 * About Who Section Controller (Kyndev Architectural Redesign)
 *
 * Coordinates team face drag interactions, team member progression, and cursor follower.
 */

export class AboutWhoController {
  private domContainer: HTMLElement | null = null;
  public isInitialized: boolean = false;

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('about-who');
    if (!this.domContainer) return;

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    // Interactive mouse / touch bindings are coordinated with WebGL aboutHeroFaces
  }

  public destroy(): void {
    this.domContainer = null;
    this.isInitialized = false;
  }
}

export function initAboutWho(): AboutWhoController | undefined {
  if (typeof window === 'undefined') return;
  const controller = new AboutWhoController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
