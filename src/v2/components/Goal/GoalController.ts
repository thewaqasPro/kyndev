import { audioManager } from '../../shared/audio';
import { GoalScene3D } from './GoalScene3D';

/**
 * Controller for Kyndev V2 Goal & Tunnel Experience Component
 *
 * Coordinates:
 * 1. 3D WebGL Ribbon Scene (line_goal.buf) with custom GLSL shaders
 * 2. Floating Zero-G Astronaut Helmet (astronaut_helmet.buf) & tunnel depth lattice
 * 3. Perspective mouse lookAt tracking & portal depth transforms
 * 4. Audio triggers on hover & interactions
 */
export class GoalController {
  private container: HTMLElement | null = null;
  private portalCards: NodeListOf<HTMLElement> | null = null;
  private scene3d: GoalScene3D | null = null;
  private cleanups: Array<() => void> = [];

  public async init(rootElement: HTMLElement): Promise<void> {
    this.container = rootElement;
    this.portalCards = this.container.querySelectorAll('.goal-portal-card');

    // 1. Initialize 3D Ribbon & Zero-G Astronaut Scene
    this.scene3d = new GoalScene3D(this.container);
    await this.scene3d.init();

    this.bindPortalInteractions();
    this.bindIntersectionObserver();
  }

  private bindIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined' || !this.container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.scene3d?.setShowRatio(1.0);
            this.container?.classList.add('is-in-view');
          } else {
            this.scene3d?.setShowRatio(0.2);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(this.container);
    this.cleanups.push(() => observer.disconnect());
  }

  private bindPortalInteractions(): void {
    if (!this.portalCards) return;

    this.portalCards.forEach((card) => {
      const onEnter = (): void => {
        audioManager.play('hover');
        card.classList.add('is-hovered');
      };

      const onLeave = (): void => {
        card.classList.remove('is-hovered');
        card.style.transform = '';
      };

      const onMove = (e: MouseEvent): void => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${px * 16}deg) rotateX(${-py * 16}deg) scale3d(1.02, 1.02, 1.02)`;
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      this.cleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  public destroy(): void {
    this.scene3d?.destroy();
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
  }
}
