import { useRef } from 'react'
import { useMouseTracker } from '../hooks/mouse-tracker'
import { useSelectionTracker } from '../hooks/selection-tracker'
import { GridPattern } from './grid-pattern'
import { Seat } from './seat'
import { Selection } from './selection'

const css = {
	wrapper: 'h-full w-full pl-8 py-6',
	box: 'relative h-full w-full flex items-center justify-center text-2xl text-black border rounded-md bg-gray-50',
}

export function Editor() {
	const ref = useRef()
	useSelectionTracker(ref)
	useMouseTracker(ref)

	return (
		<div className={css.wrapper}>
			<div className={css.box} ref={ref}>
				<GridPattern />

				<Seat left='20px' top='20px' id='seat-1' />
				<Seat left='80px' top='20px' id='seat-2' />
				<Seat left='140px' top='60px' id='seat-3' />
				<Seat left='200px' top='120px' id='seat-4' />

				<Selection />
			</div>
		</div>
	)
}
