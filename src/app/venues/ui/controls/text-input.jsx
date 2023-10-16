import { useFieldContext } from '../../context/field'

const css = {
	input:
		'w-full h-8 inline-flex items-center rounded-md border border-black/10 p-1 text-sm font-semibold text-black/50',
}

export function TextInput(props) {
	const { inputId } = useFieldContext()

	return <input id={inputId} type='text' className={css.input} {...props} />
}
