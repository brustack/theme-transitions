import { Component, input } from '@angular/core';

@Component({
	selector: 'app-icon-monitor',
	standalone: true,
	template: `
		<svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<rect width="20" height="14" x="2" y="3" rx="2" />
			<line x1="8" x2="16" y1="21" y2="21" />
			<line x1="12" x2="12" y1="17" y2="21" />
		</svg>
	`,
})
export class IconMonitorComponent {
	readonly size = input(16);
}
