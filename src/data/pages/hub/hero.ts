// src/data/pages/hub/hero.ts

export interface HubFilterOption {
  id: string;
  label: string;
  active?: boolean;
}

export interface HubHeroData {
  eyebrow: string;
  title: string;
  description: string;
  filters: HubFilterOption[];
}

export const hubHeroData: HubHeroData = {
  eyebrow: 'KYNDEV Engineering // Showcase & Prototype Hub',
  title: 'Interactive 3D Stages, Physics & Architecture Hub',
  description:
    'A unified engineering catalog of live production pages, 3D WebGL physics prototypes, bespoke shaders, and modular components built across the KYNDEV ecosystem.',
  filters: [
    { id: 'all', label: 'All Experiences', active: true },
    { id: 'hero', label: 'Hero Prototypes' },
    { id: 'pages', label: 'Flagship Pages' },
    { id: 'services', label: 'Services Suite' },
    { id: 'cases', label: 'Case Studies' },
  ],
};
