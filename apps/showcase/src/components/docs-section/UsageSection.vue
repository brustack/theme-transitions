<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";
import { usageSnippets } from "./snippets";
import type { Framework } from "./snippets";

const props = defineProps<{ framework: Framework }>();

const blocks = computed(() => usageSnippets[props.framework]);
</script>

<template>
  <section id="usage" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">02 &middot; Usage</span>
      <h3>The bare call</h3>
      <p>
        No provider, no context, no config required to start.
        <code>toggleTheme</code> reads the click position automatically.
      </p>
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
