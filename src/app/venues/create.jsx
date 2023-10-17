import { VenueProvider } from './context/venue'
import { EditorWrapper } from './ui/layouts'
import { Editor } from './editor'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

import './styles.css'

const css = {
	wrapper: 'max-w-[90rem] w-full mx-auto px-4',
	box: 'rounded-[0.5rem] border bg-white shadow',
	layout:
		'grid grid-cols-[1fr_15.625rem] rtl:grid-cols-[15.625rem_1fr] gap-x-8 border-t min-h-[50rem]',
}

export function CreateVenue({ onSubmit, data, dictionary, isLoading }) {
	return (
		<VenueProvider dictionary={dictionary || {}} data={data}>
			<div className={css.wrapper}>
				<div className={css.box}>
					<Topbar />
					<EditorWrapper>
						<Editor />
						<Sidebar />
					</EditorWrapper>
				</div>
			</div>
		</VenueProvider>
	)
}
