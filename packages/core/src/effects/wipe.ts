import type { EffectDefinition, WipeEffectOptions } from '../types';
import { getSkipAfterMsFromDuration } from '../time';
import { createEffectSelectors } from './selectors';

const { vtSelector, vtGroup } = createEffectSelectors('wipe');

export const defaultWipeOptions: WipeEffectOptions = {
	duration: '1s',
	easing: 'ease-out',
	direction: 'left',
};

const wipeKeyframe = (name: string, from: string, to: string) => `
      @keyframes ${name} {
        from {
          clip-path: ${from};
        }

        to {
          clip-path: ${to};
        }
      }
    `;

export const wipeEffect: EffectDefinition<WipeEffectOptions> = {
	name: 'wipe',
	requiresOrigin: false,
	buildCss: (options) => {
		const { duration, easing, direction } = options;

		return `
      ${vtGroup()} {
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: var(--theme-easing, ${easing});
      }

      ${vtSelector('old')} {
        z-index: 1;
        animation: none;
      }

      ${vtSelector('new')} {
        z-index: 2;
        animation-name: var(--theme-wipe-direction, theme-wipe-reveal-${direction});
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: var(--theme-easing, ${easing});
        animation-fill-mode: both;
        will-change: clip-path;
        contain: paint;
      }

      ${wipeKeyframe(
			'theme-wipe-reveal-left',
			'inset(0 100% 0 0)',
			'inset(0 0% 0 0)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-right',
			'inset(0 0 0 100%)',
			'inset(0 0 0 0%)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-down',
			'inset(0 0 100% 0)',
			'inset(0 0 0% 0)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-up',
			'inset(100% 0 0 0)',
			'inset(0% 0 0 0)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-center-x',
			'inset(0 50% 0 50%)',
			'inset(0 0% 0 0%)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-center-y',
			'inset(50% 0 50% 0)',
			'inset(0% 0 0% 0)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-diagonal-tl',
			'polygon(0% 0%, 0% 0%, 0% 0%)',
			'polygon(0% 0%, 200% 0%, 0% 200%)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-diagonal-tr',
			'polygon(100% 0%, 100% 0%, 100% 0%)',
			'polygon(100% 0%, -100% 0%, 100% 200%)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-diagonal-bl',
			'polygon(0% 100%, 0% 100%, 0% 100%)',
			'polygon(0% 100%, 200% 100%, 0% -100%)',
		)}
      ${wipeKeyframe(
			'theme-wipe-reveal-diagonal-br',
			'polygon(100% 100%, 100% 100%, 100% 100%)',
			'polygon(100% 100%, -100% 100%, 100% -100%)',
		)}
    `;
	},
	getSkipAfterMs: getSkipAfterMsFromDuration,
};
