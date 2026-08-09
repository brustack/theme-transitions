import { afterEach, describe, expect, it, vi } from 'vitest';
import { estimateSpreadSkipMs, parseCssDuration } from './time';
import type { SpreadEffectOptions, ThemeOrigin } from './types';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('parseCssDuration', () => {
	it('parses millisecond durations', () => {
		expect(parseCssDuration('400ms')).toBe(400);
	});

	it('parses second durations as milliseconds', () => {
		expect(parseCssDuration('1.5s')).toBe(1500);
	});

	it('returns 0 for unparsable input', () => {
		expect(parseCssDuration('not-a-duration')).toBe(0);
	});
});

describe('estimateSpreadSkipMs', () => {
	const options: SpreadEffectOptions = {
		duration: '1000ms',
		easing: 'linear',
		radius: '150vmax',
	};
	const origin: ThemeOrigin = { x: 100, y: 100 };

	it('returns the raw duration when window is unavailable', () => {
		vi.stubGlobal('window', undefined);
		expect(estimateSpreadSkipMs(origin, options)).toBe(1000);
	});

	it('scales the duration by the cover-distance-to-radius ratio', () => {
		vi.stubGlobal('window', { innerWidth: 200, innerHeight: 200 });
		expect(estimateSpreadSkipMs(origin, options)).toBe(521);
	});

	it('falls back to a 150vmax default when radius has no numeric match', () => {
		vi.stubGlobal('window', { innerWidth: 200, innerHeight: 200 });
		expect(estimateSpreadSkipMs(origin, { ...options, radius: 'garbage' })).toBe(521);
	});

	it('uses window.visualViewport dimensions when available, staying in sync with the rendered origin', () => {
		vi.stubGlobal('window', {
			innerWidth: 1000,
			innerHeight: 1000,
			visualViewport: { width: 200, height: 200 },
		});
		expect(estimateSpreadSkipMs(origin, options)).toBe(521);
	});
});
