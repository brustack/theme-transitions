[![brustack/theme-transitions](apps/showcase/public/og-image.png)](https://theme-transitions.brustack.dev)

# theme-transitions

[![made by brustack](https://img.shields.io/badge/MADE%20BY%20brustack-000000.svg?style=for-the-badge&labelColor=000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjYuNzcgMjI2Ljc3Ij48cG9seWdvbiBmaWxsPSIjRjRGMkVEIiBwb2ludHM9IjE1My43MyA4My4zOSAxNTMuNzMgMTUzLjczIDgzLjM5IDE1My43MyA4My4zOSAyMTMuNzMgMjEzLjczIDIxMy43MyAyMTMuNzMgODMuMzkgMTUzLjczIDgzLjM5Ii8%2BPHJlY3QgZmlsbD0iI0Y0RjJFRCIgeD0iODMuMzkiIHk9IjEzLjA0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48cmVjdCBmaWxsPSIjRjRGMkVEIiB4PSIxMy4wNCIgeT0iODMuMzkiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIvPjxyZWN0IGZpbGw9IiNGNEYyRUQiIHg9IjgzLjM5IiB5PSI4My4zOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIi8%2BPC9zdmc%2BCg%3D%3D)](https://github.com/brustack)
![Vanilla](https://img.shields.io/badge/Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=for-the-badge&logo=alpinedotjs&logoColor=black)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)

Animated theme transitions for the web, powered by the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). A framework-agnostic core with a thin adapter per framework.

- ✅ Multiple effects to choose from
- ✅ Zero flash of the wrong theme on load
- ✅ Syncs automatically with OS `prefers-color-scheme`
- ✅ Custom themes beyond light/dark
- ✅ Vue, React, Nuxt, Next.js, Alpine.js, and Angular adapters, all built on the same framework-agnostic core

<br>

<p align="center">
  <img src=".github/assets/demo.gif" alt="Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor" />
</p>

<p align="center">Check out the <a href="https://theme-transitions.brustack.dev">Live Example</a> to try it for yourself, or <a href="https://github.com/brustack/theme-transitions/issues">report a bug</a>.</p>

> [!NOTE]
> This is the **source monorepo**, for contributing to the packages themselves. If you just want to _use_ one of them in your own project, jump straight to its README via the table below and `npm install` it normally. Don't clone this repo or copy a demo app out of it.

## Packages

| Package                                               | npm                                                                                                                                           | Description                                                                                                 |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@brustack/theme-transitions-core`](packages/core)   | [![npm](https://img.shields.io/npm/v/@brustack/theme-transitions-core.svg)](https://www.npmjs.com/package/@brustack/theme-transitions-core)   | Framework-agnostic core: theme detection/persistence, View Transition orchestration, effect CSS generation. |
| [`@brustack/vue-theme-transitions`](packages/vue)     | [![npm](https://img.shields.io/npm/v/@brustack/vue-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/vue-theme-transitions)     | Vue composable built on the core.                                                                           |
| [`@brustack/react-theme-transitions`](packages/react) | [![npm](https://img.shields.io/npm/v/@brustack/react-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/react-theme-transitions) | React hook built on the core.                                                                               |
| [`@brustack/nuxt-theme-transitions`](packages/nuxt)   | [![npm](https://img.shields.io/npm/v/@brustack/nuxt-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/nuxt-theme-transitions)   | Nuxt module built on the core.                                                                              |
| [`@brustack/next-theme-transitions`](packages/next)   | [![npm](https://img.shields.io/npm/v/@brustack/next-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/next-theme-transitions)   | Next.js App Router hook and anti-flash script component built on the core.                                  |
| [`@brustack/alpine-theme-transitions`](packages/alpine) | [![npm](https://img.shields.io/npm/v/@brustack/alpine-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/alpine-theme-transitions) | Alpine.js plugin built on the core, with a self-registering CDN build. |
| [`@brustack/angular-theme-transitions`](packages/angular) | [![npm](https://img.shields.io/npm/v/@brustack/angular-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/angular-theme-transitions) | Angular injectable service built on the core. |

## Development

This section is for working on the packages themselves, not for using them. Run every command from the repo root. The demo apps (`apps/react-demo`, `apps/vue-demo`, `apps/next-demo`, `apps/nuxt-demo`, `apps/alpine-demo`, `apps/angular-demo`, `apps/showcase`) are npm workspaces symlinked to the local, in-progress source, not the published npm packages, so they only run correctly from inside this repo. They aren't standalone starter templates you can copy elsewhere.

Try a demo:

```
npm install
npm run dev:vue-demo
npm run dev:react-demo
npm run dev:next-demo
npm run dev:nuxt-demo
npm run dev:alpine-demo
npm run dev:angular-demo
npm run dev:showcase
```

Only want one demo? `npm run install:<name>` (e.g. `npm run install:react-demo`) installs just that demo's dependencies instead of the whole monorepo.

Everything else:

| Command             | Description             |
| ------------------- | ----------------------- |
| `npm test`          | Run the test suite      |
| `npm run lint`      | Lint all packages       |
| `npm run typecheck` | Type-check all packages |
| `npm run build`     | Build all packages      |

## License

[MIT License](LICENSE)

Copyright (c) 2026 Bruno Neckel
