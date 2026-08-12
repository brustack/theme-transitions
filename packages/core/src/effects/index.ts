import type {
	EffectDefinition,
	EffectOverrides,
	ThemeEffect,
	ThemeEffects,
	ThemeOptions,
} from '../types';
import { defaultFadeOptions, fadeEffect } from './fade';
import { defaultNoneOptions, noneEffect } from './none';
import { defaultSpreadOptions, spreadEffect } from './spread';
import { defaultWipeOptions, wipeEffect } from './wipe';

export type {
	EffectDefinition,
	FadeEffectOptions,
	NoneEffectOptions,
	SpreadEffectOptions,
	ThemeEffect,
	ThemeEffects,
	ThemeOptions,
	WipeEffectOptions,
} from '../types';

export const DEFAULT_VARIANT: ThemeEffect = 'fade';

export const EFFECT_OVERRIDE_KEYS: Record<
	ThemeEffect,
	('duration' | 'easing' | 'radius' | 'direction')[]
> = {
	spread: ['duration'],
	fade: ['duration', 'easing'],
	wipe: ['duration', 'easing', 'direction'],
	none: [],
};

const themeEffects = [
	spreadEffect,
	fadeEffect,
	wipeEffect,
	noneEffect,
] as EffectDefinition[];

export const defaultThemeEffects: ThemeEffects = {
	spread: defaultSpreadOptions,
	fade: defaultFadeOptions,
	wipe: defaultWipeOptions,
	none: defaultNoneOptions,
};

export const getEffectOrThrow = (name: ThemeEffect): EffectDefinition => {
	const effect = themeEffects.find(entry => entry.name === name);

	if (!effect) {
		throw new Error(`Unknown theme transition variant: ${name}`);
	}

	return effect;
};

export const pickOverrides = (
	options: EffectOverrides | undefined,
	keys: ('duration' | 'easing' | 'radius' | 'direction')[],
): Record<string, string> => {
	const overrides: Record<string, string> = {};

	for (const key of keys) {
		const value = options?.[key];
		if (value) {
			overrides[key] = value;
		}
	}

	return overrides;
};

export const resolveThemeEffects = (options?: ThemeOptions): ThemeEffects => {
	const variant = options?.variant ?? DEFAULT_VARIANT;

	return {
		spread: {
			...defaultSpreadOptions,
			...(variant === 'spread'
				? pickOverrides(options, EFFECT_OVERRIDE_KEYS.spread)
				: {}),
		},
		fade: {
			...defaultFadeOptions,
			...(variant === 'fade'
				? pickOverrides(options, EFFECT_OVERRIDE_KEYS.fade)
				: {}),
		},
		wipe: {
			...defaultWipeOptions,
			...(variant === 'wipe'
				? pickOverrides(options, EFFECT_OVERRIDE_KEYS.wipe)
				: {}),
		},
		none: defaultNoneOptions,
	};
};

const vtLayer = (layer: 'old' | 'new') =>
	`html[data-theme-effect]::view-transition-${layer}(root)`;

export const buildThemeTransitionCss = (
	effects: ThemeEffects = defaultThemeEffects,
): string => {
	const effectCss = themeEffects
		.map(effect => effect.buildCss(effects[effect.name]))
		.join('\n');

	return `${effectCss}

html[data-theme-effect]::view-transition,
html[data-theme-effect]::view-transition-group(root),
html[data-theme-effect]::view-transition-image-pair(root),
html[data-theme-effect]::view-transition-old(root),
html[data-theme-effect]::view-transition-new(root) {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  ${vtLayer('old')},
  ${vtLayer('new')} {
    animation: none;
  }
}`;
};
