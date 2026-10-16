# Site Content Centralization & Modular Data Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize all website copy, text, labels, team bios, client logos, awards, and section content currently hardcoded in Astro components into dedicated, typed, and structured data files organized by page and section in `src/data/pages/` and `src/data/common/`.

**Architecture:** Create a modular data layer where each page has its own dedicated directory under `src/data/pages/` with individual files for each section (plus a page-level `meta.ts` and `index.ts` barrel). Create `src/data/common/` for shared chrome (header, footer, end-section). Refactor Astro components to consume these structured data objects with sensible default props, preserving 100% backward compatibility and keeping components clean of raw copy.

**Tech Stack:** Astro, TypeScript, Node.js

**Spec:** User request to extract all hardcoded content into separate page folders with separate section files, accompanied by an easy-to-read, maintainable content management plan.

## Global Constraints
- Preserve all existing CSS classes, IDs, DOM hierarchies, and data attributes (`data-link-type`, etc.) so SPA page transitions, WebGL shaders, and runtime physics controllers continue to work seamlessly.
- Preserve component prop interfaces so components can still accept optional overrides if needed, with defaults sourced directly from the new data files.
- All data files must be strictly typed in TypeScript with clean JSDoc comments explaining where and how each field renders.
- Must pass `npm run check:pages` and `npm run build` after each milestone.

## Review Focus
1. **Dynamic Lists & Carousels:** Ensure array items (e.g., client logo paths, award records, expertise lists, process steps, philosophy cards) retain identical structure, order, and keys.
2. **Inline Links & Target Attributes:** Ensure external URLs (awards, social media, newsroom articles) retain `target="_blank"` and `rel` attributes.
3. **Typography & Line Breaks:** Sections like `AboutWho` with explicit desktop/mobile line breaks (`<br class="is-desktop" />`) must preserve text layout without breaking responsive typography.
4. **Backward Compatibility:** Components must continue functioning whether passed props or loaded with default data.
5. **No Broken Imports:** All barrel `index.ts` files must properly export both data constants and TypeScript types.

---

### Task 1: Scaffolding Directory Structure & Shared Chrome Data (`src/data/common/`)

**Files:**
- Create: `src/data/common/header.ts`
- Create: `src/data/common/footer.ts`
- Create: `src/data/common/endSection.ts`
- Create: `src/data/common/index.ts`
- Modify: `src/components/common/Header/Header.astro`
- Modify: `src/components/common/Footer/Footer.astro`
- Modify: `src/components/common/EndSection/EndSection.astro`

**Interfaces:**
- Produces: `HeaderData`, `FooterData`, `EndSectionData` and their default instances (`headerData`, `footerData`, `endSectionData`).

- [ ] **Step 1: Create `src/data/common/header.ts`**
  Define `HeaderData` interface and export `headerData` containing logo config, general contact email, and primary navigation links.

- [ ] **Step 2: Create `src/data/common/footer.ts`**
  Define `FooterData` interface and export `footerData` containing physical address lines, maps URL, general email, business email, social media links (Twitter, Instagram, LinkedIn, GitHub), copyright notice, and studio tagline.

- [ ] **Step 3: Create `src/data/common/endSection.ts`**
  Define `EndSectionData` interface and export `endSectionData` containing subtitle, title lines, and scroll invitation copy.

- [ ] **Step 4: Create `src/data/common/index.ts`**
  Export all data and types from `header.ts`, `footer.ts`, and `endSection.ts`.

- [ ] **Step 5: Refactor `Header.astro`, `Footer.astro`, and `EndSection.astro`**
  Import the common data files and use them as default prop values.

- [ ] **Step 6: Verification & Commit**
  Run `npx tsc --noEmit && npm run check:pages`.
  Commit: `refactor(data): extract common header, footer, and end-section content into src/data/common`

---

### Task 2: Home Page Content Extraction (`src/data/pages/home/`)

**Files:**
- Create: `src/data/pages/home/meta.ts`
- Create: `src/data/pages/home/hero.ts`
- Create: `src/data/pages/home/heroTools.ts`
- Create: `src/data/pages/home/reel.ts`
- Create: `src/data/pages/home/featured.ts`
- Create: `src/data/pages/home/goal.ts`
- Create: `src/data/pages/home/index.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/hero-tools.astro`
- Modify: `src/components/home/Hero/Hero.astro`
- Modify: `src/components/home/HeroTools/HeroTools.astro`
- Modify: `src/components/home/Reel/Reel.astro`
- Modify: `src/components/home/Featured/Featured.astro`
- Modify: `src/components/home/Goal/Goal.astro`

**Interfaces:**
- Produces: `HomeMetaData`, `HomeHeroData`, `HeroToolsData`, `HomeReelData`, `HomeFeaturedData`, `HomeGoalData`, and aggregated `homePageData`.

- [ ] **Step 1: Create `src/data/pages/home/meta.ts`**
  Store SEO title, description, OpenGraph metadata, scroll nav link path (`/about`), and label (`About Us`).

- [ ] **Step 2: Create `src/data/pages/home/hero.ts`**
  Store main balloons hero headline (`Digital Marketing That Drives Growth.`) and scroll indicator text (`scroll to explore`).

- [ ] **Step 3: Create `src/data/pages/home/heroTools.ts`**
  Store 3D tools section tag (`Performance Marketing Ecosystem`), headline, description, CTA buttons, and default HUD information.

- [ ] **Step 4: Create `src/data/pages/home/reel.ts`**
  Store reel title line 1 (`Strategy, Design`), line 2 (`& Digital Growth`), paragraph description, and CTA button text/URL.

- [ ] **Step 5: Create `src/data/pages/home/featured.ts`**
  Store title (`Featured Work`), disclaimer text, and list of featured showcase project IDs/metadata.

- [ ] **Step 6: Create `src/data/pages/home/goal.ts`**
  Store section title (`Where Creative Ideas Become Immersive Experiences`), narrative paragraphs, and tunnel animation lines.

- [ ] **Step 7: Create `src/data/pages/home/index.ts`**
  Export all section files and an aggregated `homePageData` object.

- [ ] **Step 8: Refactor Home components and pages**
  Update `src/pages/index.astro`, `src/pages/hero-tools.astro`, and each corresponding component to import and use the data.

- [ ] **Step 9: Verification & Commit**
  Run `npx tsc --noEmit && npm run check:pages`.
  Commit: `refactor(data): extract home page content into src/data/pages/home/`

---

### Task 3: About Page Content Extraction (`src/data/pages/about/`)

**Files:**
- Create: `src/data/pages/about/meta.ts`
- Create: `src/data/pages/about/who.ts`
- Create: `src/data/pages/about/clients.ts`
- Create: `src/data/pages/about/awards.ts`
- Create: `src/data/pages/about/capability.ts`
- Create: `src/data/pages/about/index.ts`
- Modify: `src/pages/about.astro`
- Modify: `src/components/about/AboutWho/AboutWho.astro`
- Modify: `src/components/about/AboutClients/AboutClients.astro`
- Modify: `src/components/about/AboutAwards/AboutAwards.astro`
- Modify: `src/components/about/AboutCapability/AboutCapability.astro`

**Interfaces:**
- Produces: `AboutMetaData`, `AboutWhoData`, `AboutClientsData`, `AboutAwardsData`, `AboutCapabilityData`, and aggregated `aboutPageData`.

- [ ] **Step 1: Create `src/data/pages/about/meta.ts`**
  Store About page SEO title, description, OG URL, and scroll nav target (`/projects`).

- [ ] **Step 2: Create `src/data/pages/about/who.ts`**
  Extract studio motto, headline lines, descriptive statements, and team roster (names, roles, numbers, bio blurbs).

- [ ] **Step 3: Create `src/data/pages/about/clients.ts`**
  Extract title (`BRANDS WE WORK WITH`), subtitle description, and the array of client logo image paths organized by carousel row.

- [ ] **Step 4: Create `src/data/pages/about/awards.ts`**
  Extract award categories (Awwwards, FWA, CSSDA, Webby, Lovie, Drum, CommArts) with win counts and titles, article feature links with external URLs, and conference speaking talks.

- [ ] **Step 5: Create `src/data/pages/about/capability.ts`**
  Extract section title, subtitle, and the 4 capability pillars (Strategy, Creative, Tech, Production) with their bullet lists.

- [ ] **Step 6: Create `src/data/pages/about/index.ts`**
  Export all section data and types from `src/data/pages/about/`.

- [ ] **Step 7: Refactor About components and `about.astro`**
  Connect `AboutWho.astro`, `AboutClients.astro`, `AboutAwards.astro`, and `AboutCapability.astro` to their respective data files.

- [ ] **Step 8: Verification & Commit**
  Run `npx tsc --noEmit && npm run check:pages`.
  Commit: `refactor(data): extract about page content into src/data/pages/about/`

---

### Task 4: Services Page Content Extraction (`src/data/pages/services/`)

**Files:**
- Create: `src/data/pages/services/meta.ts`
- Create: `src/data/pages/services/hero.ts`
- Create: `src/data/pages/services/capabilitiesShowcase.ts`
- Create: `src/data/pages/services/process.ts`
- Create: `src/data/pages/services/philosophy.ts`
- Create: `src/data/pages/services/index.ts`
- Modify: `src/pages/services.astro`
- Modify: `src/components/services/ServicesHero.astro`
- Modify: `src/components/services/ServicesCapabilitiesShowcase.astro`
- Modify: `src/components/services/ServicesProcess.astro`
- Modify: `src/components/services/ServicesPhilosophy.astro`

**Interfaces:**
- Produces: `ServicesMetaData`, `ServicesHeroData`, `ServicesProcessData`, `ServicesPhilosophyData`, and aggregated `servicesPageData`.

- [ ] **Step 1: Create `src/data/pages/services/meta.ts`**
  Store Services SEO title, description, and scroll nav target (`/projects`).

- [ ] **Step 2: Create `src/data/pages/services/hero.ts`**
  Store services eyebrow tag, main heading, and narrative paragraph.

- [ ] **Step 3: Create `src/data/pages/services/capabilitiesShowcase.ts`**
  Extract capability showcase cards, icon marks, and highlight tags.

- [ ] **Step 4: Create `src/data/pages/services/process.ts`**
  Extract methodology eyebrow, heading, and the 4-step process array (Discovery, Architecture, Production, Optimization).

- [ ] **Step 5: Create `src/data/pages/services/philosophy.ts`**
  Extract studio ethos tag, heading, and core studio value pillars.

- [ ] **Step 6: Create `src/data/pages/services/index.ts`**
  Export all section files and types, linking cleanly with existing `src/data/servicesData.ts`.

- [ ] **Step 7: Refactor Services components and `services.astro`**
  Update components to read from `src/data/pages/services/`.

- [ ] **Step 8: Verification & Commit**
  Run `npx tsc --noEmit && npm run check:pages`.
  Commit: `refactor(data): extract services page content into src/data/pages/services/`

---

### Task 5: Contact, Projects Gallery, and Hub Page Extraction

**Files:**
- Create: `src/data/pages/contact/meta.ts`
- Create: `src/data/pages/contact/hero.ts`
- Create: `src/data/pages/contact/form.ts`
- Create: `src/data/pages/contact/index.ts`
- Create: `src/data/pages/projects/meta.ts`
- Create: `src/data/pages/projects/gallery.ts`
- Create: `src/data/pages/projects/index.ts`
- Create: `src/data/pages/hub/meta.ts`
- Create: `src/data/pages/hub/hero.ts`
- Create: `src/data/pages/hub/cards.ts`
- Create: `src/data/pages/hub/index.ts`
- Modify: `src/pages/contact.astro`
- Modify: `src/components/contact/ContactHero.astro`
- Modify: `src/components/contact/ContactForm.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/components/projects/ProjectsGallery/ProjectsGallery.astro`
- Modify: `src/pages/hub.astro`
- Modify: `src/components/hub/HubHero.astro`
- Modify: `src/components/hub/HubCards.astro`

**Interfaces:**
- Produces: `ContactPageData`, `ProjectsPageData`, `HubPageData`.

- [ ] **Step 1: Create `src/data/pages/contact/` files**
  Extract Contact SEO metadata, Hero copy, and Form options (service checklist pills, office locations, email, phone).

- [ ] **Step 2: Create `src/data/pages/projects/` files**
  Extract Projects Gallery SEO metadata, header title, filter categories, and gallery description.

- [ ] **Step 3: Create `src/data/pages/hub/` files**
  Extract Hub SEO metadata, Hero copy, and preview navigation card definitions.

- [ ] **Step 4: Refactor Contact, Projects, and Hub components & pages**
  Update components to source copy from their respective data files.

- [ ] **Step 5: Verification & Commit**
  Run `npx tsc --noEmit && npm run check:pages`.
  Commit: `refactor(data): extract contact, projects, and hub content into modular data files`

---

### Task 6: Comprehensive Validation, Production Build & Documentation

**Files:**
- Create: `docs/CONTENT_MANAGEMENT_GUIDE.md`
- Modify: `documentation/pages/project-overview-structure.html`
- Modify: `public/documentation/pages/project-overview-structure.html`

- [ ] **Step 1: Create `docs/CONTENT_MANAGEMENT_GUIDE.md`**
  Write an intuitive, developer- and editor-friendly guide explaining:
  - Exactly how content is structured by page and section.
  - How to edit text, numbers, links, and lists without touching code.
  - How to add new sections or pages.
  - How type safety protects editors from broken links or missing fields.

- [ ] **Step 2: Update Interactive Documentation HTML**
  Update the web documentation in `documentation/` and `public/documentation/` with the new file structure map.

- [ ] **Step 3: Full Project Verification & Build Check**
  Run:
  - `npx tsc --noEmit`
  - `npm run check:pages`
  - `npm run build`
  Verify all 34 static pages compile cleanly with 0 errors.

- [ ] **Step 4: Final Commit**
  Commit: `docs(data): add content management guide and document modular data architecture`
