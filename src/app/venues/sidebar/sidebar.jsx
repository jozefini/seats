import { useDictionary } from '../hooks/dictionary'
import { FieldGroup } from '../ui/field-group'
import { RowCurve } from './controls/row-curve'
import { SeatSize } from './controls/seat-size'
import { SpaceBetweenSeats } from './controls/space-between-seats'

const css = {
	wrapper: 'h-full w-full pr-8 py-6 flex flex-col gap-y-8',
}

export function Sidebar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<FieldGroup title={__('settings.seatHeadline')}>
				<SeatSize />
				<RowCurve />
				<SpaceBetweenSeats />
			</FieldGroup>
		</div>
	)
}
