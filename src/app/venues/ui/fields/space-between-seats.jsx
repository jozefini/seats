import { useVenueStore } from '../../store/use-venue-store'
import { useDictionary } from '../../hooks/use-dictionary'
import { RangeSlider } from '../controls'
import { Field } from '../field'

export function SpaceBetweenSeats() {
	const { __ } = useDictionary()
	const { size, updateStates } = useVenueStore((s) => ({
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
