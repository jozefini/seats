import { MODES } from '../utils/contants'
import { useVenueStore } from '../store/use-venue-store'
import { useDictionary } from '../hooks/use-dictionary'
import { FieldGroup } from '../ui/field-group'
import { RowCurve } from '../ui/fields'
import { RowId } from '../ui/fields/row-id'

export function RowControls() {
	const { __ } = useDictionary()
	const showControls = useVenueStore((s) => s.selectedRows.length || s.mode === MODES.ADD_ROW)

	if (!showControls) {
		return null
	}

	return (
		<>
			<FieldGroup title={__('settings.rowSettings')}>
				<RowId />
				<RowCurve />
			</FieldGroup>
		</>
	)
}
