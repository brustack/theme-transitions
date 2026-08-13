// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
	{
		ignores: ['**/dist/**', '**/node_modules/**', '.claude/**', 'apps/vue-demo/**', 'apps/react-demo/**', 'apps/next-demo/**', 'apps/nuxt-demo/**', 'apps/alpine-demo/**', 'apps/angular-demo/**'],
	},
	tseslint.configs.recommended,
	stylistic.configs.customize({
		indent: 'tab',
		quotes: 'single',
		semi: true,
	}),
	{
		files: ['packages/nuxt/src/shims-nuxt.d.ts'],
		rules: {
			'@typescript-eslint/no-empty-object-type': 'off',
		},
	},
);
