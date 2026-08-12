import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
	stored: 'light' as string,
	system: 'light' as 'light' | 'dark',
}));

const mocks = vi.hoisted(() => ({
	writeStoredPreference: vi.fn(),
	applyThemeClass: vi.fn(),
}));

vi.mock('./colorMode', () => ({
	getSystemTheme: () => state.system,
	resolveTheme: (preference: string) =>
		preference === 'system' ? state.system : preference,
	readStoredPreference: () => state.stored,
	writeStoredPreference: (preference: string) => {
		state.stored = preference;
		mocks.writeStoredPreference(preference);
	},
	applyThemeClass: mocks.applyThemeClass,
}));

vi.mock('./runThemeTransition', () => ({
	runThemeTransition: vi.fn(
		async (
			_definition: unknown,
			_origin: unknown,
			_effectOptions: unknown,
			callback: () => void | Promise<void>,
			setAnimating: (value: boolean) => void,
		) => {
			setAnimating(true);
			await callback();
			setAnimating(false);
		},
	),
}));

import { createController, getController, resetController } from './controller';
import { defaultSpreadOptions } from './effects/spread';
import { runThemeTransition } from './runThemeTransition';

beforeEach(() => {
	state.stored = 'light';
	state.system = 'light';
	vi.clearAllMocks();
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('createController', () => {
	it('initializes theme and mode from the stored preference', () => {
		state.stored = 'dark';
		const controller = createController();
		expect(controller.getState()).toEqual({
			theme: 'dark',
			mode: 'dark',
			isAnimating: false,
			themes: ['light', 'dark', 'system'],
		});
	});

	it('toggleTheme flips light to dark, persists the resolved value, and updates mode', async () => {
		const controller = createController();
		await controller.toggleTheme();

		expect(controller.getState().theme).toBe('dark');
		expect(controller.getState().mode).toBe('dark');
		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('dark');
		expect(mocks.applyThemeClass).toHaveBeenCalledWith('dark', 'light');
	});

	it('toggleTheme flips dark back to light', async () => {
		state.stored = 'dark';
		const controller = createController();
		await controller.toggleTheme();

		expect(controller.getState().theme).toBe('light');
	});

	it('setTheme is a no-op while a transition is already animating', async () => {
		const controller = createController();
		const first = controller.toggleTheme();
		await controller.setTheme('light');
		await first;

		expect(mocks.writeStoredPreference).toHaveBeenCalledTimes(1);
		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('dark');
	});

	it('toggleTheme is a no-op while a transition is already animating', async () => {
		const controller = createController();
		const first = controller.toggleTheme();
		const second = controller.toggleTheme();
		await first;
		await second;

		expect(mocks.writeStoredPreference).toHaveBeenCalledTimes(1);
		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('dark');
	});

	it('setTheme short-circuits when already on the requested mode', async () => {
		const controller = createController();
		await controller.setTheme('light');

		expect(mocks.writeStoredPreference).not.toHaveBeenCalled();
	});

	it('setTheme short-circuits when already on system mode and system is requested again', async () => {
		state.stored = 'system';
		const controller = createController();
		await controller.setTheme('system');

		expect(mocks.writeStoredPreference).not.toHaveBeenCalled();
	});

	it('setTheme proceeds from an explicit mode to system, without animating, when resolved to the same theme', async () => {
		const controller = createController();
		await controller.setTheme('system');

		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('system');
		expect(controller.getState()).toEqual({
			theme: 'light',
			mode: 'system',
			isAnimating: false,
			themes: ['light', 'dark', 'system'],
		});
		expect(runThemeTransition).not.toHaveBeenCalled();
	});

	it('setTheme proceeds from system to an explicit mode, without animating, when it matches the currently resolved theme', async () => {
		state.stored = 'system';
		state.system = 'dark';
		const controller = createController();
		expect(controller.getState().theme).toBe('dark');

		await controller.setTheme('dark');

		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('dark');
		expect(controller.getState()).toEqual({
			theme: 'dark',
			mode: 'dark',
			isAnimating: false,
			themes: ['light', 'dark', 'system'],
		});
		expect(runThemeTransition).not.toHaveBeenCalled();
	});

	it('does not require an origin when skipping the animation for an unchanged resolved theme', async () => {
		state.stored = 'system';
		state.system = 'dark';
		const controller = createController({ variant: 'spread' });

		await expect(controller.setTheme('dark')).resolves.toBeUndefined();
	});

	it('isAnimating toggles true then false around a transition', async () => {
		const controller = createController();
		const seen: boolean[] = [];
		controller.subscribe(() => {
			seen.push(controller.getState().isAnimating);
		});

		await controller.toggleTheme();

		expect(seen).toContain(true);
		expect(seen[seen.length - 1]).toBe(false);
	});

	it('subscribe notifies on every state change and unsubscribe stops further notifications', async () => {
		const controller = createController();
		const listener = vi.fn();
		const unsubscribe = controller.subscribe(listener);

		await controller.toggleTheme();
		const callsAfterFirstToggle = listener.mock.calls.length;
		expect(callsAfterFirstToggle).toBeGreaterThan(0);

		unsubscribe();
		await controller.toggleTheme();

		expect(listener).toHaveBeenCalledTimes(callsAfterFirstToggle);
	});

	it('throws when a variant requiring an origin is used without one', async () => {
		const controller = createController({ variant: 'spread' });
		await expect(controller.toggleTheme()).rejects.toThrow('requires an origin point');
	});

	it('merges per-call duration and easing overrides onto the resolved effect options for fade', async () => {
		const controller = createController({ variant: 'fade' });
		await controller.toggleTheme({ duration: '2s', easing: 'linear' });

		expect(runThemeTransition).toHaveBeenCalledWith(
			expect.anything(),
			null,
			{ duration: '2s', easing: 'linear' },
			expect.anything(),
			expect.anything(),
		);
	});

	it('merges only the duration override for spread, ignoring easing and radius', async () => {
		const controller = createController({ variant: 'spread' });
		await controller.toggleTheme({
			origin: { x: 0, y: 0 },
			duration: '2s',
			easing: 'linear',
			radius: '50vmax',
		});

		expect(runThemeTransition).toHaveBeenCalledWith(
			expect.anything(),
			{ x: 0, y: 0 },
			{ duration: '2s', easing: defaultSpreadOptions.easing, radius: defaultSpreadOptions.radius },
			expect.anything(),
			expect.anything(),
		);
	});

	it('ignores radius overrides for the fade variant', async () => {
		const controller = createController({ variant: 'fade' });
		await controller.toggleTheme({ duration: '2s', radius: '50vmax' });

		expect(runThemeTransition).toHaveBeenCalledWith(
			expect.anything(),
			null,
			expect.objectContaining({ duration: '2s' }),
			expect.anything(),
			expect.anything(),
		);
		expect(vi.mocked(runThemeTransition).mock.calls[0][2]).not.toHaveProperty('radius');
	});

	it('ignores duration/easing/radius overrides for the none variant', async () => {
		const controller = createController({ variant: 'none' });
		await controller.toggleTheme({ duration: '2s', easing: 'linear', radius: '50vmax' });

		expect(runThemeTransition).toHaveBeenCalledWith(
			expect.anything(),
			null,
			{},
			expect.anything(),
			expect.anything(),
		);
	});
});

describe('system preference sync', () => {
	const createMatchMediaMock = () => {
		let listener: (() => void) | undefined;
		return {
			addEventListener: (_event: string, handler: () => void) => {
				listener = handler;
			},
			fireChange: () => listener?.(),
		};
	};

	it('updates theme on a system preference change while stored preference is "system"', () => {
		const media = createMatchMediaMock();
		vi.stubGlobal('matchMedia', () => media);
		state.stored = 'system';
		state.system = 'light';

		const controller = createController();
		state.system = 'dark';
		media.fireChange();

		expect(controller.getState().theme).toBe('dark');
		expect(mocks.applyThemeClass).toHaveBeenCalledWith('dark', 'light');
	});

	it('ignores a system preference change when the stored preference is explicit', () => {
		const media = createMatchMediaMock();
		vi.stubGlobal('matchMedia', () => media);
		state.stored = 'light';
		state.system = 'light';

		const controller = createController();
		state.system = 'dark';
		media.fireChange();

		expect(controller.getState().theme).toBe('light');
		expect(mocks.applyThemeClass).not.toHaveBeenCalled();
	});

	it('does not throw when matchMedia is unavailable', () => {
		vi.stubGlobal('matchMedia', undefined);
		expect(() => createController()).not.toThrow();
	});
});

describe('getController', () => {
	it('returns the same instance across calls', () => {
		expect(getController()).toBe(getController());
	});

	it('returns a different instance from createController', () => {
		expect(createController()).not.toBe(getController());
	});

	it('returns a fresh instance after resetController', () => {
		const before = getController();
		resetController();
		expect(getController()).not.toBe(before);
	});
});

describe('plugin config (window.__themeConfig)', () => {
	it('applies a plugin-configured variant and duration when no explicit options are given', async () => {
		vi.stubGlobal('window', { __themeConfig: { variant: 'spread', duration: '2s' } });
		const controller = createController();

		await controller.toggleTheme({ origin: { x: 0, y: 0 } });

		expect(runThemeTransition).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'spread' }),
			{ x: 0, y: 0 },
			expect.objectContaining({ duration: '2s' }),
			expect.anything(),
			expect.anything(),
		);
	});

	it('lets an explicit createController option win over a conflicting plugin config value', async () => {
		vi.stubGlobal('window', { __themeConfig: { variant: 'fade' } });
		const controller = createController({ variant: 'spread' });

		await controller.toggleTheme({ origin: { x: 0, y: 0 } });

		expect(runThemeTransition).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'spread' }),
			expect.anything(),
			expect.anything(),
			expect.anything(),
			expect.anything(),
		);
	});

	it('behaves exactly as before when there is no plugin config', () => {
		const controller = createController();
		expect(controller.getState()).toEqual({
			theme: 'light',
			mode: 'light',
			isAnimating: false,
			themes: ['light', 'dark', 'system'],
		});
	});
});

describe('custom themes', () => {
	it('supports setting a custom theme name beyond light/dark', async () => {
		const controller = createController({ themes: ['pink'] });
		await controller.setTheme('pink');

		expect(controller.getState().theme).toBe('pink');
		expect(controller.getState().mode).toBe('pink');
		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('pink');
		expect(mocks.applyThemeClass).toHaveBeenCalledWith('pink', 'light');
	});

	it('includes custom themes alongside light/dark/system in state.themes', () => {
		const controller = createController({ themes: ['pink', 'sunset'] });
		expect(controller.getState().themes).toEqual(['light', 'dark', 'system', 'pink', 'sunset']);
	});

	it('deduplicates a custom theme name that collides with a built-in one', () => {
		const controller = createController({ themes: ['light', 'pink'] });
		expect(controller.getState().themes).toEqual(['light', 'dark', 'system', 'pink']);
	});

	it('defaults to just the built-in themes when none are configured', () => {
		const controller = createController();
		expect(controller.getState().themes).toEqual(['light', 'dark', 'system']);
	});
});
