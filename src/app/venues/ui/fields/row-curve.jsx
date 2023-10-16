import { useVenueStore } from '../../store/use-venue-store'
import { useRowContext } from '../../context/row'
import { useDictionary } from '../../hooks/use-dictionary'
import { RangeSlider } from '../controls'
import { Field } from '../field'

export function RowCurve() {
	const { __ } = useDictionary()
	const { id: rowId } = useRowContext()
	const { isSelected, curveSize, updateRow } = useVenueStore((s) => ({
		isSelected: rowId && s.selectedRows.includes(rowId),
		curveSize: rowId ? s.rows.find((row) => row.id === rowId).editor.curve : 0,
		updateRow: s.updateRow,
	}))

	const handleUpdate = (value) => {
		updateRow(rowId, { editor: { curve: value[0] } })
	}

	if (!isSelected) {
		return null
	}

	return (
		<Field label={__('settings.rowCurve')}>
			<RangeSlider
				defaultValue={curveSize}
				value={curveSize}
				min={-100}
				step={1}
				max={100}
				onChange={handleUpdate}
			/>
		</Field>
	)
}
