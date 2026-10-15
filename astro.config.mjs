// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pageValidatorIntegration from './scripts/astro-page-validator.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://kyndev.com',
  integrations: [sitemap(), pageValidatorIntegration()],
  vite: {
    ssr: {
      noExternal: ['three', 'gsap', 'lenis']
    }
  }
});
