<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";
import Callout from "./Callout.vue";
import IconInfo from "./icons/IconInfo.vue";
import type { DocSectionDef } from "./docsContent";
import type { Framework } from "./snippets";

const props = defineProps<{ section: DocSectionDef; framework: Framework }>();

const title = computed(() =>
  typeof props.section.title === "function"
    ? props.section.title(props.framework)
    : props.section.title,
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

      <div
        v-else-if="block.kind === 'code'"
        class="code-stack"
        :class="{ 'code-stack-spaced': block.spaced }"
      >
        <CodeBlock
          v-for="entry in block.entries"
          :key="entry.file"
          :file="entry.file"
          :code="entry.code"
        />
      </div>

      <div v-else-if="block.kind === 'table'" class="table-wrap">
        <table class="spec">
          <thead v-if="block.headers">
            <tr>
              <th v-for="header in block.headers" :key="header">
                {{ header }}
                <span
                  v-if="block.headerTooltips?.[header]"
                  class="info-tip"
                  tabindex="0"
                >
                  <IconInfo :size="12" />
                  <span
                    class="info-tip-panel"
                    v-html="block.headerTooltips[header]"
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
              <td
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                v-html="cell"
              />
            </tr>
          </tbody>
        </table>
      </div>

      <Callout v-else-if="block.kind === 'callout'" :html="block.html" />

      <h4 v-else-if="block.kind === 'subhead'" class="subhead">
        {{ block.text }}
      </h4>

      <p
        v-else-if="block.kind === 'paragraph'"
        class="lede-p"
        v-html="block.html"
      />
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

.info-tip {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-left: 0.3rem;
  color: var(--text-muted);
  cursor: help;
}

.info-tip-panel {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: max-content;
  max-width: 16rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 0.6rem 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.6;
  text-transform: none;
  letter-spacing: normal;
  color: var(--text);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 10;
}

.info-tip:hover .info-tip-panel,
.info-tip:focus-visible .info-tip-panel {
  opacity: 1;
  pointer-events: auto;
}
</style>
