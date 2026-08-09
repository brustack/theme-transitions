---
"@brustack/theme-transitions-core": patch
---

Compute the spread effect's radius as an exact pixel distance to the farthest screen corner instead of relying on the CSS `vmax` unit, which some mobile browsers resolve against a viewport that's smaller than what's actually visible, leaving part of the screen uncovered when the reveal finishes.
