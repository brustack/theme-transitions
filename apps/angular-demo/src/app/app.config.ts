import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideThemeTransitions } from '@brustack/angular-theme-transitions';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZonelessChangeDetection(),
		provideThemeTransitions({ variant: 'fade', themes: ['sepia'] }),
	],
};
