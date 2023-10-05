import { useEffect, useRef } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useSelectedElement(id) {
	const ref = useRef(null)
	const { isSelected, isSelecting, selectElement, unselectElement } = useBuilderStore((s) => {
		const selectElement = s.selectElement
		const unselectElement = s.unselectElement
		const isSelecting = s.isSelecting

		if (!isSelecting) {
			return {
				isSelected: s.selectedIds.includes(id),
				isSelecting,
				selectElement,
				unselectElement,
			}
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

		return {
			isSelected: isOverEl,
			isSelecting,
			selectElement,
			unselectElement,
		}
	})

	useEffect(() => {
		if (!isSelecting) return
		isSelected ? selectElement(id) : unselectElement(id)
	}, [isSelected])

	return {
		ref,
		isSelected,
	}
}
