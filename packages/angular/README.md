# angular-theme-transitions

[![made by brustack](https://img.shields.io/badge/MADE%20BY%20brustack-000000.svg?style=for-the-badge&labelColor=000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjYuNzcgMjI2Ljc3Ij48cG9seWdvbiBmaWxsPSIjRjRGMkVEIiBwb2ludHM9IjE1My43MyA4My4zOSAxNTMuNzMgMTUzLjczIDgzLjM5IDE1My43MyA4My4zOSAyMTMuNzMgMjEzLjczIDIxMy43MyAyMTMuNzMgODMuMzkgMTUzLjczIDgzLjM5Ii8%2BPHJlY3QgZmlsbD0iI0Y0RjJFRCIgeD0iODMuMzkiIHk9IjEzLjA0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48cmVjdCBmaWxsPSIjRjRGMkVEIiB4PSIxMy4wNCIgeT0iODMuMzkiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIvPjxyZWN0IGZpbGw9IiNGNEYyRUQiIHg9IjgzLjM5IiB5PSI4My4zOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIi8%2BPC9zdmc%2BCg%3D%3D)](https://github.com/brustack)
[![npm version](https://img.shields.io/npm/v/@brustack/angular-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@brustack/angular-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/angular-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://github.com/brustack/theme-transitions/blob/main/packages/angular/LICENSE)

Angular service for animated theme transitions using the View Transitions API.

- ✅ Multiple effects to choose from
- ✅ Zero flash of the wrong theme on load
- ✅ Syncs automatically with OS `prefers-color-scheme`
- ✅ Custom themes beyond light/dark
- ✅ Built on Angular signals
- ✅ Origin auto-derived from the click event, bind `toggleTheme` straight to `(click)`
- ✅ No NgModule, no wrapper component, just an injectable service

<br>

<p align="center">
  <img src="../../.github/assets/demo.gif" alt="Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor" />
</p>

<p align="center">Check out the <a href="https://theme-transitions.brustack.dev">Live Example</a> to try it for yourself.</p>

## Install

```sh
npm install @brustack/angular-theme-transitions
# or
pnpm add @brustack/angular-theme-transitions
# or
yarn add @brustack/angular-theme-transitions
```

Prefer to see it running first?

```sh
git clone https://github.com/brustack/theme-transitions.git
cd theme-transitions
npm run install:angular-demo
npm run dev:angular-demo
```

## Usage

```ts
import { Component, inject } from '@angular/core';
import { ThemeTransitionService } from '@brustack/angular-theme-transitions';
import '@brustack/theme-transitions-core/style.css';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button [disabled]="theme.isAnimating()" (click)="theme.toggleTheme($event)">
      {{ theme.theme() }}
    </button>
  `,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeTransitionService);
}
```

Binding `toggleTheme` directly to `(click)` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. No import from the core package needed.

## Styling

`ThemeTransitionService` applies the current theme's name (`dark`, `light`, or a custom name, see Custom themes below) as a class on `<html>`. Style your palette off that class with any approach.

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

Register app-wide defaults with `provideThemeTransitions` in your app's root providers:

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideThemeTransitions } from '@brustack/angular-theme-transitions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThemeTransitions({ variant: 'spread', duration: '1s' }),
  ],
};
```

`provideThemeTransitions` must be registered before `ThemeTransitionService` is first injected, since the service reads it once at construction. Pass a `MouseEvent` (as shown in Usage) or an options object to `toggleTheme`/`setTheme` to override just that one call.

### Custom themes

Register extra theme names beyond `light`/`dark`/`system` via `themes`:

```ts
provideThemeTransitions({ themes: ['sepia', 'sunset'] })
```

`setTheme('sepia')` then applies a `sepia` class the same way `light`/`dark` do (see Styling above). The service's `themes` signal always includes `['light', 'dark', 'system', ...your custom names]`, useful for building a theme switcher. `toggleTheme()` is unaffected, it always flips between `light` and `dark`.

## API

| | |
|---|---|
| `provideThemeTransitions(options?)` | Registers app-wide default effect options; add once to your root providers |
| `theme` | Current resolved theme: `'light'`, `'dark'`, or a custom theme name |
| `mode` | Current preference: `'light'`, `'dark'`, `'system'`, or a custom theme name |
| `isAnimating` | `true` while a transition is running |
| `themes` | All registered theme names: `['light', 'dark', 'system', ...custom]` |
| `toggleTheme(eventOrOptions?)` | Switch between light and dark |
| `setTheme(mode, eventOrOptions?)` | Set `light`, `dark`, `system`, or a custom theme name |

## Avoiding the flash

Angular's `index.html` isn't processed by a bundler config the way Vite or webpack is, so the anti-flash script can't be generated through a plugin, it needs to load as a plain `<script>` tag instead. The core package ships a prebuilt copy for exactly this, `dist/theme-init.js`.

Copy it into your build output via `angular.json`'s `assets`:

```json
"assets": [
  {
    "glob": "theme-init.js",
    "input": "node_modules/@brustack/theme-transitions-core/dist",
    "output": "/"
  }
]
```

Then load it in `src/index.html`, before any other script, inside `<head>`:

```html
<head>
  ...
  <script src="theme-init.js"></script>
</head>
```

The script must run in `<head>`, before the page paints. To also set the app-wide default effect options here (the same thing `provideThemeTransitions` does at the Angular level), generate a config script once with `buildConfigInitScript(options)` from `@brustack/theme-transitions-core` and paste its output above the `theme-init.js` tag, it sets `window.__themeConfig` before the anti-flash script reads it.

## Notes

- `ThemeTransitionService` is registered with `providedIn: 'root'`, so a single instance is shared across the whole app. You don't need to add it to any providers array yourself, only `provideThemeTransitions` if you want non-default options.
- This package has no SSR-specific handling. It targets plain client-side Angular apps.

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).
