// src/data/pages/contact/index.ts

export * from './meta';
export * from './hero';
export * from './form';

import { contactMetaData } from './meta';
import { contactHeroData } from './hero';
import { contactFormData } from './form';

export const contactPageData = {
  meta: contactMetaData,
  hero: contactHeroData,
  form: contactFormData,
};

export default contactPageData;
