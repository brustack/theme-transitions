<template>
  <a
    class="wordmark"
    href="https://github.com/brustack/theme-transitions"
    target="_blank"
    rel="noopener"
    @click.stop
  >
    <svg
      class="logo-mark"
      viewBox="0 0 226.77 226.77"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon
        points="153.73 83.39 153.73 153.73 83.39 153.73 83.39 213.73 213.73 213.73 213.73 83.39 153.73 83.39"
      />
      <rect x="83.39" y="13.04" width="60" height="60" />
      <rect x="13.04" y="83.39" width="60" height="60" />
      <rect x="83.39" y="83.39" width="60" height="60" />
    </svg>
    <strong>BruStack</strong>
    <span class="version-badge">v3.0.0</span>
  </a>
</template>

<style scoped>
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.01em;
}

.logo-mark {
  color: var(--logo-color);
  flex-shrink: 0;
}

.wordmark strong {
  color: var(--inverse-bg);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.version-badge {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
}
</style>
