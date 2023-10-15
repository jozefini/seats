import { useBuilderStore } from '../store/useBuilderStore'
import { OutlineBtn } from './outline-btn'

export function RedoHistoryBtn() {
	const { redoChanges, canRedo } = useBuilderStore((s) => ({
		redoChanges: s.redoChanges,
		canRedo: s.historyIndex < s.history.length - 1,
	}))

	return (
		<OutlineBtn onClick={redoChanges} isDisabled={!canRedo}>
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
					d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3'
				/>
			</svg>
		</OutlineBtn>
	)
}
