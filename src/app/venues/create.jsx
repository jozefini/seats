import { DictionaryProvider } from './context/dictionary'
import { Editor } from './editor'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import builderI18n from './i18n/builder.json'

const css = {
	wrapper: 'max-w-7xl w-full mx-auto px-4',
	box: 'rounded-[0.5rem] border bg-white shadow',
	layout: 'grid grid-cols-[3fr_1fr] gap-x-5',
}

export function CreateVenue({ onSubmit, data, isLoading }) {
	return (
		<DictionaryProvider dictionary={builderI18n}>
			<div className={css.wrapper}>
				<div className={css.box}>
					<Topbar />
					<div className={css.layout}>
						<Editor />
						<Sidebar />
					</div>
				</div>
			</div>
		</DictionaryProvider>
	)
}
