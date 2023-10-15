import { useEffect } from 'react'
import { getBuilderStore, useBuilderStore } from '../store/useBuilderStore'

export function useSelectionTracker(ref) {
	const updateStates = useBuilderStore((s) => s.updateStates)

	useEffect(() => {
		const node = ref.current
		if (!node) return // If the node is not available, do nothing.

		let animationFrameId

		// Set editor coordinates.
		const editorRect = node.getBoundingClientRect()
		updateStates({
			editorX: editorRect.x,
			editorY: editorRect.y,
			editorWidth: editorRect.width,
			editorHeight: editorRect.height,
		})

		const handleMouseDown = (e) => {
			if (e.button !== 0) return // Only on left click

			if (e.target.classList.contains('venue-seat')) {
				const { rowId } = e.target.dataset
				const { hasSelection, draggedRows, selectedRows } = getBuilderStore((s) => {
					const selectedRows = !s.selectedRows.includes(rowId) ? [rowId] : s.selectedRows
					const hasSelection = selectedRows.includes(rowId)
					const draggedRows = []

					if (hasSelection) {
						s.rows.forEach((row, i) => {
							if (selectedRows.includes(row.id)) {
								draggedRows.push({
									rowIndex: i,
									x: row.editor.x,
									y: row.editor.y,
								})
							}
						})
					}

					return { hasSelection, draggedRows, selectedRows }
				})

				if (hasSelection) {
					updateStates({
						isDragging: true,
						draggedRows,
						selectedRows,
						startMouseX: e.clientX,
						startMouseY: e.clientY,
					})
					return // If the target is a seat, do nothing.
				}
			}

			updateStates({
				isDragging: false,
				draggedRows: [],
				isSelecting: true,
				startMouseX: e.clientX,
				startMouseY: e.clientY,
				selectedRows: [],
				selectedSeats: [],
			})
		}

		const handleMouseUp = (e) => {
			if (e.button !== 0) return // Only on left click

			updateStates({ isSelecting: false, isDragging: false, draggedRows: [] })
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}

		const handleMouseMove = (e) => {
			if (e.button !== 0) return // Only on left click

			animationFrameId = requestAnimationFrame(() => {
				updateStates({ endMouseX: e.clientX, endMouseY: e.clientY })
			})
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
	}, [])
}
