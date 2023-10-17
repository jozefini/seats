import { MODES } from '../utils/contants'
import { classNames } from '../utils/helpers'
import { useVenueStore } from '../store/use-venue-store'
import { useDictionary } from '../hooks/use-dictionary'

const css = {
	wrapper: 'p-3 rounded-md flex gap-2',
	wrapperDefault: 'bg-green-600/5 text-green-800/60 border-green-800/30',
	wrapperNotice: 'bg-orange-600/5 text-orange-800/60 border-orange-800/30',
	box: 'flex items-center gap-x-3',
	iconBox:
		'p-3 inline-flex items-center justify-center border border-dashed rounded-md border-[inherit]',
	iconMove: 'rotate-45',
	icon: 'w-6 h-6',
	label: 'text-sm',
}

export function RowCoordinates() {
	const { __ } = useDictionary()
	const { coordinates, isNewRow } = useVenueStore((s) => {
		const props = {
			coordinates: null,
			isNewRow: s.mode === MODES.ADD_ROW,
		}
		if (s.selectedRows.length === 1) {
			const row = s.rows.find((r) => r.id === s.selectedRows[0])
			if (row) {
				props.coordinates = row.editor
			}
		}
		return props
	})

	return (
		<div className={classNames(css.wrapper, coordinates ? css.wrapperDefault : css.wrapperNotice)}>
			{coordinates && (
				<div className={css.box}>
					<div className={css.iconBox}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className={css.icon}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
							/>
						</svg>
					</div>
					<div className={css.label}>
						<div>{__('settings.rowCoords')}</div>
						<strong>
							x: {parseInt(coordinates.x)} y: {parseInt(coordinates.y)}
						</strong>
					</div>
				</div>
			)}
			{isNewRow && !coordinates && (
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
