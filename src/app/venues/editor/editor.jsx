import { useRef } from 'react'
import { useMouseTracker } from '../hooks/use-mouse-tracker'
import { useEditorSelection } from '../hooks/use-editor-selection'
import { useEditorDragging } from '../hooks/use-editor-dragging'
import { useEditorShortcuts } from '../hooks/use-editor-shortcuts'
import { useBuilderStore } from '../store/useBuilderStore'
import { GridPattern } from './grid-pattern'
import { Selection } from './selection'
import { Row } from './row'

const css = {
	wrapper: 'h-full w-full pl-8 py-6 max-w-full overflow-auto',
	editor: 'relative h-full w-full overflow-hidden',
	box: 'relative h-full w-full block text-2xl text-black border rounded-md bg-[rgba(0,0,0,0.01)] outline-none overflow-auto',
}

export function Editor() {
	const ref = useRef()
	const rows = useBuilderStore((s) => s.rows)
	useMouseTracker(ref)
	useEditorSelection(ref)
	useEditorDragging(ref)
	useEditorShortcuts(ref)

	return (
		<div className={css.wrapper}>
			<div className={css.editor}>
				<div className={css.box} ref={ref} tabIndex={0}>
					<GridPattern />

					{rows.map((row) => (
						<Row key={row.id} {...row} />
					))}
				</div>
			</div>
			<Selection />
		</div>
	)
}
