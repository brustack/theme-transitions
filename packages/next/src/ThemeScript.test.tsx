import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
	buildColorModeInitScript,
	buildConfigInitScript,
} from '@brustack/theme-transitions-core';
import { ThemeScript } from './ThemeScript';

describe('ThemeScript', () => {
	it('renders only the anti-flash script when given no options', () => {
		const { container } = render(<ThemeScript />);
		const script = container.querySelector('script');

		expect(script?.innerHTML).toBe(buildColorModeInitScript());
	});

	it('renders the config script before the anti-flash script when options are given', () => {
		const { container } = render(
			<ThemeScript variant="spread" duration="1.5s" />,
		);
		const script = container.querySelector('script');
		const expected = `${buildConfigInitScript({
			variant: 'spread',
			duration: '1.5s',
		})}\n${buildColorModeInitScript()}`;

		expect(script?.innerHTML).toBe(expected);
	});
});
