<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "./CodeBlock.vue";
import Callout from "./Callout.vue";
import type { Framework } from "./snippets";

const props = defineProps<{ framework: Framework }>();

const cssCode = `:root {
  <span class="tok-prop">--bg</span>: <span class="tok-str">#ffffff</span>;
  <span class="tok-prop">--text</span>: <span class="tok-str">#111111</span>;
}

html.dark {
  <span class="tok-prop">--bg</span>: <span class="tok-str">#0b0b10</span>;
  <span class="tok-prop">--text</span>: <span class="tok-str">#f4f2ed</span>;
}

html.nord {
  <span class="tok-prop">--bg</span>: <span class="tok-str">#2e3440</span>;
  <span class="tok-prop">--text</span>: <span class="tok-str">#eceff4</span>;
}

body {
  background: var(<span class="tok-prop">--bg</span>);
  color: var(<span class="tok-prop">--text</span>);
}`;

const tailwindCode = `<span class="tok-com">// tailwind.config.js</span>
<span class="tok-kw">module.exports</span> = {
  darkMode: <span class="tok-str">'class'</span>,
  theme: {
    extend: {
      colors: {
        bg: <span class="tok-str">'var(--bg)'</span>,
        text: <span class="tok-str">'var(--text)'</span>,
      },
    },
  },
};`;

const styledComponentsCode = `<span class="tok-com">// App.tsx</span>
<span class="tok-kw">import</span> { createGlobalStyle } <span class="tok-kw">from</span> <span class="tok-str">'styled-components'</span>;
<span class="tok-kw">import</span> { ThemeToggle } <span class="tok-kw">from</span> <span class="tok-str">'./theme-toggle'</span>;

<span class="tok-kw">const</span> GlobalStyle = <span class="tok-fn">createGlobalStyle</span>\`
  :root {
    --bg: #ffffff;
    --text: #111111;
  }

  html.dark {
    --bg: #0b0b10;
    --text: #f4f2ed;
  }

  html.nord {
    --bg: #2e3440;
    --text: #eceff4;
  }
\`;

<span class="tok-kw">export const</span> App = () =&gt; (
  &lt;&gt;
    &lt;GlobalStyle /&gt;
    &lt;ThemeToggle /&gt;
  &lt;/&gt;
);`;

const showsStyledComponents = computed(() =>
  props.framework === "React" || props.framework === "Next.js",
);
</script>

<template>
  <section id="styling" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">03 &middot; Styling</span>
      <h3>The same CSS in every adapter</h3>
      <p>
        Whichever theme is active gets applied as a class on
        <code>&lt;html&gt;</code>, so styling is plain CSS, no runtime style
        props to fight.
      </p>
    </div>

    <h4 class="subhead">CSS variables</h4>
    <CodeBlock file="style.css" :code="cssCode" />
    <Callout>
      The class matches whatever <code>theme</code> resolves to, built-in or
      custom, so <code>html.nord</code> above is the same rule that lit up
      when you tried nord in the demo.
    </Callout>

    <h4 class="subhead">Tailwind</h4>
    <p class="lede-p">
      Set <code>darkMode: 'class'</code> in your Tailwind config, then map
      your color tokens to the CSS variables above:
    </p>
    <CodeBlock file="tailwind.config.js" :code="tailwindCode" />

    <template v-if="showsStyledComponents">
      <h4 class="subhead">Styled-components (or any CSS-in-JS)</h4>
      <CodeBlock file="App.tsx" :code="styledComponentsCode" />
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
</style>
