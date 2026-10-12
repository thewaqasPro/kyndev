import { audioManager } from '../../shared/audio';
import { AboutAwardsScene3D } from './AboutAwardsScene3D';

/**
 * Controller for Kyndev V2 AboutAwards Component
 * Manages category accordion tabs, 3D starburst medal scene, and hover sound triggers.
 */
export class AboutAwardsController {
  private container: HTMLElement | null = null;
  private filterBtns: NodeListOf<HTMLElement> | null = null;
  private awardCards: NodeListOf<HTMLElement> | null = null;
  private scene3d: AboutAwardsScene3D | null = null;
  private cleanups: Array<() => void> = [];

  public init(rootElement: HTMLElement): void {
    this.container = rootElement;
    this.filterBtns = this.container.querySelectorAll('.awards-filter-pill');
    this.awardCards = this.container.querySelectorAll('.awards-category-card');

    const medalWrap = this.container.querySelector<HTMLElement>('#awards-medal-3d-wrap');
    if (medalWrap) {
      this.scene3d = new AboutAwardsScene3D(medalWrap);
      this.scene3d.init().catch(console.error);
    }

    this.bindFilters();
  }

  private bindFilters(): void {
    if (!this.filterBtns || !this.awardCards) return;

    this.filterBtns.forEach((btn) => {
      const cat = btn.getAttribute('data-cat') || 'all';

      const onClick = (): void => {
        audioManager.play('click');
        this.filterBtns?.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        this.awardCards?.forEach((card) => {
          const cardCat = card.getAttribute('data-cat') || '';
          if (cat === 'all' || cardCat === cat) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      };

      btn.addEventListener('click', onClick);
      this.cleanups.push(() => btn.removeEventListener('click', onClick));
    });
  }

  public destroy(): void {
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
    this.scene3d?.destroy();
    this.scene3d = null;
  }
}
