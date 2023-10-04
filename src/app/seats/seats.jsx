import { Reserved } from './reserved'
import { SeatsMap } from './seats-map'
import { SeatsProvider } from './use-seats'
import { Selected } from './selected'
import { seatsData } from './data'

const css = {
	wrapper: 'flex flex-col gap-y-2',
	title: 'text-2xl text-black/50 fw-700 mb-4',
	row: 'flex items-center gap-x-6',
	rowName: 'fw-700 uppercase text-lg text-black/30',
	cols: 'flex items-center gap-x-2',
	grid: 'grid grid-cols-2 gap-4 mt-6',
}

export function Seats() {
	return (
		<SeatsProvider>
			<h1 className={css.title}>Select seats</h1>
			<SeatsMap />
			<div className={css.grid}>
				<Reserved data={seatsData} />
				<Selected data={seatsData} />
			</div>
		</SeatsProvider>
	)
}
