import { VenueProvider } from './context/venue'
import { Editor } from './editor'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import dictionary from './i18n/create.json'

import './styles.css'

const css = {
	wrapper: 'max-w-[90rem] w-full mx-auto px-4',
	box: 'rounded-[0.5rem] border bg-white shadow',
	layout: 'grid grid-cols-[1fr_15.625rem] gap-x-8 border-t min-h-[50rem]',
}

export function CreateVenue({ onSubmit, data, isLoading }) {
	return (
		<VenueProvider dictionary={dictionary} data={data}>
			<div className={css.wrapper}>
				<div className={css.box}>
					<Topbar />
					<div className={css.layout}>
						<Editor />
						<Sidebar />
					</div>
				</div>
			</div>
		</VenueProvider>
	)
}
