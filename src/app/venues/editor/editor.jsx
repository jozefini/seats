import { useEffect, useRef } from 'react'
import { useMouseTracker } from '../hooks/use-mouse-tracker'
import { useEditorSelection } from '../hooks/use-editor-selection'
import { useEditorDragging } from '../hooks/use-editor-dragging'
import { useEditorShortcuts } from '../hooks/use-editor-shortcuts'
import { useBuilderStore } from '../store/useBuilderStore'
import { Selection } from './selection'
import { Row } from './row'
import { classNames } from '../utils/helpers'
import { CURSOR_TYPES } from '../utils/contants'

const css = {
	wrapper: 'h-full w-full pl-8 py-6 max-w-full overflow-auto',
	editor: 'relative h-full w-full overflow-hidden bg-white',
	box: 'relative h-full w-full block text-2xl text-black border rounded-md outline-none overflow-auto',
}

export function Editor() {
	const ref = useRef()
	const { rows, cursor, addSnapshot, reset } = useBuilderStore((s) => ({
		rows: s.rows,
		cursor: s.cursor,
		addSnapshot: s.addSnapshot,
		reset: s.resetStore,
	}))
	useMouseTracker(ref)
	useEditorSelection(ref)
	useEditorDragging(ref)
	useEditorShortcuts(ref)

	useEffect(() => {
		addSnapshot()
		return () => {
			reset()
		}
	}, [addSnapshot, reset])

	return (
		<div className={css.wrapper}>
			<div
				className={classNames(css.editor, cursor === CURSOR_TYPES.ADD_ROW && 'cursor-crosshair')}
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
