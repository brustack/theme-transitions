<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  defaultThemeEffects,
  isValidCssDuration,
} from "@brustack/theme-transitions-core";
import type {
  FlipEffectOptions,
  ThemeEffect,
  WipeEffectOptions,
} from "@brustack/theme-transitions-core";
import IconRotateCcw from "./icons/IconRotateCcw.vue";
import IconSettings from "./icons/IconSettings.vue";

export interface EffectOptions {
  variant: ThemeEffect;
  duration: string;
  easing?: string;
  direction?: WipeEffectOptions["direction"] | FlipEffectOptions["direction"];
}

const options = defineModel<EffectOptions>({ required: true });
const valid = defineModel<boolean>("valid", { required: true });

const isOpen = ref(false);

const easingPresets = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];
const wipeDirections: WipeEffectOptions["direction"][] = [
  "left",
  "right",
  "up",
  "down",
  "center-x",
  "center-y",
  "diagonal-tl",
  "diagonal-tr",
  "diagonal-bl",
  "diagonal-br",
];
const flipDirections: FlipEffectOptions["direction"][] = [
  "horizontal",
  "vertical",
];

const variant = ref<ThemeEffect>(options.value.variant);
const duration = ref(options.value.duration);
const easingPreset = ref(defaultThemeEffects.fade.easing);
const direction = ref<
  WipeEffectOptions["direction"] | FlipEffectOptions["direction"]
>(defaultThemeEffects.wipe.direction);

const defaultsFor = (v: ThemeEffect) =>
  v === "fade"
    ? defaultThemeEffects.fade
    : v === "wipe"
    ? defaultThemeEffects.wipe
    : v === "flip"
    ? defaultThemeEffects.flip
    : defaultThemeEffects.spread;

const directionDefaultFor = (v: ThemeEffect) =>
  v === "flip"
    ? defaultThemeEffects.flip.direction
    : defaultThemeEffects.wipe.direction;

const durationError = computed(() => {
  if (variant.value === "none") return "";
  return isValidCssDuration(duration.value)
    ? ""
    : "Use a CSS duration, e.g. 1s or 400ms";
});

const isModified = computed(() => {
  if (variant.value === "none") return false;

  const defaults = defaultsFor(variant.value);

  if (duration.value !== defaults.duration) return true;
  if (variant.value === "wipe" || variant.value === "flip") {
    return (
      easingPreset.value !== defaults.easing ||
      direction.value !== directionDefaultFor(variant.value)
    );
  }

  return variant.value === "fade" && easingPreset.value !== defaults.easing;
});

const resetToDefaults = () => {
  const defaults = defaultsFor(variant.value);

  duration.value = defaults.duration;
  easingPreset.value = defaults.easing;
  direction.value = directionDefaultFor(variant.value);
};

watch(variant, resetToDefaults);

watch(
  [variant, duration, easingPreset, direction],
  () => {
    options.value =
      variant.value === "fade"
        ? {
            variant: variant.value,
            duration: duration.value,
            easing: easingPreset.value,
          }
        : variant.value === "wipe" || variant.value === "flip"
        ? {
            variant: variant.value,
            duration: duration.value,
            easing: easingPreset.value,
            direction: direction.value,
          }
        : { variant: variant.value, duration: duration.value };
  },
  { immediate: true },
);

watch(
  durationError,
  (durationErr) => {
    valid.value = !durationErr;
  },
  { immediate: true },
);
</script>

<template>
  <div class="effect-settings">
    <button
      type="button"
      class="icon-btn settings-trigger"
      :aria-expanded="isOpen"
      aria-controls="settings-panel"
      aria-label="Effect settings"
      @click="isOpen = !isOpen"
    >
      <IconSettings :size="16" aria-hidden="true" />
      <span v-if="isModified" class="modified-dot" aria-hidden="true" />
    </button>

    <div
      id="settings-panel"
      class="settings-collapse"
      :class="{ open: isOpen }"
    >
      <div class="settings-collapse-inner">
        <div class="panel-header">
          <span class="panel-title">Settings</span>
          <button
            v-if="isModified"
            type="button"
            class="icon-btn reset"
            aria-label="Reset to defaults"
            title="Reset to defaults"
            @click="resetToDefaults"
          >
            <IconRotateCcw :size="14" aria-hidden="true" />
          </button>
        </div>

        <div class="controls">
          <label>
            <span class="label-text">Variant</span>
            <select v-model="variant">
              <option value="spread">spread</option>
              <option value="fade">fade</option>
              <option value="wipe">wipe</option>
              <option value="flip">flip</option>
              <option value="none">none</option>
            </select>
          </label>

          <template v-if="variant !== 'none'">
            <label v-if="variant === 'wipe' || variant === 'flip'">
              <span class="label-text">Direction</span>
              <select v-model="direction">
                <option
                  v-for="d in variant === 'wipe' ? wipeDirections : flipDirections"
                  :key="d"
                  :value="d"
                >
                  {{ d }}
                </option>
              </select>
            </label>

            <label>
              <span class="label-text">Duration</span>
              <input
                v-model="duration"
                type="text"
                placeholder="1s"
                :class="{ invalid: durationError }"
              />
              <span v-if="durationError" class="error">{{
                durationError
              }}</span>
            </label>

            <label
              v-if="
                variant === 'fade' || variant === 'wipe' || variant === 'flip'
              "
            >
              <span class="label-text">Easing</span>
              <select v-model="easingPreset">
                <option
                  v-for="preset in easingPresets"
                  :key="preset"
                  :value="preset"
                >
                  {{ preset }}
                </option>
              </select>
            </label>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.effect-settings {
  display: contents;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s;
}

.icon-btn:hover {
  background: var(--border);
}

.settings-trigger {
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  color: var(--text-muted);
  border-radius: 999px;
  transition: background-color 0.15s, color 0.15s;
}

.settings-trigger:hover,
.settings-trigger[aria-expanded="true"] {
  color: var(--text);
}

.modified-dot {
  position: absolute;
  top: 0.05rem;
  right: 0.05rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--danger);
}

.settings-collapse {
  order: 1;
  flex-basis: 100%;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.settings-collapse.open {
  grid-template-rows: 1fr;
}

.settings-collapse-inner {
  min-height: 0;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.25rem 0 0.6rem;
}

.panel-title {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.25rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.8125rem;
}

.label-text {
  color: var(--text-muted);
  font-weight: 500;
}

input,
select {
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
}

input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: -2px;
}

input.invalid {
  border-color: var(--danger);
}

.error {
  color: var(--danger);
  font-size: 0.75rem;
}

.reset {
  color: var(--danger);
  border-radius: 0.5rem;
  padding: 0.3rem;
}
</style>
