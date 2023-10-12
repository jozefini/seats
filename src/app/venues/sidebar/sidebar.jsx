import { useDictionary } from '../hooks/dictionary'
import { FieldGroup } from '../ui/field-group'
import { GridLayout } from './controls/grid-layout'
import { GridOpacity } from './controls/grid-opacity'
import { GridSize } from './controls/grid-size'
import { SeatSize } from './controls/seat-size'

const css = {
	wrapper: 'h-full w-full pr-8 py-6 flex flex-col gap-y-8',
}

export function Sidebar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<FieldGroup title={__('settings.seatHeadline')}>
				<SeatSize />
			</FieldGroup>

			<FieldGroup title={__('settings.gridHeadline')}>
				<GridLayout />
				<GridSize />
				<GridOpacity />
			</FieldGroup>
		</div>
	)
}
