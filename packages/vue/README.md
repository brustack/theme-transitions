# vue-theme-transitions

[![made by brustack](https://img.shields.io/badge/MADE%20BY%20brustack-000000.svg?style=for-the-badge&labelColor=000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjYuNzcgMjI2Ljc3Ij48cG9seWdvbiBmaWxsPSIjRjRGMkVEIiBwb2ludHM9IjE1My43MyA4My4zOSAxNTMuNzMgMTUzLjczIDgzLjM5IDE1My43MyA4My4zOSAyMTMuNzMgMjEzLjczIDIxMy43MyAyMTMuNzMgODMuMzkgMTUzLjczIDgzLjM5Ii8%2BPHJlY3QgZmlsbD0iI0Y0RjJFRCIgeD0iODMuMzkiIHk9IjEzLjA0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48cmVjdCBmaWxsPSIjRjRGMkVEIiB4PSIxMy4wNCIgeT0iODMuMzkiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIvPjxyZWN0IGZpbGw9IiNGNEYyRUQiIHg9IjgzLjM5IiB5PSI4My4zOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIi8%2BPC9zdmc%2BCg%3D%3D)](https://github.com/brustack)
[![npm version](https://img.shields.io/npm/v/@brustack/vue-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@brustack/vue-theme-transitions)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@brustack/vue-theme-transitions?style=for-the-badge&labelColor=000000)](https://bundlephobia.com/package/@brustack/vue-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/vue-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://github.com/brustack/theme-transitions/blob/main/packages/vue/LICENSE)

Vue composable for animated theme transitions using the View Transitions API.

- ✅ Multiple effects to choose from
- ✅ Zero flash of the wrong theme on load
- ✅ Syncs automatically with OS `prefers-color-scheme`
- ✅ Custom themes beyond light/dark
- ✅ Origin auto-derived from the click event, bind `toggleTheme` straight to `@click`
- ✅ No Context, no Provider, just a composable

<br>

<p align="center">
  <img src="../../.github/assets/demo.gif" alt="Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor" />
</p>

<p align="center">Check out the <a href="https://theme-transitions.brustack.dev">Live Example</a> to try it for yourself.</p>

## Install

```sh
npm install @brustack/vue-theme-transitions
# or
pnpm add @brustack/vue-theme-transitions
# or
yarn add @brustack/vue-theme-transitions
```

Prefer to see it running first?

```sh
git clone https://github.com/brustack/theme-transitions.git
cd theme-transitions
npm run install:vue-demo
npm run dev:vue-demo
```

## Usage

```vue
<script setup lang="ts">
import { useThemeTransition } from '@brustack/vue-theme-transitions';
import '@brustack/theme-transitions-core/style.css';

const { theme, isAnimating, toggleTheme } = useThemeTransition();
</script>

<template>
  <button :disabled="isAnimating" @click="toggleTheme">
    {{ theme }}
  </button>
</template>
```

Binding `toggleTheme` directly to `@click` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. No import from the core package needed.

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
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        text: 'var(--text)',
      },
    },
  },
};
```

## Configuration (optional)

| Variant | `duration` | `easing` |
|---|:---:|:---:|
| `spread` | `'1s'` | ❌ |
| `fade` (default) | `'400ms'` | `'ease'` |
| `none` | ❌ | ❌ |

```ts
useThemeTransition({ variant: 'spread', duration: '1s' })
```

The first call in the app sets the shared default. Pass a `MouseEvent` (as shown in Usage) or an options object to `toggleTheme`/`setTheme` to override just that one call.

### Custom themes

Register extra theme names beyond `light`/`dark`/`system` via `themes`:

```ts
useThemeTransition({ themes: ['sepia', 'sunset'] })
```

`setTheme('sepia')` then applies a `sepia` class the same way `light`/`dark` do (see Styling above). The composable's `themes` ref always includes `['light', 'dark', 'system', ...your custom names]`, useful for building a theme switcher. `toggleTheme()` is unaffected, it always flips between `light` and `dark`.

## API

| | |
|---|---|
| `theme` | Current resolved theme: `'light'`, `'dark'`, or a custom theme name |
| `mode` | Current preference: `'light'`, `'dark'`, `'system'`, or a custom theme name |
| `isAnimating` | `true` while a transition is running |
| `themes` | All registered theme names: `['light', 'dark', 'system', ...custom]` |
| `toggleTheme(eventOrOptions?)` | Switch between light and dark |
| `setTheme(mode, eventOrOptions?)` | Set `light`, `dark`, `system`, or a custom theme name |

## Vite plugin

Register the anti-flash init script in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { themeTransitions } from '@brustack/theme-transitions-core/vite';

export default defineConfig({
  plugins: [themeTransitions()],
});
```

Optionally, pass the same options as above so every `useThemeTransition()` call in the app picks them up without repeating them:

```ts
plugins: [themeTransitions({ variant: 'spread', duration: '1s' })],
```

## Other bundlers

Not using Vite? `themeTransitions()` is a thin wrapper around two functions the core package exports, so you can get the same anti-flash behavior with any bundler by calling them directly.

With webpack and `html-webpack-plugin`:

```js
const { buildColorModeInitScript } = require('@brustack/theme-transitions-core');

new HtmlWebpackPlugin({
  templateParameters: { themeInitScript: buildColorModeInitScript() },
});
```

```html
<!-- in the HTML template, inside <head> -->
<script><%= htmlWebpackPlugin.options.templateParameters.themeInitScript %></script>
```

The script must run in `<head>`, before the page paints, regardless of where your bundle's own `<script>` tags are injected. To also set app-wide default effect options (the same thing the Vite plugin's argument does), prepend `buildConfigInitScript(options)` (which sets `window.__themeConfig`) to the same string.

Webpack also needs a CSS rule that reaches into `node_modules` for the core package's stylesheet. If your existing `.css` rule excludes `node_modules` (common when scoping CSS Modules to your own source), add its path to that rule's `include`:

```js
{
  test: /\.css$/,
  include: [path.resolve(__dirname, 'node_modules/@brustack/theme-transitions-core')],
  use: ['style-loader', 'css-loader'],
}
```

## Notes

- This package has no SSR-specific handling. It targets plain client-side Vue 3 apps.

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).
