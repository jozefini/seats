const css = {
	wrapper: 'relative',
	divider: 'h-[1px] mt-[-1px] w-full bg-gray-200 absolute top-1/2 left-0',
	headline: 'relative flex items-center mb-4',
	title: 'bg-white pr-2 text-xs font-bold tracking-widest uppercase text-gray-400 relative',
	grid: 'grid gap-y-4',
}

export function FieldGroup({ title, children }) {
	return (
		<div className={css.wrapper}>
			{!!title && (
				<div className={css.headline}>
					<div className={css.divider} />
					<h3 className={css.title}>{title}</h3>
				</div>
			)}
			<div className={css.grid}>{children}</div>
		</div>
	)
}
