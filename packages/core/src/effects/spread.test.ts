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
		expect(css).toContain(`var(--theme-duration, ${defaultSpreadOptions.duration})`);
		expect(css).toContain(`var(--theme-easing, ${defaultSpreadOptions.easing})`);
		expect(css).toContain(`var(--theme-radius, ${defaultSpreadOptions.radius})`);
		expect(css).toContain('theme-spread-reveal');
	});

	it('falls back to the raw duration when no origin is given', () => {
		expect(spreadEffect.getSkipAfterMs(defaultSpreadOptions, null)).toBe(1500);
	});

	it('estimates the skip time from the origin when one is given', () => {
		vi.stubGlobal('window', { innerWidth: 200, innerHeight: 200 });
		const result = spreadEffect.getSkipAfterMs(defaultSpreadOptions, { x: 100, y: 100 });
		expect(result).toBe(680);
	});
});
