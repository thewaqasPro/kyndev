/**
 * Kyndev V3 Math & Easing Utilities
 *
 * Exact 1-to-1 reverse-engineered implementations from deobfuscated.js (MathUtils & Ease).
 */

export const math = {
  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  },

  saturate(value: number): number {
    return Math.max(0, Math.min(1, value));
  },

  lerp(start: number, end: number, alpha: number): number {
    return start + (end - start) * alpha;
  },

  fit(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    const norm = (value - inMin) / (inMax - inMin);
    return outMin + (outMax - outMin) * Math.max(0, Math.min(1, norm));
  },

  linearStep(edge0: number, edge1: number, x: number): number {
    return Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  },

  smoothstep(min: number, max: number, value: number): number {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  },

  damp(current: number, target: number, lambda: number, delta: number): number {
    return math.lerp(current, target, 1 - Math.exp(-lambda * delta));
  },

  cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const c = (p1 - p0) * 3;
    const b = (p2 - p1) * 3 - c;
    const a = p3 - p0 - c - b;
    const t2 = t * t;
    const t3 = t2 * t;
    return a * t3 + b * t2 + c * t + p0;
  },

  easeOutBack(t: number): number {
    return math.cubicBezier(0, 1.3, 1.1, 1, t);
  }
};

export const ease = {
  linear: (t: number): number => t,
  quadIn: (t: number): number => t * t,
  quadOut: (t: number): number => t * (2 - t),
  quadInOut: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  cubicIn: (t: number): number => t * t * t,
  cubicOut: (t: number): number => --t * t * t + 1,
  cubicInOut: (t: number): number => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  expoIn: (t: number): number => (t === 0 ? 0 : Math.pow(1024, t - 1)),
  expoOut: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  expoInOut: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(1024, t - 1);
    return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
  }
};
