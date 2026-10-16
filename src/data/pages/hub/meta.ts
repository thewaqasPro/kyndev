// src/data/pages/hub/meta.ts

export interface HubMetaData {
  title: string;
  description: string;
  ogUrl: string;
  scrollNavPath: string;
  scrollNavText: string;
  scrollNavSubtitle: string;
}

export const hubMetaData: HubMetaData = {
  title: 'KYNDEV - Engineering Showcase & Component Hub',
  description:
    'Explore the unified engineering hub of 3D WebGL prototypes, interactive physics stages, bespoke shaders, and production components across KYNDEV.',
  ogUrl: 'https://kyndev.com/hub',
  scrollNavPath: '/',
  scrollNavText: 'Home',
  scrollNavSubtitle: 'Return To',
};
