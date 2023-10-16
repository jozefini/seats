import { useEffect, useRef } from 'react'
import { getBuilderStore, useBuilderStore } from '../store/useBuilderStore'

export function useSeatEditorActions({ rowId, seatId, isDisabled }) {
	const ref = useRef(null)

	/**
	 * Seat props.
	 */
	const isSelected = useBuilderStore((s) => s.selectedRows.includes(rowId))

	/**
	 * Selection.
	 */
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

	/**
	 * Selection.
	 */
	useEffect(() => {
		if (isDisabled) return

		const { select, unselect } = getBuilderStore()
		if (inSelection) {
			select(rowId, seatId)
		} else {
			unselect(rowId, seatId)
		}
	}, [inSelection, seatId, isDisabled, getBuilderStore])

	return {
		ref,
		isSelected,
	}
}
