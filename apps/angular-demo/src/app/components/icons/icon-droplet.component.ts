import { Component, input } from '@angular/core';

@Component({
	selector: 'app-icon-droplet',
	standalone: true,
	template: `
		<svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M12 2.69 17.66 8.5a8 8 0 1 1-11.31 0z" />
		</svg>
	`,
})
export class IconDropletComponent {
	readonly size = input(16);
}
