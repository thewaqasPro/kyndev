/**
 * Kyndev V2 SplitType & Text Animator System
 * Handles character-by-character drum slot machine reels and tags ticker decoding.
 * Groups by words to ensure proper typographic wrapping across responsive widths.
 */

const SCRAMBLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ•#*%$!';

export class ProjectsTextAnimator {
  private element: HTMLElement;
  private originalText: string;
  private tracks: HTMLElement[] = [];
  public isHovered: boolean = false;

  constructor(titleEl: HTMLElement) {
    this.element = titleEl;
    this.originalText = titleEl.textContent?.trim() || '';
    this.initSlotReels();
  }

  private initSlotReels(): void {
    const words = this.originalText.split(' ');
    this.element.innerHTML = '';
    this.tracks = [];

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'slot-word';
      wordSpan.style.cssText = 'display: inline-block; white-space: nowrap;';

      const chars = Array.from(word);
      chars.forEach((char) => {
        const reel = document.createElement('span');
        reel.className = 'slot-reel';
        reel.style.cssText = `
          display: inline-block;
          overflow: hidden;
          vertical-align: baseline;
          line-height: 1.15;
          height: 1.15em;
        `;

        const track = document.createElement('span');
        track.className = 'slot-track';
        track.style.cssText = `
          display: inline-flex;
          flex-direction: column;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        `;

        const primary = document.createElement('span');
        primary.className = 'slot-char slot-primary';
        primary.textContent = char;
        primary.style.cssText = 'display: inline-block; height: 1.15em; line-height: 1.15;';

        const secondary = document.createElement('span');
        secondary.className = 'slot-char slot-secondary';
        secondary.textContent = char;
        secondary.style.cssText = 'display: inline-block; height: 1.15em; line-height: 1.15; opacity: 0.9;';

        track.appendChild(primary);
        track.appendChild(secondary);
        reel.appendChild(track);
        wordSpan.appendChild(reel);

        this.tracks.push(track);
      });

      this.element.appendChild(wordSpan);

      // Add spacing between words
      if (wordIndex < words.length - 1) {
        const spaceNode = document.createTextNode(' ');
        this.element.appendChild(spaceNode);
      }
    });
  }

  public triggerHover(isHovering: boolean): void {
    this.isHovered = isHovering;

    this.tracks.forEach((track, index) => {
      if (isHovering) {
        // Stagger forward slot spin
        const delay = index * 20;
        track.style.transitionDelay = `${delay}ms`;
        track.style.transform = 'translate3d(0, -50%, 0)';
      } else {
        // Reverse slot roll
        const delay = (this.tracks.length - 1 - index) * 12;
        track.style.transitionDelay = `${delay}ms`;
        track.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }
}

/**
 * Alphanumeric Scramble Hacker / Ticker Decode Animation for Tags
 */
export class TagScrambleAnimator {
  private element: HTMLElement;
  private originalText: string;
  private animFrameId: number | null = null;
  private startTime: number = 0;
  private duration: number = 420;

  constructor(tagsEl: HTMLElement) {
    this.element = tagsEl;
    this.originalText = tagsEl.textContent?.trim() || '';
  }

  public scramble(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }

    this.startTime = performance.now();
    const length = this.originalText.length;

    const step = (now: number) => {
      const elapsed = now - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1.0);
      const settledCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (i < settledCount || this.originalText[i] === ' ' || this.originalText[i] === '•') {
          scrambled += this.originalText[i];
        } else {
          scrambled += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      this.element.textContent = scrambled;

      if (progress < 1.0) {
        this.animFrameId = requestAnimationFrame(step);
      } else {
        this.element.textContent = this.originalText;
        this.animFrameId = null;
      }
    };

    this.animFrameId = requestAnimationFrame(step);
  }

  public reset(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.element.textContent = this.originalText;
  }
}
