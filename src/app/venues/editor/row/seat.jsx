import { useSelectedElement } from '../../hooks/selected-element'
import { useBuilderStore } from '../../store/useBuilderStore'
import { classNames } from '../../utils/helpers'
import { useRowContext } from '../../context/selection'

const css = {
	el: 'venue-seat border rounded-full inline-flex',
	elDefault: 'bg-gray-200 border-gray-300',
	elSelected: 'bg-blue-300 border-blue-500 hover:cursor-move',
	square: 'pb-[100%]',
}

export function Seat() {
	const { id: rowId } = useRowContext()
	const { ref } = useSelectedElement(rowId)
	const { size, isSelected } = useBuilderStore((s) => ({
		size: s.seatSize,
		isSelected: s.selectedIds.includes(rowId),
	}))

	return (
		<div
			ref={ref}
			data-row-id={rowId}
			className={classNames(css.el, isSelected ? css.elSelected : css.elDefault)}
			style={{ width: `${size}%` }}
		>
			<div className={css.square} />
		</div>
	)
}
