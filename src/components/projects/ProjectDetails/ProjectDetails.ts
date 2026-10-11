/**
 * Project Details Controller (Kyndev Architectural Redesign)
 * 
 * Coordinates case study media items, scroll-to-explore triggers, and next project transitions.
 */

export class ProjectDetailsController {
  private domContainer: HTMLElement | null = null;
  private domItems: HTMLElement[] = [];
  private domPreview: HTMLElement | null = null;
  public isInitialized: boolean = false;

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('project-details');
    if (!this.domContainer) return;

    this.domItems = Array.from(this.domContainer.querySelectorAll<HTMLElement>('.project-details-item'));
    this.domPreview = this.domContainer.querySelector('#project-details-preview');

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    if (this.domPreview) {
      this.domPreview.addEventListener('click', () => {
        const nextId = this.domPreview?.dataset.nextId;
        if (nextId) {
          window.location.href = `/projects/${nextId}`;
        }
      });
    }
  }
}

export function initProjectDetails(): ProjectDetailsController | undefined {
  if (typeof window === 'undefined') return;
  const controller = new ProjectDetailsController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
