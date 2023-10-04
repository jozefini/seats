import { createContext } from 'react'

export const VenueContext = createContext({})

export const VenueProvider = (props) => {
	const { children, dictionary = {}, data = {} } = props

	return <VenueContext.Provider value={{ dictionary, data }}>{children}</VenueContext.Provider>
}
