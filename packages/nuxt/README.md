# nuxt-theme-transitions

[![made by brustack](https://img.shields.io/badge/MADE%20BY%20brustack-000000.svg?style=for-the-badge&labelColor=000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjYuNzcgMjI2Ljc3Ij48cG9seWdvbiBmaWxsPSIjRjRGMkVEIiBwb2ludHM9IjE1My43MyA4My4zOSAxNTMuNzMgMTUzLjczIDgzLjM5IDE1My43MyA4My4zOSAyMTMuNzMgMjEzLjczIDIxMy43MyAyMTMuNzMgODMuMzkgMTUzLjczIDgzLjM5Ii8%2BPHJlY3QgZmlsbD0iI0Y0RjJFRCIgeD0iODMuMzkiIHk9IjEzLjA0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48cmVjdCBmaWxsPSIjRjRGMkVEIiB4PSIxMy4wNCIgeT0iODMuMzkiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIvPjxyZWN0IGZpbGw9IiNGNEYyRUQiIHg9IjgzLjM5IiB5PSI4My4zOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIi8%2BPC9zdmc%2BCg%3D%3D)](https://github.com/brustack)
[![npm version](https://img.shields.io/npm/v/@brustack/nuxt-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@brustack/nuxt-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/nuxt-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://github.com/brustack/theme-transitions/blob/main/packages/nuxt/LICENSE)

Nuxt module for animated theme transitions using the View Transitions API.

- ✅ Multiple effects to choose from
- ✅ Zero flash of the wrong theme on load
- ✅ Syncs automatically with OS `prefers-color-scheme`
- ✅ Custom themes beyond light/dark
- ✅ Auto-imported `useThemeTransition`, zero-config Nuxt module
- ✅ Works with Nuxt 3 and Nuxt 4

<br>

<p align="center">
  <img src="../../.github/assets/demo.gif" alt="Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor" />
</p>

<p align="center">Check out the <a href="https://theme-transitions.brustack.dev">Live Example</a> to try it for yourself.</p>

## Install

```sh
npm install @brustack/nuxt-theme-transitions
# or
pnpm add @brustack/nuxt-theme-transitions
# or
yarn add @brustack/nuxt-theme-transitions
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@brustack/nuxt-theme-transitions"],
});
```

Prefer to see it running first?

```sh
git clone https://github.com/brustack/theme-transitions.git
cd theme-transitions
npm run install:nuxt-demo
npm run dev:nuxt-demo
```

## Usage

```vue
<script setup lang="ts">
const { theme, isAnimating, toggleTheme } = useThemeTransition();
</script>

<template>
  <button :disabled="isAnimating" @click="toggleTheme">
    {{ theme }}
  </button>
</template>
```

Binding `toggleTheme` directly to `@click` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. `originFromElement(elementRef)` is auto-imported too, use it instead if you want to animate from an element's center rather than the click position.

## Styling

`useThemeTransition` applies the current theme's name (`dark`, `light`, or a custom name, see Custom themes below) as a class on `<html>`. Style your palette off that class with any approach.

### CSS variables

```css
:root {
  --bg: #ffffff;
  --text: #111111;
}

html.dark {
  --bg: #0b0b10;
  --text: #f4f2ed;
}

html.sepia {
  --bg: #f4ecd8;
  --text: #4b3621;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

### Tailwind

Set `darkMode: 'class'` in your Tailwind config (see Install above), then map your color tokens to the CSS variables above:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
      },
    },
  },
};
```

## Configuration (optional)

| Variant          | `duration` |    `easing`     |  `direction`   |
| ---------------- | :--------: | :-------------: | :------------: |
| `spread`         |   `'1s'`   |       ❌        |       ❌       |
| `fade` (default) | `'400ms'`  |    `'ease'`     |       ❌       |
| `wipe`           |   `'1s'`   |  `'ease-out'`   |    `'left'`    |
| `flip`           | `'700ms'`  | `'ease-in-out'` | `'horizontal'` |
| `none`           |     ❌     |       ❌        |       ❌       |

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@brustack/nuxt-theme-transitions"],
  themeTransition: {
    variant: "spread",
    duration: "1s",
  },
});
```

Restart the dev server after changing `themeTransition`.

`toggleTheme`/`setTheme` also accept a `MouseEvent` (as shown in Usage) or an explicit options object, e.g. `{ origin, variant, duration }`, to override the configured value for just that one call. `origin` is required for `spread`, derive it with `originFromEvent(event)` or `originFromElement(el)`.

### Custom themes

Register extra theme names beyond `light`/`dark`/`system` via `themeTransition.themes`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@brustack/nuxt-theme-transitions"],
  themeTransition: {
    themes: ["sepia", "sunset"],
  },
});
```

`setTheme('sepia')` then applies a `sepia` class the same way `light`/`dark` do (see Styling above). `themes` always includes `['light', 'dark', 'system', ...your custom names]` once mounted, useful for building a theme switcher. `toggleTheme()` is unaffected, it always flips between `light` and `dark`.

## API

|                                   |                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `toggleTheme(eventOrOptions?)`    | Switch between light and dark                                                                      |
| `setTheme(mode, eventOrOptions?)` | Set `light`, `dark`, `system`, or a custom theme name                                              |
| `theme`                           | Current resolved theme: `'light'`, `'dark'`, or a custom theme name                                |
| `mode`                            | Current preference: `'light'`, `'dark'`, `'system'`, or a custom theme name                        |
| `isAnimating`                     | `true` while a transition is running                                                               |
| `themes`                          | All registered theme names: `['light', 'dark', 'system', ...custom]` (built-ins only before mount) |
| `originFromEvent(event)`          | Click position for spread                                                                          |
| `originFromElement(el)`           | Element center for spread                                                                          |

## Notes

- `useThemeTransition` only creates the underlying controller after the component mounts, `theme`/`mode`/`isAnimating` start as safe defaults (`'light'`/`'system'`/`false`) via Nuxt's `useState`. This means it's safe to use in SSR/universal rendering by default, no hydration mismatch, since nothing controller-dependent renders until the client takes over.

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).
