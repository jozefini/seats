import { useEffect } from 'react'
import { getBuilderStore } from '../store/useBuilderStore'

export function useKeyboardTracker(ref) {
	useEffect(() => {
		const node = ref.current
		if (!node) return // If the node is not available, do nothing.
		const updateStates = getBuilderStore((s) => s.updateStates)

		const enableFocus = (e) => {
			if (e.target === node || node.contains(e.target)) {
				updateStates({ isEditorFocused: true })
			}
		}
		const disableFocus = (e) => {
			if (e.target === node || node.contains(e.target)) {
				updateStates({ isEditorFocused: false })
			}
		}

		window.addEventListener('focusin', enableFocus)
		window.addEventListener('focusout', disableFocus)

		return () => {
			window.removeEventListener('focusin', enableFocus)
			window.removeEventListener('focusout', disableFocus)
		}
	}, [ref])

	useEffect(() => {
		const moveRows = getBuilderStore((s) => s.moveSelectedRows)

		// Add on arrow keys, move 1px, if shift is pressed, move 10px.
		const handleKeyDown = (e) => {
			if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return

			e.preventDefault()

			let x = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
			let y = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0

			// Is shift key pressed?
			if (e.shiftKey) {
				x *= 10
				y *= 10
			}

			moveRows(x, y)
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])
}
