import { useVenueStore } from '../../store/use-venue-store'
import { useDictionary } from '../../hooks/use-dictionary'
import { RangeSlider } from '../controls'
import { Field } from '../field'

export function SeatSize() {
	const { __ } = useDictionary()
	const { size, updateStates } = useVenueStore((s) => ({
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
