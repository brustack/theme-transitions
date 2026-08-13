export type ThemeEffect = 'spread' | 'fade' | 'wipe' | 'flip' | 'none';

export type ThemeOrigin = {
	x: number;
	y: number;
};

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeName = ThemeMode | (string & {});

export type WipeDirection
	= | 'left'
		| 'right'
		| 'up'
		| 'down'
		| 'center-x'
		| 'center-y'
		| 'diagonal-tl'
		| 'diagonal-tr'
		| 'diagonal-bl'
		| 'diagonal-br';

export type FlipDirection = 'horizontal' | 'vertical';

export interface EffectOverrides {
	variant?: ThemeEffect;
	duration?: string;
	easing?: string;
	radius?: string;
	direction?: WipeDirection | FlipDirection;
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

export interface WipeEffectOptions {
	duration: string;
	easing: string;
	direction: WipeDirection;
}

export interface FlipEffectOptions {
	duration: string;
	easing: string;
	direction: FlipDirection;
}

export type NoneEffectOptions = Record<string, never>;

export type EffectOptions
	= | SpreadEffectOptions
		| FadeEffectOptions
		| WipeEffectOptions
		| FlipEffectOptions
		| NoneEffectOptions;

export interface ThemeEffects {
	spread: SpreadEffectOptions;
	fade: FadeEffectOptions;
	wipe: WipeEffectOptions;
	flip: FlipEffectOptions;
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
