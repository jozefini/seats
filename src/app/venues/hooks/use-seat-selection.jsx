import { useEffect, useRef } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useSeatSelection({ rowId, seatId, isDisabled }) {
	const ref = useRef(null)
	const { isSelected, select, unselect } = useBuilderStore((s) => ({
		isSelected: s.selectedRows.includes(rowId),
		select: s.select,
		unselect: s.unselect,
	}))
	const inSelection = useBuilderStore((s) => {
		if (!s.isSelecting) {
			return s.selectedRows.includes(rowId)
		}

		// Create coordinates for the selection box.
		const startMouseX = Math.min(s.startMouseX, s.endMouseX)
		const endMouseX = Math.max(s.startMouseX, s.endMouseX)
		const startMouseY = Math.min(s.startMouseY, s.endMouseY)
		const endMouseY = Math.max(s.startMouseY, s.endMouseY)

		// Create coordinates for the element.
		const el = ref.current
		const elRect = el.getBoundingClientRect()
		const elTop = elRect.top
		const elLeft = elRect.left
		const elRight = elRect.right
		const elBottom = elRect.bottom

		// Check if the element is in the selection box.
		return (
			startMouseX < elRight && endMouseX > elLeft && startMouseY < elBottom && endMouseY > elTop
		)
	})

	useEffect(() => {
		if (isDisabled) return

		if (inSelection) {
			select(rowId, seatId)
		} else {
			unselect(rowId, seatId)
		}
	}, [inSelection, seatId, isDisabled])

	return {
		ref,
		isSelected,
	}
}
