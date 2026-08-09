# @brustack/theme-transitions-core

## 2.2.7

### Patch Changes

- c4befd6: Wait for the visual viewport to stop resizing before starting a transition. Triggering a transition right as an on-screen keyboard closes could capture the "old" snapshot mid-resize, showing a blank flash instead of the previous page state.

## 2.2.6

### Patch Changes

- 0923758: Stop cutting the spread effect's reveal short based on an estimated cover distance. The estimate always had some margin of error, which made the animation visibly jump to its final state a moment before it looked finished. It now always runs its full configured duration.

## 2.2.5

### Patch Changes

- 5fe7624: Widen the spread effect's default radius from 150vmax to 200vmax for extra margin on mobile browsers where the circle may not reach every corner of the screen.

## 2.2.4

### Patch Changes

- a3c9588: Make the spread effect's early-skip estimate conservative: it now uses whichever of window.innerWidth/innerHeight or window.visualViewport implies a larger distance-to-cover and a smaller max radius, so it never cuts the reveal short before it visually finishes covering the screen. Previously the estimate could fire early on mobile browsers where the two disagree, making the transition appear to stop mid-animation.

## 2.2.3

### Patch Changes

- 8160452: Fix the spread effect's early-skip timing using window.innerWidth/innerHeight while the transition origin used window.visualViewport, causing the reveal to visibly jump on mobile browsers instead of finishing smoothly. Both now share the same viewport source.

## 2.2.2

### Patch Changes

- b3d7fdf: Fix the spread effect's transition origin drifting toward the top-left corner on mobile browsers (notably Chrome on Android). The origin is now expressed as a percentage of `window.visualViewport` instead of raw pixels, so it stays accurate even when the layout viewport used for click/tap coordinates doesn't match what's actually rendered on screen (e.g. during the browser's address bar collapsing/expanding).

## 2.2.1

### Patch Changes

- Refresh package descriptions and keywords for better npm discoverability (drop outdated "dark/light" wording, add `custom-themes`, and for the Alpine adapter add `laravel`, `blade`, `rails`, `django`, `cdn`, `zero-build`). No functional changes.

## 2.2.0

### Minor Changes

- Add the Alpine.js adapter (`@brustack/alpine-theme-transitions`), with both an npm/ESM entry point and a self-registering CDN/IIFE build for zero-build usage (Blade, ERB, static HTML). The core package now also ships a static `dist/theme-init.js`, a prebuilt copy of the anti-flash init script for zero-build consumers who can't call `buildColorModeInitScript()` themselves.

## 2.1.0

### Minor Changes

- Update README docs for custom themes and local demo instructions.

## 2.0.0

### Major Changes

- 1431ded: Namespace the localStorage key from `theme` to `tt:theme`, to avoid colliding with other libraries or app code using the same generic key. Anyone upgrading loses their previously saved preference once (falls back to `system`); this also lays the groundwork for supporting themes beyond light/dark.

### Minor Changes

- e1bffc2: Add support for custom theme names beyond light/dark/system: pass `themes: string[]` to register additional names (e.g. `getController({ themes: ['pink'] })`, then `setTheme('pink')`), and read the full list back from `themes` in state to build a theme switcher.

  Breaking change for the adapters: each hook's returned `.theme`/`.mode` fields and `setTheme`'s parameter widened from a narrow union type to `ThemeName`, so consumers with strict typing on those values may need to update their own type annotations. This follows from a corresponding widening in `@brustack/theme-transitions-core` (covered by the separate major changeset in `namespace-storage-key.md`), where `resolveTheme`'s return type also widened from `'light' | 'dark'` to `string`.

### Patch Changes

- 848c70d: Fix buildColorModeInitScript() breaking under a consumer's production minifier
