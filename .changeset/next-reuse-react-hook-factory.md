---
"@brustack/next-theme-transitions": patch
---

`useThemeTransition` is now built on `@brustack/react-theme-transitions`'s `createThemeTransitionHook` instead of a duplicated copy of the same logic. This package now depends on `@brustack/react-theme-transitions`; no change to this package's own public API.
