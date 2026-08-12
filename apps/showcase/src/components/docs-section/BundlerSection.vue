<script setup lang="ts">
import CodeBlock from "./CodeBlock.vue";
import Callout from "./Callout.vue";

const viteCode = `<span class="tok-kw">import</span> { defineConfig } <span class="tok-kw">from</span> <span class="tok-str">'vite'</span>;
<span class="tok-kw">import</span> { themeTransitions } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/theme-transitions-core/vite'</span>;

<span class="tok-kw">export default</span> <span class="tok-fn">defineConfig</span>({
  plugins: [<span class="tok-fn">themeTransitions</span>()],
});`;

const webpackCode = `<span class="tok-kw">const</span> { buildColorModeInitScript } = <span class="tok-fn">require</span>(<span class="tok-str">'@brustack/theme-transitions-core'</span>);

<span class="tok-kw">new</span> <span class="tok-fn">HtmlWebpackPlugin</span>({
  templateParameters: { themeInitScript: <span class="tok-fn">buildColorModeInitScript</span>() },
});`;

const templateCode = `<span class="tok-com">&lt;!-- inside &lt;head&gt;, before your bundle's own scripts --&gt;</span>
<span class="tok-kw">&lt;script&gt;</span>&lt;%= htmlWebpackPlugin.options.templateParameters.themeInitScript %&gt;<span class="tok-kw">&lt;/script&gt;</span>`;
</script>

<template>
  <section id="bundlers" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">06 &middot; Vite plugin &amp; other bundlers</span>
      <h3>The anti-flash script, wired into your build</h3>
      <p>
        Using Vite, register the plugin once. Anything else, the plugin is
        just a thin wrapper around two exported functions, call them
        directly.
      </p>
    </div>
    <CodeBlock file="vite.config.ts" :code="viteCode" />
    <Callout>
      Pass default effect options, e.g.
      <code>themeTransitions({ variant: 'spread' })</code>, so every
      <code>getController()</code> call in the app picks them up without
      repeating them.
    </Callout>
    <div class="code-stack" style="margin-top: 1.5rem">
      <CodeBlock file="webpack.config.js" :code="webpackCode" />
      <CodeBlock file="index.html" :code="templateCode" />
    </div>
    <Callout>
      Zero-build or CDN consumers can't call
      <code>buildColorModeInitScript()</code> themselves. The core package
      also ships <code>dist/theme-init.js</code>, a prebuilt copy of the same
      script, loadable with a plain
      <code>&lt;script src="...theme-init.js"&gt;</code> tag in
      <code>&lt;head&gt;</code>.
    </Callout>
  </section>
</template>

<style scoped>
.code-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
