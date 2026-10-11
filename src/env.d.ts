/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  audios?: {
    toggle?: () => void;
    play?: (name: string) => void;
    stop?: () => void;
    [key: string]: any;
  };
  scrollManager?: {
    scrollTo?: (target: string | number | HTMLElement) => void;
    [key: string]: any;
  };
  kyndev?: any;
  lusion?: any;
}
