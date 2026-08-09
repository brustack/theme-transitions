import type { SpreadEffectOptions, ThemeOrigin } from './types';

const CSS_DURATION_PATTERN = /^\d+(\.\d+)?(ms|s)$/;

export const isValidCssDuration = (duration: string): boolean => CSS_DURATION_PATTERN.test(duration);

export const parseCssDuration = (duration: string): number => {
	const trimmed = duration.trim();

	if (trimmed.endsWith('ms')) {
		return parseFloat(trimmed);
	}

	if (trimmed.endsWith('s')) {
		return parseFloat(trimmed) * 1000;
	}

	return parseFloat(trimmed) || 0;
};

const SKIP_BUFFER_MS = 50;

/**
 * The CSS `vmax` unit that drives the circle's actual rendered radius is
 * resolved natively by the browser against whichever viewport frame it
 * uses internally, which we can't observe from JS and which can differ
 * from both window.innerWidth/innerHeight and window.visualViewport on
 * mobile. To never cut the reveal short before it visually finishes, the
 * distance the circle must cover is estimated using the larger of the two
 * candidates (worst case, biases the skip later) and the radius it will
 * reach is estimated using the smaller of the two (worst case, also
 * biases the skip later).
 */
export const estimateSpreadSkipMs = (
	origin: ThemeOrigin,
	options: SpreadEffectOptions,
): number => {
	const durationMs = parseCssDuration(options.duration);

	if (typeof window === 'undefined') {
		return durationMs;
	}

	const visualViewport = window.visualViewport;
	const coverWidth = Math.max(window.innerWidth, visualViewport?.width ?? 0);
	const coverHeight = Math.max(window.innerHeight, visualViewport?.height ?? 0);
	const radiusWidth = visualViewport?.width
		? Math.min(window.innerWidth, visualViewport.width)
		: window.innerWidth;
	const radiusHeight = visualViewport?.height
		? Math.min(window.innerHeight, visualViewport.height)
		: window.innerHeight;

	const coverDistance = Math.hypot(
		Math.max(origin.x, coverWidth - origin.x),
		Math.max(origin.y, coverHeight - origin.y),
	);

	const match = options.radius.match(/^([\d.]+)vmax$/);
	const vmaxValue = Number.parseFloat(match?.[1] ?? '150');
	const vmaxPx = (Math.max(radiusWidth, radiusHeight) / 100) * vmaxValue;

	const ratio = Math.min(1, coverDistance / vmaxPx);

	return Math.round(durationMs * ratio + SKIP_BUFFER_MS);
};
