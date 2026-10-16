// src/data/pages/services/index.ts

export * from './meta';
export * from './hero';
export * from './capabilitiesShowcase';
export * from './process';
export * from './philosophy';

import { servicesMetaData } from './meta';
import { servicesHeroData } from './hero';
import { servicesCapabilitiesShowcaseData } from './capabilitiesShowcase';
import { servicesProcessData } from './process';
import { servicesPhilosophyData } from './philosophy';

export const servicesPageData = {
  meta: servicesMetaData,
  hero: servicesHeroData,
  showcase: servicesCapabilitiesShowcaseData,
  process: servicesProcessData,
  philosophy: servicesPhilosophyData,
};

export default servicesPageData;
