<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="4.5" y1="6" x2="19.5" y2="18" />
    <line x1="19.5" y1="6" x2="4.5" y2="18" />
    <path d="M12 2l-2 2M12 2l2 2" />
    <path d="M12 22l-2-2M12 22l2-2" />
    <path d="M4.5 6l.5-2.7M4.5 6l2.7-.5" />
    <path d="M19.5 18l-.5 2.7M19.5 18l-2.7.5" />
    <path d="M19.5 6l-2.7-.5M19.5 6l-.5-2.7" />
    <path d="M4.5 18l2.7.5M4.5 18l.5 2.7" />
  </BaseIcon>
</template>
