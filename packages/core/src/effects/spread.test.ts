import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultSpreadOptions, spreadEffect } from './spread';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('spreadEffect', () => {
	it('requires an origin', () => {
		expect(spreadEffect.requiresOrigin).toBe(true);
	});

	it('builds CSS containing the configured duration, easing, and radius as custom property fallbacks', () => {
		const css = spreadEffect.buildCss(defaultSpreadOptions);
		expect(css).toContain(
			`var(--theme-duration, ${defaultSpreadOptions.duration})`,
		);
		expect(css).toContain(
			`var(--theme-easing, ${defaultSpreadOptions.easing})`,
		);
		expect(css).toContain(
			`var(--theme-radius, ${defaultSpreadOptions.radius})`,
		);
		expect(css).toContain('theme-spread-reveal');
	});

	it('builds CSS with a compositor hint on the revealed layer', () => {
		const css = spreadEffect.buildCss(defaultSpreadOptions);
		expect(css).toContain('will-change: clip-path');
		expect(css).toContain('contain: paint');
	});

	it('returns the configured duration regardless of origin', () => {
		expect(spreadEffect.getSkipAfterMs(defaultSpreadOptions, null)).toBe(1000);
		expect(
			spreadEffect.getSkipAfterMs(defaultSpreadOptions, { x: 100, y: 100 }),
		).toBe(1000);
	});
});
