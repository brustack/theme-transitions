# alpine-theme-transitions

[![made by brustack](https://img.shields.io/badge/MADE%20BY%20brustack-000000.svg?style=for-the-badge&labelColor=000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjYuNzcgMjI2Ljc3Ij48cG9seWdvbiBmaWxsPSIjRjRGMkVEIiBwb2ludHM9IjE1My43MyA4My4zOSAxNTMuNzMgMTUzLjczIDgzLjM5IDE1My43MyA4My4zOSAyMTMuNzMgMjEzLjczIDIxMy43MyAyMTMuNzMgODMuMzkgMTUzLjczIDgzLjM5Ii8%2BPHJlY3QgZmlsbD0iI0Y0RjJFRCIgeD0iODMuMzkiIHk9IjEzLjA0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48cmVjdCBmaWxsPSIjRjRGMkVEIiB4PSIxMy4wNCIgeT0iODMuMzkiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIvPjxyZWN0IGZpbGw9IiNGNEYyRUQiIHg9IjgzLjM5IiB5PSI4My4zOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIi8%2BPC9zdmc%2BCg%3D%3D)](https://github.com/brustack)
[![npm version](https://img.shields.io/npm/v/@brustack/alpine-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@brustack/alpine-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/alpine-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://github.com/brustack/theme-transitions/blob/main/packages/alpine/LICENSE)

Alpine.js plugin for animated theme transitions using the View Transitions API.

- ✅ Multiple effects to choose from
- ✅ Zero flash of the wrong theme on load
- ✅ Syncs automatically with OS `prefers-color-scheme`
- ✅ Custom themes beyond light/dark
- ✅ Origin auto-derived from the click event, bind `toggleTheme` straight to `@click`
- ✅ Works with zero build step, drop in via CDN, or install via npm
- ✅ No Context, no Provider, no store, just `x-data`

<br>

<p align="center">
  <img src="../../.github/assets/demo.gif" alt="Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor" />
</p>

<p align="center">Check out the <a href="https://theme-transitions.brustack.dev">Live Example</a> to try it for yourself.</p>

## Install

```sh
npm install @brustack/alpine-theme-transitions
# or
pnpm add @brustack/alpine-theme-transitions
# or
yarn add @brustack/alpine-theme-transitions
```

Not using a bundler? No install needed, see the CDN usage below.

Prefer to see it running first?

```sh
git clone https://github.com/brustack/theme-transitions.git
cd theme-transitions
npm run install:alpine-demo
npm run dev:alpine-demo
```

## Usage

### CDN (zero-build)

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/@brustack/theme-transitions-core/dist/theme-init.js"></script>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@brustack/theme-transitions-core/style.css"
  />
</head>
<body>
  <div x-data="themeTransition()">
    <button @click="toggleTheme" x-text="theme"></button>
  </div>

  <script
    defer
    src="https://cdn.jsdelivr.net/npm/@brustack/alpine-theme-transitions/dist/alpine-theme-transitions.iife.js"
  ></script>
  <script
    defer
    src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"
  ></script>
</body>
```

Script order matters: the plugin's `<script>` tag comes before Alpine core's own `<script>` tag, both `defer`, the plugin attaches its `alpine:init` listener before Alpine's CDN bundle fires that event and starts itself. No manual `Alpine.plugin(...)` call needed for CDN usage.

### npm / bundler

```js
import Alpine from "alpinejs";
import themeTransition from "@brustack/alpine-theme-transitions";
import "@brustack/theme-transitions-core/style.css";

Alpine.plugin(themeTransition);
Alpine.start();
```

```html
<div x-data="themeTransition()">
  <button @click="toggleTheme" x-text="theme"></button>
</div>
```

Binding `toggleTheme` directly to `@click` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. Options are passed through the markup (`x-data="themeTransition({...})"`), not through JS setup, see Configuration below.

## Styling

`themeTransition` applies the current theme's name (`dark`, `light`, or a custom name, see Custom themes below) as a class on `<html>`. Style your palette off that class with any approach.

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
| `flip`           | `'500ms'`  | `'ease-in-out'` | `'horizontal'` |
| `none`           |     ❌     |       ❌        |       ❌       |

```html
<div x-data="themeTransition({ variant: 'spread', duration: '1s' })"></div>
```

The first component to initialize on the page sets the shared default. Pass a `MouseEvent` (as shown in Usage) or an options object to `toggleTheme`/`setTheme` to override just that one call.

### Custom themes

Register extra theme names beyond `light`/`dark`/`system` via `themes`:

```html
<div x-data="themeTransition({ themes: ['sepia', 'sunset'] })"></div>
```

`setTheme('sepia')` then applies a `sepia` class the same way `light`/`dark` do (see Styling above). The component's `themes` property always includes `['light', 'dark', 'system', ...your custom names]`, useful for building a theme switcher. `toggleTheme()` is unaffected, it always flips between `light` and `dark`.

## API

|                                      |                                                                             |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `Alpine.plugin(themeTransition)`     | Registers the `themeTransition` Alpine.data component                       |
| `x-data="themeTransition(options?)"` | Creates a component instance; first one on the page sets the shared default |
| `theme`                              | Current resolved theme: `'light'`, `'dark'`, or a custom theme name         |
| `mode`                               | Current preference: `'light'`, `'dark'`, `'system'`, or a custom theme name |
| `isAnimating`                        | `true` while a transition is running                                        |
| `themes`                             | All registered theme names: `['light', 'dark', 'system', ...custom]`        |
| `toggleTheme(eventOrOptions?)`       | Switch between light and dark                                               |
| `setTheme(mode, eventOrOptions?)`    | Set `light`, `dark`, `system`, or a custom theme name                       |

## Notes

- This package has no Alpine-specific storage. Persistence, system-preference sync, and all other state management come from `@brustack/theme-transitions-core`'s shared controller, the same singleton every other adapter in this project reads from, `themeTransition` is just a thin `x-data` reflection of it.
- `@alpinejs/persist` is deliberately not a dependency. Its `$persist()` restores its own `localStorage` copy into the data object before `init()` runs, which would create a second, unsynchronized copy of state the core controller already owns via its own storage key.

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).
