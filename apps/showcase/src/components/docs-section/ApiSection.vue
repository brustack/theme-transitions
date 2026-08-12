<template>
  <section id="api" class="doc-section">
    <div class="doc-section-head">
      <span class="doc-index">05 &middot; API</span>
      <h3>The shape every adapter returns</h3>
      <p>
        React's hook, Vue's composable, Nuxt's auto-import, and Alpine's
        <code>x-data</code> all expose the same fields.
      </p>
    </div>
    <div class="table-wrap">
      <table class="spec">
        <tbody>
          <tr>
            <td><code>theme</code></td>
            <td>
              Current resolved theme: <code>'light'</code>,
              <code>'dark'</code>, or a custom name
            </td>
          </tr>
          <tr>
            <td><code>mode</code></td>
            <td>Current preference, including <code>'system'</code></td>
          </tr>
          <tr>
            <td><code>isAnimating</code></td>
            <td><code>true</code> while a transition is running</td>
          </tr>
          <tr>
            <td><code>themes</code></td>
            <td>
              All registered names:
              <code>['light','dark','system',...custom]</code>
            </td>
          </tr>
          <tr>
            <td><code>toggleTheme(event?)</code></td>
            <td>Switch between light and dark</td>
          </tr>
          <tr>
            <td><code>setTheme(mode, event?)</code></td>
            <td>Set a specific mode or custom theme</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
