import { useDictionary } from '../hooks/dictionary'
import { CreateRowBtn } from '../ui/create-row-btn'
import { RedoHistoryBtn } from '../ui/redo-history-btn'
import { UndoHistoryBtn } from '../ui/undo-history-btn'

const css = {
	wrapper:
		'w-full bg-gray-50 rounded-[inherit] flex flex-col items-start justify-between space-y-2 py-4 px-8 sm:flex-row sm:items-center sm:space-y-0 md:h-16',
	title: 'text-lg font-semibold',
	form: '',
	leftSide: 'flex items-center gap-x-5',
	actions: 'flex items-center gap-x-2',
}

export function Topbar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<div className={css.leftSide}>
				<h1 className={css.title}>{__('topbar.headline')}</h1>
				<div className={css.actions}>
					<UndoHistoryBtn />
					<RedoHistoryBtn />
					<CreateRowBtn />
				</div>
			</div>
		</div>
	)
}
