import { RowProvider } from '../../context/selection'
import { useBuilderStore } from '../../store/useBuilderStore'
import { Seat } from './seat'

const css = {
	wrapper: 'flex items-center',
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
					fontSize: `${seatSize / 16}rem`,
					transform: `translate(${x}%, ${y}%)`,
					flexDirection: reversed ? 'row-reverse' : 'row',
					gap: `${spaceBetweenSeats}em`,
				}}
			>
				{seats.map((seat) => (
					<Seat key={seat.id} {...seat} />
				))}
			</div>
		</RowProvider>
	)
}
