import type { EffectDefinition, NoneEffectOptions } from '../types';

export const defaultNoneOptions: NoneEffectOptions = {};

export const noneEffect: EffectDefinition<NoneEffectOptions> = {
	name: 'none',
	requiresOrigin: false,
	buildCss: () => '',
	getSkipAfterMs: () => 0,
};
