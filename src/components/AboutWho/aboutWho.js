/**
 * About Who Section Controller
 * 
 * Coordinates team face drag interactions, team member progression, and cursor follower.
 */

export class AboutWhoController {
  constructor() {
    this.domContainer = null;
    this.domFaces = null;
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('about-who');
    if (!this.domContainer) return;

    this.domFaces = this.domContainer.querySelector('#about-who-team-faces');
    this._bindEvents();
    this.isInitialized = true;
  }

  _bindEvents() {
    // Interactive mouse / touch bindings are coordinated with WebGL aboutHeroFaces
  }
}

export function initAboutWho() {
  if (typeof window === 'undefined') return;
  const controller = new AboutWhoController();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => controller.init());
  } else {
    controller.init();
  }
  return controller;
}
