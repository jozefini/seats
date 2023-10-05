import { useId } from 'react'
import { FieldProvider } from '../context/field'

const css = {
	field: 'grid gap-2',
	headline: 'flex items-center gap-x-4',
	label:
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	control: '',
}

export function Field({ label, children, tooltip }) {
	const inputId = useId()

	return (
		<FieldProvider
			value={{
				inputId,
			}}
		>
			<div className={css.field}>
				<div className={css.headline}>
					<label htmlFor={inputId} className={css.label}>
						{label}
					</label>
				</div>
				<div className={css.control}>{children}</div>
			</div>
		</FieldProvider>
	)
}
