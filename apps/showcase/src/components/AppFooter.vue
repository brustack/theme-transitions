<script setup lang="ts">
import IconGithub from "./icons/IconGithub.vue";
import IconNpm from "./icons/IconNpm.vue";
import IconVue from "./icons/IconVue.vue";
import IconReact from "./icons/IconReact.vue";
import IconNext from "./icons/IconNext.vue";
import IconNuxt from "./icons/IconNuxt.vue";
import IconAlpine from "./icons/IconAlpine.vue";
import IconJs from "./icons/IconJs.vue";

const packages = [
  { name: "Vue", slug: "vue-theme-transitions", icon: IconVue },
  { name: "React", slug: "react-theme-transitions", icon: IconReact },
  { name: "Next.js", slug: "next-theme-transitions", icon: IconNext },
  { name: "Nuxt", slug: "nuxt-theme-transitions", icon: IconNuxt },
  { name: "Alpine", slug: "alpine-theme-transitions", icon: IconAlpine },
  { name: "Vanilla / Core", slug: "theme-transitions-core", icon: IconJs },
];
</script>

<template>
  <div class="footer-bar" @click.stop>
    <div class="shell">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <a
            class="footer-brand"
            href="https://www.npmjs.com/package/@brustack/theme-transitions-core"
            target="_blank"
            rel="noopener"
          >
            <svg
              class="logo-mark"
              viewBox="0 0 226.77 226.77"
              width="18"
              height="18"
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
            <span>@brustack/theme-transitions</span>
          </a>
          <p class="footer-tagline">
            Animated theme transitions for six frameworks, sharing one
            framework-agnostic core. Zero dependencies.
          </p>
        </div>

        <div class="footer-col">
          <span class="footer-col-title">Packages</span>
          <a
            v-for="pkg in packages"
            :key="pkg.slug"
            class="pkg-link"
            :href="`https://www.npmjs.com/package/@brustack/${pkg.slug}`"
            target="_blank"
            rel="noopener"
          >
            <component :is="pkg.icon" />
            {{ pkg.name }}
          </a>
        </div>

        <div class="footer-col">
          <span class="footer-col-title">Project</span>
          <a
            href="https://github.com/brustack/theme-transitions"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >
          <a
            href="https://github.com/brustack/theme-transitions/issues"
            target="_blank"
            rel="noopener"
            >Issues</a
          >
          <a
            href="https://github.com/brustack/theme-transitions/blob/main/LICENSE"
            target="_blank"
            rel="noopener"
            >MIT License</a
          >
          <a href="#top">Live demo</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom-bar">
      <div class="shell footer-bottom">
        <span>&copy; 2026 BruStack &middot; MIT License</span>
        <div class="footer-social">
          <a
            class="footer-icon-link footer-icon-link--github"
            href="https://github.com/brustack/theme-transitions"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <IconGithub :size="14" />
          </a>
          <a
            class="footer-icon-link"
            href="https://www.npmjs.com/package/@brustack/theme-transitions-core"
            target="_blank"
            rel="noopener"
            aria-label="npm"
          >
            <IconNpm />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-bar {
  border-top: 1px solid var(--border);
  position: relative;
  z-index: 2;
}

.shell {
  max-width: 78rem;
  margin: 0 auto;
  width: 100%;
}

.footer-grid {
  padding: 3.5rem 1.75rem 2.5rem;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2.5rem;
}

.footer-brand-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.footer-brand .logo-mark {
  color: var(--logo-color);
  flex-shrink: 0;
}

.footer-brand:hover,
.footer-brand:hover .logo-mark {
  color: var(--accent);
}

.footer-tagline {
  margin: 0;
  max-width: 22rem;
  color: var(--text-muted);
  font-size: 0.8125rem;
  line-height: 1.6;
}

.footer-social {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: color 0.15s;
}

.footer-icon-link:hover {
  color: var(--text);
}

.footer-icon-link svg {
  width: 26px;
  height: 26px;
}

.footer-icon-link--github svg {
  width: 18px;
  height: 18px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
}

.footer-col-title {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  opacity: 0.7;
  margin-bottom: 0.3rem;
}

.footer-col a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8125rem;
  transition: color 0.15s;
}

.footer-col a:hover {
  color: var(--text);
}

.pkg-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.pkg-link svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.footer-bottom-bar {
  border-top: 1px solid var(--border);
}

.footer-bottom {
  padding: 1.1rem 1.75rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 44rem) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-brand-col {
    align-items: center;
    text-align: center;
  }

  .footer-tagline {
    max-width: none;
  }

  .footer-col {
    align-items: center;
    text-align: center;
  }

  .footer-bottom {
    justify-content: center;
    text-align: center;
  }
}
</style>
