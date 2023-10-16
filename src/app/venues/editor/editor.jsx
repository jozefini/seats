import { useEffect, useRef } from 'react'
import { useMouseTracker } from '../hooks/use-mouse-tracker'
import { useEditorSelection } from '../hooks/use-editor-selection'
import { useEditorDragging } from '../hooks/use-editor-dragging'
import { useEditorShortcuts } from '../hooks/use-editor-shortcuts'
import { getVenueStore, useVenueStore } from '../store/use-venue-store'
import { Selection } from './selection'
import { Row } from './row'
import { classNames } from '../utils/helpers'
import { MODES } from '../utils/contants'

const css = {
	wrapper: 'h-full w-full pl-8 py-6 max-w-full overflow-auto',
	editor: 'relative h-full w-full overflow-hidden bg-white',
	box: 'relative h-full w-full block text-2xl text-black border rounded-md outline-none overflow-auto',
}

export function Editor() {
	const ref = useRef()
	const { rows, mode } = useVenueStore((s) => ({
		rows: s.rows,
		mode: s.mode,
	}))

	useMouseTracker(ref)
	useEditorSelection(ref)
	useEditorDragging(ref)
	useEditorShortcuts(ref)

	useEffect(() => {
		const { addSnapshot, resetStore } = getVenueStore()

		addSnapshot()
		return () => {
			resetStore()
		}
	}, [getVenueStore])

	return (
		<div className={css.wrapper}>
			<div className={classNames(css.editor, mode === MODES.ADD_ROW && 'cursor-crosshair')}>
				<div className={css.box} ref={ref} tabIndex={0}>
					{rows.map((row) => (
						<Row key={row.id} {...row} />
					))}
				</div>
				<Selection />
			</div>
		</div>
	)
}
