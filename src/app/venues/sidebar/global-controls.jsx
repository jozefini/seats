import { useDictionary } from '../hooks/use-dictionary'
import { useBuilderStore } from '../store/useBuilderStore'
import { FieldGroup } from '../ui/field-group'
import { CURSOR_TYPES } from '../utils/contants'
import { RowCurve } from './controls/row-curve'
import { SeatSize } from './controls/seat-size'
import { SpaceBetweenSeats } from './controls/space-between-seats'

export function GlobalControls() {
	const showControls = useBuilderStore(
		(s) => s.cursor === CURSOR_TYPES.DEFAULT && !s.selectedRows.length,
	)
	const { __ } = useDictionary()

	if (!showControls) {
		return null
	}

	return (
		<>
			<FieldGroup title={__('settings.seatHeadline')}>
				<SeatSize />
				<RowCurve />
				<SpaceBetweenSeats />
			</FieldGroup>
		</>
	)
}
