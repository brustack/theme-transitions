<script setup lang="ts">
import BaseIcon from "../../icons/BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </BaseIcon>
</template>
