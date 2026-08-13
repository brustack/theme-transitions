import { Component, input, output } from '@angular/core';
import type { ThemeName } from '@brustack/theme-transitions-core';
import { IconDropletComponent } from './icons/icon-droplet.component';
import { IconMonitorComponent } from './icons/icon-monitor.component';
import { IconMoonComponent } from './icons/icon-moon.component';
import { IconSunComponent } from './icons/icon-sun.component';

interface ModeOption {
	value: ThemeName;
	label: string;
}

@Component({
	selector: 'app-theme-mode-switch',
	standalone: true,
	imports: [IconDropletComponent, IconMonitorComponent, IconMoonComponent, IconSunComponent],
	templateUrl: './theme-mode-switch.component.html',
	styleUrl: './theme-mode-switch.component.css',
})
export class ThemeModeSwitchComponent {
	readonly mode = input.required<ThemeName>();
	readonly disabled = input(false);
	readonly modeSelect = output<{ mode: ThemeName; event: MouseEvent }>();

	protected readonly options: ModeOption[] = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'sepia', label: 'Sepia' },
	];

	protected select(option: ModeOption, event: MouseEvent): void {
		this.modeSelect.emit({ mode: option.value, event });
	}
}
