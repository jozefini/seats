import { useBuilderStore } from '../store/useBuilderStore'
import { createPortal } from 'react-dom'

const css = {
	selection: 'border border-blue-500 bg-blue-200 opacity-50 fixed',
}

export function Selection() {
	const { isSelecting, styles } = useBuilderStore((s) => {
		if (!s.isSelecting) {
			return { isSelecting: false }
		}

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
			isSelecting: true,
			styles: {
				top,
				left,
				width,
				height,
			},
		}
	})

	if (!isSelecting) {
		return null
	}

	return (
		<div
			className={css.selection}
			style={{
				...styles,
			}}
		/>
	)
}
