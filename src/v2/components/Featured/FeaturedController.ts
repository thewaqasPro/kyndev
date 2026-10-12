import { audioManager } from '../../shared/audio';
import { FeaturedShaderRenderer } from './FeaturedShader';

/**
 * Controller for Kyndev V2 Featured Work Component
 *
 * Coordinates:
 * 1. 2.5D Raymarching Depth Displacement Shader with Bokeh Depth of Field
 * 2. Dynamic background palette color morphing per project
 * 3. Cursor follower physics and interactive row hover states
 * 4. Tag category filters and audio cues
 */
export class FeaturedController {
  private container: HTMLElement | null = null;
  private projectRows: NodeListOf<HTMLElement> | null = null;
  private filterPills: NodeListOf<HTMLElement> | null = null;
  private previewCard: HTMLElement | null = null;
  private previewCanvas: HTMLCanvasElement | null = null;
  private previewTitle: HTMLElement | null = null;
  private previewTags: HTMLElement | null = null;
  private shaderRenderer: FeaturedShaderRenderer | null = null;
  private cleanups: Array<() => void> = [];

  public init(rootElement: HTMLElement): void {
    this.container = rootElement;
    this.projectRows = this.container.querySelectorAll('.featured-project-row');
    this.filterPills = this.container.querySelectorAll('.featured-filter-pill');
    this.previewCard = this.container.querySelector('.featured-floating-preview');
    this.previewCanvas = this.container.querySelector('.featured-shader-canvas');
    this.previewTitle = this.container.querySelector('.featured-preview-title');
    this.previewTags = this.container.querySelector('.featured-preview-tags');

    // Initialize 2.5D Displacement WebGL Renderer
    if (this.previewCanvas) {
      this.shaderRenderer = new FeaturedShaderRenderer(this.previewCanvas);
      this.shaderRenderer.init();
    }

    this.bindRowEvents();
    this.bindFilterEvents();
  }

  private bindRowEvents(): void {
    if (!this.projectRows) return;

    this.projectRows.forEach((row) => {
      const id = row.getAttribute('data-id') || 'oryzo_ai';
      const bg = row.getAttribute('data-bg') || '#0b0c0e';
      const text = row.getAttribute('data-text') || '#ffffff';
      const title = row.getAttribute('data-title') || '';
      const tags = row.getAttribute('data-tags') || '';

      const onEnter = (e: MouseEvent): void => {
        audioManager.play('hover');
        if (this.container) {
          this.container.style.setProperty('--active-accent-bg', bg);
          this.container.style.setProperty('--active-accent-text', text);
          this.container.classList.add('is-project-hovered');
        }

        row.classList.add('is-hovered');

        // Update 2.5D shader project and hover trigger
        if (this.shaderRenderer) {
          this.shaderRenderer.setProject(id);
          this.shaderRenderer.setHover(1.0);
        }

        // Update floating preview metadata
        if (this.previewCard) {
          if (this.previewTitle) this.previewTitle.textContent = title;
          if (this.previewTags) this.previewTags.textContent = tags;
          this.previewCard.classList.add('is-visible');
          this.updatePreviewPos(e, row);
        }
      };

      const onMove = (e: MouseEvent): void => {
        this.updatePreviewPos(e, row);
      };

      const onLeave = (): void => {
        row.classList.remove('is-hovered');
        if (this.container) {
          this.container.classList.remove('is-project-hovered');
        }
        if (this.shaderRenderer) {
          this.shaderRenderer.setHover(0.0);
        }
        if (this.previewCard) {
          this.previewCard.classList.remove('is-visible');
        }
      };

      const onClick = (): void => {
        audioManager.play('click');
      };

      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mousemove', onMove);
      row.addEventListener('mouseleave', onLeave);
      row.addEventListener('click', onClick);

      this.cleanups.push(() => {
        row.removeEventListener('mouseenter', onEnter);
        row.removeEventListener('mousemove', onMove);
        row.removeEventListener('mouseleave', onLeave);
        row.removeEventListener('click', onClick);
      });
    });
  }

  private updatePreviewPos(e: MouseEvent, row: HTMLElement): void {
    if (!this.previewCard || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left + 28;
    const y = e.clientY - rect.top - 85;
    this.previewCard.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // Calculate normalized cursor coordinates across the row for raymarching perspective tilt
    const rowRect = row.getBoundingClientRect();
    const nx = ((e.clientX - rowRect.left) / rowRect.width) * 2 - 1;
    const ny = -(((e.clientY - rowRect.top) / rowRect.height) * 2 - 1);
    this.shaderRenderer?.setMouse(nx, ny);
  }

  private bindFilterEvents(): void {
    if (!this.filterPills || !this.projectRows) return;

    this.filterPills.forEach((pill) => {
      const filter = pill.getAttribute('data-filter') || 'all';

      const onClick = (): void => {
        audioManager.play('click');

        // Update active pill UI
        this.filterPills?.forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');

        // Filter project rows with fade transition
        this.projectRows?.forEach((row) => {
          const category = row.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            row.style.display = 'flex';
            setTimeout(() => {
              row.style.opacity = '1';
              row.style.transform = 'translateY(0)';
            }, 10);
          } else {
            row.style.opacity = '0';
            row.style.transform = 'translateY(8px)';
            setTimeout(() => {
              row.style.display = 'none';
            }, 250);
          }
        });
      };

      pill.addEventListener('click', onClick);
      this.cleanups.push(() => pill.removeEventListener('click', onClick));
    });
  }

  public destroy(): void {
    this.shaderRenderer?.destroy();
    this.cleanups.forEach((c) => c());
    this.cleanups = [];
  }
}
