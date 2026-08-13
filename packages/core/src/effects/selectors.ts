import type { ThemeEffect } from '../types';

export const createEffectSelectors = (effect: ThemeEffect) => ({
	vtSelector: (layer: 'old' | 'new') =>
		`html[data-theme-effect="${effect}"]::view-transition-${layer}(root)`,
	vtGroup: () =>
		`html[data-theme-effect="${effect}"]::view-transition-group(root)`,
	vtImagePair: () =>
		`html[data-theme-effect="${effect}"]::view-transition-image-pair(root)`,
});
