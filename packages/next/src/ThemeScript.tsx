import * as React from 'react';
import {
	buildColorModeInitScript,
	buildConfigInitScript,
} from '@brustack/theme-transitions-core';
import type { ThemeOptions } from '@brustack/theme-transitions-core';

export const ThemeScript = (options: ThemeOptions = {}) => {
	const hasOptions = Object.keys(options).length > 0;
	const children = hasOptions
		? `${buildConfigInitScript(options)}\n${buildColorModeInitScript()}`
		: buildColorModeInitScript();

	return <script dangerouslySetInnerHTML={{ __html: children }} />;
};
