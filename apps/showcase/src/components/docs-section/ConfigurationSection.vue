<script setup lang="ts">
import CodeBlock from "./CodeBlock.vue";
import Callout from "./Callout.vue";

const code = `useThemeTransition({ <span class="tok-prop">themes</span>: [<span class="tok-str">'nord'</span>, <span class="tok-str">'sunset'</span>] })`;
</script>

<template>
  <section id="configuration" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">04 &middot; Configuration</span>
      <h3>Effects, and themes beyond light/dark</h3>
      <p>
        Optional. The first call in your app sets the shared default; every
        later call can override just itself.
      </p>
    </div>
    <div class="table-wrap">
      <table class="spec">
        <thead>
          <tr>
            <th>Variant</th>
            <th>duration</th>
            <th>easing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>spread</code></td>
            <td><code>'1s'</code></td>
            <td>n/a</td>
          </tr>
          <tr>
            <td><code>fade</code> <span class="muted">(default)</span></td>
            <td><code>'400ms'</code></td>
            <td><code>'ease'</code></td>
          </tr>
          <tr>
            <td><code>none</code></td>
            <td>n/a</td>
            <td>n/a</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 class="subhead">Custom themes</h4>
    <p class="lede-p">
      Register extra theme names beyond <code>light</code>/<code>dark</code>/<code>system</code>
      via <code>themes</code>:
    </p>
    <CodeBlock file="example" :code="code" />
    <Callout>
      <code>setTheme('nord')</code> then applies a <code>nord</code> class the
      same way <code>light</code>/<code>dark</code> do (see Styling above).
      That's exactly what the <code>nord</code> option in this demo is: a
      custom theme name, registered the same way you'd register your own.
      <code>controller.getState().themes</code> always includes
      <code>['light', 'dark', 'system', ...your custom names]</code>, useful
      for building a theme switcher. <code>toggleTheme()</code> is
      unaffected, it always flips between <code>light</code> and
      <code>dark</code>.
    </Callout>
  </section>
</template>

<style scoped>
.muted {
  opacity: 0.6;
}

.subhead {
  font-size: 1rem;
  font-weight: 600;
  margin: 2rem 0 0.5rem;
  letter-spacing: -0.01em;
}

.lede-p {
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0 0 0.75rem;
  max-width: 38rem;
}
</style>
