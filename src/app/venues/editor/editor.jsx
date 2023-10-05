import { useSelection } from '../hooks/selection'
import { Seat } from './seat'
import { Selection } from './selection'

const css = {
	wrapper: 'h-full w-full px-8 py-6',
	box: 'relative h-full w-full flex items-center justify-center text-2xl text-black border rounded-md bg-gray-50',
}

export function Editor() {
	const { ref, isSelecting } = useSelection()

	return (
		<div className={css.wrapper}>
			<div className={css.box} ref={ref}>
				<Seat />
				{isSelecting && <Selection />}
			</div>
		</div>
	)
}
