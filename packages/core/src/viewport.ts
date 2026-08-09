import type { ThemeOrigin } from './types';

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
export const toOriginPercent = (
	origin: ThemeOrigin,
): { x: string; y: string } => {
	const visualViewport
		= typeof window !== 'undefined' ? window.visualViewport : undefined;
	const width
		= visualViewport?.width
			?? (typeof window !== 'undefined' ? window.innerWidth : 0);
	const height
		= visualViewport?.height
			?? (typeof window !== 'undefined' ? window.innerHeight : 0);

	if (!width || !height) {
		return { x: `${origin.x}px`, y: `${origin.y}px` };
	}

	const offsetX = visualViewport?.offsetLeft ?? 0;
	const offsetY = visualViewport?.offsetTop ?? 0;

	return {
		x: `${((origin.x - offsetX) / width) * 100}%`,
		y: `${((origin.y - offsetY) / height) * 100}%`,
	};
};
