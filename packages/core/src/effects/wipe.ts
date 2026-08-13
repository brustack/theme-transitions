import type { EffectDefinition, WipeEffectOptions } from '../types';
import { parseCssDuration } from '../time';

const vtSelector = (layer: 'old' | 'new') =>
	`html[data-theme-effect="wipe"]::view-transition-${layer}(root)`;

const vtGroup = () =>
	`html[data-theme-effect="wipe"]::view-transition-group(root)`;

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
    `;
	},
	getSkipAfterMs: options => parseCssDuration(options.duration),
};
