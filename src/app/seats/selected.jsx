import { useMemo } from 'react'
import { useSeats } from './use-seats'

const css = {
	wrapper: 'mt-5',
	title: 'text-lg text-black/50 fw-700 mb-4',
	rows: 'flex flex-col gap-y-2',
	row: 'flex items-center gap-x-6',
	rowName: 'fw-700 uppercase text-lg text-black/30',
	cols: 'flex items-center gap-x-2',
	seat: 'in-flex centered sq-10 border-2 fw-700 text-xs rounded-full bg-red-600 border-red-700 text-white',
}

export function Selected({ data }) {
	const { selected } = useSeats()
	const { reserved, totalPrice } = useMemo(() => {
		const dataArray = Object.entries(data)
		let totalPrice = 0

		const reserved = dataArray
			.map(([rowName, cols]) => {
				const findCols = typeof rowName !== 'string' ? [] : selected[rowName] || []

				// Calculate total price
				findCols.forEach((col) => {
					if (typeof col.price === 'number' && col.price > 0) {
						totalPrice += col.price
					}
				})

				const sortCols = findCols.sort((a, b) => {
					const aIndex = cols.findIndex((col) => col.id === a.id)
					const bIndex = cols.findIndex((col) => col.id === b.id)
					return aIndex - bIndex
				})
				return [rowName, sortCols]
			})
			.filter(([_, cols]) => cols.length > 0)
		return { totalPrice, reserved }
	}, [selected])

	return (
		<div className={css.wrapper}>
			<h2 className={css.title}>Selected seats {!!totalPrice && `( $${totalPrice} )`}</h2>
			<div className={css.rows}>
				{reserved.map(([rowName, cols], i) => (
					<div className={css.row} key={i}>
						<div className={css.rowName}>{rowName}</div>
						<div className={css.cols}>
							{cols.map((col, j) => (
								<div className={css.seat} key={j}>
									{col.name}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
