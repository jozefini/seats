import { useDictionary } from '../hooks/use-dictionary'
import { useVenueStore } from '../store/use-venue-store'

const css = {
	title: 'text-lg font-semibold',
}

export function VenueTitle() {
	const { __ } = useDictionary()
	const venueTitle = useVenueStore((s) => s.title)
	const title = venueTitle ? venueTitle : __('topbar.headline')

	return (
		<div className={css.wrapper}>
			<h2 className={css.title}>{title}</h2>
		</div>
	)
}
