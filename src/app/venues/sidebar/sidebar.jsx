import { ControlGridLayout } from './control-grid-layout'

const css = {
	wrapper: 'h-full w-full pr-8 py-6',
}

export function Sidebar() {
	return (
		<div className={css.wrapper}>
			<ControlGridLayout />
		</div>
	)
}
