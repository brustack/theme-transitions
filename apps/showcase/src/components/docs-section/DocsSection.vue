<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";
import Callout from "./Callout.vue";
import type { DocSectionDef } from "./docsContent";
import type { Framework } from "./snippets";

const props = defineProps<{ section: DocSectionDef; framework: Framework }>();

const title = computed(() =>
  typeof props.section.title === "function" ? props.section.title(props.framework) : props.section.title,
);
const blocks = computed(() => props.section.blocks(props.framework));
</script>

<template>
  <section :id="section.id" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">{{ section.eyebrow }}</span>
      <h3>{{ title }}</h3>
      <p v-html="section.description" />
    </div>

    <template v-for="(block, index) in blocks" :key="index">
      <div v-if="block.kind === 'badges'" class="pkg-badges">
        <a
          v-for="item in block.items"
          :key="item.href"
          :href="item.href"
          target="_blank"
          rel="noopener"
          >{{ item.label }}</a
        >
      </div>

      <div v-else-if="block.kind === 'code'" class="code-stack" :class="{ 'code-stack-spaced': block.spaced }">
        <CodeBlock v-for="entry in block.entries" :key="entry.file" :file="entry.file" :code="entry.code" />
      </div>

      <div v-else-if="block.kind === 'table'" class="table-wrap">
        <table class="spec">
          <thead v-if="block.headers">
            <tr>
              <th v-for="header in block.headers" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex" v-html="cell" />
            </tr>
          </tbody>
        </table>
      </div>

      <Callout v-else-if="block.kind === 'callout'" :html="block.html" />

      <h4 v-else-if="block.kind === 'subhead'" class="subhead">{{ block.text }}</h4>

      <p v-else-if="block.kind === 'paragraph'" class="lede-p" v-html="block.html" />
    </template>
  </section>
</template>

<style scoped>
.subhead {
  font-size: 1rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  letter-spacing: -0.01em;
}

.lede-p {
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0 0 0.75rem;
  max-width: 38rem;
}

.table-wrap :deep(.muted) {
  opacity: 0.6;
}

.code-stack-spaced {
  margin-top: 1.5rem;
}
</style>
