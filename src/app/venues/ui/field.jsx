import { useId } from 'react'
import { FieldProvider } from '../context/field'
import { Tooltip } from './tooltip'

const css = {
	field: 'grid gap-2',
	headline: 'flex items-center gap-x-4',
	label:
		'in-flex items-center text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	control: '',
}

export function Field({ label, children, tooltipId }) {
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
					{!!tooltipId && <Tooltip tooltipId={tooltipId} />}
				</div>
				<div className={css.control}>{children}</div>
			</div>
		</FieldProvider>
	)
}
