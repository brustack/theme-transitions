<script setup lang="ts">
import { ref } from "vue";
import IconCopy from "./icons/IconCopy.vue";

const props = defineProps<{ file: string; code: string }>();

const copied = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const copy = async () => {
  const pre = document.createElement("pre");
  pre.innerHTML = props.code;
  await navigator.clipboard?.writeText(pre.innerText).catch(() => {});
  copied.value = true;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    copied.value = false;
  }, 1200);
};
</script>

<template>
  <div class="code-card">
    <div class="code-file">
      <span>{{ file }}</span>
      <button
        type="button"
        class="copy-btn"
        aria-label="Copy"
        @click="copy"
      >
        <IconCopy v-if="!copied" :size="14" />
        <span v-else class="copied-label">Copied</span>
      </button>
    </div>
    <pre v-html="code" />
  </div>
</template>

<style scoped>
.code-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.code-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.7rem 0.55rem 0.9rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.code-file span {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  color: var(--text-muted);
  letter-spacing: 0.01em;
}

.code-card :deep(pre) {
  margin: 0;
  padding: 1.1rem 1.25rem;
  overflow-x: auto;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
}

.copy-btn {
  flex-shrink: 0;
  min-width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.4rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  cursor: pointer;
}

.copy-btn:hover {
  color: var(--text);
}

.copied-label {
  font-family: var(--font-sans);
  font-size: 0.625rem;
}

.code-card :deep(.tok-kw) {
  color: #d6336c;
}

.code-card :deep(.tok-fn) {
  color: #1971c2;
}

.code-card :deep(.tok-str) {
  color: #2f9e44;
}

.code-card :deep(.tok-com) {
  color: var(--text-muted);
}

.code-card :deep(.tok-prop) {
  color: #e8590c;
}

:root.dark .code-card :deep(.tok-kw) {
  color: #ff8fb3;
}

:root.dark .code-card :deep(.tok-fn) {
  color: #7fd4ff;
}

:root.dark .code-card :deep(.tok-str) {
  color: #b9e88f;
}

:root.dark .code-card :deep(.tok-prop) {
  color: #f5c26b;
}
</style>
