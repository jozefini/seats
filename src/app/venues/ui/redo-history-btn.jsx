import { useBuilderStore } from '../store/useBuilderStore'
import { classNames } from '../utils/helpers'

const css = {
	btn: 'inline-flex grow min-h-[2.125rem] items-center justify-center whitespace-nowrap rounded-md px-2.5 py-0.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white shadow',
	btnDisabled: 'opacity-30 pointer-events-none text-black/30',
	btnDefault: 'text-black/70 hover:text-black',
	icon: 'w-5 h-5',
}

export function RedoHistoryBtn() {
	const { redoChanges, canRedo } = useBuilderStore((s) => ({
		redoChanges: s.redoChanges,
		canRedo: s.historyIndex < s.history.length - 1,
	}))

	const handleRedo = () => {
		if (canRedo) {
			redoChanges()
		}
	}

	return (
		<button
			type='button'
			className={classNames(css.btn, canRedo ? css.btnDefault : css.btnDisabled)}
			onClick={handleRedo}
			disabled={!canRedo}
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
					d='M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3'
				/>
			</svg>
		</button>
	)
}
