---
"@brustack/theme-transitions-core": patch
---

Make the spread effect's early-skip estimate conservative: it now uses whichever of window.innerWidth/innerHeight or window.visualViewport implies a larger distance-to-cover and a smaller max radius, so it never cuts the reveal short before it visually finishes covering the screen. Previously the estimate could fire early on mobile browsers where the two disagree, making the transition appear to stop mid-animation.
