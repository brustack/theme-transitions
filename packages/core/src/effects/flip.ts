import type { EffectDefinition, FlipEffectOptions } from '../types';
import { getSkipAfterMsFromDuration } from '../time';
import { createEffectSelectors } from './selectors';

const { vtSelector, vtGroup, vtImagePair } = createEffectSelectors('flip');

export const defaultFlipOptions: FlipEffectOptions = {
	duration: '500ms',
	easing: 'ease-in-out',
	direction: 'horizontal',
};

const flipKeyframe = (name: string, from: string, to: string) => `
      @keyframes ${name} {
        from {
          transform: ${from};
        }

        to {
          transform: ${to};
        }
      }
    `;

export const flipEffect: EffectDefinition<FlipEffectOptions> = {
	name: 'flip',
	requiresOrigin: false,
	buildCss: (options) => {
		const { duration, easing, direction } = options;

		return `
      ${vtImagePair()} {
        perspective: 3000px;
        transform-style: preserve-3d;
      }

      ${vtGroup()} {
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: var(--theme-easing, ${easing});
      }

      ${vtSelector('old')} {
        z-index: 1;
        animation-name: var(--theme-flip-out-name, theme-flip-out-${direction});
        animation-duration: calc(var(--theme-duration, ${duration}) / 2);
        animation-timing-function: var(--theme-easing, ${easing});
        animation-fill-mode: both;
        backface-visibility: hidden;
      }

      ${vtSelector('new')} {
        z-index: 2;
        animation-name: var(--theme-flip-in-name, theme-flip-in-${direction});
        animation-duration: calc(var(--theme-duration, ${duration}) / 2);
        animation-delay: calc(var(--theme-duration, ${duration}) / 2);
        animation-timing-function: var(--theme-easing, ${easing});
        animation-fill-mode: both;
        backface-visibility: hidden;
      }

      ${flipKeyframe(
			'theme-flip-out-horizontal',
			'rotateY(0deg)',
			'rotateY(90deg)',
		)}
      ${flipKeyframe(
			'theme-flip-in-horizontal',
			'rotateY(-90deg)',
			'rotateY(0deg)',
		)}
      ${flipKeyframe(
			'theme-flip-out-vertical',
			'rotateX(0deg)',
			'rotateX(90deg)',
		)}
      ${flipKeyframe(
			'theme-flip-in-vertical',
			'rotateX(-90deg)',
			'rotateX(0deg)',
		)}
    `;
	},
	getSkipAfterMs: getSkipAfterMsFromDuration,
};
