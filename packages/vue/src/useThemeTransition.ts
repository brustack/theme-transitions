import { computed, onScopeDispose, ref } from 'vue';
import {
	getController,
	resolveOptions,
} from '@brustack/theme-transitions-core';
import type {
	ThemeName,
	ThemeOptions,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

export const useThemeTransition = (opts?: ThemeOptions) => {
	const controller = getController(opts);
	const state = ref(controller.getState());

	const unsubscribe = controller.subscribe(() => {
		state.value = controller.getState();
	});

	onScopeDispose(unsubscribe, true);

	return {
		theme: computed(() => state.value.theme),
		mode: computed(() => state.value.mode),
		isAnimating: computed(() => state.value.isAnimating),
		themes: computed(() => state.value.themes),
		toggleTheme: (eventOrOpts?: MouseEvent | TransitionOptions) =>
			controller.toggleTheme(resolveOptions(eventOrOpts)),
		setTheme: (mode: ThemeName, eventOrOpts?: MouseEvent | TransitionOptions) =>
			controller.setTheme(mode, resolveOptions(eventOrOpts)),
	};
};
