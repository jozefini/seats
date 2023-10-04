import { CreateVenue } from './venues/create'

const css = {
	wrapper: 'w-full mx-auto px-4 py-20',
}

export default function CreateLayout() {
	return (
		<div className={css.wrapper}>
			<CreateVenue />
		</div>
	)
}
