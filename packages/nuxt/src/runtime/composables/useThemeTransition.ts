import { onMounted, onUnmounted, useRuntimeConfig, useState } from '#imports';
import { computed } from 'vue';
import { createController, getController, resolveOptions } from '@brustack/theme-transitions-core';
import type {
	ThemeController,
	ThemeName,
	ThemeState,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

export type { ThemeName, ThemeOrigin, TransitionOptions } from '@brustack/theme-transitions-core';

export const useThemeTransition = () => {
	const moduleOptions = useRuntimeConfig().public.themeTransition;

	const state = useState<ThemeState>('theme-transition-state', () => createController(moduleOptions).getState());

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
		state.value = controller.getState();

		const unsubscribe = controller.subscribe(() => {
			state.value = controller!.getState();
		});
		onUnmounted(unsubscribe);
	});

	const toggleTheme = async (eventOrOpts?: MouseEvent | TransitionOptions) => {
		await requireController().toggleTheme(resolveOptions(eventOrOpts));
	};

	const setTheme = async (mode: ThemeName, eventOrOpts?: MouseEvent | TransitionOptions) => {
		await requireController().setTheme(mode, resolveOptions(eventOrOpts));
	};

	return {
		theme: computed(() => state.value.theme),
		mode: computed(() => state.value.mode),
		isAnimating: computed(() => state.value.isAnimating),
		themes: computed(() => state.value.themes),
		toggleTheme,
		setTheme,
	};
};
