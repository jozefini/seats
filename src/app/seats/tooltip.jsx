const css = {
	tooltip:
		'hidden top-[var(--tooltip-top)] left-[var(--tooltip-left)] rounded-md group-hover:block group-hover:fixed group-hoveroverflow:hidden border border-black/20 p-2 -translate-x-1/2 -translate-y-full bg-white shadow-lg text-black z-50',
	triangle:
		'absolute left-1/2 top-full w-3 h-3 bg-white transform rotate-45 -translate-x-1/2 -translate-y-1/2 border-r border-b border-black/20',
}

export function Tooltip({ children }) {
	return (
		<span className={css.tooltip}>
			{children}
			<span className={css.triangle} />
		</span>
	)
}
