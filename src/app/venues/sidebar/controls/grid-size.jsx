import { useDictionary } from '../../hooks/dictionary'
import { useBuilderStore } from '../../store/useBuilderStore'
import { Field } from '../../ui/field'
import { RangeSlider } from '../../ui/range-slider'
import { GRID_LAYOUT } from '../../utils/contants'

export function GridSize() {
	const { __ } = useDictionary()
	const { gridSize, updateStates, isHidden } = useBuilderStore((s) => ({
		isHidden: s.gridLayout === GRID_LAYOUT.NONE,
		gridSize: s.gridSize,
		updateStates: s.updateStates,
	}))

	const handleChange = (newSize) => {
		updateStates({ gridSize: newSize })
	}

	if (isHidden) {
		return null
	}

	return (
		<Field label={__('settings.gridSize')}>
			<RangeSlider
				defaultValue={gridSize}
				value={gridSize}
				min={8}
				max={40}
				onChange={handleChange}
			/>
		</Field>
	)
}
