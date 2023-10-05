import { useBuilderStore } from '../store/useBuilderStore'

const css = {
	selection: 'border border-blue-500 bg-blue-200 opacity-50 fixed',
}

export function Selection() {
	const styles = useBuilderStore((s) => {
		let top = s.startMouseY
		let height = s.endMouseY - s.startMouseY
		let left = s.startMouseX
		let width = s.endMouseX - s.startMouseX

		if (s.endMouseY < s.startMouseY) {
			top = s.endMouseY
			height = s.startMouseY - s.endMouseY
		}

		if (s.endMouseX < s.startMouseX) {
			left = s.endMouseX
			width = s.startMouseX - s.endMouseX
		}

		return {
			top,
			left,
			width: `${Math.abs(width)}px`,
			height: `${Math.abs(height)}px`,
		}
	})

	return <div className={css.selection} style={styles} />
}
