import { onMounted, onUnmounted, useRuntimeConfig, useState } from '#imports';
import { getController, resolveOptions } from '@brustack/theme-transitions-core';
import type {
	ThemeController,
	ThemeName,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

export type { ThemeName, ThemeOrigin, TransitionOptions } from '@brustack/theme-transitions-core';

export const useThemeTransition = () => {
	const moduleOptions = useRuntimeConfig().public.themeTransition;

	const theme = useState<ThemeName>('theme-transition-color', () => 'light');
	const mode = useState<ThemeName>('theme-transition-mode', () => 'system');
	const isAnimating = useState('theme-transition-animating', () => false);
	const themes = useState<string[]>('theme-transition-themes', () => ['light', 'dark', 'system']);

	let controller: ThemeController | undefined;

	const requireController = (): ThemeController => {
		if (!controller) {
			throw new Error(
				'useThemeTransition: toggleTheme/setTheme was called before the component mounted, or outside a browser context.',
			);
		}

		return controller;
	};

	onMounted(() => {
		controller = getController(moduleOptions);

		const sync = () => {
			const state = controller!.getState();
			theme.value = state.theme;
			mode.value = state.mode;
			isAnimating.value = state.isAnimating;
			themes.value = state.themes;
		};

		sync();
		const unsubscribe = controller.subscribe(sync);
		onUnmounted(unsubscribe);
	});

	const toggleTheme = async (eventOrOpts?: MouseEvent | TransitionOptions) => {
		await requireController().toggleTheme(resolveOptions(eventOrOpts));
	};

	const setTheme = async (mode: ThemeName, eventOrOpts?: MouseEvent | TransitionOptions) => {
		await requireController().setTheme(mode, resolveOptions(eventOrOpts));
	};

	return {
		theme,
		mode,
		isAnimating,
		themes,
		toggleTheme,
		setTheme,
	};
};
