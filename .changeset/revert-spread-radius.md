---
"@brustack/theme-transitions-core": patch
---

Revert the spread effect's default radius back to 150vmax. It was widened to 200vmax while chasing an unrelated bug (the real cause was the early-skip cutoff, since removed); with that cutoff gone, an oversized radius makes the visible reveal finish before the configured duration elapses, wasting animation time off-screen.
