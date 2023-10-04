import { createContext } from 'react'

export const DictionaryContext = createContext({})

export const DictionaryProvider = ({ children, dictionary }) => (
	<DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>
)
