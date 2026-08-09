---
"@brustack/theme-transitions-core": patch
---

Wait for the visual viewport to stop resizing before starting a transition. Triggering a transition right as an on-screen keyboard closes could capture the "old" snapshot mid-resize, showing a blank flash instead of the previous page state.
