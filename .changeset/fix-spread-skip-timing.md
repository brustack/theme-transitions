---
"@brustack/theme-transitions-core": patch
---

Fix the spread effect's early-skip timing using window.innerWidth/innerHeight while the transition origin used window.visualViewport, causing the reveal to visibly jump on mobile browsers instead of finishing smoothly. Both now share the same viewport source.
