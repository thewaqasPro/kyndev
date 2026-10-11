/**
 * Project Details Controller
 * 
 * Coordinates case study media items, scroll-to-explore triggers, and next project transitions.
 */

export class ProjectDetailsController {
  constructor() {
    this.domContainer = null;
    this.domItems = [];
    this.domPreview = null;
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('project-details');
    if (!this.domContainer) return;

    this.domItems = Array.from(this.domContainer.querySelectorAll('.project-details-item'));
    this.domPreview = this.domContainer.querySelector('#project-details-preview');

    this._bindEvents();
    this.isInitialized = true;
  }

  _bindEvents() {
    if (this.domPreview) {
      this.domPreview.addEventListener('click', () => {
        const nextId = this.domPreview.dataset.nextId;
        if (nextId) {
          window.location.href = `/projects/${nextId}`;
        }
      });
    }
  }
}

export function initProjectDetails() {
  if (typeof window === 'undefined') return;
  const controller = new ProjectDetailsController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
