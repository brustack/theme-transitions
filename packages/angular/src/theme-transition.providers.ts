import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import type { EnvironmentProviders } from '@angular/core';
import type { ThemeOptions } from '@brustack/theme-transitions-core';

export const THEME_TRANSITION_OPTIONS = new InjectionToken<ThemeOptions>(
	'THEME_TRANSITION_OPTIONS',
);

export const provideThemeTransitions = (
	options?: ThemeOptions,
): EnvironmentProviders =>
	makeEnvironmentProviders([
		{ provide: THEME_TRANSITION_OPTIONS, useValue: options ?? {} },
	]);
