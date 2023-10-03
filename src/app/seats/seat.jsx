import { Checkmark } from './checkmark'
import { Tooltip } from './tooltip'
import { cn } from '@utils/helpers'
import { useSeats } from './use-seats'

const css = {
	seat: 'in-flex centered sq-10 border-2 fw-700 text-xs rounded-full relative group',
	reserved: 'bg-gray-200 border-gray-300 text-gray-600',
	default: 'bg-green-600 border-green-700 text-white hover:bg-green-500 hover:border-green-600',
	selected: 'bg-red-600 border-red-700 text-white hover:bg-red-500 hover:border-red-600',
	checkmark: 'sq-5',
}

export function Seat({ id, row, name, price, reserved }) {
	const { isSelected, selectSeat } = useSeats({ id, row, name, price })
	const handleClick = () => {
		if (!reserved) {
			selectSeat()
		}
	}

	return (
		<button
			type='button'
			className={cn(css.seat, reserved ? css.reserved : isSelected ? css.selected : css.default)}
			onClick={handleClick}
			disabled={reserved}
		>
			{isSelected ? <Checkmark className={css.checkmark} /> : <span>{name}</span>}
			{!reserved && (
				<Tooltip>
					{isSelected ? (
						<>Remove {name} reservation</>
					) : (
						<>
							Reserve {name} for ${price}
						</>
					)}
				</Tooltip>
			)}
		</button>
	)
}
