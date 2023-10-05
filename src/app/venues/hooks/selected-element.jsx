import { useRef } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'
import { SELECTION_TYPES } from '../utils/contants'

export function useSelectedElement(id) {
	const ref = useRef(null)
	const isSelected = useBuilderStore((s) => {
		const selectedList = s.selectionType === SELECTION_TYPES.ROW ? s.selectedRows : s.selectedSeats
		let isAlreadySelected = selectedList.includes(id)
		if (isAlreadySelected) {
			return true
		}
		if (!s.isSelecting) {
			return false
		}

		const startMouseX = Math.min(s.startMouseX, s.endMouseX)
		const endMouseX = Math.max(s.startMouseX, s.endMouseX)
		const startMouseY = Math.min(s.startMouseY, s.endMouseY)
		const endMouseY = Math.max(s.startMouseY, s.endMouseY)

		const el = ref.current
		const elRect = el.getBoundingClientRect()
		const elTop = elRect.top
		const elLeft = elRect.left
		const elRight = elRect.right
		const elBottom = elRect.bottom

		const isOverEl =
			startMouseX < elRight && endMouseX > elLeft && startMouseY < elBottom && endMouseY > elTop

		if (isOverEl && !isAlreadySelected) {
			s.selectElement(id)
		}
		return isOverEl
	})

	return {
		ref,
		isSelected,
	}
}
