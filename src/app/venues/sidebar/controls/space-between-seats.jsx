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
				min={1}
				step={1}
				max={40}
				onChange={handleChange}
			/>
		</Field>
	)
}
