import { describe, expect, it } from 'vitest';
import { createEffectSelectors } from './selectors';

describe('createEffectSelectors', () => {
	it('builds vtSelector for old and new layers scoped to the effect name', () => {
		const { vtSelector } = createEffectSelectors('flip');

		expect(vtSelector('old')).toBe(
			'html[data-theme-effect="flip"]::view-transition-old(root)',
		);
		expect(vtSelector('new')).toBe(
			'html[data-theme-effect="flip"]::view-transition-new(root)',
		);
	});

	it('builds vtGroup scoped to the effect name', () => {
		const { vtGroup } = createEffectSelectors('wipe');

		expect(vtGroup()).toBe(
			'html[data-theme-effect="wipe"]::view-transition-group(root)',
		);
	});

	it('builds vtImagePair scoped to the effect name', () => {
		const { vtImagePair } = createEffectSelectors('flip');

		expect(vtImagePair()).toBe(
			'html[data-theme-effect="flip"]::view-transition-image-pair(root)',
		);
	});
});
