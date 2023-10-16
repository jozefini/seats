import { useEffect } from 'react'
import { useVenueStore } from '../store/use-venue-store'

export function useMouseTracker(ref) {
	const updateStates = useVenueStore((s) => s.updateStates)

	useEffect(() => {
		const node = ref.current
		if (!node) return // If the node is not available, do nothing.

		let animationFrameId

		const handleMouseMove = (e) => {
			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId)
			}

			animationFrameId = window.requestAnimationFrame(() => {
				updateStates({
					mouseX: e.clientX,
					mouseY: e.clientY,
				})
			})
		}

		const handleMouseEnter = () => {
			node.addEventListener('mousemove', handleMouseMove)
		}
		const handleMouseLeave = () => {
			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId)
			}
			node.removeEventListener('mousemove', handleMouseMove)
		}

		node.addEventListener('mouseenter', handleMouseEnter)
		node.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			if (animationFrameId) {
				window.cancelAnimationFrame(animationFrameId)
			}
			node.removeEventListener('mouseenter', handleMouseEnter)
			node.removeEventListener('mouseleave', handleMouseLeave)
			node.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])
}
