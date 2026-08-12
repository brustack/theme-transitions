import {
	addImports,
	addImportsDir,
	addTemplate,
	createResolver,
	defineNuxtModule,
} from '@nuxt/kit';

import {
	buildColorModeInitScript,
	buildThemeTransitionCss,
	DEFAULT_VARIANT,
	resolveThemeEffects,
} from '@brustack/theme-transitions-core';
import type { ThemeOptions } from '@brustack/theme-transitions-core';

export type {
	ThemeEffect,
	ThemeOptions as ModuleOptions,
} from '@brustack/theme-transitions-core';

export default defineNuxtModule<ThemeOptions>({
	meta: {
		name: 'nuxt-theme-transitions',
		configKey: 'themeTransition',
	},
	defaults: {
		variant: DEFAULT_VARIANT,
	},
	setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);
		const variant = options.variant ?? DEFAULT_VARIANT;
		const resolvedOptions = { ...options, variant };
		const effects = resolveThemeEffects(resolvedOptions);

		nuxt.options.runtimeConfig.public.themeTransition = resolvedOptions;

		addTemplate({
			filename: 'theme-transition.css',
			getContents: () => buildThemeTransitionCss(effects),
		});

		nuxt.options.css.push('#build/theme-transition.css');

		nuxt.options.app.head.script ||= [];
		nuxt.options.app.head.script.push({
			key: 'nuxt-theme-transitions-color-mode-init',
			innerHTML: buildColorModeInitScript(),
			tagPosition: 'head',
		});

		addImportsDir(resolver.resolve('./runtime/composables'));

		addImports([
			{ name: 'originFromEvent', from: '@brustack/theme-transitions-core' },
			{ name: 'originFromElement', from: '@brustack/theme-transitions-core' },
		]);

		nuxt.hook('prepare:types', ({ references }) => {
			references.push({ path: resolver.resolve('./types.ts') });
			references.push({ path: resolver.resolve('./shims-nuxt.d.ts') });
		});
	},
});
