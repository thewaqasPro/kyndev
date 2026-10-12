/**
 * Kyndev V2 Core Math & Easing Library
 * Standard math utilities used across 3D physics, camera interpolation, and UI shaders.
 */

export const math = {
  /**
   * Linear interpolation between a and b by t (0..1)
   */
  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  },

  /**
   * Clamps a value between min and max
   */
  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  },

  /**
   * Clamps a value between 0 and 1
   */
  saturate(value: number): number {
    return Math.max(0, Math.min(1, value));
  },

  /**
   * Re-maps a number from one range [inMin, inMax] to [outMin, outMax] with optional easing
   */
  fit(
    val: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
    easeFn?: (t: number) => number
  ): number {
    const t = math.saturate((val - inMin) / (inMax - inMin));
    const easedT = easeFn ? easeFn(t) : t;
    return outMin + (outMax - outMin) * easedT;
  },

  /**
   * Frame-rate independent exponential damping
   */
  damp(current: number, target: number, lambda: number, dt: number): number {
    return math.lerp(current, target, 1 - Math.exp(-lambda * dt));
  },

  /**
   * Smooth Hermite interpolation between 0 and 1
   */
  smoothstep(min: number, max: number, value: number): number {
    const x = math.saturate((value - min) / (max - min));
    return x * x * (3 - 2 * x);
  },
};

export const ease = {
  /**
   * Exponential Ease Out (Kyndev's signature entrance curve)
   */
  expoOut(t: number): number {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },

  /**
   * Exponential Ease In-Out
   */
  expoInOut(t: number): number {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  },

  /**
   * Smooth Cubic Ease Out
   */
  cubicOut(t: number): number {
    const f = t - 1;
    return f * f * f + 1;
  },

  /**
   * Smooth Cubic Ease In-Out
   */
  cubicInOut(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
};
