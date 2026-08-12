import {
	getController,
	resolveOptions,
} from '@brustack/theme-transitions-core';
import type {
	ThemeController,
	ThemeName,
	ThemeOptions,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

interface AlpineLike {
	data: <T extends object>(
		name: string,
		factory: (options?: ThemeOptions) => T,
	) => void;
}

export default function themeTransition(Alpine: AlpineLike) {
	Alpine.data('themeTransition', (options: ThemeOptions = {}) => ({
		theme: 'light' as ThemeName,
		mode: 'system' as ThemeName,
		isAnimating: false,
		themes: ['light', 'dark', 'system'] as string[],

		_controller: null as ThemeController | null,
		_unsubscribe: null as (() => void) | null,

		init() {
			const controller = getController(options);
			this._controller = controller;

			const sync = () => {
				const state = controller.getState();
				this.theme = state.theme;
				this.mode = state.mode;
				this.isAnimating = state.isAnimating;
				this.themes = state.themes;
			};

			sync();
			this._unsubscribe = controller.subscribe(sync);
		},

		destroy() {
			this._unsubscribe?.();
		},

		toggleTheme(eventOrOptions?: MouseEvent | TransitionOptions) {
			this._controller?.toggleTheme(resolveOptions(eventOrOptions));
		},

		setTheme(mode: ThemeName, eventOrOptions?: MouseEvent | TransitionOptions) {
			this._controller?.setTheme(mode, resolveOptions(eventOrOptions));
		},
	}));
}
