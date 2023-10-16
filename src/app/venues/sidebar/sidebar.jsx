import { useDictionary } from '../hooks/use-dictionary'
import { Actions } from './actions'
import { GlobalControls } from './global-controls'

const css = {
	wrapper: 'h-full w-full pr-8 py-6',
	inner: 'h-full w-full relative overflow-y-auto flex flex-col gap-y-8',
}

export function Sidebar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<div className={css.inner}>
				<GlobalControls />
				<Actions />
			</div>
		</div>
	)
}
