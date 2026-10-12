/**
 * Kyndev V2 Audio Effect System
 * Lightweight audio helper for UI micro-interactions and hover feedbacks.
 */

class AudioManager {
  private static instance: AudioManager;
  private soundPool: Map<string, HTMLAudioElement[]> = new Map();
  private maxPoolSize: number = 3;

  public static getInstance(): AudioManager {
    if (!this.instance) {
      this.instance = new AudioManager();
    }
    return this.instance;
  }

  /**
   * Plays a sound effect with safe error handling and pool recycling
   */
  public play(url: string, volume: number = 0.15): void {
    if (typeof window === 'undefined') return;

    try {
      let pool = this.soundPool.get(url);
      if (!pool) {
        pool = [];
        this.soundPool.set(url, pool);
      }

      // Find an available idle audio element or allocate a new one
      let audio = pool.find((a) => a.paused || a.ended);
      if (!audio) {
        if (pool.length < this.maxPoolSize) {
          audio = new Audio(url);
          pool.push(audio);
        } else {
          // Recycle the oldest
          audio = pool[0];
        }
      }

      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Suppress browser autoplay restrictions cleanly
      });
    } catch (_) {}
  }

  /**
   * Convenience helper for standard Kyndev card hover audio
   */
  public playHover(): void {
    this.play('/assets/audios/hover_0.ogg', 0.15);
  }
}

export const audioManager = AudioManager.getInstance();
