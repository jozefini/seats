import { useDictionary } from '../../hooks/dictionary'
import { useBuilderStore } from '../../store/useBuilderStore'
import { Field } from '../../ui/field'
import { RangeSlider } from '../../ui/range-slider'
import { GRID_LAYOUT } from '../../utils/contants'

export function GridOpacity() {
	const { __ } = useDictionary()
	const { gridOpacity, updateStates, isHidden } = useBuilderStore((s) => ({
		isHidden: s.gridLayout === GRID_LAYOUT.NONE,
		gridOpacity: s.gridOpacity,
		updateStates: s.updateStates,
	}))

	const handleChange = (newOpacity) => {
		updateStates({ gridOpacity: newOpacity })
	}

	if (isHidden) {
		return null
	}

	return (
		<Field label={__('settings.gridOpacity')}>
			<RangeSlider
				defaultValue={gridOpacity}
				value={gridOpacity}
				min={0.1}
				max={0.7}
				step={0.05}
				onChange={handleChange}
			/>
		</Field>
	)
}
