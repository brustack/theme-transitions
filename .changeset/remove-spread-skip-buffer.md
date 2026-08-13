---
"@brustack/theme-transitions-core": patch
---

Remove the spread effect's 10-second safety-net buffer added on top of the configured duration before force-finishing a transition. It now skips at exactly the configured duration, matching every other effect.
