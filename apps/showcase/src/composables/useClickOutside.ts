import { onMounted, onUnmounted, type Ref } from 'vue';

export function useClickOutside(
	target: Ref<HTMLElement | null>,
	onOutsideClick: () => void,
) {
	const handleClick = (event: MouseEvent) => {
		const el = target.value;
		if (!el || el.contains(event.target as Node)) return;
		onOutsideClick();
	};

	onMounted(() => document.addEventListener('click', handleClick, true));
	onUnmounted(() => document.removeEventListener('click', handleClick, true));
}
