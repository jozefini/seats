import { Link } from 'react-router-dom'

export function LinkOrDiv({ linkProps, divProps, isDiv, children, ...commonProps }) {
	if (isDiv) {
		return (
			<div {...divProps} {...commonProps}>
				{children}
			</div>
		)
	}

	return (
		<Link {...linkProps} {...commonProps}>
			{children}
		</Link>
	)
}
