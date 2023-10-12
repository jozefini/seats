import { useDictionary } from '../../hooks/dictionary'
import { useBuilderStore } from '../../store/useBuilderStore'
import { Field } from '../../ui/field'
import { RangeSlider } from '../../ui/range-slider'

export function SeatSize() {
	const { __ } = useDictionary()
	const { size, updateStates } = useBuilderStore((s) => ({
		size: s.seatSize,
		updateStates: s.updateStates,
	}))

	const handleChange = (newSize) => {
		updateStates({ seatSize: newSize })
	}

	return (
		<Field label={__('settings.seatSize')}>
			<RangeSlider
				defaultValue={size}
				value={size}
				min={5}
				step={1}
				max={50}
				onChange={handleChange}
			/>
		</Field>
	)
}
