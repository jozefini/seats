import { CreateRowBtn } from './create-row-btn'
import { RedoHistoryBtn } from './redo-history-btn'
import { UndoHistoryBtn } from './undo-history-btn'
import { VenueTitle } from './venue-title'

const css = {
	wrapper:
		'w-full bg-gray-50 rounded-[inherit] flex flex-col items-start justify-between space-y-2 py-4 px-8 sm:flex-row sm:items-center sm:space-y-0 md:h-16',
	form: '',
	leftSide: 'flex items-center gap-x-5',
	actions: 'flex items-center gap-x-4',
	historyNav: 'flex items-center gap-x-1 rtl:flex-row-reverse',
}

export function Topbar() {
	return (
		<div className={css.wrapper}>
			<div className={css.leftSide}>
				<VenueTitle />
			</div>
			<div className={css.actions}>
				<CreateRowBtn />
				<div className={css.historyNav}>
					<UndoHistoryBtn />
					<RedoHistoryBtn />
				</div>
			</div>
		</div>
	)
}
