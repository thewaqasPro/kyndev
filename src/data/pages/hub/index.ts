// src/data/pages/hub/index.ts

export * from './meta';
export * from './hero';
export * from './cards';

import { hubMetaData } from './meta';
import { hubHeroData } from './hero';
import { hubCardsData } from './cards';

export const hubPageData = {
  meta: hubMetaData,
  hero: hubHeroData,
  cards: hubCardsData,
};

export default hubPageData;
