import { useDictionary } from '../hooks/use-dictionary'
import { useBuilderStore } from '../store/useBuilderStore'
import { FieldGroup } from '../ui/field-group'
import { CURSOR_TYPES } from '../utils/contants'
import { RowCurve } from './controls/row-curve'

export function RowControls() {
	const { __ } = useDictionary()
	const showControls = useBuilderStore(
		(s) => s.selectedRows.length || s.cursor === CURSOR_TYPES.ADD_ROW,
	)

	if (!showControls) {
		return null
	}

	return (
		<>
			<FieldGroup title={__('settings.rowSettings')}>
				<RowCurve />
			</FieldGroup>
		</>
	)
}
