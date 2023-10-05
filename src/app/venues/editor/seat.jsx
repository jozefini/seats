import { cn } from '../../../utils/helpers'
import { useSelectedElement } from '../hooks/selected-element'

const css = {
	el: 'w-10 h-10 border rounded-md absolute top-10 left-10',
	elDefault: 'bg-gray-200 border-gray-300',
	elSelected: 'bg-red-500 border-red-600',
}

export function Seat() {
	const { ref, isSelected } = useSelectedElement('seat-1')

	return <div className={cn(css.el, isSelected ? css.elSelected : css.elDefault)} ref={ref} />
}
