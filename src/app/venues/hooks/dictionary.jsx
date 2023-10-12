import { useCallback } from 'react'
import { deepAccess, getType, replacer } from '../utils/helpers'
import { useVenueContext } from '../context/venue'

export const useDictionary = () => {
	const { dictionary } = useVenueContext()
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
