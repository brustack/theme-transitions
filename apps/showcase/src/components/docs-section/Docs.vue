<script setup lang="ts">
import { ref } from "vue";
import "./docs.css";
import FrameworkPicker from "./FrameworkPicker.vue";
import DocsSidebar from "./DocsSidebar.vue";
import InstallSection from "./InstallSection.vue";
import UsageSection from "./UsageSection.vue";
import StylingSection from "./StylingSection.vue";
import ConfigurationSection from "./ConfigurationSection.vue";
import ApiSection from "./ApiSection.vue";
import BundlerSection from "./BundlerSection.vue";
import type { Framework } from "./snippets";

const framework = ref<Framework>("Vue");
</script>

<template>
  <div class="docs" @click.stop>
    <div id="get-started" class="docs-lede">
      <span class="eyebrow">Documentation</span>
      <h2>All of that, in a few lines of code.</h2>
      <p>
        The demo you just clicked is the whole feature. Here's the exact code
        for it, in whichever framework you're using.
      </p>
    </div>

    <FrameworkPicker v-model="framework" />

    <div class="docs-shell">
      <DocsSidebar />

      <div class="docs-content">
        <InstallSection :framework="framework" />
        <UsageSection :framework="framework" />
        <StylingSection :framework="framework" />
        <ConfigurationSection />
        <ApiSection />
        <BundlerSection />
      </div>
    </div>
  </div>
</template>
