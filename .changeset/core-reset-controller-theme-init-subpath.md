---
"@brustack/theme-transitions-core": minor
---

Add `resetController()` to clear the shared singleton (useful between tests), expose `dist/theme-init.js` as an importable subpath for zero-build/CDN consumers, and document the full set of advanced exports (`resolveOptions`, `resolveThemeEffects`, `defaultThemeEffects`, `DEFAULT_VARIANT`, and more) in the README. `EffectDefinition` is now generic and no longer needs unsound internal casts. Removed two undocumented, internal-only exports (`themeEffects`, `getEffectOrThrow`) that were never part of the published API.
