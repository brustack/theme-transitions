<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="8" y1="20" x2="16" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </BaseIcon>
</template>
