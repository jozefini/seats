import { createContext, useContext } from 'react'
import { getType } from '../utils/helpers'

export const VenueContext = createContext({})

export const VenueProvider = (props) => {
	const { children, dictionary = {}, data = {}, context = 'create' } = props

	return (
		<VenueContext.Provider value={{ dictionary, data, context }}>{children}</VenueContext.Provider>
	)
}

export function useVenueContext() {
	const context = useContext(VenueContext)

	return getType(context) === 'object' ? context : {}
}
