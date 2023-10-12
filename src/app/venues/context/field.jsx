import { createContext, useContext } from 'react'

export const FieldContext = createContext({})

export const FieldProvider = ({ value, children }) => {
	return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}

export function useFieldContext() {
	return useContext(FieldContext)
}
