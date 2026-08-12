# @brustack/alpine-theme-transitions

## 1.0.3

### Patch Changes

- 291b9ec: Fix `toggleTheme`/`setTheme` refetching the controller via `getController()` on every call instead of reusing the instance captured in `init()`. Add `sideEffects: false` for better tree-shaking.
- Updated dependencies [291b9ec]
  - @brustack/theme-transitions-core@3.1.0

## 1.0.2

### Patch Changes

- Updated dependencies [2b009b6]
  - @brustack/theme-transitions-core@3.0.0

## 1.0.1

### Patch Changes

- Refresh package descriptions and keywords for better npm discoverability (drop outdated "dark/light" wording, add `custom-themes`, and for the Alpine adapter add `laravel`, `blade`, `rails`, `django`, `cdn`, `zero-build`). No functional changes.
- Updated dependencies
  - @brustack/theme-transitions-core@2.2.1

## 1.0.0

### Major Changes

- Add the Alpine.js adapter (`@brustack/alpine-theme-transitions`), with both an npm/ESM entry point and a self-registering CDN/IIFE build for zero-build usage (Blade, ERB, static HTML). The core package now also ships a static `dist/theme-init.js`, a prebuilt copy of the anti-flash init script for zero-build consumers who can't call `buildColorModeInitScript()` themselves.

### Patch Changes

- Updated dependencies
  - @brustack/theme-transitions-core@2.2.0
