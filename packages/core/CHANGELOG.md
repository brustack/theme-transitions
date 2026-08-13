# @brustack/theme-transitions-core

## 3.2.0

### Minor Changes

- 99dc933: Add a `wipe` transition variant that reveals the new theme by animating `clip-path` across the viewport, configurable via the `direction` option alongside the existing `duration` and `easing` overrides.

  `direction` accepts:

  - **Edges**: `left`, `right`, `up`, `down`
  - **Center**: `center-x`, `center-y`
  - **Corners**: `diagonal-tl`, `diagonal-tr`, `diagonal-bl`, `diagonal-br`

### Patch Changes

- 0e6847c: Remove the spread effect's 10-second safety-net buffer added on top of the configured duration before force-finishing a transition. It now skips at exactly the configured duration, matching every other effect.

## 3.1.0

### Minor Changes

- 291b9ec: Add `resetController()` to clear the shared singleton (useful between tests), expose `dist/theme-init.js` as an importable subpath for zero-build/CDN consumers, and document the full set of advanced exports (`resolveOptions`, `resolveThemeEffects`, `defaultThemeEffects`, `DEFAULT_VARIANT`, and more) in the README. `EffectDefinition` is now generic and no longer needs unsound internal casts. Removed two undocumented, internal-only exports (`themeEffects`, `getEffectOrThrow`) that were never part of the published API.

## 3.0.0

### Major Changes

- 2b009b6: Remove `estimateSpreadSkipMs`. It was an internal timing estimate for the spread effect's now-removed early-skip optimization and hasn't been used by the library itself for several releases.

## 2.2.14

### Patch Changes

- 743c336: Add will-change: clip-path and contain: paint hints to the spread effect's revealed layer, giving the browser a chance to optimize compositing for this animation. On weaker mobile GPUs, animating clip-path over a full-screen snapshot can fail to keep pace with the configured duration, leaving the reveal visibly incomplete even though the animation timeline itself finishes on time.

## 2.2.13

### Patch Changes

- 4a2af6b: Widen the spread effect's safety-net timeout from duration+150ms to duration+10s. On a device experiencing rendering jank, the browser's own view transition can genuinely take longer than the nominal CSS duration to actually finish painting; a tight safety margin was forcing it to snap to its final state before it had visually caught up, making the reveal look like it was skipping the last stretch instead of completing naturally.

## 2.2.12

### Patch Changes

- 7835745: Revert the spread effect's radius margin back to a small fixed value. The 20% proportional margin made things worse on a real device (a case that worked at the screen center regressed after the increase), suggesting large clip-path radii are themselves costly to render on some mobile browsers rather than the radius being insufficiently sized.

## 2.2.11

### Patch Changes

- 7d730f7: Give the spread effect's computed radius a 20% proportional safety margin instead of a small fixed one. Corner-to-corner clicks need a much larger radius than center clicks, so a fixed pixel margin wasn't enough to absorb viewport-measurement discrepancies on some mobile browsers, leaving a visible gap when clicking near a screen corner.

## 2.2.10

### Patch Changes

- 94e7af1: Compute the spread effect's radius as an exact pixel distance to the farthest screen corner instead of relying on the CSS `vmax` unit, which some mobile browsers resolve against a viewport that's smaller than what's actually visible, leaving part of the screen uncovered when the reveal finishes.

## 2.2.9

### Patch Changes

- 35a0662: Restore the spread effect's default radius to 200vmax. Reverting it to 150vmax was premature: that value was never cleanly tested without the early-skip cutoff masking whether it actually covered the screen, and on mobile it doesn't.

## 2.2.8

### Patch Changes

- 675650c: Revert the spread effect's default radius back to 150vmax. It was widened to 200vmax while chasing an unrelated bug (the real cause was the early-skip cutoff, since removed); with that cutoff gone, an oversized radius makes the visible reveal finish before the configured duration elapses, wasting animation time off-screen.

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
