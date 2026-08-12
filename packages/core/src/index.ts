export type {
	EffectDefinition,
	FadeEffectOptions,
	SpreadEffectOptions,
	ThemeEffect,
	ThemeEffects,
	ThemeMode,
	ThemeName,
	ThemeOptions,
	ThemeOrigin,
	TransitionOptions,
	WipeEffectOptions,
} from './types';

export {
	applyThemeClass,
	buildColorModeInitScript,
	getSystemTheme,
	readStoredPreference,
	resolveTheme,
	writeStoredPreference,
} from './colorMode';

export { buildConfigInitScript } from './configScript';

export { originFromElement, originFromEvent } from './origin';

export { resolveOptions } from './options';

export { isValidCssDuration, parseCssDuration } from './time';

export {
	buildThemeTransitionCss,
	DEFAULT_VARIANT,
	defaultThemeEffects,
	resolveThemeEffects,
} from './effects';

export { runThemeTransition } from './runThemeTransition';

export { createController, getController, resetController } from './controller';
export type { ThemeController, ThemeState } from './controller';
