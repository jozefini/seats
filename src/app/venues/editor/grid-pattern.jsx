import { useId } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'
import { GRID_LAYOUT } from '../utils/contants'

const css = {
	pattern: 'absolute inset-0 w-full h-full',
}

export function GridPattern() {
	const patternId = useId()
	const { gridSize, gridLayout } = useBuilderStore((s) => ({
		gridSize: s.gridSize,
		gridLayout: s.gridLayout,
	}))

	if (gridLayout === GRID_LAYOUT.NONE) {
		return null
	}

	return (
		<svg width='100%' height='100%' className={css.pattern}>
			<defs>
				{gridLayout === GRID_LAYOUT.LINE ? (
					<pattern id={patternId} width={gridSize} height={gridSize} patternUnits='userSpaceOnUse'>
						<path
							d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
							fill='none'
							stroke='black'
							opacity='0.15'
							strokeWidth='1'
						/>
					</pattern>
				) : (
					<pattern id={patternId} width={gridSize} height={gridSize} patternUnits='userSpaceOnUse'>
						<circle cx='1' cy='1' r='0.5' fill='black' opacity='0.3' />
					</pattern>
				)}
			</defs>
			<rect width='100%' height='100%' fill={`url(#${patternId})`} />
		</svg>
	)
}
