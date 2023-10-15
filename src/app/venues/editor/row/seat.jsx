import { useMemo } from 'react'
import { useSeatSelection } from '../../hooks/use-seat-selection'
import { useBuilderStore } from '../../store/useBuilderStore'
import { useRowContext } from '../../context/selection'
import { classNames, getCurveOffset } from '../../utils/helpers'

const css = {
	el: 'venue-seat border rounded-full inline-flex relative w-[var(--seat-size)] h-[var(--seat-size)] overflow-hidden mt-[var(--seat-offset)] select-none pointer-events-auto hover:cursor-grab active:cursor-grabbing',
	elDefault: 'bg-gray-200 border-gray-300 text-black/50',
	elSelected: 'bg-blue-300 border-blue-500 text-blue-500',
	emptySeat: 'invisible opacity-0 pointer-events-none',
	number: 'absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none',
}

export function Seat({ index, number, id, type }) {
	const { id: rowId, editor } = useRowContext()
	const { curve } = editor
	const { ref } = useSeatSelection({ rowId, seatId: id })
	const { isSelected, totalSeats } = useBuilderStore((s) => ({
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
				'empty' === type && css.emptySeat,
			)}
			style={{
				'--seat-offset': `${curveOffset / 16}em`,
			}}
		>
			<div className={css.number}>{number}</div>
		</div>
	)
}
