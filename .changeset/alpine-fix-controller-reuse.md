---
"@brustack/alpine-theme-transitions": patch
---

Fix `toggleTheme`/`setTheme` refetching the controller via `getController()` on every call instead of reusing the instance captured in `init()`. Add `sideEffects: false` for better tree-shaking.
