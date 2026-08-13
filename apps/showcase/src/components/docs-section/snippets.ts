export const FRAMEWORKS = [
	'Vue',
	'React',
	'Next.js',
	'Nuxt',
	'Alpine',
	'Angular',
	'Vanilla',
] as const;

export type Framework = (typeof FRAMEWORKS)[number];

export const PACKAGE_SLUGS: Record<Framework, string> = {
	'Vue': 'vue-theme-transitions',
	'React': 'react-theme-transitions',
	'Next.js': 'next-theme-transitions',
	'Nuxt': 'nuxt-theme-transitions',
	'Alpine': 'alpine-theme-transitions',
	'Angular': 'angular-theme-transitions',
	'Vanilla': 'theme-transitions-core',
};

export const PACKAGE_DIRS: Record<Framework, string> = {
	'Vue': 'vue',
	'React': 'react',
	'Next.js': 'next',
	'Nuxt': 'nuxt',
	'Alpine': 'alpine',
	'Angular': 'angular',
	'Vanilla': 'core',
};

export interface CodeBlockData {
	file: string;
	code: string;
}

export const installSnippets: Record<Framework, CodeBlockData[]> = {
	'Vue': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/vue-theme-transitions</span>`,
		},
	],
	'React': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/react-theme-transitions</span>`,
		},
	],
	'Next.js': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/next-theme-transitions</span>`,
		},
	],
	'Nuxt': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/nuxt-theme-transitions</span>`,
		},
	],
	'Alpine': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/alpine-theme-transitions</span>`,
		},
	],
	'Angular': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/angular-theme-transitions</span>`,
		},
	],
	'Vanilla': [
		{
			file: 'terminal',
			code: `npm install <span class="tok-fn">@brustack/theme-transitions-core</span>`,
		},
	],
};

export const usageSnippets: Record<Framework, CodeBlockData[]> = {
	'Vue': [
		{
			file: 'src/components/ThemeToggle.vue',
			code: `<span class="tok-kw">&lt;script</span> setup lang=<span class="tok-str">"ts"</span><span class="tok-kw">&gt;</span>
<span class="tok-kw">import</span> { useThemeTransition } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/vue-theme-transitions'</span>;
<span class="tok-kw">import</span> <span class="tok-str">'@brustack/theme-transitions-core/style.css'</span>;

<span class="tok-kw">const</span> { theme, isAnimating, toggleTheme } = <span class="tok-fn">useThemeTransition</span>();
<span class="tok-kw">&lt;/script&gt;</span>

<span class="tok-kw">&lt;template&gt;</span>
  <span class="tok-kw">&lt;button</span> :disabled=<span class="tok-str">"isAnimating"</span> @click=<span class="tok-str">"toggleTheme"</span><span class="tok-kw">&gt;</span>
    {{ theme }}
  <span class="tok-kw">&lt;/button&gt;</span>
<span class="tok-kw">&lt;/template&gt;</span>`,
		},
	],
	'React': [
		{
			file: 'src/components/ThemeToggle.tsx',
			code: `<span class="tok-kw">import</span> { useThemeTransition } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/react-theme-transitions'</span>;
<span class="tok-kw">import</span> <span class="tok-str">'@brustack/theme-transitions-core/style.css'</span>;

<span class="tok-kw">export const</span> <span class="tok-fn">ThemeToggle</span> = () =&gt; {
  <span class="tok-kw">const</span> { theme, isAnimating, toggleTheme } = <span class="tok-fn">useThemeTransition</span>();

  <span class="tok-kw">return</span> (
    <span class="tok-kw">&lt;button</span> disabled={isAnimating} onClick={toggleTheme}<span class="tok-kw">&gt;</span>
      {theme}
    <span class="tok-kw">&lt;/button&gt;</span>
  );
};`,
		},
	],
	'Next.js': [
		{
			file: 'app/layout.tsx',
			code: `<span class="tok-kw">import</span> { ThemeScript } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/next-theme-transitions'</span>;
<span class="tok-kw">import</span> <span class="tok-str">'@brustack/theme-transitions-core/style.css'</span>;

<span class="tok-kw">export default function</span> <span class="tok-fn">RootLayout</span>({ children }) {
  <span class="tok-kw">return</span> (
    <span class="tok-kw">&lt;html</span> lang=<span class="tok-str">"en"</span> suppressHydrationWarning<span class="tok-kw">&gt;</span>
      <span class="tok-kw">&lt;head&gt;</span>
        <span class="tok-kw">&lt;ThemeScript</span> /<span class="tok-kw">&gt;</span>
      <span class="tok-kw">&lt;/head&gt;</span>
      <span class="tok-kw">&lt;body&gt;</span>{children}<span class="tok-kw">&lt;/body&gt;</span>
    <span class="tok-kw">&lt;/html&gt;</span>
  );
}`,
		},
		{
			file: 'app/components/theme-toggle.tsx',
			code: `<span class="tok-str">'use client'</span>;

<span class="tok-kw">import</span> { useThemeTransition } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/next-theme-transitions'</span>;

<span class="tok-kw">export const</span> <span class="tok-fn">ThemeToggle</span> = () =&gt; {
  <span class="tok-kw">const</span> { theme, isAnimating, toggleTheme } = <span class="tok-fn">useThemeTransition</span>();

  <span class="tok-kw">return</span> (
    <span class="tok-kw">&lt;button</span> disabled={isAnimating} onClick={toggleTheme}<span class="tok-kw">&gt;</span>
      {theme}
    <span class="tok-kw">&lt;/button&gt;</span>
  );
};`,
		},
	],
	'Nuxt': [
		{
			file: 'components/ThemeToggle.vue',
			code: `<span class="tok-kw">&lt;script</span> setup lang=<span class="tok-str">"ts"</span><span class="tok-kw">&gt;</span>
<span class="tok-com">// auto-imported, no import needed</span>
<span class="tok-kw">const</span> { theme, isAnimating, toggleTheme } = <span class="tok-fn">useThemeTransition</span>()
<span class="tok-kw">&lt;/script&gt;</span>

<span class="tok-kw">&lt;template&gt;</span>
  <span class="tok-kw">&lt;button</span> :disabled=<span class="tok-str">"isAnimating"</span> @click=<span class="tok-str">"toggleTheme"</span><span class="tok-kw">&gt;</span>
    {{ theme }}
  <span class="tok-kw">&lt;/button&gt;</span>
<span class="tok-kw">&lt;/template&gt;</span>`,
		},
	],
	'Alpine': [
		{
			file: 'index.html',
			code: `<span class="tok-kw">&lt;div</span> x-data=<span class="tok-str">"themeTransition()"</span><span class="tok-kw">&gt;</span>
  <span class="tok-kw">&lt;button</span> @click=<span class="tok-str">"toggleTheme"</span> x-text=<span class="tok-str">"theme"</span><span class="tok-kw">&gt;&lt;/button&gt;</span>
<span class="tok-kw">&lt;/div&gt;</span>`,
		},
	],
	'Angular': [
		{
			file: 'src/app/theme-toggle.component.ts',
			code: `<span class="tok-kw">import</span> { Component, inject } <span class="tok-kw">from</span> <span class="tok-str">'@angular/core'</span>;
<span class="tok-kw">import</span> { ThemeTransitionService } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/angular-theme-transitions'</span>;
<span class="tok-kw">import</span> <span class="tok-str">'@brustack/theme-transitions-core/style.css'</span>;

@<span class="tok-fn">Component</span>({
  selector: <span class="tok-str">'app-theme-toggle'</span>,
  standalone: <span class="tok-kw">true</span>,
  template: \`
    <span class="tok-kw">&lt;button</span> [disabled]=<span class="tok-str">"theme.isAnimating()"</span> (click)=<span class="tok-str">"theme.toggleTheme($event)"</span><span class="tok-kw">&gt;</span>
      {{ theme.theme() }}
    <span class="tok-kw">&lt;/button&gt;</span>
  \`,
})
<span class="tok-kw">export class</span> <span class="tok-fn">ThemeToggleComponent</span> {
  <span class="tok-kw">protected readonly</span> theme = <span class="tok-fn">inject</span>(ThemeTransitionService);
}`,
		},
	],
	'Vanilla': [
		{
			file: 'main.ts',
			code: `<span class="tok-kw">import</span> <span class="tok-str">'@brustack/theme-transitions-core/style.css'</span>;
<span class="tok-kw">import</span> { getController } <span class="tok-kw">from</span> <span class="tok-str">'@brustack/theme-transitions-core'</span>;

<span class="tok-kw">const</span> controller = <span class="tok-fn">getController</span>();
<span class="tok-kw">const</span> button = document.<span class="tok-fn">querySelector</span>(<span class="tok-str">'#theme-toggle'</span>);

button.<span class="tok-fn">addEventListener</span>(<span class="tok-str">'click'</span>, () =&gt; {
  controller.<span class="tok-fn">toggleTheme</span>();
});

controller.<span class="tok-fn">subscribe</span>(() =&gt; {
  <span class="tok-kw">const</span> { theme, isAnimating } = controller.<span class="tok-fn">getState</span>();
  button.textContent = theme;
  button.disabled = isAnimating;
});`,
		},
	],
};
