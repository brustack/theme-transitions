import { computed, inject, Injectable, signal } from '@angular/core';
import type { Signal } from '@angular/core';
import {
	getController,
	resolveOptions,
} from '@brustack/theme-transitions-core';
import type {
	ThemeName,
	TransitionOptions,
} from '@brustack/theme-transitions-core';
import { THEME_TRANSITION_OPTIONS } from './theme-transition.providers';

@Injectable({ providedIn: 'root' })
export class ThemeTransitionService {
	private readonly options = inject(THEME_TRANSITION_OPTIONS, {
		optional: true,
	});

	private readonly controller = getController(this.options ?? undefined);
	private readonly state = signal(this.controller.getState());

	readonly theme: Signal<ThemeName> = computed(() => this.state().theme);
	readonly mode: Signal<ThemeName> = computed(() => this.state().mode);
	readonly isAnimating: Signal<boolean> = computed(
		() => this.state().isAnimating,
	);

	readonly themes: Signal<string[]> = computed(() => this.state().themes);

	constructor() {
		this.controller.subscribe(() => this.state.set(this.controller.getState()));
	}

	toggleTheme(eventOrOpts?: MouseEvent | TransitionOptions): Promise<void> {
		return this.controller.toggleTheme(resolveOptions(eventOrOpts));
	}

	setTheme(
		mode: ThemeName,
		eventOrOpts?: MouseEvent | TransitionOptions,
	): Promise<void> {
		return this.controller.setTheme(mode, resolveOptions(eventOrOpts));
	}
}
