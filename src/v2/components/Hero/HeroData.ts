export interface BalloonConfig {
  color: string;
  sss: number;
  sssColor: string;
  isSemitransparent: boolean;
  isRough: boolean;
  isColored: boolean;
  isBlackWhite: boolean;
  radius: number;
  density: number;
  friction: number;
  restitution: number;
}

export const HERO_COLORS = [
  '#061dfb', // Blue (Kyndev default)
  '#ADFF00', // Lime
  '#f6000e', // Red
  '#7e09f5', // Purple
  '#ffc000', // Yellow
];

const DEFAULT_PHYSICS = {
  density: 1.0,
  friction: 2.0,
  restitution: 0.8,
};

export function createBalloonsData(accentColorHex: string = HERO_COLORS[0]): BalloonConfig[] {
  const list: BalloonConfig[] = [];
  const BASE_RADIUS = 1.2;

  // 1. Accent Colored Jacks (5 total: mixture of glossy and matte)
  for (let i = 0; i < 5; i++) {
    list.push({
      color: accentColorHex,
      sss: 0,
      sssColor: '#111111',
      isSemitransparent: false,
      isRough: i % 2 === 0,
      isColored: true,
      isBlackWhite: false,
      radius: BASE_RADIUS * (i === 0 ? 1.05 : 0.98),
      ...DEFAULT_PHYSICS,
    });
  }

  // 2. White / Pearl Jacks (7 total: mixture of matte and high-gloss)
  for (let i = 0; i < 7; i++) {
    list.push({
      color: '#ffffff',
      sss: 0,
      sssColor: '#111111',
      isSemitransparent: false,
      isRough: i < 4,
      isColored: false,
      isBlackWhite: false,
      radius: BASE_RADIUS * (i === 1 ? 1.08 : 1.0),
      ...DEFAULT_PHYSICS,
    });
  }

  // 3. Dark / Obsidian Jacks (7 total: mixture of matte and high-gloss)
  for (let i = 0; i < 7; i++) {
    list.push({
      color: '#111111',
      sss: 0,
      sssColor: '#111111',
      isSemitransparent: false,
      isRough: i < 4,
      isColored: false,
      isBlackWhite: false,
      radius: BASE_RADIUS * (i === 2 ? 1.06 : 0.96),
      ...DEFAULT_PHYSICS,
    });
  }

  return list;
}
