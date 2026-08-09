import type { SpreadEffectOptions, ThemeOrigin } from './types';
import { getViewportSize } from './viewport';

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

export const estimateSpreadSkipMs = (
	origin: ThemeOrigin,
	options: SpreadEffectOptions,
): number => {
	const durationMs = parseCssDuration(options.duration);

	if (typeof window === 'undefined') {
		return durationMs;
	}

	const { width, height } = getViewportSize();

	const coverDistance = Math.hypot(
		Math.max(origin.x, width - origin.x),
		Math.max(origin.y, height - origin.y),
	);

	const match = options.radius.match(/^([\d.]+)vmax$/);
	const vmaxValue = Number.parseFloat(match?.[1] ?? '150');
	const vmaxPx = (Math.max(width, height) / 100) * vmaxValue;

	const ratio = Math.min(1, coverDistance / vmaxPx);

	return Math.round(durationMs * ratio + SKIP_BUFFER_MS);
};
