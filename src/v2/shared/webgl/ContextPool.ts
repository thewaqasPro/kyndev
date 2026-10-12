/**
 * Kyndev V2 WebGL Context Pool
 * Chrome and mobile browsers enforce a strict ceiling on active WebGL contexts (max 8 to 16 per tab).
 * This pool ensures that as users scroll through galleries or multi-mesh components,
 * oldest or off-screen WebGL contexts are gracefully suspended, preventing CONTEXT_LOST_WEBGL errors.
 */

export interface PoolableWebGLRenderer {
  isContextActive: boolean;
  activateContext(): Promise<void> | void;
  suspendContext(): void;
}

export class WebGLContextPool {
  private maxActive: number;
  private activeList: PoolableWebGLRenderer[] = [];

  constructor(maxActive: number = 4) {
    this.maxActive = maxActive;
  }

  public request(renderer: PoolableWebGLRenderer): void {
    if (this.activeList.includes(renderer)) {
      this.activeList = this.activeList.filter((r) => r !== renderer);
      this.activeList.push(renderer);
      return;
    }

    if (this.activeList.length >= this.maxActive) {
      const oldest = this.activeList.shift();
      if (oldest) {
        oldest.suspendContext();
      }
    }

    this.activeList.push(renderer);
  }

  public release(renderer: PoolableWebGLRenderer): void {
    this.activeList = this.activeList.filter((r) => r !== renderer);
  }

  public clear(): void {
    this.activeList.forEach((r) => r.suspendContext());
    this.activeList = [];
  }
}

export const globalContextPool = new WebGLContextPool(4);
