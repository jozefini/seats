import { useEffect } from 'react'
import { getVenueStore } from '../store/use-venue-store'
import { MODES } from '../utils/contants'
import { createRow } from '../utils/helpers'

export function useEditorSelection(ref) {
	useEffect(() => {
		const updateStates = getVenueStore((s) => s.updateStates)
		const updateEditorRect = () => {
			const node = ref.current
			if (!node) return // If the node is not available, do nothing.

			// Set editor coordinates.
			const editorRect = node.getBoundingClientRect()
			updateStates({
				editorX: editorRect.x,
				editorY: editorRect.y,
				editorWidth: editorRect.width,
				editorHeight: editorRect.height,
			})
		}

		updateEditorRect() // Set the initial editor coordinates.
		window.addEventListener('resize', updateEditorRect)
		return () => {
			window.removeEventListener('resize', updateEditorRect)
		}
	}, [ref, getVenueStore])

	useEffect(() => {
		const node = ref.current
		if (!node) return // If the node is not available, do nothing.

		let animationFrameId
		const updateStates = getVenueStore((s) => s.updateStates)

		const handleMouseDown = (e) => {
			const { mode, rows, selectedRows, editorX, editorY } = getVenueStore((s) => ({
				mode: s.mode,
				rows: s.rows,
				editorX: s.editorX,
				editorY: s.editorY,
				selectedRows: s.selectedRows,
			}))

			if (e.button !== 0) {
				return // Only on left click
			}

			if (mode === MODES.ADD_ROW) {
				if (selectedRows.length > 0) {
					return // If there is a selected row, do nothing.
				}

				// Create a new row.
				const createdRow = createRow(e.clientX - editorX, e.clientY - editorY)
				updateStates({
					rows: [...rows, createdRow],
					selectedRows: [createdRow.id],
				})
				return // Do nothing after creating a new row.
			}

			if (mode !== MODES.DEFAULT) {
				return // If the mode is not default, do nothing.
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
				newStates.selectedRows = getVenueStore((s) =>
					!s.selectedRows.includes(rowId) ? [rowId] : s.selectedRows,
				)
			}

			updateStates(newStates)
		}

		const handleMouseMove = (e) => {
			if (e.button !== 0 || getVenueStore((s) => s.mode) !== MODES.DEFAULT) {
				return // Only on left click and if the mode is default
			}

			animationFrameId = requestAnimationFrame(() => {
				updateStates({ endMouseX: e.clientX, endMouseY: e.clientY })
			})
		}

		const handleMouseUp = (e) => {
			if (e.button !== 0 || getVenueStore((s) => s.mode) !== MODES.DEFAULT) {
				return // Only on left click and if the mode is default
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
	}, [ref, getVenueStore])
}
