/**
 * Projects Gallery Controller
 * 
 * Manages project card hover states, audio triggers, and 2.5D displacement mesh updates.
 */

export class ProjectsGalleryController {
  constructor() {
    this.domContainer = null;
    this.domItems = [];
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('projects');
    if (!this.domContainer) return;

    this.domItems = Array.from(this.domContainer.querySelectorAll('.project-item'));
    this._bindEvents();
    this.isInitialized = true;
  }

  _bindEvents() {
    this.domItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const id = item.dataset.id;
        this._playHoverAudio();
      });
    });
  }

  _playHoverAudio() {
    if (window.audios && typeof window.audios.play === 'function') {
      window.audios.play('hover');
    }
  }
}

export function initProjectsGallery() {
  if (typeof window === 'undefined') return;
  const controller = new ProjectsGalleryController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
