import { useSelectedElement } from '../../hooks/selected-element'
import { useBuilderStore } from '../../store/useBuilderStore'
import { classNames, getCurveOffset } from '../../utils/helpers'
import { useRowContext } from '../../context/selection'
import { useMemo } from 'react'

const css = {
	el: 'venue-seat border rounded-full inline-flex relative w-[var(--seat-size)] overflow-hidden select-none',
	elDefault: 'bg-gray-200 border-gray-300 text-black/50',
	elSelected: 'bg-blue-300 border-blue-500 text-blue-500 hover:cursor-move',
	square: 'pb-[100%]',
	emptySeat: 'invisible opacity-0 pointer-events-none',
	number:
		'absolute inset-0 w-full h-full flex items-center justify-center text-[calc(var(--seat-size)*20)]',
}

export function Seat({ index, number, id, type }) {
	const { id: rowId } = useRowContext()
	const { ref } = useSelectedElement({ rowId, seatId: id })
	const { isSelected, totalSeats } = useBuilderStore((s) => ({
		isSelected: s.selectedRows.includes(rowId),
		totalSeats: s.rows.find((row) => row.id === rowId).seats.length,
	}))

	const curveOffset = useMemo(() => {
		if ('empty' === type) {
			return 0 // No curve offset for empty seats.
		}
		return getCurveOffset(index, totalSeats - 1, 120)
	}, [totalSeats])

	return (
		<div
			ref={ref}
			data-seat-id={id}
			data-seat-type={type}
			data-row-id={rowId}
			className={classNames(
				css.el,
				isSelected ? css.elSelected : css.elDefault,
				'empty' === type && css.emptySeat,
			)}
			style={{
				transform: `translateY(${curveOffset}%)`,
			}}
		>
			<div className={css.square} />
			<div className={css.number}>{number}</div>
		</div>
	)
}
