import type { ThemeOrigin } from './types';

/**
 * The viewport size used for both the rendered origin (below) and the
 * spread effect's skip-timing estimate (time.ts). They must agree, or the
 * animation's early-skip cutoff drifts out of sync with what's actually
 * on screen and the transition appears to jump.
 */
export const getViewportSize = (): { width: number; height: number } => {
	const visualViewport = typeof window !== 'undefined' ? window.visualViewport : undefined;

	return {
		width: visualViewport?.width ?? (typeof window !== 'undefined' ? window.innerWidth : 0),
		height: visualViewport?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 0),
	};
};

/**
 * Converts a viewport-relative origin (from clientX/clientY) into a
 * percentage of the visible viewport. On mobile browsers the layout
 * viewport used by clientX/clientY can drift from what's actually
 * rendered (e.g. Chrome Android's collapsing address bar), while
 * window.visualViewport tracks what's really on screen. Percentages
 * resolve against the transition's own rendered box, so they stay
 * accurate even if that box's size doesn't exactly match innerWidth/
 * innerHeight at capture time.
 */
export const toOriginPercent = (origin: ThemeOrigin): { x: string; y: string } => {
	const { width, height } = getViewportSize();

	if (!width || !height) {
		return { x: `${origin.x}px`, y: `${origin.y}px` };
	}

	const visualViewport = typeof window !== 'undefined' ? window.visualViewport : undefined;
	const offsetX = visualViewport?.offsetLeft ?? 0;
	const offsetY = visualViewport?.offsetTop ?? 0;

	return {
		x: `${((origin.x - offsetX) / width) * 100}%`,
		y: `${((origin.y - offsetY) / height) * 100}%`,
	};
};
