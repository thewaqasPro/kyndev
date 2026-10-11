/**
 * Project Details Controller (Kyndev Architectural Redesign)
 *
 * Coordinates case study media items, scroll-to-explore triggers, and next project transitions.
 */

export class ProjectDetailsController {
  private domContainer: HTMLElement | null = null;
  private domPreview: HTMLElement | null = null;
  public isInitialized: boolean = false;
  private cleanups: Array<() => void> = [];

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('project-details');
    if (!this.domContainer) return;

    this.domPreview = this.domContainer.querySelector('#project-details-preview');

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    if (this.domPreview) {
      const onPreviewClick = (): void => {
        const nextId = this.domPreview?.dataset.nextId;
        if (nextId) {
          window.location.href = `/projects/${nextId}`;
        }
      };
      this.domPreview.addEventListener('click', onPreviewClick);
      this.cleanups.push(() => {
        this.domPreview?.removeEventListener('click', onPreviewClick);
      });
    }
  }

  public destroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
    this.isInitialized = false;
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
