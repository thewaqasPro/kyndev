import { audioManager } from '../../shared/audio';
import { AboutCapabilityScene3D } from './AboutCapabilityScene3D';

/**
 * Controller for Kyndev V2 AboutCapability 3D Flip Cards Component
 * Manages dual 3D binary ribbons (line_capability.buf and line_office.buf),
 * 3D perspective flip interactions, glyph tab switching, and audio triggers.
 */
export class AboutCapabilityController {
  private container: HTMLElement | null = null;
  private cards: NodeListOf<HTMLElement> | null = null;
  private scene3d: AboutCapabilityScene3D | null = null;
  private cleanups: Array<() => void> = [];

  public init(rootElement: HTMLElement): void {
    this.container = rootElement;
    this.cards = this.container.querySelectorAll('.capability-3d-card');

    // Initialize 3D Ribbon & Spatial scene
    this.scene3d = new AboutCapabilityScene3D(this.container);
    this.scene3d.init().catch(console.error);

    this.bindFlipInteractions();
  }

  private bindFlipInteractions(): void {
    if (!this.cards) return;

    this.cards.forEach((card) => {
      const onClick = (): void => {
        audioManager.play('click');
        card.classList.toggle('is-flipped');
      };

      const onEnter = (): void => {
        audioManager.play('hover');
      };

      card.addEventListener('click', onClick);
      card.addEventListener('mouseenter', onEnter);

      this.cleanups.push(() => {
        card.removeEventListener('click', onClick);
        card.removeEventListener('mouseenter', onEnter);
      });
    });
  }

  public destroy(): void {
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
    this.scene3d?.destroy();
    this.scene3d = null;
  }
}
