import { createContext, useContext, useMemo } from 'react'
import { getType } from '../utils/helpers'

export const RowContext = createContext({})

export const RowProvider = ({ children, ...props }) => {
	return <RowContext.Provider value={props}>{children}</RowContext.Provider>
}

export function useRowContext() {
	const context = useContext(RowContext)

	return getType(context) === 'object' ? context : { editor: {}, seats: [] }
}
