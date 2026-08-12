<script setup lang="ts">
import { computed, ref } from "vue";
import { originFromElement } from "@brustack/theme-transitions-core";
import type {
  ThemeName,
  ThemeOrigin,
} from "@brustack/theme-transitions-core";
import IconSun from "./icons/IconSun.vue";
import IconMoon from "./icons/IconMoon.vue";
import IconMonitor from "./icons/IconMonitor.vue";
import IconSnowflake from "./icons/IconSnowflake.vue";
import { useClickOutside } from "../composables/useClickOutside";

const props = defineProps<{
  mode: ThemeName;
  theme: ThemeName;
}>();

const emit = defineEmits<{
  select: [mode: ThemeName, origin: ThemeOrigin | null];
}>();

const options: ThemeName[] = ["system", "light", "dark", "nord"];

const icons: Record<string, unknown> = {
  system: IconMonitor,
  light: IconSun,
  dark: IconMoon,
  nord: IconSnowflake,
};

const currentIcon = computed(() => icons[props.mode] ?? IconMonitor);
const isOpen = ref(false);
const rootEl = ref<HTMLElement | null>(null);

useClickOutside(rootEl, () => {
  isOpen.value = false;
});

const handleSelect = (option: ThemeName, event: MouseEvent) => {
  emit(
    "select",
    option,
    originFromElement(event.currentTarget as HTMLElement),
  );
  isOpen.value = false;
};
</script>

<template>
  <div ref="rootEl" class="control-group">
    <button
      type="button"
      class="mode-btn"
      :aria-expanded="isOpen"
      aria-controls="mode-panel"
      :aria-label="`Theme mode: ${mode}`"
      @click="isOpen = !isOpen"
    >
      <component :is="currentIcon" :size="20" aria-hidden="true" />
    </button>

    <div id="mode-panel" class="mode-panel" :class="{ open: isOpen }">
      <div class="mode-panel-inner">
        <div class="pill-group" role="group" aria-label="Theme mode">
          <button
            v-for="option in options"
            :key="option"
            type="button"
            :aria-pressed="mode === option"
            @click="handleSelect(option, $event)"
          >
            {{ option }}
          </button>
        </div>
        <span v-if="mode === 'system'" class="status-line"
          >detected: {{ theme }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.control-group {
  position: relative;
  display: flex;
}

.mode-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: var(--text);
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}

.mode-btn:hover,
.mode-btn[aria-expanded="true"] {
  color: var(--accent);
}

.mode-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.mode-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  width: max-content;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.2s ease,
    opacity 0.2s ease;
  pointer-events: none;
}

.mode-panel.open {
  grid-template-rows: 1fr;
  opacity: 1;
  pointer-events: auto;
}

.mode-panel-inner {
  min-height: 0;
  overflow: hidden;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
}

.pill-group {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg);
}

.pill-group button {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  border: none;
  background: transparent;
  color: var(--text-muted);
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s,
    color 0.15s;
}

.pill-group button[aria-pressed="true"] {
  background: var(--text);
  color: var(--bg);
}

.pill-group button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.status-line {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  color: var(--text-muted);
  opacity: 0.75;
  padding-left: 0.35rem;
}

@media (max-width: 68.75rem) {
  .mode-panel {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: calc(100vw - 2rem);
  }
}
</style>
