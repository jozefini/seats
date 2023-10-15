import * as Slider from '@radix-ui/react-slider'
import { useFieldContext } from '../context/field'
import { classNames } from '../utils/helpers'

const css = {
	wrapper: 'my-2 flex w-full items-center gap-x-2 relative',
	slider:
		'relative grow touch-none select-none flex w-full items-center [&_[role=slider]]:h-4 [&_[role=slider]]:w-4',
	track: 'relative h-1.5 w-full grow overflow-hidden rounded-full bg-black/20',
	range: 'absolute h-full bg-black',
	thumb:
		'block h-4 w-4 rounded-full border border-black/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 disabled:pointer-events-none disabled:opacity-50',
	inputBox: 'w-20',
	input:
		'w-full h-8 text-center rounded-md border border-black/10 p-1 text-sm font-semibold text-black/50',
}

export function RangeSlider({ className, min, max, step, value, defaultValue, onChange }) {
	const { label } = useFieldContext()

	const onInputChange = (e) => {
		const newValue = Math.min(Math.max(e.target.value, min), max)
		const remainder = newValue % step
		const roundedValue = remainder < step / 2 ? newValue - remainder : newValue + step - remainder
		onChange([roundedValue])
	}

	return (
		<div className={css.wrapper}>
			<Slider.Root
				className={classNames(css.wrapper, className)}
				defaultValue={[defaultValue ?? min ?? 0]}
				value={[value ?? min ?? 0]}
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
			<div className={css.inputBox}>
				<input type='number' className={css.input} value={value} onChange={onInputChange} />
			</div>
		</div>
	)
}
