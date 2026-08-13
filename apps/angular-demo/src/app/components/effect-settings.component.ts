import { Component, computed, output, signal } from '@angular/core';
import { defaultThemeEffects, isValidCssDuration } from '@brustack/theme-transitions-core';
import type { ThemeEffect } from '@brustack/theme-transitions-core';
import { IconRotateCcwComponent } from './icons/icon-rotate-ccw.component';
import { IconSettingsComponent } from './icons/icon-settings.component';

export interface EffectOptions {
	variant: ThemeEffect;
	duration: string;
	easing?: string;
}

const defaultsFor = (variant: ThemeEffect) =>
	variant === 'fade' ? defaultThemeEffects.fade : defaultThemeEffects.spread;

@Component({
	selector: 'app-effect-settings',
	standalone: true,
	imports: [IconRotateCcwComponent, IconSettingsComponent],
	templateUrl: './effect-settings.component.html',
	styleUrl: './effect-settings.component.css',
})
export class EffectSettingsComponent {
	readonly effectChange = output<{ options: EffectOptions; valid: boolean }>();

	protected readonly isOpen = signal(false);
	protected readonly variant = signal<ThemeEffect>('fade');
	protected readonly duration = signal(defaultThemeEffects.fade.duration);
	protected readonly easingPreset = signal(defaultThemeEffects.fade.easing);
	protected readonly easingPresets = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];

	protected readonly durationError = computed(() => {
		if (this.variant() === 'none') return '';
		return isValidCssDuration(this.duration()) ? '' : 'Use a CSS duration, e.g. 1s or 400ms';
	});

	protected readonly isModified = computed(() => {
		if (this.variant() === 'none') return false;

		const defaults = defaultsFor(this.variant());

		if (this.duration() !== defaults.duration) return true;

		return this.variant() === 'fade' && this.easingPreset() !== defaults.easing;
	});

	constructor() {
		this.emitChange();
	}

	protected toggleOpen(): void {
		this.isOpen.update((open) => !open);
	}

	protected resetToDefaults(): void {
		const defaults = defaultsFor(this.variant());

		this.duration.set(defaults.duration);
		this.easingPreset.set(defaultThemeEffects.fade.easing);
		this.emitChange();
	}

	protected selectVariant(next: ThemeEffect): void {
		const defaults = defaultsFor(next);

		this.variant.set(next);
		this.duration.set(defaults.duration);
		this.easingPreset.set(defaultThemeEffects.fade.easing);
		this.emitChange();
	}

	protected onVariantChange(event: Event): void {
		this.selectVariant((event.target as HTMLSelectElement).value as ThemeEffect);
	}

	protected onDurationChange(event: Event): void {
		this.duration.set((event.target as HTMLInputElement).value);
		this.emitChange();
	}

	protected onEasingChange(event: Event): void {
		this.easingPreset.set((event.target as HTMLSelectElement).value);
		this.emitChange();
	}

	private emitChange(): void {
		const variant = this.variant();
		const duration = this.duration();
		const easing = this.easingPreset();

		this.effectChange.emit({
			options: variant === 'fade' ? { variant, duration, easing } : { variant, duration },
			valid: !this.durationError(),
		});
	}
}
