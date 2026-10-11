/**
 * Projects Gallery Controller (Kyndev Architectural Redesign)
 *
 * Manages project card hover states, audio triggers, and 2.5D displacement mesh updates.
 */

export class ProjectsGalleryController {
  private domContainer: HTMLElement | null = null;
  private domItems: HTMLElement[] = [];
  public isInitialized: boolean = false;

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('projects');
    if (!this.domContainer) return;

    this.domItems = Array.from(this.domContainer.querySelectorAll<HTMLElement>('.project-item'));
    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    this.domItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        this._playHoverAudio();
      });
    });
  }

  private _playHoverAudio(): void {
    if (
      typeof window !== 'undefined' &&
      window.audios &&
      typeof window.audios.play === 'function'
    ) {
      window.audios.play('hover');
    }
  }
}

export function initProjectsGallery(): ProjectsGalleryController | undefined {
  if (typeof window === 'undefined') return;
  const controller = new ProjectsGalleryController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
