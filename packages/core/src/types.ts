export type ThemeEffect = 'spread' | 'fade' | 'none';

export type ThemeOrigin = {
	x: number;
	y: number;
};

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeName = ThemeMode | (string & {});

export interface EffectOverrides {
	variant?: ThemeEffect;
	duration?: string;
	easing?: string;
	radius?: string;
}

export interface TransitionOptions extends EffectOverrides {
	origin?: ThemeOrigin | null;
}

export interface SpreadEffectOptions {
	duration: string;
	easing: string;
	radius: string;
}

export interface FadeEffectOptions {
	duration: string;
	easing: string;
}

export type NoneEffectOptions = Record<string, never>;

export type EffectOptions
	= | SpreadEffectOptions
		| FadeEffectOptions
		| NoneEffectOptions;

export interface ThemeEffects {
	spread: SpreadEffectOptions;
	fade: FadeEffectOptions;
	none: NoneEffectOptions;
}

export interface EffectDefinition<T extends EffectOptions = EffectOptions> {
	name: ThemeEffect;
	requiresOrigin: boolean;
	buildCss: (options: T) => string;
	getSkipAfterMs: (options: T, origin: ThemeOrigin | null) => number;
}

export interface ThemeOptions extends EffectOverrides {
	themes?: string[];
}
