# KYNDEV Content Management Guide

Welcome to the KYNDEV content management architecture. All website copy, headings, numbers, links, client logos, awards, team profiles, and form configurations have been externalized from Astro templates and centralized into a modular, strictly typed TypeScript data layer under `src/data/`.

This allows developers and content editors to update website text, metadata, and media links safely without navigating HTML templates or risking changes to WebGL shaders, SPA routing, or page layout structures.

---

## 1. Directory Structure

Content is organized hierarchically by domain and page:

```
src/data/
├── common/                             # Shared site-wide chrome components
│   ├── header.ts                       # Navigation links, logo label, CTA button
│   ├── footer.ts                       # Copyright, socials, status indicators
│   ├── endSection.ts                   # Universal conversation / contact CTA banner
│   └── index.ts                        # Barrel export for all common data
│
├── pages/                              # Individual page content directories
│   ├── home/                           # Flagship Homepage (/) and /hero-tools
│   │   ├── meta.ts                     # SEO title, description, OG tags, scroll nav
│   │   ├── hero.ts                     # Original Balloons hero title, desc, CTA
│   │   ├── heroTools.ts                # 3D Marketing Tools deck copy, HUD data
│   │   ├── reel.ts                     # Video showreel title, duration, Vimeo URL
│   │   ├── featured.ts                 # 12 featured work showcases & tags
│   │   ├── goal.ts                     # Mission paragraphs & tunnel text lines
│   │   └── index.ts                    # Aggregated homePageData object
│   │
│   ├── about/                          # About Studio (/about)
│   │   ├── meta.ts                     # About page SEO metadata & scroll target
│   │   ├── who.ts                      # Studio manifesto, wordmarks, team bios
│   │   ├── clients.ts                  # Client logos organized by carousel row
│   │   ├── awards.ts                   # 58 industry awards, articles, speaking talks
│   │   ├── capability.ts               # Strategy, Creative, Tech, Production pillars
│   │   └── index.ts                    # Aggregated aboutPageData object
│   │
│   ├── services/                       # Services Suite (/services)
│   │   ├── meta.ts                     # Services overview SEO metadata
│   │   ├── hero.ts                     # Header eyebrow, headline, intro copy
│   │   ├── capabilitiesShowcase.ts     # Capabilities matrix cards & feature tags
│   │   ├── process.ts                  # 4-stage delivery methodology
│   │   ├── philosophy.ts               # Studio ethos values and commitments
│   │   └── index.ts                    # Aggregated servicesPageData object
│   │
│   ├── contact/                        # Contact Portal (/contact)
│   │   ├── meta.ts                     # Contact page SEO metadata
│   │   ├── hero.ts                     # Contact hero headline & prompt
│   │   ├── form.ts                     # Service pills, budget ranges, office addresses
│   │   └── index.ts                    # Aggregated contactPageData object
│   │
│   ├── projects/                       # Projects Index (/projects)
│   │   ├── meta.ts                     # Projects gallery SEO metadata
│   │   ├── gallery.ts                  # Gallery title & filter settings
│   │   └── index.ts                    # Aggregated projectsPageData object
│   │
│   └── hub/                            # Engineering & Component Hub (/hub)
│       ├── meta.ts                     # Hub SEO metadata
│       ├── hero.ts                     # Hub hero headline & filter categories
│       ├── cards.ts                    # Prototype cards, routes, status badges
│       └── index.ts                    # Aggregated hubPageData object
│
├── projectsData.ts                     # 20 detailed case study definitions
└── servicesData.ts                     # 6 deep service verticals & deliverables
```

---

## 2. Common Editing Workflows

### How to Update Header or Footer Links
Open `src/data/common/header.ts` or `src/data/common/footer.ts`.
```typescript
export const headerData: HeaderData = {
  logoText: 'KYNDEV',
  navLinks: [
    { label: 'Work', href: '/projects', isExternal: false },
    { label: 'Services', href: '/services', isExternal: false },
    { label: 'About', href: '/about', isExternal: false },
  ],
  cta: {
    label: 'Start Project',
    href: '/contact',
  },
};
```

### How to Edit Home Hero or 3D Marketing Tools
- To change the headline or button for the 3D Marketing Tools deck, edit `src/data/pages/home/heroTools.ts`:
```typescript
export const heroToolsData: HeroToolsData = {
  tag: 'Performance Marketing Ecosystem',
  title: 'We engineer high-converting campaigns across',
  titleAccent: 'Google, Meta, HubSpot & Klaviyo',
  description: 'Scale your brand with battle-tested paid acquisition...',
  ctaText: 'Explore Our Services →',
  ctaLink: '/services',
  scatterButtonText: 'Scatter Stack',
  defaultHud: {
    icon: 'G',
    name: 'Google Ads',
    subtitle: 'PPC & Search Scaling',
    hint: 'Click or drag any 3D tool badge to toss & inspect',
  },
};
```

### How to Add or Remove Client Logos
Open `src/data/pages/about/clients.ts`. Logos are arranged into carousel rows:
```typescript
export const aboutClientsData: AboutClientsData = {
  title: 'BRANDS WE WORK WITH',
  description: 'Trusted by global brands, cultural institutions...',
  carouselRows: [
    [
      { src: '/assets/images/logo/@logo--cocacola.svg', alt: 'Coca Cola' },
      { src: '/assets/images/logo/@logo--maxmara.svg', alt: 'Max Mara' },
      // Add a new logo here:
      { src: '/assets/images/logo/@logo--newclient.svg', alt: 'New Client' },
    ],
  ],
};
```

### How to Update Studio Awards & Conference Talks
Open `src/data/pages/about/awards.ts`. You can add new award items, articles, or speaking engagements:
```typescript
export const aboutAwardsData: AboutAwardsData = {
  awardsCategory: {
    title: 'Awards',
    totalCount: '59',
    groups: [
      {
        organization: 'Awwwards',
        items: [
          { count: '001', label: 'Site of the Year' },
          // ...
        ],
      },
    ],
  },
  // ...
};
```

### How to Update Contact Details or Budget Options
Open `src/data/pages/contact/form.ts`.
```typescript
export const contactFormData: ContactFormData = {
  email: 'hello@kyndstudio.com',
  phone: '+1 (778) 594-5459',
  address: 'Rossland, B.C (HQ) & Bristol, UK',
  statusBadge: 'Available for Q2/Q3 Projects',
  // ...
};
```

---

## 3. Backward Compatibility & Component Architecture

Every Astro component in KYNDEV implements an optional-prop pattern:

```astro
---
// Example: Component.astro
import { sectionData, type SectionData } from '../../data/pages/section';

export interface Props extends Partial<SectionData> {}

const {
  title = sectionData.title,
  description = sectionData.description,
} = Astro.props;
---
```

### Why this matters:
1. **Zero Boilerplate:** When imported on a standard page (`<Hero />`), the component automatically loads its centralized data file.
2. **Flexible Overrides:** You can still pass ad-hoc props for testing, A/B experiments, or isolated previews (`<Hero title="Custom Experiment Headline" />`).
3. **Pristine DOM:** Element IDs (e.g. `#about-who`, `#services-hero`), CSS classes, and `data-link-type` attributes are preserved exactly, preventing regressions in SPA routing, WebGL shaders, or virtual scrolling.

---

## 4. Quality Assurance & Type Safety

Whenever you edit files in `src/data/`:

1. **Verify TypeScript compilation:**
   ```bash
   npx tsc --noEmit
   ```
   *Ensures all required fields, URLs, and array types conform strictly to their TypeScript interfaces.*

2. **Verify SPA Page Transitions:**
   ```bash
   npm run check:pages
   ```
   *Guarantees that page container IDs and transition targets match the routing registry.*

3. **Verify Production Build:**
   ```bash
   npm run build
   ```
   *Renders all 34 static HTML routes and confirms zero asset or bundling errors.*
