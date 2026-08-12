---
"@brustack/react-theme-transitions": minor
---

Export `createThemeTransitionHook`, the factory this package's own `useThemeTransition` is built on. `@brustack/next-theme-transitions` now depends on this package and reuses the factory instead of duplicating the hook's logic.
