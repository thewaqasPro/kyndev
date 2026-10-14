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

## Architecture & Codebase Guidelines

1. **Modular 3D / WebGL Runtime**: The production WebGL engine lives in [`src/scripts/runtime/`](file:///Users/waqas/DEV/kyndev.com/src/scripts/runtime/) with modular submodules for:
   - `core/`: Properties, MathUtils, ScrollDomRange, Tween, Line
   - `webgl/`: Stage3D, FboHelper, postprocessing, shaders, geometry
   - `navigation/`: PageManager, ScrollManager, page controllers (`HomePage`, `AboutPage`, `ProjectsPage`, `ProjectPage`)
   - `scenes/`: 3D interactive stages (`hero/HomeBalloons`, `tunnels/GoalTunnels`, `lunar/AboutHero`, `fluid/FlipFluid`, `product/ProjectDetails`)
   - `ui/`: Header, FooterSection, VideoOverlay, sound controls
   - `audio/`: WebAudio system and page sound controllers
2. **Components**: All Astro markup, component-scoped CSS, and local controllers live in [`src/components/`](file:///Users/waqas/DEV/kyndev.com/src/components/).
3. **Reference Integrity**: Keep [`src/scripts/runtime.js`](file:///Users/waqas/DEV/kyndev.com/src/scripts/runtime.js) untouched as the reference source. All modifications belong in `src/scripts/runtime/` and `src/components/`.
