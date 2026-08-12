'use client';

import { createUseThemeTransitionHook } from '@brustack/react-theme-transitions';

const SERVER_SNAPSHOT = {
	theme: 'light' as const,
	mode: 'system' as const,
	isAnimating: false,
	themes: ['light', 'dark', 'system'],
};

export const useThemeTransition = createUseThemeTransitionHook(() => SERVER_SNAPSHOT);
