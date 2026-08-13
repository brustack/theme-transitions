import { createRequire } from 'node:module';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const source = require.resolve('@brustack/theme-transitions-core/theme-init.js');

const publicDir = fileURLToPath(new URL('../public', import.meta.url));
mkdirSync(publicDir, { recursive: true });
copyFileSync(source, join(publicDir, 'theme-init.js'));
