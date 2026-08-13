import type { EffectDefinition, SpreadEffectOptions } from '../types';
import { parseCssDuration } from '../time';

const vtSelector = (layer: 'old' | 'new') =>
	`html[data-theme-effect="spread"]::view-transition-${layer}(root)`;

const vtGroup = () =>
	`html[data-theme-effect="spread"]::view-transition-group(root)`;

export const defaultSpreadOptions: SpreadEffectOptions = {
	duration: '1s',
	easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
	radius: '200vmax',
};

export const SPREAD_RADIUS_PERCENT = '150%';

export const spreadEffect: EffectDefinition<SpreadEffectOptions> = {
	name: 'spread',
	requiresOrigin: true,
	buildCss: (options) => {
		const { duration, easing, radius } = options;

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
        animation-name: theme-spread-reveal;
        animation-duration: var(--theme-duration, ${duration});
        animation-timing-function: linear;
        animation-fill-mode: both;
        will-change: clip-path;
        contain: paint;
      }

      @keyframes theme-spread-reveal {
        from {
          clip-path: circle(0px at var(--theme-origin-x) var(--theme-origin-y));
        }

        to {
          clip-path: circle(var(--theme-radius, ${radius}) at var(--theme-origin-x) var(--theme-origin-y));
        }
      }
    `;
	},
	getSkipAfterMs: options => parseCssDuration(options.duration),
};
