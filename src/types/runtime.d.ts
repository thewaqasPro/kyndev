// src/types/runtime.d.ts

/**
 * Signal dispatcher interface used across WebGL runtime systems.
 */
export interface Signal<T = void> {
  dispatch: (value?: T) => void;
  add?: (listener: (value: T) => void) => void;
  remove?: (listener: (value: T) => void) => void;
}

/**
 * Audio manager controlling sound effects and background ambient tracks.
 */
export interface AudioManager {
  toggle?: () => void;
  play?: (name: string) => void;
  countPlay?: (name: string) => void;
  stop?: () => void;
  fadeBgMusic?: (...args: unknown[]) => void;
  volume?: number;
  [key: string]: unknown;
}

/**
 * Virtual scroll manager synchronizing DOM coordinates with WebGL cameras.
 */
export interface ScrollManager {
  scrollTo?: (target: string | number | HTMLElement, duration?: number) => void;
  scrollToPixel?: (pixel: number) => void;
  scrollPixel?: number;
  y?: number;
  isActive?: boolean;
  syncDom?: () => void;
  [key: string]: unknown;
}

/**
 * Hero section 3D balloons physics and color interaction controller.
 */
export interface HomeBalloons {
  changeHomeHeroColorSignal?: Signal;
  balloonList?: unknown[];
  isActive?: boolean;
  [key: string]: unknown;
}

/**
 * Video modal overlay player controller.
 */
export interface VideoOverlay {
  initAndPlayVideo?: (url: string) => void;
  isOpened?: boolean;
  [key: string]: unknown;
}

/**
 * Client-side route and transition manager.
 */
export interface PagesManager {
  currRoute?: string;
  isIdle?: boolean;
  scrollTargetPage?: string;
  [key: string]: unknown;
}

/**
 * Typed custom events dispatched between DOM controllers and WebGL runtime.
 */
export interface KyndevCustomEventDetailMap {
  'lusion:project-hover': { id: string | null; active: boolean };
  'lusion:work-together-click': undefined;
}

declare global {
  interface Window {
    audios?: AudioManager;
    scrollManager?: ScrollManager;
    homeBalloons?: HomeBalloons;
    homeBalloonsPhysics?: unknown;
    homeHeroSection?: unknown;
    homeReelSection?: unknown;
    videoOverlay?: VideoOverlay;
    pagesManager?: PagesManager;
    kyndev?: unknown;
    lusion?: unknown;
    __app?: unknown;
  }

  interface WindowEventMap {
    'lusion:project-hover': CustomEvent<KyndevCustomEventDetailMap['lusion:project-hover']>;
    'lusion:work-together-click': CustomEvent<
      KyndevCustomEventDetailMap['lusion:work-together-click']
    >;
  }
}
