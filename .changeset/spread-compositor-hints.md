---
"@brustack/theme-transitions-core": patch
---

Add will-change: clip-path and contain: paint hints to the spread effect's revealed layer, giving the browser a chance to optimize compositing for this animation. On weaker mobile GPUs, animating clip-path over a full-screen snapshot can fail to keep pace with the configured duration, leaving the reveal visibly incomplete even though the animation timeline itself finishes on time.
