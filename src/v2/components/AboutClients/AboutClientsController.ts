import { audioManager } from '../../shared/audio';
import { math } from '../../shared/math';

/**
 * Controller for Kyndev V2 AboutClients Infinite Marquee Component
 *
 * Implements the authentic scroll-velocity-coupled marquee physics
 * ported from src/scripts/unpacked-project/deobfuscated.js (AboutClientSection).
 *
 * Features:
 * 1. Scroll-Velocity Coupling: Speed modulates dynamically with mouse wheel and drag velocity
 * 2. Alternating Row Drift: Row 0 & 2 move left, Row 1 moves right
 * 3. Reactive Logo Sheen & Hover Glow
 * 4. Audio triggers on interaction
 */
export class AboutClientsController {
  private container: HTMLElement | null = null;
  private trackRows: HTMLElement[] = [];
  private logoImages: NodeListOf<HTMLImageElement> | null = null;
  private cleanups: Array<() => void> = [];

  // Marquee velocity physics state
  private rowOffsets: number[] = [0, 0, 0];
  private rowWidths: number[] = [1200, 1200, 1200];
  private scrollVelocity = 0;
  private isHovered = false;

  private rafId: number | null = null;
  private isDestroyed = false;

  public init(rootElement: HTMLElement): void {
    this.container = rootElement;
    this.trackRows = Array.from(this.container.querySelectorAll('.clients-track-inner'));
    this.logoImages = this.container.querySelectorAll('.clients-logo-item');

    this.calculateRowWidths();
    this.bindHoverInteractions();
    this.bindScrollPhysics();
    this.startPhysicsLoop();
  }

  private calculateRowWidths(): void {
    this.trackRows.forEach((row, i) => {
      const w = row.scrollWidth / 2;
      this.rowWidths[i] = w > 0 ? w : 1200;
    });
  }

  private bindScrollPhysics(): void {
    const onWheel = (e: WheelEvent): void => {
      // Absorb wheel delta into scroll velocity
      this.scrollVelocity += Math.abs(e.deltaY) * 0.08;
      this.scrollVelocity = math.clamp(this.scrollVelocity, 0, 60);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('resize', () => this.calculateRowWidths());

    this.cleanups.push(() => {
      window.removeEventListener('wheel', onWheel);
    });
  }

  private bindHoverInteractions(): void {
    if (!this.logoImages) return;

    this.logoImages.forEach((logo) => {
      const onEnter = (): void => {
        audioManager.play('hover');
        logo.classList.add('is-hovered');
        this.isHovered = true;
      };

      const onLeave = (): void => {
        logo.classList.remove('is-hovered');
        this.isHovered = false;
      };

      logo.addEventListener('mouseenter', onEnter);
      logo.addEventListener('mouseleave', onLeave);

      this.cleanups.push(() => {
        logo.removeEventListener('mouseenter', onEnter);
        logo.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private startPhysicsLoop(): void {
    let lastTime = performance.now();

    const tick = (now: number): void => {
      if (this.isDestroyed) return;
      const dt = Math.min(0.1, (now - lastTime) * 0.001);
      lastTime = now;

      // Decay scroll velocity towards resting baseline
      this.scrollVelocity *= 0.94;

      const hoverFactor = this.isHovered ? 0.35 : 1.0;

      this.trackRows.forEach((row, idx) => {
        const isReverse = idx === 1;
        const dir = isReverse ? -1 : 1;
        const baseSpeed = (60 + (idx % 2) * 25) * hoverFactor;
        const totalSpeed = (baseSpeed + this.scrollVelocity * 40) * dir;

        const maxW = this.rowWidths[idx] || 1200;
        this.rowOffsets[idx] = (this.rowOffsets[idx] + totalSpeed * dt) % maxW;

        if (this.rowOffsets[idx] < 0) {
          this.rowOffsets[idx] += maxW;
        }

        row.style.transform = `translate3d(${-this.rowOffsets[idx]}px, 0, 0)`;
      });

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
  }
}
