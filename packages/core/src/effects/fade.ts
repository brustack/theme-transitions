import type { EffectDefinition, FadeEffectOptions } from '../types';
import { getSkipAfterMsFromDuration } from '../time';
import { createEffectSelectors } from './selectors';

const { vtSelector, vtGroup } = createEffectSelectors('fade');

export const defaultFadeOptions: FadeEffectOptions = {
	duration: '400ms',
	easing: 'ease',
};

export const fadeEffect: EffectDefinition<FadeEffectOptions> = {
	name: 'fade',
	requiresOrigin: false,
	buildCss: (options) => {
		const { duration, easing } = options;

		return `
      ${vtGroup()} {
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: var(--theme-easing, ${easing});
      }

      ${vtSelector('old')} {
        animation-name: theme-fade-out;
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: var(--theme-easing, ${easing});
        animation-fill-mode: both;
      }

      ${vtSelector('new')} {
        animation-name: theme-fade-in;
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: var(--theme-easing, ${easing});
        animation-fill-mode: both;
      }

      @keyframes theme-fade-out {
        to {
          opacity: 0;
        }
      }

      @keyframes theme-fade-in {
        from {
          opacity: 0;
        }
      }
    `;
	},
	getSkipAfterMs: getSkipAfterMsFromDuration,
};
