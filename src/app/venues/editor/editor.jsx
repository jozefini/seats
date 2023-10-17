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
	wrapper: 'h-full w-full pl-8 py-6 max-w-full overflow-auto md:rtl:order-1',
	editor: 'relative h-full w-full overflow-hidden bg-white border rounded-md',
	box: 'relative h-full w-full block text-2xl text-black rounded-[inherit] outline-none overflow-auto',
	selectArea: 'cursor-crosshair !border-orange-800/30',
}

export function Editor() {
	const ref = useRef()
	const { rows, mode, selectedLength } = useVenueStore((s) => ({
		rows: s.rows,
		mode: s.mode,
		selectedLength: s.selectedRows.length,
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
			<div
				className={classNames(
					css.editor,
					mode === MODES.ADD_ROW && selectedLength === 0 && css.selectArea,
				)}
			>
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
