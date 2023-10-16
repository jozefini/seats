import { MODES } from '../utils/contants'
import { useVenueStore } from '../store/use-venue-store'
import { useDictionary } from '../hooks/use-dictionary'
import { FieldGroup } from '../ui/field-group'
import { SeatSize, SpaceBetweenSeats } from '../ui/fields'

export function GlobalControls() {
	const { __ } = useDictionary()
	const showControls = useVenueStore((s) => s.mode === MODES.DEFAULT && !s.selectedRows.length)

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
