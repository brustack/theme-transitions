<script setup lang="ts">
import IconInfo from "./icons/IconInfo.vue";

defineProps<{ html: string }>();
</script>

<template>
  <div class="callout">
    <IconInfo :size="16" class="callout-icon" />
    <p v-html="html" />
  </div>
</template>

<style scoped>
.callout {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  margin-top: 0.85rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  background: var(--accent-tint);
}

.callout-icon {
  flex-shrink: 0;
  margin-top: 0.15rem;
  color: var(--accent);
}

.callout p {
  margin: 0;
  min-width: 0;
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.callout :deep(code) {
  font-family: var(--font-sans);
  font-size: 0.8em;
}
</style>
