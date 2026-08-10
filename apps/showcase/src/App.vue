<script setup lang="ts">
import { ref } from "vue";
import { useThemeTransition } from "@brustack/vue-theme-transitions";
import {
  originFromEvent,
  resolveTheme,
} from "@brustack/theme-transitions-core";
import type { ThemeName, ThemeOrigin } from "@brustack/theme-transitions-core";
import TopBar from "./components/TopBar.vue";
import Hero from "./components/Hero.vue";
import AppFooter from "./components/AppFooter.vue";
import type { EffectOptions } from "./components/EffectPicker.vue";

const { theme, mode, toggleTheme, setTheme } = useThemeTransition({
  variant: "spread",
  themes: ["sepia"],
});

const effectOptions = ref<EffectOptions>({
  variant: "spread",
  duration: "1s",
});

const glow = ref({ x: 0, y: 0, color: "", firing: false });

const fireGlow = (x: number, y: number, color: string) => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  glow.value = { x, y, color, firing: false };
  requestAnimationFrame(() => {
    glow.value = { ...glow.value, firing: true };
  });
};

const glowColorFor = (nextTheme: string) => {
  if (nextTheme === "dark") return "#7C6CF0";
  if (nextTheme === "sepia") return "#B5651D";
  return "#F5A623";
};

const handleSelectMode = (nextMode: ThemeName, origin: ThemeOrigin | null) => {
  const nextTheme = resolveTheme(nextMode);

  if (nextTheme !== theme.value && origin) {
    fireGlow(origin.x, origin.y, glowColorFor(nextTheme));
  }

  setTheme(nextMode, { origin, ...effectOptions.value });
};

const handleBodyClick = (event: MouseEvent) => {
  const nextTheme = theme.value === "light" ? "dark" : "light";
  fireGlow(event.clientX, event.clientY, glowColorFor(nextTheme));
  toggleTheme({ origin: originFromEvent(event), ...effectOptions.value });
};
</script>

<template>
  <div class="page" @click="handleBodyClick">
    <div
      class="glow"
      :class="{ firing: glow.firing }"
      :style="{
        left: `${glow.x}px`,
        top: `${glow.y}px`,
        background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
      }"
    />

    <TopBar
      :mode="mode"
      :theme="theme"
      v-model:effect-options="effectOptions"
      @select-mode="handleSelectMode"
    />
    <Hero />
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
}

.glow {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none;
  opacity: 0;
  z-index: 0;
}

.glow.firing {
  animation: glow-pulse 0.7s ease-out forwards;
}

@keyframes glow-pulse {
  0% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(22);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow.firing {
    animation: none;
    opacity: 0;
  }
}
</style>
