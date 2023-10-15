import { useRef } from 'react'
import { useMouseTracker } from '../hooks/mouse-tracker'
import { useSelectionTracker } from '../hooks/selection-tracker'
import { useDraggingTracker } from '../hooks/dragging-tracker'
import { useKeyboardTracker } from '../hooks/keyboard-tracker'
import { useBuilderStore } from '../store/useBuilderStore'
import { GridPattern } from './grid-pattern'
import { Selection } from './selection'
import { Row } from './row'
import { useRowsDragging } from '../hooks/use-rows-dragging'
import { useEditorShortcuts } from '../hooks/use-editor-shortcuts'

const css = {
	wrapper: 'h-full w-full pl-8 py-6 max-w-full overflow-auto',
	box: 'relative h-full w-full block text-2xl text-black border rounded-md bg-[rgba(0,0,0,0.01)] overflow-hidden outline-none',
}

export function Editor() {
	const ref = useRef()
	const rows = useBuilderStore((s) => s.rows)
	useSelectionTracker(ref)
	useMouseTracker(ref)
	useDraggingTracker(ref)
	useKeyboardTracker(ref)
	useRowsDragging(ref)
	useEditorShortcuts(ref)

	return (
		<div className={css.wrapper}>
			<div className={css.box} ref={ref} tabIndex={0}>
				<GridPattern />

				{rows.map((row) => (
					<Row key={row.id} {...row} />
				))}
			</div>
			<Selection />
		</div>
	)
}
