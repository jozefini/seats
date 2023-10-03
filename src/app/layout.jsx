import { Seats } from './seats'

const css = {
	wrapper: 'max-w-3xl w-full mx-auto px-4 py-20',
}

export default function RootLayout() {
	return (
		<div className={css.wrapper}>
			<Seats />
		</div>
	)
}
