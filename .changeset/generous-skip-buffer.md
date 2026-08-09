---
"@brustack/theme-transitions-core": patch
---

Widen the spread effect's safety-net timeout from duration+150ms to duration+10s. On a device experiencing rendering jank, the browser's own view transition can genuinely take longer than the nominal CSS duration to actually finish painting; a tight safety margin was forcing it to snap to its final state before it had visually caught up, making the reveal look like it was skipping the last stretch instead of completing naturally.
