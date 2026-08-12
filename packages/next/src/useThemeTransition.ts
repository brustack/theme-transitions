'use client';

import { createThemeTransitionHook } from '@brustack/react-theme-transitions';

const SERVER_SNAPSHOT = {
	theme: 'light' as const,
	mode: 'system' as const,
	isAnimating: false,
	themes: ['light', 'dark', 'system'],
};

export const useThemeTransition = createThemeTransitionHook(
	() => SERVER_SNAPSHOT,
);
