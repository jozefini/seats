import { useEffect } from 'react'
import { getBuilderStore } from '../store/useBuilderStore'

export function useRowsDragging(ref) {
	/**
	 * Drag rows by mouse
	 */
	useEffect(() => {}, [])

	/**
	 * Move rows by keyboard arrows
	 *
	 * By default, it moves 1px, if shift is pressed, it moves 10px.
	 */
	useEffect(() => {
		// Add on arrow keys, move 1px, if shift is pressed, move 10px.
		const handleKeyDown = (e) => {
			if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return

			const { rows, selectedRows, updateStates } = getBuilderStore((s) => ({
				rows: s.rows,
				selectedRows: s.selectedRows,
				updateStates: s.updateStates,
			}))
			if (!selectedRows.length) {
				return // If no row is selected, do nothing.
			}

			e.preventDefault()

			let x = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
			let y = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0

			// Is shift key pressed?
			if (e.shiftKey) {
				x *= 10
				y *= 10
			}

			// Create a new array of rows with the updated positions.
			const newRows = rows.map((row) => {
				if (!selectedRows.includes(row.id)) {
					return row
				}
				return {
					...row,
					editor: {
						...row.editor,
						x: row.editor.x + x,
						y: row.editor.y + y,
					},
				}
			})
			updateStates({ rows: newRows })
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [getBuilderStore])
}
