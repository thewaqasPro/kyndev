/**
 * Header Section Controller (Lusion.co Component Re-engineering)
 * 
 * Manages header state, navigation interactions, sound toggle button,
 * full-screen slide-down menu overlay, and smooth contact scrolling.
 */

export class HeaderController {
  constructor() {
    this.domContainer = null;
    this.domMenuContainer = null;
    this.domMenuBtn = null;
    this.domSoundBtn = null;
    this.domTalkBtn = null;
    this.domContactBtn = null;
    this.isMenuOpened = false;
    this.isInitialized = false;
  }

  init() {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('header');
    if (!this.domContainer) return;

    this.domMenuContainer = document.getElementById('header-menu');
    this.domMenuBtn = document.getElementById('header-right-menu-btn');
    this.domSoundBtn = document.getElementById('header-right-sound-btn');
    this.domTalkBtn = document.getElementById('header-right-talk-btn');
    this.domContactBtn = document.querySelector('.header-menu-link[data-scroll-to="contact"]');

    this._bindEvents();
    this.isInitialized = true;
  }

  _bindEvents() {
    if (this.domContactBtn) {
      this.domContactBtn.addEventListener('click', () => {
        this.scrollToContact();
      });
    }
  }

  /**
   * Toggles sound audio playback via the site audio manager
   */
  toggleSound() {
    if (window.audios && typeof window.audios.toggle === 'function') {
      window.audios.toggle();
    }
  }

  /**
   * Smoothly scrolls to the footer/contact section
   */
  scrollToContact() {
    if (window.scrollManager && typeof window.scrollManager.scrollTo === 'function') {
      window.scrollManager.scrollTo('footer-section');
    }
    if (this.isMenuOpened) {
      this.closeMenu();
    }
  }

  /**
   * Opens the full-screen navigation menu
   */
  openMenu() {
    this.isMenuOpened = true;
    if (this.domContainer) {
      this.domContainer.classList.add('--menu-opened');
    }
    if (this.domMenuContainer) {
      this.domMenuContainer.classList.add('--opened');
    }
  }

  /**
   * Closes the full-screen navigation menu
   */
  closeMenu() {
    this.isMenuOpened = false;
    if (this.domContainer) {
      this.domContainer.classList.remove('--menu-opened');
    }
    if (this.domMenuContainer) {
      this.domMenuContainer.classList.remove('--opened');
    }
  }
}

export const headerController = new HeaderController();

export function initHeader() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => headerController.init());
  } else {
    headerController.init();
  }
}
