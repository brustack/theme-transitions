import { useEffect, useState } from "react";
import {
  defaultThemeEffects,
  isValidCssDuration,
} from "@brustack/theme-transitions-core";
import type {
  FlipEffectOptions,
  ThemeEffect,
  WipeEffectOptions,
} from "@brustack/theme-transitions-core";
import { IconRotateCcw } from "./icons/IconRotateCcw";
import { IconSettings } from "./icons/IconSettings";
import "./EffectSettings.css";

export interface EffectOptions {
  variant: ThemeEffect;
  duration: string;
  easing?: string;
  direction?: WipeEffectOptions["direction"] | FlipEffectOptions["direction"];
}

export interface EffectSettingsProps {
  onChange: (options: EffectOptions, valid: boolean) => void;
}

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

const defaultsFor = (variant: ThemeEffect) =>
  variant === "fade"
    ? defaultThemeEffects.fade
    : variant === "wipe"
    ? defaultThemeEffects.wipe
    : variant === "flip"
    ? defaultThemeEffects.flip
    : defaultThemeEffects.spread;

export const EffectSettings = ({ onChange }: EffectSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<ThemeEffect>("fade");
  const [duration, setDuration] = useState(defaultThemeEffects.fade.duration);
  const [easingPreset, setEasingPreset] = useState(
    defaultThemeEffects.fade.easing,
  );
  const [direction, setDirection] = useState<
    WipeEffectOptions["direction"] | FlipEffectOptions["direction"]
  >(defaultThemeEffects.wipe.direction);

  const durationError =
    variant === "none"
      ? ""
      : isValidCssDuration(duration)
      ? ""
      : "Use a CSS duration, e.g. 1s or 400ms";

  const isModified = (() => {
    if (variant === "none") return false;

    const defaults = defaultsFor(variant);

    if (duration !== defaults.duration) return true;
    if (variant === "wipe") {
      return (
        easingPreset !== defaults.easing ||
        direction !== defaultThemeEffects.wipe.direction
      );
    }
    if (variant === "flip") {
      return (
        easingPreset !== defaults.easing ||
        direction !== defaultThemeEffects.flip.direction
      );
    }

    return variant === "fade" && easingPreset !== defaults.easing;
  })();

  const resetToDefaults = () => {
    const defaults = defaultsFor(variant);

    setDuration(defaults.duration);
    setEasingPreset(defaults.easing);
    setDirection(
      variant === "flip"
        ? defaultThemeEffects.flip.direction
        : defaultThemeEffects.wipe.direction,
    );
  };

  const selectVariant = (next: ThemeEffect) => {
    const defaults = defaultsFor(next);

    setVariant(next);
    setDuration(defaults.duration);
    setEasingPreset(defaults.easing);
    setDirection(
      next === "flip"
        ? defaultThemeEffects.flip.direction
        : defaultThemeEffects.wipe.direction,
    );
  };

  useEffect(() => {
    const options: EffectOptions =
      variant === "fade"
        ? { variant, duration, easing: easingPreset }
        : variant === "wipe" || variant === "flip"
        ? { variant, duration, easing: easingPreset, direction }
        : { variant, duration };

    onChange(options, !durationError);
  }, [variant, duration, easingPreset, direction, durationError]);

  return (
    <div className="effect-settings">
      <button
        type="button"
        className="icon-btn settings-trigger"
        aria-expanded={isOpen}
        aria-controls="settings-panel"
        aria-label="Effect settings"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconSettings size={16} aria-hidden="true" />
        {isModified && <span className="modified-dot" aria-hidden="true" />}
      </button>

      <div
        id="settings-panel"
        className={`settings-collapse${isOpen ? " open" : ""}`}
      >
        <div className="settings-collapse-inner">
          <div className="panel-header">
            <span className="panel-title">Settings</span>
            {isModified && (
              <button
                type="button"
                className="icon-btn reset"
                aria-label="Reset to defaults"
                title="Reset to defaults"
                onClick={resetToDefaults}
              >
                <IconRotateCcw size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="controls">
            <label>
              <span className="label-text">Variant</span>
              <select
                value={variant}
                onChange={(event) =>
                  selectVariant(event.target.value as ThemeEffect)
                }
              >
                <option value="spread">spread</option>
                <option value="fade">fade</option>
                <option value="wipe">wipe</option>
                <option value="flip">flip</option>
                <option value="none">none</option>
              </select>
            </label>

            {variant !== "none" && (
              <>
                {(variant === "wipe" || variant === "flip") && (
                  <label>
                    <span className="label-text">Direction</span>
                    <select
                      value={direction}
                      onChange={(event) =>
                        setDirection(
                          event.target.value as
                            | WipeEffectOptions["direction"]
                            | FlipEffectOptions["direction"],
                        )
                      }
                    >
                      {(variant === "wipe" ? wipeDirections : flipDirections).map(
                        (d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                )}

                <label>
                  <span className="label-text">Duration</span>
                  <input
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    type="text"
                    placeholder="1s"
                    className={durationError ? "invalid" : ""}
                  />
                  {durationError && (
                    <span className="error">{durationError}</span>
                  )}
                </label>

                {(variant === "fade" ||
                  variant === "wipe" ||
                  variant === "flip") && (
                  <label>
                    <span className="label-text">Easing</span>
                    <select
                      value={easingPreset}
                      onChange={(event) => setEasingPreset(event.target.value)}
                    >
                      {easingPresets.map((preset) => (
                        <option key={preset} value={preset}>
                          {preset}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
