// TEMPORARY diagnostic instrumentation for investigating the mobile "spread"
// radius bug. Only active with ?debug=1 in the URL. Safe to delete once the
// root cause is confirmed.
export const installDebugOverlay = () => {
	if (!window.location.search.includes('debug=1')) return;

	const box = document.createElement('pre');
	box.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; z-index: 999999;
    background: rgba(0,0,0,0.9); color: #0f0; font-size: 11px;
    padding: 8px; margin: 0; white-space: pre-wrap; word-break: break-all;
    max-height: 45vh; overflow: auto; pointer-events: none;
  `;
	document.body.appendChild(box);

	const snapshot = (label: string, origin?: { x: number; y: number }) => {
		const vv = window.visualViewport;
		const width = Math.max(window.innerWidth, vv?.width ?? 0);
		const height = Math.max(window.innerHeight, vv?.height ?? 0);

		let radiusLine = '';
		if (origin) {
			const distance = Math.hypot(
				Math.max(origin.x, width - origin.x),
				Math.max(origin.y, height - origin.y),
			);
			radiusLine = `computed radius: ${Math.ceil(distance) + 8}px\norigin: (${origin.x}, ${origin.y})\n`;
		}

		return (
			`[${label}] ${new Date().toISOString().slice(11, 23)}\n`
			+ radiusLine
			+ `window.innerWidth/Height: ${window.innerWidth} / ${window.innerHeight}\n`
			+ `visualViewport w/h: ${vv?.width} / ${vv?.height}\n`
			+ `visualViewport offsetLeft/Top: ${vv?.offsetLeft} / ${vv?.offsetTop}\n`
			+ `visualViewport scale: ${vv?.scale}\n`
			+ `resolved width/height used: ${width} / ${height}\n`
			+ `devicePixelRatio: ${window.devicePixelRatio}\n`
			+ `scrollX/Y: ${window.scrollX} / ${window.scrollY}\n`
			+ `document.documentElement clientWidth/Height: ${document.documentElement.clientWidth} / ${document.documentElement.clientHeight}\n`
			+ `--------------------------------\n`
		);
	};

	document.addEventListener(
		'pointerdown',
		(event) => {
			const origin = { x: event.clientX, y: event.clientY };
			box.textContent = snapshot('tap', origin) + box.textContent;

			setTimeout(() => {
				box.textContent = snapshot('+50ms', origin) + box.textContent;
			}, 50);
			setTimeout(() => {
				box.textContent = snapshot('+300ms', origin) + box.textContent;
			}, 300);
			setTimeout(() => {
				box.textContent = snapshot('+1600ms (after animation)', origin) + box.textContent;
			}, 1600);
		},
		{ capture: true },
	);

	box.textContent = snapshot('page load');
};
