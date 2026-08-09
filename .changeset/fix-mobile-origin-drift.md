---
"@brustack/theme-transitions-core": patch
---

Fix the spread effect's transition origin drifting toward the top-left corner on mobile browsers (notably Chrome on Android). The origin is now expressed as a percentage of `window.visualViewport` instead of raw pixels, so it stays accurate even when the layout viewport used for click/tap coordinates doesn't match what's actually rendered on screen (e.g. during the browser's address bar collapsing/expanding).
