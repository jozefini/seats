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
			updateStates({
				isSelecting: true,
				startMouseX: e.clientX,
				startMouseY: e.clientY,
				selectedSeats: [],
				selectedRows: [],
			})
		}

		const handleMouseUp = (e) => {
			updateStates({ isSelecting: false })
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
		}

		const handleMouseMove = (e) => {
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
