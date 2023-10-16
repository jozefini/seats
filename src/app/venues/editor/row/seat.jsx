import { useMemo } from 'react'
import { useSeatEditorActions } from '../../hooks/use-seat-editor-actions'
import { useVenueStore } from '../../store/use-venue-store'
import { useRowContext } from '../../context/row'
import { classNames, getCurveOffset } from '../../utils/helpers'
import { MODES } from '../../utils/contants'

const css = {
	el: 'venue-seat border rounded-full inline-flex relative w-[var(--seat-size)] h-[var(--seat-size)] overflow-hidden mb-[var(--seat-offset)] select-none pointer-events-auto',
	elDefault: 'bg-gradient-to-t from-gray-200 to-gray-100 border-gray-300 text-black/50',
	elSelected: 'bg-gradient-to-t from-blue-300 to-blue-200 border-blue-500 text-blue-500',
	elDraggable: 'hover:cursor-grab active:cursor-grabbing',
	emptySeat: 'invisible opacity-0 pointer-events-none',
	number: 'absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none',
}

export function Seat({ index, number, id, type }) {
	const { id: rowId, editor } = useRowContext()
	const { curve } = editor
	const { ref } = useSeatEditorActions({ rowId, seatId: id })
	const { isDraggable, isSelected, totalSeats } = useVenueStore((s) => ({
		isDraggable: s.mode === MODES.DEFAULT || s.selectedRows.includes(rowId),
		isSelected: s.selectedRows.includes(rowId),
		totalSeats: s.rows.find((row) => row.id === rowId).seats.length,
	}))

	const curveOffset = useMemo(() => {
		return getCurveOffset(index, totalSeats - 1, curve)
	}, [totalSeats, curve])

	return (
		<div
			ref={ref}
			data-seat-id={id}
			data-seat-type={type}
			data-row-id={rowId}
			className={classNames(
				css.el,
				isSelected ? css.elSelected : css.elDefault,
				isDraggable && css.elDraggable,
				'empty' === type && css.emptySeat,
			)}
			style={{
				'--seat-offset': `${curveOffset / 16}rem`,
			}}
		>
			<div className={css.number}>{number}</div>
		</div>
	)
}
