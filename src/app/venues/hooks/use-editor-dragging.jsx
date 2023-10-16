import { useEffect } from 'react'
import { getBuilderStore, useBuilderStore } from '../store/useBuilderStore'
import { getUpdatedRowsCoords } from '../utils/helpers'
import { CURSOR_TYPES } from '../utils/contants'

export function useEditorDragging(ref) {
	/**
	 * Drag rows by mouse
	 */
	useEffect(() => {
		const node = ref.current
		const { updateStates, addSnapshot } = getBuilderStore((s) => ({
			updateStates: s.updateStates,
			addSnapshot: s.addSnapshot,
		}))
		let animationFrameId
		let currentX = 0
		let currentY = 0

		const handleDragStart = (e) => {
			const selectedRows = getBuilderStore((s) => {
				const isSeat = e.target.classList.contains('venue-seat')
				const { rowId = null } = isSeat ? e.target.dataset : {}

				if (!rowId) {
					return [] // If the target is not a seat, do nothing.
				}

				switch (s.cursor) {
					case CURSOR_TYPES.DEFAULT:
						// If the cursor is default, drag the selected rows or the clicked row.
						return !s.selectedRows.includes(rowId) ? [rowId] : s.selectedRows
					case CURSOR_TYPES.ADD_ROW:
						// If the cursor is add row, drag the selected row.
						return s.selectedRows.includes(rowId) ? [rowId] : []
					default:
						return []
				}
			})

			if (e.button !== 0 || !selectedRows.length) {
				return // Only on left click and if the target is a seat
			}

			// Set the start mouse position
			currentX = e.clientX
			currentY = e.clientY

			updateStates({ isDragging: true, selectedRows })
		}

		const handleDragMove = (e) => {
			const isDragging = getBuilderStore((s) => s.isDragging && s.selectedRows.length)
			if (e.button !== 0 || !isDragging) {
				return // Only on left click and if the target is a seat
			}

			animationFrameId = requestAnimationFrame(() => {
				const deltaX = e.clientX - currentX
				const deltaY = e.clientY - currentY

				currentX = e.clientX
				currentY = e.clientY

				updateStates({ rows: getUpdatedRowsCoords(deltaX, deltaY) })
			})
		}

		const handleDragEnd = (e) => {
			const isDragging = getBuilderStore((s) => s.isDragging && s.selectedRows.length)
			if (e.button !== 0 || !isDragging) {
				return // Only on left click and if the target is a seat
			}

			addSnapshot() // Add a snapshot to the history
			updateStates({ isDragging: false })

			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}

		if (window && node) {
			node.addEventListener('mousedown', handleDragStart)
			window.addEventListener('mousemove', handleDragMove)
			window.addEventListener('mouseleave', handleDragEnd)
			window.addEventListener('mouseup', handleDragEnd)
		}

		return () => {
			if (window && node) {
				node.removeEventListener('mousedown', handleDragStart)
				window.removeEventListener('mousemove', handleDragMove)
				window.removeEventListener('mouseleave', handleDragEnd)
				window.removeEventListener('mouseup', handleDragEnd)
			}

			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [getBuilderStore])

	/**
	 * Move rows by keyboard arrows
	 *
	 * By default, it moves 1px, if shift is pressed, it moves 10px.
	 */
	useEffect(() => {
		// Add on arrow keys, move 1px, if shift is pressed, move 10px.
		const handleKeyDown = (e) => {
			const { selectedRows, updateStates } = getBuilderStore((s) => ({
				selectedRows: s.selectedRows,
				updateStates: s.updateStates,
			}))
			if (
				!selectedRows.length ||
				!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)
			) {
				return // Only if the cursor is default and if the key is an arrow key.
			}

			e.preventDefault()

			let deltaX = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
			let deltaY = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0

			// Is shift key pressed?
			if (e.shiftKey) {
				deltaX *= 10
				deltaY *= 10
			}

			updateStates({ rows: getUpdatedRowsCoords(deltaX, deltaY) })
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [getBuilderStore, getUpdatedRowsCoords])
}
