import { onMounted, onUnmounted, ref } from 'vue';

export function useScrollSpy(sectionIds: string[], fallbackSelector?: string) {
	const activeId = ref<string | null>(null);
	let ticking = false;

	const update = () => {
		ticking = false;
		const referenceY = window.innerHeight * 0.5;
		let current: HTMLElement | null = null;

		for (const id of sectionIds) {
			const el = document.getElementById(id);
			if (!el) continue;
			if (el.getBoundingClientRect().top <= referenceY) {
				current = el;
			}
			else {
				break;
			}
		}

		if (!current && fallbackSelector) {
			const fallbackEl = document.querySelector(fallbackSelector);
			if (fallbackEl && fallbackEl.getBoundingClientRect().bottom <= referenceY) {
				current = document.getElementById(sectionIds[0]);
			}
		}

		activeId.value = current?.id ?? null;
	};

	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(update);
	};

	onMounted(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		update();
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', onScroll);
	});

	return { activeId };
}
