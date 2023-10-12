import { useId } from 'react'
import { useBuilderStore } from '../store/useBuilderStore'
import { GRID_LAYOUT } from '../utils/contants'

const css = {
	pattern: 'absolute inset-0 w-full h-full',
}

export function GridPattern() {
	const patternId = useId()
	const { size, opacity, layout } = useBuilderStore((s) => ({
		size: s.gridSize,
		opacity: s.gridOpacity,
		layout: s.gridLayout,
	}))

	if (layout === GRID_LAYOUT.NONE) {
		return null
	}

	return (
		<svg width='100%' height='100%' className={css.pattern}>
			<defs>
				{layout === GRID_LAYOUT.LINE ? (
					<pattern id={patternId} width={size} height={size} patternUnits='userSpaceOnUse'>
						<path
							d={`M ${size} 0 L 0 0 0 ${size}`}
							fill='none'
							stroke='black'
							opacity={opacity}
							strokeWidth='1'
						/>
					</pattern>
				) : (
					<pattern id={patternId} width={size} height={size} patternUnits='userSpaceOnUse'>
						<circle cx='1' cy='1' r='0.8' fill='black' opacity={opacity} />
					</pattern>
				)}
			</defs>
			<rect width='100%' height='100%' fill={`url(#${patternId})`} />
		</svg>
	)
}
