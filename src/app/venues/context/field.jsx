import { createContext } from 'react'

export const FieldContext = createContext({})

export const FieldProvider = ({ value, children }) => {
	return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}
