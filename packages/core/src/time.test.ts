import { describe, expect, it } from 'vitest';
import { getSkipAfterMsFromDuration, parseCssDuration } from './time';

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

describe('getSkipAfterMsFromDuration', () => {
	it('parses the duration field of an options object', () => {
		expect(getSkipAfterMsFromDuration({ duration: '700ms' })).toBe(700);
	});
});
