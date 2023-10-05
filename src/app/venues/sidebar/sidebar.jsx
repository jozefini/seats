import { useDictionary } from '../hooks/dictionary'
import { FieldGroup } from '../ui/field-group'
import { ControlGridLayout } from './control-grid-layout'
import { ControlGridSize } from './control-grid-size'

const css = {
	wrapper: 'h-full w-full pr-8 py-6',
}

export function Sidebar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<FieldGroup title={__('settings.gridHeadline')}>
				<ControlGridLayout />
				<ControlGridSize />
			</FieldGroup>
		</div>
	)
}
