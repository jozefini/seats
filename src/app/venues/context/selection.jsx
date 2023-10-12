import { createContext, useContext } from 'react'

const RowContext = createContext({})

export const RowProvider = (props) => {
	const { children, ...values } = props

	return <RowContext.Provider value={values}>{children}</RowContext.Provider>
}

export function useRowContext() {
	return useContext(RowContext)
}
