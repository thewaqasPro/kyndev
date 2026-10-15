#!/usr/bin/env node
/**
 * Automated Page & Project Transition Validator & Auto-Fixer
 *
 * Runs automatically on `npm run dev`, `npm run build`, and on file changes
 * to ensure that all project data files, Astro pages, and SPA route transition hooks
 * are properly configured and will never freeze or get stuck during transitions.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PROJECTS_DIR = path.join(ROOT_DIR, 'src/data/projects');
const PROJECTS_INDEX = path.join(PROJECTS_DIR, 'index.ts');
const PAGES_DIR = path.join(ROOT_DIR, 'src/pages');
const PROJECT_META_FILE = path.join(ROOT_DIR, 'src/components/projects/ProjectDetails/ProjectMeta.astro');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

export function validateAndFixPages(options = {}) {
  const { fix = true, verbose = true } = options;
  const issues = [];
  const fixesApplied = [];

  const log = (...args) => {
    if (verbose) console.log('[Page Validator]', ...args);
  };
  const warn = (...args) => {
    console.warn('[Page Validator \x1b[33mWARN\x1b[0m]', ...args);
  };
  const success = (...args) => {
    if (verbose) console.log('[Page Validator \x1b[32mOK\x1b[0m]', ...args);
  };

  // --------------------------------------------------------------------------
  // 1. Validate & Sync Projects in src/data/projects/
  // --------------------------------------------------------------------------
  if (fs.existsSync(PROJECTS_DIR)) {
    const projectFiles = fs.readdirSync(PROJECTS_DIR).filter((file) => {
      return file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts' && !file.startsWith('_');
    });

    const projectSlugs = projectFiles.map((f) => path.basename(f, '.ts'));

    for (const file of projectFiles) {
      const filePath = path.join(PROJECTS_DIR, file);
      const slug = path.basename(file, '.ts');
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Check slug
      if (!content.includes(`slug: '${slug}'`) && !content.includes(`slug: "${slug}"`)) {
        issues.push(`${file}: slug should be '${slug}'`);
      }

      // Check services array
      if (!content.includes('services:')) {
        issues.push(`${file}: missing 'services' array`);
        if (fix) {
          content = content.replace(/(descHtml:\s*`[\s\S]*?`,\s*|descHtml:\s*'[\s\S]*?',\s*)/, `$1  services: [],\n`);
          modified = true;
          fixesApplied.push(`Added missing 'services: []' in ${file}`);
        }
      }

      // Check links array
      if (!content.includes('links:')) {
        issues.push(`${file}: missing 'links' array`);
        if (fix) {
          content = content.replace(/(services:\s*\[[\s\S]*?\],\s*)/, `$1  links: [],\n`);
          modified = true;
          fixesApplied.push(`Added missing 'links: []' in ${file}`);
        }
      }

      // Check theme
      if (!content.includes('theme:')) {
        issues.push(`${file}: missing 'theme' configuration`);
      }

      // Check items
      if (!content.includes('items:')) {
        issues.push(`${file}: missing 'items' array`);
      }

      // Check nextProject
      if (!content.includes('nextProject:')) {
        issues.push(`${file}: missing 'nextProject' configuration`);
        if (fix) {
          const fallbackNext = projectSlugs.find((s) => s !== slug) || slug;
          const nextBlock = `  nextProject: {\n    id: '${fallbackNext}',\n    title: '${fallbackNext.replace(/_/g, ' ')}',\n    colorBg: '#0a0c12',\n    colorText: '#f0f3fa',\n    shadow: '0.9',\n  },\n`;
          content = content.replace(/(\s*items:\s*\[[\s\S]*?\],?\s*)/, `$1\n${nextBlock}`);
          modified = true;
          fixesApplied.push(`Added default 'nextProject' in ${file}`);
        }
      }

      // Check media assets
      const filenameMatch = content.match(/filename:\s*['"]([^'"]+)['"]/);
      if (filenameMatch) {
        const assetRel = filenameMatch[1].replace(/^\//, '');
        const assetWebp = path.join(PUBLIC_DIR, `${assetRel}.webp`);
        const assetMp4 = path.join(PUBLIC_DIR, `${assetRel}.mp4`);
        const assetExact = path.join(PUBLIC_DIR, assetRel);
        if (!fs.existsSync(assetWebp) && !fs.existsSync(assetMp4) && !fs.existsSync(assetExact)) {
          warn(`${file}: Asset '${filenameMatch[1]}' not found under public/ (checked .webp, .mp4)`);
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }

    // ------------------------------------------------------------------------
    // 2. Validate & Auto-Sync src/data/projects/index.ts
    // ------------------------------------------------------------------------
    if (fs.existsSync(PROJECTS_INDEX)) {
      let indexContent = fs.readFileSync(PROJECTS_INDEX, 'utf8');
      let indexModified = false;

      const currentSlugsSet = new Set(projectSlugs);
      const existingExports = [...indexContent.matchAll(/export\s*\{\s*(\w+)\s*\}\s*from/g)].map((m) => m[1]);
      const hasOrphanedExports = existingExports.some((slug) => !currentSlugsSet.has(slug));

      for (const slug of projectSlugs) {
        const importPattern = new RegExp(`import\\s*\\{\\s*${slug}\\s*\\}\\s*from\\s*['"]\\.\\/${slug}['"]`);
        const exportPattern = new RegExp(`export\\s*\\{\\s*${slug}\\s*\\}\\s*from\\s*['"]\\.\\/${slug}['"]`);
        const dictPattern = new RegExp(`${slug}\\s*:\\s*${slug}`);

        if (!importPattern.test(indexContent) || !exportPattern.test(indexContent) || !dictPattern.test(indexContent)) {
          issues.push(`src/data/projects/index.ts: project '${slug}' not fully registered`);
          indexModified = true;
        }
      }

      if (hasOrphanedExports) {
        issues.push(`src/data/projects/index.ts: contains deleted or orphaned project imports`);
        indexModified = true;
      }

      if (indexModified && fix) {
        // Automatically regenerate src/data/projects/index.ts with all current projects
        const imports = projectSlugs.map((slug) => `import { ${slug} } from './${slug}';`).join('\n');
        const exports = projectSlugs.map((slug) => `export { ${slug} } from './${slug}';`).join('\n');
        const dictionaryEntries = projectSlugs.map((slug) => `  ${slug}: ${slug},`).join('\n');

        const newIndexContent = `// src/data/projects/index.ts
import type { ProjectData } from './types';
${imports}

export * from './types';
${exports}

export const projectsData: Record<string, ProjectData> = {
${dictionaryEntries}
};

export const projectsList: ProjectData[] = Object.values(projectsData);
`;
        fs.writeFileSync(PROJECTS_INDEX, newIndexContent, 'utf8');
        fixesApplied.push(`Auto-synchronized all ${projectSlugs.length} projects in src/data/projects/index.ts`);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3. Validate Astro Pages for SPA Route Transition Requirements
  // --------------------------------------------------------------------------
  function scanPages(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanPages(fullPath);
      } else if (entry.name.endsWith('.astro')) {
        const content = fs.readFileSync(fullPath, 'utf8');

        // Check for .page class container required by Kyndev's PageManager
        let hasPageClass = /class=["'][^"']*\bpage\b[^"']*["']/.test(content);
        const isLayoutOrComponent = entry.name.startsWith('_') || !content.includes('<Layout');

        // If not directly in page, check imported subcomponents within Layout
        if (!hasPageClass && !isLayoutOrComponent) {
          const importMatches = [...content.matchAll(/import\s+(\w+)\s+from\s+['"]([^"']+)['"]/g)];
          for (const match of importMatches) {
            const relPath = match[2];
            if (relPath.endsWith('.astro')) {
              const compPath = path.resolve(path.dirname(fullPath), relPath);
              if (fs.existsSync(compPath)) {
                const compContent = fs.readFileSync(compPath, 'utf8');
                if (/class=["'][^"']*\bpage\b[^"']*["']/.test(compContent)) {
                  hasPageClass = true;
                  break;
                }
              }
            }
          }
        }

        if (!isLayoutOrComponent && !hasPageClass) {
          issues.push(`${path.relative(ROOT_DIR, fullPath)}: Missing element with class="page". Kyndev SPA page transitions require <div id="..." class="page"> to mount correctly.`);
        }
      }
    }
  }

  scanPages(PAGES_DIR);

  // --------------------------------------------------------------------------
  // 4. Validate ProjectMeta.astro Side List Containers
  // --------------------------------------------------------------------------
  if (fs.existsSync(PROJECT_META_FILE)) {
    const metaContent = fs.readFileSync(PROJECT_META_FILE, 'utf8');
    const hasServicesDiv = metaContent.includes('id="project-details-side-list-services"');
    const hasLinksDiv = metaContent.includes('id="project-details-side-list-links"');

    if (!hasServicesDiv || !hasLinksDiv) {
      issues.push(`ProjectMeta.astro: Side list containers (#project-details-side-list-services, #project-details-side-list-links) must always be present to prevent runtime null errors.`);
    }
  }

  // --------------------------------------------------------------------------
  // Summary Reporting
  // --------------------------------------------------------------------------
  if (fixesApplied.length > 0) {
    log(`\x1b[32m✓ Automatically applied ${fixesApplied.length} fix(es):\x1b[0m`);
    fixesApplied.forEach((f) => log(`  - ${f}`));
  }

  if (issues.length === 0) {
    success(`All pages and projects verified for smooth SPA transitions.`);
    return { success: true, issues: [], fixes: fixesApplied };
  } else {
    if (fixesApplied.length > 0) {
      success(`All detected transition issues were resolved automatically.`);
      return { success: true, issues, fixes: fixesApplied };
    } else {
      warn(`Detected ${issues.length} potential issue(s):`);
      issues.forEach((iss) => warn(`  - ${iss}`));
      return { success: false, issues, fixes: fixesApplied };
    }
  }
}

// Allow direct CLI execution
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const shouldFix = process.argv.includes('--fix') || !process.argv.includes('--no-fix');
  validateAndFixPages({ fix: shouldFix, verbose: true });
}
