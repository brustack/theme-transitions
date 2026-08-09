---
"@brustack/theme-transitions-core": patch
---

Give the spread effect's computed radius a 20% proportional safety margin instead of a small fixed one. Corner-to-corner clicks need a much larger radius than center clicks, so a fixed pixel margin wasn't enough to absorb viewport-measurement discrepancies on some mobile browsers, leaving a visible gap when clicking near a screen corner.
