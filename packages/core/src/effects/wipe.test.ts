import { describe, expect, it } from 'vitest';
import { defaultWipeOptions, wipeEffect } from './wipe';

describe('wipeEffect', () => {
	it('does not require an origin', () => {
		expect(wipeEffect.requiresOrigin).toBe(false);
	});

	it('builds CSS containing the configured duration and easing as custom property fallbacks', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain(
			`var(--theme-duration, ${defaultWipeOptions.duration})`,
		);
		expect(css).toContain(`var(--theme-easing, ${defaultWipeOptions.easing})`);
	});

	it('builds CSS with a compositor hint on the revealed layer', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('will-change: clip-path');
		expect(css).toContain('contain: paint');
	});

	it('builds CSS with all four directional keyframes and picks the default direction via a custom property fallback', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-left');
		expect(css).toContain('@keyframes theme-wipe-reveal-right');
		expect(css).toContain('@keyframes theme-wipe-reveal-up');
		expect(css).toContain('@keyframes theme-wipe-reveal-down');
		expect(css).toContain(
			'var(--theme-wipe-direction, theme-wipe-reveal-left)',
		);
	});

	it('animates inset() growing from the left edge for the left keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('inset(0 100% 0 0)');
		expect(css).toContain('inset(0 0% 0 0)');
	});

	it('animates inset() growing from the right edge for the right keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('inset(0 0 0 100%)');
		expect(css).toContain('inset(0 0 0 0%)');
	});

	it('animates inset() growing downward from the top edge for the down keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('inset(0 0 100% 0)');
		expect(css).toContain('inset(0 0 0% 0)');
	});

	it('animates inset() growing upward from the bottom edge for the up keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('inset(100% 0 0 0)');
		expect(css).toContain('inset(0% 0 0 0)');
	});

	it('animates inset() growing from the center outward on both sides for the center-x keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-center-x');
		expect(css).toContain('inset(0 50% 0 50%)');
		expect(css).toContain('inset(0 0% 0 0%)');
	});

	it('animates inset() growing from the center outward on both sides for the center-y keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-center-y');
		expect(css).toContain('inset(50% 0 50% 0)');
		expect(css).toContain('inset(0% 0 0% 0)');
	});

	it('animates a polygon sweeping from the top-left corner to fully cover the box for the diagonal-tl keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-diagonal-tl');
		expect(css).toContain('polygon(0% 0%, 0% 0%, 0% 0%)');
		expect(css).toContain('polygon(0% 0%, 200% 0%, 0% 200%)');
	});

	it('animates a polygon sweeping from the top-right corner to fully cover the box for the diagonal-tr keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-diagonal-tr');
		expect(css).toContain('polygon(100% 0%, 100% 0%, 100% 0%)');
		expect(css).toContain('polygon(100% 0%, -100% 0%, 100% 200%)');
	});

	it('animates a polygon sweeping from the bottom-left corner to fully cover the box for the diagonal-bl keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-diagonal-bl');
		expect(css).toContain('polygon(0% 100%, 0% 100%, 0% 100%)');
		expect(css).toContain('polygon(0% 100%, 200% 100%, 0% -100%)');
	});

	it('animates a polygon sweeping from the bottom-right corner to fully cover the box for the diagonal-br keyframe', () => {
		const css = wipeEffect.buildCss(defaultWipeOptions);
		expect(css).toContain('@keyframes theme-wipe-reveal-diagonal-br');
		expect(css).toContain('polygon(100% 100%, 100% 100%, 100% 100%)');
		expect(css).toContain('polygon(100% 100%, -100% 100%, 100% -100%)');
	});

	it('estimates the skip time from the configured duration', () => {
		expect(wipeEffect.getSkipAfterMs(defaultWipeOptions, null)).toBe(1000);
	});
});
