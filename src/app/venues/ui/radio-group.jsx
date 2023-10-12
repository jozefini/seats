import * as Radio from '@radix-ui/react-radio-group'
import { useId } from 'react'
import { classNames } from '../utils/helpers'

const css = {
	wrapper: 'flex items-center justify-center rounded-lg bg-gray-100 p-0.5 text-gray-500',
	choice:
		'inline-flex grow min-h-[2.125rem] items-center justify-center h-full whitespace-nowrap rounded-md px-2.5 py-0.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	activeChoice: 'bg-white text-black shadow',
	defaultChoice: '',
}

export function RadioChoice({ value, children, isActive }) {
	const choiceId = useId()
	return (
		<Radio.Item
			className={classNames(css.choice, isActive ? css.activeChoice : css.defaultChoice)}
			value={value}
			id={choiceId}
		>
			{children}
		</Radio.Item>
	)
}

export function RadioGroup({ label, children, value, defaultValue, onChange }) {
	return (
		<Radio.Root
			className={css.wrapper}
			defaultValue={defaultValue}
			aria-label={label}
			value={value}
			onValueChange={onChange}
		>
			{children}
		</Radio.Root>
	)
}
