import * as Slider from '@radix-ui/react-slider'
import { useFieldContext } from '../hooks/field-context'

const css = {
	wrapper: '',
}

export function RangeSlider({ min, max, step, value, defaultValue, onChange }) {
	const { label } = useFieldContext()

	return (
		<Slider.Root
			className={css.wrapper}
			defaultValue={[defaultValue ?? min ?? 0]}
			value={value}
			min={min ?? 0}
			max={max || 100}
			step={step || 1}
			onValueChange={onChange}
		>
			<Slider.Track className={css.track}>
				<Slider.Range className={css.range} />
			</Slider.Track>
			<Slider.Thumb className={css.thumb} aria-label={label} />
		</Slider.Root>
	)
}
