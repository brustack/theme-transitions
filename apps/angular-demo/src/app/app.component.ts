import { Component, inject, signal } from '@angular/core';
import { ThemeTransitionService } from '@brustack/angular-theme-transitions';
import { originFromEvent } from '@brustack/theme-transitions-core';
import type { ThemeName } from '@brustack/theme-transitions-core';
import { EffectSettingsComponent } from './components/effect-settings.component';
import type { EffectOptions } from './components/effect-settings.component';
import { ThemeModeSwitchComponent } from './components/theme-mode-switch.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ThemeModeSwitchComponent, EffectSettingsComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	protected readonly themeService = inject(ThemeTransitionService);

	protected readonly effectOptions = signal<EffectOptions>({
		variant: 'fade',
		duration: '400ms',
		easing: 'ease',
	});
	protected readonly isValid = signal(true);

	protected handleSetMode(mode: ThemeName, event: MouseEvent): void {
		if (!this.isValid()) return;

		this.themeService.setTheme(mode, { origin: originFromEvent(event), ...this.effectOptions() });
	}

	protected handleEffectChange(options: EffectOptions, valid: boolean): void {
		this.effectOptions.set(options);
		this.isValid.set(valid);
	}
}
