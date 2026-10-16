// src/data/pages/home/index.ts

export * from './meta';
export * from './hero';
export * from './heroTools';
export * from './reel';
export * from './featured';
export * from './goal';

import { homeMetaData } from './meta';
import { homeHeroData } from './hero';
import { heroToolsData } from './heroTools';
import { homeReelData } from './reel';
import { homeFeaturedData } from './featured';
import { homeGoalData } from './goal';

export const homePageData = {
  meta: homeMetaData,
  hero: homeHeroData,
  heroTools: heroToolsData,
  reel: homeReelData,
  featured: homeFeaturedData,
  goal: homeGoalData,
};

export default homePageData;
