/**
 * Header Section Controller (Kyndev Architectural Redesign)
 *
 * Manages header state, navigation interactions, sound toggle button,
 * full-screen slide-down menu overlay, and smooth contact scrolling.
 */

export class HeaderController {
  private domContainer: HTMLElement | null = null;
  private domMenuBtn: HTMLElement | null = null;
  private domContactBtn: HTMLElement | null = null;
  private domMenuLinks: NodeListOf<Element> | null = null;
  public isMenuOpened: boolean = false;
  public isInitialized: boolean = false;

  private onMenuClick = (): void => {
    if (this.isMenuOpened) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  private onContactClick = (): void => {
    this.scrollToContact();
  };

  private onMenuLinkClick = (): void => {
    this.closeMenu();
  };

  public init(): void {
    if (typeof window === 'undefined') return;

    this.domContainer = document.getElementById('header');
    if (!this.domContainer) return;

    this.domMenuBtn = document.getElementById('header-right-menu-btn');
    this.domContactBtn = document.querySelector('.header-menu-link[data-scroll-to="contact"]');
    this.domMenuLinks = document.querySelectorAll('.header-menu-link');

    this._bindEvents();
    this.isInitialized = true;
  }

  private _bindEvents(): void {
    if (this.domMenuBtn) {
      this.domMenuBtn.addEventListener('click', this.onMenuClick);
    }
    // Sound button click is handled centrally by the WebAudio runtime Header controller
    if (this.domContactBtn) {
      this.domContactBtn.addEventListener('click', this.onContactClick);
    }
    if (this.domMenuLinks) {
      this.domMenuLinks.forEach((link) => {
        link.addEventListener('click', this.onMenuLinkClick);
      });
    }
  }

  public destroy(): void {
    if (this.domMenuBtn) {
      this.domMenuBtn.removeEventListener('click', this.onMenuClick);
    }

    if (this.domContactBtn) {
      this.domContactBtn.removeEventListener('click', this.onContactClick);
    }

    if (this.domMenuLinks) {
      this.domMenuLinks.forEach((link) => {
        link.removeEventListener('click', this.onMenuLinkClick);
      });
    }
    this.isInitialized = false;
  }

  /**
   * Toggles sound audio playback via the site audio manager
   */
  public toggleSound(): void {
    if (
      typeof window !== 'undefined' &&
      window.audios &&
      typeof window.audios.toggle === 'function'
    ) {
      window.audios.toggle();
    }
  }

  /**
   * Smoothly scrolls to the footer/contact section
   */
  public scrollToContact(): void {
    if (
      typeof window !== 'undefined' &&
      window.scrollManager &&
      typeof window.scrollManager.scrollTo === 'function'
    ) {
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
  }

  /**
   * Closes the full-screen navigation menu
   */
  public closeMenu(): void {
    this.isMenuOpened = false;
    if (this.domContainer) {
      this.domContainer.classList.remove('--menu-opened');
    }
  }
}

export function initHeader(): HeaderController | undefined {
  if (typeof window === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new HeaderController());
  } else {
    return new HeaderController();
  }
}
