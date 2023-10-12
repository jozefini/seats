import { useEffect } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useDraggingTracker() {
	const dragSelectedRows = useBuilderStore((s) => s.dragSelectedRows)
	const { x, y } = useBuilderStore((s) => {
		if (!s.isDragging) {
			return { x: 0, y: 0 }
		}

		const x = s.endMouseX - s.startMouseX
		const y = s.endMouseY - s.startMouseY

		return { x, y }
	})

	useEffect(() => {
		if (!x && !y) return
		dragSelectedRows(x, y)
	}, [x, y])
}
