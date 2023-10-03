const css = {
	tooltip:
		'hidden top-[var(--tooltip-top)] left-[var(--tooltip-left)] rounded-md group-hover:block group-hover:fixed group-hoveroverflow:hidden p-2 -translate-x-1/2 -translate-y-full bg-white shadow-xl text-black z-50',
}

export function Tooltip({ children }) {
	return <span className={css.tooltip}>{children}</span>
}
