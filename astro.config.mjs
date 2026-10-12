// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kyndev.com',
  integrations: [sitemap()],
  vite: {
    ssr: {
      noExternal: ['three', 'gsap', 'lenis']
    }
  }
});
