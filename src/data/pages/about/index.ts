// src/data/pages/about/index.ts

export * from './meta';
export * from './who';
export * from './clients';
export * from './awards';
export * from './capability';

import { aboutMetaData } from './meta';
import { aboutWhoData } from './who';
import { aboutClientsData } from './clients';
import { aboutAwardsData } from './awards';
import { aboutCapabilityData } from './capability';

export const aboutPageData = {
  meta: aboutMetaData,
  who: aboutWhoData,
  clients: aboutClientsData,
  awards: aboutAwardsData,
  capability: aboutCapabilityData,
};

export default aboutPageData;
