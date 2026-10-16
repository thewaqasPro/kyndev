// src/data/pages/projects/index.ts

export * from './meta';
export * from './gallery';

import { projectsMetaData } from './meta';
import { projectsGalleryData } from './gallery';

export const projectsPageData = {
  meta: projectsMetaData,
  gallery: projectsGalleryData,
};

export default projectsPageData;
