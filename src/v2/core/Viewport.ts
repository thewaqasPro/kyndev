/**
 * Viewport & Resolution Tracker (V2 Modular System)
 */
export class Viewport {
  public width: number = 0;
  public height: number = 0;
  public aspect: number = 1;
  public dpr: number = 1;

  constructor() {
    this.update();
  }

  public update(): void {
    if (typeof window === 'undefined') return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / Math.max(1, this.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
  }
}

export const viewport = new Viewport();
