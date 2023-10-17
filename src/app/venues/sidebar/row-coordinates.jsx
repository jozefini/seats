import { classNames } from '../utils/helpers'
import { useVenueStore } from '../store/use-venue-store'
import { useDictionary } from '../hooks/use-dictionary'

const css = {
	wrapper: 'p-3 rounded-md',
	wrapperDefault: 'bg-green-600/5 text-green-600/60 border-green-600/30',
	wrapperNotice: 'bg-orange-600/5 text-orange-800/60 border-orange-800/30',
	iconBox:
		'p-3 inline-flex items-center justify-center border border-dashed rounded-md border-[inherit]',
	iconMove: 'rotate-45',
	icon: 'w-6 h-6',
	label: 'mt-2 text-sm',
}

export function RowCoordinates() {
	const { __ } = useDictionary()
	const { coordinates } = useVenueStore((s) => ({
		coordinates: s.selectedRows.length === 1 ? s.selectedRows[0].editor : null,
	}))

	return (
		<div className={classNames(css.wrapper, coordinates ? css.wrapperDefault : css.wrapperNotice)}>
			{coordinates ? (
				<>
					x: {coordinates.x}, y: {coordinates.y}
				</>
			) : (
				<>
					<div className={css.iconBox}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.8}
							stroke='currentColor'
							className={css.icon}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59'
							/>
						</svg>
					</div>
					<div className={css.label}>{__('settings.rowCoordsNotice')}</div>
				</>
			)}
		</div>
	)
}
