import { afterEach, describe, expect, it, vi } from 'vitest';
import { runThemeTransition } from './runThemeTransition';
import type { EffectDefinition } from './types';

const createDefinition = (
	getSkipAfterMs: EffectDefinition['getSkipAfterMs'] = () => 1000,
): EffectDefinition => ({
	name: 'fade',
	requiresOrigin: false,
	buildCss: () => '',
	getSkipAfterMs,
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

describe('runThemeTransition', () => {
	it('runs the callback directly when document is unavailable', async () => {
		vi.stubGlobal('document', undefined);
		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			createDefinition(),
			null,
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(setAnimating).not.toHaveBeenCalled();
	});

	it('runs the callback directly when reduced motion is preferred, without a view transition', async () => {
		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};
		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition: vi.fn(),
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: true }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			createDefinition(),
			null,
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(setAnimating).toHaveBeenNthCalledWith(1, true);
		expect(setAnimating).toHaveBeenNthCalledWith(2, false);
	});

	it('runs a view transition, sets the origin custom properties, and skips after the estimated time', async () => {
		vi.useFakeTimers();

		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};

		let finishedResolve: () => void = () => {};
		const finished = new Promise<void>((resolve) => {
			finishedResolve = resolve;
		});
		const skipTransition = vi.fn(() => finishedResolve());
		const startViewTransition = vi.fn((update: () => Promise<void>) => {
			update();
			return { ready: Promise.resolve(), finished, skipTransition };
		});

		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
			innerWidth: 100,
			innerHeight: 200,
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();
		const definition = createDefinition(() => 500);

		const promise = runThemeTransition(
			definition,
			{ x: 10, y: 20 },
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(root.dataset.themeEffect).toBeUndefined();
		expect(root.style.setProperty).toHaveBeenCalledWith(
			'--theme-origin-x',
			'10%',
		);
		expect(root.style.setProperty).toHaveBeenCalledWith(
			'--theme-origin-y',
			'10%',
		);
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-origin-x');
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-origin-y');
		expect(skipTransition).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('sets and cleans up duration/easing/radius custom properties from the effect options', async () => {
		vi.useFakeTimers();

		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};

		const finished = Promise.resolve();
		const startViewTransition = vi.fn((update: () => Promise<void>) => {
			update();
			return { ready: Promise.resolve(), finished, skipTransition: vi.fn() };
		});

		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();
		const definition = createDefinition(() => 500);

		const promise = runThemeTransition(
			definition,
			null,
			{ duration: '2s', easing: 'linear', radius: '50vmax' } as never,
			callback,
			setAnimating,
		);

		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(root.style.setProperty).toHaveBeenCalledWith(
			'--theme-duration',
			'2s',
		);
		expect(root.style.setProperty).toHaveBeenCalledWith(
			'--theme-easing',
			'linear',
		);
		expect(root.style.setProperty).toHaveBeenCalledWith(
			'--theme-radius',
			'50vmax',
		);
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-duration');
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-easing');
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-radius');
	});

	it('computes an exact pixel radius for the spread effect instead of using the raw CSS value', async () => {
		vi.useFakeTimers();

		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};

		const finished = Promise.resolve();
		const startViewTransition = vi.fn((update: () => Promise<void>) => {
			update();
			return { ready: Promise.resolve(), finished, skipTransition: vi.fn() };
		});

		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
			innerWidth: 200,
			innerHeight: 200,
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();
		const definition = createDefinition(() => 500);

		const promise = runThemeTransition(
			{ ...definition, name: 'spread' },
			{ x: 100, y: 100 },
			{ duration: '2s', easing: 'linear', radius: '150vmax' } as never,
			callback,
			setAnimating,
		);

		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(root.style.setProperty).toHaveBeenCalledWith(
			'--theme-radius',
			'150px',
		);
	});

	it('runs the callback directly when the effect is none, even with view transitions supported and no reduced motion', async () => {
		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};
		const startViewTransition = vi.fn();
		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			{ ...createDefinition(), name: 'none' },
			null,
			{} as never,
			callback,
			setAnimating,
		);

		expect(startViewTransition).not.toHaveBeenCalled();
		expect(callback).toHaveBeenCalledTimes(1);
		expect(setAnimating).toHaveBeenNthCalledWith(1, true);
		expect(setAnimating).toHaveBeenNthCalledWith(2, false);
	});

	it('waits for the visual viewport to stop resizing (e.g. a closing keyboard) before starting', async () => {
		vi.useFakeTimers();

		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};
		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition: vi.fn(),
		});

		let resizeListener: (() => void) | undefined;
		const visualViewport = {
			height: 400,
			addEventListener: vi.fn((_event: string, listener: () => void) => {
				resizeListener = listener;
			}),
			removeEventListener: vi.fn(),
		};

		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
			innerWidth: 400,
			innerHeight: 800,
			visualViewport,
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();

		const promise = runThemeTransition(
			{ ...createDefinition(), name: 'none' },
			null,
			{} as never,
			callback,
			setAnimating,
		);

		await vi.advanceTimersByTimeAsync(50);
		expect(callback).not.toHaveBeenCalled();

		visualViewport.height = 800;
		resizeListener?.();
		await vi.advanceTimersByTimeAsync(120);
		await promise;

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('does not wait when the viewport is not compressed by an open keyboard', async () => {
		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};
		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition: vi.fn(),
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
			innerWidth: 400,
			innerHeight: 800,
			visualViewport: {
				height: 780,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			},
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			{ ...createDefinition(), name: 'none' },
			null,
			{} as never,
			callback,
			setAnimating,
		);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('runs the callback directly when the View Transitions API is unavailable, without reduced motion', async () => {
		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};
		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition: undefined,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			createDefinition(),
			null,
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(setAnimating).toHaveBeenNthCalledWith(1, true);
		expect(setAnimating).toHaveBeenNthCalledWith(2, false);
	});

	it('clears the pending skip timer once the transition finishes', async () => {
		vi.useFakeTimers();
		const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};

		let finishedResolve: () => void = () => {};
		const finished = new Promise<void>((resolve) => {
			finishedResolve = resolve;
		});
		const skipTransition = vi.fn(() => finishedResolve());
		const startViewTransition = vi.fn((update: () => Promise<void>) => {
			update();
			return { ready: Promise.resolve(), finished, skipTransition };
		});

		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();
		const definition = createDefinition(() => 500);

		const promise = runThemeTransition(
			definition,
			null,
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(clearTimeoutSpy).toHaveBeenCalledWith(expect.anything());
	});
});
