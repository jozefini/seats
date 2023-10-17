import { useDictionary } from '../hooks/use-dictionary'
import { Actions } from './actions'
import { GlobalControls } from './global-controls'
import { RowControls } from './row-controls'

const css = {
	wrapper: 'h-full w-full',
	inner: 'h-full w-full relative overflow-y-auto flex flex-col gap-y-8',
}

export function Sidebar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<div className={css.inner}>
				<GlobalControls />
				<RowControls />
				<Actions />
			</div>
		</div>
	)
}
