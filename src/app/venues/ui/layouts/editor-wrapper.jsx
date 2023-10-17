const css = {
	wrapper: 'grid grid-cols-[1fr_15.625rem] gap-x-8 border-t min-h-[50rem] py-6 px-8',
}

export function EditorWrapper({ children }) {
	return <div className={css.wrapper}>{children}</div>
}
