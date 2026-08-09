# @brustack/react-theme-transitions

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

- Updated dependencies [848c70d]
- Updated dependencies [e1bffc2]
- Updated dependencies [1431ded]
  - @brustack/theme-transitions-core@2.0.0
