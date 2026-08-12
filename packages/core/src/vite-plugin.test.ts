import { describe, expect, it } from 'vitest';
import { buildColorModeInitScript } from './colorMode';
import { buildConfigInitScript } from './configScript';
import { themeTransitions } from './vite-plugin';

describe('themeTransitions', () => {
	it('has the expected plugin name', () => {
		expect(themeTransitions().name).toBe('theme-transitions');
	});

	it('injects the anti-flash init script as a head-prepend tag', () => {
		const plugin = themeTransitions();
		const transform = plugin.transformIndexHtml as () => unknown;

		expect(transform()).toEqual([
			{
				tag: 'script',
				children: buildColorModeInitScript(),
				injectTo: 'head-prepend',
			},
		]);
	});

	it('prepends the config assignment before the anti-flash script when options are given', () => {
		const plugin = themeTransitions({ variant: 'spread' });
		const transform = plugin.transformIndexHtml as () => unknown;

		expect(transform()).toEqual([
			{
				tag: 'script',
				children: `${buildConfigInitScript({
					variant: 'spread',
				})}\n${buildColorModeInitScript()}`,
				injectTo: 'head-prepend',
			},
		]);
	});
});
