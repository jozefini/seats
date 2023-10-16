import { RowProvider } from '../../context/selection'
import { useBuilderStore } from '../../store/useBuilderStore'
import { CURSOR_TYPES } from '../../utils/contants'
import { classNames } from '../../utils/helpers'
import { Seat } from './seat'

const css = {
	wrapper:
		'absolute left-0 top-0 text-[calc(var(--seat-size)/2)] transform-gpu translate-x-[var(--row-x)] translate-y-[var(--row-y)] pointer-events-none',
	wrapperSelected: 'z-10',
	seats: 'flex items-end gap-[var(--row-gap)]',
	seatsDefault: 'flex-row',
	seatsReversed: 'flex-row-reverse',
	rowConflict:
		'[&_.venue-seat]:!border-red-500/40 [&_.venue-seat]:!text-red-700 [&_.venue-seat]:!from-red-100',
}

export function Row(props) {
	const { reversed, editor, seats, id, conflict } = props
	const { x, y } = editor
	const { seatSize, spaceBetweenSeats, isSelected, isNewRow } = useBuilderStore((s) => ({
		isSelected: s.selectedRows.includes(id),
		seatSize: s.seatSize,
		spaceBetweenSeats: s.spaceBetweenSeats,
		isNewRow: s.cursor === CURSOR_TYPES.ADD_ROW,
	}))

	return (
		<RowProvider {...props}>
			<div
				className={classNames(
					css.wrapper,
					isSelected && css.wrapperSelected,
					isNewRow && conflict && css.rowConflict,
				)}
				style={{
					'--seat-size': `${seatSize}px`,
					'--row-gap': `${spaceBetweenSeats / 16}em`,
					'--row-x': `${x}px`,
					'--row-y': `${y}px`,
				}}
			>
				<div className={classNames(css.seats, reversed ? css.seatsReversed : css.seatsDefault)}>
					{seats.map((seat, index) => (
						<Seat key={seat.id} index={index} {...seat} />
					))}
				</div>
			</div>
		</RowProvider>
	)
}
