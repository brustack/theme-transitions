<script setup lang="ts">
import BaseIcon from "../../icons/BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </BaseIcon>
</template>
