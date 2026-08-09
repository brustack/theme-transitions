---
"@brustack/theme-transitions-core": patch
---

Restore the spread effect's default radius to 200vmax. Reverting it to 150vmax was premature: that value was never cleanly tested without the early-skip cutoff masking whether it actually covered the screen, and on mobile it doesn't.
