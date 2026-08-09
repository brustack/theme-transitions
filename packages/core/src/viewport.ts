import type { ThemeOrigin } from './types';

export const getViewportSize = (): { width: number; height: number } => {
	const visualViewport
		= typeof window !== 'undefined' ? window.visualViewport : undefined;

	return {
		width:
      visualViewport?.width
      ?? (typeof window !== 'undefined' ? window.innerWidth : 0),
		height:
      visualViewport?.height
      ?? (typeof window !== 'undefined' ? window.innerHeight : 0),
	};
};

export const toOriginPercent = (
	origin: ThemeOrigin,
): { x: string; y: string } => {
	const { width, height } = getViewportSize();

	if (!width || !height) {
		return { x: `${origin.x}px`, y: `${origin.y}px` };
	}

	const visualViewport
		= typeof window !== 'undefined' ? window.visualViewport : undefined;
	const offsetX = visualViewport?.offsetLeft ?? 0;
	const offsetY = visualViewport?.offsetTop ?? 0;

	return {
		x: `${((origin.x - offsetX) / width) * 100}%`,
		y: `${((origin.y - offsetY) / height) * 100}%`,
	};
};

const RADIUS_SAFETY_MARGIN_PX = 8;

export const resolveSpreadRadiusPx = (origin: ThemeOrigin): string | null => {
	if (typeof window === 'undefined') {
		return null;
	}

	const visualViewport = window.visualViewport;
	const width = Math.max(window.innerWidth, visualViewport?.width ?? 0);
	const height = Math.max(window.innerHeight, visualViewport?.height ?? 0);

	if (!width || !height) {
		return null;
	}

	const distance = Math.hypot(
		Math.max(origin.x, width - origin.x),
		Math.max(origin.y, height - origin.y),
	);

	return `${Math.ceil(distance) + RADIUS_SAFETY_MARGIN_PX}px`;
};
