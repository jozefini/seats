import { useDictionary } from '../hooks/dictionary'
import { useBuilderStore } from '../store/useBuilderStore'
import { Field } from '../ui/field'

export function ControlGridSize() {
	const { __ } = useDictionary()
	const { gridSize, updateStates } = useBuilderStore((s) => ({
		gridSize: s.gridSize,
		updateStates: s.updateStates,
	}))

	const handleChange = (newSize) => {
		console.log(newSize)
		// updateStates({ gridSize: newSize })
	}

	return <Field label={__('settings.gridSize')}></Field>
}
