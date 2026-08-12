<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";
import { installSnippets, PACKAGE_DIRS, PACKAGE_SLUGS } from "./snippets";
import type { Framework } from "./snippets";

const props = defineProps<{ framework: Framework }>();

const blocks = computed(() => installSnippets[props.framework]);
const slug = computed(() => PACKAGE_SLUGS[props.framework]);
const dir = computed(() => PACKAGE_DIRS[props.framework]);
</script>

<template>
  <section id="install" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">01 &middot; Install</span>
      <h3>One package for {{ framework }}</h3>
      <p>
        Every adapter wraps the same framework-agnostic core, so the install
        is always one package.
      </p>
    </div>
    <div class="pkg-badges">
      <a
        :href="`https://www.npmjs.com/package/@brustack/${slug}`"
        target="_blank"
        rel="noopener"
        >npm</a
      >
      <a
        :href="`https://bundlephobia.com/package/@brustack/${slug}`"
        target="_blank"
        rel="noopener"
        >bundle size &#8599;</a
      >
      <a
        :href="`https://github.com/brustack/theme-transitions/blob/main/packages/${dir}/LICENSE`"
        target="_blank"
        rel="noopener"
        >MIT License</a
      >
    </div>
    <div class="code-stack">
      <CodeBlock
        v-for="block in blocks"
        :key="block.file"
        :file="block.file"
        :code="block.code"
      />
    </div>
  </section>
</template>

