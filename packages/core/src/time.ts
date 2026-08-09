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
