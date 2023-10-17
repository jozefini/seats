import { useFieldContext } from '../../context/field'
import { classNames } from '../../utils/helpers'

const css = {
	input: 'w-full inline-flex items-center rounded-md border border-black/10 text-black/50',
	inputSmall: 'h-8 p-1 text-sm font-semibold',
	inputBig: 'h-10 px-2 py-1 text-base font-semibold',
}

export function TextInput({ size, ...props }) {
	const { inputId } = useFieldContext()

	return (
		<input
			id={inputId}
			type='text'
			className={classNames(css.input, size === 'big' ? css.inputBig : css.inputSmall)}
			{...props}
		/>
	)
}
