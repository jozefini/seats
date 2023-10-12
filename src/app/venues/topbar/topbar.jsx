import { useDictionary } from '../hooks/dictionary'
import { useBuilderStore } from '../store/useBuilderStore'

const css = {
	wrapper:
		'w-full flex flex-col items-start justify-between space-y-2 py-4 px-8 sm:flex-row sm:items-center sm:space-y-0 md:h-16',
	title: 'text-lg font-semibold',
	form: '',
}

export function Topbar() {
	const isFocused = useBuilderStore((s) => s.isEditorFocused)
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<div className={css.leftSide}>
				<h1 className={css.title}>
					{__('topbar.headline')} {isFocused && <>Focused</>}
				</h1>
			</div>
		</div>
	)
}
