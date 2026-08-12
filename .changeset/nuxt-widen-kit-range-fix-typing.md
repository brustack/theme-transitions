---
"@brustack/nuxt-theme-transitions": minor
---

Widen the `@nuxt/kit` peer dependency range to also accept Nuxt 3 (`^3.21.11 || ^4.0.0`), not just Nuxt 4. Fix `theme`/`mode` state being typed as a bare `string` instead of `ThemeName`. Add `sideEffects: false` for better tree-shaking. The composable's SSR-safe initial state is now derived directly from `createController()` instead of a hand-duplicated set of literals.
