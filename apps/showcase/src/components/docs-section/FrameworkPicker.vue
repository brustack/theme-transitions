<script setup lang="ts">
import { FRAMEWORKS, type Framework } from "./snippets";
import IconVue from "../icons/IconVue.vue";
import IconReact from "../icons/IconReact.vue";
import IconNext from "../icons/IconNext.vue";
import IconNuxt from "../icons/IconNuxt.vue";
import IconAlpine from "../icons/IconAlpine.vue";
import IconJs from "../icons/IconJs.vue";

const model = defineModel<Framework>({ required: true });

const ICONS: Record<Framework, unknown> = {
  Vue: IconVue,
  React: IconReact,
  "Next.js": IconNext,
  Nuxt: IconNuxt,
  Alpine: IconAlpine,
  Vanilla: IconJs,
};
</script>

<template>
  <div class="framework-picker">
    <span class="control-label">Show code for</span>
    <div class="pill-group" role="group" aria-label="Framework">
      <button
        v-for="framework in FRAMEWORKS"
        :key="framework"
        type="button"
        :aria-pressed="model === framework"
        @click="model = framework"
      >
        <component :is="ICONS[framework]" />
        {{ framework }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.framework-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto 4rem;
}

.control-label {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  opacity: 0.7;
}

.pill-group {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.35rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--text) 5%, var(--surface));
}

.pill-group button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background-color 0.15s,
    border-color 0.15s,
    color 0.15s,
    transform 0.15s;
}

.pill-group button[aria-pressed="true"] {
  background: var(--bg);
  border-color: var(--border);
  color: var(--text);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.pill-group button:hover:not([aria-pressed="true"]) {
  color: var(--text);
  transform: translateY(-1px);
}
</style>
