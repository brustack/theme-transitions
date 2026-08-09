---
"@brustack/theme-transitions-core": patch
---

Stop cutting the spread effect's reveal short based on an estimated cover distance. The estimate always had some margin of error, which made the animation visibly jump to its final state a moment before it looked finished. It now always runs its full configured duration.
