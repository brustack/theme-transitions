<script setup lang="ts">
import SectionGlow from "./SectionGlow.vue";
import IconVue from "./icons/IconVue.vue";
import IconReact from "./icons/IconReact.vue";
import IconNext from "./icons/IconNext.vue";
import IconNuxt from "./icons/IconNuxt.vue";
import IconAlpine from "./icons/IconAlpine.vue";
import IconAngular from "./icons/IconAngular.vue";
import IconJs from "./icons/IconJs.vue";
</script>

<template>
  <main>
    <SectionGlow id="hero-glow" :wash-opacity="0.3" :z-index="-10" />
    <div class="hero-content">
      <p class="eyebrow">View Transitions API &middot; Configurable Effects</p>
      <h1>Click <em>anywhere</em>.</h1>
      <p class="sub">
        An animated theme switch, built with the View Transitions API.
      </p>
      <a class="cta" href="#get-started" @click.stop> Get started </a>
      <div
        class="frameworks-line"
        aria-label="Works with Vue, React, Next.js, Nuxt, Alpine, Angular, and Vanilla JS"
        @click.stop
      >
        <IconVue aria-hidden="true" />
        <IconReact aria-hidden="true" />
        <IconNext aria-hidden="true" />
        <IconNuxt aria-hidden="true" />
        <IconAlpine aria-hidden="true" />
        <IconAngular aria-hidden="true" />
        <IconJs aria-hidden="true" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  min-height: calc(100svh - var(--topbar-height, 4.5rem));
  position: relative;
  cursor: pointer;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.eyebrow {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 1rem;
}

h1 {
  font-family: "Fraunces", ui-serif, Georgia, serif;
  font-weight: 500;
  font-size: clamp(2.75rem, 8vw, 5.5rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  margin: 0;
  text-wrap: balance;
}

h1 em {
  font-family: "Fraunces", ui-serif, Georgia, serif;
  font-weight: 400;
  font-style: italic;
  color: var(--accent);
  transition: color 0.4s;
}

.sub {
  margin: 1rem 0 0;
  max-width: 34ch;
  font-size: 1.0625rem;
  color: var(--text-muted);
  text-wrap: balance;
}

.cta {
  display: inline-flex;
  align-items: center;
  margin-top: 2.25rem;
  padding: 0.8rem 1.85rem;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 10px;
  transition: filter 0.15s, transform 0.15s;
}

.cta:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.cta:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.frameworks-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  margin: 2.5rem 0 0;
  opacity: 0.75;
  cursor: default;
}

.frameworks-line svg {
  width: 24px;
  height: 24px;
}
</style>
