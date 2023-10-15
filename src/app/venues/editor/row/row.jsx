import { RowProvider } from '../../context/selection'
import { useBuilderStore } from '../../store/useBuilderStore'
import { classNames } from '../../utils/helpers'
import { Seat } from './seat'

const css = {
	wrapper:
		'absolute left-0 top-0 text-[calc(var(--seat-size)/2)] translate-x-[var(--row-x)] translate-y-[var(--row-y)] pointer-events-none',
	seats: 'flex items-start gap-[var(--row-gap)]',
	seatsDefault: 'flex-row',
	seatsReversed: 'flex-row-reverse',
}

export function Row(props) {
	const { reversed, editor, seats } = props
	const { x, y } = editor
	const { seatSize, spaceBetweenSeats } = useBuilderStore((s) => ({
		seatSize: s.seatSize,
		spaceBetweenSeats: s.spaceBetweenSeats,
	}))

	return (
		<RowProvider {...props}>
			<div
				className={css.wrapper}
				style={{
					'--seat-size': `${seatSize / 16}rem`,
					'--row-gap': `${spaceBetweenSeats / 16}rem`,
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
