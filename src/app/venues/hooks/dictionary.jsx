import { useCallback, useContext } from 'react'
import { deepAccess, getType, replacer } from '../utils/helpers'
import { VenueContext } from '../context/venue'

export const useDictionary = () => {
	const { dictionary } = useContext(VenueContext)
	const __ = useCallback(
		(textId, variables = {}) => {
			const text = deepAccess(dictionary, textId, '(NaN)')

			if (getType(variables) === 'object' && Object.keys(variables).length) {
				return replacer(text, variables)
			}
			return text
		},
		[dictionary],
	)

	return { __ }
}
