import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

const controllerMock = vi.hoisted(() => {
	const listeners = new Set<() => void>();
	let state: {
		theme: string;
		mode: string;
		isAnimating: boolean;
		themes: string[];
	} = {
		theme: 'light',
		mode: 'light',
		isAnimating: false,
		themes: ['light', 'dark', 'system'],
	};

	return {
		getState: () => state,
		setState: (next: Partial<typeof state>) => {
			state = { ...state, ...next };
			for (const listener of listeners) {
				listener();
			}
		},
		subscribe: (listener: () => void) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		listenerCount: () => listeners.size,
		clearListeners: () => listeners.clear(),
		toggleTheme: vi.fn(async () => {}),
		setTheme: vi.fn(async () => {}),
	};
});

const getControllerMock = vi.hoisted(() => vi.fn(() => controllerMock));

vi.mock('@brustack/theme-transitions-core', async (importOriginal) => {
	const actual = await importOriginal<
    typeof import('@brustack/theme-transitions-core')
	>();

	return {
		...actual,
		getController: getControllerMock,
	};
});

import { useThemeTransition } from './useThemeTransition';

beforeEach(() => {
	controllerMock.clearListeners();
	controllerMock.setState({
		theme: 'light',
		mode: 'light',
		isAnimating: false,
		themes: ['light', 'dark', 'system'],
	});
	vi.clearAllMocks();
});

describe('useThemeTransition', () => {
	it('reflects the controller\'s current state on mount', () => {
		controllerMock.setState({ theme: 'dark', mode: 'dark', isAnimating: true });
		const { result } = renderHook(() => useThemeTransition());

		expect(result.current.theme).toBe('dark');
		expect(result.current.mode).toBe('dark');
		expect(result.current.isAnimating).toBe(true);
	});

	it('updates reactively when the controller notifies a state change', () => {
		const { result } = renderHook(() => useThemeTransition());

		act(() => {
			controllerMock.setState({ theme: 'dark' });
		});

		expect(result.current.theme).toBe('dark');
	});

	it('unsubscribes from the controller on unmount', () => {
		const { unmount } = renderHook(() => useThemeTransition());

		expect(controllerMock.listenerCount()).toBe(1);
		unmount();

		expect(controllerMock.listenerCount()).toBe(0);
	});

	it('delegates toggleTheme to the controller with the same arguments', async () => {
		const { result } = renderHook(() => useThemeTransition());
		const options = { origin: { x: 1, y: 2 } };

		await act(async () => {
			await result.current.toggleTheme(options);
		});

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith(options);
	});

	it('delegates setTheme to the controller with the same arguments', async () => {
		const { result } = renderHook(() => useThemeTransition());
		const options = { variant: 'fade' as const };

		await act(async () => {
			await result.current.setTheme('dark', options);
		});

		expect(controllerMock.setTheme).toHaveBeenCalledWith('dark', options);
	});

	it('converts a plain event-like object into an origin when calling toggleTheme', async () => {
		const { result } = renderHook(() => useThemeTransition());
		const syntheticEvent = { clientX: 10, clientY: 20 };

		await act(async () => {
			await result.current.toggleTheme(syntheticEvent as never);
		});

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith({
			origin: { x: 10, y: 20 },
		});
	});

	it('converts a plain event-like object into an origin when calling setTheme', async () => {
		const { result } = renderHook(() => useThemeTransition());
		const syntheticEvent = { clientX: 30, clientY: 40 };

		await act(async () => {
			await result.current.setTheme('dark', syntheticEvent as never);
		});

		expect(controllerMock.setTheme).toHaveBeenCalledWith('dark', {
			origin: { x: 30, y: 40 },
		});
	});

	it('passes opts through to getController', () => {
		const opts = { variant: 'spread' as const };
		renderHook(() => useThemeTransition(opts));

		expect(getControllerMock).toHaveBeenCalledWith(opts);
	});

	it('exposes the themes list from the controller', () => {
		controllerMock.setState({ themes: ['light', 'dark', 'system', 'pink'] });
		const { result } = renderHook(() => useThemeTransition());

		expect(result.current.themes).toEqual(['light', 'dark', 'system', 'pink']);
	});

	it('accepts a custom theme name in setTheme', async () => {
		const { result } = renderHook(() => useThemeTransition());
		const options = { variant: 'fade' as const };

		await act(async () => {
			await result.current.setTheme('pink', options);
		});

		expect(controllerMock.setTheme).toHaveBeenCalledWith('pink', options);
	});
});
