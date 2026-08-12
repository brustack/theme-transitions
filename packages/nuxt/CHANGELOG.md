# @brustack/nuxt-theme-transitions

## 2.2.0

### Minor Changes

- 291b9ec: Widen the `@nuxt/kit` peer dependency range to also accept Nuxt 3 (`^3.21.11 || ^4.0.0`), not just Nuxt 4. Fix `theme`/`mode` state being typed as a bare `string` instead of `ThemeName`. Add `sideEffects: false` for better tree-shaking. The composable's SSR-safe initial state is now derived directly from `createController()` instead of a hand-duplicated set of literals.

### Patch Changes

- Updated dependencies [291b9ec]
  - @brustack/theme-transitions-core@3.1.0

## 2.1.2

### Patch Changes

- Updated dependencies [2b009b6]
  - @brustack/theme-transitions-core@3.0.0

## 2.1.1

### Patch Changes

- Refresh package descriptions and keywords for better npm discoverability (drop outdated "dark/light" wording, add `custom-themes`, and for the Alpine adapter add `laravel`, `blade`, `rails`, `django`, `cdn`, `zero-build`). No functional changes.
- Updated dependencies
  - @brustack/theme-transitions-core@2.2.1

## 2.1.0

### Minor Changes

- Update README docs for custom themes and local demo instructions.

### Patch Changes

- Updated dependencies
  - @brustack/theme-transitions-core@2.1.0

## 2.0.0

### Major Changes

- e1bffc2: Add support for custom theme names beyond light/dark/system: pass `themes: string[]` to register additional names (e.g. `getController({ themes: ['pink'] })`, then `setTheme('pink')`), and read the full list back from `themes` in state to build a theme switcher.

  Breaking change for the adapters: each hook's returned `.theme`/`.mode` fields and `setTheme`'s parameter widened from a narrow union type to `ThemeName`, so consumers with strict typing on those values may need to update their own type annotations. This follows from a corresponding widening in `@brustack/theme-transitions-core` (covered by the separate major changeset in `namespace-storage-key.md`), where `resolveTheme`'s return type also widened from `'light' | 'dark'` to `string`.

### Patch Changes

- b5172dc: Lower the minimum supported Nuxt version to 3.21.11 (confirmed working via a real build and runtime test), previously required >=4.0.0 unnecessarily
- Updated dependencies [848c70d]
- Updated dependencies [e1bffc2]
- Updated dependencies [1431ded]
  - @brustack/theme-transitions-core@2.0.0
