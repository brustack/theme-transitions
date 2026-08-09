import type { EffectDefinition, EffectOptions, ThemeOrigin } from './types';
import { toOriginPercent } from './viewport';

export const runThemeTransition = async (
	definition: EffectDefinition,
	origin: ThemeOrigin | null,
	effectOptions: EffectOptions,
	callback: () => void | Promise<void>,
	setAnimating: (value: boolean) => void,
) => {
	if (typeof document === 'undefined') {
		await callback();
		return;
	}

	const root = document.documentElement;
	root.dataset.themeEffect = definition.name;

	if (origin) {
		const { x, y } = toOriginPercent(origin);
		root.style.setProperty('--theme-origin-x', x);
		root.style.setProperty('--theme-origin-y', y);
	}

	if ('duration' in effectOptions) {
		root.style.setProperty('--theme-duration', effectOptions.duration);
	}

	if ('easing' in effectOptions) {
		root.style.setProperty('--theme-easing', effectOptions.easing);
	}

	if ('radius' in effectOptions) {
		root.style.setProperty('--theme-radius', effectOptions.radius);
	}

	const cleanup = () => {
		delete root.dataset.themeEffect;
		root.style.removeProperty('--theme-origin-x');
		root.style.removeProperty('--theme-origin-y');
		root.style.removeProperty('--theme-duration');
		root.style.removeProperty('--theme-easing');
		root.style.removeProperty('--theme-radius');
	};

	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (
		definition.name === 'none'
		|| !document.startViewTransition
		|| prefersReducedMotion
	) {
		setAnimating(true);

		try {
			await callback();
		}
		finally {
			setAnimating(false);
			cleanup();
		}

		return;
	}

	setAnimating(true);

	const transition = document.startViewTransition(async () => {
		await callback();
	});

	let skipTimer: ReturnType<typeof setTimeout> | undefined;

	try {
		await transition.ready;

		const skipAfterMs = definition.getSkipAfterMs(effectOptions, origin);
		skipTimer = setTimeout(() => {
			transition.skipTransition?.();
			setAnimating(false);
		}, skipAfterMs);

		await transition.finished;
	}
	finally {
		if (skipTimer) {
			clearTimeout(skipTimer);
		}

		setAnimating(false);
		cleanup();
	}
};
