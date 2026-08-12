<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import IconGithub from "./icons/IconGithub.vue";

const repo = "brustack/theme-transitions";
const stars = ref<number | null>(null);

const formattedStars = computed(() => {
  if (stars.value === null) return null;
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(stars.value);
});

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) return;
    const data = await res.json();
    stars.value = data.stargazers_count;
  } catch {
    stars.value = null;
  }
});
</script>

<template>
  <a
    class="github-badge"
    :href="`https://github.com/${repo}`"
    target="_blank"
    rel="noopener"
    aria-label="Star on GitHub"
    @click.stop
  >
    <IconGithub :size="18" />
    <span v-if="formattedStars" class="star-count">{{ formattedStars }}</span>
  </a>
</template>

<style scoped>
.github-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text);
  text-decoration: none;
  transition: color 0.15s;
}

.github-badge:hover {
  color: var(--accent);
}

.star-count {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 30rem) {
  .star-count {
    display: none;
  }
}
</style>
