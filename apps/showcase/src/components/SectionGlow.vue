<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    washOpacity?: number;
    zIndex?: number;
    color?: string;
    showLine?: boolean;
  }>(),
  {
    washOpacity: 0.3,
    zIndex: 0,
    color: "var(--accent)",
    showLine: true,
  },
);
</script>

<template>
  <svg
    class="section-glow"
    :style="{ zIndex, color }"
    viewBox="0 0 1440 181"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M0 0H1440V181H0V0Z"
      :fill="`url(#${id}-wash)`"
      :fill-opacity="washOpacity"
    />
    <path v-if="showLine" d="M0 2H1440V-2H0V2Z" :fill="`url(#${id}-line)`" />
    <defs>
      <linearGradient
        :id="`${id}-wash`"
        x1="720"
        y1="0"
        x2="720"
        y2="181"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="currentColor" />
        <stop offset="0.55" stop-color="currentColor" stop-opacity="0.35" />
        <stop offset="1" stop-color="currentColor" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        v-if="showLine"
        :id="`${id}-line`"
        x1="0"
        y1="90.5"
        x2="1440"
        y2="90.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="currentColor" stop-opacity="0" />
        <stop offset="0.395" stop-color="currentColor" />
        <stop offset="1" stop-color="currentColor" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
.section-glow {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  pointer-events: none;
  flex-shrink: 0;
  transition: color 0.4s;
}
</style>
