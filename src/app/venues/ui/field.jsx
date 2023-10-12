import { useId } from 'react'
import { FieldProvider } from '../context/field'
import { Tooltip } from './tooltip'
import { classNames } from '../utils/helpers'

const css = {
	field: 'grid gap-2',
	fieldInline: 'items-center grid-cols-[auto_1fr]',
	headline: 'flex items-center gap-x-4',
	label:
		'inline-flex items-center text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	control: 'flex items-center w-full',
	controlInline: 'justify-end',
}

export function Field({ label, children, tooltipId, inline }) {
	const inputId = useId()

	return (
		<FieldProvider
			value={{
				label,
				inputId,
			}}
		>
			<div className={classNames(css.field, inline && css.fieldInline)}>
				<div className={css.headline}>
					<label htmlFor={inputId} className={css.label}>
						{label}
					</label>
					{!!tooltipId && <Tooltip tooltipId={tooltipId} />}
				</div>
				<div className={classNames(css.control, inline && css.controlInline)}>{children}</div>
			</div>
		</FieldProvider>
	)
}
