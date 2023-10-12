import { useSelectedElement } from '../hooks/selected-element'
import { useBuilderStore } from '../store/useBuilderStore'
import { classNames } from '../utils/helpers'

const css = {
	el: 'seat border rounded-full absolute',
	elDefault: 'bg-gray-200 border-gray-300',
	elSelected: 'bg-blue-300 border-blue-500 hover:cursor-move',
}

export function Seat({ left = '20px', top = '20px', id = 'seat-1' }) {
	const { ref, isSelected } = useSelectedElement(id)
	const size = useBuilderStore((s) => s.seatSize)

	return (
		<div
			className={classNames(css.el, isSelected ? css.elSelected : css.elDefault)}
			ref={ref}
			data-id={id}
			style={{ left, top, height: `${size}px`, width: `${size}px` }}
		/>
	)
}
