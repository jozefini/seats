import { useDictionary } from '../hooks/use-dictionary'
import { useBuilderStore } from '../store/useBuilderStore'
import { FieldGroup } from '../ui/field-group'
import { CURSOR_TYPES } from '../utils/contants'
import { SeatSize } from './controls/seat-size'
import { SpaceBetweenSeats } from './controls/space-between-seats'

export function GlobalControls() {
	const { __ } = useDictionary()
	const showControls = useBuilderStore(
		(s) => s.cursor === CURSOR_TYPES.DEFAULT && !s.selectedRows.length,
	)

	if (!showControls) {
		return null
	}

	return (
		<>
			<FieldGroup title={__('settings.generalSettings')}>
				<SeatSize />
				<SpaceBetweenSeats />
			</FieldGroup>
		</>
	)
}
