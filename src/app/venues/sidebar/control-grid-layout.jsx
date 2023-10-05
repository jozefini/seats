import { useDictionary } from '../hooks/dictionary'
import { Field } from '../ui/field'

export function ControlGridLayout() {
	const { __ } = useDictionary()

	return <Field label={__('settings.gridLayout')}></Field>
}
