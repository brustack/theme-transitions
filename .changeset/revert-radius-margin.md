---
"@brustack/theme-transitions-core": patch
---

Revert the spread effect's radius margin back to a small fixed value. The 20% proportional margin made things worse on a real device (a case that worked at the screen center regressed after the increase), suggesting large clip-path radii are themselves costly to render on some mobile browsers rather than the radius being insufficiently sized.
