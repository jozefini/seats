const css = {
	wrapper:
		'grid grid-cols-[1fr_15.625rem] rtl:grid-cols-[15.625rem_1fr] gap-x-8 border-t min-h-[50rem]',
}

export function EditorWrapper({ children }) {
	return <div className={css.wrapper}>{children}</div>
}
