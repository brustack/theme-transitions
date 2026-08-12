import type {
	EffectOptions,
	ThemeEffect,
	ThemeName,
	ThemeOptions,
	TransitionOptions,
} from './types';
import {
	DEFAULT_VARIANT,
	EFFECT_OVERRIDE_KEYS,
	getEffectOrThrow,
	pickOverrides,
	resolveThemeEffects,
} from './effects';
import {
	applyThemeClass,
	readStoredPreference,
	resolveTheme,
	writeStoredPreference,
} from './colorMode';
import { runThemeTransition } from './runThemeTransition';

declare global {
	interface Window {
		__themeConfig?: ThemeOptions;
	}
}

export interface ThemeState {
	theme: ThemeName;
	mode: ThemeName;
	isAnimating: boolean;
	themes: string[];
}

export interface ThemeController {
	getState: () => ThemeState;
	subscribe: (listener: () => void) => () => void;
	toggleTheme: (options?: TransitionOptions) => Promise<void>;
	setTheme: (mode: ThemeName, options?: TransitionOptions) => Promise<void>;
}

const readPluginConfig = (): ThemeOptions => {
	if (typeof window === 'undefined') {
		return {};
	}

	return window.__themeConfig ?? {};
};

const resolveEffectOptions = (
	variant: ThemeEffect,
	base: EffectOptions,
	callOptions: TransitionOptions,
): EffectOptions => {
	return {
		...base,
		...pickOverrides(callOptions, EFFECT_OVERRIDE_KEYS[variant]),
	} as EffectOptions;
};

export const createController = (options?: ThemeOptions): ThemeController => {
	const mergedOptions: ThemeOptions = { ...readPluginConfig(), ...options };
	const effects = resolveThemeEffects(mergedOptions);
	const configVariant = mergedOptions.variant ?? DEFAULT_VARIANT;
	const themes = [
		...new Set(['light', 'dark', 'system', ...(mergedOptions.themes ?? [])]),
	];

	const storedPreference = readStoredPreference();

	let state: ThemeState = {
		theme: resolveTheme(storedPreference),
		mode: storedPreference,
		isAnimating: false,
		themes,
	};

	const listeners = new Set<() => void>();
	const notify = () => {
		for (const listener of listeners) {
			listener();
		}
	};

	const setState = (partial: Partial<ThemeState>) => {
		state = { ...state, ...partial };
		notify();
	};

	if (typeof matchMedia !== 'undefined') {
		const media = matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', () => {
			if (readStoredPreference() !== 'system') {
				return;
			}

			const resolved = resolveTheme('system');
			applyThemeClass(resolved, state.theme);
			setState({ theme: resolved });
		});
	}

	const applyTheme = async (
		nextMode: ThemeName,
		callOptions: TransitionOptions = {},
	) => {
		if (state.isAnimating) {
			return;
		}

		const resolved = resolveTheme(nextMode);

		const commit = () => {
			writeStoredPreference(nextMode);
			applyThemeClass(resolved, state.theme);
			setState({ theme: resolved, mode: nextMode });
		};

		if (resolved === state.theme) {
			commit();
			return;
		}

		const variant = callOptions.variant ?? configVariant;
		const definition = getEffectOrThrow(variant);
		const origin = callOptions.origin ?? null;

		if (definition.requiresOrigin && !origin) {
			throw new Error(`Theme variant "${variant}" requires an origin point`);
		}

		await runThemeTransition(
			definition,
			origin,
			resolveEffectOptions(variant, effects[variant], callOptions),
			commit,
			isAnimating => setState({ isAnimating }),
		);
	};

	const toggleTheme = async (callOptions: TransitionOptions = {}) => {
		const nextMode = state.theme === 'dark' ? 'light' : 'dark';
		await applyTheme(nextMode, callOptions);
	};

	const setTheme = async (
		mode: ThemeName,
		callOptions: TransitionOptions = {},
	) => {
		if (state.mode === mode) {
			return;
		}

		await applyTheme(mode, callOptions);
	};

	return {
		getState: () => state,
		subscribe: (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		toggleTheme,
		setTheme,
	};
};

let sharedController: ThemeController | undefined;

export const getController = (options?: ThemeOptions): ThemeController => {
	sharedController ??= createController(options);
	return sharedController;
};

export const resetController = (): void => {
	sharedController = undefined;
};
