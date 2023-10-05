import { useSelectedElement } from '../hooks/selected-element'
import { classNames } from '../utils/helpers'

const css = {
	el: 'seat w-8 h-8 border rounded-full absolute',
	elDefault: 'bg-gray-200 border-gray-300',
	elSelected: 'bg-blue-300 border-blue-500 hover:cursor-move',
}

export function Seat({ left = '20px', top = '20px', id = 'seat-1' }) {
	const { ref, isSelected } = useSelectedElement(id)

	return (
		<div
			className={classNames(css.el, isSelected ? css.elSelected : css.elDefault)}
			ref={ref}
			style={{ left, top }}
		/>
	)
}
