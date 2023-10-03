import { useEffect, useRef } from 'react'

import { Reserved } from './reserved'
import { Seat } from './seat'
import { SeatsProvider } from './use-seats'
import { Selected } from './selected'
import seatsData from './data'

const css = {
	wrapper: 'flex flex-col gap-y-2',
	title: 'text-2xl text-black/50 fw-700 mb-4',
	row: 'flex items-center gap-x-6',
	rowName: 'fw-700 uppercase text-lg text-black/30',
	cols: 'flex items-center gap-x-2',
	grid: 'grid grid-cols-2 gap-4 mt-6',
}

export function Seats() {
	const ref = useRef()
	const seatsArray = Object.entries(seatsData)

	useEffect(() => {
		const moveTooltip = function (e) {
			const x = e.clientX
			const y = e.clientY
			ref.current.style = `--tooltip-top: ${y - 10}px; --tooltip-left: ${x}px`
		}
		window.addEventListener('mousemove', moveTooltip)
		return () => window.removeEventListener('mousemove', moveTooltip)
	}, [])

	return (
		<SeatsProvider>
			<h1 className={css.title}>Select seats</h1>
			<div className={css.wrapper} ref={ref}>
				{seatsArray.map(([rowName, cols], i) => (
					<div key={i} className={css.row}>
						<div className={css.rowName}>{rowName}</div>
						<div className={css.cols}>
							{cols.map((seat, j) => (
								<Seat key={j} row={rowName} {...seat} />
							))}
						</div>
					</div>
				))}
			</div>
			<div className={css.grid}>
				<Reserved data={seatsData} />
				<Selected data={seatsData} />
			</div>
		</SeatsProvider>
	)
}
