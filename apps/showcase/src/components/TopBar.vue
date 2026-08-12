<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type {
  ThemeName,
  ThemeOrigin,
} from "@brustack/theme-transitions-core";
import Wordmark from "./Wordmark.vue";
import GithubStars from "./GithubStars.vue";
import ModePicker from "./ModePicker.vue";
import EffectPicker, { type EffectOptions } from "./EffectPicker.vue";

defineProps<{
  mode: ThemeName;
  theme: ThemeName;
}>();

const effectOptions = defineModel<EffectOptions>("effectOptions", {
  required: true,
});

defineEmits<{
  selectMode: [mode: ThemeName, origin: ThemeOrigin | null];
}>();

const topbarBar = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  if (!topbarBar.value) return;
  resizeObserver = new ResizeObserver(([entry]) => {
    document.documentElement.style.setProperty(
      "--topbar-height",
      `${entry.target.getBoundingClientRect().height}px`,
    );
  });
  resizeObserver.observe(topbarBar.value);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div ref="topbarBar" class="topbar-bar" @click.stop>
    <div class="topbar">
      <Wordmark />
      <div class="controls">
        <ModePicker
          :mode="mode"
          :theme="theme"
          @select="(m, origin) => $emit('selectMode', m, origin)"
        />
        <EffectPicker v-model="effectOptions" />
        <GithubStars />
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.topbar {
  max-width: 78rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.75rem;
  gap: 0.75rem;
}

.controls {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: flex-end;
  gap: 0.75rem 1rem;
  position: relative;
  z-index: 2;
}
</style>
