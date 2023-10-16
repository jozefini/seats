import { MODES } from '../utils/contants'
import { getVenueStore } from '../store/use-venue-store'
import { useDictionary } from '../hooks/use-dictionary'
import { OutlineBtn } from '../ui/buttons'

export function CreateRowBtn() {
	const { __ } = useDictionary()

	const handleCreateRow = () => {
		const { isAddRow, updateStates, secondRow } = getVenueStore((s) => ({
			isAddRow: s.mode === MODES.ADD_ROW,
			updateStates: s.updateStates,
			secondRow: s.rows[1].id,
		}))
		if (isAddRow) {
			return
		}

		updateStates({
			mode: MODES.ADD_ROW,
			selectedRows: [secondRow],
			selectedSeats: [],
		})
	}

	return (
		<OutlineBtn onClick={handleCreateRow}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={2.2}
				stroke='currentColor'
			>
				<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
			</svg>

			<span>{__('actions.addRow')}</span>
		</OutlineBtn>
	)
}
