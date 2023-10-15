import { useEffect } from 'react'
import { getBuilderStore } from '../store/useBuilderStore'
import { CURSOR_TYPES } from '../utils/contants'

export function useEditorSelection(ref) {
	useEffect(() => {
		const node = ref.current
		if (!node) return // If the node is not available, do nothing.

		let animationFrameId
		const updateStates = getBuilderStore((s) => s.updateStates)

		// Set editor coordinates.
		const editorRect = node.getBoundingClientRect()
		updateStates({
			editorX: editorRect.x,
			editorY: editorRect.y,
			editorWidth: editorRect.width,
			editorHeight: editorRect.height,
		})

		const handleMouseDown = (e) => {
			if (e.button !== 0 || getBuilderStore((s) => s.cursor) !== CURSOR_TYPES.DEFAULT) {
				return // Only on left click and if the cursor is default
			}

			let newStates = {
				isSelecting: true,
				startMouseX: e.clientX,
				startMouseY: e.clientY,
				selectedRows: [],
				selectedSeats: [],
			}

			// If the target is a seat, select it.
			if (e.target.classList.contains('venue-seat')) {
				const { rowId } = e.target.dataset

				newStates.isSelecting = false
				newStates.selectedRows = getBuilderStore((s) =>
					!s.selectedRows.includes(rowId) ? [rowId] : s.selectedRows,
				)
			}

			updateStates(newStates)
		}

		const handleMouseMove = (e) => {
			if (e.button !== 0 || getBuilderStore((s) => s.cursor) !== CURSOR_TYPES.DEFAULT) {
				return // Only on left click and if the cursor is default
			}

			animationFrameId = requestAnimationFrame(() => {
				updateStates({ endMouseX: e.clientX, endMouseY: e.clientY })
			})
		}

		const handleMouseUp = (e) => {
			if (e.button !== 0 || getBuilderStore((s) => s.cursor) !== CURSOR_TYPES.DEFAULT) {
				return // Only on left click and if the cursor is default
			}

			updateStates({ isSelecting: false })
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}

		if (window && node) {
			node.addEventListener('mousedown', handleMouseDown)
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseleave', handleMouseUp)
			window.addEventListener('mouseup', handleMouseUp)
		}

		return () => {
			if (window && node) {
				node.removeEventListener('mousedown', handleMouseDown)
				window.removeEventListener('mousemove', handleMouseMove)
				window.removeEventListener('mouseleave', handleMouseUp)
				window.removeEventListener('mouseup', handleMouseUp)
			}

			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [ref, getBuilderStore])
}
