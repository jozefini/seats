import { useDictionary } from '../hooks/use-dictionary'
import { useVenueStore } from '../store/use-venue-store'
import { MODES } from '../utils/contants'
import { classNames } from '../utils/helpers'

const css = {
	wrapper: 'flex items-center',
	btn: 'inline-flex items-center justify-center h-9 px-4 text-sm font-semibold rounded-lg disabled:bg-black/20 disabled:pointer-events-none',
	btnPrimary: 'bg-black text-white hover:bg-black/80',
	btnLink: 'text-black hover:text-black/80',
}

export function Actions() {
	const { isAddRow, selectedRow, updateStates } = useVenueStore((s) => ({
		selectedRow: s.selectedRows.length === 1 ? s.selectedRows[0] : null,
		isAddRow: s.mode === MODES.ADD_ROW,
		updateStates: s.updateStates,
	}))
	const { __ } = useDictionary()

	const handleCreate = () => {
		updateStates({ mode: MODES.DEFAULT })
	}
	const handleCancel = () => {
		updateStates({ mode: MODES.DEFAULT })
	}

	if (!isAddRow) {
		return null
	}

	return (
		<div className={css.wrapper}>
			<button
				className={classNames(css.btn, css.btnPrimary)}
				type='button'
				onClick={handleCreate}
				disabled={!selectedRow}
			>
				{__('actions.saveRow')}
			</button>
			<button className={classNames(css.btn, css.btnLink)} type='button' onClick={handleCancel}>
				{__('actions.cancel')}
			</button>
		</div>
	)
}
