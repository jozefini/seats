import { useBuilderStore } from '../store/useBuilderStore'
import { classNames } from '../utils/helpers'

const css = {
	btn: 'inline-flex grow min-h-[2.125rem] items-center justify-center whitespace-nowrap rounded-md px-2.5 py-0.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white shadow',
	btnDisabled: 'opacity-30 pointer-events-none text-black/30',
	btnDefault: 'text-black/70 hover:text-black',
	icon: 'w-5 h-5',
}

export function UndoHistoryBtn() {
	const { undoChanges, canUndo } = useBuilderStore((s) => ({
		undoChanges: s.undoChanges,
		canUndo: s.history.length > 0 && s.historyIndex > 0,
	}))

	const handleUndo = () => {
		undoChanges()
	}

	return (
		<button
			type='button'
			className={classNames(css.btn, canUndo ? css.btnDefault : css.btnDisabled)}
			onClick={handleUndo}
			disabled={!canUndo}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={2.2}
				stroke='currentColor'
				className={css.icon}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3'
				/>
			</svg>
		</button>
	)
}
