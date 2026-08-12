import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';

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

vi.mock('#imports', async () => {
	const vue = await import('vue');

	return {
		onMounted: vue.onMounted,
		onUnmounted: vue.onUnmounted,
		useRuntimeConfig: () => ({ public: { themeTransition: {} } }),
		useState: <T>(_key: string, init: () => T) => vue.ref(init()),
	};
});

import { useThemeTransition } from './useThemeTransition';

const withSetup = <T>(setupFn: () => T) => {
	let result!: T;
	const wrapper = mount(
		defineComponent({
			setup() {
				result = setupFn();
				return () => h('div');
			},
		}),
	);
	return { result, wrapper };
};

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
	it('reflects the controller\'s current state once mounted', () => {
		controllerMock.setState({
			theme: 'dark',
			mode: 'system',
			isAnimating: true,
		});
		const { result } = withSetup(() => useThemeTransition());

		expect(result.theme.value).toBe('dark');
		expect(result.mode.value).toBe('system');
		expect(result.isAnimating.value).toBe(true);
	});

	it('updates reactively when the controller notifies a state change', () => {
		const { result } = withSetup(() => useThemeTransition());

		controllerMock.setState({ theme: 'dark' });

		expect(result.theme.value).toBe('dark');
	});

	it('unsubscribes from the controller when the component unmounts', () => {
		const { wrapper } = withSetup(() => useThemeTransition());

		expect(controllerMock.listenerCount()).toBe(1);
		wrapper.unmount();

		expect(controllerMock.listenerCount()).toBe(0);
	});

	it('delegates toggleTheme to the controller with the same arguments', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const options = { origin: { x: 1, y: 2 } };

		await result.toggleTheme(options);

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith(options);
	});

	it('delegates setTheme to the controller with the same arguments', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const options = { variant: 'fade' as const };

		await result.setTheme('dark', options);

		expect(controllerMock.setTheme).toHaveBeenCalledWith('dark', options);
	});

	it('converts a MouseEvent argument to an origin when calling toggleTheme', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const event = new MouseEvent('click', { clientX: 10, clientY: 20 });

		await result.toggleTheme(event);

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith({
			origin: { x: 10, y: 20 },
		});
	});

	it('converts a MouseEvent argument to an origin when calling setTheme', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const event = new MouseEvent('click', { clientX: 30, clientY: 40 });

		await result.setTheme('dark', event);

		expect(controllerMock.setTheme).toHaveBeenCalledWith('dark', {
			origin: { x: 30, y: 40 },
		});
	});

	it('throws when toggleTheme is called before the component mounts', async () => {
		const composable = useThemeTransition();

		await expect(composable.toggleTheme()).rejects.toThrow(
			'useThemeTransition: toggleTheme/setTheme was called before the component mounted, or outside a browser context.',
		);
	});

	it('exposes the themes list once mounted', () => {
		controllerMock.setState({ themes: ['light', 'dark', 'system', 'pink'] });
		const { result } = withSetup(() => useThemeTransition());

		expect(result.themes.value).toEqual(['light', 'dark', 'system', 'pink']);
	});

	it('accepts a custom theme name in setTheme', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const options = { variant: 'fade' as const };

		await result.setTheme('pink', options);

		expect(controllerMock.setTheme).toHaveBeenCalledWith('pink', options);
	});
});
