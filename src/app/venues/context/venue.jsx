import { createContext, useContext } from 'react'

export const VenueContext = createContext({})

export const VenueProvider = (props) => {
	const { children, dictionary = {}, data = {}, context = 'create' } = props

	return (
		<VenueContext.Provider value={{ dictionary, data, context }}>{children}</VenueContext.Provider>
	)
}

export function useVenueContext() {
	return useContext(VenueContext)
}
