import {
	installSnippets,
	PACKAGE_DIRS,
	PACKAGE_SLUGS,
	usageSnippets,
} from './snippets';
import type { CodeBlockData, Framework } from './snippets';

export type DocBlock
	= | { kind: 'badges'; items: { label: string; href: string }[] }
		| { kind: 'code'; entries: CodeBlockData[]; spaced?: boolean }
		| {
			kind: 'table';
			headers?: string[];
			headerTooltips?: Record<string, string>;
			rows: string[][];
		}
		| { kind: 'callout'; html: string }
		| { kind: 'subhead'; text: string }
		| { kind: 'paragraph'; html: string };

export interface DocSectionDef {
	id: string;
	eyebrow: string;
	title: string | ((framework: Framework) => string);
	description: string;
	blocks: (framework: Framework) => DocBlock[];
}

const cssVariablesCode = `:root {
  <span class="tok-prop">--bg</span>: <span class="tok-str">#ffffff</span>;
  <span class="tok-prop">--text</span>: <span class="tok-str">#111111</span>;
}

html.dark {
  <span class="tok-prop">--bg</span>: <span class="tok-str">#0b0b10</span>;
  <span class="tok-prop">--text</span>: <span class="tok-str">#f4f2ed</span>;
}

html.nord {
  <span class="tok-prop">--bg</span>: <span class="tok-str">#2e3440</span>;
  <span class="tok-prop">--text</span>: <span class="tok-str">#eceff4</span>;
}

body {
  background: var(<span class="tok-prop">--bg</span>);
  color: var(<span class="tok-prop">--text</span>);
}`;

const tailwindConfigCode = `<span class="tok-com">// tailwind.config.js</span>
<span class="tok-kw">module.exports</span> = {
  darkMode: <span class="tok-str">'class'</span>,
  theme: {
    extend: {
      colors: {
        bg: <span class="tok-str">'var(--bg)'</span>,
        text: <span class="tok-str">'var(--text)'</span>,
      },
    },
  },
};`;

const styledComponentsCode = `<span class="tok-com">// App.tsx</span>
<span class="tok-kw">import</span> { createGlobalStyle } <span class="tok-kw">from</span> <span class="tok-str">'styled-components'</span>;
<span class="tok-kw">import</span> { ThemeToggle } <span class="tok-kw">from</span> <span class="tok-str">'./theme-toggle'</span>;

<span class="tok-kw">const</span> GlobalStyle = <span class="tok-fn">createGlobalStyle</span>\`
  :root {
    --bg: #ffffff;
    --text: #111111;
  }

  html.dark {
    --bg: #0b0b10;
    --text: #f4f2ed;
  }

  html.nord {
    --bg: #2e3440;
    --text: #eceff4;
  }
\`;

<span class="tok-kw">export const</span> App = () =&gt; (
  &lt;&gt;
    &lt;GlobalStyle /&gt;
    &lt;ThemeToggle /&gt;
  &lt;/&gt;
);`;

const customThemesExampleCode = `useThemeTransition({ <span class="tok-prop">themes</span>: [<span class="tok-str">'nord'</span>, <span class="tok-str">'sunset'</span>] })`;

const viteConfigCode = `<span class="tok-kw">import</span> { defineConfig } <span class="tok-kw">from</span> <span class="tok-str">'vite'</span>;
<span class="tok-kw">import</span> { themeTransitions } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/theme-transitions-core/vite'</span>;

<span class="tok-kw">export default</span> <span class="tok-fn">defineConfig</span>({
  plugins: [<span class="tok-fn">themeTransitions</span>()],
});`;

const webpackConfigCode = `<span class="tok-kw">const</span> { buildColorModeInitScript } = <span class="tok-fn">require</span>(<span class="tok-str">'@brustack/theme-transitions-core'</span>);

<span class="tok-kw">new</span> <span class="tok-fn">HtmlWebpackPlugin</span>({
  templateParameters: { themeInitScript: <span class="tok-fn">buildColorModeInitScript</span>() },
});`;

const webpackTemplateCode = `<span class="tok-com">&lt;!-- inside &lt;head&gt;, before your bundle's own scripts --&gt;</span>
<span class="tok-kw">&lt;script&gt;</span>&lt;%= htmlWebpackPlugin.options.templateParameters.themeInitScript %&gt;<span class="tok-kw">&lt;/script&gt;</span>`;

export const DOCS_SECTIONS: DocSectionDef[] = [
	{
		id: 'install',
		eyebrow: '01 · Install',
		title: framework => `One package for ${framework}`,
		description:
      'Every adapter wraps the same framework-agnostic core, so the install is always one package.',
		blocks: framework => [
			{
				kind: 'badges',
				items: [
					{
						label: 'npm',
						href: `https://www.npmjs.com/package/@brustack/${PACKAGE_SLUGS[framework]}`,
					},
					{
						label: 'bundle size ↗',
						href: `https://bundlephobia.com/package/@brustack/${PACKAGE_SLUGS[framework]}`,
					},
					{
						label: 'MIT License',
						href: `https://github.com/brustack/theme-transitions/blob/main/packages/${PACKAGE_DIRS[framework]}/LICENSE`,
					},
				],
			},
			{ kind: 'code', entries: installSnippets[framework] },
		],
	},
	{
		id: 'usage',
		eyebrow: '02 · Usage',
		title: 'The bare call',
		description:
      'No provider, no context, no config required to start. <code>toggleTheme</code> reads the click position automatically.',
		blocks: framework => [
			{ kind: 'code', entries: usageSnippets[framework] },
		],
	},
	{
		id: 'styling',
		eyebrow: '03 · Styling',
		title: 'The same CSS in every adapter',
		description:
      'Whichever theme is active gets applied as a class on <code>&lt;html&gt;</code>, so styling is plain CSS, no runtime style props to fight.',
		blocks: (framework) => {
			const blocks: DocBlock[] = [
				{ kind: 'subhead', text: 'CSS variables' },
				{
					kind: 'code',
					entries: [{ file: 'style.css', code: cssVariablesCode }],
				},
				{
					kind: 'callout',
					html: 'The class matches whatever <code>theme</code> resolves to, built-in or custom, so <code>html.nord</code> above is the same rule that lit up when you tried nord in the demo.',
				},
				{ kind: 'subhead', text: 'Tailwind' },
				{
					kind: 'paragraph',
					html: 'Set <code>darkMode: \'class\'</code> in your Tailwind config, then map your color tokens to the CSS variables above:',
				},
				{
					kind: 'code',
					entries: [{ file: 'tailwind.config.js', code: tailwindConfigCode }],
				},
			];

			if (framework === 'React' || framework === 'Next.js') {
				blocks.push(
					{ kind: 'subhead', text: 'Styled-components (or any CSS-in-JS)' },
					{
						kind: 'code',
						entries: [{ file: 'App.tsx', code: styledComponentsCode }],
					},
				);
			}

			return blocks;
		},
	},
	{
		id: 'configuration',
		eyebrow: '04 · Configuration',
		title: 'Effects, and themes beyond light/dark',
		description:
      'Optional. The first call in your app sets the shared default; every later call can override just itself.',
		blocks: () => [
			{
				kind: 'table',
				headers: ['Variant', 'duration', 'easing', 'direction'],
				headerTooltips: {
					direction:
            '<strong>Edges</strong>: left, right, up, down<br><strong>Center</strong>: center-x, center-y<br><strong>Corners</strong>: diagonal-tl, diagonal-tr, diagonal-bl, diagonal-br',
				},
				rows: [
					['<code>spread</code>', '<code>\'1s\'</code>', '-', '-'],
					[
						'<code>fade</code> <span class="muted">(default)</span>',
						'<code>\'400ms\'</code>',
						'<code>\'ease\'</code>',
						'-',
					],
					[
						'<code>wipe</code>',
						'<code>\'1s\'</code>',
						'<code>\'ease-out\'</code>',
						'<code>\'left\'</code>',
					],
					['<code>none</code>', '-', '-', '-'],
				],
			},
			{ kind: 'subhead', text: 'Custom themes' },
			{
				kind: 'paragraph',
				html: 'Register extra theme names beyond <code>light</code>/<code>dark</code>/<code>system</code> via <code>themes</code>:',
			},
			{
				kind: 'code',
				entries: [{ file: 'example', code: customThemesExampleCode }],
			},
			{
				kind: 'callout',
				html: '<code>setTheme(\'nord\')</code> then applies a <code>nord</code> class the same way <code>light</code>/<code>dark</code> do (see Styling above). That\'s exactly what the <code>nord</code> option in this demo is: a custom theme name, registered the same way you\'d register your own. <code>controller.getState().themes</code> always includes <code>[\'light\', \'dark\', \'system\', ...your custom names]</code>, useful for building a theme switcher. <code>toggleTheme()</code> is unaffected, it always flips between <code>light</code> and <code>dark</code>.',
			},
		],
	},
	{
		id: 'api',
		eyebrow: '05 · API',
		title: 'The shape every adapter returns',
		description:
      'React\'s hook, Vue\'s composable, Nuxt\'s auto-import, and Alpine\'s <code>x-data</code> all expose the same fields.',
		blocks: () => [
			{
				kind: 'table',
				rows: [
					[
						'<code>theme</code>',
						'Current resolved theme: <code>\'light\'</code>, <code>\'dark\'</code>, or a custom name',
					],
					[
						'<code>mode</code>',
						'Current preference, including <code>\'system\'</code>',
					],
					[
						'<code>isAnimating</code>',
						'<code>true</code> while a transition is running',
					],
					[
						'<code>themes</code>',
						'All registered names: <code>[\'light\',\'dark\',\'system\',...custom]</code>',
					],
					['<code>toggleTheme(event?)</code>', 'Switch between light and dark'],
					[
						'<code>setTheme(mode, event?)</code>',
						'Set a specific mode or custom theme',
					],
				],
			},
		],
	},
	{
		id: 'bundlers',
		eyebrow: '06 · Vite plugin & other bundlers',
		title: 'The anti-flash script, wired into your build',
		description:
      'Using Vite, register the plugin once. Anything else, the plugin is just a thin wrapper around two exported functions, call them directly.',
		blocks: () => [
			{
				kind: 'code',
				entries: [{ file: 'vite.config.ts', code: viteConfigCode }],
			},
			{
				kind: 'callout',
				html: 'Pass default effect options, e.g. <code>themeTransitions({ variant: \'spread\' })</code>, so every <code>getController()</code> call in the app picks them up without repeating them.',
			},
			{
				kind: 'code',
				spaced: true,
				entries: [
					{ file: 'webpack.config.js', code: webpackConfigCode },
					{ file: 'index.html', code: webpackTemplateCode },
				],
			},
			{
				kind: 'callout',
				html: 'Zero-build or CDN consumers can\'t call <code>buildColorModeInitScript()</code> themselves. The core package also ships <code>dist/theme-init.js</code>, a prebuilt copy of the same script, loadable with a plain <code>&lt;script src="...theme-init.js"&gt;</code> tag in <code>&lt;head&gt;</code>.',
			},
		],
	},
];
