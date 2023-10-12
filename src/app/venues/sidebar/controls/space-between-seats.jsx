import { useDictionary } from '../../hooks/dictionary'
import { useBuilderStore } from '../../store/useBuilderStore'
import { Field } from '../../ui/field'
import { RangeSlider } from '../../ui/range-slider'

export function SpaceBetweenSeats() {
	const { __ } = useDictionary()
	const { size, updateStates } = useBuilderStore((s) => ({
		size: s.spaceBetweenSeats,
		updateStates: s.updateStates,
	}))

	const handleChange = (newSize) => {
		updateStates({ spaceBetweenSeats: newSize })
	}

	return (
		<Field label={__('settings.spaceBetweenSeats')}>
			<RangeSlider
				defaultValue={size}
				value={size}
				min={0.1}
				step={0.1}
				max={2}
				onChange={handleChange}
			/>
		</Field>
	)
}
