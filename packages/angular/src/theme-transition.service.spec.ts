import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ThemeTransitionService } from './theme-transition.service';
import { provideThemeTransitions } from './theme-transition.providers';

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

beforeEach(() => {
	controllerMock.clearListeners();
	controllerMock.setState({
		theme: 'light',
		mode: 'light',
		isAnimating: false,
		themes: ['light', 'dark', 'system'],
	});
	vi.clearAllMocks();
	TestBed.resetTestingModule();
});

describe('ThemeTransitionService', () => {
	it('reflects the controller\'s current state on construction', () => {
		controllerMock.setState({ theme: 'dark', mode: 'dark', isAnimating: true });
		const service = TestBed.inject(ThemeTransitionService);

		expect(service.theme()).toBe('dark');
		expect(service.mode()).toBe('dark');
		expect(service.isAnimating()).toBe(true);
	});

	it('updates reactively when the controller notifies a state change', () => {
		const service = TestBed.inject(ThemeTransitionService);

		controllerMock.setState({ theme: 'dark' });

		expect(service.theme()).toBe('dark');
	});

	it('exposes the themes list from the controller', () => {
		controllerMock.setState({ themes: ['light', 'dark', 'system', 'pink'] });
		const service = TestBed.inject(ThemeTransitionService);

		expect(service.themes()).toEqual(['light', 'dark', 'system', 'pink']);
	});

	it('delegates toggleTheme to the controller with the resolved options', async () => {
		const service = TestBed.inject(ThemeTransitionService);
		const options = { origin: { x: 1, y: 2 } };

		await service.toggleTheme(options);

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith(options);
	});

	it('delegates setTheme to the controller with the resolved options', async () => {
		const service = TestBed.inject(ThemeTransitionService);
		const options = { variant: 'fade' as const };

		await service.setTheme('dark', options);

		expect(controllerMock.setTheme).toHaveBeenCalledWith('dark', options);
	});

	it('converts a plain event-like object into an origin when calling toggleTheme', async () => {
		const service = TestBed.inject(ThemeTransitionService);
		const syntheticEvent = { clientX: 10, clientY: 20 };

		await service.toggleTheme(syntheticEvent as never);

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith({
			origin: { x: 10, y: 20 },
		});
	});

	it('accepts a custom theme name in setTheme', async () => {
		const service = TestBed.inject(ThemeTransitionService);
		const options = { variant: 'fade' as const };

		await service.setTheme('pink', options);

		expect(controllerMock.setTheme).toHaveBeenCalledWith('pink', options);
	});

	it('calls getController with no options when provideThemeTransitions is absent', () => {
		TestBed.inject(ThemeTransitionService);

		expect(getControllerMock).toHaveBeenCalledWith(undefined);
	});

	it('forwards options from provideThemeTransitions to getController', () => {
		const options = { variant: 'spread' as const, themes: ['sepia'] };
		TestBed.configureTestingModule({
			providers: [provideThemeTransitions(options)],
		});

		TestBed.inject(ThemeTransitionService);

		expect(getControllerMock).toHaveBeenCalledWith(options);
	});
});
