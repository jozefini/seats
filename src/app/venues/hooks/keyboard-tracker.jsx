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
}
