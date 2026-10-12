## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Kyndev V2 Modular Architecture & Component System

When building, modifying, or creating components:

1. **Master Architecture Guide**: Consult [`src/v2/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/README.md) for architecture rules, core engine documentation, and component catalogs.
2. **Component Creation Workflow (SOP)**: Follow [`src/v2/docs/COMPONENT_CREATION_WORKFLOW.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/docs/COMPONENT_CREATION_WORKFLOW.md) when extracting new components from the monolithic `runtime.js`.
3. **Component Reference Documents**:
   - 3D Hero Scene: [`src/v2/components/Hero/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Hero/README.md)
   - Projects Gallery V1 (Card Tilt): [`src/v2/components/Projects/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/Projects/README.md)
   - Projects Gallery V2 (Image Card Scale): [`src/v2/components/ProjectsV2/README.md`](file:///Users/waqas/DEV/kyndev.com/src/v2/components/ProjectsV2/README.md)
4. **Golden Rule**: Never modify legacy production files (`src/scripts/runtime.js`, `src/pages/index.astro`, etc.). All modern modular work is contained in `src/v2/` and previewed under `/preview/*`.

