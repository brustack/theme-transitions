<script setup lang="ts">
interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Multiple effects",
    description:
      "Spread, fade, or none. Pick the transition that fits your app, with full control over duration and easing.",
    icon: '<circle cx="9" cy="9" r="6"/><circle cx="15" cy="9" r="6"/><circle cx="12" cy="15" r="6"/>',
  },
  {
    title: "Zero flash on load",
    description:
      "An anti-flash init script sets the theme before the page paints, even with SSR frameworks like Next.js and Nuxt.",
    icon: '<path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6z"/>',
  },
  {
    title: "Syncs with the OS",
    description:
      "Detects prefers-color-scheme automatically, and updates live if the user changes their system setting.",
    icon: '<rect x="3" y="4" width="18" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/>',
  },
  {
    title: "Custom themes",
    description:
      "Not just light and dark. Register theme names like nord or sunset the same way the built-ins work.",
    icon: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  },
  {
    title: "One core, six adapters",
    description:
      "A framework-agnostic core with thin, idiomatic adapters for Vue, React, Next.js, Nuxt, and Alpine.",
    icon: '<rect x="7" y="7" width="10" height="10" rx="2"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
  },
  {
    title: "Origin-aware",
    description:
      "The spread effect reads the click or tap position automatically. Bind toggleTheme straight to onClick.",
    icon: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
  },
  {
    title: "Zero dependencies",
    description:
      "No runtime dependencies in the core package. Ships small, and stays small.",
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="8" y1="8" x2="16" y2="16"/><line x1="16" y1="8" x2="8" y2="16"/>',
  },
  {
    title: "Fully typed",
    description:
      "A typed API across every adapter, with autocomplete for every option and every event.",
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
];
</script>

<template>
  <section class="features" @click.stop>
    <div class="features-lede">
      <h2>Everything you need, nothing you don't.</h2>
      <p>Small library, real capabilities. Here's what's actually in it.</p>
    </div>
    <div class="features-grid">
      <div v-for="feature in features" :key="feature.title" class="feature">
        <svg
          class="feature-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          v-html="feature.icon"
        />
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  border-top: 1px solid var(--border);
  padding: 5rem 1.5rem 5.5rem;
  background: linear-gradient(var(--section-fade) 0%, var(--bg) 25%);
}

.features-lede {
  max-width: 34rem;
  margin: 0 auto 3.5rem;
  text-align: center;
}

.features-lede h2 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  font-weight: 900;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  letter-spacing: -0.01em;
  margin: 0 0 0.6rem;
  text-wrap: balance;
}

.features-lede p {
  color: var(--text-muted);
  margin: 0;
  text-wrap: balance;
}

.features-grid {
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem 2rem;
}

.feature-icon {
  width: 22px;
  height: 22px;
  color: var(--accent);
  margin-bottom: 0.9rem;
}

.feature h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
  letter-spacing: -0.005em;
}

.feature p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 56rem) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 30rem) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
