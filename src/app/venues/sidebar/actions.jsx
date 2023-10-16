import { useDictionary } from '../hooks/use-dictionary'
import { useBuilderStore } from '../store/useBuilderStore'
import { CURSOR_TYPES } from '../utils/contants'
import { classNames } from '../utils/helpers'

const css = {
	wrapper: 'flex items-center',
	btn: 'inline-flex items-center justify-center h-9 px-4 text-sm font-semibold rounded-lg',
	btnPrimary: 'bg-black text-white hover:bg-black/80',
	btnLink: 'text-black hover:text-black/80',
}

export function Actions() {
	const { isAddRow, updateStates } = useBuilderStore((s) => ({
		isAddRow: s.cursor === CURSOR_TYPES.ADD_ROW,
		updateStates: s.updateStates,
	}))
	const { __ } = useDictionary()

	const handleCreate = () => {
		updateStates({ cursor: CURSOR_TYPES.DEFAULT })
	}
	const handleCancel = () => {
		updateStates({ cursor: CURSOR_TYPES.DEFAULT })
	}

	if (!isAddRow) {
		return null
	}

	return (
		<div className={css.wrapper}>
			<button className={classNames(css.btn, css.btnPrimary)} type='button' onClick={handleCreate}>
				{__('actions.saveRow')}
			</button>
			<button className={classNames(css.btn, css.btnLink)} type='button' onClick={handleCancel}>
				{__('actions.cancel')}
			</button>
		</div>
	)
}