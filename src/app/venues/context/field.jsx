import { createContext, useContext } from 'react'
import { getType } from '../utils/helpers'

export const FieldContext = createContext({})

export const FieldProvider = ({ value, children }) => {
	return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}

export function useFieldContext() {
	const context = useContext(FieldContext)

	return getType(context) === 'object' ? context : {}
}
