import { cn } from '../../utils/helpers'
import { css as seatCss } from './seat'
import { useMemo } from 'react'

const css = {
	wrapper: 'mt-5',
	title: 'text-lg text-black/50 fw-700 mb-4',
	rows: 'flex flex-col gap-y-2',
	row: 'flex items-center gap-x-6',
	rowName: 'fw-700 uppercase text-lg text-black/30',
	cols: 'flex items-center gap-x-2',
}

export function Reserved({ data }) {
	const reserved = useMemo(() => {
		const dataArray = Object.entries(data)
		const reserved = dataArray
			.map(([rowName, cols]) => {
				const reservedCols = cols.filter((col) => col.reserved)
				return [rowName, reservedCols]
			})
			.filter(([_, cols]) => cols.length > 0)

		return reserved
	}, [data])

	return (
		<div className={css.wrapper}>
			<h2 className={css.title}>Reserved seats</h2>
			<div className={css.rows}>
				{reserved.map(([rowName, cols], i) => (
					<div className={css.row} key={i}>
						<div className={css.rowName}>{rowName}</div>
						<div className={css.cols}>
							{cols.map((col, j) => (
								<div className={cn(seatCss.seat, seatCss.reserved)} key={j}>
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
