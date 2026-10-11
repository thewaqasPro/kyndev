/**
 * Header Section Controller (Kyndev Architectural Redesign)
 * 
 * Manages header state, navigation interactions, sound toggle button,
 * full-screen slide-down menu overlay, and smooth contact scrolling.
 */

export class HeaderController {
  private domContainer: HTMLElement | null = null;
  private domMenuContainer: HTMLElement | null = null;
  private domMenuBtn: HTMLElement | null = null;
  private domSoundBtn: HTMLElement | null = null;
  private domTalkBtn: HTMLElement | null = null;
  private domContactBtn: HTMLElement | null = null;
  public isMenuOpened: boolean = false;
  public isInitialized: boolean = false;

  public init(): void {
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

  private _bindEvents(): void {
    if (this.domContactBtn) {
      this.domContactBtn.addEventListener('click', () => {
        this.scrollToContact();
      });
    }
  }

  /**
   * Toggles sound audio playback via the site audio manager
   */
  public toggleSound(): void {
    if (typeof window !== 'undefined' && window.audios && typeof window.audios.toggle === 'function') {
      window.audios.toggle();
    }
  }

  /**
   * Smoothly scrolls to the footer/contact section
   */
  public scrollToContact(): void {
    if (typeof window !== 'undefined' && window.scrollManager && typeof window.scrollManager.scrollTo === 'function') {
      window.scrollManager.scrollTo('footer-section');
    }
    if (this.isMenuOpened) {
      this.closeMenu();
    }
  }

  /**
   * Opens the full-screen navigation menu
   */
  public openMenu(): void {
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
  public closeMenu(): void {
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

export function initHeader(): void {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => headerController.init());
  } else {
    headerController.init();
  }
}
