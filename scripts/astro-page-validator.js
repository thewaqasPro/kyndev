import { validateAndFixPages } from './validate-pages.js';

/**
 * Astro Integration & Vite Plugin for Automatic Page Transition Verification
 *
 * Automatically verifies and auto-fixes page data, required arrays,
 * and DOM transition containers on:
 * - `npm run dev` startup
 * - `npm run build`
 * - Every file save/hot-update inside `src/data/projects` or `src/pages`
 */
export function pageValidatorIntegration() {
  return {
    name: 'kyndev-page-validator',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        // Run initial verification & auto-fix
        validateAndFixPages({ fix: true, verbose: false });

        updateConfig({
          vite: {
            plugins: [
              {
                name: 'vite-plugin-page-validator-watch',
                buildStart() {
                  validateAndFixPages({ fix: true, verbose: false });
                },
                handleHotUpdate({ file }) {
                  if (
                    file.includes('src/data/projects') ||
                    file.includes('src/pages') ||
                    file.includes('ProjectMeta.astro') ||
                    file.includes('ProjectDetails')
                  ) {
                    console.log(`\x1b[36m[Page Validator]\x1b[0m File changed (${file.split('/').slice(-2).join('/')}) - validating transition hooks...`);
                    validateAndFixPages({ fix: true, verbose: true });
                  }
                },
              },
            ],
          },
        });
      },
    },
  };
}

export default pageValidatorIntegration;
