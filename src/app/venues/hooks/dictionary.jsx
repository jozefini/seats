import { useCallback, useContext } from 'react'
import { deepAccess, getType, replacer } from '../utils/helpers'
import { DictionaryContext } from '../context/dictionary'

export const useDictionary = () => {
	const dictionary = useContext(DictionaryContext)
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
