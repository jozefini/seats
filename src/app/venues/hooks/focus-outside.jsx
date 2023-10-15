import { useEffect } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useFocusOutside(ref) {
	const updateStates = useBuilderStore((s) => s.updateStates)

	useEffect(() => {
		function handleBlur(event) {
			// Check if the next focused element is not inside the ref
			if (ref.current && !ref.current.contains(event.relatedTarget)) {
				updateStates({ isEditorFocused: false })
			}
		}

		// Add event listener
		document.addEventListener('blur', handleBlur, true)

		// Clean up on unmount
		return () => {
			document.removeEventListener('blur', handleBlur, true)
		}
	}, [ref]) // Re-run if ref or callback changes
}
