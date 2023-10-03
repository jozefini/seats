import { Link } from 'react-router-dom'

export function ButtonOrLink({ linkProps, btnProps, isButton, children, ...commonProps }) {
	if (isButton) {
		return (
			<button {...btnProps} {...commonProps}>
				{children}
			</button>
		)
	}

	return (
		<Link {...linkProps} {...commonProps}>
			{children}
		</Link>
	)
}
