import { MODES } from '../utils/contants'
import { useVenueStore } from '../store/use-venue-store'
import { useDictionary } from '../hooks/use-dictionary'
import { FieldGroup } from '../ui/field-group'
import { RowCurve } from '../ui/fields'
import { RowId } from '../ui/fields/row-id'
import { RowProvider } from '../context/row'
import { RowCoordinates } from './row-coordinates'

export function RowControls() {
	const { __ } = useDictionary()
	const { selectedRow, isAddRow } = useVenueStore((s) => ({
		selectedRow: s.selectedRows.length === 1 ? s.selectedRows[0] : null,
		isAddRow: s.mode === MODES.ADD_ROW,
	}))

	if (!selectedRow && !isAddRow) {
		return null
	}

	return (
		<RowProvider id={selectedRow}>
			{isAddRow && <RowCoordinates />}
			{!isAddRow && (
				<>
					<FieldGroup title={__('settings.rowSettings')}>
						<RowId />
						<RowCurve />
					</FieldGroup>
				</>
			)}
		</RowProvider>
	)
}
