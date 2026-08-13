import { afterEach, describe, expect, it, vi } from 'vitest';
import { defaultFlipOptions, flipEffect } from './flip';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('flipEffect', () => {
	it('does not require an origin', () => {
		expect(flipEffect.requiresOrigin).toBe(false);
	});

	it('builds CSS containing the configured duration and easing as custom property fallbacks', () => {
		const css = flipEffect.buildCss(defaultFlipOptions);
		expect(css).toContain(
			`var(--theme-duration, ${defaultFlipOptions.duration})`,
		);
		expect(css).toContain(`var(--theme-easing, ${defaultFlipOptions.easing})`);
		expect(css).toContain('theme-flip-out');
		expect(css).toContain('theme-flip-in');
	});

	it('defaults to a horizontal flip', () => {
		expect(defaultFlipOptions.direction).toBe('horizontal');
	});

	it('builds keyframes rotating around the Y axis for horizontal, and the X axis for vertical', () => {
		const css = flipEffect.buildCss(defaultFlipOptions);
		expect(css).toContain('theme-flip-out-horizontal');
		expect(css).toContain('transform: rotateY(0deg)');
		expect(css).toContain('transform: rotateY(90deg)');
		expect(css).toContain('transform: rotateY(-90deg)');
		expect(css).toContain('theme-flip-out-vertical');
		expect(css).toContain('transform: rotateX(0deg)');
		expect(css).toContain('transform: rotateX(90deg)');
		expect(css).toContain('transform: rotateX(-90deg)');
	});

	it('selects the configured direction as the animation-name fallback, overridable via a custom property', () => {
		const css = flipEffect.buildCss({
			...defaultFlipOptions,
			direction: 'vertical',
		});
		expect(css).toContain(
			'animation-name: var(--theme-flip-out-name, theme-flip-out-vertical)',
		);
		expect(css).toContain(
			'animation-name: var(--theme-flip-in-name, theme-flip-in-vertical)',
		);
	});

	it('splits the duration in half between the two halves of the flip, staggered so they never overlap', () => {
		const css = flipEffect.buildCss(defaultFlipOptions);
		expect(css).toContain(
			`animation-duration: calc(var(--theme-duration, ${defaultFlipOptions.duration}) / 2)`,
		);
		expect(css).toContain(
			`animation-delay: calc(var(--theme-duration, ${defaultFlipOptions.duration}) / 2)`,
		);
	});

	it('sets up a 3D perspective on the image pair so the rotation reads as a flip', () => {
		const css = flipEffect.buildCss(defaultFlipOptions);
		expect(css).toContain('perspective: 3000px');
		expect(css).toContain('transform-style: preserve-3d');
		expect(css).toContain('backface-visibility: hidden');
	});

	it('returns the configured duration regardless of origin', () => {
		expect(flipEffect.getSkipAfterMs(defaultFlipOptions, null)).toBe(700);
		expect(
			flipEffect.getSkipAfterMs(defaultFlipOptions, { x: 100, y: 100 }),
		).toBe(700);
	});
});
