<script setup lang="ts">
import { useScrollSpy } from "../../composables/useScrollSpy";
import IconDownload from "./icons/IconDownload.vue";
import IconTerminal from "./icons/IconTerminal.vue";
import IconDroplet from "./icons/IconDroplet.vue";
import IconSettings from "../icons/IconSettings.vue";
import IconCode from "./icons/IconCode.vue";
import IconZap from "./icons/IconZap.vue";

const items = [
  { id: "install", label: "Install", icon: IconDownload },
  { id: "usage", label: "Usage", icon: IconTerminal },
  { id: "styling", label: "Styling", icon: IconDroplet },
  { id: "configuration", label: "Configuration", icon: IconSettings },
  { id: "api", label: "API", icon: IconCode },
  { id: "bundlers", label: "Bundlers", icon: IconZap },
];

const { activeId } = useScrollSpy(
  items.map((item) => item.id),
  ".framework-picker",
);
</script>

<template>
  <nav class="docs-sidebar" aria-label="Documentation sections">
    <a
      v-for="item in items"
      :key="item.id"
      :href="`#${item.id}`"
      :class="{ active: activeId === item.id }"
    >
      <component :is="item.icon" :size="15" />
      {{ item.label }}
    </a>
  </nav>
</template>

<style scoped>
.docs-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  position: sticky;
  top: 6.5rem;
}

.docs-sidebar a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem;
  border-left: 2px solid transparent;
  border-radius: 0 6px 6px 0;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8125rem;
  transition:
    color 0.15s,
    border-color 0.15s,
    background-color 0.15s;
}

.docs-sidebar a:hover {
  color: var(--text);
}

.docs-sidebar a.active {
  color: var(--accent);
  border-left-color: var(--accent);
  background: var(--accent-tint);
  font-weight: 500;
}

@media (max-width: 68.75rem) {
  .docs-sidebar {
    display: none;
  }
}
</style>
