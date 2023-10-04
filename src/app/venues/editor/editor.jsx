import { useSelection } from '../hooks/selection'

const css = {
	wrapper: 'h-full w-full px-8 py-6',
	box: 'h-full w-full bg-gray-100 flex items-center justify-center text-2xl text-black',
	selection: 'border border-blue-500 bg-blue-200 opacity-50 fixed',
}

export function Editor() {
	const { ref, isSelecting, startMouseX, startMouseY, endMouseX, endMouseY } = useSelection()

	let top = startMouseY
	let height = endMouseY - startMouseY
	let left = startMouseX
	let width = endMouseX - startMouseX

	if (endMouseY < startMouseY) {
		top = endMouseY
		height = startMouseY - endMouseY
	}

	if (endMouseX < startMouseX) {
		left = endMouseX
		width = startMouseX - endMouseX
	}

	const styles = {
		top,
		left,
		width: `${Math.abs(width)}px`,
		height: `${Math.abs(height)}px`,
	}

	return (
		<div className={css.wrapper}>
			<div className={css.box} ref={ref}>
				{isSelecting && <div className={css.selection} style={styles} />}
			</div>
		</div>
	)
}
