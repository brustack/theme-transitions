import { afterEach, describe, expect, it, vi } from 'vitest';
import { resolveSpreadRadiusPx, toOriginPercent } from './viewport';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('toOriginPercent', () => {
	it('converts an origin to percentages of window.visualViewport when available', () => {
		vi.stubGlobal('window', {
			innerWidth: 1000,
			innerHeight: 1000,
			visualViewport: { width: 400, height: 800, offsetLeft: 0, offsetTop: 0 },
		});

		expect(toOriginPercent({ x: 100, y: 200 })).toEqual({ x: '25%', y: '25%' });
	});

	it('subtracts the visualViewport offset before computing the percentage', () => {
		vi.stubGlobal('window', {
			innerWidth: 1000,
			innerHeight: 1000,
			visualViewport: {
				width: 200,
				height: 200,
				offsetLeft: 50,
				offsetTop: 50,
			},
		});

		expect(toOriginPercent({ x: 150, y: 150 })).toEqual({ x: '50%', y: '50%' });
	});

	it('falls back to window.innerWidth/innerHeight when visualViewport is unavailable', () => {
		vi.stubGlobal('window', { innerWidth: 200, innerHeight: 400 });

		expect(toOriginPercent({ x: 50, y: 100 })).toEqual({ x: '25%', y: '25%' });
	});

	it('falls back to pixel values when the viewport size is unavailable', () => {
		vi.stubGlobal('window', { innerWidth: 0, innerHeight: 0 });

		expect(toOriginPercent({ x: 12, y: 34 })).toEqual({ x: '12px', y: '34px' });
	});
});

describe('resolveSpreadRadiusPx', () => {
	it('computes the distance to the farthest corner, plus a safety margin', () => {
		vi.stubGlobal('window', { innerWidth: 300, innerHeight: 400 });

		expect(resolveSpreadRadiusPx({ x: 0, y: 0 })).toBe('508px');
	});

	it('uses the larger of innerWidth/innerHeight and visualViewport, unlike toOriginPercent', () => {
		vi.stubGlobal('window', {
			innerWidth: 200,
			innerHeight: 200,
			visualViewport: { width: 100, height: 100 },
		});

		expect(resolveSpreadRadiusPx({ x: 50, y: 50 })).toBe('221px');
	});

	it('returns null when window is unavailable', () => {
		vi.stubGlobal('window', undefined);

		expect(resolveSpreadRadiusPx({ x: 0, y: 0 })).toBeNull();
	});
});
