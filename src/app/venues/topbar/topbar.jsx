import { useDictionary } from '../hooks/dictionary'

const css = {
	wrapper:
		'w-full flex flex-col items-start justify-between space-y-2 py-4 px-8 sm:flex-row sm:items-center sm:space-y-0 md:h-16',
	title: 'text-lg font-semibold',
	form: '',
}

export function Topbar() {
	const { __ } = useDictionary()

	return (
		<div className={css.wrapper}>
			<h1 className={css.title}>{__('topbar.headline')}</h1>
		</div>
	)
}
