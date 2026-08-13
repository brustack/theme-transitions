# next-theme-transitions

[![made by brustack](https://img.shields.io/badge/MADE%20BY%20brustack-000000.svg?style=for-the-badge&labelColor=000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjYuNzcgMjI2Ljc3Ij48cG9seWdvbiBmaWxsPSIjRjRGMkVEIiBwb2ludHM9IjE1My43MyA4My4zOSAxNTMuNzMgMTUzLjczIDgzLjM5IDE1My43MyA4My4zOSAyMTMuNzMgMjEzLjczIDIxMy43MyAyMTMuNzMgODMuMzkgMTUzLjczIDgzLjM5Ii8%2BPHJlY3QgZmlsbD0iI0Y0RjJFRCIgeD0iODMuMzkiIHk9IjEzLjA0IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiLz48cmVjdCBmaWxsPSIjRjRGMkVEIiB4PSIxMy4wNCIgeT0iODMuMzkiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIvPjxyZWN0IGZpbGw9IiNGNEYyRUQiIHg9IjgzLjM5IiB5PSI4My4zOSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIi8%2BPC9zdmc%2BCg%3D%3D)](https://github.com/brustack)
[![npm version](https://img.shields.io/npm/v/@brustack/next-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@brustack/next-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/next-theme-transitions.svg?style=for-the-badge&labelColor=000000)](https://github.com/brustack/theme-transitions/blob/main/packages/next/LICENSE)

Next.js App Router hook and anti-flash script component for animated theme transitions using the View Transitions API.

- ✅ Multiple effects to choose from
- ✅ Zero flash of the wrong theme on load via a Server Component script
- ✅ Syncs automatically with OS `prefers-color-scheme`
- ✅ Custom themes beyond light/dark
- ✅ Origin auto-derived from the click event, bind `toggleTheme` straight to `onClick`
- ✅ App Router only, no Context, no Provider
- ✅ No dependency on the React adapter

<br>

<p align="center">
  <img src="../../.github/assets/demo.gif" alt="Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor" />
</p>

<p align="center">Check out the <a href="https://theme-transitions.brustack.dev">Live Example</a> to try it for yourself.</p>

## Install

```sh
npm install @brustack/next-theme-transitions
# or
pnpm add @brustack/next-theme-transitions
# or
yarn add @brustack/next-theme-transitions
```

App Router only. Pages Router (`_app.tsx`/`_document.tsx`) isn't supported.

Prefer to see it running first?

```sh
git clone https://github.com/brustack/theme-transitions.git
cd theme-transitions
npm run install:next-demo
npm run dev:next-demo
```

## Usage

Add `ThemeScript` to your root layout's `<head>`. This is what prevents a flash of the wrong theme on load; it renders a plain inline `<script>` on the server, no client JavaScript required for this part:

```tsx
// app/layout.tsx
import { ThemeScript } from "@brustack/next-theme-transitions";
import "@brustack/theme-transitions-core/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Then use `useThemeTransition` from any Client Component:

```tsx
// app/components/theme-toggle.tsx
"use client";

import { useThemeTransition } from "@brustack/next-theme-transitions";

export const ThemeToggle = () => {
  const { theme, isAnimating, toggleTheme } = useThemeTransition();

  return (
    <button disabled={isAnimating} onClick={toggleTheme}>
      {theme}
    </button>
  );
};
```

Binding `toggleTheme` directly to `onClick` works because it accepts React's `MouseEvent` and derives the spread effect's origin from the click position automatically. The component calling the hook needs its own `'use client'` directive, same as any other interactive component in the App Router; `useThemeTransition` itself already has one, but that only makes the hook's _own_ module client-safe, it doesn't make the component that calls it a Client Component.

## Styling

`ThemeScript`/`useThemeTransition` apply the current theme's name (`dark`, `light`, or a custom name, see Custom themes below) as a class on `<html>`. Style your palette off that class with any approach.

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

### Styled-components (or any CSS-in-JS)

```tsx
// app/global-style.tsx
"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
`;
```

```tsx
// app/layout.tsx
import { GlobalStyle } from "./global-style";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
```

`GlobalStyle` needs its own `'use client'` boundary, same as `ThemeToggle`. This mounts it, it doesn't set up styled-components' own SSR style injection for the App Router, see [styled-components' Next.js registry guide](https://styled-components.com/docs/advanced#nextjs) for that.

## Configuration (optional)

| Variant          | `duration` |    `easing`     |  `direction`   |
| ---------------- | :--------: | :-------------: | :------------: |
| `spread`         |   `'1s'`   |       ❌        |       ❌       |
| `fade` (default) | `'400ms'`  |    `'ease'`     |       ❌       |
| `wipe`           |   `'1s'`   |  `'ease-out'`   |    `'left'`    |
| `flip`           | `'700ms'`  | `'ease-in-out'` | `'horizontal'` |
| `none`           |     ❌     |       ❌        |       ❌       |

`ThemeScript` and `useThemeTransition` accept the same shape. Pass matching options to both to set the app-wide default (the pre-hydration script and the interactive hook must agree):

```tsx
// app/layout.tsx
<ThemeScript variant="spread" duration="1s" />
```

```tsx
// app/components/theme-toggle.tsx
useThemeTransition({ variant: "spread", duration: "1s" });
```

Pass a `MouseEvent` (as shown in Usage) or an options object to `toggleTheme`/`setTheme` to override just that one call.

### Custom themes

Register extra theme names beyond `light`/`dark`/`system` via `themes`, passed to both `ThemeScript` and `useThemeTransition`:

```tsx
<ThemeScript themes={["sepia", "sunset"]} />
```

```tsx
useThemeTransition({ themes: ["sepia", "sunset"] });
```

`setTheme('sepia')` then applies a `sepia` class the same way `light`/`dark` do (see Styling above). The hook's `themes` array always includes `['light', 'dark', 'system', ...your custom names]` on the client; during SSR it only reports the 3 built-ins, since custom names aren't knowable at module-load time, the real list takes over once the client hydrates. `toggleTheme()` is unaffected, it always flips between `light` and `dark`.

## API

|                                   |                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `theme`                           | Current resolved theme: `'light'`, `'dark'`, or a custom theme name                              |
| `mode`                            | Current preference: `'light'`, `'dark'`, `'system'`, or a custom theme name                      |
| `isAnimating`                     | `true` while a transition is running                                                             |
| `themes`                          | All registered theme names: `['light', 'dark', 'system', ...custom]` (built-ins only during SSR) |
| `toggleTheme(eventOrOptions?)`    | Switch between light and dark                                                                    |
| `setTheme(mode, eventOrOptions?)` | Set `light`, `dark`, `system`, or a custom theme name                                            |

## Notes

- This package has no Context/Provider. `useThemeTransition` reads from `getController()`'s external singleton directly (via `useSyncExternalStore`), the same way every other adapter in this project does, so there's nothing to wrap your app in beyond `ThemeScript` in `<head>`.
- App Router only. Next.js doesn't expose a way for a third-party package to inject into your root layout automatically the way a Vite plugin or a Nuxt module can, so `ThemeScript` has to be added explicitly, it can't be zero-config.
- `suppressHydrationWarning` on `<html>` is required because `ThemeScript`'s injected script sets a class on `<html>` before React hydrates. That's what prevents the flash, but it also means React sees an attribute it didn't render, so `suppressHydrationWarning` avoids a harmless but noisy console warning about that one attribute. This is the same tradeoff every anti-flash-script-based theme library makes, e.g. `next-themes`.

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).
