<script setup lang="ts">
import BaseIcon from "../../icons/BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </BaseIcon>
</template>
