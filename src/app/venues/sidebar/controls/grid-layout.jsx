import { useDictionary } from '../../hooks/use-dictionary'
import { useBuilderStore } from '../../store/useBuilderStore'
import { GRID_LAYOUT } from '../../utils/contants'
import { RadioGroup, RadioChoice } from '../../ui/radio-group'
import { Field } from '../../ui/field'

const css = {
	icon: 'w-5 h-5',
}

export function GridLayout() {
	const { __ } = useDictionary()
	const { gridLayout, updateStates } = useBuilderStore((s) => ({
		gridLayout: s.gridLayout,
		updateStates: s.updateStates,
	}))

	const handleChange = (newLayout) => {
		updateStates({ gridLayout: newLayout })
	}

	return (
		<Field label={__('settings.gridLayout')} inline>
			<RadioGroup value={gridLayout} defaultValue={GRID_LAYOUT.LINE} onChange={handleChange}>
				<RadioChoice value={GRID_LAYOUT.NONE} isActive={gridLayout === GRID_LAYOUT.NONE}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className={css.icon}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
						/>
					</svg>
				</RadioChoice>
				<RadioChoice value={GRID_LAYOUT.DOT} isActive={gridLayout === GRID_LAYOUT.DOT}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className={css.icon}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
						/>
					</svg>
				</RadioChoice>
				<RadioChoice value={GRID_LAYOUT.LINE} isActive={gridLayout === GRID_LAYOUT.LINE}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='currentColor'
						className={css.icon}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 5.25v13.5m-7.5-13.5v13.5'
						/>
					</svg>
				</RadioChoice>
			</RadioGroup>
		</Field>
	)
}
