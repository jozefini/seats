import { useVenueStore } from '../store/use-venue-store'
import { OutlineBtn } from '../ui/buttons'

export function UndoHistoryBtn() {
	const { undoChanges, canUndo } = useVenueStore((s) => ({
		undoChanges: s.undoChanges,
		canUndo: s.historyIndex > 0,
	}))

	return (
		<OutlineBtn onClick={undoChanges} isDisabled={!canUndo}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={2.2}
				stroke='currentColor'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
				/>
			</svg>
		</OutlineBtn>
	)
}
