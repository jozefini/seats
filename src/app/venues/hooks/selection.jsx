import { useEffect, useRef } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'

export function useSelection() {
	const ref = useRef(null)
	const { isSelecting, updateStates } = useBuilderStore((s) => {
		return {
			isSelecting: s.isSelecting,
			updateStates: s.updateStates,
		}
	})

	useEffect(() => {
		const node = ref.current
		let animationFrameId

		const handleMouseDown = (e) => {
			if (e.button !== 0) return // Only on left click

			updateStates({
				isSelecting: true,
				startMouseX: e.clientX,
				startMouseY: e.clientY,
			})

			if (!e.target.classList.contains('seat')) {
				updateStates({
					selectedIds: [],
				})
			}
		}

		const handleMouseUp = (e) => {
			if (e.button !== 0) return // Only on left click

			updateStates({ isSelecting: false })
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

	return { ref, isSelecting }
}
