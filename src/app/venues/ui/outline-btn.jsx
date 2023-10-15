import { classNames } from '../utils/helpers'

const css = {
	btn: 'inline-flex gap-x-1 grow min-h-[2.125rem] items-center justify-center whitespace-nowrap rounded-md px-2.5 py-0.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow [&_svg]:w-5 [&_svg]:h-5',
	btnDisabled: 'text-black/40 bg-white/90 pointer-events-none opacity-60',
	btnDefault: 'text-black/70 hover:text-black bg-white',
}

export function OutlineBtn({ isDisabled, children, ...props }) {
	return (
		<button
			type='button'
			className={classNames(css.btn, isDisabled ? css.btnDisabled : css.btnDefault)}
			disabled={isDisabled}
			{...props}
		>
			{children}
		</button>
	)
}
