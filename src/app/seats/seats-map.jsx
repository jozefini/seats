import { useEffect, useRef } from 'react'

import { Seat } from './seat'
import { seatsData } from './data'

const css = {
	wrapper: 'flex flex-col gap-y-2',
	row: 'flex items-center gap-x-6',
	rowName: 'fw-700 uppercase text-lg text-black/30',
	cols: 'flex items-center gap-x-2 relative',
}

export function SeatsMap() {
	const seatsArray = Object.entries(seatsData)
	const ref = useRef()

	useEffect(() => {
		const moveTooltip = function (e) {
			const x = e.clientX
			const y = e.clientY
			ref.current.style = `--tooltip-top: ${y - 11}px; --tooltip-left: ${x}px`
		}
		const onMouseEnter = function (e) {
			window.addEventListener('mousemove', moveTooltip)
		}
		const onMouseLeave = function (e) {
			window.removeEventListener('mousemove', moveTooltip)
		}
		ref.current.addEventListener('mouseenter', onMouseEnter)
		ref.current.addEventListener('mouseleave', onMouseLeave)
		return () => {
			ref.current.removeEventListener('mouseenter', onMouseEnter)
			ref.current.removeEventListener('mouseleave', onMouseLeave)
			window.removeEventListener('mousemove', moveTooltip)
		}
	}, [])

	return (
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
	)
}
